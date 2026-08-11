"use client";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Slick page-transition wrapper. Uses AnimatePresence (App Router-compatible).
// Curtain slides up on enter, content fades. Includes an animated noise overlay.

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [intro, setIntro] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIntro(false), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Rave curtain — runs once on first paint, travels up and out */}
      <AnimatePresence>
        {intro && (
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: "-100%" }}
            transition={{ duration: 0.85, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-[90] pointer-events-none"
            style={{
              background:
                "radial-gradient(at 30% 50%, rgba(255,0,229,0.55), transparent 40%), radial-gradient(at 70% 50%, rgba(0,255,242,0.45), transparent 40%), linear-gradient(180deg,#0a0a0f,#11111a)",
            }}
          >
            <div className="absolute inset-0 grid place-items-center">
              <p className="font-display text-3xl md:text-5xl tracking-widest text-gradient animate-flicker">
                PADMASHREE
              </p>
            </div>
            <div className="absolute inset-0 noise" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
