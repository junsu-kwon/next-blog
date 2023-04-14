'use client';

import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Image from 'next/image';

export default function MarkdownViewer({ content }: { content: string }) {
  const whiteColorStyle = { color: 'white' };
  return (
    <ReactMarkdown
      className="prose max-w-none text-white"
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              {...props}
              style={vs2015}
              language={match[1]}
              PreTag="div"
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code
              {...props}
              className={`${className} bg-gray-200 rounded-md p-0.5 text-red-700`}
            >
              {children}
            </code>
          );
        },
        img: (image) => {
          return (
            <Image
              className="w-full max-h-60 object-cover"
              src={image.src || ''}
              alt={image.alt || ''}
              width={500}
              height={300}
            />
          );
        },
        h1: ({ node, children, ...props }) => (
          <h1 style={whiteColorStyle} {...props}>
            {children}
          </h1>
        ),
        h2: ({ node, children, ...props }) => (
          <h2 style={whiteColorStyle} {...props}>
            {children}
          </h2>
        ),
        h3: ({ node, children, ...props }) => (
          <h3 style={whiteColorStyle} {...props}>
            {children}
          </h3>
        ),
        h4: ({ node, children, ...props }) => (
          <h4 style={whiteColorStyle} {...props}>
            {children}
          </h4>
        ),
        h5: ({ node, children, ...props }) => (
          <h5 style={whiteColorStyle} {...props}>
            {children}
          </h5>
        ),
        h6: ({ node, children, ...props }) => (
          <h6 style={whiteColorStyle} {...props}>
            {children}
          </h6>
        ),
        p: ({ node, children, ...props }) => (
          <p style={whiteColorStyle} {...props}>
            {children}
          </p>
        ),
        span: ({ node, children, ...props }) => (
          <span style={whiteColorStyle} {...props}>
            {children}
          </span>
        ),
        a: ({ node, children, ...props }) => (
          <a style={{ color: 'skyblue' }} {...props}>
            {children}
          </a>
        ),
        strong: ({ node, children, ...props }) => (
          <a style={{ fontWeight: 'bold', color: 'white' }} {...props}>
            {children}
          </a>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
