# Documentation Website — Building a Weather Dashboard with OpenWeatherMap API

A comprehensive technical documentation website built with Next.js, TypeScript, and Tailwind CSS following the DevoraCamp colour scheme and architectural design standards.

---

## 📖 Overview

This documentation platform teaches developers how to build a production-grade **Weather Dashboard Application with OpenWeatherMap API** from scratch. It covers:

1. **Project Overview & Base Setup**: Project structure, TypeScript strict mode, obtaining an OpenWeatherMap API key, and secure storage in `.env.local`.
2. **Styling Guide**: Clean UI layout, weather condition cards, Tailwind CSS design system rules, and dynamic SVG weather icons.
3. **Implementation Guide**: Asynchronous data fetching with `fetch`, loading skeletons, error states (404 City Not Found, 401 Unauthorized), city search, and recent searches persistence in `localStorage`.
4. **Code Reference**: Full production-ready TypeScript code for all modules with copy-to-clipboard functionality.
5. **Interactive Live Weather Dashboard**: An embedded, fully interactive Weather Dashboard demo component showing the exact application developers build throughout the guide.
6. **Troubleshooting & Common Errors**: In-depth explanations for HTTP 404, 401, 429 rate limits, and Next.js hydration safety.

---

## 📁 Project Structure

```bash
├── app/
│   ├── layout.tsx              # Root HTML document and global typography
│   ├── page.tsx                # Home page rendering the documentation
│   └── globals.css             # Tailwind CSS imports and DevoraCamp theme
├── components/
│   ├── CodeBlock.tsx           # Syntax highlighted code with copy button
│   ├── Callout.tsx             # Alert components (Security Warning, Rate Limits, Tips)
│   ├── Header.tsx              # Top navigation bar with ⌘K search and quick links
│   ├── Sidebar.tsx             # Structured documentation hierarchy and categories
│   ├── TableOfContents.tsx     # On-page active section observer with smooth scroll
│   ├── SearchModal.tsx         # Instant search dialog with keyboard navigation
│   ├── LiveWeatherDashboard.tsx# Embedded live weather dashboard demo
│   └── InteractiveChecklist.tsx# Milestone checklist tracking student progress
├── lib/
│   └── weather.ts              # API client and asynchronous fetch helpers
├── types/
│   ├── docs.ts                 # Documentation navigation and data types
│   └── weather.ts              # OpenWeatherMap API TypeScript response interfaces
├── .env.local                  # Local API keys (excluded from Git)
├── package.json                # Project dependencies
└── tsconfig.json               # TypeScript configuration with strict mode
```

---

## 🚀 Local Setup & Installation

### Prerequisites
- Node.js (v18.17 or later recommended)
- npm or yarn

### 1. Clone & Install Dependencies
```bash
git clone <repository-url>
cd weather-dashboard-docs
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the project root:
```bash
cp .env.example .env.local
```

Add your OpenWeatherMap API key (optional for the embedded simulator, required for live production API calls):
```env
NEXT_PUBLIC_OPENWEATHER_API_KEY="your_openweathermap_api_key_here"
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the documentation website.

---

## 🎨 Design & Visual Standards
- **DevoraCamp Color Scheme**: Deep slate neutral canvas (`#0B0F19` / `#0F172A`), structural card panels (`#1E293B`), and vibrant emerald accents (`#10B981`).
- **Zero-Pill Discipline**: Clean unboxed metadata with typographic separators.
- **Tabular Numerals**: Numeric metrics aligned with `tabular-nums` to eliminate layout shift.
- **Responsive Layout**: Fluid experience across mobile, tablet, and desktop viewports.
