import type { ProcessedData } from "../../api/types";

export const calculateConversionRate = (
  conversions: number,
  visits: number
): number => {
  if (visits === 0) return 0;
  return parseFloat(((conversions / visits) * 100).toFixed(2));
};

export const getVariationColor = (variationId: string): string => {
  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7300",
    "#ff0000",
    "#00ff00",
  ];
  const index = parseInt(variationId) % colors.length;
  return colors[index];
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(2)}%`;
};

export const getVisibleDataRange = (
  data: ProcessedData[],
  selectedVariations: string[]
): { minY: number; maxY: number } => {
  if (data.length === 0) return { minY: 0, maxY: 100 };

  let minY = Infinity;
  let maxY = -Infinity;

  data.forEach((day) => {
    selectedVariations.forEach((variationId) => {
      const rateKey = `${variationId}_rate` as keyof ProcessedData;
      const rate = day[rateKey] as number;

      if (rate !== undefined && !isNaN(rate)) {
        minY = Math.min(minY, rate);
        maxY = Math.max(maxY, rate);
      }
    });
  });

  // Add some padding and ensure reasonable bounds
  const padding = (maxY - minY) * 0.1 || 5;
  return {
    minY: Math.max(0, minY - padding),
    maxY: Math.min(100, maxY + padding),
  };
};
