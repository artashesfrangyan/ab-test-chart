import { useState, useEffect } from "react";
import "./App.css";
import { ChartPage } from "@pages/chart-page/ui/ChartPage";
import type { Theme } from "@shared/types";

function App() {
  const [theme, setTheme] = useState<Theme>("auto");

  const isDark =
    theme === "dark" ||
    (theme === "auto" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  useEffect(() => {
    document.body.style.backgroundColor = isDark ? "#111827" : "#ffffff";
    document.body.style.color = isDark ? "#ffffff" : "#1f2937";
  }, [isDark]);

  return <ChartPage theme={theme} onThemeChange={setTheme} />;
}

export default App;
