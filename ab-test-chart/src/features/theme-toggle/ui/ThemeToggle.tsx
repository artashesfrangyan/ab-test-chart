import React from "react";
import type { Theme } from "@shared/types";
import styles from "./ThemeToggle.module.css";

interface ThemeToggleProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  onThemeChange,
}) => {
  const isDark = theme === "dark" || (theme === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <div className={styles.container}>
      <label className={styles.label}>Theme</label>
      <select
        value={theme}
        onChange={(e) => onThemeChange(e.target.value as Theme)}
        className={`${styles.select} ${isDark ? styles.dark : styles.light}`}
        style={{ colorScheme: isDark ? "dark" : "light" }}
      >
        <option value="light">☀️ Light</option>
        <option value="dark">🌙 Dark</option>
        <option value="auto">🔄 Auto</option>
      </select>
    </div>
  );
};
