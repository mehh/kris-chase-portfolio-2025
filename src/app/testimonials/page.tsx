"use client";

import { motion } from "motion/react";
import { testimonials } from "../../data/testimonials";
import SimpleHoverEffect from "../../components/SimpleHoverEffect";
import { SectionTransition } from "../../components/SmoothScrollProvider";
import { useMachineSlice } from "@/components/machine/MachineViewProvider";
import Image from "next/image";

export default function TestimonialsPage() {
  // Register page content for Machine View
  useMachineSlice({
    type: "page",
    title: "Testimonials",
    path: "/testimonials",
    order: 50,
    content: [
      "### Summary",
      "Voices from the Field — curated LinkedIn reviews.",
      "",
      "### People",
      ...testimonials.map((t) => `- ${t.name} — ${t.role}`),
      "",
      "### Quotes",
      ...testimonials.map((t) => `- \"${t.text}\" — ${t.name}, ${t.role}`),
      "",
      "### CTA",
      "[Get In Touch](/contact)",
    ].join("\n"),
  }, []);

  return (
    <>
      {/* Global Components */}
      <SimpleHoverEffect />
      
      {/* Page Content with site structure */}
      <div className="min-h-screen bg-white dark:bg-black relative z-10 pl-20 sm:pl-16">
        {/* Hero Section */}
        <SectionTransition id="testimonials-hero">
          <section id="testimonials-hero" className="pt-20 pb-16">
            <div className="container mx-auto px-6 sm:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-center mb-16"
              >
                <div className="flex justify-center mb-6">
                  <div className="border border-[#96442e]/30 py-2 px-6 rounded-lg bg-[#96442e]/10">
                    <span className="text-[#96442e] text-sm font-medium">Professional Network</span>
                  </div>
                </div>
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-black dark:text-white mb-8">
                  Voices from the Field
                </h1>
                
                <p className="text-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-4">
                  These are some of the incredible professionals and friends I&apos;ve been fortunate enough to 
                  collaborate with throughout my journey in this industry. Each has contributed to shaping 
                  who I am as a leader and engineer.
                </p>
                
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                  I encourage you to reach out to any of them directly—they&apos;re not just colleagues, 
                  they&apos;re the kind of people who make this industry extraordinary.
                </p>
              </motion.div>
            </div>
          </section>
        </SectionTransition>

        {/* Bento Box Testimonials Grid */}
        <SectionTransition id="testimonials-grid">
          <section id="testimonials-grid" className="pb-20">
            <div className="container mx-auto px-6 sm:px-8">
              {/* Staggered Bento Box Grid */}
              <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.1,
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                    className="break-inside-avoid bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:border-[#96442e]/30 transition-all duration-300 hover:bg-gray-100/50 dark:hover:bg-gray-900/70 hover:scale-[1.02] mb-6 flex flex-col justify-between"
                  >
                    {/* Quote Content */}
                    <div className="flex-1">
                      <svg 
                        className="w-6 h-6 text-[#96442e] mb-4" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                      </svg>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm mb-6">
                        &ldquo;{testimonial.text}&rdquo;
                      </p>
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-3 mt-auto">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full border-2 border-[#96442e]/20 object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-black dark:text-white text-sm truncate">
                          {testimonial.name}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 text-xs leading-tight">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className="text-center mt-20"
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-6">
                  Ready to Build Something Great?
                </h2>
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                  Let&apos;s discuss how I can help lead your engineering team to success.
                </p>
                <a 
                  href="/contact"
                  className="inline-flex items-center justify-center bg-[#96442e] hover:bg-[#b8553a] text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300 shadow-lg text-lg"
                >
                  Get In Touch
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </motion.div>
            </div>
          </section>
        </SectionTransition>
      </div>
    </>
  );
}
