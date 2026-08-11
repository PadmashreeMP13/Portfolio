"use client";
import { useEffect, useState } from "react";

// Reads prefers-reduced-motion + a coarse device check so we can downgrade
// the Three.js scene on modest devices.

export function useReducedMotion() {
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mql.matches);
    update();
    mql.addEventListener?.("change", update);
    return () => mql.removeEventListener?.("change", update);
  }, []);

  return reduced;
}

export function useLowPower() {
  const [low, setLow] = useState(true);
  useEffect(() => {
    const cores = navigator.hardwareConcurrency ?? 4;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection?.saveData;
    setLow(saveData === true || cores <= 4 || memory <= 2);
  }, []);
  return low;
}
