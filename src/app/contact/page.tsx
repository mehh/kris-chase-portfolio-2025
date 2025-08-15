"use client";

import React, { useEffect, useState } from "react";
import { useMachineSlice } from "@/components/machine/MachineViewProvider";
import posthog from "posthog-js";

export default function ContactPage() {
  const [status, setStatus] = useState<string | null>(null);
  const [reason, setReason] = useState<string>("job");
  const [started, setStarted] = useState<boolean>(false);

  // Register Contact page for Machine View
  useMachineSlice({
    type: "page",
    title: "Contact",
    path: "/contact",
    order: 70,
    content: [
      "### Summary",
      "Get in Touch — roles, contract, or board advisory.",
      "",
      "### Fields",
      "- Reason: job | contract | advisory | other",
      "- Name",
      "- Email",
      "- Company (optional)",
      "- Budget (if contract)",
      "- Target start date (if contract)",
      "- Role type (if job)",
      "- Compensation range (if job)",
      "- Advisory focus (if advisory)",
      "- Message",
      "",
      "### CTA",
      "[Book a Call](https://booking.akiflow.com/kris)",
      "or email: kris@krischase.com",
    ].join("\n"),
  }, []);

  useEffect(() => {
    try {
      posthog.capture("contact_viewed");
    } catch {}
  }, []);

  const onFormFocus = () => {
    if (started) return;
    setStarted(true);
    try {
      posthog.capture("contact_form_started", { reason });
    } catch {}
  };

  async function hashEmail(email: string): Promise<string> {
    try {
      const data = new TextEncoder().encode(email.trim().toLowerCase());
      const digest = await crypto.subtle.digest("SHA-256", data);
      const bytes = Array.from(new Uint8Array(digest));
      return bytes.map((b) => b.toString(16).padStart(2, "0")).join("");
    } catch {
      return email.trim().toLowerCase();
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement; // capture before await (React pools events)
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    try {
      posthog.capture("contact_submit_attempted", { reason: data.reason });
    } catch {}
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-PostHog-Distinct-Id': posthog.get_distinct_id?.() || '' },
        body: JSON.stringify(data),
      });
      let json: unknown = null;
      try { json = await res.json(); } catch { /* ignore parse issues */ }
      const apiError =
        json && typeof json === 'object' && json !== null && 'error' in json
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (json as any).error
          : undefined;
      if (!res.ok) throw new Error(apiError || `Failed (${res.status})`);
      setStatus('Thanks! I’ll get back to you shortly.');
      form.reset();

      // Identify by hashed email and set person properties
      const email = typeof data.email === 'string' ? data.email : '';
      const name = typeof data.name === 'string' ? data.name : '';
      const distinctId = email ? await hashEmail(email) : undefined;
      try {
        if (distinctId) {
          posthog.identify(distinctId, { $email: email, name });
        }
        posthog.capture("contact_submit_succeeded", { reason: data.reason });
      } catch {}
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setStatus(`Something went wrong. Please email me directly: kris@krischase.com`);
      console.error('Contact submit error:', message);
      try {
        posthog.capture("contact_submit_failed", { reason, message });
      } catch {}
    }
  };

  return (
    <main className="relative mx-auto w-full max-w-6xl px-6 sm:px-8 md:px-10 lg:px-12 pt-32 sm:pt-40 md:pt-44 pb-16 sm:pb-20">
      {/* Hero */}
      <section className="mb-10 sm:mb-12 md:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Get in Touch
        </h1>
        <p className="mt-4 max-w-3xl text-base sm:text-lg leading-relaxed text-muted-foreground">
          Whether you’re hiring, exploring a contract engagement, or looking for a board advisor,
          I’d love to connect. Drop me a note with a bit of context—goals, timelines, and what
          success looks like—and I’ll follow up quickly.
        </p>
      </section>

      {/* Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        {/* Form */}
        <div className="lg:col-span-3">
          <div className="rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white/60 dark:bg-black/60 backdrop-blur-sm shadow-sm p-5 sm:p-6">
            <form onFocus={onFormFocus} onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-muted-foreground mb-1">Reason</label>
                <select
                  id="reason"
                  name="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-[#96442e]/40"
                >
                  <option value="job" className="bg-white dark:bg-black">Full-time role</option>
                  <option value="contract" className="bg-white dark:bg-black">Contract engagement</option>
                  <option value="advisory" className="bg-white dark:bg-black">Board advisory</option>
                  <option value="other" className="bg-white dark:bg-black">Other</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">Your name</label>
                  <input id="name" name="name" type="text" required placeholder="Jane Doe" className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-[#96442e]/40" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">Email</label>
                  <input id="email" name="email" type="email" required placeholder="you@company.com" className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-[#96442e]/40" />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-muted-foreground mb-1">Company (optional)</label>
                <input id="company" name="company" type="text" placeholder="Acme Corp" className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-[#96442e]/40" />
              </div>

              {/* Conditional fields */}
              {reason === "contract" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-muted-foreground mb-1">Estimated budget</label>
                    <select id="budget" name="budget" className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-[#96442e]/40">
                      <option value="under-10k" className="bg-white dark:bg-black">Under $10k</option>
                      <option value="10-25k" className="bg-white dark:bg-black">$10k–$25k</option>
                      <option value="25-50k" className="bg-white dark:bg-black">$25k–$50k</option>
                      <option value="50-100k" className="bg-white dark:bg-black">$50k–$100k</option>
                      <option value="100k-plus" className="bg-white dark:bg-black">$100k+</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="start" className="block text-sm font-medium text-muted-foreground mb-1">Target start date</label>
                    <input id="start" name="start" type="date" className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-[#96442e]/40" />
                  </div>
                </div>
              )}

              {reason === "job" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="roleType" className="block text-sm font-medium text-muted-foreground mb-1">Role type</label>
                    <select id="roleType" name="roleType" className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-[#96442e]/40">
                      <option value="individual" className="bg-white dark:bg-black">Individual contributor</option>
                      <option value="lead" className="bg-white dark:bg-black">Lead/Manager</option>
                      <option value="executive" className="bg-white dark:bg-black">Director/VP/CXO</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="compRange" className="block text-sm font-medium text-muted-foreground mb-1">Compensation range (optional)</label>
                    <input id="compRange" name="compRange" type="text" placeholder="$X–$Y + equity" className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-[#96442e]/40" />
                  </div>
                </div>
              )}

              {reason === "advisory" && (
                <div>
                  <label htmlFor="advisoryArea" className="block text-sm font-medium text-muted-foreground mb-1">Advisory focus</label>
                  <input id="advisoryArea" name="advisoryArea" type="text" placeholder="e.g., AI strategy, platform architecture, org design" className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-[#96442e]/40" />
                </div>
              )}

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1">Message</label>
                <textarea id="message" name="message" required rows={6} placeholder="Tell me about your project, goals, timeline, and any relevant context." className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-[#96442e]/40" />
              </div>

              <div className="flex items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">Prefer email? Write me at <a className="underline hover:opacity-80" href="mailto:kris@krischase.com">kris@krischase.com</a>.</p>
                <button type="submit" className="inline-flex items-center justify-center rounded-lg bg-white text-black hover:bg-black hover:text-white border border-black px-5 py-3 font-semibold transition-colors duration-200">
                  Send Message
                </button>
              </div>

              {status && (
                <p className="text-sm text-green-600 dark:text-green-400">{status}</p>
              )}
            </form>
          </div>
        </div>

        {/* Booking Card */}
        <aside className="lg:col-span-2">
          <div className="rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white/60 dark:bg-black/60 backdrop-blur-sm shadow-sm p-5 sm:p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-foreground">Book a Call</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Want to skip the back-and-forth? Grab a time on my calendar and let’s talk.
            </p>
            <a
              href="https://booking.akiflow.com/kris"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center justify-center rounded-lg bg-white text-black hover:bg-black hover:text-white border border-black px-5 py-3 font-semibold transition-colors duration-200"
            >
              Book a Call
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>

            <div className="mt-6 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Typical engagements</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Fractional CTO / Advisor</li>
                <li>AI strategy & integration</li>
                <li>Product + platform architecture</li>
                <li>Rapid prototyping and R&D</li>
              </ul>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
