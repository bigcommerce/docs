# How to lint a document with the DX linter script

The docs team uses a custom script, provided by the DX team, to lint your doc files before they are published. This linter covers everything our Style Guide does, saving you tons of time. 

Run the script using the CLI to get your PR submission nearly perfect in no time.

> ⚠️ Before running the script, ensure your nvm version is at least 18. You can update the nvm version using the following command: 
>
> `nvm use 18`

1. Open terminal and navigate to the repo containing the file's folder.

2. Run `npx github:bigcommerce/dev-docs-style-guide-linter ./{{yourfilename}}.mdx. `

Example: `npx github:bigcommerce/dev-docs-style-guide-linter ./start/authentication/index.mdx`

> ℹ️ **NOTE:** Ensure your file name has the correct path.

3. Review the flagged items and make necessary updates.

4. Repeat Step 2 to re-run the linter.



