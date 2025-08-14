"use client";

import React, { useState } from "react";

export default function PartnersRegistrationPage() {
  const [status, setStatus] = useState<string | null>(null);
  const [types, setTypes] = useState<string[]>([]);

  const toggleType = (value: string) => {
    setTypes((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("classifications", types.join(","));
    const data = Object.fromEntries(formData.entries());
    try {
      const res = await fetch('/api/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      let json: any = null;
      try { json = await res.json(); } catch { /* ignore parse issues */ }
      if (!res.ok) throw new Error(json?.error || `Failed (${res.status})`);
      setStatus('Thanks! You’ve been added to my collaboration list.');
      e.currentTarget.reset();
      setTypes([]);
    } catch (err: any) {
      setStatus('Something went wrong. Please email me: kris@krischase.com');
      console.error('Partners submit error:', err);
    }
  };

  return (
    <main className="relative mx-auto w-full max-w-6xl px-6 sm:px-8 md:px-10 lg:px-12 pt-32 sm:pt-40 md:pt-44 pb-16 sm:pb-20">
      {/* Hero */}
      <section className="mb-10 sm:mb-12 md:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Partner & Freelancer Registration
        </h1>
        <p className="mt-4 max-w-3xl text-base sm:text-lg leading-relaxed text-muted-foreground">
          I’ve built a large, trusted network of partners and independent experts across nearshore,
          offshore, and freelance communities—and I’m always growing it. If you’d like to be
          considered for future collaborations, please share your details below. I’ll reach out
          when there’s a strong fit.
        </p>
      </section>

      {/* Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        {/* Form */}
        <div className="lg:col-span-3">
          <div className="rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white/60 dark:bg-black/60 backdrop-blur-sm shadow-sm p-5 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-muted-foreground mb-1">Phone</label>
                  <input id="phone" name="phone" type="tel" placeholder="+1 (555) 555-5555" className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-[#96442e]/40" />
                </div>
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-muted-foreground mb-1">Website</label>
                  <input id="website" name="website" type="url" placeholder="https://yourstudio.com" className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-[#96442e]/40" />
                </div>
              </div>

              <div>
                <label htmlFor="offering" className="block text-sm font-medium text-muted-foreground mb-1">Service offering</label>
                <input id="offering" name="offering" type="text" required placeholder="e.g., AI/ML, design, full-stack, data, DevOps" className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-[#96442e]/40" />
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Classification</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { value: "nearshore", label: "Nearshore" },
                    { value: "offshore", label: "Offshore" },
                    { value: "freelance", label: "Freelance" },
                    { value: "contract", label: "Contract" },
                    { value: "agency", label: "Agency" },
                    { value: "staff-aug", label: "Staff Aug" },
                  ].map((opt) => (
                    <label key={opt.value} className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm cursor-pointer select-none hover:bg-muted/40">
                      <input
                        type="checkbox"
                        name="classification"
                        value={opt.value}
                        checked={types.includes(opt.value)}
                        onChange={() => toggleType(opt.value)}
                        className="accent-[#96442e]"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
                {/* Hidden aggregation field for easy backend parsing later */}
                <input type="hidden" name="classifications" value={types.join(",")} />
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-muted-foreground mb-1">Notes (optional)</label>
                <textarea id="notes" name="notes" rows={5} placeholder="Share key strengths, sample clients, typical engagement model, or regions/timezones." className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-[#96442e]/40" />
              </div>

              <div className="flex items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">I’ll only reach out if there’s a strong fit for an opportunity.</p>
                <button type="submit" className="inline-flex items-center justify-center rounded-lg bg-[#96442e] hover:bg-[#b8553a] text-white px-5 py-3 font-semibold transition-colors duration-200">
                  Join Collaboration List
                </button>
              </div>

              {status && (
                <p className="text-sm text-green-600 dark:text-green-400">{status}</p>
              )}
            </form>
          </div>
        </div>

        {/* Side Panel */}
        <aside className="lg:col-span-2">
          <div className="rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white/60 dark:bg-black/60 backdrop-blur-sm shadow-sm p-5 sm:p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-foreground">What I’m Looking For</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              High-caliber teams and individuals with proven delivery in AI, product/platform work,
              full-stack engineering, data, and technical leadership. Nearshore and offshore welcome.
            </p>
            <div className="mt-6 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Helpful to include</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Representative clients or portfolio</li>
                <li>Typical team composition and rates</li>
                <li>Time zones and languages</li>
                <li>Specialized capabilities (AI/LLM, infra, security, etc.)</li>
              </ul>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
