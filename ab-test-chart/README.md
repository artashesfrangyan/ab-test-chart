# A/B Test Interactive Line Chart

An interactive line chart for visualizing A/B test statistics with conversion rates.

## Features

### Core Requirements
- 📊 Interactive line chart showing conversion rates as percentages
- 🎯 Hover tooltip with daily data
- 🔄 Automatic axis adaptation when toggling variations
- 📱 Responsive design (671px - 1300px)
- ⚡ Variations selector with at least one always selected
- ⏰ Day/Week time range selector

### Bonus Features
- 🔍 Zoom functionality with reset
- 🎨 Line style selector (Line, Smooth, Area)
- 🌙 Light/Dark theme toggle
- 🛠️ Unit/E2E testing

## Tech Stack

- **Framework**: React 19.2 + TypeScript
- **Charting Library**: Recharts
- **Build Tool**: Vite
- **Testing**: Vitest (unit), Playwright (e2e)
- **Styling**: Tailwind CSS + CSS Modules
- **Architecture**: FSD (Feature-Sliced Design)

## Local Setup

1. **Install dependencies**:
   ```bash
   npm install