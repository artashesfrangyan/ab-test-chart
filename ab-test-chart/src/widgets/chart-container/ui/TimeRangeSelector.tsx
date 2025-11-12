import React from "react";
import type { TimeRange, Theme } from "../../../shared/types";
import styles from "./TimeRangeSelector.module.css";

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
    <div className={styles.container}>
      <label className={styles.label}>Time Range</label>
      <div className={`${styles.buttonGroup} ${theme === "dark" ? styles.dark : styles.light}`}>
        <button
          className={`${styles.button} ${theme === "dark" ? styles.dark : styles.light} ${timeRange === "day" ? styles.active : ""}`}
          onClick={() => onTimeRangeChange("day")}
        >
          📅 Day
        </button>
        <button
          className={`${styles.button} ${theme === "dark" ? styles.dark : styles.light} ${timeRange === "week" ? styles.active : ""}`}
          onClick={() => onTimeRangeChange("week")}
        >
          📊 Week
        </button>
      </div>
    </div>
  );
};
