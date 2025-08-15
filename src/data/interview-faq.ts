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
];
