import { Metadata } from 'next';
import { motion } from 'framer-motion';
import { getAllPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';

export const metadata: Metadata = {
  title: 'All Posts',
  description: 'Browse all posts on Weblog.',
};

const posts = getAllPosts();
const POSTS_PER_PAGE = 10;

export default function PostsPage() {
  return (
    <div className="container mx-auto px-6 py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        className="mb-12 md:mb-16 max-w-3xl"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter bg-gradient-to-r from-white via-indigo-200 to-purple-200 dark:from-gray-100 dark:via-indigo-300 dark:to-purple-300 bg-clip-text text-transparent mb-4"
        >
          All Posts
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 dark:text-gray-500"
        >
          {posts.length} {posts.length === 1 ? 'post' : 'posts'} published — newest first
        </motion.p>
      </motion.div>

      {posts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <svg className="mx-auto h-16 w-16 text-gray-700 dark:text-gray-400 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <h2 className="text-2xl font-bold mb-3">No posts yet</h2>
          <p className="text-gray-400 dark:text-gray-500 mb-6 max-w-md mx-auto">
            Create your first post by adding a <code className="bg-gray-900 dark:bg-gray-100 px-2 py-1 rounded text-sm">.mdx</code> file to <code className="bg-gray-900 dark:bg-gray-100 px-2 py-1 rounded text-sm">content/posts/</code>
          </p>
        </motion.div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
            role="list"
            aria-label="Blog posts"
          >
            {posts.slice(0, POSTS_PER_PAGE).map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </motion.div>

          {posts.length > POSTS_PER_PAGE && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-center"
            >
              <p className="text-gray-400 dark:text-gray-500 mb-4">
                Showing {POSTS_PER_PAGE} of {posts.length} posts
              </p>
              <a
                href="/tags"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-700 dark:border-gray-300 text-gray-300 dark:text-gray-700 font-medium hover:border-indigo-500 hover:text-indigo-400 transition-colors"
              >
                Browse by Tag
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </a>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}