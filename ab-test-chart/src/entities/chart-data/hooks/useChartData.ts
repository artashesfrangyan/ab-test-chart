import { useMemo } from "react";
import type { ProcessedData, Variation } from "@shared/types";
import { processChartData } from "@shared/lib/utils/data-transform";

import rawData from "@shared/api/data.json";

export const useChartData = () => {
  const processedData = useMemo((): ProcessedData[] => {
    if (!rawData) return [];
    return processChartData(rawData);
  }, []);

  const variations = useMemo((): Variation[] => {
    if (!rawData) return [];
    return rawData.variations;
  }, []);

  return {
    data: processedData,
    variations,
    isLoading: false,
  };
};
