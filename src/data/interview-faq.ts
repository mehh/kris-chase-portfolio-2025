export type InterviewFAQ = {
  id: string;
  question: string;
  answer: string;
  tags?: string[];
};

// Seed a focused set of interview-style Q&A.
// You can expand this list freely; it is automatically merged into RAG.
export const INTERVIEW_FAQ: InterviewFAQ[] = [
  {
    id: "operating-style",
    question: "How do you operate as a leader?",
    answer:
      "I help leaders ship outcomes by clarifying strategy, building the right product, scaling teams, and reducing execution risk. I bias toward clear communication, pragmatic systems thinking, and measurable results across Diagnose → Design → Deliver.",
    tags: ["leadership", "process", "delivery"],
  },
  {
    id: "first-90-days",
    question: "What do your first 90 days look like?",
    answer:
      "Diagnose the truth quickly (people, product, revenue, reliability). Align on outcomes and constraints. Design a minimal yet sufficient plan with crisp ownership and checkpoints. Deliver in short loops with transparent metrics and retros.",
    tags: ["onboarding", "strategy"],
  },
  {
    id: "team-scaling",
    question: "How do you scale teams effectively?",
    answer:
      "Raise the hiring bar, clarify roles, and build coaching and feedback loops. Establish mechanisms so good decisions become the default. Use evidence and learning velocity to guide iteration.",
    tags: ["talent", "org-design", "coaching"],
  },
  {
    id: "handling-failure",
    question: "How do you handle failures or incidents?",
    answer:
      "Turn incidents into insights. Run blameless postmortems, identify systemic causes, and create small, testable changes. Couple reliability improvements with customer/value priorities.",
    tags: ["reliability", "incidents", "learning"],
  },
  {
    id: "metrics",
    question: "What metrics do you care about?",
    answer:
      "Revenue, margin, reliability (SLOs), and learning velocity. I prefer a small set of leading indicators tied to clear decisions and review cadences.",
    tags: ["metrics", "kpi"],
  },
  // Leadership & philosophy
  {
    id: "leadership-style",
    question: "What’s your leadership style?",
    answer:
      "Servant leadership with high ownership. Set clear goals, give autonomy, and hold accountable. Product‑minded: ship value fast via POC/MVP, iterate, and measure.",
    tags: ["leadership", "ownership", "product"],
  },
  {
    id: "high-performing-teams",
    question: "How do you build high-performing teams?",
    answer:
      "Cross‑functional pods with functional guilds, crisp RACI, and clear KPIs/SLAs. Tight feedback loops: weekly 1:1s, demos, retros, and transparent roadmaps.",
    tags: ["teams", "org-design", "process"],
  },
  {
    id: "hiring-bar",
    question: "What’s your bar for hiring?",
    answer:
      "Top‑notch or keep looking. Assess competency, collaboration, and bias to ship with structured interviews, work samples, and trial projects when useful.",
    tags: ["hiring", "talent"],
  },
  {
    id: "handle-conflict",
    question: "How do you handle conflict or misalignment?",
    answer:
      "Use data, clarity, and options. Define the decision owner and document rationale and tradeoffs so the team can align and move.",
    tags: ["conflict", "decision-making"],
  },
  {
    id: "coaching",
    question: "How do you coach engineers and managers?",
    answer:
      "Growth plans tied to business outcomes, concrete recurring feedback, and visible wins. Create opportunities to practice and celebrate progress.",
    tags: ["coaching", "management"],
  },
  {
    id: "velocity-vs-quality",
    question: "How do you balance velocity vs. quality?",
    answer:
      "Ship MVPs behind flags, use risk‑ranked testing, invest in quality where it pays off. For infra, ‘slow is smooth, smooth is fast’.",
    tags: ["quality", "velocity", "release"],
  },
  {
    id: "org-principles",
    question: "What principles guide your org design?",
    answer:
      "Small empowered teams, clear ownership boundaries, and lightweight coordination mechanisms.",
    tags: ["org-design"],
  },
  // Availability & engagement
  {
    id: "availability-now",
    question: "Are you available right now?",
    answer: "Yes—open as of Aug 14, 2025 for full‑time, fractional, contract, or advisory.",
    tags: ["availability"],
  },
  {
    id: "engagement-models",
    question: "What engagement models do you offer?",
    answer: "Full‑time, Fractional CTO, project‑based delivery, and advisory/coaching.",
    tags: ["engagement"],
  },
  {
    id: "fractional-shape",
    question: "What does a typical fractional engagement look like?",
    answer: "1–3 days/week owning roadmap and execution with standups, leadership syncs, and OKRs.",
    tags: ["fractional", "cto"],
  },
  {
    id: "rate-pricing",
    question: "What’s your rate/price model?",
    answer:
      "Flexible: hourly, daily, or fixed‑bid milestones. Typical consulting starts around $150/hr; larger programs use milestone‑based pricing.",
    tags: ["pricing"],
  },
  {
    id: "travel-onsite",
    question: "Can you travel onsite?",
    answer: "Yes—periodic on‑sites for kickoffs, planning, and workshops.",
    tags: ["travel"],
  },
  {
    id: "start-speed",
    question: "How quickly can you start?",
    answer: "Immediately for advisory; 1–2 weeks for larger programs to align scope and team.",
    tags: ["availability", "start"],
  },
  // Technical expertise
  {
    id: "frontend-stacks",
    question: "What frontend stacks do you lead/hands-on with?",
    answer:
      "React/Next.js, React Native, Vue; design systems, SSR/ISR, SEO, and performance.",
    tags: ["frontend", "react", "nextjs"],
  },
  {
    id: "backend-stacks",
    question: "What backend stacks?",
    answer:
      "Node.js/TypeScript (Nest/Express), PHP/Laravel; REST/GraphQL APIs; auth/SSO.",
    tags: ["backend", "node", "typescript", "laravel"],
  },
  {
    id: "mobile-experience",
    question: "Mobile experience?",
    answer: "React Native apps at scale with OTA updates and native modules where needed.",
    tags: ["mobile", "react-native"],
  },
  {
    id: "data-stores",
    question: "Data stores and messaging?",
    answer: "PostgreSQL, MySQL, Redis; pragmatic queues/workers; analytics event pipelines.",
    tags: ["data", "databases", "messaging"],
  },
  {
    id: "cloud-hosting",
    question: "Cloud & hosting?",
    answer: "AWS, GCP, Vercel, Supabase; CDN, object storage, and cost control.",
    tags: ["cloud", "vercel", "supabase"],
  },
  {
    id: "observability",
    question: "Observability & reliability?",
    answer: "Sentry, New Relic, PagerDuty; SLOs, on‑call rotations, and incident playbooks.",
    tags: ["observability", "reliability"],
  },
  {
    id: "testing-qa",
    question: "Testing/QA approach?",
    answer: "Playwright e2e, component/unit tests, TestRail, CI gates, risk‑based regression.",
    tags: ["testing", "qa", "playwright"],
  },
  {
    id: "security-compliance",
    question: "Security & compliance?",
    answer:
      "SOC 2 readiness, SSO (SAML/OIDC), RBAC, audit trails, secrets hygiene, and least privilege.",
    tags: ["security", "compliance"],
  },
  {
    id: "video-media",
    question: "Video/media expertise?",
    answer:
      "Cloudinary pipelines and transformations with analytics; focus on performance and bandwidth tuning.",
    tags: ["video", "cloudinary"],
  },
  {
    id: "ai-ml",
    question: "AI/ML experience?",
    answer:
      "LLM‑assisted development, prompt and retrieval design, model pilots, and ‘AI‑in‑the‑loop’ workflows; data ingestion with tools like Airbyte/Funnel.io.",
    tags: ["ai", "ml", "llm"],
  },
  // Process & delivery
  {
    id: "sdlc",
    question: "What SDLC do you prefer?",
    answer:
      "Agile dual‑track: discovery → POC/MVP → hardening; daily/weekly cadences; trunk‑based or short‑lived branches with CI/CD.",
    tags: ["process", "agile"],
  },
  {
    id: "predictable-delivery",
    question: "How do you drive predictable delivery?",
    answer: "Clear quarterly objectives, fortnightly demos, visible risk registers, and burnup charts.",
    tags: ["delivery", "planning"],
  },
  {
    id: "manage-tech-debt",
    question: "How do you manage tech debt?",
    answer: "Track with labels, allocate recurring capacity, and score by business impact.",
    tags: ["tech-debt"],
  },
  {
    id: "handle-releases",
    question: "How do you handle releases?",
    answer:
      "Feature flags, progressive rollouts, canaries; weekend releases only when necessary.",
    tags: ["release", "flags"],
  },
  {
    id: "documentation",
    question: "What’s your approach to documentation?",
    answer: "Lightweight ADRs, living runbooks, onboarding guides, and architectural diagrams.",
    tags: ["docs"],
  },
  {
    id: "tooling-standardized",
    question: "Tooling you’ve standardized?",
    answer:
      "CI/CD, Sentry/New Relic, PagerDuty for on‑call, TestRail/Playwright, and simple status updates.",
    tags: ["tooling"],
  },
  // Team & org design
  {
    id: "team-structures",
    question: "What team structures have you run?",
    answer:
      "Pods/squads across FE/BE/Mobile/QA/DevOps/TPM with functional leaders to deepen discipline expertise.",
    tags: ["org-design", "teams"],
  },
  {
    id: "largest-org",
    question: "Largest org you’ve led?",
    answer: "~50+ engineers across web, mobile, and QA; global and remote‑first.",
    tags: ["org-size"],
  },
  {
    id: "staffing-vendors",
    question: "What about staffing and vendors?",
    answer:
      "Blend FTEs with vetted partners; clear SOWs, measurable deliverables, and code quality gates.",
    tags: ["vendors", "staffing"],
  },
  {
    id: "career-ladders",
    question: "Career ladders and performance?",
    answer:
      "Transparent levels, objective rubrics, growth‑aligned goals, and fair comp frameworks.",
    tags: ["performance", "career"],
  },
  {
    id: "on-call-incidents",
    question: "On-call and incident management?",
    answer:
      "Product‑aligned services, escalation policies, blameless postmortems, and follow‑through action items.",
    tags: ["on-call", "incidents"],
  },
  {
    id: "with-product-design",
    question: "How do you collaborate with Product & Design?",
    answer:
      "Joint discovery, dual‑track backlogs, tight UX/eng alignment, and shared success metrics.",
    tags: ["product", "design"],
  },
  // Project types
  {
    id: "greenfield",
    question: "Greenfield product from zero to one?",
    answer: "Yes—scope MVP, build v1, hire/coach team, instrument analytics, and plan v2.",
    tags: ["projects", "greenfield"],
  },
  {
    id: "platform-modernization",
    question: "Platform modernization or migration?",
    answer:
      "Yes—e.g., WordPress → Next.js with SEO preservation, asset backfills, and 0‑404 launch goals.",
    tags: ["migration", "modernization"],
  },
  {
    id: "mobile-initiatives",
    question: "Mobile app initiatives?",
    answer: "Yes—React Native builds, app store delivery, analytics, and crash/error monitoring.",
    tags: ["mobile", "apps"],
  },
  {
    id: "video-workflows",
    question: "Video/transcoding & media workflows?",
    answer: "Yes—Cloudinary transformations, player UX, and cost/performance optimization.",
    tags: ["video", "media"],
  },
  {
    id: "sso-enterprise",
    question: "SSO & enterprise readiness?",
    answer: "Yes—SAML/OIDC, role models, audit logging, and provisioning flows.",
    tags: ["sso", "enterprise"],
  },
  {
    id: "data-pipelines",
    question: "Data/analytics pipelines?",
    answer: "Yes—Airbyte connectors, marketing‑data aggregation, and reporting dashboards.",
    tags: ["data", "analytics"],
  },
  {
    id: "reliability-overhauls",
    question: "Reliability/observability overhauls?",
    answer:
      "Yes—SLOs, alerting, runbooks, on‑call launch, and Sentry/New Relic rollout.",
    tags: ["reliability", "observability"],
  },
  {
    id: "ai-llm-features",
    question: "AI/LLM features?",
    answer:
      "Yes—prototype → pilot → production guardrails with cost/latency tuning and an evaluation framework.",
    tags: ["ai", "llm"],
  },
  // Ways of working
  {
    id: "kickoff-sequence",
    question: "What’s your kickoff sequence with a new client/company?",
    answer:
      "Week 1: discovery + architecture/org audit. Week 2: priority roadmap + 90‑day plan. Week 3: execution cadence, dashboards, and staffing adjustments.",
    tags: ["kickoff", "onboarding"],
  },
  {
    id: "early-artifacts",
    question: "What artifacts do you deliver early?",
    answer:
      "Current state map, risks, 30/60/90 plan, hiring/reorg recommendations, and budget/timeline bands.",
    tags: ["artifacts"],
  },
  {
    id: "status-comms",
    question: "How do you communicate status?",
    answer:
      "Weekly exec updates, fortnightly demos, and simple dashboards for delivery, quality, and risk.",
    tags: ["communication", "status"],
  },
  {
    id: "preferred-tools",
    question: "What tools do you prefer?",
    answer: "GitHub/GitLab, Linear/Jira, Confluence/Notion, Slack, and Figma.",
    tags: ["tools"],
  },
  // Risk, quality & security
  {
    id: "de-risk-bets",
    question: "How do you de-risk big bets?",
    answer:
      "Spike/POC → narrow scope → pilot cohort → phased rollout with clear success gates.",
    tags: ["risk"],
  },
  {
    id: "ensure-quality",
    question: "How do you ensure quality without slowing down?",
    answer:
      "Test pyramids, PR checklists, visual regression when it pays, and defect burndowns.",
    tags: ["quality", "testing"],
  },
  {
    id: "security-stance",
    question: "Security stance?",
    answer:
      "Principle of least privilege, secrets management, dependency hygiene, and regular audits.",
    tags: ["security"],
  },
  {
    id: "compliance-support",
    question: "Compliance support (SOC 2, etc.)?",
    answer:
      "Map controls to practices, fill gaps pragmatically, and create team‑friendly SOPs.",
    tags: ["compliance", "soc2"],
  },
  // Results & proof
  {
    id: "outcomes-driven",
    question: "Examples of outcomes you’ve driven?",
    answer:
      "Revenue‑impacting launches (premium features, a‑la‑carte media), org turnarounds (pods, on‑call, QA automation) with incident MTTR reduction, and large site rebuilds with SEO retention and performance gains.",
    tags: ["results", "case-studies"],
  },
  {
    id: "references",
    question: "References and case studies?",
    answer: "Available on request from engineering leaders, product partners, and vendors.",
    tags: ["references"],
  },
  // Fit & logistics
  {
    id: "ideal-stage",
    question: "Ideal company stage?",
    answer: "Seed → growth → mid‑market; I especially enjoy scale‑ups and platform modernization.",
    tags: ["fit"],
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
