import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync,existsSync} from "node:fs";
import {resolve} from "node:path";

const source = path => readFileSync(resolve(".",path),"utf8");

test("the original HBO Noir app and all cinematic modes remain installed",()=>{
  for(const file of [
    "src/App.tsx","src/components/NetflixGrandScreen.tsx",
    "src/components/Cascade3DStream.tsx","src/components/SmartWatchCascadeTV.tsx",
    "src/components/CustomIconStudio.tsx","src/components/DoctorFixModal.tsx",
    "src/services/githubSync.ts","src/services/doctorFix.ts"
  ]) assert.ok(existsSync(resolve(".",file)),file);
});

test("public GitHub results are not represented as a private repository connection",()=>{
  const sourceText=source("src/services/githubSync.ts");
  assert.match(sourceText,/catalogueSource: 'public-github' \| 'editorial-fallback'/);
  assert.match(sourceText,/repositories: mapped\.length > 0 \? mapped : REPOSITORIES/);
  assert.match(sourceText,/lastError: null/);
  assert.match(sourceText,/lastError: 'No se pudo verificar/);
  assert.match(sourceText,/public_repos/);
});

test("CLI dashboard never manufactures successful checks and fake counters",()=>{
  const cli=source("src/components/DevOpsCliBackend.tsx");
  assert.doesNotMatch(cli,/SHA-256 VERIFIED/);
  assert.doesNotMatch(cli,/Uptime:.*99\.99%/);
  assert.doesNotMatch(cli,/60\.0 FPS/);
  assert.doesNotMatch(cli,/Auto-Syncs:/);
  assert.doesNotMatch(cli,/14 \/ 14/);
  assert.match(cli,/gitHubSync\.subscribe\(setPublicState\)/);
  assert.match(cli,/publicState\.lastSyncTime/);
  assert.match(cli,/Solicitud de consulta pública/);
  assert.match(cli,/final(?:ly)?\(\(\) => setIsSyncing\(false\)\)/);
});

test("catalog source and unavailable sync appear in the product, not only docs",()=>{
  const app=source("src/App.tsx");
  assert.match(app,/syncState\.catalogueSource/);
  assert.match(app,/sin acceso a repos privados/);
  assert.match(app,/syncState\.lastError/);
});
