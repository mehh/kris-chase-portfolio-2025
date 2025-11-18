"use client";

import React, { useState } from "react";
import { useMachineSlice } from "@/components/machine/MachineViewProvider";

export default function DrupalCandidatePage() {
  const [status, setStatus] = useState<string | null>(null);
  const [statusKind, setStatusKind] = useState<"success" | "error" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [drupalVersions, setDrupalVersions] = useState<string[]>([]);
  const [drupalWorkTypes, setDrupalWorkTypes] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);

  // Register Drupal Candidate page for Machine View
  useMachineSlice({
    type: "page",
    title: "Drupal Candidate Intake",
    path: "/drupal-candidate",
    order: 70,
    content: [
      "### Summary",
      "Drupal Candidate Intake Form — filter inbound messages from LinkedIn.",
      "",
      "### Fields",
      "- Name, Email, Location, Timezone",
      "- LinkedIn URL, Portfolio URL (optional)",
      "- Years of Drupal experience",
      "- Drupal versions (multi-select: 7, 8, 9, 10)",
      "- Types of Drupal work (checkboxes)",
      "- Skills (checkboxes)",
      "- Resume upload (PDF only)",
      "",
      "### CTA",
      "Submit Application",
    ].join("\n"),
  }, []);

  const toggleArrayValue = (array: string[], setter: (arr: string[]) => void, value: string) => {
    setter(array.includes(value) ? array.filter((v) => v !== value) : [...array, value]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setResumeFile(null);
      setResumeError(null);
      return;
    }

    // Validate file type
    if (file.type !== "application/pdf") {
      setResumeError("Please upload a PDF file only.");
      setResumeFile(null);
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setResumeError("File size must be less than 10MB.");
      setResumeFile(null);
      return;
    }

    setResumeFile(file);
    setResumeError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);
    setStatusKind(null);

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    // Add array fields
    formData.set("drupal_versions", drupalVersions.join(","));
    formData.set("drupal_work_types", drupalWorkTypes.join(","));
    formData.set("skills", skills.join(","));

    // Add resume file if present
    if (resumeFile) {
      formData.set("resume", resumeFile);
    }

    try {
      const res = await fetch("/api/drupal-candidate", {
        method: "POST",
        body: formData,
      });

      let json: unknown = null;
      try {
        json = await res.json();
      } catch {
        /* ignore parse issues */
      }

      const apiError =
        json && typeof json === "object" && json !== null && "error" in json
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (json as any).error
          : undefined;

      if (!res.ok) {
        throw new Error(apiError || `Failed (${res.status})`);
      }

      setStatus("Thank you! Your application has been submitted successfully.");
      setStatusKind("success");
      form.reset();
      setDrupalVersions([]);
      setDrupalWorkTypes([]);
      setSkills([]);
      setResumeFile(null);
      setResumeError(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setStatus("Something went wrong. Please try again or email kris@krischase.com");
      setStatusKind("error");
      console.error("Drupal candidate submit error:", message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative mx-auto w-full max-w-6xl px-6 sm:px-8 md:px-10 lg:px-12 pt-32 sm:pt-40 md:pt-44 pb-16 sm:pb-20">
      {/* Hero */}
      <section className="mb-10 sm:mb-12 md:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Drupal Candidate Intake
        </h1>
        <p className="mt-4 max-w-3xl text-base sm:text-lg leading-relaxed text-muted-foreground">
          Interested in working on Drupal projects? Please fill out this form to help us understand
          your experience and availability. We&apos;ll review your submission and reach out if there&apos;s a
          good fit.
        </p>
      </section>

      {/* Form */}
      <section>
        <div className="rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white/60 dark:bg-black/60 backdrop-blur-sm shadow-sm p-5 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Basic Information */}
            <div className="space-y-5">
              <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">
                Basic Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Jane Doe"
                    className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-[#96442e]/40"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-[#96442e]/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-muted-foreground mb-1">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    required
                    placeholder="City, Country"
                    className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-[#96442e]/40"
                  />
                </div>
                <div>
                  <label htmlFor="timezone" className="block text-sm font-medium text-muted-foreground mb-1">
                    Timezone <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="timezone"
                    name="timezone"
                    type="text"
                    required
                    placeholder="e.g., PST, EST, UTC"
                    className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-[#96442e]/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="linkedin_url" className="block text-sm font-medium text-muted-foreground mb-1">
                    LinkedIn URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="linkedin_url"
                    name="linkedin_url"
                    type="url"
                    required
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-[#96442e]/40"
                  />
                </div>
                <div>
                  <label htmlFor="portfolio_url" className="block text-sm font-medium text-muted-foreground mb-1">
                    Portfolio URL
                  </label>
                  <input
                    id="portfolio_url"
                    name="portfolio_url"
                    type="url"
                    placeholder="https://yourportfolio.com"
                    className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-[#96442e]/40"
                  />
                </div>
              </div>
            </div>

            {/* Drupal Experience */}
            <div className="space-y-5 pt-5 border-t border-border">
              <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">
                Drupal Experience
              </h2>

              <div>
                <label htmlFor="years_experience" className="block text-sm font-medium text-muted-foreground mb-1">
                  Years of Drupal Experience <span className="text-red-500">*</span>
                </label>
                <input
                  id="years_experience"
                  name="years_experience"
                  type="number"
                  required
                  min="0"
                  step="0.5"
                  placeholder="5"
                  className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-[#96442e]/40"
                />
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Drupal Versions Worked With <span className="text-red-500">*</span>
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {["7", "8", "9", "10"].map((version) => (
                    <label
                      key={version}
                      className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm cursor-pointer select-none hover:bg-muted/40"
                    >
                      <input
                        type="checkbox"
                        value={version}
                        checked={drupalVersions.includes(version)}
                        onChange={() => toggleArrayValue(drupalVersions, setDrupalVersions, version)}
                        className="accent-[#96442e]"
                      />
                      <span>Drupal {version}</span>
                    </label>
                  ))}
                </div>
                <input type="hidden" name="drupal_versions" value={drupalVersions.join(",")} />
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Types of Drupal Work <span className="text-red-500">*</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { value: "theming", label: "Theming" },
                    { value: "backend", label: "Backend Development" },
                    { value: "modules", label: "Custom Modules" },
                    { value: "site_builds", label: "Site Builds" },
                    { value: "cms_workflows", label: "CMS Workflows" },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm cursor-pointer select-none hover:bg-muted/40"
                    >
                      <input
                        type="checkbox"
                        value={opt.value}
                        checked={drupalWorkTypes.includes(opt.value)}
                        onChange={() => toggleArrayValue(drupalWorkTypes, setDrupalWorkTypes, opt.value)}
                        className="accent-[#96442e]"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
                <input type="hidden" name="drupal_work_types" value={drupalWorkTypes.join(",")} />
              </div>

              <div>
                <label htmlFor="relevant_project_url" className="block text-sm font-medium text-muted-foreground mb-1">
                  Link to Most Relevant Project <span className="text-red-500">*</span>
                </label>
                <input
                  id="relevant_project_url"
                  name="relevant_project_url"
                  type="url"
                  required
                  placeholder="https://example.com/project"
                  className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-[#96442e]/40"
                />
              </div>

              <div>
                <label htmlFor="biggest_challenge" className="block text-sm font-medium text-muted-foreground mb-1">
                  Biggest Challenge Solved in Drupal <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="biggest_challenge"
                  name="biggest_challenge"
                  rows={5}
                  required
                  placeholder="Describe a significant challenge you solved while working with Drupal..."
                  className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-[#96442e]/40"
                />
              </div>
            </div>

            {/* Skills & Availability */}
            <div className="space-y-5 pt-5 border-t border-border">
              <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">
                Skills & Availability
              </h2>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Skills <span className="text-red-500">*</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { value: "cro", label: "CRO" },
                    { value: "analytics_tagging", label: "Analytics/Tagging" },
                    { value: "ga4_gtm", label: "GA4/GTM" },
                    { value: "form_integrations", label: "Form Integrations" },
                    { value: "decoupled_drupal", label: "Decoupled Drupal" },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm cursor-pointer select-none hover:bg-muted/40"
                    >
                      <input
                        type="checkbox"
                        value={opt.value}
                        checked={skills.includes(opt.value)}
                        onChange={() => toggleArrayValue(skills, setSkills, opt.value)}
                        className="accent-[#96442e]"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
                <input type="hidden" name="skills" value={skills.join(",")} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="hourly_rate" className="block text-sm font-medium text-muted-foreground mb-1">
                    Hourly Rate <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="hourly_rate"
                    name="hourly_rate"
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    placeholder="75.00"
                    className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-[#96442e]/40"
                  />
                </div>
                <div>
                  <label htmlFor="weekly_availability" className="block text-sm font-medium text-muted-foreground mb-1">
                    Weekly Availability (hours) <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="weekly_availability"
                    name="weekly_availability"
                    type="number"
                    required
                    min="0"
                    max="168"
                    placeholder="40"
                    className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-[#96442e]/40"
                  />
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Can Start Dec 1? <span className="text-red-500">*</span>
                </p>
                <div className="flex gap-4">
                  <label className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 cursor-pointer select-none hover:bg-muted/40">
                    <input
                      type="radio"
                      name="can_start_dec1"
                      value="yes"
                      required
                      className="accent-[#96442e]"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 cursor-pointer select-none hover:bg-muted/40">
                    <input
                      type="radio"
                      name="can_start_dec1"
                      value="no"
                      required
                      className="accent-[#96442e]"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="resume" className="block text-sm font-medium text-muted-foreground mb-1">
                  Resume (PDF only) <span className="text-red-500">*</span>
                </label>
                <input
                  id="resume"
                  name="resume"
                  type="file"
                  accept=".pdf,application/pdf"
                  required
                  onChange={handleFileChange}
                  className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-[#96442e]/40 file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#96442e] file:text-white hover:file:bg-[#96442e]/90"
                />
                {resumeError && <p className="mt-1 text-sm text-red-500">{resumeError}</p>}
                {resumeFile && !resumeError && (
                  <p className="mt-1 text-sm text-green-600 dark:text-green-400">
                    ✓ {resumeFile.name} ({(resumeFile.size / 1024).toFixed(2)} KB)
                  </p>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-between gap-4 pt-5 border-t border-border">
              <p className="text-sm text-muted-foreground">
                We&apos;ll review your submission and reach out if there&apos;s a good fit.
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-lg bg-white text-black hover:bg-black hover:text-white border border-black px-5 py-3 font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>

            {/* Status Messages */}
            {status && (
              <div
                className={`rounded-lg p-4 ${
                  statusKind === "success"
                    ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800"
                    : "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800"
                }`}
              >
                <p className="text-sm font-medium">{status}</p>
              </div>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}

