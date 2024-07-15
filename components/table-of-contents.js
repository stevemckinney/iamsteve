'use client'

import React, { useState, useEffect } from 'react';

function TableOfContents({ headings, ...props }) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -20% 0px' }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.slug);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  const createNestedHeadings = (headings) => {
    const nestedHeadings = [];
    const headingStack = [];

    headings.forEach((heading) => {
      const { level, text, slug } = heading;
      const linkMatch = text.match(/\[(.*?)\]\((.*?)\)/);
      const linkText = linkMatch ? linkMatch[1] : text.replace(/<a.*?>(.*?)<\/a>/, '$1');
      const linkUrl = linkMatch ? linkMatch[2] : '';

      if (level === 'two') {
        const newHeading = { level, text: linkText, slug, url: linkUrl, children: [] };
        nestedHeadings.push(newHeading);
        headingStack.push(newHeading);
      } else if (level === 'three' && headingStack.length > 0) {
        headingStack[headingStack.length - 1].children.push({ level, text: linkText, slug, url: linkUrl });
      }
    });

    return nestedHeadings;
  };

  const renderHeadings = (headings, className = 'pl-0') => {
    return (
      <ul className={className}>
        {headings.map((heading) => (
          <li key={heading.slug}>
            <a
              href={`#${heading.slug}`}
              className={`block font-medium py-1 ${activeId === heading.slug ? 'text-blue-500' : ''}`}
            >
              {heading.text}
            </a>
            {heading.children && heading.children.length > 0 && renderHeadings(heading.children, 'pl-4')}
          </li>
        ))}
      </ul>
    );
  };

  const nestedHeadings = createNestedHeadings(headings);

  return (
    <nav {...props}>
      {nestedHeadings.length > 0 ? renderHeadings(nestedHeadings) : null}
    </nav>
  );
}

export default TableOfContents;
