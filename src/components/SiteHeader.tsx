"use client";
import Link from "next/link";
import { useMachineSlice } from "./machine/MachineViewProvider";
import { capture } from "@/lib/posthog/client";

export default function SiteHeader() {
  const desktopLinks = [
    { label: "Home", href: "/" },
    { label: "How I Operate", href: "/how-i-operate" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Resume", href: "/resume" },
    { label: "Tools", href: "https://exec-tech.tools", external: true },
    { label: "Get in Touch", href: "/contact" },
  ];
  // Register navigation for Machine View (markdown-friendly)
  useMachineSlice({
    type: "nav",
    title: "Navigation",
    path: "global",
    order: 5,
    content: [
      ...desktopLinks,
    ]
      .map((i) => `- [${i.label}](${i.href})`)
      .join("\n"),
  });

  return (
    <header className="site-header" data-v-6b95401f>
      <div className="site-container" data-v-6b95401f>
        <div className="site-grid | w-full mx-auto">
          <div className="inner" data-v-6b95401f>
            <nav className="nav | font-nav" data-v-6b95401f>
              <ul data-v-6b95401f>
                {desktopLinks.map((item) => {
                  const isCTA = item.label === 'Get in Touch';
                  const handleClick = () => {
                    try {
                      if (isCTA) {
                        capture("nav_cta_clicked", {
                          label: item.label,
                          href: item.href,
                          is_external: item.external || false,
                        });
                      } else {
                        capture("nav_link_clicked", {
                          label: item.label,
                          href: item.href,
                          is_external: item.external || false,
                        });
                      }
                    } catch {}
                  };
                  
                  return (
                    <li key={item.href} data-v-6b95401f>
                      {item.external ? (
                        <a 
                          href={item.href} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={handleClick}
                          className={isCTA ? 'cta-link' : ''} 
                          data-v-6b95401f
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link 
                          href={item.href} 
                          onClick={handleClick}
                          className={isCTA ? 'cta-link' : ''} 
                          data-v-6b95401f
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Global styles copied from reference */}
      <style jsx global>{`
        @keyframes color-transition-6b95401f {
          0% { color: var(--c-light-light-gray) }
          30% { color: var(--c-lime) }
          to { color: var(--c-dark-green) }
        }
        .site-header[data-v-6b95401f] { color: var(--c-white); inset: 1.5625rem 0 auto; pointer-events: none; position: fixed; z-index: 100 }
        .site-header[data-v-6b95401f] .site-grid { align-items: center; grid-template-rows: auto }
        .site-container[data-v-6b95401f] { padding: 0 8px }
        .site-grid { display: grid; grid-template-columns: 8px 1fr 8px }
        .site-header a[data-v-6b95401f], .site-header button[data-v-6b95401f] { pointer-events: auto; transition: color .3s var(--ease-out) }
        header .inner[data-v-6b95401f] { background-color: #0000004d }
        .inner[data-v-6b95401f] { align-items: center; -webkit-backdrop-filter: blur(30px); backdrop-filter: blur(30px); border: 1px solid #ffffff1a; border-radius: 8px; display: grid; grid-column: 1/-1; grid-row: 1; grid-template-areas: "a b"; padding: 1.25rem 1.625rem; place-self: start stretch; position: relative; z-index: 1 }
        .logo-link[data-v-6b95401f] { grid-area: a; justify-self: start }
        .logo[data-v-6b95401f] { color: var(--c-white); width: 6rem }
        .nav[data-v-6b95401f] { grid-area: b; justify-self: end; font-family: var(--font-geist-sans), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 0.875rem; letter-spacing: -0.01em; }
        .nav ul[data-v-6b95401f] { align-items: center; display: flex; gap: 1.25rem; list-style-type: none; margin: 0; padding: 0 }
        .nav a[data-v-6b95401f] { color: currentColor; padding: 0.75em 0; position: relative; text-decoration: none; font-weight: 500; }
        .nav .cta-link[data-v-6b95401f] { background: var(--c-lime); color: #ffffff; padding: .55em 1em; border-radius: 9999px; font-weight: 700; border: 1px solid #ffffffb3; box-shadow: 0 0 0 0 rgba(191, 255, 0, 0.4); transition: box-shadow .4s ease, transform .2s ease }
        .nav .cta-link[data-v-6b95401f]:hover { transform: translateY(-1px); box-shadow: 0 0 0 6px rgba(191, 255, 0, 0.12) }
        .nav a[data-v-6b95401f]:after { background-color: var(--c-lime); bottom: .21875rem; content: ""; height: .3125rem; left: 50%; opacity: 0; position: absolute; transform: translate(-50%) scale(0); transform-origin: center; transition: transform 1s cubic-bezier(.075,.82,.165,1), opacity .3s cubic-bezier(.39,.575,.565,1); width: .3125rem; will-change: transform }
        .nav a[data-v-6b95401f]:is(:hover, :focus-visible, .router-link-active) { color: var(--c-lime) }
        @media (min-width: 1024px) {
          .site-header[data-v-6b95401f] { inset: 1.875rem 0 auto }
          .site-grid { grid-template-columns: 1fr min(1200px, 92vw) 1fr }
          header .inner[data-v-6b95401f] { background-color: #0000004d }
          .inner[data-v-6b95401f] { grid-column: 2/-2; grid-row: 1; padding: 1.125rem 1.5rem; place-self: center }
          .logo[data-v-6b95401f] { width: 7rem }
          .toggle-mobile-menu-button[data-v-6b95401f] { display: none }
        }
        @media (max-width: 1023px) {
          .nav[data-v-6b95401f] { display: none }
          .inner[data-v-6b95401f] { justify-self: end; align-self: start; padding-right: 1rem }
        }
        @media (hover: hover) and (pointer: fine) {
          .logo[data-v-6b95401f] { transition: color .3s var(--ease-out) }
          .logo[data-v-6b95401f]:hover { color: var(--c-lime) }
          .nav a[data-v-6b95401f]:hover:after { opacity: 1; transform: translate(-50%) scale(1.01) }
        }
        @keyframes color-transition-a9452b3a {
          0% { color: var(--c-light-light-gray) }
          30% { color: var(--c-lime) }
          to { color: var(--c-dark-green) }
        }
        .svg-mask[data-v-a9452b3a] { position: relative }
        .svg[data-v-a9452b3a] { height: 100%; left: 0; position: absolute; top: 0; width: 100% }
        .slot[data-v-a9452b3a] { overflow: clip }
        .slot:not(.ssr).use-clip[data-v-a9452b3a] { clip-path: var(--55ec2c90) }
        .slot[data-v-a9452b3a]:not(.ssr):not(.use-clip) { -webkit-mask-image: var(--34f85358); mask-image: var(--34f85358); mask-mode: alpha; -webkit-mask-size: 100% 100%; mask-size: 100% 100% }
      `}</style>
    </header>
  );
}

