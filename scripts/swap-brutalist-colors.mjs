#!/usr/bin/env node
// Toggles the original brutalist template between two color schemes:
//   YELLOW: white bg + black text/borders + yellow #ffde00 accent
//   RED:    white bg + red #ff0000 text/borders + black accent
//
// Regions marked with {/* @swap-protected */} ... {/* @swap-end */} are
// "structural dark" sections — their background stays #000000 in BOTH modes
// and only the accent flips (yellow ↔ red) so highlights remain readable.
//
// Auto-detects the current mode and swaps to the other.
// Usage: node scripts/swap-brutalist-colors.mjs

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

const FILES = [
  "src/app/page.tsx",
  "src/app/templates/brutalist/page.tsx",
  "src/remotion/brutalist/BrutalistHero.tsx",
  "src/remotion/brutalist/MetricTicker.tsx",
  "src/remotion/brutalist/ProjectReel.tsx",
  "src/remotion/brutalist/ScrollTicker.tsx",
  "src/components/templates/brutalist/ProjectReelPlayer.tsx",
  "src/components/templates/brutalist/GitHubGrid.tsx",
];

const TEMPLATES_FILE = "src/content/templates.ts";
const DETECT_FILE = "src/remotion/brutalist/BrutalistHero.tsx";

const TMP = "___SWAP_TMP___";
const PROTECTED_RE =
  /\{\/\* @swap-protected \*\/\}[\s\S]*?\{\/\* @swap-end \*\/\}/g;

const detectPath = path.join(ROOT, DETECT_FILE);
if (!fs.existsSync(detectPath)) {
  console.error(`✗ Detect file not found: ${DETECT_FILE}`);
  process.exit(1);
}
const detect = fs.readFileSync(detectPath, "utf8");
const isRed = detect.includes("#ff0000");
const fromName = isRed ? "RED" : "YELLOW";
const toName = isRed ? "YELLOW" : "RED";

console.log(`◆ Detected ${fromName} mode — swapping to ${toName}\n`);

// ─────────── Normal swap (most of the page) ───────────
function yellowToRed(s) {
  s = s.replace(/bg-black\b/g, "bg-[#ff0000]");
  s = s.replace(/text-black\b/g, "text-[#ff0000]");
  s = s.replace(/border-black\b/g, "border-[#ff0000]");
  s = s.replace(/divide-black\b/g, "divide-[#ff0000]");
  s = s.split("#ffde00").join(TMP);
  s = s.split("#000000").join("#ff0000");
  s = s.replace(/#000(?![0-9a-fA-F])/g, "#ff0000");
  s = s.split(TMP).join("#000000");
  return s;
}

function redToYellow(s) {
  s = s.split("bg-[#ff0000]").join("bg-black");
  s = s.split("text-[#ff0000]").join("text-black");
  s = s.split("border-[#ff0000]").join("border-black");
  s = s.split("divide-[#ff0000]").join("divide-black");
  s = s.split("#ff0000").join(TMP);
  s = s.split("#000000").join("#ffde00");
  s = s.replace(/#000(?![0-9a-fA-F])/g, "#ffde00");
  s = s.split(TMP).join("#000000");
  return s;
}

// ─────────── Protected swap (dark contrast sections) ───────────
// Black/bg stays untouched. Only the accent flips between yellow and red.
function yellowToRedProtected(s) {
  s = s.split("#ffde00").join("#ff0000");
  // Tailwind classes: text-[#ffde00] etc. already covered by hex above
  return s;
}

function redToYellowProtected(s) {
  s = s.split("#ff0000").join("#ffde00");
  return s;
}

const swap = isRed ? redToYellow : yellowToRed;
const swapProtected = isRed ? redToYellowProtected : yellowToRedProtected;

function processContent(content) {
  // Split content into protected and unprotected segments, swap each accordingly.
  let result = "";
  let lastIndex = 0;
  for (const m of content.matchAll(PROTECTED_RE)) {
    result += swap(content.slice(lastIndex, m.index));
    result += swapProtected(m[0]);
    lastIndex = m.index + m[0].length;
  }
  result += swap(content.slice(lastIndex));
  return result;
}

// 1. Surgical edit on templates.ts brutalist palette only
{
  const fp = path.join(ROOT, TEMPLATES_FILE);
  const content = fs.readFileSync(fp, "utf8");
  const yellowPalette = '["#ffffff", "#000000", "#ffde00"]';
  const redPalette = '["#ffffff", "#ff0000", "#000000"]';
  const updated = isRed
    ? content.replace(redPalette, yellowPalette)
    : content.replace(yellowPalette, redPalette);
  if (updated !== content) {
    fs.writeFileSync(fp, updated);
    console.log(`  ✓ ${TEMPLATES_FILE}`);
  } else {
    console.log(`  - ${TEMPLATES_FILE} (no palette match)`);
  }
}

// 2. Process the rest
let changed = 0;
for (const rel of FILES) {
  const fp = path.join(ROOT, rel);
  if (!fs.existsSync(fp)) {
    console.log(`  ✗ ${rel} (missing)`);
    continue;
  }
  const content = fs.readFileSync(fp, "utf8");
  const swapped = processContent(content);
  if (swapped !== content) {
    fs.writeFileSync(fp, swapped);
    console.log(`  ✓ ${rel}`);
    changed++;
  } else {
    console.log(`  - ${rel} (no change)`);
  }
}

console.log(`\n✓ Done. ${changed} files changed. Brutalist is now ${toName}.`);
