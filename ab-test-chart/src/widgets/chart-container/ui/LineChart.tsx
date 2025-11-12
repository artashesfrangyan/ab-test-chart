import React, { useState } from "react";
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
} from "recharts";
import type {
  ProcessedData,
  Variation,
  LineStyle,
  Theme,
} from "../../../shared/types";
import { CustomTooltip } from "./CustomTooltip";
import { getVariationColor } from "../../../shared/lib/utils/data-transform";
import styles from "./LineChart.module.css";

interface LineChartProps {
  data: ProcessedData[];
  variations: Variation[];
  selectedVariations: string[];
  lineStyle: LineStyle;
  theme: Theme;
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  variations,
  selectedVariations,
  lineStyle,
  theme,
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onResetZoom,
}) => {
  const chartData = data;
  const chartWidth = `${100 * zoomLevel}%`;

  const formatXAxis = (value: string) => {
    const date = new Date(value);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const renderLine = (variation: Variation) => {
    const variationId = variation.id?.toString() || "0";
    const color = getVariationColor(variationId);

    if (lineStyle === "area") {
      return (
        <Area
          key={variationId}
          type="monotone"
          dataKey={`${variationId}_rate`}
          stroke={color}
          fill={color}
          fillOpacity={0.3}
          strokeWidth={2}
          name={variation.name}
          isAnimationActive={false}
        />
      );
    }

    return (
      <Line
        key={variationId}
        type={lineStyle === "smooth" ? "monotone" : "linear"}
        dataKey={`${variationId}_rate`}
        stroke={color}
        strokeWidth={2}
        name={variation.name}
        dot={false}
        isAnimationActive={false}
      />
    );
  };

  const selectedVariationsList = variations.filter((v) =>
    selectedVariations.includes(v.id?.toString() || "0")
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.chartContainer}>
        <ResponsiveContainer width={chartWidth} height={400}>
          <ComposedChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme === "dark" ? "#444" : "#eee"}
            />
            <XAxis
              dataKey="date"
              tick={{ fill: theme === "dark" ? "#fff" : "#000" }}
              tickFormatter={formatXAxis}
            />
            <YAxis
              tick={{ fill: theme === "dark" ? "#fff" : "#000" }}
              tickFormatter={(value) => `${value.toFixed(1)}%`}
              domain={[0, "dataMax + 5"]}
            />
            <Tooltip
              content={<CustomTooltip variations={variations} theme={theme} />}
            />
            {selectedVariationsList.map(renderLine)}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className={styles.legendContainer}>
        {selectedVariationsList.map((variation) => {
          const variationId = variation.id?.toString() || "0";
          const color = getVariationColor(variationId);
          return (
            <div key={variationId} className={styles.legendItem}>
              <span
                className={styles.legendColor}
                style={{ backgroundColor: color }}
              />
              <span className={`${styles.legendText} ${theme === "dark" ? styles.dark : styles.light}`}>
                {variation.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
