import { existsSync } from "node:fs";
import path from "node:path";

/** Returns the first candidate that exists under /public, or null. */
export function findPublicAsset(candidates: readonly string[]): string | null {
  return (
    candidates.find((candidate) => existsSync(path.join(process.cwd(), "public", candidate))) ??
    null
  );
}
