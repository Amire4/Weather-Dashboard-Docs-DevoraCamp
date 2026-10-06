# DevoraCamp Documentation Website — Building a Weather Dashboard with OpenWeatherMap API

A comprehensive technical documentation platform and live interactive reference built with React, TypeScript, and Tailwind CSS following the DevoraCamp colour scheme and architectural design standards.

Live Documentation Website: [https://devora-weather-dashboard-docs.vercel.app/](https://devora-weather-dashboard-docs.vercel.app/)

---

## 📖 Overview

This documentation platform teaches developers step-by-step how to build a production-ready **Weather Dashboard Application with the OpenWeatherMap API** from scratch. It covers:

1. **Prerequisites & Base Setup**: System requirements (Node.js v18.17+ / v20+), project creation via `create-next-app`, dependency management (`lucide-react`), TypeScript strict mode, obtaining an OpenWeatherMap API key, and secure storage in `.env.local`.
2. **Styling & UI Guide**: Responsive layout grid down to 375px mobile screens, glassmorphic condition cards, Tailwind CSS design system rules, and dynamic Lucide React SVG weather icons.
3. **Implementation Guide**: Asynchronous data fetching with `fetch` and `async/await`, loading skeletons, error states (404 City Not Found, 401 Unauthorized, 429 Rate Limits), city search input handling, Celsius/Fahrenheit unit toggles, and recent search history persistence in `localStorage`.
4. **Complete Production Code Reference**: Copy-pasteable, verified TypeScript source code for all modules (types, helpers, components, layout, and page).
5. **Interactive Live Weather Dashboard**: An embedded, fully interactive Weather Dashboard demo component showing real-time global weather observations, day/night cycles, unit conversion, and JSON response inspection.
6. **Troubleshooting & Common Errors**: In-depth diagnostic solutions for npm peer dependency issues, HTTP 404, 401, 429 rate limits, missing environment variables, and Next.js hydration safety.

---

## 📁 Documented Weather Dashboard Project Structure

The tutorial teaches students to structure their Weather Dashboard application as follows:

```bash
weather-dashboard/
├── app/
│   ├── layout.tsx              # Root HTML document and global layout
│   ├── page.tsx                # Home page rendering WeatherDashboard
│   └── globals.css             # Tailwind CSS imports & global resets
├── components/
│   ├── WeatherDashboard.tsx    # Primary coordinator component
│   ├── WeatherCard.tsx         # Main condition display (temp, icon, description)
│   ├── MetricGrid.tsx          # 4-column metric grid (wind, humidity, pressure, visibility)
│   ├── DynamicWeatherIcon.tsx  # Maps WMO/OpenWeather codes to SVG icons
│   ├── SearchBar.tsx           # Search input form with submit handler
│   ├── WeatherSkeleton.tsx     # Loading skeleton placeholder
│   ├── ErrorAlert.tsx          # Actionable error alert display
│   └── RecentSearches.tsx      # Clickable recent city search history pills
├── lib/
│   ├── weather.ts              # API fetch helper functions & error handling
│   └── storage.ts              # LocalStorage read/write persistence utilities
├── types/
│   └── weather.ts              # Strict TypeScript interfaces for API responses
├── .env.local                  # Local OpenWeatherMap API key (DO NOT COMMIT)
├── .env.example                # Sample environment file template
├── .gitignore                  # Git ignore rules including .env.local
├── package.json                # Project dependencies and npm scripts
└── tsconfig.json               # TypeScript compiler options with strict mode
```

---

## 🚀 Local Setup & Installation

### Prerequisites
- **Node.js**: v18.17.0 or higher (recommended v20.x+)
- **npm**: v9.0.0 or higher
- **OpenWeatherMap Account**: Free tier API key from [openweathermap.org/api](https://openweathermap.org/api)

### 1. Clone & Install Dependencies
```bash
git clone <repository-url>
cd weather-dashboard-docs
npm install
```

> **Note on Peer Dependencies**: If your environment requires loose peer dependency resolution (e.g. strict Vercel builds), an `.npmrc` file with `legacy-peer-deps=true` is included in the root directory.

### 2. Configure Environment Variables
Create a `.env.local` file in the project root:
```bash
cp .env.example .env.local
```

Add your OpenWeatherMap API key (optional for the embedded simulator, required for live production OpenWeatherMap API calls):
```env
NEXT_PUBLIC_OPENWEATHER_API_KEY="your_32_character_api_key_here"
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the documentation website.

### 4. Build for Production
```bash
npm run build
npm run preview
```

---

## 🎨 Design & Visual Standards
- **DevoraCamp Color Scheme**: Deep slate neutral canvas (`#020617` / `#0B0F19`), structural card surfaces (`#0F172A` / `#1E293B`), and vibrant emerald accents (`#10B981`).
- **Zero-Pill Discipline**: Clean unboxed metadata with typographic separators (`·`).
- **Tabular Numerals**: Numeric metrics aligned with `tabular-nums` to eliminate layout shift during live updates.
- **Responsive Layout**: Fluid experience across mobile (375px+), tablet, and desktop viewports.
- **Syntax Highlighting & Copy**: Prism.js highlighted code blocks with instant copy-to-clipboard buttons and user feedback.
