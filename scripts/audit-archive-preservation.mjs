#!/usr/bin/env node
// Portfolio preservation guard. Finds lost historical material but never changes any files.
import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const cfg=JSON.parse(fs.readFileSync(path.join(root,'database/archive-preservation-checks.json'),'utf8'));
const problems=[];
for(const rule of cfg.checks){
  const pathAbs=path.join(root,rule.file);
  if(!fs.existsSync(pathAbs)){problems.push({id:rule.id,kind:'missing_file',file:rule.file});continue;}
  const text=fs.readFileSync(pathAbs,'utf8');
  for(const literal of rule.required_literals||[]){
    if(!text.includes(literal)) problems.push({id:rule.id,kind:'lost_historic_fact_or_url',file:rule.file,expected:literal,source:rule.source||null});
  }
}
const file=path.join(root,'reports/archive-preservation.json');fs.mkdirSync(path.dirname(file),{recursive:true});
fs.writeFileSync(file,JSON.stringify({schema:'portfolio-preservation-report.v1',checked_at:new Date().toISOString(),checks:cfg.checks.length,problems},null,2)+'\n');
const lines=['## Historic archive preservation', '',`- Rules checked: ${cfg.checks.length}`,`- Missing historic facts/links: ${problems.length}`, '',...problems.map(x=>'- '+x.id+': '+x.file+' missing '+(x.expected||'file'))];
const txt=lines.join('\n')+'\n';process.stdout.write(txt);if(process.env.GITHUB_STEP_SUMMARY)fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY,txt);
if(problems.length)process.exitCode=1;
