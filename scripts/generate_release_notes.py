import sys
import os
import json
from openai import OpenAI

# Setup OpenAI client with API Key
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# PR data passed from workflow
pr_data = json.loads(sys.argv[1])

prompt = """
You are an assistant writing public-facing release notes for BigCommerce’s Developer Center.

Your task is to summarize the following pull requests into **well-formatted, concise bullet points** that will appear in a published changelog.

*  Use a **friendly, developer-focused tone**.  
*  Write each bullet to clearly explain **what the change is and why it matters**.  
*  Always include the **PR link** in the bullet point.  
*  If the pull request includes a **"Release Notes" section** or release-focused summary, prioritize that, but cross-check the PR title and description to improve clarity and accuracy.  
*  Where REST API endpoints or REST METHODS, use the inline code formatting such as `GET /api/v2/channels` or `POST /api/v2/channels`.
* Group related bullet points under appropriate **bold section headings** such as:  
  * **Admin GraphQL Updates**  
  * **Webhooks Update**  
  * **Enhancement**  
  * **Bug Fixes**  
  * **Developer Tooling**

Follow the formatting style shown below:

* **Section Name**

  * **Short Bullet Title:** Brief description, including [relevant links](https://chatgpt.com/c/url) where applicable.

Important: 

*  Use present tense and **active voice** (e.g., "Adds", "Updates", "Introduces").  
*  Keep each bullet point **under 2–3 sentences**.  
*  Do not include internal or technical details irrelevant to external developers.  
*  Do not invent content; if unsure, focus on what’s explicitly provided in the PR.

## **Here are some example bullets to mimic:**

**Admin GraphQL Updates**

* **New Guide: [Translations Admin GraphQL API (Beta)](https://developer.bigcommerce.com/docs/store-operations/translations)** – A new guide is now available to help merchants localize their Catalyst storefronts more efficiently. This API enables a consistent and seamless shopping experience across multiple languages.

* **Limitation** – Introduced a limit to the number of locales you can configure in the [Locales Configuration](https://developer.bigcommerce.com/docs/store-operations/settings/locales) settings.

**Webhooks Update**

* **Expanded Webhook Tools** – Added additional third-party webhook tools to the [Tools](https://developer.bigcommerce.com/docs/integrations/webhooks#tools) list for greater flexibility and integration support.

**Enhancement**

* **Channels API Update** – Updated the [Channels V3](https://developer.bigcommerce.com/docs/rest-management/channels#get-all-channels) schema to reflect the deprecation of the `is_enabled` field.

---

Pull requests to summarize:
"""

for pr in pr_data:
    prompt += f"- Title: {pr['title']}\n  Description: {pr['body']}\n  Link: {pr['url']}\n\n"

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "You generate release notes in markdown."},
        {"role": "user", "content": prompt}
    ],
    temperature=0.3
)

release_notes = response.choices[0].message.content.strip()

with open("docs/release-notes.mdx", "a") as f:
    f.write("\n\n## Release Notes\n\n")
    f.write(release_notes)
