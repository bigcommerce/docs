# Contributing to BigCommerce Developer Documentation

- [Making a Quick Edit](#making-a-quick-edit)
- [Editing Locally](#editing-locally)
- [Creating Changelog Entries](#creating-changelog-entries)
- [Commit Messages](#commit-messages)
- [Style Guides](#style-guides)
- [Contributing to Other Projects](#contributing-to-other-projects)

Thanks for showing interest in contributing!

The following is a set of guidelines for contributing to BigCommerce's Developer Documentation. These are guidelines, not rules. Use your best judgment, and make proposed changes to this document in a pull request.

## Making a Quick Edit

The easiest way to edit a file is using GitHub's web interface:

1. Navigate to the file in GitHub. For example, [store-logs.mdx](https://github.com/bigcommerce/docs/blob/main/docs/api-docs/store-logs/store-logs.mdx).

2. Click the **pencil** icon to **Edit This File**.
3. Make the edit.
4. Type a commit message.
5. Select **Create a new branch for this commit and start a pull request**.
6. Give the branch a descriptive name.
7. Click **Propose file change**.
8. Give the pull request a descriptive title.
9. Fill in the pull request description.
10. Click **Create pull request**.

That's it! You're done.

## Editing Locally

For more complex changes, fork and edit locally:

1. Fork `bigcommerce/docs`.

2. `git clone` the fork to your local machine.

3. Make edits on a new branch in your IDE of choice.

4. Commit and push changes to your remote repo.

5. Create a [pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork) to `bigcommerce:docs/main`.

## Creating Changelog Entries

When you make changes to documentation, create a changelog entry to track what changed:

1. **Run the changelog tool:**
   ```bash
   npm run changelog:add
   ```

2. **Follow the prompts** to describe your change:
   - Select the type of change (added, changed, fixed, etc.)
   - Provide a clear title and description
   - List all affected documentation files
   - Add your GitHub username and PR number (if available)

3. **Commit the entry** along with your documentation changes:
   ```bash
   git add .changelogs/entries/*.json
   git commit -m "docs: your change description"
   ```

### When to Create a Changelog Entry

Create a changelog entry when:
- Adding new documentation pages
- Making significant updates to existing documentation
- Fixing errors or bugs in documentation
- Deprecating or removing documentation
- Making security-related updates

You may skip creating a changelog entry for:
- Typo fixes
- Minor formatting changes
- Internal documentation updates
- Draft or work-in-progress changes

If skipping, add the `skip-changelog` label to your pull request.

### Changelog Entry Tips

- **Be user-focused**: Write for documentation readers, not internal teams
- **Be specific**: Clearly state what changed and where to find it
- **Link correctly**: Ensure documentation URLs are accurate
- **Review before committing**: Check that your entry is complete and accurate

For more details, see [.changelogs/README.md](.changelogs/README.md).


## Commit Messages

- Always include subject; include body when necessary.
- Use present tense ("Add feature" not "Added feature").
- Use imperative mood ("Fix broken link..." not "Fixes broken link...").
- Separate subject from body with a blank line.
- Limit the subject line to 50 characters.
- Capitalize the subject line.
- Do not end the subject line with a period.
- Use the body to explain what and why versus how.

## Contributing to Other Projects

There are many other public BigCommerce repositories accepting contributions. If you're interested in contributing to those projects, see the [full list of public source repos](https://github.com/bigcommerce?utf8=%E2%9C%93&q=is%3Apublic&type=source&language=). Also, consider joining the [BigCommerce Developer Community](https://developer.bigcommerce.com/community).

# Contributing to BigCommerce's API Specifications

Thanks for your interest in contributing!

## Edit

* **Edit:** Fork the repository and edit with your preferred editor. We recommend [VS Code](https://code.visualstudio.com/).
* **Lint:** Check for errors using [Spectral](https://stoplight.io/open-source/spectral) or another OAS linter.

* **Commit:** Write good commit messages using the guidelines in the following section.
* **Push** to your fork to ensure that your pull request contains the most up-to-date version of your code.

## Write descriptive commit messages

* Describe the change using at least one verb and one noun.
* Use specific nouns to identify what you changed.
* Use the present tense ("Fix broken link to x" not "Fixed broken link to x").
* Use the imperative mood ("Fix broken link to x" not "Fixes broken link to x").

## Pull request

[What is a pull request?](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)

Use the included `pull_request_template.md` to tell us more about the changes you propose.

## Tools

The following tools might be helpful.

| Tool | Description |
|:-----|:------------|
| [Spectral CLI](https://stoplight.io/open-source/spectral) | Node.js CLI for the Spectral OpenAPI linter |
| [Spectral Linter for VS Code](https://marketplace.visualstudio.com/items?itemName=stoplight.spectral)| The Spectral OpenAPI linter as a VS Code extension |
| [swagger2openapi](https://www.npmjs.com/package/swagger2openapi)| Node.js CLI for converting Swagger to OpenAPI 3.0 |
| [openapi.tools](https://openapi.tools/) | List of open-source OpenAPI tools |
