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
