"use client";

import React, { Suspense, useRef } from "react";
import { motion } from "motion/react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { SectionTransition } from "@/components/SmoothScrollProvider";
import { useMachineSlice } from "@/components/machine/MachineViewProvider";
import { Canvas, useFrame, type RootState } from "@react-three/fiber";
import type * as THREE from "three";
import { useInView } from "framer-motion";

// Mini 3D icons (borrowed from ThreeUp)
function RotatingBox({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((state: RootState) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime();
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });
  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#ffffff" wireframe />
    </mesh>
  );
}

function RotatingSphere({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((state: RootState) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.5;
      meshRef.current.rotation.y = state.clock.getElapsedTime();
    }
  });
  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1]} />
      <meshBasicMaterial color="#ffffff" wireframe />
    </mesh>
  );
}

function RotatingTorus({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((state: RootState) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.7;
    }
  });
  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[1, 0.3]} />
      <meshBasicMaterial color="#ffffff" wireframe />
    </mesh>
  );
}

function MiniVisibleCanvas({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, {
    margin: "-10% 0px -10% 0px",
    amount: 0.2,
  });
  return (
    <div ref={ref} className="h-24 relative mb-3">
      {isInView ? (
        <Canvas camera={{ position: [0, 0, 3] }} gl={{ antialias: false, powerPreference: "low-power" }} dpr={[1, 1.5]}>
          <Suspense fallback={null}>{children}</Suspense>
        </Canvas>
      ) : null}
    </div>
  );
}

export default function TithelyNinetyDayPlanPage() {
  // Register page content for Machine View
  useMachineSlice(
    {
      type: "page",
      title: "90-Day Plan (Tithely)",
      path: "/tithely-90-day-plan",
      order: 70,
      content: [
        "### Summary",
        "A focused roadmap to strengthen reliability, delivery speed, and cross-team alignment.",
        "",
        "### Phases",
        "1. Diagnose — Baseline metrics, delivery bottlenecks, on-call/reliability review, stakeholder interviews.",
        "2. Design — Release standards, paved-path workflows, visibility dashboards, operating cadence.",
        "3. Deliver — Reliability win, product win, developer productivity gains, KPI reporting.",
        "",
        "### Leadership",
        "- Reliability — Build systems that prevent surprises.",
        "- Velocity — Ship often, measure results, iterate.",
        "- Culture — Ownership, trust, and growth.",
      ].join("\n"),
    },
    []
  );

  const onShare = async () => {
    try {
      const shareData = {
        title: "90-Day Plan | VP of Engineering, Tithely",
        text: "Kris Chase | 90-day plan for Tithely",
        url: typeof window !== "undefined" ? window.location.href : 
          "https://krischase.com/tithely-90-day-plan",
      } as ShareData;
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard && typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard");
      }
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-[100dvh] bg-white dark:bg-black relative z-10 pl-4 sm:pl-6 md:pl-8 lg:pl-16">
      {/* Hero */}
      <SectionTransition id="tithely-hero">
        <section className="pt-24 sm:pt-28 md:pt-32 pb-12 md:pb-16">
          <div className="container mx-auto px-6 sm:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl"
            >
              {/* Header Tagline */}
              <div className="flex items-center gap-3 mb-4">
                <div className="border border-[#96442e]/30 py-1.5 px-4 rounded-lg bg-[#96442e]/10">
                  <span className="text-[#96442e] text-xs sm:text-sm font-medium">
                    Building reliable systems, aligned teams, and momentum that lasts at Tithely.
                  </span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-black dark:text-white">
                90-Day Plan | VP of Engineering, Tithely
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-3xl leading-relaxed">
                A focused roadmap to strengthen reliability, delivery speed, and cross-team alignment. Operate as a 
                driving force, ensuring Tithely’s platform continues to scale in support of its mission.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={onShare}
                  className="inline-flex items-center justify-center bg-white text-black hover:bg-black hover:text-white border border-black px-5 py-3 rounded-lg font-semibold transition-colors duration-300 shadow-lg text-sm"
                >
                  Share Plan
                </button>
                <a
                  href="/resume"
                  className="inline-flex items-center justify-center bg-black text-white hover:bg-white hover:text-black border border-black px-5 py-3 rounded-lg font-semibold transition-colors duration-300 shadow-lg text-sm"
                >
                  View Resume
                </a>
                <a
                  href="https://www.linkedin.com/in/krisrchase/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-white text-black hover:bg-black hover:text-white border border-black px-5 py-3 rounded-lg font-semibold transition-colors duration-300 shadow-lg text-sm"
                >
                  View LinkedIn
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </SectionTransition>

      {/* Intro Context */}
      <SectionTransition id="tithely-intro">
        <section className="pb-8 md:pb-10">
          <div className="container mx-auto px-6 sm:px-8">
            <div className="max-w-4xl">
              <div className="rounded-xl border border-gray-200/80 dark:border-gray-800/80 bg-gray-50/40 dark:bg-gray-900/40 backdrop-blur-sm p-6">
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  The first 90 days are about clarity: understanding what’s working, what’s slowing teams down, and where
                  reliability can improve. My focus at Tithely would be to get close to the people, the systems, and the
                  delivery process, then make practical changes that build momentum fast.
                </p>
              </div>
            </div>
          </div>
        </section>
      </SectionTransition>

      {/* The 90-Day Plan */}
      <SectionTransition id="tithely-plan">
        <section className="pb-8 md:pb-10">
          <div className="container mx-auto px-6 sm:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-6">The 90-Day Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Phase 1: Diagnose */}
              <div className="relative rounded-2xl p-2">
                <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
                <div className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm p-6">
                  <h3 className="text-xl font-semibold">Phase 1: Diagnose</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Goal: Understand where the team wins, where it’s slowed down, and what’s getting in the way of consistent delivery.
                  </p>
                  <ul className="mt-3 text-sm text-gray-700 dark:text-gray-300 space-y-2 list-disc pl-5">
                    <li>Review architecture, release practices, and CI/CD flow to see how code moves from commit to production.</li>
                    <li>Benchmark reliability (incident trends, deploy frequency, MTTR) and identify recurring blockers.</li>
                    <li>Map data dependencies across products—particularly within Giving, CHMS, and related APIs, to find pain points and technical debt.</li>
                    <li>Meet with engineering leads, product managers, and support teams to surface what’s working well and what needs immediate attention.</li>
                  </ul>
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                    Output: a concise baseline report summarizing key metrics, critical bottlenecks, and immediate reliability priorities.
                  </p>
                </div>
              </div>

              {/* Phase 2: Design */}
              <div className="relative rounded-2xl p-2">
                <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
                <div className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm p-6">
                  <h3 className="text-xl font-semibold">Phase 2: Design</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Goal: Create clarity around how Tithely builds, ships, and measures success.
                  </p>
                  <ul className="mt-3 text-sm text-gray-700 dark:text-gray-300 space-y-2 list-disc pl-5">
                    <li>Define shared release standards and paved-path workflows that make delivery predictable.</li>
                    <li>Draft a modernization roadmap that balances debt reduction with key 2025 product initiatives.</li>
                    <li>Introduce simple, visible dashboards (DORA, uptime, defect ratios) for a shared view of progress.</li>
                    <li>Establish a lightweight operating cadence suited to the team’s distributed structure.</li>
                  </ul>
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                    Output: a 90-day engineering playbook outlining standards, visibility metrics, and the roadmap for improvement.
                  </p>
                </div>
              </div>

              {/* Phase 3: Deliver */}
              <div className="relative rounded-2xl p-2">
                <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
                <div className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm p-6">
                  <h3 className="text-xl font-semibold">Phase 3: Deliver</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Goal: Build trust quickly through visible, measurable wins.
                  </p>
                  <ul className="mt-3 text-sm text-gray-700 dark:text-gray-300 space-y-2 list-disc pl-5">
                    <li>
                      Launch two first-quarter initiatives:
                      <ul className="list-disc pl-5 mt-2 space-y-2">
                        <li><strong>Reliability Win:</strong> Reduce incident rate and improve deploy frequency through release automation and clearer on-call ownership.</li>
                        <li><strong>Product Win:</strong> Partner with Product to run a small-scale improvement experiment in Giving or CHMS that lifts engagement or conversion.</li>
                      </ul>
                    </li>
                    <li>Introduce developer productivity tools (Copilot, Cursor, etc.) and improve onboarding/documentation speed.</li>
                    <li>Present engineering KPIs to leadership and product teams—showing early improvements in velocity, reliability, and visibility.</li>
                  </ul>
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                    Output: early wins that demonstrate impact, set cultural tone, and create momentum for long-term improvement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionTransition>

      {/* Leadership Approach */}
      <SectionTransition id="tithely-leadership">
        <section className="pb-20">
          <div className="container mx-auto px-6 sm:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white">How I Build and Lead</h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-3xl">
              I lead with clarity and accountability. Teams do their best work when expectations are clear, systems are reliable, and wins are visible. My focus is on creating an environment where engineers feel trusted, delivery feels predictable, and progress compounds week over week.
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Reliability */}
              <div className="relative rounded-2xl p-2">
                <GlowingEffect spread={40} glow proximity={64} inactiveZone={0.01} borderWidth={3} />
                <div className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-black/60 backdrop-blur-sm p-6">
                  <MiniVisibleCanvas>
                    <RotatingTorus position={[0, 0, 0]} />
                    <ambientLight intensity={0.5} />
                  </MiniVisibleCanvas>
                  <h3 className="text-xl font-semibold">Reliability</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Build systems that prevent surprises.</p>
                </div>
              </div>
              {/* Velocity */}
              <div className="relative rounded-2xl p-2">
                <GlowingEffect spread={40} glow proximity={64} inactiveZone={0.01} borderWidth={3} />
                <div className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-black/60 backdrop-blur-sm p-6">
                  <MiniVisibleCanvas>
                    <RotatingBox position={[0, 0, 0]} />
                    <ambientLight intensity={0.5} />
                  </MiniVisibleCanvas>
                  <h3 className="text-xl font-semibold">Velocity</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Ship often, measure results, and iterate.</p>
                </div>
              </div>
              {/* Culture */}
              <div className="relative rounded-2xl p-2">
                <GlowingEffect spread={40} glow proximity={64} inactiveZone={0.01} borderWidth={3} />
                <div className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-black/60 backdrop-blur-sm p-6">
                  <MiniVisibleCanvas>
                    <RotatingSphere position={[0, 0, 0]} />
                    <ambientLight intensity={0.5} />
                  </MiniVisibleCanvas>
                  <h3 className="text-xl font-semibold">Culture</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Create space for ownership, trust, and growth.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionTransition>
    </div>
  );
}
