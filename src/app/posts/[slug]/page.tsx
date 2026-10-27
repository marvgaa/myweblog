import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { MDXContent } from '@/components/MDXContent';
import { format, parseISO } from 'date-fns';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
      images: post.coverImage ? [{ url: post.coverImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex(p => p.slug === post.slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return (
    <article className="container mx-auto px-6 py-12 md:py-20 max-w-4xl">
      <motion.header
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        className="mb-12 md:mb-16"
      >
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm px-3 py-1 bg-indigo-500/20 text-indigo-300 dark:text-indigo-700 rounded-full border border-indigo-500/30 hover:bg-indigo-500/30 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] mb-6"
        >
          {post.title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center gap-6 text-gray-400 dark:text-gray-500"
        >
          <time dateTime={post.date} className="text-sm">
            {post.formattedDate}
          </time>
          <span className="flex items-center gap-1 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {post.readingTime}
          </span>
        </motion.div>
      </motion.header>

      {post.coverImage && (
        <motion.figure
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mb-12 md:mb-16 -mx-6 md:mx-0 rounded-2xl overflow-hidden shadow-2xl"
        >
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-auto"
          />
        </motion.figure>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="prose prose-invert max-w-none"
      >
        <MDXContent source={post.content} />
      </motion.div>

      {/* Post Navigation */}
      {(prevPost || nextPost) && (
        <motion.nav
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-16 pt-8 border-t border-gray-800 dark:border-gray-200"
          aria-label="Post navigation"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {prevPost && (
              <Link
                href={`/posts/${prevPost.slug}`}
                className="group p-6 bg-gray-950/50 dark:bg-white/50 border border-gray-800 dark:border-gray-200 rounded-2xl transition-all duration-300 hover:border-indigo-500/50 dark:hover:border-indigo-500/50"
              >
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2 block">Previous Post</span>
                <h3 className="text-lg font-bold text-white dark:text-gray-900 group-hover:text-indigo-400 dark:group-hover:text-indigo-600 transition-colors line-clamp-2">
                  {prevPost.title}
                </h3>
                <time className="text-sm text-gray-500 dark:text-gray-400 mt-2 block">
                  {prevPost.formattedDate}
                </time>
              </Link>
            )}

            {nextPost && (
              <Link
                href={`/posts/${nextPost.slug}`}
                className="group p-6 bg-gray-950/50 dark:bg-white/50 border border-gray-800 dark:border-gray-200 rounded-2xl transition-all duration-300 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 text-right"
              >
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2 block">Next Post</span>
                <h3 className="text-lg font-bold text-white dark:text-gray-900 group-hover:text-indigo-400 dark:group-hover:text-indigo-600 transition-colors line-clamp-2">
                  {nextPost.title}
                </h3>
                <time className="text-sm text-gray-500 dark:text-gray-400 mt-2 block">
                  {nextPost.formattedDate}
                </time>
              </Link>
            )}
          </div>
        </motion.nav>
      )}

      {/* Back to posts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-12 text-center"
      >
        <Link
          href="/posts"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-700 dark:border-gray-300 text-gray-300 dark:text-gray-700 font-medium hover:border-indigo-500 hover:text-indigo-400 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to All Posts
        </Link>
      </motion.div>
    </article>
  );
}