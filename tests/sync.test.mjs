import {test} from 'node:test';
import assert from 'node:assert/strict';
import * as Y from 'yjs';
import {toBase64,fromBase64,mergeDocument,validateCourse} from '../app/sync.js';
import {api} from '../worker/index.js';
import {localDatabase} from '../scripts/local-db.mjs';
const token='a'.repeat(48),other='b'.repeat(48),id='test-document-01';
const state=d=>toBase64(Y.encodeStateAsUpdate(d));
const request=(path,method='GET',data,key=token)=>new Request('https://office.test/api/'+path,{method,headers:{'X-Workspace-Key':key,'Content-Type':'application/json'},...(data?{body:JSON.stringify(data)}:{})});
test('Concurrent offline edits converge without losing either writer',()=>{
  const base=new Y.Doc();base.getMap('meta').set('title','공동 작성');base.getText('test').insert(0,'시작');
  const a=new Y.Doc(),b=new Y.Doc();Y.applyUpdate(a,Y.encodeStateAsUpdate(base));Y.applyUpdate(b,Y.encodeStateAsUpdate(base));a.getText('test').insert(2,' A');b.getText('test').insert(2,' B');
  const ab=mergeDocument(mergeDocument(state(base),state(a)).state,state(b));
  const ba=mergeDocument(mergeDocument(state(base),state(b)).state,state(a));
  const da=new Y.Doc(),db=new Y.Doc();Y.applyUpdate(da,fromBase64(ab.state));Y.applyUpdate(db,fromBase64(ba.state));
  assert.equal(da.getText('test').toString(),db.getText('test').toString());assert.match(da.getText('test').toString(),/A/);assert.match(da.getText('test').toString(),/B/);
  for(const d of [base,a,b,da,db])d.destroy();
});
test('Document API persists, merges concurrent writes, and isolates workspaces',async()=>{
  const DB=localDatabase(),env={DB};try{
    const base=new Y.Doc();base.getMap('meta').set('title','저장 시험');
    assert.equal((await api(request('documents/'+id,'PUT',{state:state(base)}),env)).status,200);
    assert.equal((await api(request('documents/'+id,'GET',null,other),env)).status,404);
    const a=new Y.Doc(),b=new Y.Doc();Y.applyUpdate(a,Y.encodeStateAsUpdate(base));Y.applyUpdate(b,Y.encodeStateAsUpdate(base));a.getText('test').insert(0,'첫 번째');b.getText('test').insert(0,'두 번째');
    const results=await Promise.all([api(request('documents/'+id,'PUT',{state:state(a)}),env),api(request('documents/'+id,'PUT',{state:state(b)}),env)]);assert.ok(results.every(r=>r.status===200));
    const data=await(await api(request('documents/'+id),env)).json();const merged=new Y.Doc();Y.applyUpdate(merged,fromBase64(data.state));assert.match(merged.getText('test').toString(),/첫 번째/);assert.match(merged.getText('test').toString(),/두 번째/);assert.ok(data.revision>=3);
    assert.equal((await api(request('documents','GET',null,''),env)).status,401);
    for(const d of [base,a,b,merged])d.destroy();
  }finally{DB.close();}
});
test('Course validation and revision checks protect existing records',async()=>{
  const course={name:'신규 과정',person:'시험 담당',department:'시험 부서',start:'2026-11-11',end:'2026-11-12',people:3,status:'준비'};
  assert.throws(()=>validateCourse({...course,end:'2026-11-01'}));assert.throws(()=>validateCourse({...course,people:-1}));
  const DB=localDatabase(),env={DB};try{
    assert.equal((await api(request('courses/test-course-01','PUT',course),env)).status,200);
    assert.equal((await api(request('courses/test-course-01','PUT',{...course,revision:1,status:'운영 중'}),env)).status,200);
    assert.equal((await api(request('courses/test-course-01','PUT',{...course,revision:1}),env)).status,409);
    const list=await(await api(request('courses'),env)).json();assert.equal(list[0].status,'운영 중');assert.equal(list[0].revision,2);
  }finally{DB.close();}
});
test('Unconfigured Drive never reports a successful save',async()=>{const DB=localDatabase();try{const r=await api(request('drive/'+id,'POST'),{DB});assert.equal(r.status,503);}finally{DB.close();}});
