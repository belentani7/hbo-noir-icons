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

test("Doctor Fix offers reviewable previews, not broken generators or Github writes",()=>{
  const modal=source("src/components/DoctorFixModal.tsx");
  const previews=source("src/services/doctorFixPreviews.ts");
  for(const name of [
    "generatePagesWorkflow","generatePhalanxWorkflow","generateSecurityPolicy",
    "generateReadme","generatePythonDoctorScript","generateGhCliCommands"
  ]) assert.match(previews,new RegExp("static " + name + "\\("));
  assert.match(modal,/services\/doctorFixPreviews/);
  assert.doesNotMatch(modal,/diag\.healthScore/);
  assert.match(modal,/diag\.severity/);
  assert.match(previews,/workflow_dispatch/);
  assert.doesNotMatch(previews,/git push|gh repo delete|gh pr merge/);
});

test("product package is branded and clean never removes tracked source files", () => {
  const manifest=JSON.parse(source("package.json"));
  const lock=JSON.parse(source("package-lock.json"));
  assert.equal(manifest.name,"belentani-noir-icons");
  assert.equal(lock.name,manifest.name);
  assert.equal(lock.packages[""].name,manifest.name);
  assert.match(manifest.scripts.clean,/rmSync\('dist'/);
  assert.doesNotMatch(manifest.scripts.clean,/rm\s+-rf|server\.js/);
});


test("security and fix commands must not fabricate execution or compliance",()=>{
  const cli=source("src/components/DevOpsCliBackend.tsx");
  const forbidden=[
    "FIPS 140-3 COMPLIANT",
    "100% ACTIVO & VERIFICADO",
    "VERIFICACIÓN CRIPTOGRÁFICA SHA-256 COMPLETADA",
    "AUTO-FIX EJECUTADO CON ÉXITO",
    "33 / 33 ARCHIVOS VERIFICADOS",
    "Secret Scanning: 0 filtraciones",
    "14 Repositorios Públicos Sincronizados y Blindados",
  ];
  for(const claim of forbidden) assert.ok(!cli.includes(claim),claim);
  for(const text of ["NO VERIFICADO EN EL NAVEGADOR","No se ha calculado ningún hash",
    "GUÍA DE CORRECCIÓN (NO EJECUTADA)","No se ejecutan comandos Linux"]) {
    assert.ok(cli.includes(text),text);
  }
});

test("CLI security, kernel and harmony commands never claim checks they did not execute", () => {
  const cli = source("src/components/DevOpsCliBackend.tsx");
  for (const fabricated of [
    "SISTEMA 100% SEGURO · SANDBOX TOTALMENTE AISLADO",
    "Integridad verificada:",
    "EVALUACIÓN DE ARMONÍA MATEMÁTICA: 100% CUMPLIMIENTO",
    "Sandbox local blindado",
    "Congestion control optimizado",
    "Compresión lz4 in-RAM",
    "Auditoría criptográfica de integridad SHA-256 en vivo",
    "Corrección automática de permisos y saltos LF",
    "Informe de seguridad de sandbox y cero riesgos",
    "Catálogo de los 14 proyectos",
  ]) assert.ok(!cli.includes(fabricated), fabricated);
  for (const disclosure of [
    "NO AUDITADO DESDE ESTA INTERFAZ",
    "Ningún hash se ha calculado aquí",
    "esta web no inspecciona el kernel",
    "SIN EVALUACIÓN AUTOMÁTICA DE CUMPLIMIENTO",
    "Guía de corrección manual; sin escritura de archivos",
    "Catálogo visible de proyectos públicos o fichas editoriales",
  ]) assert.ok(cli.includes(disclosure), disclosure);
});

test("shared view contracts match real UI controls and unverified data stays honest", () => {
  const types = source("src/types.ts");
  const app = source("src/App.tsx");
  const watch = source("src/components/SmartWatchCascadeTV.tsx");
  const drawer = source("src/components/LiquidLightArticleDrawer.tsx");
  const cli = source("src/components/DevOpsCliBackend.tsx");
  for (const mode of ["wallet-stack", "cover-flow", "cylinder-crown", "smartwatch-cascade", "liquid-bloom", "hbo-noir"]) {
    assert.ok(types.includes(mode), mode);
  }
  assert.match(app, /lastSyncTime=\{syncState\.lastSyncTime\}/);
  assert.doesNotMatch(watch, /setAutoSyncCount|SYNC #\{autoSyncCount\}/);
  assert.match(watch, /Catálogo sin verificar/);
  assert.match(drawer, /SIN PAPER DOCUMENTADO/);
  assert.match(cli, /sin fuente científica declarada/);
});
