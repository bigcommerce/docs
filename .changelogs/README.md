# Changelog Management System

This directory contains the automated changelog management system for BigCommerce Developer Documentation.

## Directory Structure

```
.changelogs/
├── entries/          # Ephemeral changelog entries (one per doc change)
├── published/        # Archived published changelogs
├── schema.json       # JSON schema for changelog entries
└── README.md         # This file
```

## How It Works

### 1. Creating Changelog Entries

When you make a documentation change, create a changelog entry:

```bash
npm run changelog:add
```

This will:
- Prompt you for information about your change
- Generate a unique changelog entry file in `.changelogs/entries/`
- The entry will be committed with your documentation changes

### 2. Changelog Entry Format

Each changelog entry is a JSON file containing:

```json
{
  "id": "unique-id",
  "timestamp": "2025-10-30T20:00:00.000Z",
  "type": "added|changed|deprecated|removed|fixed|security",
  "title": "Brief description of the change",
  "description": "Detailed description of what changed and why",
  "affectedDocs": [
    {
      "path": "docs/api-docs/cart/cart-api.mdx",
      "url": "/docs/api-docs/cart/cart-api",
      "title": "Cart API Overview"
    }
  ],
  "author": "github-username",
  "prNumber": 123
}
```

### 3. Publishing Changelogs

Changelogs are automatically aggregated and published on a regular cadence (every 2 weeks) via GitHub Actions:

- The workflow collects all entries from `.changelogs/entries/`
- Generates a formatted changelog document
- Creates a PR with the aggregated changelog
- Moves processed entries to `.changelogs/published/`

### 4. Manual Publishing

To manually generate a changelog:

```bash
npm run changelog:publish
```

## Change Types

- **added**: New documentation, features, or capabilities
- **changed**: Updates to existing documentation
- **deprecated**: Documentation marked as deprecated
- **removed**: Removed documentation or features
- **fixed**: Bug fixes or corrections
- **security**: Security-related updates

## Best Practices

1. **Create entries alongside doc changes**: Always create a changelog entry when updating documentation
2. **Be descriptive**: Write clear, user-friendly descriptions
3. **Link to relevant docs**: Include all affected documentation pages
4. **Use consistent language**: Follow the existing style in published changelogs
5. **Review before committing**: Ensure your changelog entry is accurate and complete

## Automation

The system includes several GitHub Actions workflows:

- **changelog-entry-check.yml**: Validates that PRs with doc changes include changelog entries
- **changelog-publish.yml**: Runs bi-weekly to aggregate and publish changelogs
- **changelog-pr-helper.yml**: Auto-generates changelog entry templates from PR context

## Configuration

Configuration is stored in `package.json` under the `changelog` key.
