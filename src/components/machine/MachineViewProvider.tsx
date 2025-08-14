"use client";

import React, { createContext, useCallback, useContext, useEffect, useId, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export type MachineMode = "human" | "machine";

export type MachineSliceType =
  | "page"
  | "section"
  | "hero"
  | "nav"
  | "footer"
  | "testimonial"
  | "generic";

export interface MachineSlice {
  id: string; // unique per component instance
  type: MachineSliceType;
  title?: string;
  content: string; // markdown-friendly text
  order?: number; // smaller first
  path?: string; // route association or "global"
  meta?: Record<string, any>;
}

interface MachineViewContextValue {
  mode: MachineMode;
  setMode: (mode: MachineMode) => void;
  toggle: () => void;
  registerSlice: (slice: MachineSlice) => void;
  unregisterSlice: (id: string) => void;
  updateSlice: (id: string, patch: Partial<MachineSlice>) => void;
  getSlices: () => MachineSlice[];
  toMarkdown: () => string;
}

const MachineViewContext = createContext<MachineViewContextValue | null>(null);

const STORAGE_KEY = "kris-machine-view-mode";

export function MachineViewProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mode, setModeState] = useState<MachineMode>(() => {
    if (typeof window === "undefined") return "human";
    const saved = window.localStorage.getItem(STORAGE_KEY) as MachineMode | null;
    return saved === "machine" ? "machine" : "human";
  });

  const [slices, setSlices] = useState<Record<string, MachineSlice>>({});

  const setMode = useCallback((m: MachineMode) => {
    setModeState(m);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, m);
    }
  }, []);

  const toggle = useCallback(() => setMode(prev => (prev === "human" ? "machine" : "human")), [setMode]);

  const registerSlice = useCallback((slice: MachineSlice) => {
    setSlices(prev => ({ ...prev, [slice.id]: slice }));
  }, []);

  const unregisterSlice = useCallback((id: string) => {
    setSlices(prev => {
      if (!(id in prev)) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const updateSlice = useCallback((id: string, patch: Partial<MachineSlice>) => {
    setSlices(prev => ({ ...prev, [id]: { ...prev[id], ...patch } }));
  }, []);

  const getSlices = useCallback(() => Object.values(slices), [slices]);

  // Keyboard shortcut: press "m" to toggle
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "m" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        toggle();
      }
      if (e.key === "Escape" && mode === "machine") {
        setMode("human");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle, mode, setMode]);

  // Prevent page scroll when in machine mode
  useEffect(() => {
    const original = document.body.style.overflow;
    if (mode === "machine") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = original;
    }
    return () => {
      document.body.style.overflow = original;
    };
  }, [mode]);

  const toMarkdown = useCallback(() => {
    const all = Object.values(slices).sort((a, b) => (a.order ?? 1000) - (b.order ?? 1000));
    const now = new Date().toISOString();
    const header = `# Machine View\n\n- Generated: ${now}\n- Path: ${pathname}\n- Mode: ${mode}\n`;
    const body = all
      .map(s => {
        const title = s.title ? `\n\n## ${s.title}` : "\n\n## Section";
        const meta = s.type || s.path ? `\n\n> type: ${s.type}${s.path ? ` | path: ${s.path}` : ""}` : "";
        return `${title}${meta}\n\n${s.content.trim()}`;
      })
      .join("\n\n");
    return `${header}${body}\n`;
  }, [slices, pathname, mode]);

  const value = useMemo<MachineViewContextValue>(
    () => ({ mode, setMode, toggle, registerSlice, unregisterSlice, updateSlice, getSlices, toMarkdown }),
    [mode, setMode, toggle, registerSlice, unregisterSlice, updateSlice, getSlices, toMarkdown]
  );

  return <MachineViewContext.Provider value={value}>{children}</MachineViewContext.Provider>;
}

export function useMachineView() {
  const ctx = useContext(MachineViewContext);
  if (!ctx) throw new Error("useMachineView must be used within MachineViewProvider");
  return ctx;
}

// Helper hook to register/update a slice lifecycle-wise
export function useMachineSlice(input: Omit<MachineSlice, "id"> & { id?: string }, deps: React.DependencyList = []) {
  const { registerSlice, unregisterSlice, updateSlice } = useMachineView();
  const reactId = useId();
  const id = useMemo(() => input.id ?? `slice-${reactId}`, [reactId, input.id]);

  useEffect(() => {
    registerSlice({ ...input, id });
    return () => unregisterSlice(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateSlice(id, { ...input, id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return id;
}
