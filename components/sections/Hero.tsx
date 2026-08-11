"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import GlowButton from "@/components/ui/GlowButton";

const SceneShell = dynamic(() => import("@/components/three/SceneShell"), { ssr: false });

const headline = "Padmashree M P".split("");

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <SceneShell />
      <div className="noise absolute inset-0 pointer-events-none z-[1]" />

      <div className="relative z-10 px-6 max-w-5xl w-full text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs sm:text-sm font-display uppercase tracking-[0.4em] text-muted"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-acid mr-2 align-middle animate-pulse-glow" />
          Aspiring AI/ML Engineer · CSE Student
        </motion.p>

        <h1
          id="hero-title"
          className="mt-6 font-display font-display text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-tight"
        >
          <span className="sr-only">Padmashree M P</span>
          <span aria-hidden className="inline-block">
            {headline.map((ch, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.05 * i, duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
                className={
                  ch === " " ? "mx-2" : "text-gradient"
                }
              >
                {ch}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-6 text-base sm:text-lg text-ink/80 max-w-2xl mx-auto"
        >
          Computer Science & Engineering student passionate about AI, Machine Learning, Python, and building intelligent real-world applications.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <GlowButton href="#projects" variant="magenta">View My Projects →</GlowButton>
          <GlowButton href="#contact" variant="cyan">Contact Me</GlowButton>
          <GlowButton href="#contact" variant="acid">Download Resume</GlowButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-16 inline-flex flex-col items-center gap-2 text-muted text-xs uppercase tracking-widest"
        >
          <span>Scroll</span>
          <span aria-hidden className="block w-px h-10 bg-gradient-to-b from-cyan to-transparent animate-data-stream" />
        </motion.div>
      </div>
    </section>
  );
}
