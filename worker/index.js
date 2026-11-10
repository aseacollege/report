import { assets } from './assets.generated.js';
import { mergeDocument, validateCourse } from '../app/sync.js';
import storage from '../config/storage.json' with { type: 'json' };

const json = (value, status = 200) => new Response(JSON.stringify(value), {status, headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
const validId = id => /^[a-zA-Z0-9_-]{8,80}$/.test(id);
async function readBody(request) {
  const reader=request.body?.getReader(); if(!reader) throw new Error('입력 내용이 없습니다.');
  let size=0, chunks=[];
  while(true){const {done,value}=await reader.read(); if(done)break; size+=value.length; if(size>3000000){await reader.cancel();throw new Error('문서는 3MB 이하로 저장해 주세요.');} chunks.push(value);}
  const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
  return JSON.parse(new TextDecoder().decode(bytes));
}
async function workspace(request){
  const key=request.headers.get('X-Workspace-Key')||'';
  if(!/^[a-f0-9]{48}$/.test(key))return null;
  const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(key));
  return Array.from(new Uint8Array(digest),x=>x.toString(16).padStart(2,'0')).join('');
}
export async function api(request,env){
  const url=new URL(request.url);
  if(url.pathname==='/api/health')return json({ok:true,database:!!env.DB,drive:!!(env.GOOGLE_CLIENT_ID&&env.GOOGLE_CLIENT_SECRET&&env.GOOGLE_REFRESH_TOKEN&&env.DRIVE_WORKSPACE_HASH),folderId:storage.folderId});
  const room=await workspace(request);if(!room)return json({error:'공유 작업공간 주소가 필요합니다.'},401);
  if(!env.DB)return json({error:'서버 저장소 연결을 준비 중입니다. 작성 내용은 이 기기에 보관됩니다.'},503);
  if(request.headers.get('Origin')&&request.headers.get('Origin')!==url.origin)return json({error:'허용되지 않은 요청입니다.'},403);
  if(url.pathname==='/api/documents'&&request.method==='GET'){
    const rows=await env.DB.prepare('SELECT id,title,revision,updated FROM documents WHERE workspace=? ORDER BY updated DESC LIMIT 200').bind(room).all();return json(rows.results);
  }
  const match=url.pathname.match(/^\/api\/(documents|courses|drive)\/([a-zA-Z0-9_-]+)$/);
  if(match&&!validId(match[2]))return json({error:'잘못된 식별자입니다.'},400);
  if(match&&match[1]==='documents'){
    const id=match[2];
    if(request.method==='GET'){const row=await env.DB.prepare('SELECT id,title,state,revision,updated FROM documents WHERE workspace=? AND id=?').bind(room,id).first();return row?json(row):json({error:'문서를 찾을 수 없습니다.'},404);}
    if(request.method==='PUT'){
      const body=await readBody(request);if(typeof body.state!=='string')return json({error:'문서 데이터가 없습니다.'},400);
      for(let attempt=0;attempt<8;attempt++){
        const row=await env.DB.prepare('SELECT state,revision,updated FROM documents WHERE workspace=? AND id=?').bind(room,id).first();
        const merged=mergeDocument(row?.state,body.state);
        if(merged.state.length>2800000)return json({error:'문서가 너무 큽니다. 이미지를 줄이거나 문서를 나눠 주세요.'},413);
        if(row?.state===merged.state)return json({state:row.state,revision:row.revision,updated:row.updated});
        const updated=new Date().toISOString();
        const result=row?await env.DB.prepare('UPDATE documents SET title=?,state=?,revision=revision+1,updated=? WHERE workspace=? AND id=? AND revision=?').bind(merged.title,merged.state,updated,room,id,row.revision).run():await env.DB.prepare('INSERT OR IGNORE INTO documents (workspace,id,title,state,revision,updated) VALUES (?,?,?,?,1,?)').bind(room,id,merged.title,merged.state,updated).run();
        if(result.meta.changes)return json({state:merged.state,revision:(row?.revision||0)+1,updated});
      }return json({error:'동시 저장 요청이 많습니다. 잠시 후 자동 재시도합니다.'},409);
    }
  }
  if(url.pathname==='/api/courses'&&request.method==='GET'){const rows=await env.DB.prepare('SELECT id,data,revision,updated FROM courses WHERE workspace=? ORDER BY updated DESC LIMIT 500').bind(room).all();return json(rows.results.map(r=>({id:r.id,...JSON.parse(r.data),revision:r.revision,updated:r.updated})));}
  if(match&&match[1]==='courses'&&request.method==='PUT'){
    const id=match[2],body=await readBody(request),data=validateCourse(body),updated=new Date().toISOString();
    const result=body.revision?await env.DB.prepare('UPDATE courses SET data=?,revision=revision+1,updated=? WHERE workspace=? AND id=? AND revision=?').bind(JSON.stringify(data),updated,room,id,body.revision).run():await env.DB.prepare('INSERT OR IGNORE INTO courses (workspace,id,data,revision,updated) VALUES (?,?,?,1,?)').bind(room,id,JSON.stringify(data),updated).run();
    if(!result.meta.changes)return json({error:'다른 사람이 먼저 수정했습니다. 현황을 다시 열어 최신 내용을 확인해 주세요.'},409);
    return json({id,...data,revision:(body.revision||0)+1,updated});
  }
  if(match&&match[1]==='drive'&&request.method==='POST'){
    if(!(env.GOOGLE_CLIENT_ID&&env.GOOGLE_CLIENT_SECRET&&env.GOOGLE_REFRESH_TOKEN))return json({error:'Google Drive 관리자 연결이 아직 없습니다. 서버 저장은 사용할 수 있습니다.'},503);
    if(!env.DRIVE_WORKSPACE_HASH||room!==env.DRIVE_WORKSPACE_HASH)return json({error:'이 작업공간의 Drive 연결은 관리자가 설정해야 합니다.'},403);
    const doc=await env.DB.prepare('SELECT title,state,updated FROM documents WHERE workspace=? AND id=?').bind(room,match[2]).first();if(!doc)return json({error:'먼저 문서를 저장해 주세요.'},404);
    const tokenResponse=await fetch('https://oauth2.googleapis.com/token',{method:'POST',body:new URLSearchParams({client_id:env.GOOGLE_CLIENT_ID,client_secret:env.GOOGLE_CLIENT_SECRET,refresh_token:env.GOOGLE_REFRESH_TOKEN,grant_type:'refresh_token'})});
    if(!tokenResponse.ok)return json({error:'Drive 관리자 연결을 갱신해야 합니다.'},502);
    const {access_token}=await tokenResponse.json(),form=new FormData();
    form.append('metadata',new Blob([JSON.stringify({name:doc.title+'_'+new Date().toISOString().replace(/[:.]/g,'-')+'.asea.json',parents:[storage.folderId]})],{type:'application/json'}));
    form.append('file',new Blob([JSON.stringify({format:'asea-report-v1',title:doc.title,state:doc.state})],{type:'application/json'}));
    const response=await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,webViewLink',{method:'POST',headers:{Authorization:`Bearer ${access_token}`},body:form});
    if(!response.ok)return json({error:'Drive 폴더 쓰기 권한 또는 저장 용량을 확인해 주세요.'},502);
    return json(await response.json());
  }
  return json({error:'요청한 기능이 없습니다.'},404);
}
export default {async fetch(request,env){
  try {
    const path=new URL(request.url).pathname;
    if(path.startsWith('/api/'))return await api(request,env);
    if(!['GET','HEAD'].includes(request.method))return new Response('Method not allowed',{status:405});
    const asset=assets[path==='/'?'/index.html':path];if(!asset)return new Response('Not found',{status:404});
    return new Response(request.method==='HEAD'?null:asset.body,{headers:{'Content-Type':asset.type,'X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','Cache-Control':path==='/index.html'||path==='/'?'no-cache':'public,max-age=31536000,immutable','Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'self' https://chatgpt.com https://chatgpt.site https://*.chatgpt.site"}});
  }catch(error){return json({error:error instanceof SyntaxError?'입력 형식을 확인해 주세요.':String(error.message||'요청을 처리하지 못했습니다.').slice(0,250)},400);}
}};
