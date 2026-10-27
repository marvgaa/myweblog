import { Metadata } from 'next';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getAllPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';

export const metadata: Metadata = {
  title: 'Home',
  description: 'A modern, fast weblog built with Next.js and MDX. Write in Markdown, deploy to GitHub Pages.',
};

const posts = getAllPosts();
const featuredPosts = posts.slice(0, 3);
const recentPosts = posts.slice(3, 9);

export default function HomePage() {
  return (
    <div className="container mx-auto px-6 py-12 md:py-20">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        className="mb-20 md:mb-28 text-center max-w-4xl mx-auto"
        aria-labelledby="hero-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 dark:text-indigo-700 text-sm font-medium mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
          </span>
          Just launched — v1.0.0
        </motion.div>

        <h1 id="hero-title" className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter bg-gradient-to-r from-white via-indigo-200 to-purple-200 dark:from-gray-100 dark:via-indigo-300 dark:to-purple-300 bg-clip-text text-transparent mb-6 leading-[1.1]">
          Welcome to{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Weblog
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg md:text-xl text-gray-400 dark:text-gray-500 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          A modern, fast weblog built with Next.js 14, MDX, and Framer Motion.
          Write in Markdown, deploy to GitHub Pages. Zero configuration, maximum speed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/posts"
            className="group px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-lg transition-all duration-300 hover:from-indigo-600 hover:to-purple-700 hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:-translate-y-0.5"
          >
            Read Latest Posts
            <svg className="ml-2 w-5 h-5 inline-block transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="/tags"
            className="px-8 py-4 rounded-xl border border-gray-700 dark:border-gray-300 text-gray-300 dark:text-gray-700 font-semibold text-lg transition-all duration-300 hover:bg-gray-900/50 dark:hover:bg-gray-100/50 hover:border-indigo-500 hover:text-indigo-400"
          >
            Browse Tags
          </Link>
        </motion.div>
      </motion.section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mb-20 md:mb-28"
          aria-labelledby="featured-title"
        >
          <div className="flex items-end justify-between mb-10">
            <motion.h2
              id="featured-title"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl md:text-4xl font-bold tracking-tight"
            >
              Featured Posts
            </motion.h2>
            <motion.link
              href="/posts"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-2 transition-colors"
            >
              View all
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPosts.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        </motion.section>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          aria-labelledby="recent-title"
        >
          <div className="flex items-end justify-between mb-10">
            <h2 id="recent-title" className="text-3xl md:text-4xl font-bold tracking-tight">
              Recent Posts
            </h2>
            <Link
              href="/posts"
              className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-2 transition-colors"
            >
              View all
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </div>

          {posts.length > 9 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-12 text-center"
            >
              <Link
                href="/posts"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-700 dark:border-gray-300 text-gray-300 dark:text-gray-700 font-medium hover:border-indigo-500 hover:text-indigo-400 transition-colors"
              >
                Load More Posts
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
            </motion.div>
          )}
        </motion.section>
      )}

      {posts.length === 0 && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <div className="max-w-md mx-auto">
            <svg className="mx-auto h-16 w-16 text-gray-700 dark:text-gray-400 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <h2 className="text-2xl font-bold mb-3">No posts yet</h2>
            <p className="text-gray-400 dark:text-gray-500 mb-6">
              Create your first post by adding a <code className="bg-gray-900 dark:bg-gray-100 px-2 py-1 rounded text-sm">.mdx</code> file to <code className="bg-gray-900 dark:bg-gray-100 px-2 py-1 rounded text-sm">content/posts/</code>
            </p>
            <a
              href="https://github.com/yourusername/weblog"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition-colors"
            >
              View on GitHub
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </motion.section>
      )}
    </div>
  );
}