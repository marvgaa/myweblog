import { Metadata } from 'next';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getAllTags, getPostsByTag } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Tags',
  description: 'Browse posts by topic.',
};

const tags = getAllTags();

export default function TagsPage() {
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
          Browse by Tag
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 dark:text-gray-500"
        >
          {tags.length} {tags.length === 1 ? 'topic' : 'topics'} — click to explore
        </motion.p>
      </motion.div>

      {tags.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <svg className="mx-auto h-16 w-16 text-gray-700 dark:text-gray-400 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <h2 className="text-2xl font-bold mb-3">No tags yet</h2>
          <p className="text-gray-400 dark:text-gray-500 mb-6 max-w-md mx-auto">
            Tags appear automatically when you add them to your posts' frontmatter.
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          role="list"
          aria-label="Tags"
        >
          {tags.map((tag, i) => {
            const count = getPostsByTag(tag).length;
            return (
              <motion.link
                key={tag}
                href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group p-6 bg-gray-950/50 dark:bg-white/50 border border-gray-800 dark:border-gray-200 rounded-2xl transition-all duration-300 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)]"
                role="listitem"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-lg text-white dark:text-gray-900 group-hover:text-indigo-400 dark:group-hover:text-indigo-600 transition-colors">
                    {tag}
                  </span>
                  <span className="text-sm font-mono text-gray-500 dark:text-gray-400 bg-gray-900 dark:bg-gray-100 px-3 py-1 rounded-full">
                    {count}
                  </span>
                </div>
                <motion.div
                  className="mt-4 h-1 bg-gray-800 dark:bg-gray-200 rounded-full overflow-hidden"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(count * 10, 100)}%` }}
                  transition={{ delay: 0.05 * i + 0.3, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.05 * i + 0.5, duration: 0.6 }}
                  />
                </motion.div>
              </motion.link>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}