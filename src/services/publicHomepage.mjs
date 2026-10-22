/**
 * Browser-safe public homepage claims imported from unauthenticated GitHub API.
 * A homepage is user-provided metadata, not evidence of a live deployment.
 */
export function publicHomepage(value) {
  if (typeof value !== "string" || value.length > 2048 || !value.trim() ||
      /[\u0000-\u0020\u007f\\]/.test(value)) return undefined;
  try {
    const parsed = new URL(value);
    if (!["https:", "http:"].includes(parsed.protocol) ||
        !parsed.hostname || parsed.username || parsed.password) return undefined;
    // Preserve only normal web links, never script/data/file schemes or credentials.
    return parsed.href;
  } catch {
    return undefined;
  }
}
