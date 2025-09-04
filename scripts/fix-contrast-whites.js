#!/usr/bin/env node
// scripts/fix-contrast-whites.js
// Escanea archivos CSS bajo frontend/vite-app/src y reporta reglas con:
//  - color: white / #fff
//  - color igual a background/background-color en la misma regla
// Opciones:
//  --apply      -> reemplaza color white/#fff por #333333
//  --fix-equal  -> reemplaza color por #333333 cuando color === background

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const targetDir = path.join(root, 'frontend', 'vite-app', 'src');
const APPLY = process.argv.includes('--apply');
const FIX_EQUAL = process.argv.includes('--fix-equal');

function walk(dir, filelist = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      walk(filepath, filelist);
    } else if (/\.(css)$/.test(file)) {
      filelist.push(filepath);
    }
  });
  return filelist;
}

function normalizeColor(val) {
  if (!val) return null;
  let s = val.trim().toLowerCase();
  // strip trailing ;
  s = s.replace(/;$/, '').trim();
  // simple name mapping
  if (s === 'white') return '#ffffff';
  if (s === '#fff') return '#ffffff';
  if (s === '#ffffff') return '#ffffff';
  // remove spaces inside rgb/rgba
  if (/^rgba?\(/.test(s)) return s.replace(/\s+/g, '');
  return s;
}

function hexToRgb(hex) {
  if (!hex) return null;
  const h = hex.replace(/[^0-9a-fA-F]/g, '');
  if (h.length === 3) {
    return { r: parseInt(h[0]+h[0],16), g: parseInt(h[1]+h[1],16), b: parseInt(h[2]+h[2],16) };
  }
  if (h.length === 6) {
    return { r: parseInt(h.slice(0,2),16), g: parseInt(h.slice(2,4),16), b: parseInt(h.slice(4,6),16) };
  }
  return null;
}

function luminanceFromRgb(r,g,b) {
  // convert sRGB to linear
  const srgb = [r/255, g/255, b/255].map(v => {
    return v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4);
  });
  return 0.2126*srgb[0] + 0.7152*srgb[1] + 0.0722*srgb[2];
}

function contrastRatio(rgb1, rgb2) {
  const L1 = luminanceFromRgb(rgb1.r, rgb1.g, rgb1.b);
  const L2 = luminanceFromRgb(rgb2.r, rgb2.g, rgb2.b);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

function findBlocks(content) {
  // crude CSS block splitter: selector { ... }
  const blocks = [];
  const regex = /([^{]+)\{([^}]+)\}/gms;
  let m;
  while ((m = regex.exec(content)) !== null) {
    blocks.push({ selector: m[1].trim(), body: m[2].trim(), start: m.index });
  }
  return blocks;
}

function parseDeclarations(body) {
  const decls = {};
  const lines = body.split(/;\s*/);
  lines.forEach(l => {
    const idx = l.indexOf(':');
    if (idx === -1) return;
    const prop = l.slice(0, idx).trim().toLowerCase();
    const val = l.slice(idx + 1).trim();
    if (prop) decls[prop] = val;
  });
  return decls;
}

function reportAndFixFile(filepath) {
  const content = fs.readFileSync(filepath, 'utf8');
  const blocks = findBlocks(content);
  let modified = false;
  const reports = [];

  blocks.forEach(b => {
    const decls = parseDeclarations(b.body);
    const colorRaw = decls['color'];
    const bgRaw = decls['background-color'] || decls['background'];
    const color = normalizeColor(colorRaw);
    const bg = normalizeColor(bgRaw);

    // detect white color occurrences
    if (color && color === '#ffffff') {
      reports.push({ selector: b.selector, issue: 'color: white', colorRaw });
    }

    // detect very light foregrounds by luminance
    if (color) {
      const rgbC = hexToRgb(color);
      if (rgbC) {
        const lumC = luminanceFromRgb(rgbC.r, rgbC.g, rgbC.b);
        if (lumC > 0.9) {
          reports.push({ selector: b.selector, issue: 'very-light-foreground', colorRaw, lum: lumC.toFixed(3) });
        }
      }
    }

    // detect color == background (exact match)
    if (color && bg && color === bg) {
      reports.push({ selector: b.selector, issue: 'color equals background', colorRaw, bgRaw });
    }

    // detect low contrast if both present and can parse hex
    if (color && bg) {
      const rgbC = hexToRgb(color);
      const rgbB = hexToRgb(bg);
      if (rgbC && rgbB) {
        const ratio = contrastRatio(rgbC, rgbB);
        if (ratio < 4.5) {
          reports.push({ selector: b.selector, issue: 'low-contrast', ratio: ratio.toFixed(2), colorRaw, bgRaw });
        }
      }
    }

    // apply fixes if requested
    if (APPLY && color && color === '#ffffff') {
      // replace color white in the block
      const newBody = b.body.replace(/color:\s*(?:#fff(?:fff)?|white)\s*;?/ig, 'color: #333333;');
      if (newBody !== b.body) {
        content = content.replace(b.body, newBody);
        modified = true;
      }
    }
  });

  // Handle FIX_EQUAL separately because we need to mutate content reliably
  if (FIX_EQUAL) {
    let newContent = content;
    blocks.forEach(b => {
      const decls = parseDeclarations(b.body);
      const colorRaw = decls['color'];
      const bgRaw = decls['background-color'] || decls['background'];
      const color = normalizeColor(colorRaw);
      const bg = normalizeColor(bgRaw);
      if (color && bg && color === bg) {
        // replace the color declaration with #333333
        if (/color\s*:/i.test(b.body)) {
          const replaced = b.body.replace(/(color:\s*)([^;]+)(;?)/i, `$1 #333333$3`);
          newContent = newContent.replace(b.body, replaced);
          modified = true;
          reports.push({ selector: b.selector, issue: 'fixed color==background' });
        }
      }
    });
    if (modified) {
      fs.writeFileSync(filepath, newContent, 'utf8');
    }
  }

  if (reports.length) {
    console.log('\nFile:', filepath);
    reports.forEach(r => {
      if (r.issue === 'color: white') console.log(`  Selector: ${r.selector} -> ${r.issue} (${r.colorRaw})`);
      else if (r.issue === 'color equals background') console.log(`  Selector: ${r.selector} -> ${r.issue} (color:${r.colorRaw} background:${r.bgRaw})`);
      else console.log(`  Selector: ${r.selector} -> ${r.issue}`);
    });
  }

  return modified;
}

function main() {
  console.log('Scanning CSS for white text and color==background under', targetDir);
  const files = walk(targetDir);
  let filesWithIssues = 0;
  let filesModified = 0;
  files.forEach(f => {
    const content = fs.readFileSync(f, 'utf8');
    if (/(?:color\s*:\s*(?:#fff|#ffffff|white))/i.test(content) || /background(?:-color)?\s*:/i.test(content)) {
      const changed = reportAndFixFile(f);
      filesWithIssues++;
      if (changed) filesModified++;
    }
  });

  console.log('\nSummary:');
  console.log(`  Files scanned with potential issues: ${filesWithIssues}`);
  if (APPLY || FIX_EQUAL) console.log(`  Files modified: ${filesModified}`);
  console.log('\nRecommendations: review reported selectors and run with --fix-equal or --apply to auto-fix color declarations to #333333.');
}

main();
