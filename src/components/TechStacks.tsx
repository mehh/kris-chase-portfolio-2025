"use client";

import React from "react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { useMachineSlice } from "@/components/machine/MachineViewProvider";

// React Icons (Simple Icons)
import {
  SiJavascript,
  SiTypescript,
  SiPhp,
  SiRubyonrails,
  SiRuby,
  SiPython,
  SiReact,
  SiCapacitor,
  SiNodedotjs,
  SiNestjs,
  SiVuedotjs,
  SiNextdotjs,
  SiTailwindcss,
  SiDaisyui,
  SiStorybook,
  SiExpo,
  SiThreedotjs,
  SiMysql,
  SiPostgresql,
  SiAmazondynamodb,
  SiGooglecloud,
  SiAmazon,
  SiDotnet,
  SiSwift,
  SiKotlin,
  SiFlutter,
  SiGithubcopilot,
  SiReplit,
  SiHuggingface,
  SiOracle,
  SiUbuntu,
  SiGentoo,
  SiVercel,
} from "react-icons/si";

// Fallback icons from lucide-react
import {
  Brain,
  Bot,
  Code2,
  MousePointer as CursorIcon,
  Heart,
  Sparkles,
  Wind,
  Zap,
  TerminalSquare,
  Cloud,
  Database,
  Server,
  Link2,
} from "lucide-react";

// Generic icon type (both react-icons and lucide-react are compatible with size/className)
type IconRenderer = React.ComponentType<{ size?: number; className?: string }>;

type StackItem = {
  name: string;
  Icon: IconRenderer;
  color?: string; // optional brand color for ring/hover
};

type StackCategory = {
  title: string;
  note?: string;
  items: StackItem[];
  columns?: string; // override grid columns
};

const HANDS_ON: StackCategory = {
  title: "Hands‑on engineering",
  note: "Daily driver stacks over 20+ years",
  items: [
    { name: "JavaScript", Icon: SiJavascript, color: "#f7df1e" },
    { name: "TypeScript", Icon: SiTypescript, color: "#3178c6" },
    { name: "PHP", Icon: SiPhp, color: "#777bb4" },
    { name: "Ruby on Rails", Icon: SiRubyonrails, color: "#cc0000" },
    { name: "Ruby", Icon: SiRuby, color: "#cc342d" },
    { name: "Python", Icon: SiPython, color: "#3776ab" },
    { name: "React Native", Icon: SiReact, color: "#61dafb" },
    { name: "Capacitor", Icon: SiCapacitor, color: "#119eff" },
    { name: "Node.js", Icon: SiNodedotjs, color: "#5fa04e" },
    { name: "NestJS", Icon: SiNestjs, color: "#e0234e" },
    { name: "Vue.js", Icon: SiVuedotjs, color: "#41b883" },
    { name: "Next.js", Icon: SiNextdotjs, color: "#000000" },
    { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06b6d4" },
    { name: "daisyUI", Icon: SiDaisyui, color: "#ec4899" },
    { name: "Storybook", Icon: SiStorybook, color: "#ff4785" },
    { name: "Expo", Icon: SiExpo, color: "#000000" },
    { name: "Three.js", Icon: SiThreedotjs, color: "#000000" },
    { name: "Anime.js", Icon: Sparkles, color: "#a855f7" },
    { name: "MySQL", Icon: SiMysql, color: "#4479a1" },
    { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169e1" },
    { name: "DynamoDB", Icon: SiAmazondynamodb, color: "#4053d6" },
  ],
};

const CLOUD: StackCategory = {
  title: "Cloud",
  items: [
    { name: "Google Cloud", Icon: SiGooglecloud, color: "#4285f4" },
    { name: "AWS", Icon: SiAmazon, color: "#ff9900" },
    { name: "Azure", Icon: Cloud, color: "#0089d6" },
  ],
  columns: "grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3",
};

const LED_TEAMS: StackCategory = {
  title: "Led teams (in addition to the above)",
  items: [
    { name: ".NET", Icon: SiDotnet, color: "#512bd4" },
    { name: "Visual Basic", Icon: Code2, color: "#5c2d91" },
    { name: "Swift", Icon: SiSwift, color: "#fa7343" },
    { name: "Kotlin", Icon: SiKotlin, color: "#7f52ff" },
    { name: "Flutter", Icon: SiFlutter, color: "#02569b" },
  ],
};

const AI_TOOLS: StackCategory = {
  title: "AI tools & platforms",
  items: [
    { name: "Lovable", Icon: Heart, color: "#ef4444" },
    { name: "Bolt", Icon: Zap, color: "#f59e0b" },
    { name: "v0 (Vercel)", Icon: SiVercel, color: "#000000" },
    { name: "Cursor", Icon: CursorIcon, color: "#64748b" },
    { name: "Windsurf", Icon: Wind, color: "#22c55e" },
    { name: "GitHub Copilot", Icon: SiGithubcopilot, color: "#03a9f4" },
    { name: "ElevenLabs", Icon: Brain, color: "#f97316" },
    { name: "HeyGen", Icon: Bot, color: "#a855f7" },
    { name: "Replit", Icon: SiReplit, color: "#f26207" },
    { name: "Pinecone", Icon: Database, color: "#3ecf8e" },
    { name: "LangChain", Icon: Link2, color: "#2c3e50" },
    { name: "LlamaHub", Icon: Code2, color: "#64748b" },
    { name: "Hugging Face", Icon: SiHuggingface, color: "#ffcc4d" },
  ],
};

const LINUX_UNIX: StackCategory = {
  title: "Linux/Unix server mgmt",
  items: [
    { name: "AIX", Icon: Server, color: "#0062ff" },
    { name: "HP‑UX", Icon: TerminalSquare, color: "#64748b" },
    { name: "Solaris", Icon: SiOracle, color: "#f80000" },
    { name: "Ubuntu", Icon: SiUbuntu, color: "#e95420" },
    { name: "Gentoo", Icon: SiGentoo, color: "#54487a" },
  ],
};

const CATEGORIES: StackCategory[] = [HANDS_ON, CLOUD, LED_TEAMS, AI_TOOLS, LINUX_UNIX];

function Tile({ item }: { item: StackItem }) {
  const { Icon, name, color } = item;
  return (
    <div
      className="group relative flex flex-col items-center justify-center gap-2 rounded-xl border border-border/30 bg-background/40 p-3 sm:p-4 text-center transition-all duration-200 hover:border-foreground/40 hover:shadow-[0_0_30px_rgba(150,68,46,0.25)]"
    >
      <div
        className="flex h-12 w-12 items-center justify-center rounded-lg border border-border/30 bg-background/60 transition-colors"
        style={{ boxShadow: color ? `0 0 20px ${color}22` : undefined }}
      >
        <span aria-hidden="true">
          <Icon size={24} className="opacity-90" />
        </span>
      </div>
      <div className="text-xs sm:text-sm opacity-90">{name}</div>
      {/* subtle accent ring on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl ring-0 transition-all duration-200 group-hover:ring-2"
        style={{ boxShadow: color ? `inset 0 0 0 1px ${color}55` : undefined }}
      />
    </div>
  );
}

export default function TechStacks() {
  // Register Machine View slice
  useMachineSlice(
    {
      type: "section",
      title: "Stacks & Tools",
      path: "/",
      order: 45,
      content: [
        "### Categories",
        ...CATEGORIES.map((c) => `- ${c.title}: ${c.items.map((i) => i.name).join(", ")}`),
      ].join("\n"),
    },
    []
  );

  return (
    <section className="py-12 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:pl-8 md:pl-12">
        <div className="relative rounded-2xl p-2">
          <GlowingEffect spread={36} glow proximity={64} inactiveZone={0.01} borderWidth={3} />
          <div className="relative rounded-2xl border border-border/30 bg-background/50 p-6 sm:p-8">
            <header className="mb-8 sm:mb-10">
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-foreground">
                Stacks & Tools
              </h2>
              <p className="mt-2 text-sm sm:text-base text-foreground/70 max-w-3xl">
                20+ years hands-on engineering plus leadership across a wide range of stacks.
                Here are the technologies I&#39;ve built with and guided teams to deliver.
              </p>
            </header>

            <div className="space-y-10">
              {CATEGORIES.map((cat) => (
                <section key={cat.title}>
                  <div className="mb-3">
                    <h3 className="text-sm sm:text-base font-semibold text-foreground">
                      {cat.title}
                    </h3>
                    {cat.note && (
                      <p className="text-xs sm:text-sm text-foreground/60">{cat.note}</p>
                    )}
                  </div>
                  <div
                    className={
                      "grid gap-3 sm:gap-4 " +
                      (cat.columns || "grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10")
                    }
                  >
                    {cat.items.map((item) => (
                      <Tile key={item.name} item={item} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
