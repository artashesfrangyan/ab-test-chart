import React from "react";
import type { Theme } from "../../../shared/types";
import styles from "./ZoomControl.module.css";

interface ZoomControlsProps {
  isZoomed: boolean;
  onResetZoom: () => void;
  theme: Theme;
}

export const ZoomControls: React.FC<ZoomControlsProps> = ({
  isZoomed,
  onResetZoom,
  theme,
}) => {
  if (!isZoomed) return null;

  return (
    <button
      className={`${styles.button} ${theme === "dark" ? styles.dark : styles.light}`}
      onClick={onResetZoom}
    >
      🔄 Reset Zoom
    </button>
  );
};
