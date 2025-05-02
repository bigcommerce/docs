import sys
import os
import openai
import json

openai.api_key = os.getenv("OPENAI_API_KEY")

# PR data passed from workflow
pr_data = json.loads(sys.argv[1])

prompt = (
    "Summarize the following GitHub pull requests into clear, concise release notes bullets. "
    "Match the style and formatting of these example notes:\n\n"
    "- **[Guide Name](URL)** – Description of update\n"
    "- **Enhancement** – Brief description of the enhancement\n\n"
    "Pull requests to summarize:\n\n"
)

for pr in pr_data:
    prompt += f"- Title: {pr['title']}\n  Description: {pr['body']}\n  Link: {pr['url']}\n\n"

response = openai.ChatCompletion.create(
    model="gpt-4o",
    messages=[{"role": "system", "content": "You generate release notes in markdown."},
              {"role": "user", "content": prompt}],
    temperature=0.3
)

release_notes = response.choices[0].message.content.strip()

with open("docs/release-notes.mdx", "a") as f:
    f.write("\n\n## Release Notes\n\n")
    f.write(release_notes)
