"use client";

import React from "react";

export default function ServicesPage() {
  return (
    <main className="relative mx-auto w-full max-w-6xl px-6 sm:px-8 md:px-10 lg:px-12 pt-32 sm:pt-40 md:pt-44 pb-20">
      {/* Hero */}
      <section className="mb-12 md:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          How I Operate
        </h1>
        <p className="mt-4 max-w-3xl text-base sm:text-lg leading-relaxed text-muted-foreground">
          I help leaders ship outcomes: clarify strategy, build the right product, scale teams, and
          reduce execution risk. My approach combines clear communication, pragmatic systems
          thinking, and a bias for measurable results.
        </p>
      </section>

      {/* Process */}
      <section className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Process</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white/60 dark:bg-black/60 backdrop-blur-sm p-5 sm:p-6">
            <h3 className="font-semibold text-lg">1) Diagnose</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Establish goals, constraints, and success metrics. Map the system: product, people,
              platform, process. Identify the few moves that matter.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white/60 dark:bg-black/60 backdrop-blur-sm p-5 sm:p-6">
            <h3 className="font-semibold text-lg">2) Design</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Co-create a simple plan: sequencing, ownership, and checkpoints. Translate strategy
              into actionable roadmaps and crisp comms.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white/60 dark:bg-black/60 backdrop-blur-sm p-5 sm:p-6">
            <h3 className="font-semibold text-lg">3) Deliver</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Ship. Track leading indicators. Unblock, coach, and course-correct. Build muscle so
              wins compound after I leave.
            </p>
          </div>
        </div>
      </section>

      {/* Audiences / Offerings (pricing-style layout, philosophy-first) */}
      <section className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Where I Help</h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-3xl">
          Not a menu—more like lenses on impact. Think of these as entry points; we tailor based on
          outcomes, not deliverables.
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Fractional CTO */}
          <div className="rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white/70 dark:bg-black/60 backdrop-blur-sm p-6">
            <h3 className="text-xl font-semibold">Fractional CTO</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>• Product and platform strategy</li>
              <li>• Org design, hiring bar, and rituals</li>
              <li>• Architecture, reliability, and velocity</li>
              <li>• Metrics that drive learning and revenue</li>
            </ul>
          </div>
          {/* CEOs & Founders */}
          <div className="rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white/70 dark:bg-black/60 backdrop-blur-sm p-6">
            <h3 className="text-xl font-semibold">For CEOs & Founders</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>• Clarify strategy and ruthless prioritization</li>
              <li>• Translate vision to an executable plan</li>
              <li>• Build the first-principles dashboard</li>
              <li>• De-risk launches and partner decisions</li>
            </ul>
          </div>
          {/* CTOs & VPEs */}
          <div className="rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white/70 dark:bg-black/60 backdrop-blur-sm p-6">
            <h3 className="text-xl font-semibold">For CTOs & VPs of Eng</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>• Org/roadmap refactor without losing momentum</li>
              <li>• Platform choices, standards, and guardrails</li>
              <li>• Incident → insight: reliability as a habit</li>
              <li>• Coaching rising leaders</li>
            </ul>
          </div>
          {/* Product leaders */}
          <div className="rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white/70 dark:bg-black/60 backdrop-blur-sm p-6">
            <h3 className="text-xl font-semibold">For Product Leaders</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>• Outcome-oriented roadmaps</li>
              <li>• Discovery → delivery feedback loops</li>
              <li>• Instrumentation for learning velocity</li>
              <li>• AI strategy: where to build vs. buy</li>
            </ul>
          </div>
          {/* Investors & Boards */}
          <div className="rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white/70 dark:bg-black/60 backdrop-blur-sm p-6">
            <h3 className="text-xl font-semibold">For Investors & Boards</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>• Pre/post-investment technical diligence</li>
              <li>• Execution risk assessment and mitigation</li>
              <li>• Org maturity and leadership depth</li>
              <li>• Value creation plan and checkpoints</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section>
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Philosophy</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white/60 dark:bg-black/60 backdrop-blur-sm p-5 sm:p-6">
            <h3 className="font-semibold">Radical Candor</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Say the thing that helps the team win. Care personally, challenge directly. Clarity is
              a kindness and a speed boost.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white/60 dark:bg-black/60 backdrop-blur-sm p-5 sm:p-6">
            <h3 className="font-semibold">Scaling People</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Systems and rituals that turn intent into repeatable outcomes. Build durable teams,
              not heroics.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white/60 dark:bg-black/60 backdrop-blur-sm p-5 sm:p-6">
            <h3 className="font-semibold">Start With Why</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Purpose → strategy → execution. Tie every sprint to a narrative, a metric, and a user.
              People do their best work when the why is obvious.
            </p>
          </div>
        </div>
        <p className="mt-6 text-sm text-muted-foreground max-w-3xl">
          I’m pragmatic, hands-on, and numbers-aware: revenue, margin, reliability, and learning
          velocity. I mentor leaders, unblock teams, and build the mechanisms that make good
          decisions the default.
        </p>
        <div className="mt-8">
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-[#96442e] hover:bg-[#b8553a] text-white px-5 py-3 font-semibold transition-colors duration-200"
          >
            Discuss an engagement
          </a>
        </div>
      </section>
    </main>
  );
}
