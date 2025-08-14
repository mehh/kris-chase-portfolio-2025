"use client";

import React from "react";
import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";

export default function HowIOperatePage() {
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

      {/* Audiences / Offerings (glowing grid) */}
      <section className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Where I Help</h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-3xl">
          Philosophy-first. These are lenses on impact, not a menu. We tailor based on outcomes.
        </p>
        <ul className="mt-6 grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
          <GridItem
            area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
            icon={<Settings className="h-4 w-4" />}
            title="Fractional CTO"
            description={
              <>Strategy to execution. Org design, platform choices, reliability, and metrics
              that drive learning and revenue.</>
            }
          />
          <GridItem
            area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
            icon={<Box className="h-4 w-4" />}
            title="For CEOs & Founders"
            description={
              <>Clarify priorities, translate vision to an executable plan, and de-risk the
              path to launch and scale.</>
            }
          />
          <GridItem
            area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
            icon={<Lock className="h-4 w-4" />}
            title="For CTOs & VPs of Eng"
            description={
              <>Roadmap/ops refactor without stalling. Guardrails, standards, and coaching to lift
              reliability and velocity.</>
            }
          />
          <GridItem
            area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
            icon={<Sparkles className="h-4 w-4" />}
            title="For Product Leaders"
            description={
              <>Outcome-oriented roadmaps, discovery→delivery loops, instrumentation, and sensible
              AI build vs buy.</>
            }
          />
          <GridItem
            area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
            icon={<Search className="h-4 w-4" />}
            title="For Investors & Boards"
            description={
              <>Diligence, execution risk assessment, leadership depth, and value creation
              checkpoints.</>
            }
          />
        </ul>
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

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={cn("min-h-[14rem] list-none", area)}>
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-background p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border-[0.75px] border-border bg-muted p-2">{icon}</div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-foreground">
                {title}
              </h3>
              <h2 className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-muted-foreground">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
