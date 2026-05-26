import { timingSafeEqual } from "crypto";

// Always run timing-safe comparison regardless of length to prevent
// timing attacks that reveal password length information.
export function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  const maxLen = Math.max(bufA.length, bufB.length);
  const padA = Buffer.concat([bufA, Buffer.alloc(maxLen - bufA.length)]);
  const padB = Buffer.concat([bufB, Buffer.alloc(maxLen - bufB.length)]);
  return timingSafeEqual(padA, padB) && bufA.length === bufB.length;
}
