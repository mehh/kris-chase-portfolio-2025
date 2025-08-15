"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useMachineSlice } from "./machine/MachineViewProvider";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const desktopLinks = [
    { label: "Home", href: "/" },
    { label: "How I Operate", href: "/how-i-operate" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Resume", href: "/resume" },
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
      { label: "Book Call", href: "/contact" },
    ]
      .map((i) => `- [${i.label}](${i.href})`)
      .join("\n"),
  });

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  const mobileMenuStyle = useMemo<React.CSSProperties>(() => ({
    clipPath: open ? "inset(0% 0% 0%)" : "inset(0% 0% 100%)",
    opacity: open ? 1 : 0,
    visibility: open ? "visible" : "hidden",
    transition: "clip-path .6s cubic-bezier(.19,1,.22,1), opacity .3s ease",
  }), [open]);

  const closeMobile = () => setOpen(false);

  return (
    <header className="site-header" data-v-6b95401f>
      <div className="site-container" data-v-6b95401f>
        <div className="site-grid | w-full mx-auto">
          <div className="inner" data-v-6b95401f data-open={open ? "true" : "false"}>
            <nav className="nav | font-nav" data-v-6b95401f>
              <ul data-v-6b95401f>
                {desktopLinks.map((item) => (
                  <li key={item.href} data-v-6b95401f>
                    <Link href={item.href} className={item.label === 'Get in Touch' ? 'cta-link' : ''} data-v-6b95401f>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <button
              onClick={() => setOpen(v => !v)}
              className={`toggle-mobile-menu-button | label-6${open ? " active" : ""}`}
              aria-label="Toggle menu"
              aria-expanded={open}
              aria-haspopup="true"
              aria-controls="mobile-menu"
              data-v-6b95401f
            >
              <span className="wrapper" data-v-6b95401f>
                <span className="hl --1 t" data-v-6b95401f></span>
                <span className="hl --2 t" data-v-6b95401f></span>
                <span className="cl --1 t" data-v-6b95401f>
                  <span className="cli --g t" data-v-6b95401f></span>
                  <span className="cli t" data-v-6b95401f></span>
                </span>
                <span className="cl --2 t" data-v-6b95401f>
                  <span className="cli --g t" data-v-6b95401f></span>
                  <span className="cli t" data-v-6b95401f></span>
                </span>
              </span>
            </button>
          </div>
          <div className="mobile-menu" data-v-6b95401f style={mobileMenuStyle}>
            <nav id="mobile-menu" className="mobile-menu-items | menu-typo" aria-hidden={!open} data-v-6b95401f>
              <ul data-v-6b95401f>
                {desktopLinks.map((item) => (
                  <li key={`m-${item.href}`} data-v-6b95401f aria-label={item.label}>
                    <div style={{ position: 'relative', display: 'block', textAlign: 'center' }}>
                      <Link onClick={closeMobile} href={item.href} className={item.label === 'Get in Touch' ? 'mobile-menu-button' : ''} data-v-6b95401f>
                        {item.label}
                      </Link>
                    </div>
                  </li>
                ))}
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
        .site-header[data-v-6b95401f] .site-grid { align-items: center; grid-template-rows: 8px auto 8px calc(100dvh - 10rem); grid-template-rows: 8px auto 8px calc(var(--dvh, 1dvh)*100 - 10rem) }
        .site-container[data-v-6b95401f] { padding: 0 8px }
        .site-grid { display: grid; grid-template-columns: 8px 1fr 8px }
        .site-header a[data-v-6b95401f], .site-header button[data-v-6b95401f] { pointer-events: auto; transition: color .3s var(--ease-out) }
        header .inner[data-v-6b95401f] { background-color: #0000004d }
        .inner[data-v-6b95401f] { align-items: center; -webkit-backdrop-filter: blur(30px); backdrop-filter: blur(30px); border: 1px solid #ffffff1a; border-radius: 8px; display: grid; grid-column: 1/-1; grid-row: 2; grid-template-areas: "a b"; padding: 1.25rem 1.625rem; place-self: start stretch; position: relative; z-index: 1 }
        .logo-link[data-v-6b95401f] { grid-area: a; justify-self: start }
        .logo[data-v-6b95401f] { color: var(--c-white); width: 6rem }
        .nav[data-v-6b95401f] { grid-area: b; justify-self: end }
        .nav ul[data-v-6b95401f] { align-items: center; display: flex; gap: 1.6875rem; list-style-type: none; margin: 0; padding: 0 }
        .nav a[data-v-6b95401f] { color: currentColor; padding: 1em 0; position: relative; text-decoration: none }
        .nav .cta-link[data-v-6b95401f] { background: var(--c-lime); color: #ffffff; padding: .55em 1em; border-radius: 9999px; font-weight: 700; border: 1px solid #ffffffb3; box-shadow: 0 0 0 0 rgba(191, 255, 0, 0.4); transition: box-shadow .4s ease, transform .2s ease }
        .nav .cta-link[data-v-6b95401f]:hover { transform: translateY(-1px); box-shadow: 0 0 0 6px rgba(191, 255, 0, 0.12) }
        .nav a[data-v-6b95401f]:after { background-color: var(--c-lime); bottom: .21875rem; content: ""; height: .3125rem; left: 50%; opacity: 0; position: absolute; transform: translate(-50%) scale(0); transform-origin: center; transition: transform 1s cubic-bezier(.075,.82,.165,1), opacity .3s cubic-bezier(.39,.575,.565,1); width: .3125rem; will-change: transform }
        .nav a[data-v-6b95401f]:is(:hover, :focus-visible, .router-link-active) { color: var(--c-lime) }
        .toggle-mobile-menu-button[data-v-6b95401f] { box-sizing: content-box; height: 1.5rem; justify-self: end; overflow: hidden; padding: 0; position: relative; touch-action: none; -webkit-user-select: none; -moz-user-select: none; user-select: none; width: 1.5rem; background: transparent; border: 0; appearance: none; -webkit-appearance: none; border-radius: 0; line-height: 0 }
        .toggle-mobile-menu-button .wrapper[data-v-6b95401f] { display: block; height: 100%; position: relative; width: 100% }
        .toggle-mobile-menu-button .t[data-v-6b95401f] { display: block; height: 2px; left: 0; position: absolute; top: 0; width: 100% }
        .toggle-mobile-menu-button .hl[data-v-6b95401f] { background: #fff; top: .4375rem; transition: transform 1s cubic-bezier(.19,1,.22,1) .2s, opacity .2s cubic-bezier(.39,.575,.565,1) .2s }
        .toggle-mobile-menu-button .hl.--2[data-v-6b95401f] { top: .9375rem }
        .toggle-mobile-menu-button .cl[data-v-6b95401f] { rotate: -45deg; top: calc(50% - 1px); transform-origin: center center; transition: rotate 1s cubic-bezier(.19,1,.22,1) 0s, opacity .2s cubic-bezier(.39,.575,.565,1) .1s }
        .toggle-mobile-menu-button .cl.--2[data-v-6b95401f] { rotate: 45deg }
        .toggle-mobile-menu-button .cl.--2 .cli[data-v-6b95401f] { transform-origin: right center }
        .toggle-mobile-menu-button .cl .cli[data-v-6b95401f] { background: #fff; scale: 0 1; transform-origin: right center; transition: scale .3s cubic-bezier(.47,0,.745,.715) }
        .toggle-mobile-menu-button.active .cl[data-v-6b95401f] { opacity: 1; transition: rotate .7s cubic-bezier(.785,.135,.15,.86) .3s, opacity .2s cubic-bezier(.39,.575,.565,1) .2s }
        .toggle-mobile-menu-button.active .cl.--2 .cli[data-v-6b95401f] { transition: scale 1s cubic-bezier(.19,1,.22,1) .35s }
        .toggle-mobile-menu-button.active .cl.--2 .cli.--g[data-v-6b95401f] { background: var(--c-lime); transition: scale 1s cubic-bezier(.19,1,.22,1) .2s }
        .toggle-mobile-menu-button.active .cl .cli[data-v-6b95401f] { scale: 1 1; transition: scale 1s cubic-bezier(.19,1,.22,1) .45s }
        .toggle-mobile-menu-button.active .cl .cli.--g[data-v-6b95401f] { background: var(--c-lime); transition: scale 1s cubic-bezier(.19,1,.22,1) .3s }
        .toggle-mobile-menu-button.active .hl[data-v-6b95401f] { opacity: 0; transform: translate3d(105%,0,0); transition: transform .3s cubic-bezier(.445,.05,.55,.95), opacity .2s cubic-bezier(.445,.05,.55,.95) .1s }
        .toggle-mobile-menu-button.active .hl.--2[data-v-6b95401f] { transform: translate3d(-105%,0,0) }
        .mobile-menu[data-v-6b95401f] { -webkit-backdrop-filter: blur(50px); backdrop-filter: blur(50px); background: #0000004d; border-radius: 8px; display: grid; grid-column: 1/-1; grid-row: 1/5; grid-template-areas: ". " "a" "b"; grid-template-columns: 1fr; grid-template-rows: 4rem 1fr auto; height: auto; height: 90svh; height: calc(var(--svh, 1svh)*90); margin: 0 -8px; overflow: hidden; padding: 2.051vw; place-self: start stretch; visibility: hidden }
        .mobile-menu .router-link-active[data-v-6b95401f] { opacity: .35 }
        .mobile-menu-items[data-v-6b95401f] { grid-area: a; padding: 1rem 0; place-self: center stretch; text-align: center }
        .mobile-menu-items ul[data-v-6b95401f] { display: flex; flex-direction: column; gap: 3.846vw 0 }
        .mobile-menu-items ul li[data-v-6b95401f] { overflow: hidden }
        .mobile-menu-items ul[data-v-6b95401f] .--char { opacity: 0; will-change: opacity, transform }
        .mobile-menu-button[data-v-6b95401f] { background-color: #fff3; border-radius: 8px; color: var(--c-white); font-family: var(--font-mono); font-weight: 700; padding: 2.2em; text-align: center; text-transform: uppercase; width: 100% }
        .mobile-menu-items a[data-v-6b95401f] { color: var(--c-white); text-decoration: none; display: inline-block; padding: .75rem 0; font-size: clamp(1.125rem, 5vw, 1.75rem); font-weight: 600 }
        @media (min-width: 1024px) {
          .site-header[data-v-6b95401f] { inset: 2.875rem 0 auto }
          .site-header[data-v-6b95401f] .site-grid { grid-template-rows: auto }
          .site-grid { grid-template-columns: 1fr min(1200px, 92vw) 1fr }
          header .inner[data-v-6b95401f] { background-color: #0000004d }
          .inner[data-v-6b95401f] { grid-column: 2/-2; grid-row: 1; padding: 1.125rem 1.5rem; place-self: center }
          .logo[data-v-6b95401f] { width: 7rem }
          .mobile-menu[data-v-6b95401f], .toggle-mobile-menu-button[data-v-6b95401f] { display: none }
        }
        @media (max-width: 1023px) {
          .nav[data-v-6b95401f] { display: none }
          .toggle-mobile-menu-button[data-v-6b95401f] { position: absolute; top: .75rem; right: .75rem; z-index: 2 }
          .inner[data-v-6b95401f] { justify-self: end; align-self: start; padding-right: 2.5rem }
          /* tighter capsule when menu is closed */
          .inner[data-open="false"][data-v-6b95401f] { max-width: 140px; padding: .75rem 2.25rem .75rem 1rem }
          /* allow natural/full width when menu is open */
          .inner[data-open="true"][data-v-6b95401f] { max-width: none }
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
