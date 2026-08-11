"use client";
import Link from "next/link";

type Props = {
  href?: string;
  children: React.ReactNode;
  variant?: "magenta" | "cyan" | "acid";
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
};

const glowFor = {
  magenta: "hover:shadow-glow hover:border-magenta",
  cyan: "hover:shadow-glow-cyan hover:border-cyan",
  acid: "hover:shadow-glow-acid hover:border-acid",
};

export default function GlowButton({
  href,
  children,
  variant = "magenta",
  className = "",
  onClick,
  ariaLabel,
}: Props) {
  const cls = `group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-md font-display uppercase tracking-widest text-sm border border-white/15 bg-white/5 transition ${glowFor[variant]} ${className}`;
  if (href) {
    return (
      <Link href={href} aria-label={ariaLabel} className={cls}>
        <span className="absolute inset-0 -z-10 rounded-md opacity-0 group-hover:opacity-100 transition"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }}
        />
        {children}
      </Link>
    );
  }
  return (
    <button onClick={onClick} aria-label={ariaLabel} className={cls}>
      <span className="absolute inset-0 -z-10 rounded-md opacity-0 group-hover:opacity-100 transition"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }}
      />
      {children}
    </button>
  );
}
