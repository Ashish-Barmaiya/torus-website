"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Check initial preference from localStorage or prefers-color-scheme
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = savedTheme === "dark" || (!savedTheme && systemPrefersDark);
    
    if (isDark) {
      document.documentElement.classList.add("dark");
      requestAnimationFrame(() => {
        setTheme("dark");
      });
    } else {
      document.documentElement.classList.remove("dark");
      requestAnimationFrame(() => {
        setTheme("light");
      });
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center justify-center rounded-md p-2 text-text-secondary hover:bg-background-subtle hover:text-text-primary transition-all focus:outline-none focus:ring-2 focus:ring-accent-focus focus:ring-offset-2 focus:ring-offset-canvas"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
}
