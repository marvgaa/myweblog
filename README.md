# Weblog

A modern, fast, and beautiful weblog built with **Next.js 14**, **MDX**, and **Framer Motion**. Write in Markdown, deploy to GitHub Pages.

![Weblog Preview](https://via.placeholder.com/1200x630/6366f1/ffffff?text=Weblog+Preview)

## ✨ Features

- **📝 Write in Markdown/MDX** — Simple `.mdx` files in `content/posts/`
- **🎨 Modern Design** — Dark/light mode, responsive, accessible
- **⚡ Fast** — Static export, zero JavaScript runtime for readers
- **🏷️ Tags** — Automatic tag pages with post counts
- **📖 Reading Time** — Auto-calculated per post
- **🔍 SEO Ready** — Open Graph, Twitter Cards, sitemap, RSS
- **🎬 Smooth Animations** — Framer Motion powered
- **📦 Zero Config Deploy** — Push to GitHub, auto-deploys to Pages

## 🚀 Quick Start

```bash
# Clone and install
git clone https://github.com/yourusername/weblog.git
cd weblog
npm install

# Create your first post
npm run new-post "My First Post"

# Preview locally
npm run dev
# Open http://localhost:3000

# Build for production
npm run build
# Output in ./out directory
```

## 📁 Project Structure

```
weblog/
├── content/posts/          # Your blog posts (.mdx files)
├── public/                 # Static assets (images, fonts, etc.)
├── scripts/
│   ├── new-post.js         # Create new post template
│   └── generate-feeds.js   # Generate sitemap.xml & rss.xml
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── page.tsx        # Home page
│   │   ├── posts/          # Posts listing & individual posts
│   │   ├── tags/           # Tags listing & tag pages
│   │   └── about/          # About page
│   ├── components/         # React components
│   ├── lib/posts.ts        # Post utilities (reading, parsing)
│   └── styles/globals.css  # Global styles & design tokens
├── .github/workflows/      # GitHub Actions for auto-deploy
├── next.config.js          # Next.js config (static export)
└── package.json
```

## ✍️ Writing Posts

### Create a New Post

```bash
npm run new-post "Your Post Title"
# Creates: content/posts/your-post-title.mdx
```

### Post Frontmatter

```markdown
---
title: "Your Post Title"
date: "2024-01-15"
tags: ["tag1", "tag2", "tag3"]
excerpt: "Brief summary for previews, SEO, and RSS"
coverImage: "/images/cover.jpg"  # Optional, place in public/images/
---

Your content here with **Markdown** and *MDX* support.
```

### MDX Superpowers

Use React components in your Markdown:

```mdx
import { Chart } from '@/components/Chart';

# My Analytics

<Chart data={[10, 20, 15, 30, 25]} type="bar" />
```

## 🎨 Customization

### Colors & Theme

Edit CSS variables in `src/styles/globals.css`:

```css
:root {
  --bg: #0a0a0f;
  --fg: #e8e8ed;
  --accent: #6366f1;
  --accent-hover: #818cf8;
  /* ... more variables */
}
```

### Fonts

Change fonts in `src/app/layout.tsx`:

```typescript
const geistSans = Geist({ subsets: ['latin'], variable: '--font-sans' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' });
```

### Site Metadata

Update `src/app/layout.tsx` metadata:

```typescript
export const metadata: Metadata = {
  title: { default: 'Your Blog', template: '%s | Your Blog' },
  description: 'Your blog description',
  openGraph: {
    url: 'https://yourdomain.com',
    siteName: 'Your Blog',
  },
};
```

## 🌐 Deployment

### GitHub Pages (Recommended)

1. **Push to GitHub** — Repository must be public or have Pages enabled for private
2. **Enable Pages** — Settings → Pages → Source: "GitHub Actions"
3. **Done!** — Every push to `main` auto-deploys

The workflow (`.github/workflows/deploy.yml`) handles everything.

### Custom Domain

1. Add `CNAME` file to `public/`:
   ```
   blog.yourdomain.com
   ```
2. Configure DNS (A records for apex, CNAME for subdomain)
3. Enable "Enforce HTTPS" in Pages settings

### Vercel (Alternative)

```bash
npm i -g vercel
vercel
# Follow prompts, deploys on every push with preview URLs
```

## 📦 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server at localhost:3000 |
| `npm run build` | Build static site to `./out` |
| `npm run start` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run new-post "Title"` | Create new post template |
| `node scripts/generate-feeds.js` | Generate sitemap.xml & rss.xml |

## 🔧 Configuration

### Base Path (for `username.github.io/repo-name`)

Update `next.config.js`:

```javascript
const repoName = 'weblog'; // Your repo name
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,
};
module.exports = nextConfig;
```

Then update internal links to use the base path.

### Analytics

Add Google Analytics / Plausible / Umami in `src/app/layout.tsx`:

```typescript
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {/* Analytics script here */}
      </head>
      <body>{children}</body>
    </html>
  );
}
```

## 📄 License

MIT License — feel free to use for your own blog!

## 🙏 Credits

- [Next.js](https://nextjs.org/) — React framework
- [MDX](https://mdxjs.com/) — Markdown + JSX
- [Framer Motion](https://www.framer.com/motion/) — Animations
- [Geist](https://vercel.com/font) — Typography by Vercel
- [date-fns](https://date-fns.org/) — Date formatting
- [gray-matter](https://github.com/jonschlinkert/gray-matter) — Frontmatter parsing

---

**Happy writing!** 🖋️

*Built with Weblog — the weblog for developers who write.*