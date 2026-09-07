/**
 * Seed Hash Verification — byte-identical seed verification.
 *
 * Computes SHA-256 digests of every file in a template's seed/ directory
 * and compares against reset.manifest.json. Mismatch = failure.
 *
 * Usage:
 *   tsx seed-hash.ts --verify --template-dir templates/basilica
 *   tsx seed-hash.ts --update --template-dir templates/basilica
 *
 * @packageDocumentation
 */

import { createHash } from "node:crypto";
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

interface ManifestEntry {
  path: string;
  sha256: string;
  size: number;
}

interface Manifest {
  template: string;
  version: string;
  files: Record<string, ManifestEntry>;
}

/** Compute SHA-256 digest of a file. */
function sha256(filePath: string): string {
  const content = readFileSync(filePath);
  return createHash("sha256").update(content).digest("hex");
}

/** Recursively collect all files in a directory. */
function collectFiles(dir: string, base: string = dir): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      results.push(...collectFiles(fullPath, base));
    } else {
      results.push(fullPath);
    }
  }
  return results;
}

/** Verify seed hashes against the manifest. */
function verify(templateDir: string): boolean {
  const manifestPath = join(templateDir, "reset.manifest.json");
  const manifest: Manifest = JSON.parse(readFileSync(manifestPath, "utf-8"));
  const seedDir = join(templateDir, "seed");

  let allMatch = true;

  for (const [key, entry] of Object.entries(manifest.files)) {
    const filePath = join(seedDir, entry.path);
    const actualHash = sha256(filePath);

    if (actualHash !== entry.sha256) {
      console.error(`MISMATCH: ${entry.path}`);
      console.error(`  Expected: ${entry.sha256}`);
      console.error(`  Actual:   ${actualHash}`);
      allMatch = false;
    }
  }

  if (allMatch) {
    console.log(`✓ All seed hashes match for template: ${manifest.template}`);
  }

  return allMatch;
}

/** Update the manifest with current file hashes. */
function update(templateDir: string): void {
  const manifestPath = join(templateDir, "reset.manifest.json");
  const seedDir = join(templateDir, "seed");

  const files = collectFiles(seedDir);
  const manifest: Manifest = {
    template: templateDir.split("/").pop() ?? "unknown",
    version: "1.0.0",
    files: {},
  };

  for (const filePath of files) {
    const relPath = relative(seedDir, filePath);
    const stat = statSync(filePath);
    manifest.files[relPath] = {
      path: relPath,
      sha256: sha256(filePath),
      size: stat.size,
    };
  }

  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`✓ Manifest updated: ${manifestPath} (${Object.keys(manifest.files).length} files)`);
}

// CLI
const args = process.argv.slice(2);
const mode = args.includes("--update") ? "update" : "verify";
const templateDirIdx = args.indexOf("--template-dir");
const templateDir = templateDirIdx >= 0 ? args[templateDirIdx + 1] : ".";

if (mode === "verify") {
  const ok = verify(templateDir);
  process.exit(ok ? 0 : 1);
} else {
  update(templateDir);
}
