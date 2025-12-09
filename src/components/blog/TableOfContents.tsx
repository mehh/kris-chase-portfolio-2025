'use client';

import { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extract headings from the article - try multiple selectors
    const article = document.querySelector("article.prose") || 
                    document.querySelector("article") ||
                    document.querySelector(".prose");
    if (!article) return;

    const headingElements = article.querySelectorAll("h2, h3");
    const extractedHeadings: Heading[] = Array.from(headingElements).map((el) => ({
      id: el.id || String(el.textContent || "").toLowerCase().replace(/\s+/g, "-"),
      text: el.textContent || "",
      level: parseInt(el.tagName.charAt(1)),
    }));

    setHeadings(extractedHeadings);

    // Set IDs on headings if they don't have them
    headingElements.forEach((el, index) => {
      if (!el.id) {
        el.id = extractedHeadings[index]?.id || `heading-${index}`;
      }
    });
  }, []);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0% -60% 0%',
        threshold: [0, 0.5, 1],
      }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) observer.unobserve(element);
      });
    };
  }, [headings]);

  if (headings.length === 0) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav
      className="sticky top-24 hidden xl:block w-64 h-fit max-h-[calc(100vh-8rem)] overflow-y-auto"
      aria-label="Table of contents"
    >
      <div className="border-l-2 border-border/30 pl-6 py-2">
        <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
          Contents
        </h3>
        <ul className="space-y-2">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            const indent = heading.level - 1;

            return (
              <li
                key={heading.id}
                style={{ paddingLeft: `${indent * 0.75}rem` }}
                className="relative"
              >
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => handleClick(e, heading.id)}
                  className={`group flex items-start gap-2 text-sm transition-colors ${
                    isActive
                      ? 'text-primary font-medium'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {heading.level > 2 && (
                    <ChevronRight className="w-3 h-3 mt-0.5 flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" />
                  )}
                  <span className="leading-relaxed">{heading.text}</span>
                </a>
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary" />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
