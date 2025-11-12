import type { RawData, ProcessedData, Variation } from "../../types";

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
      fullDate: new Date(dayData.date),
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

export const aggregateWeeklyData = (data: ProcessedData[], variationIds: string[]): ProcessedData[] => {
  const weekMap = new Map<string, ProcessedData>();

  data.forEach((day) => {
    const date = new Date(day.date);
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());
    const weekKey = weekStart.toISOString().split('T')[0];

    if (!weekMap.has(weekKey)) {
      weekMap.set(weekKey, {
        date: weekKey,
        timestamp: weekStart.getTime(),
        fullDate: weekStart,
        isWeekly: true,
      });

      variationIds.forEach((id) => {
        weekMap.get(weekKey)![`${id}_visits`] = 0;
        weekMap.get(weekKey)![`${id}_conversions`] = 0;
      });
    }

    const weekData = weekMap.get(weekKey)!;
    variationIds.forEach((id) => {
      weekData[`${id}_visits`] = (weekData[`${id}_visits`] as number) + (day[`${id}_visits`] as number || 0);
      weekData[`${id}_conversions`] = (weekData[`${id}_conversions`] as number) + (day[`${id}_conversions`] as number || 0);
    });
  });

  return Array.from(weekMap.values()).map((week) => {
    variationIds.forEach((id) => {
      const visits = week[`${id}_visits`] as number;
      const conversions = week[`${id}_conversions`] as number;
      week[`${id}_rate`] = calculateConversionRate(conversions, visits);
    });
    return week;
  });
};

export const getVariationColor = (variationId: string): string => {
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300"];
  const index = parseInt(variationId) % colors.length;
  return colors[index];
};
