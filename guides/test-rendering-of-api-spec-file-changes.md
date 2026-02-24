# How to test rendering of API spec file changes

If you want to preview how changes to an API spec file will look inside the Developer Center, without waiting for a preview deploy, you can use our spec tester tool. It requires no approval to use and will render a preview of any OAS 3.0+ yaml file with a public url.

**To start, visit this url: https://developer.bigcommerce.com/spec-tester**

You’ll see a simple screen detailing what spec file is being previewed with the endpoints available in it. Clicking on an endpoint will load the render view on the right hand side:

![](//docs/assets/images/testing-api-spec-rendering-1.png)

The top left of the tester has an input and dropdown. You can use this to find location of the file you want to edit by selecting the dropdown, as it will change the input value to be the URL of the associated file on GitHub. These files are what is rendering on the DevCenter in production.

![](//docs/assets/images/testing-spec-rendering-2.png)

**This input can be manually changed as well, enabling you to preview a spec file you are working on, as long as it has a public URL.**

The most common way of getting a new public URL is to make changes in a GitHub branch.

## Getting a public URL from GitHub

#### By updating your branch name within an existing spec url

Within the input box, you’ll notice there is a ‘docs/main’ part of the url. Edit “main” to be to be your branch name with the edits you want to preview for the same file:

![](//docs/assets/images/testing-api-spec-rendering-3.png)
*Remember to only change the branch name. Leave the rest of the url the same.*

#### By updating your branch name within an existing spec url
In a branch you’ve pushed to GitHub, look for the ‘…' action on the file you want to get the public URL for, then click 'view file’:

![](//docs/assets/images/testing-api-spec-rendering-4.png)

When it opens that file, you’ll see the option to view it in ‘raw’ form. Press that:
![](//docs/assets/images/testing-api-spec-rendering-5.png)

Now you will see the raw file with the public facing URL in the browser. Copy and paste that into the input box:
![](//docs/assets/images/testing-api-spec-rendering-6.png)

## Making edits within the GitHub UI
If you want to change a file within the browser, that’s possible on GitHub. Click edit on any API spec file and you will see the editor:
![](//docs/assets/images/testing-api-spec-rendering-7.png)

After committing your changes, you will see a modal that asks for a commit message and the name of your branch:

![](//docs/assets/images/testing-api-spec-rendering-8.png)

After you propose changes, your branch will be created! You can then use one of the 2 methods above to get the public URL of the file you’ll copy/paste into the spec tester URL box.
