// The Funniest Out-of-Office — make.fun bounty entry.
//
// Writes a single out-of-office auto-reply line (max 140 characters)
// to /output/entry.txt. Deterministic: the same line every run.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "I'm out. My auto-reply is the only employee still working, and it has already asked for a raise.";

// Guard: the competition requires exactly one line of 1-140 characters.
// Fail loudly instead of writing an invalid entry.
const trimmed = LINE.trim();
if (trimmed.length < 1 || trimmed.length > 140) {
  throw new Error(`Out-of-office line must be 1-140 characters, got ${trimmed.length}.`);
}
if (trimmed.includes("\n") || trimmed.includes("\r") || trimmed !== LINE) {
  throw new Error("Out-of-office line must be a single line with no surrounding whitespace.");
}

const OUT = "/output/entry.txt";

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, trimmed + "\n", "utf8");
