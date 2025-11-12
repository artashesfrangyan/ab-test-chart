import { useState, type FC } from "react";
import { VariationSelector } from "../../../features/variation-selector/ui/VariationSelector";
import { useChartData } from "../../../entities/chart-data/hooks/useChartData";
import { LineChart } from "../../../widgets/chart-container/ui/LineChart";
import type { LineStyle, Theme, TimeRange } from "../../../shared/types";

export const ChartPage: FC = () => {
  const [selectedVariations, setSelectedVariations] = useState<string[]>(["0"]);
  const [timeRange, setTimeRange] = useState<TimeRange>("day");
  const [lineStyle, setLineStyle] = useState<LineStyle>("line");
  const [theme, setTheme] = useState<Theme>("light");
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomRange, setZoomRange] = useState<{ start: number; end: number }>();

  const { data, variations, isLoading } = useChartData();

  const handleVariationChange = (variationId: string) => {
    setSelectedVariations((prev) =>
      prev.includes(variationId)
        ? prev.filter((id) => id !== variationId)
        : [...prev, variationId]
    );
  };

  const handleResetZoom = () => {
    setIsZoomed(false);
    setZoomRange(undefined);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`min-h-screen p-4 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">A/B Test Conversion Rates</h1>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 mb-6 items-center">
          <VariationSelector
            variations={variations}
            selectedVariations={selectedVariations}
            onVariationChange={handleVariationChange}
            theme={theme}
          />

          {/* 
          [FIXME] - Create the following components
          <TimeRangeSelector
            timeRange={timeRange}
            onTimeRangeChange={setTimeRange}
            theme={theme}
          />

          <LineStyleSelector
            lineStyle={lineStyle}
            onLineStyleChange={setLineStyle}
            theme={theme}
          />

          <ThemeToggle theme={theme} onThemeChange={setTheme} />

          <ZoomControls
            isZoomed={isZoomed}
            onResetZoom={handleResetZoom}
            theme={theme}
          />

          <ExportChart theme={theme} /> */}
        </div>

        {/* Chart */}
        <div
          className={`rounded-lg p-4 ${
            theme === "dark" ? "bg-gray-800" : "bg-gray-50"
          }`}
        >
          <LineChart
            data={data}
            variations={variations}
            selectedVariations={selectedVariations}
            lineStyle={lineStyle}
            theme={theme}
            isZoomed={isZoomed}
            zoomRange={zoomRange}
          />
        </div>
      </div>
    </div>
  );
};
