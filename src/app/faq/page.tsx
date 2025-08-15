"use client";

import React from "react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { useMachineSlice } from "@/components/machine/MachineViewProvider";
import { INTERVIEW_FAQ, FAQ_CATEGORIES } from "@/data/interview-faq";

export default function FAQPage() {
  // Register page content for Machine View
  const md = INTERVIEW_FAQ.map((f) => `### ${f.question}\n\n${f.answer}`).join("\n\n");
  useMachineSlice(
    {
      type: "page",
      title: "Interview FAQ",
      path: "/faq",
      order: 11,
      content: md,
    },
    []
  );

  // Category helpers (category-driven UX)
  const CATEGORY_PREFIX = "category:" as const;
  type CategoryId = (typeof FAQ_CATEGORIES)[number]["id"];
  const categoryLabel = new Map<CategoryId, string>(FAQ_CATEGORIES.map((c) => [c.id, c.label] as const));
  const getCategories = (tags?: string[]): CategoryId[] => {
    if (!tags?.length) return [] as CategoryId[];
    const ids = FAQ_CATEGORIES.map((c) => c.id).filter((id) => tags.includes(`${CATEGORY_PREFIX}${id}`));
    return Array.from(new Set(ids));
  };

  const catCounts = new Map<CategoryId, number>(); // id -> count
  for (const f of INTERVIEW_FAQ) {
    const cats = getCategories(f.tags);
    cats.forEach((id) => catCounts.set(id, (catCounts.get(id) ?? 0) + 1));
  }
  // Sort categories by count desc, then by label
  const allCategories: CategoryId[] = Array.from(catCounts.keys()).sort((a, b) => {
    const diff = (catCounts.get(b) ?? 0) - (catCounts.get(a) ?? 0);
    if (diff !== 0) return diff;
    return (categoryLabel.get(a) ?? a).localeCompare(categoryLabel.get(b) ?? b);
  });

  const [selected, setSelected] = React.useState<CategoryId[]>([]); // category ids

  // Filtering utility: item matches when it contains ALL selected categories
  const matchesAllSelected = (tags?: string[]) => {
    if (!selected.length) return true;
    const cats = getCategories(tags);
    if (!cats.length) return false;
    return selected.every((id) => cats.includes(id));
  };

  // Determine which categories to render as sections
  const sectionCats: CategoryId[] = selected.length ? selected : allCategories;

  const toggleCategory = (id: CategoryId) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]));
  };

  const clearAll = () => setSelected([]);

  return (
    <main className="relative mx-auto w-full max-w-6xl px-6 sm:px-8 md:px-10 lg:px-12 pt-32 sm:pt-40 md:pt-44 pb-20">
      {/* Header */}
      <section className="mb-8 sm:mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">Interview FAQ</h1>
        <p className="mt-4 max-w-3xl text-base sm:text-lg leading-relaxed text-muted-foreground">
          Browse by topic or filter using categories. Selecting multiple categories shows FAQs that match all of them.
        </p>
      </section>

      {/* Category Filter Bar */}
      <section aria-label="FAQ category filters" className="sticky top-20 z-10 -mx-2 mb-10 backdrop-blur supports-[backdrop-filter]:bg-white/40 dark:supports-[backdrop-filter]:bg-black/30">
        <div className="px-2 py-3 sm:py-4 overflow-x-auto">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={clearAll}
              aria-pressed={!selected.length}
              className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs sm:text-sm transition-colors ${
                !selected.length
                  ? "bg-foreground text-background border-foreground"
                  : "bg-transparent text-foreground hover:bg-foreground/10 border-gray-300 dark:border-gray-800"
              }`}
            >
              All
              <span className="ml-1.5 text-[10px] sm:text-xs opacity-70">{INTERVIEW_FAQ.length}</span>
            </button>
            {allCategories.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => toggleCategory(id)}
                aria-pressed={selected.includes(id)}
                className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs sm:text-sm transition-colors ${
                  selected.includes(id)
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-foreground hover:bg-foreground/10 border-gray-300 dark:border-gray-800"
                }`}
              >
                {categoryLabel.get(id) ?? id}
                <span className="ml-1.5 text-[10px] sm:text-xs opacity-70">{catCounts.get(id) ?? 0}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Category-driven Sections */}
      <div className="space-y-12">
        {sectionCats.map((id) => {
          const items = INTERVIEW_FAQ.filter((f) => getCategories(f.tags).includes(id)).filter((f) => matchesAllSelected(f.tags));
          if (!items.length) return null;
          return (
            <section key={id} className="scroll-mt-28" id={`cat-${id}`} aria-labelledby={`heading-${id}`}>
              <div className="mb-4 flex items-center justify-between gap-4">
                <h2 id={`heading-${id}`} className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                  {categoryLabel.get(id) ?? id}
                  <span className="ml-2 align-middle text-xs text-muted-foreground">{items.length}</span>
                </h2>
                <a
                  href={`#cat-${id}`}
                  className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2"
                >
                  #{categoryLabel.get(id) ?? id}
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {items.map((item) => (
                  <div key={item.id} id={item.id} className="relative rounded-2xl p-2 scroll-mt-28">
                    <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
                    <div className="relative rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white/70 dark:bg-black/60 backdrop-blur-sm p-6">
                      <h3 className="text-lg md:text-xl font-semibold text-foreground flex items-center gap-2">
                        {item.question}
                        <a href={`#${item.id}`} className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2">
                          #{item.id}
                        </a>
                      </h3>
                      <p className="mt-3 text-sm md:text-base text-muted-foreground whitespace-pre-wrap">{item.answer}</p>
                      {getCategories(item.tags).length ? (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {getCategories(item.tags).map((cid) => (
                            <button
                              key={cid}
                              type="button"
                              onClick={() => toggleCategory(cid)}
                              className="text-[10px] sm:text-xs rounded-full border px-2.5 py-1 border-gray-300 dark:border-gray-800 text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-colors"
                              aria-label={`Filter by ${categoryLabel.get(cid) ?? cid}`}
                            >
                              {categoryLabel.get(cid) ?? cid}
                            </button>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
