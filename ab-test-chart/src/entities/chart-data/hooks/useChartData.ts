import { useState, useEffect, useMemo } from "react";
import type {
  RawData,
  ProcessedData,
  Variation,
  TimeRange,
} from "../../../shared/api/types";
import { calculateConversionRate } from "../../../shared/lib/utils/data-transform";

import rawData from "../../../shared/api/data.json";

interface UseChartDataReturn {
  data: ProcessedData[];
  variations: Variation[];
  isLoading: boolean;
  error: string | null;
}

export const useChartData = (
  timeRange: TimeRange = "day"
): UseChartDataReturn => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Process data based on time range
  const processedData = useMemo((): ProcessedData[] => {
    try {
      if (!rawData?.data || !rawData?.variations) {
        throw new Error("Invalid data format");
      }

      const dailyData = processDailyData(rawData);

      if (timeRange === "day") {
        return dailyData;
      } else {
        return aggregateWeeklyData(dailyData, rawData.variations);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process data");
      return [];
    }
  }, [timeRange]);

  const variations = useMemo(() => rawData?.variations || [], []);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return {
    data: processedData,
    variations,
    isLoading,
    error,
  };
};

// Process raw data into daily format
const processDailyData = (rawData: RawData): ProcessedData[] => {
  return rawData.data.map((dayData) => {
    const processedDay: ProcessedData = {
      date: dayData.date,
      timestamp: new Date(dayData.date).getTime(),
      fullDate: new Date(dayData.date),
    };

    // Process each variation for this day
    rawData.variations.forEach((variation) => {
      const variationId = variation.id?.toString() || "0";
      const visits = dayData.visits[variationId] || 0;
      const conversions = dayData.conversions[variationId] || 0;
      const rate = calculateConversionRate(conversions, visits);

      processedDay[`${variationId}_visits`] = visits;
      processedDay[`${variationId}_conversions`] = conversions;
      processedDay[`${variationId}_rate`] = rate;
    });

    return processedDay;
  });
};

// Aggregate daily data into weekly data
const aggregateWeeklyData = (
  dailyData: ProcessedData[],
  variations: Variation[]
): ProcessedData[] => {
  const weeklyData: Map<string, ProcessedData> = new Map();

  dailyData.forEach((day) => {
    const weekKey = getWeekKey(day.fullDate);

    if (!weeklyData.has(weekKey)) {
      weeklyData.set(weekKey, {
        date: weekKey,
        timestamp: getWeekStartTimestamp(day.fullDate),
        fullDate: getWeekStartDate(day.fullDate),
        isWeekly: true,
      });
    }

    const weekEntry = weeklyData.get(weekKey)!;

    // Aggregate each variation's data for the week
    variations.forEach((variation) => {
      const variationId = variation.id?.toString() || "0";
      const visitsKey = `${variationId}_visits` as keyof ProcessedData;
      const conversionsKey =
        `${variationId}_conversions` as keyof ProcessedData;
      const rateKey = `${variationId}_rate` as keyof ProcessedData;

      const dayVisits = (day[visitsKey] as number) || 0;
      const dayConversions = (day[conversionsKey] as number) || 0;

      // Initialize weekly totals
      if (weekEntry[visitsKey] === undefined) {
        weekEntry[visitsKey] = 0;
        weekEntry[conversionsKey] = 0;
      }

      // Sum up visits and conversions
      weekEntry[visitsKey] = (weekEntry[visitsKey] as number) + dayVisits;
      weekEntry[conversionsKey] =
        (weekEntry[conversionsKey] as number) + dayConversions;

      // Calculate weekly conversion rate
      const totalVisits = weekEntry[visitsKey] as number;
      const totalConversions = weekEntry[conversionsKey] as number;
      weekEntry[rateKey] = calculateConversionRate(
        totalConversions,
        totalVisits
      );
    });
  });

  return Array.from(weeklyData.values()).sort(
    (a, b) => a.timestamp - b.timestamp
  );
};

// Helper function to get week key (YYYY-Www format)
const getWeekKey = (date: Date): string => {
  const year = date.getFullYear();
  const weekNumber = getWeekNumber(date);
  return `${year}-W${weekNumber.toString().padStart(2, "0")}`;
};

// Helper function to get ISO week number
const getWeekNumber = (date: Date): number => {
  const target = new Date(date.valueOf());
  const dayNumber = (date.getDay() + 6) % 7; // Make Monday 0, Sunday 6

  target.setDate(target.getDate() - dayNumber + 3);
  const firstThursday = target.valueOf();

  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
  }

  return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
};

// Helper function to get timestamp of week start (Monday)
const getWeekStartTimestamp = (date: Date): number => {
  return getWeekStartDate(date).getTime();
};

const getWeekStartDate = (date: Date): Date => {
  const result = new Date(date);
  const day = result.getDay();
  const diff = result.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  result.setDate(diff);
  result.setHours(0, 0, 0, 0);
  return result;
};
