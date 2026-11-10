import http from 'node:http';
import worker from '../dist/server/index.js';
import { localDatabase } from './local-db.mjs';
import { mkdirSync } from 'node:fs';
mkdirSync('.analysis',{recursive:true});const DB=localDatabase('.analysis/preview.sqlite');
const server=http.createServer(async(req,res)=>{try{const data=[];for await(const c of req)data.push(c);const request=new Request('http://127.0.0.1:4173'+req.url,{method:req.method,headers:req.headers,...(['GET','HEAD'].includes(req.method)?{}:{body:Buffer.concat(data)})});const response=await worker.fetch(request,{DB});res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()));}catch(e){res.writeHead(500);res.end(String(e));}});
server.listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173'));
process.on('SIGTERM',()=>{server.close();DB.close();});
