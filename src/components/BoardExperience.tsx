"use client";
import { useState } from "react";

import { useMachineSlice } from "@/components/machine/MachineViewProvider";

interface BoardExperience {
  title: string;
  company: string;
  timeframe: string;
  description: string;
}

const boardExperience: BoardExperience[] = [
  {
    title: "AWS SoCal Executive Advisory Board",
    company: "Amazon Web Services",
    timeframe: "Oct. 2023 - Nov. 2024",
    description: "The AWS SoCal Executive Advisory Board is a confluence of senior executives and industry thought leaders, brought together to foster innovative business strategies, enhance operational efficiency, and drive sustainable growth."
  },
  {
    title: "Engineering Leadership Community - Chapter Organizer",
    company: "Engineering Leadership Community",
    timeframe: "Oct. 2023 - Present",
    description: "The Engineering Leadership Community is a platform for engineering leaders of all roles and tenures to engage, exchange ideas, and face challenges together. It's more than a peer group; it's a sanctuary for gaining diverse perspectives and discussing real-world issues with trusted peers."
  },
  {
    title: "Advisory Board Member",
    company: "StatusHero/Steady",
    timeframe: "Jan. 2022 - Present",
    description: "Our vision is to streamline work processes, ensuring that time and effort are invested where they matter most. As a member of our advisory board, your role will be pivotal in shaping this vision. Your insights will help us examine and refine our ideas, ensuring that our assumptions are robust and our strategies are sound."
  }
];

export default function BoardExperience() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  // Register Board & Advisory Experience for Machine View
  useMachineSlice(
    {
      type: "section",
      title: "Board & Advisory Experience",
      path: "/",
      order: 40,
      content: [
        "### Roles",
        ...boardExperience.map(
          (b) => `- ${b.title} — ${b.company} (${b.timeframe})`
        ),
        "",
        "### Details",
        ...boardExperience.map(
          (b) => `- ${b.title}: ${b.description}`
        ),
      ].join("\n"),
    },
    []
  );

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 md:pl-24">
        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-12 text-foreground">
          Board & Advisory Experience
        </h2>
        
        <div className="space-y-0">
          {boardExperience.map((board, index) => (
            <div
              key={index}
              className="group block border-t border-border transition-colors duration-300 ease-out hover:bg-accent/10"
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={activeIndex === index}
                aria-controls={`board-desc-${index}`}
                className="w-full text-left py-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground/80 group-hover:text-foreground transition-colors duration-300 ease-out">
                      {board.title}
                    </h3>
                    <div className="text-lg text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300 ease-out">
                      {board.company}
                    </div>
                  </div>
                  <div className="text-base text-muted-foreground font-medium shrink-0">
                    {board.timeframe}
                  </div>
                </div>
              </button>
              <div
                id={`board-desc-${index}`}
                className={`overflow-hidden transition-all duration-500 ease-out ${activeIndex === index ? "max-h-96" : "max-h-0 md:group-hover:max-h-32"}`}
              >
                <p
                  className={`text-foreground/70 max-w-4xl pb-6 pt-0 md:pt-4 transition-opacity duration-500 ease-out ${activeIndex === index ? "opacity-100" : "opacity-0 md:group-hover:opacity-100 md:delay-100"}`}
                >
                  {board.description}
                </p>
              </div>
            </div>
          ))}
          
          {/* Bottom border */}
          <div className="border-t border-border mt-0"></div>
        </div>
      </div>
    </section>
  );
}
