/**
 * Browser-safe public homepage claims imported from unauthenticated GitHub API.
 * A homepage is user-provided metadata, not evidence of a live deployment.
 */
export function publicHomepage(value) {
  if (typeof value !== "string" || value.length > 2048 || !value.trim() ||
      /[\u0000-\u0020\u007f\\]/.test(value)) return undefined;
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "https:" || !parsed.hostname ||
        parsed.username || parsed.password || parsed.port || parsed.hash) return undefined;
    const host = parsed.hostname.toLowerCase();
    // GitHub homepage is untrusted user metadata. Do not route users to
    // local/admin addresses, special-use names or raw IPs.
    if (host === "localhost" || !host.includes(".") ||
        host.endsWith(".localhost") || host.endsWith(".local") ||
        host.endsWith(".internal") || host.endsWith(".test") ||
        host.endsWith(".invalid") || host.endsWith(".example") ||
        /^\\d+(?:\\.\\d+){3}$/.test(host) || host.startsWith("["))
      return undefined;
    // Preserve only normal web links, never script/data/file schemes or credentials.
    return parsed.href;
  } catch {
    return undefined;
  }
}
