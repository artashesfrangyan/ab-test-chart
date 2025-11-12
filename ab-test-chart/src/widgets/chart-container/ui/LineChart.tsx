import React from "react";
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

interface LineChartProps {
  data: ProcessedData[];
  variations: Variation[];
  selectedVariations: string[];
  lineStyle: LineStyle;
  theme: Theme;
  isZoomed: boolean;
  zoomRange?: { start: number; end: number };
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  variations,
  selectedVariations,
  lineStyle,
  theme,
  isZoomed,
  zoomRange,
}) => {
  const chartData =
    isZoomed && zoomRange
      ? data.filter(
          (d) => d.timestamp >= zoomRange.start && d.timestamp <= zoomRange.end
        )
      : data;

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

  return (
    <ResponsiveContainer width="100%" height={400}>
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
          tickFormatter={(value) => new Date(value).toLocaleDateString()}
        />
        <YAxis
          tick={{ fill: theme === "dark" ? "#fff" : "#000" }}
          tickFormatter={(value) => `${value.toFixed(1)}%`}
          domain={[0, "dataMax + 5"]}
        />
        <Tooltip
          content={<CustomTooltip variations={variations} theme={theme} />}
        />
        <Legend />
        {variations
          .filter((v) => selectedVariations.includes(v.id?.toString() || "0"))
          .map(renderLine)}
      </ComposedChart>
    </ResponsiveContainer>
  );
};
