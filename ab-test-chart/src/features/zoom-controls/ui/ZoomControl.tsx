import React from "react";
import type { Theme } from "../../../shared/types";
import styles from "./ZoomControls.module.css";

interface ZoomControlsProps {
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  theme: Theme;
}

export const ZoomControls: React.FC<ZoomControlsProps> = ({
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  theme,
}) => {
  const isDark = theme === "dark";

  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${isDark ? styles.dark : styles.light}`}
        onClick={onZoomIn}
        disabled={zoomLevel >= 4}
        title="Zoom In"
      >
        🔍+
      </button>
      <button
        className={`${styles.button} ${isDark ? styles.dark : styles.light}`}
        onClick={onZoomOut}
        disabled={zoomLevel <= 1}
        title="Zoom Out"
      >
        🔍−
      </button>
      {zoomLevel > 1 && (
        <button
          className={`${styles.resetButton} ${isDark ? styles.dark : styles.light}`}
          onClick={onResetZoom}
          title="Reset Zoom"
        >
          🔄 Reset
        </button>
      )}
    </div>
  );
};
