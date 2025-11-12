import React from "react";
import {
  LineChart as RechartsLineChart,
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
import {
  getVariationColor,
  getVisibleDataRange,
} from "../../../shared/lib/utils/data-transform";
import { CustomTooltip } from "./CustomTooltip";

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

  const { minY, maxY } = getVisibleDataRange(chartData, selectedVariations);

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

  const formatXAxis = (date: string) => {
    if (data[0]?.isWeekly) {
      // For weekly data, show week number
      return `Week ${date.split("-W")[1]}`;
    }
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RechartsLineChart
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
          domain={[minY, maxY]}
        />
        <Tooltip
          content={<CustomTooltip variations={variations} theme={theme} />}
        />
        <Legend />
        {variations
          .filter((v) => selectedVariations.includes(v.id?.toString() || "0"))
          .map(renderLine)}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};
