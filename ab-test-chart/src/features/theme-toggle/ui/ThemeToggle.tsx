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
  return (
    <button
      className={`px-4 py-2 rounded border ${
        theme === "dark"
          ? "bg-gray-700 text-white border-gray-600"
          : "bg-white text-gray-800 border-gray-300"
      }`}
      onClick={() => onThemeChange(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? "Dark" : "Light"} Theme
    </button>
  );
};
