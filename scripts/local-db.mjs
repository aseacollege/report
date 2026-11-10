import { DatabaseSync } from 'node:sqlite';
import { readFileSync, readdirSync } from 'node:fs';
export function localDatabase(filename=':memory:'){
  const db=new DatabaseSync(filename);
  db.exec('CREATE TABLE IF NOT EXISTS local_migrations (name TEXT PRIMARY KEY)');
  for(const file of readdirSync('drizzle').filter(x=>x.endsWith('.sql')).sort()){
    if(!db.prepare('SELECT name FROM local_migrations WHERE name=?').get(file)){
      db.exec(readFileSync('drizzle/'+file,'utf8'));db.prepare('INSERT INTO local_migrations (name) VALUES (?)').run(file);
    }
  }
  return {close:()=>db.close(),prepare(sql){let args=[];const query={bind(...values){args=values;return query;},async first(){return db.prepare(sql).get(...args)||null;},async all(){return {results:db.prepare(sql).all(...args)};},async run(){const result=db.prepare(sql).run(...args);return {meta:{changes:Number(result.changes)}};}};return query;}};
}
