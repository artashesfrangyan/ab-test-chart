import React from "react";
import type { LineStyle, Theme } from "../../../shared/types";
import styles from "./LineStyleSelector.module.css";

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
  const styleOptions: { value: LineStyle; label: string; icon: string }[] = [
    { value: "line", label: "Line", icon: "📈" },
    { value: "smooth", label: "Smooth", icon: "〰️" },
    { value: "area", label: "Area", icon: "📊" },
  ];

  return (
    <div className={styles.container}>
      <label className={styles.label}>Chart Style</label>
      <select
        value={lineStyle}
        onChange={(e) => onLineStyleChange(e.target.value as LineStyle)}
        className={`${styles.select} ${theme === "dark" ? styles.dark : styles.light}`}
        style={{
          colorScheme: theme === "dark" ? "dark" : "light",
        }}
      >
        {styleOptions.map((style) => (
          <option key={style.value} value={style.value}>
            {style.icon} {style.label}
          </option>
        ))}
      </select>
    </div>
  );
};
