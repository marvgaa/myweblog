import { Metadata } from 'next';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getAllPosts, getAllTags } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about this weblog and the technology behind it.',
};

const posts = getAllPosts();
const tags = getAllTags();

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-12 md:py-20 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        className="mb-12 md:mb-16 text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter bg-gradient-to-r from-white via-indigo-200 to-purple-200 dark:from-gray-100 dark:via-indigo-300 dark:to-purple-300 bg-clip-text text-transparent mb-6"
        >
          About This Weblog
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 dark:text-gray-500 max-w-2xl mx-auto"
        >
          A modern, fast, and beautiful weblog built for writers who want to focus on content.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
        className="space-y-12"
      >
        <section className="prose prose-invert max-w-none">
          <h2>Philosophy</h2>
          <p>
            This weblog was built with a simple philosophy: <strong>writing should be frictionless</strong>.
            No complex CMS, no database, no vendor lock-in. Just Markdown files in a git repository
            that you own and control.
          </p>
          <p>
            Every post is a <code>.mdx</code> file in the <code>content/posts/</code> directory.
            Write in your favorite editor, commit, push, and your changes are live. Version control,
            backups, and collaboration come for free with git.
          </p>
        </section>

        <section className="prose prose-invert max-w-none">
          <h2>Tech Stack</h2>
          <ul>
            <li><strong>Framework:</strong> Next.js 14 (App Router, Static Export)</li>
            <li><strong>Content:</strong> MDX with <code>next-mdx-remote</code></li>
            <li><strong>Styling:</strong> Plain CSS with CSS Variables (no build step)</li>
            <li><strong>Animations:</strong> Framer Motion</li>
            <li><strong>Typography:</strong> Geist & Geist Mono (via <code>next/font</code>)</li>
            <li><strong>Deployment:</strong> GitHub Pages</li>
            <li><strong>Package Manager:</strong> npm</li>
          </ul>
        </section>

        <section className="prose prose-invert max-w-none">
          <h2>Features</h2>
          <ul>
            <li><strong>Dark/Light Mode:</strong> Automatic detection + manual toggle, persisted in localStorage</li>
            <li><strong>Responsive Design:</strong> Mobile-first, looks great on all screen sizes</li>
            <li><strong>Animations:</strong> Subtle, performant animations with Framer Motion</li>
            <li><strong>Accessibility:</strong> Semantic HTML, ARIA labels, focus management, reduced motion support</li>
            <li><strong>SEO:</strong> Open Graph, Twitter Cards, sitemap, RSS feed</li>
            <li><strong>Syntax Highlighting:</strong> Built-in code blocks with language detection</li>
            <li><strong>Tags:</strong> Automatic tag pages with post counts</li>
            <li><strong>Reading Time:</strong> Automatic calculation per post</li>
          </ul>
        </section>

        <section className="prose prose-invert max-w-none">
          <h2>Quick Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
            <div className="p-6 bg-gray-950/50 dark:bg-white/50 border border-gray-800 dark:border-gray-200 rounded-2xl text-center">
              <p className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                {posts.length}
              </p>
              <p className="text-gray-400 dark:text-gray-500 mt-1">Posts Published</p>
            </div>
            <div className="p-6 bg-gray-950/50 dark:bg-white/50 border border-gray-800 dark:border-gray-200 rounded-2xl text-center">
              <p className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                {tags.length}
              </p>
              <p className="text-gray-400 dark:text-gray-500 mt-1">Topics Covered</p>
            </div>
            <div className="p-6 bg-gray-950/50 dark:bg-white/50 border border-gray-800 dark:border-gray-200 rounded-2xl text-center">
              <p className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                {posts.reduce((acc, p) => acc + parseInt(p.readingTime), 0)}
              </p>
              <p className="text-gray-400 dark:text-gray-500 mt-1">Minutes of Reading</p>
            </div>
            <div className="p-6 bg-gray-950/50 dark:bg-white/50 border border-gray-800 dark:border-gray-200 rounded-2xl text-center">
              <p className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                ∞
              </p>
              <p className="text-gray-400 dark:text-gray-500 mt-1">Possibilities</p>
            </div>
          </div>
        </section>

        <section className="prose prose-invert max-w-none">
          <h2>Getting Started</h2>
          <p>Want to use this for your own weblog? Here's how:</p>
          <ol>
            <li>Fork or clone this repository</li>
            <li>Run <code>npm install</code></li>
            <li>Add <code>.mdx</code> files to <code>content/posts/</code></li>
            <li>Run <code>npm run dev</code> to preview locally</li>
            <li>Push to GitHub and enable GitHub Pages</li>
          </ol>
          <p>
            Your site will be live at <code>https://yourusername.github.io/repository-name</code>
            (or your custom domain).
          </p>
        </section>

        <section className="prose prose-invert max-w-none">
          <h2>Creating Posts</h2>
          <p>Create a new file in <code>content/posts/your-post-slug.mdx</code> with frontmatter:</p>
          <pre><code>{`---
title: "Your Post Title"
date: "2024-01-15"
tags: ["tag1", "tag2"]
excerpt: "A brief summary for previews and SEO"
coverImage: "/images/your-cover.jpg"  # optional
---

Your content here with **Markdown** and *MDX* support.

## Headings work

- Lists work
- Code blocks work
- Even React components work in MDX

\`\`\`javascript
console.log('Hello, world!');
\`\`\`
`}</code></pre>
          <p>
            Or use the helper script: <code>npm run new-post</code> — it creates a template file with today's date.
          </p>
        </section>

        <section className="prose prose-invert max-w-none">
          <h2>Deployment</h2>
          <p>This site is configured for static export. The <code>next.config.js</code> has:</p>
          <pre><code>{`output: 'export',
images: { unoptimized: true }`}</code></pre>
          <p>For GitHub Pages, the GitHub Action (included) builds and deploys automatically on push to main.</p>
        </section>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-16 pt-8 border-t border-gray-800 dark:border-gray-200 text-center"
      >
        <Link
          href="/posts"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold transition-all duration-300 hover:from-indigo-600 hover:to-purple-700 hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]"
        >
          Start Reading
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </motion.div>
    </div>
  );
}