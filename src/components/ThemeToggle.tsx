"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const themeStorageKey = "torus-theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return "light";
    }

    return window.localStorage.getItem(themeStorageKey) === "dark" ? "dark" : "light";
  });
  const isDark = theme === "dark";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const toggleTheme = () => {
    const nextTheme: Theme = isDark ? "light" : "dark";

    window.localStorage.setItem(themeStorageKey, nextTheme);
    setTheme(nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className="group relative inline-flex size-8 items-center justify-center rounded-[2px] border border-[var(--line)] text-[var(--ink-soft)] transition-colors duration-200 hover:border-[var(--line-strong)] hover:text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--signal)]"
    >
      <Sun
        aria-hidden="true"
        className={`absolute size-3.5 transition-all duration-200 ${
          isDark ? "scale-100 rotate-45 opacity-100" : "scale-75 -rotate-45 opacity-0"
        }`}
      />
      <Moon
        aria-hidden="true"
        className={`absolute size-3.5 transition-all duration-200 ${
          isDark ? "scale-75 rotate-45 opacity-0" : "scale-100 rotate-0 opacity-100"
        }`}
      />
    </button>
  );
}
