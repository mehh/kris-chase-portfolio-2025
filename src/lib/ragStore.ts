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
  const len = Math.min(a.length, b.length);
  for (let i = 0; i < len; i++) {
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

export async function ensureEmbedded() {
  // Only embed docs that don't have embeddings yet
  const pendingIndexes: number[] = [];
  const pendingTexts: string[] = [];
  for (let i = 0; i < RAG_DOCUMENTS.length; i++) {
    if (!RAG_DOCUMENTS[i].embedding) {
      pendingIndexes.push(i);
      pendingTexts.push(RAG_DOCUMENTS[i].content);
    }
  }
  if (pendingTexts.length > 0) {
    const embs = await getEmbeddings(pendingTexts);
    pendingIndexes.forEach((idx, j) => {
      RAG_DOCUMENTS[idx].embedding = embs[j];
    });
  }
}

export async function retrieve(query: string, k = 4) {
  await ensureEmbedded();
  const [qEmb] = await getEmbeddings([query]);
  const scored = RAG_DOCUMENTS.map((d) => {
    let score = cosineSim(qEmb, d.embedding || []);
    // Lightly boost FAQ docs to help common interview Q&A surface
    if (d.id.startsWith("faq-")) score *= 1.15;
    return { doc: d, score };
  })
    .sort((a, b) => b.score - a.score)
    .slice(0, k);

  return scored.map((s) => s.doc);
}

// ----- Extensions: FAQ + Site Crawling (MVP) -----
import { INTERVIEW_FAQ } from "@/data/interview-faq";

export function addFAQDocs() {
  // Convert FAQs into docs (id stable by faq.id)
  for (const faq of INTERVIEW_FAQ) {
    const id = `faq-${faq.id}`;
    if (!RAG_DOCUMENTS.some((d) => d.id === id)) {
      RAG_DOCUMENTS.push({
        id,
        title: `Interview: ${faq.question}`,
        url: `/faq#${faq.id}`,
        content: `${faq.question}\n\n${faq.answer}`,
      });
    }
  }
}

// Basic HTML → text stripper (MVP)
function stripHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export async function fetchRouteAsText(origin: string, path: string): Promise<string | null> {
  try {
    const url = `${origin}${path}`;
    const res = await fetch(url, { headers: { Accept: "text/html" } });
    if (!res.ok) return null;
    const html = await res.text();
    return stripHtml(html);
  } catch {
    return null;
  }
}

export async function indexSite(origin: string, routes: string[]) {
  const toAdd: RagDoc[] = [];
  for (const path of routes) {
    // Avoid duplicating existing route doc IDs
    const id = `route-${path}`;
    if (RAG_DOCUMENTS.some((d) => d.id === id)) continue;
    const text = await fetchRouteAsText(origin, path);
    if (text && text.length > 200) {
      toAdd.push({ id, title: `Page: ${path}`, url: path, content: text });
    }
  }
  if (toAdd.length > 0) {
    const embs = await getEmbeddings(toAdd.map((d) => d.content));
    toAdd.forEach((d, i) => (d.embedding = embs[i]));
    RAG_DOCUMENTS.push(...toAdd);
  }
}

// ----- Helpers: add arbitrary docs and combined FAQ markdown -----
export async function addDoc(doc: RagDoc) {
  if (!RAG_DOCUMENTS.some((d) => d.id === doc.id)) {
    const [emb] = await getEmbeddings([doc.content]);
    doc.embedding = emb;
    RAG_DOCUMENTS.push(doc);
  }
}

export async function addFAQMarkdownDoc() {
  // Combine all FAQs into a single markdown doc to improve recall
  const md = INTERVIEW_FAQ.map((f) => `## ${f.question}\n\n${f.answer}`).join("\n\n");
  await addDoc({
    id: "faq-markdown",
    title: "Interview FAQ (Full)",
    url: "/faq",
    content: md,
  });
}
