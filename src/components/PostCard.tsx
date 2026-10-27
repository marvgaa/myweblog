import Link from 'next/link';
import { motion } from 'framer-motion';
import { PostMeta } from '@/lib/posts';

interface PostCardProps {
  post: PostMeta;
  index?: number;
}

export default function PostCard({ post, index = 0 }: PostCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: 0.1 * index, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="group bg-gray-950/50 dark:bg-white/50 border border-gray-800 dark:border-gray-200 rounded-2xl overflow-hidden transition-all duration-500 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 hover:shadow-[0_0_40px_rgba(99,102,241,0.1)]"
    >
      {post.coverImage && (
        <Link href={`/posts/${post.slug}`} className="block relative overflow-hidden" aria-label={`Read ${post.title}`}>
          <motion.img
            src={post.coverImage}
            alt=""
            className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            initial={{ scale: 1 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
      )}

      <div className="p-6 md:p-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-xs px-3 py-1 bg-indigo-500/20 text-indigo-300 dark:text-indigo-700 rounded-full border border-indigo-500/30 hover:bg-indigo-500/30 transition-colors"
            >
              {tag}
            </Link>
          ))}
          {post.tags.length > 3 && (
            <span className="text-xs px-3 py-1 text-gray-500 dark:text-gray-400">
              +{post.tags.length - 3}
            </span>
          )}
        </div>

        <Link href={`/posts/${post.slug}`} className="block">
          <motion.h2
            className="text-xl md:text-2xl font-bold tracking-tight mb-3 text-white dark:text-gray-900 group-hover:text-indigo-400 dark:group-hover:text-indigo-600 transition-colors line-clamp-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index + 0.2, duration: 0.4 }}
          >
            {post.title}
          </motion.h2>
        </Link>

        <p className="text-gray-400 dark:text-gray-500 mb-5 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-800 dark:border-gray-200">
          <time dateTime={post.date} className="text-sm text-gray-500 dark:text-gray-400">
            {post.formattedDate}
          </time>
          <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {post.readingTime}
          </span>
        </div>
      </div>
    </motion.article>
  );
}