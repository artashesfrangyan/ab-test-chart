import React, { useState } from "react";
import html2canvas from "html2canvas";
import type { Theme } from "@shared/types";
import styles from "./ExportChart.module.css";

interface ExportChartProps {
  chartRef: React.RefObject<HTMLDivElement | null>;
  theme: Theme;
}

export const ExportChart: React.FC<ExportChartProps> = ({ chartRef, theme }) => {
  const [isExporting, setIsExporting] = useState(false);
  const isDark = theme === "dark";

  const handleExport = async () => {
    if (!chartRef.current) return;

    setIsExporting(true);
    try {
      const canvas = await html2canvas(chartRef.current, {
        backgroundColor: isDark ? "#111827" : "#ffffff",
        scale: 2,
      });

      const link = document.createElement("a");
      link.download = `ab-test-chart-${new Date().toISOString().split("T")[0]}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      className={`${styles.button} ${isDark ? styles.dark : styles.light}`}
      onClick={handleExport}
      disabled={isExporting}
      title="Export to PNG"
    >
      {isExporting ? "📥 Exporting..." : "📥 Export PNG"}
    </button>
  );
};
