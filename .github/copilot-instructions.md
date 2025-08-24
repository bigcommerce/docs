# BigCommerce Developer Documentation

BigCommerce developer documentation repository containing MDX documentation files and OpenAPI specification files that power the [BigCommerce Developer Center](https://developer.bigcommerce.com/docs).

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Bootstrap and Validate the Repository

**NEVER CANCEL builds or linting commands. Set timeouts of 60+ minutes for all operations.**

1. **Prerequisites:**
   - Node.js version 18+ (specified in `.nvmrc`)
   - npm (comes with Node.js)

2. **Setup:**
   ```bash
   npm ci
   ```
   - Takes ~2 seconds with dependencies cached, up to 30 seconds on first run
   - NEVER CANCEL: Set timeout to 60+ seconds

3. **Validate MDX documentation:**
   ```bash
   npm run lint
   ```
   - Lints 392+ MDX files using ESLint with mdx plugin
   - Takes ~12 seconds for full repository scan
   - NEVER CANCEL: Set timeout to 60+ seconds

4. **Validate OpenAPI specifications:**
   ```bash
   npm install -g @stoplight/spectral-cli@latest
   spectral lint './reference/**/*.yml' --ruleset '.spectral.yaml' --ignore-unknown-format
   ```
   - Lints 70+ OpenAPI specification files
   - Takes ~32 seconds for full repository scan
   - NEVER CANCEL: Set timeout to 60+ seconds

5. **Style guide validation (runs automatically in CI):**
   - Uses custom `bigcommerce/dev-docs-style-guide-linter`
   - Runs via GitHub Actions using Docker container
   - Cannot be run locally without Docker setup

## No Traditional Build Process

This repository contains documentation source files, not a web application:
- **No `npm run build`** - files are processed by external systems
- **No `npm run test`** - validation happens through linting
- **No server to run** - content is published via separate build pipeline
- **Production deployment** triggers via CircleCI when changes merge to `main`

## Validation Requirements

**ALWAYS run validation before committing changes:**

1. **For MDX changes:** `npm run lint`
2. **For OpenAPI changes:** `spectral lint './reference/**/*.yml' --ruleset '.spectral.yaml' --ignore-unknown-format`
3. **Both commands must pass** for CI to succeed

## Repository Structure

### Key Directories
```
├── docs/                    # Main documentation content (MDX files)
│   ├── api-docs/           # API documentation
│   ├── storefront/         # Storefront development docs
│   ├── store-operations/   # Store management docs
│   └── start/              # Getting started guides
├── reference/              # OpenAPI specification files (YAML)
├── archive/                # Archived documentation (also MDX)
├── assets/                 # Images, static files, translations
├── models/                 # JSON schemas in YAML format
├── examples/               # Example data for Stencil contexts
└── .github/                # GitHub Actions workflows and configuration
```

### Important Files
- **`.nvmrc`** - Node.js version requirement (18)
- **`package.json`** - npm scripts and dependencies
- **`.eslintrc.json`** - ESLint configuration for MDX linting
- **`.spectral.yaml`** - Spectral rules for OpenAPI validation
- **`.cspell.json`** - Spell check configuration with custom dictionaries
- **`.style/core-glossary.txt`** - Approved terminology and BigCommerce-specific words
- **`.style/skip-list.txt`** - Words to skip during spell checking
- **`CONTRIBUTING.md`** - Contribution guidelines
- **`package-lock.json`** - Required for `npm ci` command

## Development Workflow

1. **Make changes** to MDX files in `docs/` or `archive/` directories
2. **Or make changes** to OpenAPI YAML files in `reference/` directory
3. **Run validation:** `npm run lint` and/or `spectral lint` commands
4. **Fix any linting errors** before committing
5. **Submit pull request** - CI will run all validations automatically
6. **Merge to main** triggers production rebuild via CircleCI

## Common Tasks

### Editing Documentation
- **MDX files** in `docs/` and `archive/` directories
- Use Markdown with React components
- Always run `npm run lint` after changes

### Editing API Specifications  
- **YAML files** in `reference/` directory
- Follow OpenAPI 3.0+ specification
- Always run `spectral lint './reference/**/*.yml' --ruleset '.spectral.yaml' --ignore-unknown-format` after changes

### Finding Files
- **Documentation:** Search in `docs/` subdirectories by topic
- **API specs:** Look in `reference/` directory by API name
- **Examples:** Check `examples/` for Stencil context examples
- **Images:** Located in `assets/images/` directory

## Validation Scenarios

**ALWAYS test these scenarios after making changes:**

1. **For documentation changes:**
   - Run `npm run lint` successfully
   - Verify MDX syntax is valid
   - Check that any code blocks have proper language tags

2. **For API specification changes:**
   - Run `spectral lint` successfully  
   - Verify YAML syntax is valid
   - Test spec rendering using BigCommerce spec tester: https://developer.bigcommerce.com/spec-tester

3. **For any changes:**
   - Check that links and references are valid
   - Verify image paths exist in `assets/` directory
   - Ensure proper spelling (checked by cspell automatically)

## Timing Expectations

**Set appropriate timeouts for all commands:**

- **`npm ci`**: ~2-30 seconds (NEVER CANCEL - set 60+ second timeout)
- **`npm run lint`**: ~12 seconds (NEVER CANCEL - set 60+ second timeout)  
- **`spectral lint`**: ~32 seconds (NEVER CANCEL - set 60+ second timeout)
- **Git operations**: Usually instant but set 30+ second timeouts

## Troubleshooting

### Linting Errors
- **ESLint MDX errors:** Check MDX syntax and React component usage
- **Spectral errors:** Verify OpenAPI specification format and required fields
- **Spell check errors:** Add words to `.style/core-glossary.txt` or `.style/skip-list.txt`

### Common Issues
- **`npm ci` fails:** Ensure `package-lock.json` exists and is not corrupted
- **Spectral not found:** Install globally with `npm install -g @stoplight/spectral-cli@latest`
- **Linting timeout:** Normal for large repositories - wait for completion, do not cancel

### Performance
- Repository contains 392+ MDX files and 70+ YAML files
- Linting scans all files - expect 10-30 second operation times
- **Never cancel operations** - they will complete within reasonable timeframes

## External Dependencies

- **Production builds:** Managed by separate `developer-center` repository via CircleCI
- **Style guide linting:** Uses `bigcommerce/dev-docs-style-guide-linter` npm package
- **Spec testing:** Available at https://developer.bigcommerce.com/spec-tester