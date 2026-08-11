"use client";
import dynamic from "next/dynamic";
import { useReducedMotion } from "@/lib/prefersReducedMotion";

// Dynamic import: fsr=false to keep the WebGL scene off the SSR pass.
// This avoids hydration errors and saves the initial JS bundle.
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center" aria-hidden>
      <div className="h-40 w-40 rounded-full border border-cyan/30 animate-pulse-glow" />
    </div>
  ),
});

export default function SceneShell() {
  const reduced = useReducedMotion();
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden={reduced}>
      {!reduced && <HeroScene />}
    </div>
  );
}
