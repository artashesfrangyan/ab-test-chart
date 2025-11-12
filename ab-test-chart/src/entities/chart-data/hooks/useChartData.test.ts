import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { calculateConversionRate } from "../../../shared/lib/utils/data-transform";
import { useChartData } from "./useChartData";
import type { RawData } from "../../../shared/types";

// Mock data matching our structure
const mockRawData: RawData = {
  variations: [
    { id: 10001, name: "Variation A" },
    { id: 10002, name: "Variation B" },
  ],
  data: [
    {
      date: "2025-01-01",
      visits: { "10001": 1000, "10002": 1500 },
      conversions: { "10001": 100, "10002": 150 },
    },
    {
      date: "2025-01-02",
      visits: { "10001": 1200, "10002": 1800 },
      conversions: { "10001": 120, "10002": 180 },
    },
  ],
};

// Mock the data import
vi.mock("../../../shared/api/mocks/data.json", () => mockRawData);

describe("useChartData", () => {
  it("should process daily data correctly", async () => {
    const { result } = renderHook(() => useChartData("day"));

    // Wait for loading to complete
    await vi.waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toHaveLength(2);
    expect(result.current.variations).toHaveLength(2);
    expect(result.current.data[0]["10001_rate"]).toBe(10); // 100/1000 * 100 = 10%
    expect(result.current.data[0]["10002_rate"]).toBe(10); // 150/1500 * 100 = 10%
  });

  it("should aggregate weekly data correctly", async () => {
    const { result } = renderHook(() => useChartData("week"));

    await vi.waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Should have one week entry for the test data
    expect(result.current.data.length).toBeGreaterThan(0);

    const weekData = result.current.data[0];
    expect(weekData.isWeekly).toBe(true);
    expect(weekData.date).toMatch(/\d{4}-W\d{2}/);
  });

  it("should handle empty data gracefully", async () => {
    // Mock empty data
    vi.mocked(mockRawData).data = [];

    const { result } = renderHook(() => useChartData("day"));

    await vi.waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toHaveLength(0);
  });

  it("should calculate conversion rates correctly", () => {
    expect(calculateConversionRate(50, 1000)).toBe(5);
    expect(calculateConversionRate(0, 1000)).toBe(0);
    expect(calculateConversionRate(50, 0)).toBe(0);
    expect(calculateConversionRate(33, 100)).toBe(33);
  });
});
