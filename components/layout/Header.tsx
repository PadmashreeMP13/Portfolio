"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/education", label: "Education" },
  { href: "/projects", label: "Projects" },
  { href: "/certifications", label: "Certifications" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl bg-black/40 border-b border-white/5" : "bg-transparent"
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" aria-label="Home" className="group flex items-center gap-2">
          <span className="relative inline-block w-8 h-8 rounded-full border-glow">
            <span className="absolute inset-1 rounded-full bg-gradient-to-br from-magenta via-uv to-cyan animate-pulse-glow" />
          </span>
          <span className="font-display text-lg tracking-wide text-gradient">PADMASHREE</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-6">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative text-sm uppercase tracking-widest transition ${
                  active ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {l.label}
                <span
                  aria-hidden
                  className={`absolute -bottom-1 left-0 h-px w-full origin-left transform transition-all duration-500 ${
                    active ? "scale-x-100 bg-gradient-to-r from-magenta via-cyan to-acid shadow-glow" : "scale-x-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="md:hidden h-10 w-10 grid place-items-center rounded border border-white/10 bg-black/40"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">Menu</span>
          <span className="relative w-5 h-5">
            <span
              className={`absolute left-0 right-0 h-px bg-cyan transition-all ${open ? "top-2.5 rotate-45" : "top-1"}`}
            />
            <span
              className={`absolute left-0 right-0 h-px bg-magenta transition-all ${open ? "top-2.5 -rotate-45" : "top-4"}`}
            />
          </span>
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        aria-hidden={!open}
        className={`md:hidden overflow-hidden transition-[max-height] duration-500 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="px-6 pb-6 space-y-2 border-t border-white/5 bg-black/60 backdrop-blur-xl">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`block py-2 text-sm uppercase tracking-widest ${
                pathname === l.href ? "text-cyan" : "text-muted hover:text-ink"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
