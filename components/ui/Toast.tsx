"use client";
import { AnimatePresence, motion } from "framer-motion";

type Toast = { kind: "success" | "error"; message: string } | null;
export default function Toast({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
          role="status"
          aria-live="polite"
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] px-5 py-3 rounded-md border ${
            toast.kind === "success"
              ? "border-acid/60 text-acid shadow-glow-acid"
              : "border-magenta/60 text-magenta shadow-glow"
          } bg-black/70 backdrop-blur`}
        >
          <div className="flex items-center gap-3">
            <span aria-hidden>{toast.kind === "success" ? "✓" : "✕"}</span>
            <p className="text-sm">{toast.message}</p>
            <button
              onClick={onClose}
              className="ml-2 text-muted hover:text-ink text-xs"
              aria-label="Dismiss notification"
            >
              Dismiss
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
