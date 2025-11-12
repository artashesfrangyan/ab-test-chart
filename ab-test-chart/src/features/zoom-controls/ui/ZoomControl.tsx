import React from "react";
import type { Theme } from "../../../shared/types";

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
      className={`px-4 py-2 rounded border ${
        theme === "dark"
          ? "bg-gray-700 text-white border-gray-600"
          : "bg-white text-gray-800 border-gray-300"
      }`}
      onClick={onResetZoom}
    >
      Reset Zoom
    </button>
  );
};
