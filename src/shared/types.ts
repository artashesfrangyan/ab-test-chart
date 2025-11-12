export interface Variation {
  id?: number;
  name: string;
}

export interface RawData {
  variations: Variation[];
  data: {
    date: string;
    visits: { [key: string]: number };
    conversions: { [key: string]: number };
  }[];
}

export type ProcessedData = {
  date: string;
  timestamp: number;
  fullDate: Date;
  isWeekly?: boolean;
  [key: string]: number | string | Date | boolean | undefined;
};

export type LineStyle = "line" | "smooth" | "area";
export type Theme = "light" | "dark" | "auto";
export type TimeRange = "day" | "week";
