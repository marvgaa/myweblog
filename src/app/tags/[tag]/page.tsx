import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getPostsByTag, getAllTags } from '@/lib/posts';
import PostCard from '@/components/PostCard';

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    tag: tag.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const tagName = resolvedParams.tag.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const posts = getPostsByTag(tagName);

  if (posts.length === 0) {
    return { title: 'Tag Not Found' };
  }

  return {
    title: `Posts tagged "${tagName}"`,
    description: `${posts.length} post${posts.length !== 1 ? 's' : ''} tagged with "${tagName}"`,
    openGraph: {
      title: `Posts tagged "${tagName}"`,
      description: `${posts.length} post${posts.length !== 1 ? 's' : ''} tagged with "${tagName}"`,
      type: 'website',
    },
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const resolvedParams = await params;
  const tagName = resolvedParams.tag.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const posts = getPostsByTag(tagName);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="container mx-auto px-6 py-12 md:py-20">
      <motion.header
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        className="mb-12 md:mb-16 max-w-3xl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 dark:text-indigo-700 text-sm font-medium mb-4"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          Tag
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4"
        >
          {tagName}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-gray-400 dark:text-gray-500"
        >
          {posts.length} {posts.length === 1 ? 'post' : 'posts'} tagged with "{tagName}"
        </motion.p>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        role="list"
        aria-label={`Posts tagged ${tagName}`}
      >
        {posts.map((post, i) => (
          <PostCard key={post.slug} post={post} index={i} />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-12 text-center"
      >
        <Link
          href="/tags"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-700 dark:border-gray-300 text-gray-300 dark:text-gray-700 font-medium hover:border-indigo-500 hover:text-indigo-400 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          All Tags
        </Link>
      </motion.div>
    </div>
  );
}