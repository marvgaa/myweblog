'use client';

import { MDXRemote } from 'next-mdx-remote/rsc';
import { visit } from 'unist-util-visit';

const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 mt-12 first:mt-0 animate-fade-in" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 mt-10 animate-slide-up" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 mt-8 animate-slide-up stagger-1" {...props} />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className="text-xl md:text-2xl font-bold tracking-tight mb-3 mt-6 animate-slide-up stagger-2" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-lg leading-relaxed mb-6 text-gray-300 dark:text-gray-200 animate-fade-in" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside space-y-3 mb-6 ml-4 animate-fade-in" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside space-y-3 mb-6 ml-4 animate-fade-in" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-lg leading-relaxed" {...props} />
  ),
  blockquote: (props: React.QuoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-indigo-500 pl-6 my-8 italic text-gray-300 dark:text-gray-300 bg-gray-900/50 dark:bg-gray-800/50 rounded-r-xl py-3 px-6 animate-fade-in" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => {
    const isInline = !props.className?.includes('language-');
    if (isInline) {
      return (
        <code className="bg-gray-900 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-indigo-300 border border-gray-700 dark:border-gray-600" {...props} />
      );
    }
    return <code {...props} />;
  },
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="bg-gray-950 dark:bg-black border border-gray-800 rounded-2xl p-6 overflow-x-auto mb-8 animate-fade-in" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors" {...props} />
  ),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    const alt = props.alt;
    const { alt: _, ...imgProps } = props;
    return (
      <figure className="my-12 animate-fade-in">
        <img className="rounded-2xl shadow-2xl w-full h-auto" {...imgProps} />
        {alt && <figcaption className="text-center text-gray-500 dark:text-gray-400 text-sm mt-2">{alt}</figcaption>}
      </figure>
    );
  },
  hr: () => <hr className="border-gray-800 my-12 animate-fade-in" />,
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-8 animate-fade-in">
      <table className="w-full border-collapse border border-gray-800" {...props} />
    </div>
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th className="border border-gray-800 px-4 py-3 bg-gray-900 dark:bg-gray-800 font-semibold text-left" {...props} />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className="border border-gray-800 px-4 py-3" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-white dark:text-gray-100" {...props} />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em className="italic text-gray-300 dark:text-gray-300" {...props} />
  ),
};

export function MDXContent({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />;
}