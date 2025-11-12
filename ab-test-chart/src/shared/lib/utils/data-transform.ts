import type { RawData, ProcessedData } from "../../types";

export const calculateConversionRate = (
  conversions: number,
  visits: number
): number => {
  return visits > 0 ? (conversions / visits) * 100 : 0;
};

export const processChartData = (rawData: RawData): ProcessedData[] => {
  return rawData.data.map((dayData) => {
    const processedDay: ProcessedData = {
      date: dayData.date,
      timestamp: new Date(dayData.date).getTime(),
    };

    // Process each variation
    rawData.variations.forEach((variation) => {
      const variationId = variation.id?.toString() || "0";
      const visits = dayData.visits[variationId] || 0;
      const conversions = dayData.conversions[variationId] || 0;

      processedDay[`${variationId}_visits`] = visits;
      processedDay[`${variationId}_conversions`] = conversions;
      processedDay[`${variationId}_rate`] = calculateConversionRate(
        conversions,
        visits
      );
    });

    return processedDay;
  });
};

export const getVariationColor = (variationId: string): string => {
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300"];
  const index = parseInt(variationId) % colors.length;
  return colors[index];
};
