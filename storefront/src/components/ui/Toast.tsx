"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE_EMPHASIZED_DECELERATE, EASE_STANDARD } from "@/lib/motion";

type Toast = { id: number; message: string; icon?: string };

const ToastContext = createContext<((message: string, icon?: string) => void) | null>(null);

let nextId = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, icon?: string) => {
    const id = nextId++;
    setToasts((prev) => [...prev, { id, message, icon }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2600);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-20 z-30 flex flex-col items-center gap-2 px-4 sm:bottom-6">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95, transition: { duration: 0.15, ease: EASE_STANDARD } }}
              transition={{ duration: 0.3, ease: EASE_EMPHASIZED_DECELERATE }}
              className="pointer-events-auto flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium shadow-lg"
              style={{
                background: "var(--md-sys-color-inverse-surface)",
                color: "var(--md-sys-color-inverse-on-surface)",
              }}
            >
              {toast.icon && <md-icon style={{ fontSize: "18px" }}>{toast.icon}</md-icon>}
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const showToast = useContext(ToastContext);
  if (!showToast) throw new Error("useToast must be used within a ToastProvider");
  return showToast;
}
