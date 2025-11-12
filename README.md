# A/B Test Interactive Line Chart

Interactive line chart for visualizing A/B test conversion rates.

## Live Demo

[View on GitHub Pages](https://artashesfrangyan.github.io/ab-test-chart/)

## Features

### Core Requirements
- Interactive line chart showing conversion rates as percentages
- Hover tooltip with daily data
- Automatic axis adaptation when toggling variations
- Responsive design (671px - 1300px)
- Variations selector (minimum one always selected)
- Day/Week time range selector

### Bonus Features
- Zoom controls with horizontal chart expansion
- Line style selector (Line, Smooth, Area)
- Theme toggle (Light, Dark, Auto)
- Export chart to PNG

### Chosen visualization library
- Recharts

## Local Setup

1. Clone and install:
```bash
git clone https://github.com/artashesfrangyan/ab-test-chart.git
cd ab-test-chart
npm install
```

2. Start development server:
```bash
npm run dev
```
App runs at `http://localhost:3000`

## Tech Stack

- **React 19.2 + TypeScript**
- **Recharts** - Charting library
- **Vite** - Build tool
- **CSS Modules** - Styling
- **FSD Architecture** - Feature-Sliced Design

## Project Structure (FSD)

```
src/
├── app/         # Application setup
├── pages/       # Page components
├── widgets/     # Chart, Tooltip
├── features/    # Selectors, Controls
├── entities/    # Chart data logic
└── shared/      # Utils, types, API
```
