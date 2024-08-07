# How to create a site preview 

Creating a site preview is a straightforward process that allows you to see how your doc appears before it’s submitted.

In this doc you’ll learn how to clone the developer-center repo to run a localhost: 3000 to preview IDE  (e.g., VS Code) changes, and how to use a static site preview generator. 

## localhost:3000 review (on Mac)

#### 1. Open terminal and navigate to your Documents folder.
`cd ~/Documents`

#### 2. Create a folder and name it dev-center.
`mkdir dev-center`

#### 3. Clone the developer-center repo.
`git clone https://github.com/bigcommerce/developer-center.git`

#### 4. Checkout the branch mdx-components.
`git checkout mdx-components`

#### 5. Install the latest legacy peer deps.
`npm install --legacy-peer-deps`

#### 6. Once installed, run the npm run dev script.
`npm run dev script`

#### 7. Open your browser and navigate to your localhost address.
`ex. localhost:3000/preview`

#### 8. Open your IDE and navigate to the developer-center directory, then open the pages/preview.mdx file. 

#### 9. Below the generated text: Insert Content Below paste your .mdx doc file and changes.

#### 10. Save your changes and preview the content in your browser window.
Note: reload the browser page if it doesn’t immediately load.

