import { useState, type FC } from "react";
import { VariationSelector } from "../../../features/variation-selector/ui/VariationSelector";
import { useChartData } from "../../../entities/chart-data/hooks/useChartData";
import { LineChart } from "../../../widgets/chart-container/ui/LineChart";
import { TimeRangeSelector } from "../../../widgets/chart-container/ui/TimeRangeSelector";
import { LineStyleSelector } from "../../../features/line-style-selector/ui/LineStyleSelector";
import { ThemeToggle } from "../../../features/theme-toggle/ui/ThemeToggle";
import { ZoomControls } from "../../../features/zoom-controls/ui/ZoomControl";
import type { LineStyle, Theme, TimeRange } from "../../../shared/types";

interface ChartPageProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export const ChartPage: FC<ChartPageProps> = ({ theme, onThemeChange }) => {
  const { data, variations, isLoading } = useChartData();
  
  const [selectedVariations, setSelectedVariations] = useState<string[]>(
    () => variations.map((v) => v.id?.toString() || "0")
  );
  const [timeRange, setTimeRange] = useState<TimeRange>("day");
  const [lineStyle, setLineStyle] = useState<LineStyle>("line");
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomRange, setZoomRange] = useState<{ start: number; end: number }>();

  const isDark =
    theme === "dark" ||
    (theme === "auto" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

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
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto relative">
        <div className="absolute top-0 right-0">
          <ThemeToggle theme={theme} onThemeChange={onThemeChange} />
        </div>

        <h1 className="text-2xl font-bold mb-6">A/B Test Conversion Rates</h1>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 mb-6 items-center">
          <VariationSelector
            variations={variations}
            selectedVariations={selectedVariations}
            onVariationChange={handleVariationChange}
            theme={isDark ? "dark" : "light"}
          />

          <TimeRangeSelector
            timeRange={timeRange}
            onTimeRangeChange={setTimeRange}
            theme={isDark ? "dark" : "light"}
          />

          <LineStyleSelector
            lineStyle={lineStyle}
            onLineStyleChange={setLineStyle}
            theme={isDark ? "dark" : "light"}
          />

          <ZoomControls
            isZoomed={isZoomed}
            onResetZoom={handleResetZoom}
            theme={isDark ? "dark" : "light"}
          />
        </div>

        {/* Chart */}
        <div
          className="rounded-lg p-4"
          style={{
            backgroundColor: isDark ? "#1f2937" : "#f9fafb",
          }}
        >
          <LineChart
            data={data}
            variations={variations}
            selectedVariations={selectedVariations}
            lineStyle={lineStyle}
            theme={isDark ? "dark" : "light"}
            isZoomed={isZoomed}
            zoomRange={zoomRange}
          />
        </div>
      </div>
    </div>
  );
};
