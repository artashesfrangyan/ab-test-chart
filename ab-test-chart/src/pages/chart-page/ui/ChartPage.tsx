import { useState, type FC } from "react";
import { VariationSelector } from "../../../features/variation-selector/ui/VariationSelector";
import { useChartData } from "../../../entities/chart-data/hooks/useChartData";
import { LineChart } from "../../../widgets/chart-container/ui/LineChart";
import { TimeRangeSelector } from "../../../widgets/chart-container/ui/TimeRangeSelector";
import { LineStyleSelector } from "../../../features/line-style-selector/ui/LineStyleSelector";
import { ThemeToggle } from "../../../features/theme-toggle/ui/ThemeToggle";
import { ZoomControls } from "../../../features/zoom-controls/ui/ZoomControl";
import type { LineStyle, Theme, TimeRange } from "../../../shared/types";
import styles from "./ChartPage.module.css";

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
  const [zoomLevel, setZoomLevel] = useState(1);

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

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 1, 4));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 1, 1));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingText}>Loading...</div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>A/B Test Conversion Rates</h1>
            <p className={`${styles.subtitle} ${isDark ? styles.dark : styles.light}`}>
              Analyze and compare conversion rates across variations
            </p>
          </div>
          <ThemeToggle theme={theme} onThemeChange={onThemeChange} />
        </div>

        <div className={`${styles.controls} ${isDark ? styles.dark : styles.light}`}>
          <h2 className={styles.controlsTitle}>Controls</h2>
          <div className={styles.controlsGroup}>
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
            zoomLevel={zoomLevel}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onResetZoom={handleResetZoom}
            theme={isDark ? "dark" : "light"}
          />
          </div>
        </div>

        <div className={`${styles.chart} ${isDark ? styles.dark : styles.light}`}>
          <LineChart
            data={data}
            variations={variations}
            selectedVariations={selectedVariations}
            lineStyle={lineStyle}
            theme={isDark ? "dark" : "light"}
            zoomLevel={zoomLevel}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onResetZoom={handleResetZoom}
          />
        </div>
      </div>
    </div>
  );
};
