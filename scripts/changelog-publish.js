#!/usr/bin/env node

/**
 * CLI tool to publish/aggregate changelog entries
 * Usage: node scripts/changelog-publish.js
 */

const fs = require('fs');
const path = require('path');

const ENTRIES_DIR = path.join(__dirname, '../.changelogs/entries');
const PUBLISHED_DIR = path.join(__dirname, '../.changelogs/published');
const OUTPUT_DIR = path.join(__dirname, '../docs/changelog');

// Ensure directories exist
[ENTRIES_DIR, PUBLISHED_DIR, OUTPUT_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

function loadEntries() {
  const files = fs.readdirSync(ENTRIES_DIR)
    .filter(f => f.endsWith('.json') && f !== '.gitkeep');

  return files.map(filename => {
    const filepath = path.join(ENTRIES_DIR, filename);
    const content = fs.readFileSync(filepath, 'utf8');
    return {
      filename,
      ...JSON.parse(content)
    };
  }).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

function groupByType(entries) {
  const groups = {
    added: [],
    changed: [],
    deprecated: [],
    removed: [],
    fixed: [],
    security: []
  };

  entries.forEach(entry => {
    if (groups[entry.type]) {
      groups[entry.type].push(entry);
    }
  });

  return groups;
}

function formatEntry(entry) {
  const links = entry.affectedDocs
    .map(doc => `[${doc.title || doc.path}](${doc.url})`)
    .join(', ');

  let formatted = `* ${entry.title}`;
  
  if (entry.description && entry.description !== entry.title) {
    formatted += `: ${entry.description}`;
  }
  
  if (entry.affectedDocs.length > 0) {
    formatted += ` (${links})`;
  }

  if (entry.breaking) {
    formatted = `* 🚨 **BREAKING**: ${entry.title}`;
  }

  return formatted;
}

function generateChangelogMDX(entries, version) {
  const date = new Date().toISOString().split('T')[0];
  const groups = groupByType(entries);

  let mdx = `# Changelog - ${version}\n\n`;
  mdx += `**Release Date:** ${date}\n\n`;
  mdx += `This changelog includes all documentation updates and improvements made since the last release.\n\n`;

  const typeLabels = {
    added: '✨ Added',
    changed: '📝 Changed',
    deprecated: '⚠️ Deprecated',
    removed: '🗑️ Removed',
    fixed: '🐛 Fixed',
    security: '🔒 Security'
  };

  let hasContent = false;

  Object.entries(typeLabels).forEach(([type, label]) => {
    if (groups[type].length > 0) {
      hasContent = true;
      mdx += `## ${label}\n\n`;
      groups[type].forEach(entry => {
        mdx += formatEntry(entry) + '\n';
      });
      mdx += '\n';
    }
  });

  if (!hasContent) {
    console.log('⚠️  No changelog entries found');
    return null;
  }

  // Add footer
  mdx += `---\n\n`;
  mdx += `*This changelog was automatically generated from ${entries.length} documentation update${entries.length !== 1 ? 's' : ''}.*\n`;

  return mdx;
}

function moveEntriesToPublished(entries) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const archiveDir = path.join(PUBLISHED_DIR, timestamp);
  fs.mkdirSync(archiveDir, { recursive: true });

  entries.forEach(entry => {
    const sourcePath = path.join(ENTRIES_DIR, entry.filename);
    const destPath = path.join(archiveDir, entry.filename);
    fs.renameSync(sourcePath, destPath);
  });

  console.log(`📦 Archived ${entries.length} entries to ${timestamp}`);
}

function getNextVersion() {
  // Simple date-based versioning: YYYY-MM-DD
  return new Date().toISOString().split('T')[0];
}

async function main() {
  console.log('📰 Publishing changelog...\n');

  try {
    // Load all entries
    const entries = loadEntries();

    if (entries.length === 0) {
      console.log('ℹ️  No changelog entries to publish');
      process.exit(0);
    }

    console.log(`Found ${entries.length} changelog entries`);

    // Generate version
    const version = getNextVersion();

    // Generate MDX content
    const mdxContent = generateChangelogMDX(entries, version);

    if (!mdxContent) {
      process.exit(1);
    }

    // Save changelog file
    const filename = `${version}.mdx`;
    const filepath = path.join(OUTPUT_DIR, filename);

    fs.writeFileSync(filepath, mdxContent);
    console.log(`✅ Changelog created: docs/changelog/${filename}`);

    // Move entries to published
    moveEntriesToPublished(entries);

    console.log('\n✨ Changelog published successfully!');
    console.log('\n📝 Next steps:');
    console.log('  1. Review the generated changelog');
    console.log('  2. Commit the changes');
    console.log('  3. Create a pull request');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

main();
