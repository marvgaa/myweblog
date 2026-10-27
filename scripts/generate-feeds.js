import fs from 'fs';
import path from 'path';
import { getAllPosts, getAllTags } from '@/lib/posts';

const siteUrl = 'https://yourusername.github.io/weblog'; // Update this!

function generateSitemap() {
  const posts = getAllPosts();
  const tags = getAllTags();
  const now = new Date().toISOString();

  const staticPages = [
    { url: '', changefreq: 'weekly', priority: 1.0 },
    { url: '/posts', changefreq: 'daily', priority: 0.9 },
    { url: '/tags', changefreq: 'weekly', priority: 0.8 },
    { url: '/about', changefreq: 'monthly', priority: 0.7 },
  ];

  const postUrls = posts.map(post => ({
    url: `/posts/${post.slug}`,
    lastmod: post.date.split('T')[0],
    changefreq: 'monthly',
    priority: 0.8,
  }));

  const tagUrls = tags.map(tag => ({
    url: `/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`,
    lastmod: now.split('T')[0],
    changefreq: 'weekly',
    priority: 0.6,
  }));

  const allUrls = [...staticPages, ...postUrls, ...tagUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(page => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  const outDir = path.join(process.cwd(), 'out');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap);
  console.log('✅ sitemap.xml generated');
}

function generateRSS() {
  const posts = getAllPosts().slice(0, 20); // Latest 20 posts
  const now = new Date().toISOString();

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Weblog</title>
    <link>${siteUrl}</link>
    <description>A modern, fast weblog built with Next.js and MDX.</description>
    <language>en</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <generator>Next.js MDX Weblog</generator>
${posts.map(post => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/posts/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/posts/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${post.tags.join('</category><category>')}</category>
    </item>`).join('\n')}
  </channel>
</rss>`;

  const outDir = path.join(process.cwd(), 'out');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  fs.writeFileSync(path.join(outDir, 'rss.xml'), rss);
  console.log('✅ rss.xml generated');
}

generateSitemap();
generateRSS();