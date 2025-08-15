"use client";
import { useState } from "react";
import { useMachineSlice } from "@/components/machine/MachineViewProvider";

interface WorkExperience {
  title: string;
  company: string;
  timeframe: string;
  description: string;
}

const workExperience: WorkExperience[] = [
  {
    title: "Fractional CTO",
    company: "Various Companies",
    timeframe: "June 2023 - Present",
    description: "Led technical strategy and execution across startups in MarTech, Creator Tools, and Marketplaces, resulting in a 65% increase in development efficiency (measured through Story Points, Bugs/Defect Ratio, TTD). Built and managed technical teams, integrating AI into workflows for automation, content moderation, and analytics, enhancing system performance by 50%. Spearheaded MVP builds using Next.js, Supabase, Firebase, and Vercel, successfully launching AI-driven features and improving customer satisfaction rates."
  },
  {
    title: "VP, Software Engineering",
    company: "Talent Systems (SaaS Application)",
    timeframe: "Sep. 2022 - Nov. 2024",
    description: "Directed global team of 60+ web, mobile, and QA engineers across 8 lines of business. Launched 3 new mobile apps (iOS/Android) supporting subscription monetization and live video features. Scaled DevOps with Kubernetes, ArgoCD, Istio, and Terraform on GCP and AWS. Cut delivery cost per feature by 30% through architectural refactoring and agile process improvements. Built a collaborative pod structure with team captains and functional leaders across web, mobile, QA. Integrated acquired platforms post-M&A, aligning roadmaps and technology strategy with co-CEOs."
  },
  {
    title: "VP of Engineering",
    company: "PublicSq. (SaaS Application)",
    timeframe: "Sep. 2022 - Nov. 2024",
    description: "Scaled engineering team from 4 to 24 in less than a year. Owned development of e-commerce marketplace on web and mobile (NextJS, CapacitorJS, Firebase). Established SCRUM, Jira, OKRs, and engineering hiring pipeline from scratch. Shipped apps to App Store and Play Store, launched marketing site and internal tools. Acted as technical co-founder, architect, and hands-on contributor where needed."
  },
  {
    title: "Vice President, Technology",
    company: "Envoy (Innovation Partner)",
    timeframe: "Oct. 2018 - Nov. 2021",
    description: "Led 24+ engineers across web, mobile, QA, DevOps, and IT for high-profile client solutions. Delivered IoT-connected product experiences and enterprise CMS platforms (AWS IoT, React, Shopify, Contentful, Strapi, Google Cloud, GatsbyJS, NextJS). Oversaw eCommerce, custom mobile/web builds, and creative technology R&D for Fortune 500 brands. Established QA, CI/CD, and production launch standards across all engineering teams."
  },
  {
    title: "Director of Engineering",
    company: "Gigasavvy (Creative Agency)",
    timeframe: "Jun. 2013 - Oct. 2018",
    description: "Built and led dev team launching 100+ websites and custom SaaS Web applications for brands and startups. Owned technical architecture, dev process, and hiring across web, API, and CMS projects. Supported BD with technical scoping, vendor evaluation, and strategic planning. Contributed hands-on to React, PHP/Laravel, WordPress, and JavaScript projects with complex integrations."
  }
];

export default function WorkHistory() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  // Register Work Experience for Machine View
  useMachineSlice(
    {
      type: "section",
      title: "Work Experience",
      path: "/",
      order: 30,
      content: [
        "### Roles",
        ...workExperience.map(
          (j) => `- ${j.title} — ${j.company} (${j.timeframe})`
        ),
        "",
        "### Details",
        ...workExperience.map((j) => `- ${j.title}: ${j.description}`),
      ].join("\n"),
    },
    []
  );

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 md:pl-24">
        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-12 text-foreground">
          Work Experience
        </h2>
        
        <div className="space-y-0">
          {workExperience.map((job, index) => (
            <div
              key={index}
              className="group block border-t border-border transition-colors duration-300 ease-out hover:bg-accent/10"
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={activeIndex === index}
                aria-controls={`work-desc-${index}`}
                className="w-full text-left py-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground/80 group-hover:text-foreground transition-colors duration-300 ease-out">
                      {job.title}
                    </h3>
                    <div className="text-lg text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300 ease-out">
                      {job.company}
                    </div>
                  </div>
                  <div className="text-base text-muted-foreground font-medium shrink-0">
                    {job.timeframe}
                  </div>
                </div>
              </button>
              <div
                id={`work-desc-${index}`}
                className={`overflow-hidden transition-all duration-500 ease-out ${activeIndex === index ? "max-h-96" : "max-h-0 md:group-hover:max-h-32"}`}
              >
                <p
                  className={`text-foreground/70 max-w-4xl pb-6 pt-0 md:pt-4 transition-opacity duration-500 ease-out ${activeIndex === index ? "opacity-100" : "opacity-0 md:group-hover:opacity-100 md:delay-100"}`}
                >
                  {job.description}
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
