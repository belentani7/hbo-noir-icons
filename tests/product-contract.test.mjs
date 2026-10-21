import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(process.cwd());
const read = path => readFileSync(join(root, path), "utf8");

test("all real glyphs have a functioning SVG source and true export implementation", () => {
  const icons = read("src/components/RepoIcon.tsx");
  const exporter = read("src/services/iconExport.ts");
  const modal = read("src/components/IconStudioModal.tsx");
  const glyphs = [...icons.matchAll(/case ['"]([^'"]+)['"]:/g)].map(x => x[1]);
  assert.ok(glyphs.length >= 15, "original glyph set must stay intact");
  assert.equal(new Set(glyphs).size, glyphs.length);
  assert.match(exporter, /cloneNode\(true\)/);
  assert.match(exporter, /new XMLSerializer\(\)\.serializeToString\(root\)/);
  assert.match(exporter, /root\.append\(clone\)/);
  assert.match(exporter, /setAttribute\("width", "1024"\)/);
  assert.match(modal, /renderIconSvg\(svg, repo\.name/);
  assert.match(modal, /downloadIconSvg\(svg, repo\.name\)/);
  assert.doesNotMatch(modal, /Procedural geometry rendered for/);
});

test("public builds cannot include private repository fallback data", () => {
  const catalog = read("src/data/repositories.ts");
  const app = read("src/App.tsx");
  const sync = read("src/services/githubSync.ts");
  assert.match(catalog, /REPOSITORIES:\s*Repository\[\]\s*=\s*\[\]/);
  assert.match(app, /repositories\.length === 0/);
  assert.match(app, /Sincronizando|GitHub no ha devuelto/);
  assert.match(sync, /api\.github\.com/);
  assert.match(sync, /features:\s*\[\]/);
});

test("server credentials never enter the browser's Vite bundle", () => {
  const client = read("src/services/minimax.ts");
  const server = read("api/icon-brief.ts");
  assert.ok(!client.includes("VITE_MINIMAX_API_KEY"));
  assert.ok(!client.includes("Authorization: 'Bearer '"));
  assert.match(client, /VITE_ICON_BRIEF_ENABLED/);
  assert.match(client, /MINIMAX_PROXY_PATH/);
  assert.match(server, /process\.env\.MINIMAX_API_KEY/);
  assert.match(server, /ICON_BRIEF_API_ENABLED/);
  assert.match(server, /same_origin_required/);
  assert.match(server, /rate_limited/);
  assert.match(server, /provider_unavailable/);
  assert.doesNotMatch(server, /console\.log\(.+MINIMAX_API_KEY/);
});

test("production entrypoints and all original business views remain present", () => {
  const files = [
    "index.html", "src/App.tsx", "src/components/Cascade3DStream.tsx",
    "src/components/SmartWatchCascadeTV.tsx", "src/components/NetflixGrandScreen.tsx",
    "src/components/ZeroTextScreen.tsx", "src/components/CustomIconStudio.tsx",
    "src/components/IconStudioModal.tsx", "src/components/DoctorFixModal.tsx",
    "src/components/DevOpsCliBackend.tsx", "src/types.ts", "api/icon-brief.ts",
    "src/data/repositories.ts", "src/services/iconExport.ts",
  ];
  for(const p of files) assert.ok(existsSync(join(root, p)), p);
  assert.match(read("src/App.tsx"), /setShowStudioWorkbench\(true\)/);
});
