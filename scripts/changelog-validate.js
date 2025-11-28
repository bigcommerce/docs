#!/usr/bin/env node

/**
 * CLI tool to validate changelog entries
 * Usage: node scripts/changelog-validate.js [entry-file]
 */

const fs = require('fs');
const path = require('path');

const ENTRIES_DIR = path.join(__dirname, '../.changelogs/entries');
const SCHEMA_PATH = path.join(__dirname, '../.changelogs/schema.json');

function validateEntry(entry, filename) {
  const errors = [];

  // Required fields
  if (!entry.id) errors.push('Missing required field: id');
  if (!entry.timestamp) errors.push('Missing required field: timestamp');
  if (!entry.type) errors.push('Missing required field: type');
  if (!entry.title) errors.push('Missing required field: title');
  if (!entry.description) errors.push('Missing required field: description');
  if (!entry.affectedDocs) errors.push('Missing required field: affectedDocs');

  // Field validations
  if (entry.id && !/^[a-z0-9-]+$/.test(entry.id)) {
    errors.push('Invalid id format (must be lowercase alphanumeric with hyphens)');
  }

  if (entry.timestamp) {
    const date = new Date(entry.timestamp);
    if (isNaN(date.getTime())) {
      errors.push('Invalid timestamp format (must be ISO 8601)');
    }
  }

  if (entry.type && !['added', 'changed', 'deprecated', 'removed', 'fixed', 'security'].includes(entry.type)) {
    errors.push('Invalid type (must be: added, changed, deprecated, removed, fixed, or security)');
  }

  if (entry.title && entry.title.length < 10) {
    errors.push('Title must be at least 10 characters');
  }

  if (entry.title && entry.title.length > 200) {
    errors.push('Title must not exceed 200 characters');
  }

  if (entry.description && entry.description.length < 20) {
    errors.push('Description must be at least 20 characters');
  }

  if (entry.affectedDocs) {
    if (!Array.isArray(entry.affectedDocs)) {
      errors.push('affectedDocs must be an array');
    } else if (entry.affectedDocs.length === 0) {
      errors.push('affectedDocs must contain at least one item');
    } else {
      entry.affectedDocs.forEach((doc, index) => {
        if (!doc.path) {
          errors.push(`affectedDocs[${index}] missing required field: path`);
        }
        if (!doc.url) {
          errors.push(`affectedDocs[${index}] missing required field: url`);
        }
      });
    }
  }

  if (entry.prNumber !== undefined) {
    if (typeof entry.prNumber !== 'number' || entry.prNumber < 1) {
      errors.push('prNumber must be a positive integer');
    }
  }

  return errors;
}

function validateFile(filepath) {
  console.log(`Validating: ${path.basename(filepath)}`);
  
  try {
    const content = fs.readFileSync(filepath, 'utf8');
    const entry = JSON.parse(content);
    const errors = validateEntry(entry, path.basename(filepath));

    if (errors.length > 0) {
      console.error(`❌ Validation failed:`);
      errors.forEach(err => console.error(`  - ${err}`));
      return false;
    }

    console.log(`✅ Valid\n`);
    return true;
  } catch (error) {
    console.error(`❌ Error: ${error.message}\n`);
    return false;
  }
}

function main() {
  const args = process.argv.slice(2);
  
  let filesToValidate = [];

  if (args.length > 0) {
    // Validate specific file
    filesToValidate = args.map(arg => {
      if (path.isAbsolute(arg)) {
        return arg;
      }
      return path.join(ENTRIES_DIR, arg);
    });
  } else {
    // Validate all entries
    const files = fs.readdirSync(ENTRIES_DIR)
      .filter(f => f.endsWith('.json'))
      .map(f => path.join(ENTRIES_DIR, f));
    
    filesToValidate = files;
  }

  if (filesToValidate.length === 0) {
    console.log('ℹ️  No changelog entries to validate');
    process.exit(0);
  }

  console.log(`📋 Validating ${filesToValidate.length} changelog entries...\n`);

  let allValid = true;
  filesToValidate.forEach(filepath => {
    if (!validateFile(filepath)) {
      allValid = false;
    }
  });

  if (allValid) {
    console.log(`✨ All changelog entries are valid!`);
    process.exit(0);
  } else {
    console.log(`❌ Some changelog entries have validation errors`);
    process.exit(1);
  }
}

main();
