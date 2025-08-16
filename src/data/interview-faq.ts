export type InterviewFAQ = {
  id: string;
  question: string;
  answer: string;
  tags?: string[];
};

// Categories for grouping / navigation
export const FAQ_CATEGORIES = [
  { id: "leadership", label: "Leadership & Operating Style" },
  { id: "strengths", label: "Strengths & Outcomes" },
  { id: "first-90", label: "First 90 Days & Kickoff" },
  { id: "engagement", label: "Engagement & Availability" },
  { id: "talent", label: "Hiring & Talent" },
  { id: "org", label: "Team & Org Design" },
  { id: "process", label: "Process & Delivery (SDLC)" },
  { id: "reliability", label: "Reliability & On-Call" },
  { id: "security", label: "Security & Compliance" },
  { id: "tech", label: "Technical Scope & Stacks" },
  { id: "product", label: "Product & Collaboration" },
  { id: "pricing", label: "Pricing, Fit & Getting Started" },
] as const;

// Focused, consolidated interview Q&A
export const INTERVIEW_FAQ: InterviewFAQ[] = [
  // 1) Leadership & Operating Style
  {
    id: "operating-style",
    question: "How do you operate as a leader?",
    answer:
      "Outcome-driven and product-minded. I clarify goals, align owners, and run short delivery loops. Calm under pressure; direct, data-first communication; write it down; decide and move.",
    tags: [
      "leadership",
      "leadership-style",
      "leadership:communication",
      "leadership:decision-making",
      "leadership:ownership",
      "leadership:servant",
      "leadership:autonomy",
      "category:leadership",
    ],
  },
  {
    id: "handle-conflict",
    question: "How do you handle misalignment or conflict?",
    answer:
      "Surface the decision owner, frame options/tradeoffs with data, capture rationale, and commit. Default to blameless retros and forward motion.",
    tags: ["conflict", "decision-making", "category:leadership"],
  },

  // 2) Strengths & Outcomes
  {
    id: "strengths",
    question: "What are your strengths?",
    answer:
      "Diagnosing reality fast, simplifying scope, hiring well, and installing mechanisms (cadence, metrics, ownership) that raise the baseline and stick.",
    tags: ["strengths", "category:strengths"],
  },
  {
    id: "metrics",
    question: "What metrics do you care about?",
    answer:
      "Revenue/margin, reliability (SLOs/MTTR), and learning velocity. Keep a small set tied to real decisions and review cadences.",
    tags: ["metrics", "kpi", "category:strengths"],
  },
  {
    id: "outcomes-driven",
    question: "Examples of outcomes you’ve driven?",
    answer:
      "Premium feature launches and a-la-carte upsells, pods/on-call rollouts with MTTR down, large SEO-safe migrations, QA automation that sped releases, and scaling SaaS to thousands of concurrent users.",
    tags: ["results", "case-studies", "category:strengths"],
  },

  // 3) First 90 Days & Kickoff
  {
    id: "first-90-days",
    question: "What do your first 90 days look like?",
    answer:
      "Diagnose (people/product/reliability/$$), align on outcomes, design a minimal plan with owners/checkpoints, then deliver in short loops with visible metrics.",
    tags: ["onboarding", "strategy", "category:first-90"],
  },
  {
    id: "kickoff-sequence",
    question: "How do you kick off with a new company?",
    answer:
      "Week 1: discovery + architecture/org audit. Week 2: priority roadmap + 90-day plan. Week 3: cadence, dashboards, staffing adjustments.",
    tags: ["kickoff", "onboarding", "category:first-90"],
  },

  // 4) Engagement & Availability
  {
    id: "availability-now",
    question: "Are you available right now?",
    answer: "Yes—open as of Aug 15, 2025 for full-time, fractional, project, or advisory.",
    tags: ["availability", "category:engagement"],
  },
  {
    id: "engagement-models",
    question: "What engagement models do you offer?",
    answer: "Full-time leadership, Fractional CTO (1–3 days/week), project-based delivery, and exec/manager coaching.",
    tags: ["engagement", "fractional", "category:engagement"],
  },
  {
    id: "start-speed-travel",
    question: "How quickly can you start, and can you travel?",
    answer: "Advisory can start immediately; larger programs typically 1–2 weeks. Yes—periodic onsite for kickoffs/planning.",
    tags: ["availability", "travel", "category:engagement"],
  },

  // 5) Hiring & Talent
  {
    id: "hiring-bar",
    question: "What’s your bar for hiring?",
    answer:
      "Top-notch or keep looking. Structured loops, work samples, and trial projects when useful. Hire for ownership, collaboration, and bias to ship.",
    tags: ["hiring", "talent", "category:talent"],
  },
  {
    id: "coaching",
    question: "How do you coach engineers and managers?",
    answer:
      "Clear growth plans tied to business outcomes, recurring feedback, visible wins, and opportunities to practice leadership.",
    tags: ["coaching", "management", "category:talent"],
  },

  // 6) Team & Org Design
  {
    id: "team-scaling-structures",
    question: "How do you scale teams and what structures do you use?",
    answer:
      "Cross-functional pods with functional guilds, crisp RACI, and KPIs/SLAs. Mechanisms > heroics; raise the baseline via cadence and clarity.",
    tags: ["teams", "org-design", "category:org"],
  },
  {
    id: "largest-org",
    question: "Largest org you’ve led?",
    answer: "50+ engineers (peaked ~65) across web, mobile, and QA; global and remote-first.",
    tags: ["org-size", "category:org"],
  },

  // 7) Process & Delivery (SDLC)
  {
    id: "sdlc",
    question: "What SDLC do you prefer?",
    answer:
      "Dual-track Agile: discovery → POC/MVP → hardening. Trunk-based or short-lived branches, CI/CD, feature flags, progressive rollout. Reserve capacity for tech debt.",
    tags: ["process", "agile", "release", "tech-debt", "category:process"],
  },
  {
    id: "predictable-delivery",
    question: "How do you drive predictable delivery?",
    answer:
      "Quarterly objectives, fortnightly demos, visible risk registers, burn-up charts, and explicit tradeoffs on scope/time/quality.",
    tags: ["delivery", "planning", "category:process"],
  },

  // 8) Reliability & On-Call
  {
    id: "reliability-operating",
    question: "How do you ensure reliability and on-call readiness?",
    answer:
      "Service ownership, SLOs, clean alerts, on-call rotations, runbooks, and regular chaos/readiness reviews, plus capacity planning and load testing for high concurrency.",
    tags: ["reliability", "on-call", "observability", "category:reliability"],
  },
  {
    id: "handling-failure",
    question: "How do you turn incidents into improvements?",
    answer:
      "Blameless postmortems, systemic root causes, and small, testable changes tracked to closure.",
    tags: ["incidents", "learning", "category:reliability"],
  },

  // 9) Security & Compliance
  {
    id: "security-stance",
    question: "Security stance?",
    answer:
      "Principle of least privilege, secrets hygiene, dependency audits, RBAC, and auditable change flows.",
    tags: ["security", "rbac", "category:security"],
  },
  {
    id: "compliance-support",
    question: "Compliance support (SOC 2, etc.)?",
    answer:
      "Map controls to practices, close gaps pragmatically, and ship team-friendly SOPs and evidence trails.",
    tags: ["compliance", "soc2", "category:security"],
  },

  // 10) Technical Scope & Stacks
  {
    id: "core-stacks",
    question: "What stacks do you and your teams support?",
    answer:
      "Frontend: React/Next.js, Vue. Backend: Node/TypeScript (Nest/Express), PHP/Laravel. Mobile: React Native primarily; Swift/Kotlin as needed. Data: Postgres/MySQL/Redis.",
    tags: ["frontend", "backend", "mobile", "data", "category:tech"],
  },
  {
    id: "platforms-tooling",
    question: "Platforms, infra, and tooling?",
    answer:
      "AWS/GCP/Vercel/Supabase; CDN/object storage; CI/CD; Sentry/New Relic; PagerDuty; Playwright/TestRail. Cost control baked into designs.",
    tags: ["cloud", "observability", "testing", "tooling", "category:tech"],
  },
  {
    id: "ai-ml",
    question: "AI/LLM experience?",
    answer:
      "LLM-assisted dev, prompt/retrieval design, pilot→production guardrails, and data ingestion via Airbyte/Funnel-style pipelines.",
    tags: ["ai", "llm", "data", "category:tech"],
  },
  {
    id: "geo-footprint",
    question: "Geographic footprint?",
    answer: "North America primary; comfortable with distributed global teams.",
    tags: ["geography"],
  },
  {
    id: "working-hours",
    question: "Working hours?",
    answer: "Central Time core hours with flexible EU/AMER overlap; async‑friendly.",
    tags: ["hours"],
  },
  {
    id: "exec-expectations",
    question: "What do you expect from partners/executives?",
    answer: "Clarity on goals, empowered decision owners, and openness to iterate.",
    tags: ["expectations"],
  },
  // Getting started
  {
    id: "start-conversation",
    question: "How do we start a conversation?",
    answer:
      "Share goals and constraints → quick intro call → proposal with scope, timeline, and pricing.",
    tags: ["getting-started"],
  },
  {
    id: "success-90-days",
    question: "What does success look like in the first 90 days?",
    answer:
      "Clear roadmap, visible velocity uptick, improved reliability/observability, and a team that knows who owns what.",
    tags: ["success", "90-days"],
  },
];
