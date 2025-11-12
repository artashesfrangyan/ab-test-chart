import React from "react";
import type { LineStyle, Theme } from "../../../shared/types";

interface LineStyleSelectorProps {
  lineStyle: LineStyle;
  onLineStyleChange: (style: LineStyle) => void;
  theme: Theme;
}

export const LineStyleSelector: React.FC<LineStyleSelectorProps> = ({
  lineStyle,
  onLineStyleChange,
  theme,
}) => {
  const styles: { value: LineStyle; label: string }[] = [
    { value: "line", label: "Line" },
    { value: "smooth", label: "Smooth" },
    { value: "area", label: "Area" },
  ];

  return (
    <select
      value={lineStyle}
      onChange={(e) => onLineStyleChange(e.target.value as LineStyle)}
      className={`px-4 py-2 rounded border ${
        theme === "dark"
          ? "bg-gray-700 text-white border-gray-600"
          : "bg-white text-gray-800 border-gray-300"
      }`}
    >
      {styles.map((style) => (
        <option key={style.value} value={style.value}>
          {style.label}
        </option>
      ))}
    </select>
  );
};
