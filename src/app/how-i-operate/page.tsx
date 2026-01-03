"use client";

import React from "react";
import { Box, Lock, Search, Settings, Sparkles, Rocket } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";
import { useMachineSlice } from "@/components/machine/MachineViewProvider";
import PageViewEvent from "@/components/PageViewEvent";
import { useScrollTracking } from "@/hooks/useScrollTracking";

export default function HowIOperatePage() {
  // Register page content for Machine View
  useMachineSlice({
    type: "page",
    title: "How I Operate",
    path: "/how-i-operate",
    order: 10,
    content: `### Summary\n\nI’m a hands‑on software engineering leader who turns strategy into shipped software. I align product and engineering, build teams and systems that scale, and reduce risk while increasing delivery velocity.\n\n### Process\n\n1. **Assess** — Rapid clarity on goals, constraints, and reality. Map value, risks, and unknowns.\n2. **Align** — Translate strategy into a focused plan: priorities, owners, checkpoints, and metrics.\n3. **Execute** — Ship, measure, and iterate. Build durable mechanisms for reliability and speed.\n\n### Leadership & Management Style\n\n- **Clarity & Accountability** — Write the plan, name the owner, define done. Weekly operating rhythm with visible metrics.\n- **Autonomy with Guardrails** — Small teams with clear interfaces; standards, code review, and SLOs/on‑call keep speed from breaking quality.\n- **Coach & Raise the Bar** — Direct, kind feedback. Grow leaders and make hard calls when needed; incidents become insights.`,
  }, []);
  // Track scroll depth and time on page
  useScrollTracking({ trackScrollDepth: true, trackTimeOnPage: true });

  return (
    <>
      <PageViewEvent pageName="how_i_operate" />
      <main className="relative mx-auto w-full max-w-6xl px-6 sm:px-8 md:px-10 lg:px-12 pt-32 sm:pt-40 md:pt-44 pb-20">
      {/* Hero */}
      <section className="mb-12 md:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          How I Operate
        </h1>
        <p className="mt-4 max-w-3xl text-base sm:text-lg leading-relaxed text-muted-foreground">
          I’m a hands‑on engineering leader who turns strategy into shipped software. I align product
          and engineering, build teams and systems that scale, and reduce risk while increasing
          delivery velocity.
        </p>
      </section>

      {/* Leadership & Management Style */}
      <section className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Leadership & Management Style</h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-3xl">
          How I lead day‑to‑day so teams move fast and build well.
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="relative rounded-2xl p-2">
            <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
            <div className="relative rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white/70 dark:bg-black/60 backdrop-blur-sm p-6">
              <h3 className="text-xl font-semibold">Clarity & Accountability</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Write the plan, name the owner, define done. Weekly operating rhythm with visible
                metrics.
              </p>
            </div>
          </div>
          <div className="relative rounded-2xl p-2">
            <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
            <div className="relative rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white/70 dark:bg-black/60 backdrop-blur-sm p-6">
              <h3 className="text-xl font-semibold">Autonomy with Guardrails</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Small teams with clear interfaces. Standards, code review, and SLOs/on‑call keep
                speed from breaking quality.
              </p>
            </div>
          </div>
          <div className="relative rounded-2xl p-2">
            <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
            <div className="relative rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white/70 dark:bg-black/60 backdrop-blur-sm p-6">
              <h3 className="text-xl font-semibold">Coach & Raise the Bar</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Direct, kind feedback. Grow leaders through coaching and hiring; make hard calls
                when needed.
              </p>
            </div>
          </div>
          <div className="relative rounded-2xl p-2">
            <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
            <div className="relative rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white/70 dark:bg-black/60 backdrop-blur-sm p-6">
              <h3 className="text-xl font-semibold">Incidents → Insights</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Blameless postmortems, instrumentation, and fast follow‑ups turn outages and
                misses into improvements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Process</h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-3xl">
          A simple loop that creates clarity and momentum.
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative rounded-2xl p-2">
            <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
            <div className="relative rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white/70 dark:bg-black/60 backdrop-blur-sm p-6">
              <h3 className="text-xl font-semibold">1) Assess</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Rapid clarity on goals, constraints, and reality. Map value, risks, and
                unknowns.
              </p>
            </div>
          </div>
          <div className="relative rounded-2xl p-2">
            <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
            <div className="relative rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white/70 dark:bg-black/60 backdrop-blur-sm p-6">
              <h3 className="text-xl font-semibold">2) Align</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Translate strategy into a focused plan: priorities, owners, checkpoints, and
                metrics.
              </p>
            </div>
          </div>
          <div className="relative rounded-2xl p-2">
            <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
            <div className="relative rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white/70 dark:bg-black/60 backdrop-blur-sm p-6">
              <h3 className="text-xl font-semibold">3) Execute</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Ship, measure, and iterate. Build durable mechanisms for reliability and
                speed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Audiences / Offerings (glowing grid) */}
      <section className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Where I Help</h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-3xl">
          Clear, outcome‑oriented engagements. Pick the situation; we tailor the plan.
        </p>
        <ul className="mt-6 grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:grid-rows-2">
          <GridItem
            area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
            icon={<Settings className="h-4 w-4" />}
            title="Fractional CTO / Interim VP Eng"
            description={
              <>Senior leadership on day one: strategy, org design and hiring, platform choices, and an
              operating cadence from boardroom to code reviews.</>
            }
          />
          <GridItem
            area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
            icon={<Box className="h-4 w-4" />}
            title="CEO & Owner Partnership"
            description={
              <>Translate vision into an executable plan. Focus the team on the few moves that change the
              business, with transparent metrics and a weekly rhythm.</>
            }
          />
          <GridItem
            area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/2/8]"
            icon={<Lock className="h-4 w-4" />}
            title="Scale & Reliability Systems"
            description={
              <>Raise velocity and quality together: delivery pipeline, SLOs/SLIs, on‑call, observability,
              and incident reviews that turn outages into improvements.</>
            }
          />
          <GridItem
            area="md:[grid-area:2/7/3/13] xl:[grid-area:2/5/3/8]"
            icon={<Rocket className="h-4 w-4" />}
            title="Zero‑to‑One Product & AI"
            description={
              <>Scope ruthlessly and prove value fast. Pragmatic AI build‑vs‑buy, first‑ten hires, MVP
              guardrails, GTM alignment, and milestone‑driven fundraising.</>
            }
          />
          <GridItem
            area="md:[grid-area:3/1/4/7] xl:[grid-area:1/8/2/11]"
            icon={<Sparkles className="h-4 w-4" />}
            title="Product Operating Model"
            description={
              <>Outcome‑based roadmaps, tight discovery‑to‑delivery loops, clear instrumentation for
              learning velocity, and decision frameworks people actually use.</>
            }
          />
          <GridItem
            area="md:[grid-area:3/7/4/13] xl:[grid-area:2/8/3/11]"
            icon={<Search className="h-4 w-4" />}
            title="Portfolio & Board Diligence"
            description={
              <>Technical and execution diligence pre/post investment: leadership depth, roadmap realism,
              risk profile, and a 90‑day value‑creation plan.</>
            }
          />

        </ul>
      </section>

      {/* Philosophy */}
      <section className="mb-20">
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Philosophy</h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-3xl">
          How I show up: candid, pragmatic, and metrics‑driven.
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative rounded-2xl p-2">
            <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
            <div className="relative rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white/70 dark:bg-black/60 backdrop-blur-sm p-6">
              <h3 className="text-xl font-semibold">Radical Candor</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Say the quiet parts out loud with care. Clear, direct feedback that builds trust
                and speed.
              </p>
            </div>
          </div>
          <div className="relative rounded-2xl p-2">
            <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
            <div className="relative rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white/70 dark:bg-black/60 backdrop-blur-sm p-6">
              <h3 className="text-xl font-semibold">Scaling People</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Raise the bar through hiring, coaching, and mechanisms that make good choices
                the default.
              </p>
            </div>
          </div>
          <div className="relative rounded-2xl p-2">
            <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
            <div className="relative rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white/70 dark:bg-black/60 backdrop-blur-sm p-6">
              <h3 className="text-xl font-semibold">Start With Why</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Tie every roadmap item to customer value and business outcomes. Principles beat
                preferences.
              </p>
            </div>
          </div>
        </div>
        <p className="mt-6 text-sm text-muted-foreground max-w-3xl">
          I’m hands‑on and numbers‑aware—revenue, margin, reliability, and learning velocity. I
          mentor leaders, unblock teams, and install the operating system that keeps shipping.
        </p>
      </section>
    </main>
    </>
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
