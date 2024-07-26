'use client'

import { useState, useEffect } from 'react';
import Icon from '@/components/icon'
import styles from './table-of-contents.module.scss'

function TableOfContents({ headings, ...props }) {
  let [isOpen, setIsOpen] = useState(false);
//className={`${styles.collapsible}`}
  return (
    <details name="aside-toc" open>
      <summary onClick={() => setIsOpen(!isOpen)} className="font-bold cursor-pointer flex flex-row items-center gap-1" id="aside-contents">
        {isOpen && (
          <Icon icon="angle-right" size={16} className="relative -top-px -ml-6" />
        )}
        {!isOpen && (
          <Icon icon="angle-down" size={16} className="relative -top-px -ml-6" />
        )}
        Contents
      </summary>
      <TableOfContentsList headings={headings} />
    </details>
  )
}

function TableOfContentsList({ headings, ...props }) {
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

  const renderHeadings = (headings, className = 'pl-0', classChildren = 'pl-0') => {
    return (
      <ul className={className}>
        {headings.map((heading) => (
          <li key={heading.slug} className={`group/toc ${classChildren}`}>
            <a
              href={`#${heading.slug}`}
              className={`block truncate font-medium py-2 hover:text-fern-600 hover:translate-x-2 transform-gpu transition-all duration-200 ease ${activeId === heading.slug ? 'text-fern-600' : ''}`}
            >
              {heading.text}
            </a>
            {heading.children && heading.children.length > 0 && renderHeadings(heading.children, `mb-0`, `relative pl-6 before:content-[''] before:absolute before:left-0 before:top-[-4px] before:w-4 before:h-6 before:border-l-2 before:border-b-2 before:border-neutral-01-300 last:before:rounded-bl-sm after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-4 after:h-6 after:border-l-2 after:border-neutral-01-300 last:after:hidden`)}
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
