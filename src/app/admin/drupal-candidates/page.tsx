"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ArrowUpDown, Search, Download, ExternalLink, FileText } from "lucide-react";

type DrupalCandidate = {
  id: number;
  name: string;
  email: string;
  location: string;
  timezone: string;
  linkedin_url: string;
  portfolio_url: string | null;
  years_experience: number;
  drupal_versions: string;
  drupal_work_types: string;
  relevant_project_url: string;
  biggest_challenge: string;
  skills: string;
  hourly_rate: number;
  weekly_availability: number;
  can_start_dec1: boolean;
  resume_url: string;
  user_agent: string | null;
  created_at: string;
};

type SortField = keyof DrupalCandidate | null;
type SortDirection = "asc" | "desc" | null;

export default function AdminDrupalCandidatesPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [candidates, setCandidates] = useState<DrupalCandidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/drupal-candidates?password=${encodeURIComponent(password)}`);
      const json = await res.json();

      if (!res.ok || !json.ok) {
        setError("Invalid password");
        return;
      }

      setIsAuthenticated(true);
      setCandidates(json.data || []);
      // Store password in sessionStorage for subsequent requests
      sessionStorage.setItem("admin_password", password);
    } catch (err) {
      setError("Failed to authenticate");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if already authenticated
    const storedPassword = sessionStorage.getItem("admin_password");
    if (storedPassword) {
      setPassword(storedPassword);
      fetchCandidates(storedPassword);
    }
  }, []);

  const fetchCandidates = async (pwd: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/drupal-candidates?password=${encodeURIComponent(pwd)}`);
      const json = await res.json();

      if (!res.ok || !json.ok) {
        setError("Failed to fetch candidates");
        return;
      }

      setIsAuthenticated(true);
      setCandidates(json.data || []);
    } catch (err) {
      setError("Failed to fetch candidates");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortField(null);
        setSortDirection(null);
      } else {
        setSortDirection("asc");
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredAndSortedCandidates = useMemo(() => {
    let filtered = candidates;

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(term) ||
          c.email.toLowerCase().includes(term) ||
          c.location.toLowerCase().includes(term) ||
          c.drupal_versions.toLowerCase().includes(term) ||
          c.skills.toLowerCase().includes(term)
      );
    }

    // Apply sorting
    if (sortField && sortDirection) {
      filtered = [...filtered].sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];

        if (aVal === null || aVal === undefined) return 1;
        if (bVal === null || bVal === undefined) return -1;

        if (typeof aVal === "string" && typeof bVal === "string") {
          return sortDirection === "asc"
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }

        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
        }

        if (typeof aVal === "boolean" && typeof bVal === "boolean") {
          return sortDirection === "asc"
            ? (aVal === bVal ? 0 : aVal ? 1 : -1)
            : (aVal === bVal ? 0 : aVal ? -1 : 1);
        }

        return 0;
      });
    }

    return filtered;
  }, [candidates, searchTerm, sortField, sortDirection]);

  const exportToCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Location",
      "Timezone",
      "LinkedIn URL",
      "Portfolio URL",
      "Years Experience",
      "Drupal Versions",
      "Drupal Work Types",
      "Relevant Project URL",
      "Biggest Challenge",
      "Skills",
      "Hourly Rate",
      "Weekly Availability",
      "Can Start Dec 1",
      "Resume URL",
      "Created At",
    ];

    const rows = filteredAndSortedCandidates.map((c) => [
      c.name,
      c.email,
      c.location,
      c.timezone,
      c.linkedin_url,
      c.portfolio_url || "",
      c.years_experience,
      c.drupal_versions,
      c.drupal_work_types,
      c.relevant_project_url,
      c.biggest_challenge.replace(/,/g, ";"), // Replace commas in text
      c.skills,
      c.hourly_rate,
      c.weekly_availability,
      c.can_start_dec1 ? "Yes" : "No",
      c.resume_url,
      new Date(c.created_at).toLocaleString(),
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `drupal-candidates-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  if (!isAuthenticated) {
    return (
      <main className="relative mx-auto w-full max-w-2xl px-6 sm:px-8 md:px-10 lg:px-12 pt-32 sm:pt-40 md:pt-44 pb-16 sm:pb-20">
        <div className="rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white/60 dark:bg-black/60 backdrop-blur-sm shadow-sm p-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-4">
            Admin Access
          </h1>
          <p className="text-muted-foreground mb-6">
            Enter the admin password to view Drupal candidates.
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
    <main className="relative mx-auto w-full max-w-7xl px-6 sm:px-8 md:px-10 lg:px-12 pt-32 sm:pt-40 md:pt-44 pb-16 sm:pb-20">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Drupal Candidates
            </h1>
            <p className="mt-2 text-muted-foreground">
              {filteredAndSortedCandidates.length} of {candidates.length} candidates
            </p>
          </div>
          <button
            onClick={exportToCSV}
            className="inline-flex items-center gap-2 rounded-lg bg-white text-black hover:bg-black hover:text-white border border-black px-4 py-2 font-semibold transition-colors duration-200"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, email, location, skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-border bg-transparent pl-10 pr-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-[#96442e]/40"
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white/60 dark:bg-black/60 backdrop-blur-sm shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/40">
              <tr>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/60"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center gap-2">
                    Name
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/60"
                  onClick={() => handleSort("email")}
                >
                  <div className="flex items-center gap-2">
                    Email
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/60"
                  onClick={() => handleSort("location")}
                >
                  <div className="flex items-center gap-2">
                    Location
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/60"
                  onClick={() => handleSort("years_experience")}
                >
                  <div className="flex items-center gap-2">
                    Years Exp
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/60"
                  onClick={() => handleSort("hourly_rate")}
                >
                  <div className="flex items-center gap-2">
                    Rate
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/60"
                  onClick={() => handleSort("can_start_dec1")}
                >
                  <div className="flex items-center gap-2">
                    Start Dec 1
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/60"
                  onClick={() => handleSort("created_at")}
                >
                  <div className="flex items-center gap-2">
                    Submitted
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredAndSortedCandidates.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
                    {candidates.length === 0 ? "No candidates found" : "No candidates match your search"}
                  </td>
                </tr>
              ) : (
                filteredAndSortedCandidates.map((candidate) => (
                  <React.Fragment key={candidate.id}>
                    <tr className="hover:bg-muted/20">
                      <td className="px-4 py-3 text-sm text-foreground font-medium">{candidate.name}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{candidate.email}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{candidate.location}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{candidate.years_experience}</td>
                      <td className="px-4 py-3 text-sm text-foreground">${candidate.hourly_rate}</td>
                      <td className="px-4 py-3 text-sm text-foreground">
                        {candidate.can_start_dec1 ? (
                          <span className="text-green-600 dark:text-green-400">Yes</span>
                        ) : (
                          <span className="text-red-600 dark:text-red-400">No</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {new Date(candidate.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <button
                          onClick={() => setExpandedRow(expandedRow === candidate.id ? null : candidate.id)}
                          className="text-[#96442e] hover:underline"
                        >
                          {expandedRow === candidate.id ? "Hide" : "View"}
                        </button>
                      </td>
                    </tr>
                    {expandedRow === candidate.id && (
                      <tr>
                        <td colSpan={8} className="px-4 py-6 bg-muted/10">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="font-medium text-foreground mb-2">Contact Information</p>
                              <p className="text-muted-foreground">
                                <strong>Timezone:</strong> {candidate.timezone}
                              </p>
                              <p className="text-muted-foreground">
                                <strong>LinkedIn:</strong>{" "}
                                <a
                                  href={candidate.linkedin_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#96442e] hover:underline inline-flex items-center gap-1"
                                >
                                  View Profile <ExternalLink className="w-3 h-3" />
                                </a>
                              </p>
                              {candidate.portfolio_url && (
                                <p className="text-muted-foreground">
                                  <strong>Portfolio:</strong>{" "}
                                  <a
                                    href={candidate.portfolio_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#96442e] hover:underline inline-flex items-center gap-1"
                                  >
                                    View Portfolio <ExternalLink className="w-3 h-3" />
                                  </a>
                                </p>
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-foreground mb-2">Experience</p>
                              <p className="text-muted-foreground">
                                <strong>Drupal Versions:</strong> {candidate.drupal_versions}
                              </p>
                              <p className="text-muted-foreground">
                                <strong>Work Types:</strong> {candidate.drupal_work_types}
                              </p>
                              <p className="text-muted-foreground">
                                <strong>Skills:</strong> {candidate.skills}
                              </p>
                              <p className="text-muted-foreground">
                                <strong>Weekly Availability:</strong> {candidate.weekly_availability} hours
                              </p>
                            </div>
                            <div className="md:col-span-2">
                              <p className="font-medium text-foreground mb-2">Project & Challenge</p>
                              <p className="text-muted-foreground mb-2">
                                <strong>Relevant Project:</strong>{" "}
                                <a
                                  href={candidate.relevant_project_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#96442e] hover:underline inline-flex items-center gap-1"
                                >
                                  View Project <ExternalLink className="w-3 h-3" />
                                </a>
                              </p>
                              <p className="text-muted-foreground">
                                <strong>Biggest Challenge:</strong> {candidate.biggest_challenge}
                              </p>
                            </div>
                            <div className="md:col-span-2">
                              <p className="font-medium text-foreground mb-2">Resume</p>
                              <a
                                href={candidate.resume_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#96442e] hover:underline inline-flex items-center gap-1"
                              >
                                <FileText className="w-4 h-4" />
                                Download Resume <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

