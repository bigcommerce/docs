# Changelog Management System Guide

This guide provides detailed information about the automated changelog management system for BigCommerce Developer Documentation.

## Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Creating Changelog Entries](#creating-changelog-entries)
4. [Publishing Changelogs](#publishing-changelogs)
5. [Automation](#automation)
6. [Best Practices](#best-practices)
7. [Troubleshooting](#troubleshooting)

## Overview

The changelog management system automates the tracking and publishing of documentation changes. It's inspired by the [changesets](https://github.com/changesets/changesets) tool and provides:

- **Individual changelog entries**: Create small, focused entries alongside documentation changes
- **Automatic aggregation**: Combine entries into comprehensive changelogs
- **Scheduled publishing**: Release changelogs weekly when entries exist
- **Direct documentation links**: Link to updated documentation pages, not PRs
- **GitHub Actions automation**: Automatic validation and publishing

## Quick Start

### For Documentation Contributors

1. Make your documentation changes
2. Create a changelog entry:
   ```bash
   npm run changelog:add
   ```
3. Follow the interactive prompts
4. Commit both your changes and the changelog entry

### For Reviewers

- Check that PRs with documentation changes include changelog entries
- The CI system will automatically validate entries and remind contributors if missing
- Review changelog entries for accuracy and clarity

## Creating Changelog Entries

### Using the CLI Tool

Run the interactive tool:

```bash
npm run changelog:add
```

The tool will prompt you for:

1. **Change Type**: Select from:
   - `added` - New documentation or features
   - `changed` - Updates to existing documentation
   - `deprecated` - Documentation marked as deprecated
   - `removed` - Removed documentation or features
   - `fixed` - Bug fixes or corrections
   - `security` - Security-related updates

2. **Title**: A brief, user-friendly description (10-200 characters)

3. **Description**: Detailed explanation of what changed and why (minimum 20 characters)

4. **Affected Documentation**: List all documentation files affected by your change
   - Provide the file path (e.g., `docs/api-docs/cart/cart-api.mdx`)
   - Optionally provide a title for the page
   - The tool will automatically generate the public URL

5. **Optional Metadata**:
   - Your GitHub username
   - PR number
   - Tags for categorization
   - Whether it's a breaking change

### Manual Creation

If you prefer to create entries manually, follow this format:

```json
{
  "id": "unique-timestamp-random",
  "timestamp": "2025-10-30T20:00:00.000Z",
  "type": "added",
  "title": "Brief description of the change",
  "description": "Detailed description explaining what changed and why it matters",
  "affectedDocs": [
    {
      "path": "docs/api-docs/example.mdx",
      "url": "/docs/api-docs/example",
      "title": "Example Documentation Page"
    }
  ],
  "author": "github-username",
  "prNumber": 123,
  "tags": ["optional", "tags"],
  "breaking": false
}
```

Save the file in `.changelogs/entries/` with a `.json` extension.

### Validating Entries

To validate your changelog entries:

```bash
npm run changelog:validate
```

Or validate a specific entry:

```bash
npm run changelog:validate 1730322000000-abc123.json
```

## Publishing Changelogs

### Automatic Publishing (Recommended)

The system automatically publishes changelogs:
- **Schedule**: Every Monday at 9 AM UTC
- **Behavior**: Only publishes if there are entries to include
- **Process**:
  1. Checks for entries in `.changelogs/entries/`
  2. If entries exist, generates a formatted changelog in `docs/changelog/`
  3. Creates a PR with the aggregated changelog
  4. Archives processed entries to `.changelogs/published/`

This flexible approach means changelogs are published as soon as there's content, rather than waiting for a fixed schedule.

### Manual Publishing

To manually trigger a changelog release:

```bash
npm run changelog:publish
```

This will:
1. Generate a changelog file for today's date
2. Move entries to the published archive
3. Provide instructions for creating a PR

### Dry Run

To test the publishing workflow without creating a PR:

1. Go to Actions → Publish Changelog
2. Click "Run workflow"
3. Set "Dry run" to `true`
4. Click "Run workflow"

## Automation

### GitHub Actions Workflows

#### Changelog Entry Check (`changelog-entry-check.yml`)

- **Triggers**: On pull requests that modify documentation
- **Purpose**: Ensures PRs include changelog entries
- **Actions**:
  - Checks for documentation file changes
  - Verifies presence of changelog entries
  - Validates entry format
  - Comments on PR if entry is missing

**Bypass**: Add the `skip-changelog` label to skip this check

#### Changelog PR Helper (`changelog-pr-helper.yml`)

- **Triggers**: When a PR is opened/reopened with doc changes
- **Purpose**: Suggests changelog entry content
- **Actions**:
  - Analyzes changed files
  - Determines appropriate change type
  - Generates a suggested entry
  - Posts as a comment on the PR

#### Publish Changelog (`changelog-publish.yml`)

- **Triggers**: 
  - Scheduled: Every Monday at 9 AM UTC (weekly check)
  - Manual: Via workflow dispatch
- **Purpose**: Aggregates and publishes changelogs
- **Actions**:
  - Collects all changelog entries
  - Generates formatted changelog
  - Creates a PR with the changes
  - Archives processed entries

## Best Practices

### Writing Good Changelog Entries

1. **User-Focused Language**
   - ✅ "Added support for webhook validation in the Storefront API"
   - ❌ "Implemented webhook validation feature"

2. **Clear and Specific**
   - ✅ "Fixed incorrect parameter type in Cart API documentation"
   - ❌ "Fixed docs"

3. **Complete Context**
   - Include all affected documentation pages
   - Explain why the change matters
   - Provide enough detail for readers to understand the impact

4. **Consistent Formatting**
   - Follow the existing style in published changelogs
   - Use proper grammar and punctuation
   - Keep titles concise but descriptive

### When to Create Entries

**Always create an entry for:**
- New documentation pages
- Significant content updates
- API changes or additions
- Breaking changes
- Security updates
- Bug fixes that affect understanding

**Consider skipping for:**
- Typo fixes (single word or punctuation)
- Minor formatting adjustments
- Internal documentation
- Work-in-progress changes
- Temporary or draft content

### Timing

- Create entries **before** merging your PR
- Include the entry in the same commit as your changes
- Update the entry if you make significant revisions during review

## Troubleshooting

### My PR failed the changelog check

**Solution**: Either create a changelog entry or add the `skip-changelog` label if the change doesn't need tracking.

### The validation script failed

**Check**:
- All required fields are present
- Field values meet minimum length requirements
- JSON syntax is valid
- File paths and URLs are correct

**Fix**: Run `npm run changelog:validate` to see specific errors

### I made a mistake in my entry

**Before merging**:
1. Edit the JSON file directly
2. Run `npm run changelog:validate` to verify
3. Commit the fix

**After merging**:
1. Create a new entry to correct the information
2. The incorrect entry will be archived but won't affect future changelogs

### The auto-suggestion has wrong information

The PR helper uses automated analysis and may not always be perfect. Always review and adjust the suggestion before creating your actual entry.

### How do I link to documentation correctly?

**File path**: Use the relative path from the repository root
```
docs/api-docs/cart/cart-api.mdx
```

**URL**: Remove the file extension and repository root
```
/docs/api-docs/cart/cart-api
```

The URL should match what users see in their browser when viewing the documentation.

## Additional Resources

- [.changelogs/README.md](../.changelogs/README.md) - Quick reference
- [CONTRIBUTING.md](../CONTRIBUTING.md) - General contribution guidelines
- [docs/changelog/](../docs/changelog/) - Published changelogs
- [JSON Schema](../.changelogs/schema.json) - Entry format specification

## Support

For questions or issues:
- Open an issue: [github.com/bigcommerce/docs/issues](https://github.com/bigcommerce/docs/issues)
- Start a discussion: [github.com/bigcommerce/docs/discussions](https://github.com/bigcommerce/docs/discussions)
- Review existing changelogs: [developer.bigcommerce.com/docs/changelog](https://developer.bigcommerce.com/docs/changelog)
