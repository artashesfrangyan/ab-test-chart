import React from "react";
import type { Variation } from "../../../shared/types";

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  variations: Variation[];
  theme: "light" | "dark";
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
      <div
        className="rounded-lg shadow-2xl border-2"
        style={{
          backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
          borderColor: theme === "dark" ? "#4b5563" : "#e5e7eb",
          padding: "12px 16px",
          borderRadius: "8px",
          border: "1px solid grey",
        }}
      >
        <p
          className="font-semibold mb-2 text-sm"
          style={{
            color: theme === "dark" ? "#f3f4f6" : "#111827",
          }}
        >
          {new Date(label!).toLocaleDateString()}
        </p>
        {payload.map((entry, index) => {
          const variationId = entry.dataKey.split("_")[0];
          const variation = variations.find(
            (v) => (v.id?.toString() || "0") === variationId
          );

          return (
            <p
              key={index}
              className="text-sm font-medium"
              style={{ color: entry.color }}
            >
              {variation?.name}: {entry.value?.toFixed(2)}%
            </p>
          );
        })}
      </div>
    );
  }
  return null;
};
