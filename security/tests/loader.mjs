/**
 * ESM resolve hook for the '@/' path alias used by Next.js.
 * This file is passed as the hooks module to node:module register().
 *
 * Usage (via register.mjs):
 *   node --import ./security/tests/register.mjs --test <file>
 */
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// repo root  = two dirs up from  security/tests/
const ROOT = path.resolve(fileURLToPath(import.meta.url), '../../..');

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('@/')) {
    let abs = path.join(ROOT, specifier.slice(2));
    // Append .js extension if missing (ESM requires explicit extensions).
    if (!path.extname(abs)) abs += '.js';
    return nextResolve(`file://${abs}`, context);
  }
  return nextResolve(specifier, context);
}
