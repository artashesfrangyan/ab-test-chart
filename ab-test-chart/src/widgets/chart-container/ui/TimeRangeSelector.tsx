import React from "react";
import type { TimeRange, Theme } from "../../../shared/types";

interface TimeRangeSelectorProps {
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
  theme: Theme;
}

export const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  timeRange,
  onTimeRangeChange,
  theme,
}) => {
  return (
    <div className="flex rounded-md overflow-hidden border border-gray-300">
      <button
        className={`px-4 py-2 text-sm font-medium ${
          timeRange === "day"
            ? "bg-blue-500 text-white"
            : theme === "dark"
            ? "bg-gray-700 text-white"
            : "bg-white text-gray-700"
        }`}
        onClick={() => onTimeRangeChange("day")}
      >
        Day
      </button>
      <button
        className={`px-4 py-2 text-sm font-medium ${
          timeRange === "week"
            ? "bg-blue-500 text-white"
            : theme === "dark"
            ? "bg-gray-700 text-white"
            : "bg-white text-gray-700"
        }`}
        onClick={() => onTimeRangeChange("week")}
      >
        Week
      </button>
    </div>
  );
};
