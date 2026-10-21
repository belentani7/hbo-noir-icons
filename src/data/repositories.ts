import type { Repository } from '../types';

/**
 * Honest fallback. The public browser API cannot access private repositories.
 * Never embed private repo names, internal docs, tokens or invented statistics
 * in a shipped public JS bundle. A browser with zero public results presents
 * an explicit no-data state and still offers the local icon studio.
 */
export const REPOSITORIES: Repository[] = [];
