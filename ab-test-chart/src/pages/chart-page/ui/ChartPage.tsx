import { useState, type FC } from "react";

type Theme = "light" | "dark";

export const ChartPage: FC = () => {
  const [theme, setTheme] = useState<Theme>("light");

  return (
    <div
      className={`min-h-screen p-4 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">A/B Test Conversion Rates</h1>
      </div>
    </div>
  );
};
