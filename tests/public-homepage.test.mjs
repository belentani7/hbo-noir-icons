import assert from "node:assert/strict";
import test from "node:test";
import {readFileSync} from "node:fs";
import {publicHomepage} from "../src/services/publicHomepage.mjs";

test("declared HTTPS project homepage remains a valid link", () => {
  assert.equal(publicHomepage("https://project.example.com/"),"https://project.example.com/");
});
test("rejects script and file schemes, credentials, and obfuscated URLs", () => {
  for (const input of [
    "javascript:alert(1)", "data:text/html,malicious", "file:///tmp/secret",
    "https://user:pass@project.example.com", "https://project.example.com\\@evil.org",
    "https://project.example.com\njavascript:alert(1)", "//evil.example", "",
    null, undefined, "x".repeat(2100),
  ]) assert.equal(publicHomepage(input),undefined,JSON.stringify(input));
});
test("sync layer sanitizes remote homepage before any UI/catalog mapping", () => {
  const source=readFileSync(new URL("../src/services/githubSync.ts",import.meta.url),"utf8");
  assert.match(source,/import \{ publicHomepage \} from '.\/publicHomepage\.mjs';/);
  assert.match(source,/liveUrl: publicHomepage\(r\.homepage\)/);
});

test("untrusted homepage metadata blocks local networks, fragments, and insecure HTTP", () => {
  for (const value of [
    "https://127.0.0.1", "https://192.168.0.25/app",
    "https://2130706433/", "https://[::1]/",
    "https://router.local/", "https://metadata.google.internal",
    "https://example.org/#private", "https://example.org:8443",
    "http://example.org", "https://a.test",
  ]) assert.equal(publicHomepage(value), undefined, value);
});
