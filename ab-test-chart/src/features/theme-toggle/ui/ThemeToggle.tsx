import React from "react";
import type { Theme } from "../../../shared/types";

interface ThemeToggleProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  onThemeChange,
}) => {
  const isDark =
    theme === "dark" ||
    (theme === "auto" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <>
      <label className="mr-4px">
        Toggle theme:
        <select
          value={theme}
          onChange={(e) => onThemeChange(e.target.value as Theme)}
          className={`px-3 py-1.5 rounded border text-sm ${
            isDark
              ? "bg-gray-700 text-white border-gray-600"
              : "bg-white text-gray-800 border-gray-300"
          }`}
          style={{ colorScheme: isDark ? "dark" : "light" }}
        >
          <option value="light">☀️ Light</option>
          <option value="dark">🌙 Dark</option>
          <option value="auto">🔄 Auto</option>
        </select>
      </label>
    </>
  );
};
