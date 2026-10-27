#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const postsDir = path.join(process.cwd(), 'content/posts');
const args = process.argv.slice(2);
const title = args[0] || 'New Post';
const slug = args[1] || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const date = new Date().toISOString().split('T')[0];

if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir, { recursive: true });
}

const filePath = path.join(postsDir, `${slug}.mdx`);

if (fs.existsSync(filePath)) {
  console.error(`❌ Post already exists: ${filePath}`);
  process.exit(1);
}

const template = `---
title: "${title}"
date: "${date}"
tags: []
excerpt: "A brief summary of your post for previews and SEO."
coverImage: ""
---

Write your content here using **Markdown** and **MDX**.

## Getting Started

This is your new post. You can write:

- **Bold text**
- *Italic text*
- \`Inline code\`
- [Links](https://example.com)

## Code Blocks

\`\`\`javascript
function hello() {
  console.log("Hello, world!");
}
\`\`\`

## Blockquotes

> "The best way to predict the future is to invent it."
> — Alan Kay

## Images

![Alt text](/images/your-image.jpg)

---

Happy writing! 🚀
`;

fs.writeFileSync(filePath, template);
console.log(`✅ Created new post: ${filePath}`);
console.log(`📝 Edit the file to add your content.`);
console.log(`🚀 Run \`npm run dev\` to preview locally.`);