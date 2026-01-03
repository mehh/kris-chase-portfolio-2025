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

// Chunking configuration (character-based approximation ~ 4 chars per token)
const CHUNK_SIZE_CHARS = 4000;
const CHUNK_OVERLAP_CHARS = 200;

function chunkText(text: string, size = CHUNK_SIZE_CHARS, overlap = CHUNK_OVERLAP_CHARS): string[] {
  const chunks: string[] = [];
  if (!text) return chunks;
  let start = 0;
  while (start < text.length) {
    const hardEnd = Math.min(start + size, text.length);
    let segment = text.slice(start, hardEnd);
    // Try to end chunks on a boundary (sentence or newline) when possible
    if (hardEnd < text.length) {
      const lastNewline = segment.lastIndexOf("\n");
      const lastSentence = segment.lastIndexOf(". ");
      const lastBoundary = Math.max(lastNewline, lastSentence);
      if (lastBoundary > size * 0.6) {
        segment = segment.slice(0, lastBoundary + 1);
      }
    }
    const trimmed = segment.trim();
    if (trimmed) chunks.push(trimmed);
    if (hardEnd >= text.length) break;
    // Advance start by segment length minus overlap, with a safety guard
    const advance = Math.max(1, trimmed.length || segment.length);
    start += Math.max(advance - overlap, 1);
  }
  return chunks;
}

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

export async function getEmbeddings(
  texts: string[],
  options?: {
    posthogDistinctId?: string;
    posthogTraceId?: string;
    posthogProperties?: Record<string, unknown>;
  }
): Promise<number[][]> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not set");

  // Try to use PostHog-wrapped OpenAI client for analytics
  const { getPostHogOpenAIClient } = await import("@/lib/posthog/openai");
  const phOpenAI = getPostHogOpenAIClient(apiKey);

  // Batch inputs to reduce the chance of hitting context limits when sending arrays
  const batches: string[][] = [];
  const MAX_BATCH_CHARS = 16000; // ~4 chars/token -> ~4k tokens per batch (conservative)
  let current: string[] = [];
  let currentChars = 0;
  for (const t of texts) {
    const len = t?.length || 0;
    if (current.length > 0 && currentChars + len > MAX_BATCH_CHARS) {
      batches.push(current);
      current = [];
      currentChars = 0;
    }
    current.push(t);
    currentChars += len;
  }
  if (current.length) batches.push(current);

  const out: number[][] = [];
  for (const batch of batches) {
    if (phOpenAI) {
      // Use PostHog-wrapped client for automatic $ai_embedding event capture
      try {
        const response = await phOpenAI.embeddings.create({
          model: "text-embedding-3-small",
          input: batch,
          posthogDistinctId: options?.posthogDistinctId,
          posthogTraceId: options?.posthogTraceId,
          posthogProperties: options?.posthogProperties,
        });
        response.data.forEach((d) => out.push(d.embedding));
      } catch (error) {
        // Fallback to direct fetch if PostHog client fails
        console.warn("PostHog OpenAI client failed, falling back to direct API", error);
        const res = await fetch("https://api.openai.com/v1/embeddings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "text-embedding-3-small",
            input: batch,
          }),
        });
        if (!res.ok) {
          const err = await res.text();
          throw new Error(`Embedding error: ${res.status} ${err}`);
        }
        const json = (await res.json()) as { data: { embedding: number[] }[] };
        json.data.forEach((d) => out.push(d.embedding));
      }
    } else {
      // Fallback to direct fetch if PostHog is not configured
      const res = await fetch("https://api.openai.com/v1/embeddings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "text-embedding-3-small",
          input: batch,
        }),
      });
      if (!res.ok) {
        const err = await res.text();
        throw new Error(`Embedding error: ${res.status} ${err}`);
      }
      const json = (await res.json()) as { data: { embedding: number[] }[] };
      json.data.forEach((d) => out.push(d.embedding));
    }
  }
  return out;
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

export async function retrieve(
  query: string,
  k = 4,
  options?: {
    posthogDistinctId?: string;
    posthogTraceId?: string;
    posthogProperties?: Record<string, unknown>;
  }
) {
  await ensureEmbedded();
  const [qEmb] = await getEmbeddings([query], options);
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
    const baseId = `route-${path}`;
    const text = await fetchRouteAsText(origin, path);
    if (text && text.length > 200) {
      const parts = chunkText(text);
      for (let i = 0; i < parts.length; i++) {
        const id = parts.length === 1 ? baseId : `${baseId}#${i}`;
        if (RAG_DOCUMENTS.some((d) => d.id === id)) continue;
        toAdd.push({
          id,
          title: `Page: ${path}${parts.length > 1 ? ` (part ${i + 1})` : ""}`,
          url: path,
          content: parts[i],
        });
      }
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
  // If any chunk for this doc already exists, skip
  const prefix = `${doc.id}#`;
  const exists = RAG_DOCUMENTS.some((d) => d.id === doc.id || d.id.startsWith(prefix));
  if (exists) return;

  const parts = chunkText(doc.content);
  if (parts.length <= 1) {
    const [emb] = await getEmbeddings([doc.content]);
    doc.embedding = emb;
    RAG_DOCUMENTS.push(doc);
    return;
  }
  const embs = await getEmbeddings(parts);
  for (let i = 0; i < parts.length; i++) {
    RAG_DOCUMENTS.push({
      id: `${doc.id}#${i}`,
      title: `${doc.title} (part ${i + 1})`,
      url: doc.url,
      content: parts[i],
      embedding: embs[i],
    });
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
