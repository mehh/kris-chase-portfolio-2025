"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ArrowUpDown, Search, Download, ExternalLink } from "lucide-react";

type ContactSubmission = {
  id: number;
  reason: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  persona: string | null;
  persona_fit: boolean | null;
  persona_question: string | null;
  budget: string | null;
  start: string | null;
  role_type: string | null;
  comp_range: string | null;
  advisory_area: string | null;
  user_agent: string | null;
  created_at: string;
};

type SortField = keyof ContactSubmission | null;
type SortDirection = "asc" | "desc" | null;

export default function AdminContactPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
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
      const res = await fetch(`/api/admin/contact?password=${encodeURIComponent(password)}`);
      const json = await res.json();

      if (!res.ok || !json.ok) {
        setError("Invalid password");
        return;
      }

      setIsAuthenticated(true);
      setSubmissions(json.data || []);
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
      fetchSubmissions(storedPassword);
    }
  }, []);

  const fetchSubmissions = async (pwd: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/contact?password=${encodeURIComponent(pwd)}`);
      const json = await res.json();

      if (!res.ok || !json.ok) {
        setError("Failed to fetch submissions");
        return;
      }

      setIsAuthenticated(true);
      setSubmissions(json.data || []);
    } catch (err) {
      setError("Failed to fetch submissions");
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

  const filteredAndSortedSubmissions = useMemo(() => {
    let filtered = submissions;

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(term) ||
          s.email.toLowerCase().includes(term) ||
          s.company?.toLowerCase().includes(term) ||
          s.message.toLowerCase().includes(term) ||
          s.reason.toLowerCase().includes(term) ||
          s.persona?.toLowerCase().includes(term)
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

        if (typeof aVal === "boolean" && typeof bVal === "boolean") {
          return sortDirection === "asc"
            ? (aVal === bVal ? 0 : aVal ? 1 : -1)
            : (aVal === bVal ? 0 : aVal ? -1 : 1);
        }

        return 0;
      });
    }

    return filtered;
  }, [submissions, searchTerm, sortField, sortDirection]);

  const exportToCSV = () => {
    const headers = [
      "ID",
      "Reason",
      "Name",
      "Email",
      "Company",
      "Message",
      "Persona",
      "Persona Fit",
      "Persona Question",
      "Budget",
      "Start Date",
      "Role Type",
      "Comp Range",
      "Advisory Area",
      "Created At",
    ];

    const rows = filteredAndSortedSubmissions.map((s) => [
      s.id,
      s.reason,
      s.name,
      s.email,
      s.company || "",
      (s.message || "").replace(/,/g, ";"), // Replace commas in text
      s.persona || "",
      s.persona_fit === null ? "" : s.persona_fit ? "Yes" : "No",
      (s.persona_question || "").replace(/,/g, ";"),
      s.budget || "",
      s.start || "",
      s.role_type || "",
      s.comp_range || "",
      s.advisory_area || "",
      new Date(s.created_at).toLocaleString(),
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `contact-submissions-${new Date().toISOString().split("T")[0]}.csv`;
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
            Enter the admin password to view contact submissions.
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
              Contact Submissions
            </h1>
            <p className="mt-2 text-muted-foreground">
              {filteredAndSortedSubmissions.length} of {submissions.length} submissions
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
              placeholder="Search by name, email, company, message, reason..."
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
                  onClick={() => handleSort("reason")}
                >
                  <div className="flex items-center gap-2">
                    Reason
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/60"
                  onClick={() => handleSort("persona")}
                >
                  <div className="flex items-center gap-2">
                    Persona
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
              {filteredAndSortedSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                    {submissions.length === 0 ? "No submissions found" : "No submissions match your search"}
                  </td>
                </tr>
              ) : (
                filteredAndSortedSubmissions.map((submission) => (
                  <React.Fragment key={submission.id}>
                    <tr className="hover:bg-muted/20">
                      <td className="px-4 py-3 text-sm text-foreground font-medium">{submission.name}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{submission.email}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{submission.reason}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{submission.persona || "—"}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {new Date(submission.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <button
                          onClick={() => setExpandedRow(expandedRow === submission.id ? null : submission.id)}
                          className="text-[#96442e] hover:underline"
                        >
                          {expandedRow === submission.id ? "Hide" : "View"}
                        </button>
                      </td>
                    </tr>
                    {expandedRow === submission.id && (
                      <tr>
                        <td colSpan={6} className="px-4 py-6 bg-muted/10">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="font-medium text-foreground mb-2">Contact Information</p>
                              <p className="text-muted-foreground">
                                <strong>Email:</strong> {submission.email}
                              </p>
                              {submission.company && (
                                <p className="text-muted-foreground">
                                  <strong>Company:</strong> {submission.company}
                                </p>
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-foreground mb-2">Details</p>
                              <p className="text-muted-foreground">
                                <strong>Reason:</strong> {submission.reason}
                              </p>
                              {submission.persona && (
                                <p className="text-muted-foreground">
                                  <strong>Persona:</strong> {submission.persona}
                                </p>
                              )}
                              {submission.persona_fit !== null && (
                                <p className="text-muted-foreground">
                                  <strong>Persona Fit:</strong> {submission.persona_fit ? "Yes" : "No"}
                                </p>
                              )}
                              {submission.persona_question && (
                                <p className="text-muted-foreground">
                                  <strong>Persona Question:</strong> {submission.persona_question}
                                </p>
                              )}
                            </div>
                            <div className="md:col-span-2">
                              <p className="font-medium text-foreground mb-2">Message</p>
                              <p className="text-muted-foreground whitespace-pre-wrap">{submission.message}</p>
                            </div>
                            {(submission.budget || submission.start || submission.role_type || submission.comp_range || submission.advisory_area) && (
                              <div className="md:col-span-2">
                                <p className="font-medium text-foreground mb-2">Additional Information</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-muted-foreground">
                                  {submission.budget && (
                                    <p><strong>Budget:</strong> {submission.budget}</p>
                                  )}
                                  {submission.start && (
                                    <p><strong>Start Date:</strong> {submission.start}</p>
                                  )}
                                  {submission.role_type && (
                                    <p><strong>Role Type:</strong> {submission.role_type}</p>
                                  )}
                                  {submission.comp_range && (
                                    <p><strong>Comp Range:</strong> {submission.comp_range}</p>
                                  )}
                                  {submission.advisory_area && (
                                    <p><strong>Advisory Area:</strong> {submission.advisory_area}</p>
                                  )}
                                </div>
                              </div>
                            )}
                            {submission.user_agent && (
                              <div className="md:col-span-2">
                                <p className="text-xs text-muted-foreground">
                                  <strong>User Agent:</strong> {submission.user_agent}
                                </p>
                              </div>
                            )}
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

