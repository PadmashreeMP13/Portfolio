import Link from "next/link";

const socials = [
  { href: "YOUR_GITHUB_URL_HERE", label: "GitHub", icon: "GH" },
  { href: "YOUR_LINKEDIN_URL_HERE", label: "LinkedIn", icon: "LI" },
  { href: "mailto:YOUR_EMAIL_HERE", label: "Email", icon: "@" },
];

export default function Footer() {
  return (
    <footer role="contentinfo" className="relative z-10 mt-24 border-t border-white/5 bg-black/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl text-gradient">PADMASHREE M P</p>
          <p className="mt-2 text-sm text-muted">
            Computer Science and Engineering student building AI/ML solutions, web applications, and practical software projects.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-muted">Quick links</p>
          <ul className="mt-3 space-y-1 text-sm">
            {["/", "/about", "/experience", "/skills", "/education", "/contact"].map((href) => (
              <li key={href}>
                <Link href={href} className="text-ink hover:text-cyan transition">
                  {href === "/" ? "Home" : href.replace("/", "").replace(/^./, (c) => c.toUpperCase())}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-muted">Social</p>
          <ul className="mt-3 flex flex-wrap gap-3">
            {socials.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="group inline-flex items-center justify-center h-10 w-10 rounded border border-white/10 bg-black/40 hover:shadow-glow-cyan transition focus-visible:ring-cyan"
                >
                  <span className="text-sm font-display tracking-widest text-muted group-hover:text-cyan">
                    {s.icon}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between text-xs text-muted">
          <p>© {new Date().getFullYear()} Padmashree M P · All rights reserved.</p>
          <p>Built for AI/ML learning and projects.</p>
        </div>
      </div>
    </footer>
  );
}
