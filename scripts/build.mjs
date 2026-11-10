import { build } from 'vite';
import { build as bundle } from 'esbuild';
import { mkdirSync, readFileSync, readdirSync, writeFileSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';
await build({build:{outDir:'dist/client',emptyOutDir:true}});
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml'};
const assets={};function visit(dir,prefix=''){for(const entry of readdirSync(dir,{withFileTypes:true})){const rel=prefix+'/'+entry.name,full=join(dir,entry.name);if(entry.isDirectory())visit(full,rel);else assets[rel]={type:types[entry.name.slice(entry.name.lastIndexOf('.'))]||'text/plain',body:readFileSync(full,'utf8')};}}
visit('dist/client');mkdirSync('worker',{recursive:true});writeFileSync('worker/assets.generated.js','export const assets = '+JSON.stringify(assets)+';');
await bundle({entryPoints:['worker/index.js'],outfile:'dist/server/index.js',bundle:true,format:'esm',platform:'browser',target:'es2022',minify:true});
mkdirSync('dist/.openai',{recursive:true});copyFileSync('.openai/hosting.json','dist/.openai/hosting.json');
console.log('Built editor assets and server with CRDT synchronization.');
