// One Word From Grandma — the single word a grandma would text about AI.
// "doohickey": what she calls the clever little machine on the counter,
// said with a smile and zero idea how it works. One word, nine letters.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const GRANDMA_WORD = "doohickey";

function checkWord(word: string): void {
  if (!/^[A-Za-z]+$/.test(word)) {
    throw new Error("entry must be one word, letters only, no spaces");
  }
  if (word.length < 1 || word.length > 30) {
    throw new Error(`entry must be 1-30 characters, got ${word.length}`);
  }
}

checkWord(GRANDMA_WORD);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, GRANDMA_WORD, "utf8");

const roundTrip = readFileSync(outPath, "utf8");
if (roundTrip !== GRANDMA_WORD) {
  throw new Error("entry.txt does not match the word");
}
console.log(GRANDMA_WORD);
