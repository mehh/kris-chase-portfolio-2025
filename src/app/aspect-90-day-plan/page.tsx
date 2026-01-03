"use client";

import React, { Suspense, useRef } from "react";
import { motion } from "motion/react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { SectionTransition } from "@/components/SmoothScrollProvider";
import { useMachineSlice } from "@/components/machine/MachineViewProvider";
import PageViewEvent from "@/components/PageViewEvent";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { Canvas, useFrame, type RootState } from "@react-three/fiber";
import type * as THREE from "three";
import { useInView } from "framer-motion";
import RotatingEarth from "@/components/ui/wireframe-dotted-globe";
import PlanViewBeacon from "@/components/PlanViewBeacon";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Search, DraftingCompass, Rocket, TrendingUp, Clock, Settings } from "lucide-react";

// Mini 3D icons
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

// Chart components with animations
function AnimatedChart({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px", once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Mock data for charts
const deploymentFrequencyData = [
  { week: "W1", deploys: 2 },
  { week: "W2", deploys: 3 },
  { week: "W3", deploys: 4 },
  { week: "W4", deploys: 5 },
  { week: "W5", deploys: 6 },
  { week: "W6", deploys: 7 },
  { week: "W7", deploys: 8 },
  { week: "W8", deploys: 9 },
  { week: "W9", deploys: 10 },
  { week: "W10", deploys: 11 },
  { week: "W11", deploys: 12 },
  { week: "W12", deploys: 13 },
];

const mttrData = [
  { week: "W1", hours: 8.5 },
  { week: "W2", hours: 7.8 },
  { week: "W3", hours: 7.2 },
  { week: "W4", hours: 6.5 },
  { week: "W5", hours: 6.0 },
  { week: "W6", hours: 5.5 },
  { week: "W7", hours: 5.2 },
  { week: "W8", hours: 4.8 },
  { week: "W9", hours: 4.5 },
  { week: "W10", hours: 4.2 },
  { week: "W11", hours: 4.0 },
  { week: "W12", hours: 3.8 },
];

const throughputData = [
  { sprint: "S1", points: 45 },
  { sprint: "S2", points: 48 },
  { sprint: "S3", points: 52 },
  { sprint: "S4", points: 58 },
  { sprint: "S5", points: 62 },
  { sprint: "S6", points: 65 },
];

const modernizationProgressData = [
  { milestone: "Week 1", slos: 0, cicd: 0 },
  { milestone: "Week 4", slos: 15, cicd: 20 },
  { milestone: "Week 8", slos: 35, cicd: 45 },
  { milestone: "Week 12", slos: 55, cicd: 65 },
];

export default function AspectNinetyDayPlanPage() {
  // Track scroll depth and time on page
  useScrollTracking({ trackScrollDepth: true, trackTimeOnPage: true });
  useMachineSlice(
    {
      type: "page",
      title: "90-Day Plan (Aspect Software)",
      path: "/aspect-90-day-plan",
      order: 70,
      content: [
        "### Summary",
        "A focused roadmap to modernize a hybrid platform (on-prem, hosted, cloud), tighten reliability, and accelerate engineering velocity.",
        "",
        "### Phases",
        "1. Diagnose — Baseline reliability, delivery bottlenecks, hybrid deployment risks, org health.",
        "2. Design — Modernization roadmap, CI/CD standards, SLOs, paved paths, operating playbook.",
        "3. Deliver — Reliability wins, deployment frequency improvements, modernization milestones, sustainable operating model.",
        "",
        "### Leadership",
        "- Scale — Recruit, coach, and level-up managers; build durable hiring pipelines and operating systems.",
        "- Velocity — Ship often with quality through trunk-based development, paved paths, and fast feedback.",
        "- Reliability — SLOs, on-call, and clear runbooks so teams can move quickly without sacrificing stability.",
        "- Clarity — Shared dashboards and simple processes so engineering, product, and go-to-market teams stay aligned.",
      ].join("\n"),
    },
    []
  );

  const onShare = async () => {
    try {
      const shareData = {
        title: "90-Day Plan | VP of Engineering, Aspect Software",
        text: "Kris Chase | 90-day plan for Aspect Software",
        url: typeof window !== "undefined" ? window.location.href : "https://krischase.com/aspect-90-day-plan",
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
    <>
      <PageViewEvent pageName="aspect_90_day_plan" />
      <div className="min-h-[100dvh] bg-white dark:bg-black relative z-10 pl-4 sm:pl-6 md:pl-8 lg:pl-16">
        <PlanViewBeacon />
      <SectionTransition id="aspect-hero">
        <section className="pt-24 sm:pt-28 md:pt-32 pb-12 md:pb-16">
          <div className="container mx-auto px-6 sm:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="border border-[#3b82f6]/30 py-1.5 px-4 rounded-lg bg-[#3b82f6]/10">
                  <span className="text-[#3b82f6] text-xs sm:text-sm font-medium">
                    Scaling engineering teams and reliability at Aspect.
                  </span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-black dark:text-white">
                90-Day Plan | VP of Engineering, Aspect Software
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-3xl leading-relaxed">
                The first 90 days focus on tightening reliability, modernizing a hybrid platform (on-prem, hosted,
                cloud), and giving engineering the operating system to ship faster with less risk. I&apos;ve led this kind of
                modernization at scale and know how to balance velocity with stability.
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

      <SectionTransition id="aspect-intro">
        <section className="pb-8 md:pb-10">
          <div className="container mx-auto px-6 sm:px-8">
            <div className="max-w-4xl">
              <div className="rounded-xl border border-gray-200/80 dark:border-gray-800/80 bg-gray-50/40 dark:bg-gray-900/40 backdrop-blur-sm p-6">
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  My approach starts with people and outcomes. I align leadership on the most important reliability
                  and growth goals, then give teams the structure, metrics, and paved paths to move faster with
                  confidence.
                </p>
              </div>
            </div>
          </div>
        </section>
      </SectionTransition>

      <SectionTransition id="aspect-plan">
        <section className="pb-8 md:pb-10">
          <div className="container mx-auto px-6 sm:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-6">The 90-Day Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative rounded-2xl p-2"
              >
                <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
                <div className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Search className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                    <h3 className="text-xl font-semibold">Phase 1: Diagnose</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Goal: Understand org shape, reliability hotspots, and delivery bottlenecks across on-prem, hosted,
                    and cloud environments.
                  </p>
                  <ul className="mt-3 text-sm text-gray-700 dark:text-gray-300 space-y-2 list-disc pl-5">
                    <li>
                      Meet engineering managers, tech leads, and key ICs; clarify ownership, decision-making, and pain
                      points.
                    </li>
                    <li>
                      Review architecture and CI/CD: how code moves from dev → test → production; release cadence,
                      rollback patterns, and friction.
                    </li>
                    <li>
                      Baseline reliability: DORA metrics, p95 latency, incident history, MTTR, paging load, and current
                      SLOs/SLAs.
                    </li>
                    <li>
                      Assess observability stack: logging, metrics, tracing, and alerting coverage.
                    </li>
                    <li>
                      Map dependencies and risk in hybrid deployments (on-prem, hosted, and cloud).
                    </li>
                  </ul>
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                    Output: Baseline of reliability and delivery, prioritized risk list, and a clear picture of team
                    health and leadership gaps.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative rounded-2xl p-2"
              >
                <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
                <div className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <DraftingCompass className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                    <h3 className="text-xl font-semibold">Phase 2: Design</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Goal: Shape a modernization plan that lifts velocity and reliability without destabilizing the
                    business.
                  </p>
                  <ul className="mt-3 text-sm text-gray-700 dark:text-gray-300 space-y-2 list-disc pl-5">
                    <li>
                      Define or refine trunk-based development, branching strategy, and CI/CD policies (feature flags,
                      canaries, automated rollbacks).
                    </li>
                    <li>
                      Propose on-call rotation, SLOs, and incident review process with clear ownership and feedback
                      loops.
                    </li>
                    <li>
                      Identify and prioritize modernization workstreams: platform hardening, tech debt reduction, and
                      service / data migration steps.
                    </li>
                    <li>
                      Establish &quot;paved paths&quot; for teams: standard repo layout, testing expectations, deployment
                      playbooks, and observability defaults.
                    </li>
                    <li>
                      Align with Product on a shared roadmap that balances feature delivery and platform work.
                    </li>
                  </ul>
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                    Output: 12–18 month modernization roadmap, 90-day operating playbook, and agreed KPIs for
                    reliability and throughput.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative rounded-2xl p-2"
              >
                <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
                <div className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Rocket className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                    <h3 className="text-xl font-semibold">Phase 3: Deliver</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Goal: Demonstrate meaningful improvements in reliability, deployment cadence, and team
                    predictability.
                  </p>
                  <ul className="mt-3 text-sm text-gray-700 dark:text-gray-300 space-y-2 list-disc pl-5">
                    <li>
                      Ship at least one modernization milestone (e.g., improved reliability for a high-traffic service
                      or critical workflow).
                    </li>
                    <li>
                      Increase deployment frequency and reduce change failure rate using new CI/CD + feature flag
                      workflow.
                    </li>
                    <li>
                      Tighten incident flow: faster detection, clear runbooks, and a measurable drop in repeat issues.
                    </li>
                    <li>
                      Introduce AI-powered accelerators where useful (support ticket triage, incident summarization,
                      documentation assists, test generation).
                    </li>
                    <li>
                      Coach managers and leads to own the new operating model so it&apos;s sustainable, not hero-based.
                    </li>
                  </ul>
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                    Output: Two or more visible wins (reliability + speed), modernization roadmap in execution, and a
                    more predictable, trusted engineering org.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </SectionTransition>

      {/* Global Teams Section */}
      <SectionTransition id="aspect-global-teams">
        <section className="pb-8 md:pb-12">
          <div className="container mx-auto px-6 sm:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white">Global Teams I&apos;ve Led</h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-3xl">
              I&apos;ve managed and partnered with teams across the U.S. and Canada, Latin America, Eastern Europe, India,
              and beyond. The focus is consistent standards, strong managers, and clear goals so distributed teams move
              like a single organization.
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

      {/* How I Build and Lead */}
      <SectionTransition id="aspect-leadership">
        <section className="pb-8 md:pb-10">
          <div className="container mx-auto px-6 sm:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white">How I Build and Lead</h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-3xl">
              I&apos;ve grown and modernized teams across stages—from zero-to-one to multi-team orgs. The playbook blends
              clear goals, strong managers, a consistent hiring bar, and paved paths that make shipping the default.
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative rounded-2xl p-2">
                <GlowingEffect spread={40} glow proximity={64} inactiveZone={0.01} borderWidth={3} />
                <div className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-black/60 backdrop-blur-sm p-6">
                  <MiniVisibleCanvas>
                    <RotatingTorus position={[0, 0, 0]} />
                    <ambientLight intensity={0.5} />
                  </MiniVisibleCanvas>
                  <h3 className="text-xl font-semibold">Scale</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Recruit, coach, and level-up managers; build durable hiring pipelines and operating systems.
                  </p>
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
                  <p className="mt-2 text-sm text-muted-foreground">
                    Ship often with quality through trunk-based development, paved paths, and fast feedback.
                  </p>
                </div>
              </div>
              <div className="relative rounded-2xl p-2">
                <GlowingEffect spread={40} glow proximity={64} inactiveZone={0.01} borderWidth={3} />
                <div className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-black/60 backdrop-blur-sm p-6">
                  <MiniVisibleCanvas>
                    <RotatingSphere position={[0, 0, 0]} />
                    <ambientLight intensity={0.5} />
                  </MiniVisibleCanvas>
                  <h3 className="text-xl font-semibold">Reliability</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    SLOs, on-call, and clear runbooks so teams can move quickly without sacrificing stability.
                  </p>
                </div>
              </div>
              <div className="relative rounded-2xl p-2">
                <GlowingEffect spread={40} glow proximity={64} inactiveZone={0.01} borderWidth={3} />
                <div className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-black/60 backdrop-blur-sm p-6">
                  <MiniVisibleCanvas>
                    <RotatingTorus position={[0, 0, 0]} />
                    <ambientLight intensity={0.5} />
                  </MiniVisibleCanvas>
                  <h3 className="text-xl font-semibold">Clarity</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Shared dashboards and simple processes so engineering, product, and go-to-market teams stay aligned.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionTransition>

      {/* Metrics Charts Section */}
      <SectionTransition id="aspect-metrics">
        <section className="pb-8 md:pb-12">
          <div className="container mx-auto px-6 sm:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-6">What Changes in 90 Days</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Deployment Frequency */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.6 }}
                className="relative rounded-2xl p-2"
              >
                <GlowingEffect spread={40} glow proximity={64} inactiveZone={0.01} borderWidth={3} />
                <div className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <h3 className="text-lg font-semibold">Deploys per Week</h3>
                  </div>
                  <div className="text-3xl font-bold text-black dark:text-white mb-2">+3–5x</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Shift from sporadic, high-risk releases to smaller, safer, more frequent deployments.
                  </p>
                  <AnimatedChart>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={deploymentFrequencyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#666" opacity={0.3} />
                        <XAxis dataKey="week" stroke="#999" fontSize={12} tick={{ fill: "#999" }} />
                        <YAxis stroke="#999" fontSize={12} tick={{ fill: "#999" }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(0, 0, 0, 0.9)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "8px",
                            color: "#fff",
                          }}
                          labelStyle={{ color: "#fff" }}
                        />
                        <Line
                          type="monotone"
                          dataKey="deploys"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          dot={{ fill: "#3b82f6", r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </AnimatedChart>
                </div>
              </motion.div>

              {/* MTTR Improvement */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative rounded-2xl p-2"
              >
                <GlowingEffect spread={40} glow proximity={64} inactiveZone={0.01} borderWidth={3} />
                <div className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <h3 className="text-lg font-semibold">Mean Time To Resolution</h3>
                  </div>
                  <div className="text-3xl font-bold text-black dark:text-white mb-2">-50%</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Faster incident resolution through clearer runbooks, better tooling, and improved on-call processes.
                  </p>
                  <AnimatedChart>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={mttrData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#666" opacity={0.3} />
                        <XAxis dataKey="week" stroke="#999" fontSize={12} tick={{ fill: "#999" }} />
                        <YAxis stroke="#999" fontSize={12} tick={{ fill: "#999" }} label={{ value: "Hours", angle: -90, position: "insideLeft" }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(0, 0, 0, 0.9)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "8px",
                            color: "#fff",
                          }}
                          labelStyle={{ color: "#fff" }}
                          formatter={(value: number) => [`${value.toFixed(1)}h`, "MTTR"]}
                        />
                        <Line
                          type="monotone"
                          dataKey="hours"
                          stroke="#10b981"
                          strokeWidth={2}
                          dot={{ fill: "#10b981", r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </AnimatedChart>
                </div>
              </motion.div>

              {/* Story Point Throughput */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative rounded-2xl p-2"
              >
                <GlowingEffect spread={40} glow proximity={64} inactiveZone={0.01} borderWidth={3} />
                <div className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <h3 className="text-lg font-semibold">Throughput per Sprint</h3>
                  </div>
                  <div className="text-3xl font-bold text-black dark:text-white mb-2">+25–40%</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Cleaner intake and clearer priorities mean more value delivered per sprint.
                  </p>
                  <AnimatedChart>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={throughputData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#666" opacity={0.3} />
                        <XAxis dataKey="sprint" stroke="#999" fontSize={12} tick={{ fill: "#999" }} />
                        <YAxis stroke="#999" fontSize={12} tick={{ fill: "#999" }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(0, 0, 0, 0.9)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "8px",
                            color: "#fff",
                          }}
                          labelStyle={{ color: "#fff" }}
                        />
                        <Bar dataKey="points" fill="#10b981" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </AnimatedChart>
                </div>
              </motion.div>

              {/* Platform Modernization Progress */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative rounded-2xl p-2"
              >
                <GlowingEffect spread={40} glow proximity={64} inactiveZone={0.01} borderWidth={3} />
                <div className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <h3 className="text-lg font-semibold">Platform Modernization</h3>
                  </div>
                  <div className="text-lg font-bold text-black dark:text-white mb-2">
                    55% of services with SLOs defined
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Establishing SLOs and modern CI/CD pipelines across hybrid infrastructure (on-prem, hosted, cloud).
                  </p>
                  <AnimatedChart>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={modernizationProgressData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#666" opacity={0.3} />
                        <XAxis dataKey="milestone" stroke="#999" fontSize={12} tick={{ fill: "#999" }} />
                        <YAxis stroke="#999" fontSize={12} tick={{ fill: "#999" }} label={{ value: "% of Services", angle: -90, position: "insideLeft" }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(0, 0, 0, 0.9)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "8px",
                            color: "#fff",
                          }}
                          labelStyle={{ color: "#fff" }}
                        />
                        <Bar dataKey="slos" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Services with SLOs" />
                        <Bar dataKey="cicd" fill="#10b981" radius={[4, 4, 0, 0]} name="Services with Modern CI/CD" />
                      </BarChart>
                    </ResponsiveContainer>
                  </AnimatedChart>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </SectionTransition>

      {/* Final CTA */}
      <SectionTransition id="aspect-cta">
        <section className="pb-20">
          <div className="container mx-auto px-6 sm:px-8">
            <div className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-sm p-8 md:p-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-3xl mx-auto"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
                  Aspect, let&apos;s talk about what&apos;s possible in 90 days.
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                  If this plan resonates with where you&apos;re trying to take the platform and the team, I&apos;d love to walk
                  you through it live and dive into your specific challenges.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center bg-black text-white hover:bg-white hover:text-black border border-black px-8 py-4 rounded-lg font-semibold transition-colors duration-300 shadow-lg text-base"
                >
                  Get in Touch
                </a>
              </motion.div>
            </div>
          </div>
        </section>
      </SectionTransition>
      </div>
    </>
  );
}

