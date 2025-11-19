"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FileText, Users, MessageCircle, Shield, ArrowRight } from "lucide-react";

export default function AdminDashboardPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Client-side password check (will be verified again on API calls)
    if (typeof window !== "undefined") {
      // Store password in sessionStorage for subsequent requests
      sessionStorage.setItem("admin_password", password);
      setIsAuthenticated(true);
    }
  };

  React.useEffect(() => {
    // Check if already authenticated
    const storedPassword = sessionStorage.getItem("admin_password");
    if (storedPassword) {
      setPassword(storedPassword);
      setIsAuthenticated(true);
    }
  }, []);

  const adminPages = [
    {
      title: "Contact Submissions",
      description: "View and manage contact form submissions",
      href: "/admin/contact",
      icon: MessageCircle,
      color: "bg-blue-500",
    },
    {
      title: "Partner Submissions",
      description: "View and manage partner/freelancer registrations",
      href: "/admin/partners",
      icon: Users,
      color: "bg-green-500",
    },
    {
      title: "Drupal Candidates",
      description: "View and manage Drupal candidate intake submissions",
      href: "/admin/drupal-candidates",
      icon: FileText,
      color: "bg-purple-500",
    },
  ];

  if (!isAuthenticated) {
    return (
      <main className="relative mx-auto w-full max-w-2xl px-6 sm:px-8 md:px-10 lg:px-12 pt-32 sm:pt-40 md:pt-44 pb-16 sm:pb-20">
        <div className="rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white/60 dark:bg-black/60 backdrop-blur-sm shadow-sm p-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-[#96442e]" />
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Admin Dashboard
            </h1>
          </div>
          <p className="text-muted-foreground mb-6">
            Enter the admin password to access the admin dashboard.
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-muted-foreground mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-[#96442e]/40"
                placeholder="Enter admin password"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-lg bg-white text-black hover:bg-black hover:text-white border border-black px-5 py-3 font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Authenticating..." : "Login"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="relative mx-auto w-full max-w-6xl px-6 sm:px-8 md:px-10 lg:px-12 pt-32 sm:pt-40 md:pt-44 pb-16 sm:pb-20">
      <div className="mb-10 sm:mb-12 md:mb-16">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-8 h-8 text-[#96442e]" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Admin Dashboard
          </h1>
        </div>
        <p className="mt-4 max-w-3xl text-base sm:text-lg leading-relaxed text-muted-foreground">
          Manage and view all form submissions from your website. Select a section below to view detailed submissions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminPages.map((page) => {
          const Icon = page.icon;
          return (
            <Link
              key={page.href}
              href={page.href}
              className="group rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white/60 dark:bg-black/60 backdrop-blur-sm shadow-sm p-6 hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${page.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">{page.title}</h2>
              <p className="text-sm text-muted-foreground">{page.description}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-12 rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white/60 dark:bg-black/60 backdrop-blur-sm shadow-sm p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Links</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/contact"
            className="text-sm text-[#96442e] hover:underline"
          >
            Contact Form →
          </Link>
          <Link
            href="/partners"
            className="text-sm text-[#96442e] hover:underline"
          >
            Partner Registration →
          </Link>
          <Link
            href="/drupal-candidate"
            className="text-sm text-[#96442e] hover:underline"
          >
            Drupal Candidate Intake →
          </Link>
        </div>
      </div>
    </main>
  );
}

