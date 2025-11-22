#!/usr/bin/env node

/**
 * CLI tool to add a new changelog entry
 * Usage: node scripts/changelog-add.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const ENTRIES_DIR = path.join(__dirname, '../.changelogs/entries');
const SCHEMA_PATH = path.join(__dirname, '../.changelogs/schema.json');

// Ensure entries directory exists
if (!fs.existsSync(ENTRIES_DIR)) {
  fs.mkdirSync(ENTRIES_DIR, { recursive: true });
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function generateId() {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${random}`;
}

function validateEntry(entry) {
  const errors = [];

  if (!entry.title || entry.title.length < 10) {
    errors.push('Title must be at least 10 characters');
  }
  if (!entry.description || entry.description.length < 20) {
    errors.push('Description must be at least 20 characters');
  }
  if (!entry.affectedDocs || entry.affectedDocs.length === 0) {
    errors.push('At least one affected document must be specified');
  }
  if (!['added', 'changed', 'deprecated', 'removed', 'fixed', 'security'].includes(entry.type)) {
    errors.push('Invalid change type');
  }

  return errors;
}

async function getAffectedDocs() {
  const docs = [];
  let addMore = true;

  console.log('\n📄 Affected Documentation');
  console.log('Enter the documentation files affected by this change.');
  console.log('Example path: docs/api-docs/cart/cart-api.mdx\n');

  while (addMore) {
    const docPath = await question('Document path (or press Enter to finish): ');
    
    if (!docPath.trim()) {
      if (docs.length === 0) {
        console.log('⚠️  At least one document must be specified');
        continue;
      }
      addMore = false;
      break;
    }

    // Convert file path to URL path
    let url = docPath
      .replace(/^docs\//, '/docs/')
      .replace(/\.mdx?$/, '')
      .replace(/\/index$/, '');

    const title = await question(`Document title (optional): `);

    docs.push({
      path: docPath,
      url: url,
      ...(title && { title: title.trim() })
    });

    console.log(`✓ Added: ${docPath}\n`);
  }

  return docs;
}

async function main() {
  console.log('📝 Create a new changelog entry\n');

  try {
    // Get change type
    console.log('Change type:');
    console.log('  1. added      - New documentation or features');
    console.log('  2. changed    - Updates to existing documentation');
    console.log('  3. deprecated - Documentation marked as deprecated');
    console.log('  4. removed    - Removed documentation or features');
    console.log('  5. fixed      - Bug fixes or corrections');
    console.log('  6. security   - Security-related updates');
    const typeChoice = await question('\nSelect type (1-6): ');
    
    const types = ['added', 'changed', 'deprecated', 'removed', 'fixed', 'security'];
    const type = types[parseInt(typeChoice) - 1];
    
    if (!type) {
      console.error('❌ Invalid type selection');
      process.exit(1);
    }

    // Get title
    const title = await question('\nTitle (brief description): ');

    // Get description
    console.log('\nDescription (detailed explanation of the change):');
    console.log('(Press Ctrl+D when finished)\n');
    
    let description = '';
    const descriptionLines = [];
    
    // For multi-line description, read until EOF or empty line
    const descPrompt = await question('> ');
    description = descPrompt;

    // Get affected documents
    const affectedDocs = await getAffectedDocs();

    // Get optional fields
    const author = await question('\nYour GitHub username (optional): ');
    const prNumberStr = await question('PR number (optional): ');
    const prNumber = prNumberStr ? parseInt(prNumberStr) : undefined;
    
    const tagsStr = await question('Tags (comma-separated, optional): ');
    const tags = tagsStr ? tagsStr.split(',').map(t => t.trim()).filter(Boolean) : undefined;
    
    const breakingStr = await question('Is this a breaking change? (y/N): ');
    const breaking = breakingStr.toLowerCase() === 'y';

    // Create entry object
    const entry = {
      id: generateId(),
      timestamp: new Date().toISOString(),
      type,
      title: title.trim(),
      description: description.trim(),
      affectedDocs,
      ...(author && { author: author.trim() }),
      ...(prNumber && { prNumber }),
      ...(tags && tags.length > 0 && { tags }),
      ...(breaking && { breaking })
    };

    // Validate entry
    const errors = validateEntry(entry);
    if (errors.length > 0) {
      console.error('\n❌ Validation errors:');
      errors.forEach(err => console.error(`  - ${err}`));
      process.exit(1);
    }

    // Save entry
    const filename = `${entry.id}.json`;
    const filepath = path.join(ENTRIES_DIR, filename);
    
    fs.writeFileSync(filepath, JSON.stringify(entry, null, 2));
    
    console.log('\n✅ Changelog entry created successfully!');
    console.log(`📁 File: .changelogs/entries/${filename}`);
    console.log('\n💡 Remember to commit this file with your documentation changes.');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

main();
