import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
test("offline catalog module actually exists for both App and GitHub Sync", () => {
  assert.ok(existsSync("src/data/repositories.ts"));
  const content=readFileSync("src/data/repositories.ts","utf8");
  assert.match(content,/export const REPOSITORIES/);
  assert.match(content,/belentani7\/hbo-noir-icons/);
  assert.doesNotMatch(content,/500 repositories synced|all private repositories/);
});
