"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Quote, FileText, MessageCircle, Workflow } from "lucide-react";

// Bottom, centered, rounded glass mobile dock that scrolls with the page
// Shown on small screens only (hidden on md and up)
export default function MobileDockNav() {
  const pathname = usePathname();

  const items = [
    { href: "/", label: "Home", icon: Home },
    { href: "/how-i-operate", label: "Operate", icon: Workflow },
    { href: "/testimonials", label: "Social", icon: Quote },
    { href: "/resume", label: "Resume", icon: FileText },
    { href: "/contact", label: "Contact", icon: MessageCircle },
  ];

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-[998] md:hidden flex items-end justify-center pointer-events-none"
      role="navigation"
    >
      {/* safe-area spacer to ensure the dock never collides with iOS home indicator */}
      <div className="h-[calc(env(safe-area-inset-bottom))] w-full" aria-hidden="true" />
      <div
        className="pointer-events-auto mb-3 rounded-2xl border border-white/15 bg-black/35 text-white shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl supports-[backdrop-filter]:bg-black/30 ring-1 ring-white/10 px-2 py-1.5"
      >
        <ul className="flex items-center gap-1 min-w-[92vw] max-w-[560px]">
          {items.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <li key={item.href} className="flex-1">
                <Link
                  href={item.href}
                  className={
                    "group flex flex-col items-center justify-center gap-1 rounded-xl px-3 py-2 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400/60 " +
                    (active
                      ? "bg-white/15 text-white"
                      : "text-white/80 hover:text-white hover:bg-white/10")
                  }
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  <span className="text-[10px] font-medium leading-none">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
