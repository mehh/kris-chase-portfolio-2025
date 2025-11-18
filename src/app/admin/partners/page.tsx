"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ArrowUpDown, Search, Download, ExternalLink } from "lucide-react";

type PartnerSubmission = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  website: string | null;
  offering: string;
  classifications: string;
  notes: string | null;
  user_agent: string | null;
  created_at: string;
};

type SortField = keyof PartnerSubmission | null;
type SortDirection = "asc" | "desc" | null;

export default function AdminPartnersPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [partners, setPartners] = useState<PartnerSubmission[]>([]);
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
      const res = await fetch(`/api/admin/partners?password=${encodeURIComponent(password)}`);
      const json = await res.json();

      if (!res.ok || !json.ok) {
        setError("Invalid password");
        return;
      }

      setIsAuthenticated(true);
      setPartners(json.data || []);
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
      fetchPartners(storedPassword);
    }
  }, []);

  const fetchPartners = async (pwd: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/partners?password=${encodeURIComponent(pwd)}`);
      const json = await res.json();

      if (!res.ok || !json.ok) {
        setError("Failed to fetch partners");
        return;
      }

      setIsAuthenticated(true);
      setPartners(json.data || []);
    } catch (err) {
      setError("Failed to fetch partners");
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

  const filteredAndSortedPartners = useMemo(() => {
    let filtered = partners;

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.email.toLowerCase().includes(term) ||
          p.offering.toLowerCase().includes(term) ||
          p.classifications.toLowerCase().includes(term) ||
          (p.notes && p.notes.toLowerCase().includes(term))
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

        return 0;
      });
    }

    return filtered;
  }, [partners, searchTerm, sortField, sortDirection]);

  const exportToCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Website",
      "Service Offering",
      "Classifications",
      "Notes",
      "Created At",
    ];

    const rows = filteredAndSortedPartners.map((p) => [
      p.name,
      p.email,
      p.phone || "",
      p.website || "",
      p.offering,
      p.classifications,
      (p.notes || "").replace(/,/g, ";"), // Replace commas in text
      new Date(p.created_at).toLocaleString(),
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `partner-submissions-${new Date().toISOString().split("T")[0]}.csv`;
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
            Enter the admin password to view partner submissions.
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
              Partner Submissions
            </h1>
            <p className="mt-2 text-muted-foreground">
              {filteredAndSortedPartners.length} of {partners.length} submissions
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
              placeholder="Search by name, email, offering, classifications..."
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
                  onClick={() => handleSort("offering")}
                >
                  <div className="flex items-center gap-2">
                    Service Offering
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/60"
                  onClick={() => handleSort("classifications")}
                >
                  <div className="flex items-center gap-2">
                    Classifications
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
              {filteredAndSortedPartners.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                    {partners.length === 0 ? "No submissions found" : "No submissions match your search"}
                  </td>
                </tr>
              ) : (
                filteredAndSortedPartners.map((partner) => (
                  <React.Fragment key={partner.id}>
                    <tr className="hover:bg-muted/20">
                      <td className="px-4 py-3 text-sm text-foreground font-medium">{partner.name}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{partner.email}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{partner.offering}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{partner.classifications}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {new Date(partner.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <button
                          onClick={() => setExpandedRow(expandedRow === partner.id ? null : partner.id)}
                          className="text-[#96442e] hover:underline"
                        >
                          {expandedRow === partner.id ? "Hide" : "View"}
                        </button>
                      </td>
                    </tr>
                    {expandedRow === partner.id && (
                      <tr>
                        <td colSpan={6} className="px-4 py-6 bg-muted/10">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="font-medium text-foreground mb-2">Contact Information</p>
                              <p className="text-muted-foreground">
                                <strong>Email:</strong> {partner.email}
                              </p>
                              {partner.phone && (
                                <p className="text-muted-foreground">
                                  <strong>Phone:</strong> {partner.phone}
                                </p>
                              )}
                              {partner.website && (
                                <p className="text-muted-foreground">
                                  <strong>Website:</strong>{" "}
                                  <a
                                    href={partner.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#96442e] hover:underline inline-flex items-center gap-1"
                                  >
                                    {partner.website} <ExternalLink className="w-3 h-3" />
                                  </a>
                                </p>
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-foreground mb-2">Details</p>
                              <p className="text-muted-foreground">
                                <strong>Service Offering:</strong> {partner.offering}
                              </p>
                              <p className="text-muted-foreground">
                                <strong>Classifications:</strong> {partner.classifications}
                              </p>
                              {partner.notes && (
                                <div className="mt-2">
                                  <p className="font-medium text-foreground mb-1">Notes:</p>
                                  <p className="text-muted-foreground whitespace-pre-wrap">{partner.notes}</p>
                                </div>
                              )}
                            </div>
                            {partner.user_agent && (
                              <div className="md:col-span-2">
                                <p className="text-xs text-muted-foreground">
                                  <strong>User Agent:</strong> {partner.user_agent}
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

