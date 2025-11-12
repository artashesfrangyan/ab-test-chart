import { useMemo } from "react";
import type { ProcessedData, Variation, RawData } from "@shared/types";
import { processChartData } from "@shared/lib/utils/data-transform";
import rawData from "@shared/api/data.json";

export const useChartData = () => {
  const processedData = useMemo((): ProcessedData[] => {
    return processChartData(rawData as RawData);
  }, []);

  const variations = useMemo((): Variation[] => {
    return rawData.variations;
  }, []);

  return {
    data: processedData,
    variations,
    isLoading: false,
  };
};
