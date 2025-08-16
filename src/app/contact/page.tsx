"use client";

import React, { useEffect, useState } from "react";
import { useMachineSlice } from "@/components/machine/MachineViewProvider";
import posthog from "posthog-js";
import Link from "next/link";
import TextReveal from "@/components/TextReveal";
import { CheckCircle2 } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export default function ContactPage() {
  const [status, setStatus] = useState<string | null>(null);
  const [reason, setReason] = useState<string>("job");
  const [step, setStep] = useState<number>(1);
  const [persona, setPersona] = useState<string>("");
  const [started, setStarted] = useState<boolean>(false);
  const [qualifier, setQualifier] = useState<"" | "yes" | "no">("");
  // Controlled state for conditional fields to persist across steps
  const [budget, setBudget] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [roleType, setRoleType] = useState<string>("");
  const [compRange, setCompRange] = useState<string>("");
  const [advisoryArea, setAdvisoryArea] = useState<string>("");
  // Submission transition state
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

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
      "### Contact",
      "Email: kris@krischase.com",
    ].join("\n"),
  }, []);

  useEffect(() => {
    try {
      posthog.capture("contact_viewed");
    } catch {}
  }, []);

  // Track success view
  useEffect(() => {
    if (showSuccess) {
      try {
        posthog.capture("contact_success_shown");
      } catch {}
    }
  }, [showSuccess]);

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


function SuccessView({ persona }: { persona: string }) {
  return (
    <div className="relative overflow-hidden">
      {/* subtle burst dots */}
      <div className="pointer-events-none absolute inset-0">
        {[
          { t: '10%', l: '15%', c: '#f59e0b' },
          { t: '20%', l: '70%', c: '#ef4444' },
          { t: '65%', l: '20%', c: '#22c55e' },
          { t: '75%', l: '75%', c: '#3b82f6' },
          { t: '40%', l: '50%', c: '#a855f7' },
          { t: '85%', l: '40%', c: '#ec4899' },
        ].map((p, i) => (
          <span
            key={i}
            className="absolute h-2 w-2 rounded-full opacity-60 animate-ping"
            style={{ top: p.t as string, left: p.l as string, backgroundColor: p.c as string }}
          />
        ))}
      </div>

      <div className="flex flex-col items-center text-center px-4 py-10 md:py-14">
        <div className="mb-4 text-green-600 dark:text-green-400">
          <CheckCircle2 className="h-14 w-14" />
        </div>
        <h3 className="text-2xl md:text-3xl font-semibold text-foreground">
          <TextReveal text="Message sent!" />
        </h3>
        <p className="mt-3 text-sm md:text-base text-muted-foreground">
          <TextReveal text="Thanks — I’ll follow up shortly." delayMs={250} />
        </p>
        {persona && (
          <p className="mt-1 text-xs text-muted-foreground/80">
            <TextReveal text={`Noted you’re a ${persona}.`} delayMs={450} />
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/connect" legacyBehavior>
            <a
              onClick={() => { try { posthog.capture('contact_success_cta_click', { target: 'connect' }); } catch {} }}
              className="inline-flex items-center justify-center rounded-lg bg-white text-black hover:bg-black hover:text-white border border-black px-5 py-3 font-semibold transition-colors duration-200"
            >
              Book a chat
            </a>
          </Link>
          <Link href="/" legacyBehavior>
            <a
              onClick={() => { try { posthog.capture('contact_success_cta_click', { target: 'home' }); } catch {} }}
              className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-3 font-semibold text-foreground hover:bg-foreground/10 transition-colors duration-200"
            >
              Explore more
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

  const personaCopy = (p: string) => {
    switch (p) {
      case "founder":
        return {
          question: "Are you looking for a hands-on CTO/Head of Engineering to lead or level-up your product and team?",
          pitch: "I partner with founders to ship ambitious v1s, unlock velocity, and build healthy engineering orgs.",
        };
      case "hiring":
        return {
          question: "Do you need a full-time or fractional leader to accelerate a critical initiative this quarter?",
          pitch: "I plug in quickly to own outcomes: product, engineering, and GTM alignment—end to end.",
        };
      case "exec":
        return {
          question: "Are you seeking a trusted builder who can own outcomes across product and engineering with executive-level communication?",
          pitch: "I drive clarity, reduce risk, and deliver measurable results across teams.",
        };
      case "engineer":
        return {
          question: "Are you exploring a role where we ship ambitiously with strong mentorship and product taste?",
          pitch: "I build teams where engineers do the best work of their careers.",
        };
      case "investor":
        return {
          question: "Are you looking for technical diligence, portfolio support, or advisory to help companies ship faster?",
          pitch: "I support founders with pragmatic advice and hands-on help where it matters most.",
        };
      default:
        return {
          question: "Do you have a project where senior product engineering could create outsized leverage?",
          pitch: "Happy to dig in and point you in the right direction—even if we don’t work together.",
        };
    }
  };

  const maxSteps = qualifier === "yes" ? 4 : (qualifier === "no" ? 3 : 4);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement; // capture before await (React pools events)
    const formData = new FormData(form);
    // Include wizard-only hidden fields in analytics
    const personaField = formData.get('persona');
    const data = Object.fromEntries(formData.entries());
    try {
      posthog.capture("contact_submit_attempted", { reason: data.reason, persona: personaField });
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
      // trigger fade-out of the form, then swap to success view
      setSubmitted(true);
      form.reset();

      // Identify by hashed email and set person properties
      const email = typeof data.email === 'string' ? data.email : '';
      const name = typeof data.name === 'string' ? data.name : '';
      const distinctId = email ? await hashEmail(email) : undefined;
      try {
        if (distinctId) {
          posthog.identify(distinctId, { $email: email, name });
        }
        posthog.capture("contact_submit_succeeded", { reason: data.reason, persona: personaField });
      } catch {}
      // small delay lets the fade-out animate before showing success
      setTimeout(() => setShowSuccess(true), 500);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setStatus(`Something went wrong. Please email me directly: kris@krischase.com`);
      console.error('Contact submit error:', message);
      try {
        posthog.capture("contact_submit_failed", { reason, message });
      } catch {}
    }
  };

  const goNext = () => {
    const next = Math.min(step + 1, maxSteps);
    setStep(next);
    try { posthog.capture('contact_step_next', { step: next }); } catch {}
  };
  const goBack = () => {
    const prev = Math.max(step - 1, 1);
    setStep(prev);
    try { posthog.capture('contact_step_back', { step: prev }); } catch {}
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
          <div className="relative rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white/60 dark:bg-black/60 backdrop-blur-sm shadow-sm p-5 sm:p-6">
            <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
            {!showSuccess && (
              <>
                {/* Progress */}
                <div className="mb-4">
                  <div className="h-2 w-full bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-[#96442e] transition-all duration-300" style={{ width: `${(step/maxSteps)*100}%` }} />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">Step {step} of {maxSteps}</p>
                </div>

                <form
                  onFocus={onFormFocus}
                  onSubmit={handleSubmit}
                  className={`space-y-5 transition-all duration-500 ${submitted ? 'opacity-0 translate-y-2 pointer-events-none' : ''}`}
                >
              {/* Step 1: Who are you? */}
              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Who are you?</h3>
                    <p className="text-sm text-muted-foreground">This helps me tailor the conversation.</p>
                  </div>
                  <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { v: 'founder', l: 'Founder / CEO' },
                      { v: 'hiring', l: 'Hiring Manager / Recruiter' },
                      { v: 'exec', l: 'Executive / VP' },
                      { v: 'engineer', l: 'Engineer / IC' },
                      { v: 'investor', l: 'Investor' },
                      { v: 'other', l: 'Other' },
                    ].map((o) => (
                      <label key={o.v} className={`flex items-center gap-2 rounded-lg border px-3 py-2 cursor-pointer ${persona === o.v ? 'border-[#96442e] bg-[#96442e]/10' : 'border-border'}`}>
                        <input
                          type="radio"
                          name="persona"
                          value={o.v}
                          checked={persona === o.v}
                          onChange={(e) => setPersona(e.target.value)}
                          className="hidden"
                        />
                        <span className="text-sm text-foreground">{o.l}</span>
                      </label>
                    ))}
                  </fieldset>
                  <div className="flex justify-end gap-2">
                    <button type="button" disabled={!persona} onClick={() => { goNext(); try { posthog.capture('contact_persona_selected', { persona }); } catch {} }} className="inline-flex items-center justify-center rounded-lg bg-white text-black hover:bg-black hover:text-white border border-black px-5 py-3 font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Persona qualifier */}
              {step === 2 && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Quick check</h3>
                      <p className="text-sm text-muted-foreground">{personaCopy(persona).pitch}</p>
                    </div>
                    <div className="flex gap-2">
                      <button type="button" onClick={goBack} className="rounded-lg border border-border px-4 py-2 text-sm">Back</button>
                    </div>
                  </div>
                  <div className="rounded-lg border border-border p-4">
                    <p className="text-base text-foreground">{personaCopy(persona).question}</p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => { setQualifier("yes"); try { posthog.capture('contact_persona_qualifier', { persona, fit: true }); } catch {}; goNext(); }}
                        className="rounded-lg bg-white text-black hover:bg-black hover:text-white border border-black px-4 py-2 text-sm font-semibold"
                      >
                        Yes — let’s talk
                      </button>
                      <button
                        type="button"
                        onClick={() => { setQualifier("no"); setReason('other'); try { posthog.capture('contact_persona_qualifier', { persona, fit: false }); } catch {}; goNext(); }}
                        className="rounded-lg border border-border px-4 py-2 text-sm"
                      >
                        Not right now
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3 (Yes path): Intent + qualifiers */}
              {step === 3 && qualifier === "yes" && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Why are you reaching out?</h3>
                      <p className="text-sm text-muted-foreground">Pick the closest match and add details.</p>
                    </div>
                    <div className="flex gap-2">
                      <button type="button" onClick={goBack} className="rounded-lg border border-border px-4 py-2 text-sm">Back</button>
                      <button type="button" onClick={goNext} className="rounded-lg bg-white text-black hover:bg-black hover:text-white border border-black px-4 py-2 text-sm font-semibold">Next</button>
                    </div>
                  </div>

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

                  {/* Conditional fields */}
                  {reason === "contract" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="budget" className="block text-sm font-medium text-muted-foreground mb-1">Estimated budget</label>
                        <select id="budget" name="budget" value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-[#96442e]/40">
                          <option value="" className="bg-white dark:bg-black">Select…</option>
                          <option value="under-10k" className="bg-white dark:bg-black">Under $10k</option>
                          <option value="10-25k" className="bg-white dark:bg-black">$10k–$25k</option>
                          <option value="25-50k" className="bg-white dark:bg-black">$25k–$50k</option>
                          <option value="50-100k" className="bg-white dark:bg-black">$50k–$100k</option>
                          <option value="100k-plus" className="bg-white dark:bg-black">$100k+</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="start" className="block text-sm font-medium text-muted-foreground mb-1">Target start date</label>
                        <input id="start" name="start" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-[#96442e]/40" />
                      </div>
                    </div>
                  )}

                  {reason === "job" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="roleType" className="block text-sm font-medium text-muted-foreground mb-1">Role type</label>
                        <select id="roleType" name="roleType" value={roleType} onChange={(e) => setRoleType(e.target.value)} className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-[#96442e]/40">
                          <option value="" className="bg-white dark:bg-black">Select…</option>
                          <option value="individual" className="bg-white dark:bg-black">Individual contributor</option>
                          <option value="lead" className="bg-white dark:bg-black">Lead/Manager</option>
                          <option value="executive" className="bg-white dark:bg-black">Director/VP/CXO</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="compRange" className="block text-sm font-medium text-muted-foreground mb-1">Compensation range (optional)</label>
                        <input id="compRange" name="compRange" type="text" value={compRange} onChange={(e) => setCompRange(e.target.value)} placeholder="$X–$Y + equity" className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-[#96442e]/40" />
                      </div>
                    </div>
                  )}

                  {reason === "advisory" && (
                    <div>
                      <label htmlFor="advisoryArea" className="block text-sm font-medium text-muted-foreground mb-1">Advisory focus</label>
                      <input id="advisoryArea" name="advisoryArea" type="text" value={advisoryArea} onChange={(e) => setAdvisoryArea(e.target.value)} placeholder="e.g., AI strategy, platform architecture, org design" className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-[#96442e]/40" />
                    </div>
                  )}
                </div>
              )}

              {/* Contact + message: Step 3 (No path) OR Step 4 (Yes path) */}
              {((step === 3 && qualifier !== "yes") || (step === 4 && qualifier === "yes")) && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Contact details</h3>
                      <p className="text-sm text-muted-foreground">I’ll reply quickly with next steps.</p>
                    </div>
                    <div className="flex gap-2">
                      <button type="button" onClick={goBack} className="rounded-lg border border-border px-4 py-2 text-sm">Back</button>
                      <button type="submit" className="rounded-lg bg-white text-black hover:bg-black hover:text-white border border-black px-4 py-2 text-sm font-semibold">Send Message</button>
                    </div>
                  </div>

                  {/* carry wizard fields as hidden inputs to ensure API receives them */}
                  <input type="hidden" name="persona" value={persona} />
                  <input type="hidden" name="persona_fit" value={qualifier === 'yes' ? 'true' : qualifier === 'no' ? 'false' : ''} />
                  <input type="hidden" name="persona_question" value={personaCopy(persona).question} />
                  <input type="hidden" name="reason" value={reason} />
                  <input type="hidden" name="budget" value={budget} />
                  <input type="hidden" name="start" value={startDate} />
                  <input type="hidden" name="roleType" value={roleType} />
                  <input type="hidden" name="compRange" value={compRange} />
                  <input type="hidden" name="advisoryArea" value={advisoryArea} />

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
                </div>
              )}
                </form>
              </>
            )}

            {showSuccess && (
              <SuccessView persona={persona} />
            )}
          </div>
        </div>

        {/* About + Video / Booking Card */}
        <aside className="lg:col-span-2">
            <div className="rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white/60 dark:bg-black/60 backdrop-blur-sm shadow-sm p-5 sm:p-6 sticky top-24">
              <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
              <h2 className="text-xl font-semibold text-foreground">How I help (2 min)</h2>
              <p className="mt-2 text-sm text-muted-foreground">Short video on who I’m for and how we’ll work together.</p>
              <div className="mt-4 w-full overflow-hidden border border-border bg-black/70" style={{ position: 'relative', paddingBottom: '56.2%', borderRadius: 12 }}>
                <iframe
                  src="https://supercut.ai/embed/kris-chase/b8tjxYt5HkESUYr7HnD9ds?embed=full"
                  title="Kris Chase: Engineering Leader"
                  allow="autoplay; fullscreen; encrypted-media; picture-in-picture; clipboard-write"
                  referrerPolicy="origin-when-cross-origin"
                  frameBorder={0}
                  data-cursor="native"
                  allowFullScreen
                  style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, borderRadius: 10 }}
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Having trouble loading the video?{' '}
                <a href="https://supercut.ai/embed/kris-chase/b8tjxYt5HkESUYr7HnD9ds?embed=full" target="_blank" rel="noopener noreferrer" className="underline">
                  Open it in a new tab
                </a>.
              </p>
            </div>
        </aside>
      </section>
    </main>
  );
}

