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
        className={`p-3 border rounded shadow-lg ${
          theme === "dark"
            ? "bg-gray-800 border-gray-600 text-white"
            : "bg-white border-gray-200 text-gray-800"
        }`}
      >
        <p className="font-bold mb-2">
          {new Date(label!).toLocaleDateString()}
        </p>
        {payload.map((entry, index) => {
          const variationId = entry.dataKey.split("_")[0];
          const variation = variations.find(
            (v) => (v.id?.toString() || "0") === variationId
          );

          return (
            <p key={index} style={{ color: entry.color }}>
              {variation?.name}: {entry.value?.toFixed(2)}%
            </p>
          );
        })}
      </div>
    );
  }
  return null;
};
