import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { format, parseISO } from 'date-fns';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  formattedDate: string;
  tags: string[];
  excerpt: string;
  coverImage?: string;
  readingTime: string;
}

export interface Post extends PostMeta {
  content: string;
}

function getReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));
  const posts = fileNames.map(fileName => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const slug = fileName.replace(/\.mdx?$/, '');

    return {
      slug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      formattedDate: format(parseISO(data.date || new Date().toISOString()), 'MMMM d, yyyy'),
      tags: data.tags || [],
      excerpt: data.excerpt || content.slice(0, 160).replace(/[#*`_]/g, '').trim() + '...',
      coverImage: data.coverImage,
      readingTime: getReadingTime(content),
    };
  });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const altPath = path.join(postsDirectory, `${slug}.md`);
  const filePath = fs.existsSync(fullPath) ? fullPath : fs.existsSync(altPath) ? altPath : null;

  if (!filePath) return null;

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || 'Untitled',
    date: data.date || new Date().toISOString(),
    formattedDate: format(parseISO(data.date || new Date().toISOString()), 'MMMM d, yyyy'),
    tags: data.tags || [],
    excerpt: data.excerpt || content.slice(0, 160).replace(/[#*`_]/g, '').trim() + '...',
    coverImage: data.coverImage,
    readingTime: getReadingTime(content),
    content,
  };
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set<string>();
  posts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
  return Array.from(tags).sort();
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter(post => post.tags.includes(tag));
}