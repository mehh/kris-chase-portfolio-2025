"use client";

import React, { Suspense, useRef } from "react";
import { motion } from "motion/react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { SectionTransition } from "@/components/SmoothScrollProvider";
import { useMachineSlice } from "@/components/machine/MachineViewProvider";
import { Canvas, useFrame, type RootState } from "@react-three/fiber";
import type * as THREE from "three";
import { useInView } from "framer-motion";
import RotatingEarth from "@/components/ui/wireframe-dotted-globe";

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
  const isInView = useInView(ref, { margin: "-10% 0px -10% 0px", amount: 0.2 });
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

export default function HandoffNinetyDayPlanPage() {
  useMachineSlice(
    {
      type: "page",
      title: "90-Day Plan (Handoff)",
      path: "/handoff-90-day-plan",
      order: 70,
      content: [
        "### Summary",
        "A practical roadmap to scale the engineering org while improving delivery speed and reliability.",
        "",
        "### Phases",
        "1. Diagnose — Baseline health, org and hiring bottlenecks, on-call/reliability review, stakeholder interviews.",
        "2. Design — Org shape and hiring plan, paved-path workflows, visibility dashboards, operating cadence.",
        "3. Deliver — Reliability win, recruiting engine running, developer productivity gains, KPI reporting.",
        "",
        "### Leadership",
        "- Scale — Recruit, coach, and level-up managers; build an enduring hiring bar and onboarding loop.",
        "- Velocity — Ship often, measure, and iterate.",
        "- Culture — Ownership, trust, and growth.",
      ].join("\n"),
    },
    []
  );

  const onShare = async () => {
    try {
      const shareData = {
        title: "90-Day Plan | Head of Engineering, Handoff",
        text: "Kris Chase | 90-day plan for Handoff",
        url: typeof window !== "undefined" ? window.location.href : "https://krischase.com/handoff-90-day-plan",
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
      <SectionTransition id="handoff-hero">
        <section className="pt-24 sm:pt-28 md:pt-32 pb-12 md:pb-16">
          <div className="container mx-auto px-6 sm:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="border border-[#15803d]/30 py-1.5 px-4 rounded-lg bg-[#15803d]/10">
                  <span className="text-[#15803d] text-xs sm:text-sm font-medium">
                    Scaling engineering teams and shipping reliably at Handoff.
                  </span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-black dark:text-white">
                90-Day Plan | Head of Engineering, Handoff
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-3xl leading-relaxed">
                The first 90 days focus on building the engine that scales: org design, a repeatable hiring pipeline,
                paved-path delivery, and reliability practices that create trust. I’ve led this transition at multiple
                companies and know how to balance speed with stability.
              </p>

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

      <SectionTransition id="handoff-intro">
        <section className="pb-8 md:pb-10">
          <div className="container mx-auto px-6 sm:px-8">
            <div className="max-w-4xl">
              <div className="rounded-xl border border-gray-200/80 dark:border-gray-800/80 bg-gray-50/40 dark:bg-gray-900/40 backdrop-blur-sm p-6">
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  My approach starts with people and outcomes. I partner with founders and product to clarify the few
                  things that matter most, then align teams, hiring, and delivery mechanics around those goals.
                </p>
              </div>
            </div>
          </div>
        </section>
      </SectionTransition>

      <SectionTransition id="handoff-plan">
        <section className="pb-8 md:pb-10">
          <div className="container mx-auto px-6 sm:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-6">The 90-Day Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative rounded-2xl p-2">
                <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
                <div className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm p-6">
                  <h3 className="text-xl font-semibold">Phase 1: Diagnose</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Goal: Understand org shape, delivery bottlenecks, and reliability risks.</p>
                  <ul className="mt-3 text-sm text-gray-700 dark:text-gray-300 space-y-2 list-disc pl-5">
                    <li>Assess org topology, ownership boundaries, manager spans; map what needs to scale first.</li>
                    <li>Review architecture and CI/CD to see how code moves from commit to production.</li>
                    <li>Baseline DORA, incident trends, deploy frequency, MTTR; identify recurring toil.</li>
                    <li>Interview engineers, managers, product, and support to surface friction and bright spots.</li>
                  </ul>
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">Output: baseline with org & delivery risks plus near-term priorities.</p>
                </div>
              </div>

              <div className="relative rounded-2xl p-2">
                <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
                <div className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm p-6">
                  <h3 className="text-xl font-semibold">Phase 2: Design</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Goal: Plan to scale hiring and throughput while keeping quality high.</p>
                  <ul className="mt-3 text-sm text-gray-700 dark:text-gray-300 space-y-2 list-disc pl-5">
                    <li>Draft org shape (12–18 months) with clear swimlanes and leadership expectations.</li>
                    <li>Stand up a recruiting pipeline: calibrated rubrics, structured interviews, hiring bar, training.</li>
                    <li>Define paved-path delivery (branching, CI gates, release cadence, ownership).</li>
                    <li>Introduce visible dashboards and a lightweight operating cadence.</li>
                  </ul>
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">Output: 90-day operating playbook, hiring plan and budget.</p>
                </div>
              </div>

              <div className="relative rounded-2xl p-2">
                <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
                <div className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm p-6">
                  <h3 className="text-xl font-semibold">Phase 3: Deliver</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Goal: Prove traction with visible wins in reliability, hiring, and productivity.</p>
                  <ul className="mt-3 text-sm text-gray-700 dark:text-gray-300 space-y-2 list-disc pl-5">
                    <li>
                      Launch two first-quarter initiatives:
                      <ul className="list-disc pl-5 mt-2 space-y-2">
                        <li><strong>Reliability Win:</strong> Reduce incidents/MTTR with clearer on-call, runbooks, and automation.</li>
                        <li><strong>Scaling Win:</strong> Hire and onboard the first wave with a consistent rubric; cut time-to-productive by ~30%.</li>
                      </ul>
                    </li>
                    <li>Introduce developer productivity tools (Copilot, Cursor, template repos) and improve docs/onboarding.</li>
                    <li>Publish weekly KPIs—showing early improvements in velocity, reliability, and hiring funnel.</li>
                  </ul>
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">Output: early wins that build trust and momentum while the org scales.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionTransition>

      {/* Global Teams Section */}
      <SectionTransition id="handoff-global-teams">
        <section className="pb-8 md:pb-12">
          <div className="container mx-auto px-6 sm:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white">Global Teams I’ve Led</h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-3xl">
              Managed and partnered with teams across the U.S. and Canada, London, India, Eastern Europe, Armenia,
              and South America — including Mexico and Brazil. The focus is consistent standards, strong managers,
              and clear goals so distributed teams move fast together.
            </p>
            <div className="mt-6">
              <RotatingEarth
                markerSize={5}
                markers={[
                  // US & Canada
                  { lat: 37.7749, lng: -122.4194, label: "US — SF Bay Area" },
                  { lat: 34.0522, lng: -118.2437, label: "US — Los Angeles" },
                  { lat: 47.6062, lng: -122.3321, label: "US — Seattle" },
                  { lat: 40.7128, lng: -74.006, label: "US — New York" },
                  { lat: 41.8781, lng: -87.6298, label: "US — Chicago" },
                  { lat: 30.2672, lng: -97.7431, label: "US — Austin" },
                  { lat: 39.7392, lng: -104.9903, label: "US — Denver" },
                  { lat: 33.749, lng: -84.388, label: "US — Atlanta" },
                  { lat: 42.3601, lng: -71.0589, label: "US — Boston" },
                  { lat: 43.6532, lng: -79.3832, label: "Canada — Toronto" },
                  { lat: 45.5019, lng: -73.5674, label: "Canada — Montreal" },
                  { lat: 49.2827, lng: -123.1207, label: "Canada — Vancouver" },
                  { lat: 51.0447, lng: -114.0719, label: "Canada — Calgary" },
                  // UK
                  { lat: 51.5074, lng: -0.1278, label: "UK — London" },
                  // India
                  { lat: 23.0225, lng: 72.5714, label: "India — Ahmedabad" },
                  { lat: 12.9716, lng: 77.5946, label: "India — Bengaluru" },
                  { lat: 18.5204, lng: 73.8567, label: "India — Pune" },
                  { lat: 17.385, lng: 78.4867, label: "India — Hyderabad" },
                  { lat: 28.6139, lng: 77.209, label: "India — Delhi NCR" },
                  // Eastern Europe / Armenia
                  { lat: 52.2297, lng: 21.0122, label: "Eastern Europe — Warsaw" },
                  { lat: 40.1792, lng: 44.4991, label: "Armenia — Yerevan" },
                  // Mexico & South America
                  { lat: 19.4326, lng: -99.1332, label: "Mexico — Mexico City" },
                  { lat: -23.5505, lng: -46.6333, label: "Brazil — São Paulo" },
                  { lat: -22.9068, lng: -43.1729, label: "Brazil — Rio de Janeiro" },
                  { lat: 4.711, lng: -74.0721, label: "Colombia — Bogotá" },
                  { lat: -12.0464, lng: -77.0428, label: "Peru — Lima" },
                  { lat: -33.4489, lng: -70.6693, label: "Chile — Santiago" },
                  { lat: -34.6037, lng: -58.3816, label: "Argentina — Buenos Aires" },
                  { lat: -34.9011, lng: -56.1645, label: "Uruguay — Montevideo" },
                ]}
              />
            </div>
          </div>
        </section>
      </SectionTransition>

      <SectionTransition id="handoff-leadership">
        <section className="pb-20">
          <div className="container mx-auto px-6 sm:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white">How I Build and Lead</h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-3xl">
              I’ve grown and modernized teams across stages—from zero-to-one to multi-team orgs. The playbook blends
              clear goals, strong managers, a consistent hiring bar, and paved paths that make shipping the default.
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative rounded-2xl p-2">
                <GlowingEffect spread={40} glow proximity={64} inactiveZone={0.01} borderWidth={3} />
                <div className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-black/60 backdrop-blur-sm p-6">
                  <MiniVisibleCanvas>
                    <RotatingTorus position={[0, 0, 0]} />
                    <ambientLight intensity={0.5} />
                  </MiniVisibleCanvas>
                  <h3 className="text-xl font-semibold">Scale</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Recruit, coach, and level-up management; build durable hiring systems.</p>
                </div>
              </div>
              <div className="relative rounded-2xl p-2">
                <GlowingEffect spread={40} glow proximity={64} inactiveZone={0.01} borderWidth={3} />
                <div className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-black/60 backdrop-blur-sm p-6">
                  <MiniVisibleCanvas>
                    <RotatingBox position={[0, 0, 0]} />
                    <ambientLight intensity={0.5} />
                  </MiniVisibleCanvas>
                  <h3 className="text-xl font-semibold">Velocity</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Ship often with quality through paved paths and fast feedback.</p>
                </div>
              </div>
              <div className="relative rounded-2xl p-2">
                <GlowingEffect spread={40} glow proximity={64} inactiveZone={0.01} borderWidth={3} />
                <div className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-black/60 backdrop-blur-sm p-6">
                  <MiniVisibleCanvas>
                    <RotatingSphere position={[0, 0, 0]} />
                    <ambientLight intensity={0.5} />
                  </MiniVisibleCanvas>
                  <h3 className="text-xl font-semibold">Culture</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Ownership, trust, and growth with clear expectations.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionTransition>
    </div>
  );
}
