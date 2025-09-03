#!/usr/bin/env node
// scripts/fix-contrast-whites.js
// Escanea archivos CSS bajo frontend/vite-app/src y reporta reglas con `color: white/#fff`.
// Opcionalmente reemplaza los valores por `#333333` si se pasa --apply

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const targetDir = path.join(root, 'frontend', 'vite-app', 'src');
const APPLY = process.argv.includes('--apply');

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

function reportAndFixFile(filepath) {
  const content = fs.readFileSync(filepath, 'utf8');
  const lines = content.split(/\r?\n/);
  let changed = false;
  const issues = [];

  // simple regex for color declarations using white
  const colorRegex = /color:\s*(?:#fff(?:fff)?|white)\s*;?/ig;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (colorRegex.test(line)) {
      issues.push({ line: i + 1, text: line.trim() });
    }
    colorRegex.lastIndex = 0;
  }

  if (issues.length) {
    console.log('\nFile:', filepath);
    issues.forEach(it => console.log(`  Ln ${it.line}: ${it.text}`));

    if (APPLY) {
      // Replace white color values with #333333 (mejor contraste sobre fondos claros)
      const newContent = content.replace(/color:\s*(?:#fff(?:fff)?|white)\s*;?/ig, 'color: #333333;');
      if (newContent !== content) {
        fs.writeFileSync(filepath, newContent, 'utf8');
        console.log('  -> Replaced white color declarations with #333333');
        changed = true;
      }
    }
  }
  return changed;
}

function main() {
  console.log('Scanning CSS for white text (color: white / #fff) under', targetDir);
  const files = walk(targetDir);
  let totalIssues = 0;
  let modified = 0;
  files.forEach(f => {
    const content = fs.readFileSync(f, 'utf8');
    if (/(?:color:\s*(?:#fff(?:fff)?|white))/i.test(content)) {
      totalIssues++;
      const changed = reportAndFixFile(f);
      if (changed) modified++;
    }
  });

  console.log('\nSummary:');
  console.log(`  Files with potential white-text issues: ${totalIssues}`);
  if (APPLY) console.log(`  Files modified: ${modified}`);
  console.log('\nRecommendation: review reported locations and, if desired, run with --apply to change to #333333, then adjust colors to match the design tokens.');
}

main();
