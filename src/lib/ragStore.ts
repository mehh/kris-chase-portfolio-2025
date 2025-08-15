// Minimal in-memory RAG store with lazy embedding.
// Note: This is an MVP suitable for small corpora. Replace with Supabase pgvector later.

export type RagDoc = {
  id: string;
  title: string;
  url: string;
  content: string;
  embedding?: number[];
};

// Seed with core content. Kept small on purpose.
// You can extend this list with more pages/sections as needed.
export const RAG_DOCUMENTS: RagDoc[] = [
  {
    id: "how-i-operate-summary",
    title: "How I Operate – Summary",
    url: "/how-i-operate",
    content:
      "I help leaders ship outcomes: clarify strategy, build the right product, scale teams, and reduce execution risk. My approach combines clear communication, pragmatic systems thinking, and a bias for measurable results. Process: Diagnose — Listen first. Clarify the problem, constraints, and desired outcomes. Design — Define a plan that is minimal yet sufficient. Deliver — Execute with momentum and transparency.",
  },
  {
    id: "resume-pdf",
    title: "Resume PDF",
    url: "/files/Kris Chase Resume.pdf",
    content:
      "My latest resume is available as a PDF for download and viewing. The /resume page also embeds the PDF and includes a podcast-style narration.",
  },
  {
    id: "testimonials",
    title: "Testimonials Overview",
    url: "/testimonials",
    content:
      "Testimonials collected from LinkedIn and colleagues highlight leadership, communication, and delivery. The page uses a bento-box layout with light/dark mode and dynamic sizing.",
  },
];

export const cosineSim = (a: number[], b: number[]) => {
  let dot = 0,
    na = 0,
    nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  if (!na || !nb) return 0;
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
};

export async function getEmbeddings(texts: string[]): Promise<number[][]> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not set");

  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "text-embedding-3-small",
      input: texts,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Embedding error: ${res.status} ${err}`);
  }
  const json = (await res.json()) as { data: { embedding: number[] }[] };
  return json.data.map((d) => d.embedding);
}

let embedded = false;
export async function ensureEmbedded() {
  if (embedded) return;
  const texts = RAG_DOCUMENTS.map((d) => d.content);
  const embs = await getEmbeddings(texts);
  for (let i = 0; i < RAG_DOCUMENTS.length; i++) {
    RAG_DOCUMENTS[i].embedding = embs[i];
  }
  embedded = true;
}

export async function retrieve(query: string, k = 4) {
  await ensureEmbedded();
  const [qEmb] = await getEmbeddings([query]);
  const scored = RAG_DOCUMENTS.map((d) => ({
    doc: d,
    score: cosineSim(qEmb, d.embedding || []),
  }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k);

  return scored.map((s) => s.doc);
}
