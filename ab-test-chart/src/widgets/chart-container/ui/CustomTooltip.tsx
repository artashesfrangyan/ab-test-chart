import React from "react";
import type { Theme, Variation } from "@shared/types";
import styles from "./CustomTooltip.module.css";

interface TooltipPayload {
  dataKey: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
  variations: Variation[];
  theme: Theme;
}

export const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
  variations,
  theme,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className={`${styles.tooltip} ${theme === "dark" ? styles.dark : styles.light}`}>
        <p className={`${styles.date} ${theme === "dark" ? styles.dark : styles.light}`}>
          {new Date(label!).toLocaleDateString()}
        </p>
        <div className={styles.values}>
          {payload.map((entry, index) => {
            const variationId = entry.dataKey.split("_")[0];
            const variation = variations.find(
              (v) => (v.id?.toString() || "0") === variationId
            );

            return (
              <p key={index} className={styles.value} style={{ color: entry.color }}>
                <span>{variation?.name}:</span>
                <span className={styles.valueLabel}>{entry.value?.toFixed(2)}%</span>
              </p>
            );
          })}
        </div>
      </div>
    );
  }
  return null;
};
