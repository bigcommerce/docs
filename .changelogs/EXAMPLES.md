# Changelog System Examples

This document provides examples of using the changelog management system.

## Example 1: Adding New Documentation

When adding a new documentation page:

```bash
$ npm run changelog:add

📝 Create a new changelog entry

Change type:
  1. added      - New documentation or features
  2. changed    - Updates to existing documentation
  3. deprecated - Documentation marked as deprecated
  4. removed    - Removed documentation or features
  5. fixed      - Bug fixes or corrections
  6. security   - Security-related updates

Select type (1-6): 1

Title (brief description): Added webhook validation guide for Storefront API

Description (detailed explanation of the change):
> Comprehensive guide showing how to validate webhooks from BigCommerce Storefront API, including signature verification and security best practices.

📄 Affected Documentation
Enter the documentation files affected by this change.
Example path: docs/api-docs/cart/cart-api.mdx

Document path (or press Enter to finish): docs/api-docs/storefront/webhooks-validation.mdx
Document title (optional): Webhook Validation Guide
✓ Added: docs/api-docs/storefront/webhooks-validation.mdx

Document path (or press Enter to finish): 

Your GitHub username (optional): johndoe
PR number (optional): 456
Tags (comma-separated, optional): api, webhooks, security
Is this a breaking change? (y/N): n

✅ Changelog entry created successfully!
📁 File: .changelogs/entries/1730323000000-xyz789.json
```

This creates:

```json
{
  "id": "1730323000000-xyz789",
  "timestamp": "2025-10-30T20:10:00.000Z",
  "type": "added",
  "title": "Added webhook validation guide for Storefront API",
  "description": "Comprehensive guide showing how to validate webhooks from BigCommerce Storefront API, including signature verification and security best practices.",
  "affectedDocs": [
    {
      "path": "docs/api-docs/storefront/webhooks-validation.mdx",
      "url": "/docs/api-docs/storefront/webhooks-validation",
      "title": "Webhook Validation Guide"
    }
  ],
  "author": "johndoe",
  "prNumber": 456,
  "tags": ["api", "webhooks", "security"],
  "breaking": false
}
```

## Example 2: Fixing Documentation Error

For bug fixes or corrections:

```json
{
  "id": "1730324000000-def456",
  "timestamp": "2025-10-30T20:20:00.000Z",
  "type": "fixed",
  "title": "Corrected parameter type in Cart API endpoint",
  "description": "Fixed incorrect parameter type in the Add Cart Line Item endpoint. The quantity parameter should be integer, not string.",
  "affectedDocs": [
    {
      "path": "reference/cart/cart-api.yml",
      "url": "/docs/api-docs/cart/cart-api",
      "title": "Cart API Reference"
    }
  ],
  "author": "janedoe",
  "prNumber": 457,
  "tags": ["api-reference", "cart-api", "bug-fix"]
}
```

## Example 3: Updating Multiple Pages

When a change affects multiple documentation pages:

```json
{
  "id": "1730325000000-ghi789",
  "timestamp": "2025-10-30T20:30:00.000Z",
  "type": "changed",
  "title": "Updated authentication examples across API documentation",
  "description": "Updated all API authentication examples to use the new OAuth 2.0 flow. Added code samples for multiple languages including JavaScript, Python, and PHP.",
  "affectedDocs": [
    {
      "path": "docs/api-docs/getting-started/authentication.mdx",
      "url": "/docs/api-docs/getting-started/authentication",
      "title": "Authentication Overview"
    },
    {
      "path": "docs/api-docs/cart/cart-api.mdx",
      "url": "/docs/api-docs/cart/cart-api",
      "title": "Cart API"
    },
    {
      "path": "docs/api-docs/catalog/catalog-api.mdx",
      "url": "/docs/api-docs/catalog/catalog-api",
      "title": "Catalog API"
    }
  ],
  "author": "bobsmith",
  "prNumber": 458,
  "tags": ["authentication", "oauth", "api"]
}
```

## Example 4: Breaking Change

For breaking changes that require user attention:

```json
{
  "id": "1730326000000-jkl012",
  "timestamp": "2025-10-30T20:40:00.000Z",
  "type": "changed",
  "title": "Updated API versioning strategy for Catalog API",
  "description": "The Catalog API now requires version headers in all requests. Requests without version headers will default to v2, but this behavior will be deprecated in 3 months. All applications should update to explicitly specify API version.",
  "affectedDocs": [
    {
      "path": "docs/api-docs/catalog/catalog-api.mdx",
      "url": "/docs/api-docs/catalog/catalog-api",
      "title": "Catalog API Overview"
    },
    {
      "path": "docs/api-docs/getting-started/versioning.mdx",
      "url": "/docs/api-docs/getting-started/versioning",
      "title": "API Versioning"
    }
  ],
  "author": "alicejones",
  "prNumber": 459,
  "tags": ["breaking-change", "api-versioning", "catalog-api"],
  "breaking": true
}
```

## Example 5: Published Changelog

After running `npm run changelog:publish`, the system generates:

```markdown
# Changelog - 2025-10-30

**Release Date:** 2025-10-30

This changelog includes all documentation updates and improvements made since the last release.

## ✨ Added

* Added webhook validation guide for Storefront API: Comprehensive guide showing how to validate webhooks from BigCommerce Storefront API, including signature verification and security best practices. ([Webhook Validation Guide](/docs/api-docs/storefront/webhooks-validation))

## 📝 Changed

* 🚨 **BREAKING**: Updated API versioning strategy for Catalog API: The Catalog API now requires version headers in all requests. Requests without version headers will default to v2, but this behavior will be deprecated in 3 months. ([Catalog API Overview](/docs/api-docs/catalog/catalog-api), [API Versioning](/docs/api-docs/getting-started/versioning))
* Updated authentication examples across API documentation: Updated all API authentication examples to use the new OAuth 2.0 flow. Added code samples for multiple languages including JavaScript, Python, and PHP. ([Authentication Overview](/docs/api-docs/getting-started/authentication), [Cart API](/docs/api-docs/cart/cart-api), [Catalog API](/docs/api-docs/catalog/catalog-api))

## 🐛 Fixed

* Corrected parameter type in Cart API endpoint: Fixed incorrect parameter type in the Add Cart Line Item endpoint. The quantity parameter should be integer, not string. ([Cart API Reference](/docs/api-docs/cart/cart-api))

---

*This changelog was automatically generated from 4 documentation updates.*
```

## Example 6: Validation Errors

When validation fails:

```bash
$ npm run changelog:validate

📋 Validating 1 changelog entries...

Validating: 1730327000000-bad123.json
❌ Validation failed:
  - Title must be at least 10 characters
  - Description must be at least 20 characters
  - affectedDocs must contain at least one item

❌ Some changelog entries have validation errors
```

## Example 7: PR Check Workflow

When a PR is opened without a changelog entry:

```
## 📝 Changelog Entry Required

This pull request modifies documentation files but doesn't include a changelog entry.

**To add a changelog entry:**
```bash
npm run changelog:add
```

Then commit the generated file in `.changelogs/entries/` along with your changes.

**If this change doesn't require a changelog entry**, add the `skip-changelog` label to this PR.

For more information, see [.changelogs/README.md](.changelogs/README.md).
```

## Example 8: Auto-Suggested Entry

The PR helper automatically suggests:

```
## 📝 Suggested Changelog Entry

Based on the changes in this PR, here's a suggested changelog entry:

```json
{
  "type": "changed",
  "title": "Update Cart API documentation",
  "description": "Update Cart API documentation...",
  "affectedDocs": [
    {
      "path": "docs/api-docs/cart/cart-api.mdx",
      "url": "/docs/api-docs/cart/cart-api",
      "title": "cart-api"
    }
  ],
  "author": "contributor",
  "prNumber": 460
}
```

### To use this suggestion:
1. Run `npm run changelog:add`
2. Use the suggested values above when prompted
3. Review and adjust as needed
4. Commit the generated file
```

## Tips for Writing Good Entries

1. **Clear and Concise Titles**
   - ✅ "Added webhook validation guide for Storefront API"
   - ❌ "New docs"

2. **Descriptive Descriptions**
   - ✅ "Comprehensive guide showing how to validate webhooks, including signature verification and security best practices."
   - ❌ "Added webhook docs"

3. **Complete Documentation Links**
   - Include all affected pages
   - Verify URLs are correct
   - Add helpful titles for context

4. **Appropriate Change Type**
   - Use "added" for new content
   - Use "changed" for updates
   - Use "fixed" for corrections
   - Mark breaking changes appropriately
