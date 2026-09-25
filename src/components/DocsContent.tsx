import React from 'react';
import { CodeBlock } from './CodeBlock';
import { Callout } from './Callout';
import { LiveWeatherDashboard } from './LiveWeatherDashboard';
import { InteractiveChecklist } from './InteractiveChecklist';
import {
  Folder,
  FileCode,
  Key,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

interface DocsContentProps {
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
}

export const DocsContent: React.FC<DocsContentProps> = ({
  activeSection,
  onSelectSection,
}) => {
  return (
    <article className="max-w-4xl w-full pb-20 space-y-12">
      {/* SECTION: OVERVIEW */}
      {activeSection === 'overview' && (
        <section className="space-y-10 animate-in fade-in duration-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold mb-2">
              <span>DevoraCamp Technical Guide</span>
              <span>/</span>
              <span>Overview</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Building a Weather Dashboard with OpenWeatherMap API
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Welcome to the DevoraCamp technical documentation for building a responsive, real-time
              Weather Dashboard from scratch using the Next.js App Router, TypeScript, and Tailwind CSS.
            </p>
          </div>

          <InteractiveChecklist />

          {/* Subsection: Introduction */}
          <div id="project-introduction" className="space-y-4 pt-4 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Project Introduction & Learning Goals
            </h2>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              The goal of this project is to develop a production-ready weather application that consumes
              the OpenWeatherMap REST API. By completing this project, you will master:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-slate-300 pl-2">
              <li>
                <strong className="text-white">Strict TypeScript modeling:</strong> Defining strict
                interfaces for nested API payloads to ensure complete type safety across components.
              </li>
              <li>
                <strong className="text-white">Asynchronous data lifecycle:</strong> Managing pending,
                loaded, and error states gracefully in React 19 / Next.js client components.
              </li>
              <li>
                <strong className="text-white">API Key Security:</strong> Handling environment variables
                securely via <code className="text-emerald-400">.env.local</code> without accidental leaks to Git.
              </li>
              <li>
                <strong className="text-white">Client-side persistence:</strong> Preserving recent search
                queries in <code className="text-emerald-400">localStorage</code> for rapid re-querying.
              </li>
              <li>
                <strong className="text-white">Tailwind CSS UI Architecture:</strong> Crafting high-density
                weather condition metric grids and dynamic weather icon indicators.
              </li>
            </ul>

            <Callout type="info" title="DevoraCamp Curriculum Scope">
              This guide focuses purely on core developer competencies: asynchronous API integration,
              robust error boundaries, strict types, and clean component architecture. No heavyweight
              external database or server backend is required.
            </Callout>
          </div>

          {/* Subsection: Tech Stack */}
          <div id="tech-stack" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Tech Stack & Prerequisites
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Ensure you have Node.js (version 18.17 or later) installed on your system before
              proceeding. The dashboard is constructed with:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-xs font-mono text-emerald-400 font-semibold block mb-1">
                  Framework
                </span>
                <h4 className="text-base font-bold text-white">Next.js 14+ (App Router)</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Leveraging React 19, Client Component directives (<code className="text-slate-300">'use client'</code>), and high-performance bundling.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-xs font-mono text-emerald-400 font-semibold block mb-1">
                  Language
                </span>
                <h4 className="text-base font-bold text-white">TypeScript (Strict Mode)</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Full compile-time type validation, zero <code className="text-slate-300">any</code> types, and precise payload interface definitions.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-xs font-mono text-emerald-400 font-semibold block mb-1">
                  Styling
                </span>
                <h4 className="text-base font-bold text-white">Tailwind CSS</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Utility-first CSS, dark-mode color palette, responsive flex and grid layouts.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-xs font-mono text-emerald-400 font-semibold block mb-1">
                  API Service
                </span>
                <h4 className="text-base font-bold text-white">OpenWeatherMap Current API</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Global meteorological endpoints providing temperature, atmospheric pressure, humidity, and wind.
                </p>
              </div>
            </div>
          </div>

          {/* Subsection: Architecture */}
          <div id="architecture" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              System Architecture & Data Flow
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              The data flow within the Weather Dashboard follows a single-direction reactive cycle:
            </p>

            <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-xs sm:text-sm text-slate-300 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <span>User Input</span>
                <span>⟶</span>
                <span>Validation</span>
                <span>⟶</span>
                <span>Async Fetch</span>
                <span>⟶</span>
                <span>Local Storage + UI Render</span>
              </div>
              <p className="text-slate-400 text-xs font-sans leading-relaxed">
                1. <strong>Input Form:</strong> User types a city name (e.g., "Tokyo") and submits the form.<br />
                2. <strong>Fetch Utility:</strong> Validates input string, encodes URL parameters, and issues an HTTP GET request to OpenWeatherMap.<br />
                3. <strong>State Orchestration:</strong> Activates loading skeleton state; upon resolution, validates HTTP status code.<br />
                4. <strong>Cache & Persistence:</strong> Pushes city name into <code className="text-slate-200">localStorage</code> array and updates the active weather state.<br />
                5. <strong>Metric Cards:</strong> Re-renders temperature, condition badges, and tabular figures.
              </p>
            </div>

            <div className="pt-4 flex justify-between items-center">
              <span className="text-xs text-slate-500">Ready to configure your project?</span>
              <button
                type="button"
                onClick={() => onSelectSection('setup')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-colors cursor-pointer"
              >
                <span>Continue to Step 1: Setup</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* SECTION: SETUP */}
      {activeSection === 'setup' && (
        <section className="space-y-10 animate-in fade-in duration-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold mb-2">
              <span>DevoraCamp Technical Guide</span>
              <span>/</span>
              <span>Setup & Configuration</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Project Setup & Configuration
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Step-by-step instructions for establishing the project folder hierarchy, initializing Next.js
              with strict TypeScript, obtaining an OpenWeatherMap API key, and managing secrets safely.
            </p>
          </div>

          {/* Subsection: Folder Structure */}
          <div id="folder-structure" className="space-y-4 pt-4 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
              <Folder className="w-6 h-6 text-cyan-400" />
              <span>Recommended Folder Structure</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              To keep the codebase maintainable and strictly separated by responsibility, organize your
              Next.js App Router repository as follows:
            </p>

            <CodeBlock
              filename="Project Tree"
              language="bash"
              code={`weather-dashboard/
├── app/
│   ├── layout.tsx              # Root HTML layout and global fonts
│   ├── page.tsx                # Home page rendering WeatherDashboard
│   └── globals.css             # Tailwind CSS imports & global styles
├── components/
│   ├── WeatherDashboard.tsx    # Primary client component coordinating state
│   ├── WeatherCard.tsx         # Main condition display (temp, icon, description)
│   ├── MetricGrid.tsx          # 4-column metrics (wind, humidity, pressure, visibility)
│   └── RecentSearches.tsx      # Persistent city search history pills
├── lib/
│   └── weather.ts              # Data fetching helper functions & API client
├── types/
│   └── weather.ts              # TypeScript interfaces for API response
├── .env.local                  # Private OpenWeatherMap API key (DO NOT COMMIT)
├── .env.example                # Sanitized sample environment variable file
├── .gitignore                  # Git ignore rules including .env.local
├── package.json                # Project dependencies and run scripts
├── tsconfig.json               # TypeScript compiler configuration
└── tailwind.config.ts          # Tailwind styling theme`}
            />
          </div>

          {/* Subsection: Base TypeScript Setup */}
          <div id="base-typescript-setup" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
              <FileCode className="w-6 h-6 text-indigo-400" />
              <span>Base TypeScript Setup</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Initialize your project with strict type enforcement. In your <code className="text-emerald-400">tsconfig.json</code>,
              ensure <code className="text-slate-200">"strict": true</code> and path aliases are enabled:
            </p>

            <CodeBlock
              filename="tsconfig.json"
              language="json"
              code={`{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}`}
            />
          </div>

          {/* Subsection: Obtaining API Key */}
          <div id="obtaining-api-key" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
              <Key className="w-6 h-6 text-amber-400" />
              <span>How to Obtain an OpenWeatherMap API Key</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              OpenWeatherMap provides real-time meteorological data. Follow these exact steps to register
              and generate your free access token:
            </p>

            <ol className="list-decimal list-inside space-y-3 text-sm sm:text-base text-slate-300 pl-2">
              <li>
                Navigate to the official registration page:{' '}
                <a
                  href="https://openweathermap.org/api"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:underline inline-flex items-center gap-1 font-medium"
                >
                  openweathermap.org/api <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                Click <strong className="text-white">Sign In</strong> (top right) and choose <strong className="text-white">Create an Account</strong>.
              </li>
              <li>
                Verify your email address by clicking the confirmation link sent to your inbox.
              </li>
              <li>
                Once signed in, click on your username in the top right menu and select <strong className="text-white">My API Keys</strong>.
              </li>
              <li>
                A default key is generated automatically, or you can enter a name (e.g. <em>"Devora Weather Dashboard"</em>) and click <strong className="text-white">Generate</strong>.
              </li>
              <li>
                Copy the 32-character hexadecimal key (e.g. <code className="text-slate-200">a1b2c3d4e5f6...</code>).
              </li>
            </ol>

            <Callout type="rate-limit" title="OpenWeatherMap Free Tier Limits">
              The free <strong>Current Weather API</strong> plan permits up to <strong>60 API calls per minute</strong> and <strong>1,000,000 calls per month</strong>. This is more than adequate for local development and personal portfolio deployment.
            </Callout>

            <Callout type="warning" title="API Key Activation Delay">
              Newly created OpenWeatherMap API keys are not always active immediately. It typically takes <strong>10 to 60 minutes</strong> (and occasionally up to 2 hours) for a new key to propagate across their global edge servers. If you encounter an HTTP <code className="text-rose-300">401 Unauthorized</code> right after generating the key, wait 30 minutes before retesting.
            </Callout>
          </div>

          {/* Subsection: Environment Variables */}
          <div id="environment-variables" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <span>How to Securely Store the API Key (.env.local)</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Never hardcode your API key inside TypeScript files. Store it in a local environment variable file
              named <code className="text-emerald-400">.env.local</code> at the project root.
            </p>

            <CodeBlock
              filename=".env.local"
              language="bash"
              code={`# OpenWeatherMap API Key
# Client-side access in Next.js requires the NEXT_PUBLIC_ prefix:
NEXT_PUBLIC_OPENWEATHER_API_KEY="your_32_character_api_key_here"`}
            />

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Always verify that your <code className="text-emerald-400">.gitignore</code> file contains the pattern to prevent accidentally publishing your secret key to GitHub:
            </p>

            <CodeBlock
              filename=".gitignore"
              language="bash"
              code={`# Local environment files
.env.local
.env.development.local
.env.test.local
.env.production.local`}
            />

            <Callout type="tip" title="Server Route Handler vs Client Fetch">
              If you want 100% secret isolation where the API key is never visible in the browser network inspector, you can create a Next.js Route Handler at <code className="text-emerald-300">app/api/weather/route.ts</code>. In that case, omit the <code className="text-emerald-300">NEXT_PUBLIC_</code> prefix, store it as <code className="text-emerald-300">OPENWEATHER_API_KEY</code>, and proxy the request server-side!
            </Callout>

            <div className="pt-4 flex justify-between items-center">
              <button
                type="button"
                onClick={() => onSelectSection('overview')}
                className="text-xs text-slate-400 hover:text-slate-200"
              >
                ← Back to Overview
              </button>
              <button
                type="button"
                onClick={() => onSelectSection('step-1-types')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-colors cursor-pointer"
              >
                <span>Proceed to Step 1: Types</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* SECTION: STEP 1 - TYPES */}
      {activeSection === 'step-1-types' && (
        <section className="space-y-10 animate-in fade-in duration-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 font-semibold mb-2">
              <span>Step-by-Step Guides</span>
              <span>/</span>
              <span>Step 1: TypeScript Interfaces</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              TypeScript Interface Definitions for API Responses
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Learn how to inspect the JSON payload returned by OpenWeatherMap and model it into
              strongly-typed TypeScript contracts that prevent runtime bugs.
            </p>
          </div>

          {/* Subsection: Weather Response Interface */}
          <div id="weather-interfaces" className="space-y-4 pt-4 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Inspecting the API Response Structure
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              When querying the endpoint <code className="text-slate-200">GET https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=...</code>,
              the server returns a JSON structure similar to:
            </p>

            <CodeBlock
              filename="Sample API Response (JSON)"
              language="json"
              code={`{
  "coord": { "lon": -0.1257, "lat": 51.5085 },
  "weather": [
    { "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" }
  ],
  "base": "stations",
  "main": {
    "temp": 18.5,
    "feels_like": 18.1,
    "temp_min": 16.0,
    "temp_max": 20.2,
    "pressure": 1016,
    "humidity": 68
  },
  "visibility": 10000,
  "wind": { "speed": 4.12, "deg": 80 },
  "clouds": { "all": 0 },
  "dt": 1727265600,
  "sys": {
    "country": "GB",
    "sunrise": 1727243400,
    "sunset": 1727286600
  },
  "timezone": 3600,
  "id": 2643743,
  "name": "London",
  "cod": 200
}`}
            />
          </div>

          {/* Subsection: Sub-types */}
          <div id="sub-types" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Modeling Sub-Interfaces in types/weather.ts
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Decompose the payload into clean, modular interfaces. Create a new file at <code className="text-emerald-400">types/weather.ts</code>:
            </p>

            <CodeBlock
              filename="types/weather.ts"
              language="typescript"
              code={`// types/weather.ts

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainWeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface WindData {
  speed: number;
  deg: number;
  gust?: number;
}

export interface Coordinates {
  lon: number;
  lat: number;
}

export interface SysData {
  country: string;
  sunrise: number;
  sunset: number;
}

export interface WeatherResponse {
  coord: Coordinates;
  weather: WeatherCondition[];
  base: string;
  main: MainWeatherData;
  visibility: number;
  wind: WindData;
  clouds: {
    all: number;
  };
  dt: number;
  sys: SysData;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}`}
            />
          </div>

          {/* Subsection: Recent Searches Type */}
          <div id="recent-search-types" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Recent Searches Interface Definition
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              To support recent search history persistence in <code className="text-emerald-400">localStorage</code>,
              add the following interface to <code className="text-emerald-400">types/weather.ts</code>:
            </p>

            <CodeBlock
              filename="types/weather.ts (Continued)"
              language="typescript"
              code={`export interface RecentSearchItem {
  city: string;
  timestamp: number;
  temp?: number;
  condition?: string;
}`}
            />

            <Callout type="tip" title="Strict Typing Benefit">
              By typing <code className="text-emerald-300">weather: WeatherCondition[]</code>, VS Code will immediately provide autocomplete for <code className="text-emerald-300">weather[0].description</code> and flag errors if you attempt to access non-existent properties like <code className="text-rose-300">weather.name</code>.
            </Callout>

            <div className="pt-4 flex justify-between items-center">
              <button
                type="button"
                onClick={() => onSelectSection('setup')}
                className="text-xs text-slate-400 hover:text-slate-200"
              >
                ← Back to Setup
              </button>
              <button
                type="button"
                onClick={() => onSelectSection('step-2-styling')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-colors cursor-pointer"
              >
                <span>Proceed to Step 2: Styling</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* SECTION: STEP 2 - STYLING */}
      {activeSection === 'step-2-styling' && (
        <section className="space-y-10 animate-in fade-in duration-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold mb-2">
              <span>Step-by-Step Guides</span>
              <span>/</span>
              <span>Step 2: Styling Guide</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Styling Guide: UI Layout & Condition Cards
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Design a clean, responsive developer layout following the Devora Camp color palette,
              featuring high-contrast weather cards, CSS/Tailwind utility rules, and dynamic weather icons.
            </p>
          </div>

          {/* Subsection: UI Layout */}
          <div id="ui-layout" className="space-y-4 pt-4 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              UI Layout & Container Grid
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              The dashboard uses a centered max-width layout (<code className="text-slate-200">max-w-4xl mx-auto</code>)
              with three primary vertical zones:
            </p>

            <div className="space-y-2 text-sm text-slate-300">
              <p>1. <strong className="text-white">Search & Controls Bar:</strong> An input field with search icon, submit action, and metric/imperial temperature unit toggles.</p>
              <p>2. <strong className="text-white">Primary Condition Banner:</strong> A prominent card showing the city name, country tag, current temperature in large tabular font, feels-like temperature, and primary weather state.</p>
              <p>3. <strong className="text-white">Metric Condition Grid:</strong> A responsive 4-column card layout displaying Wind Speed, Humidity, Atmospheric Pressure, and Visibility.</p>
            </div>

            <CodeBlock
              filename="Layout Structure (TSX Snippet)"
              language="tsx"
              code={`<main className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8">
  <div className="max-w-4xl mx-auto space-y-6">
    {/* Header & Search */}
    <header className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <h1 className="text-2xl font-bold">Weather Dashboard</h1>
      <SearchBar onSearch={handleSearch} />
    </header>

    {/* Primary Hero Weather Card */}
    <WeatherCard data={weatherData} unit={unit} />

    {/* 4-Card Secondary Metrics Grid */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <MetricCard label="Wind" value="\${weatherData.wind.speed} m/s" />
      <MetricCard label="Humidity" value="\${weatherData.main.humidity}%" />
      <MetricCard label="Pressure" value="\${weatherData.main.pressure} hPa" />
      <MetricCard label="Visibility" value="\${(weatherData.visibility / 1000).toFixed(1)} km" />
    </div>
  </div>
</main>`}
            />
          </div>

          {/* Subsection: Weather Condition Cards */}
          <div id="condition-cards" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Weather Condition Cards
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Condition cards are styled with single-elevation depth, subtle borders (<code className="text-slate-200">border-slate-800</code>),
              and dark slate background tints (<code className="text-slate-200">bg-slate-900/80</code>).
              Always render numbers with <code className="text-emerald-400">tabular-nums</code> to prevent layout shifting when values update.
            </p>

            <CodeBlock
              filename="components/WeatherCard.tsx"
              language="tsx"
              code={`// components/WeatherCard.tsx
import React from 'react';
import type { WeatherResponse } from '@/types/weather';
import { DynamicWeatherIcon } from './DynamicWeatherIcon';

interface WeatherCardProps {
  weather: WeatherResponse;
  unit: 'metric' | 'imperial';
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather, unit }) => {
  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 shadow-xl relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              {weather.name}
            </h2>
            <span className="px-2 py-0.5 text-xs font-bold rounded bg-slate-800 text-slate-300 border border-slate-700">
              {weather.sys.country}
            </span>
          </div>
          <p className="text-slate-400 capitalize text-sm mt-1">
            {weather.weather[0]?.description}
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-400 mt-4">
            <span>H: {Math.round(weather.main.temp_max)}°</span>
            <span>·</span>
            <span>L: {Math.round(weather.main.temp_min)}°</span>
            <span>·</span>
            <span>Feels like {Math.round(weather.main.feels_like)}°{unit === 'metric' ? 'C' : 'F'}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <DynamicWeatherIcon
            iconCode={weather.weather[0]?.icon}
            condition={weather.weather[0]?.main}
            className="w-14 h-14"
          />
          <div className="text-right">
            <span className="text-5xl font-extrabold text-white tabular-nums tracking-tighter">
              {Math.round(weather.main.temp)}°
              <span className="text-2xl text-emerald-400 font-semibold">
                {unit === 'metric' ? 'C' : 'F'}
              </span>
            </span>
            <div className="text-xs text-emerald-400 font-semibold mt-1">
              {weather.weather[0]?.main}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};`}
            />
          </div>

          {/* Subsection: Tailwind Rules */}
          <div id="tailwind-rules" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              CSS & Tailwind Rules
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Follow these core Tailwind rules to adhere to the Devora Camp design standards:
            </p>

            <ul className="list-disc list-inside space-y-2 text-sm text-slate-300 pl-2">
              <li>
                <strong className="text-white">60-30-10 Palette:</strong> 60% deep slate background (<code className="text-slate-200">bg-slate-950</code>), 30% structural surfaces (<code className="text-slate-200">bg-slate-900 border-slate-800</code>), 10% emerald accent (<code className="text-emerald-400">text-emerald-400 / bg-emerald-500</code>).
              </li>
              <li>
                <strong className="text-white">Zero-Pill Discipline:</strong> Avoid wrapping metadata in candy pills. Use clean, unboxed text separated by typographic middots (<code className="text-slate-300">·</code>).
              </li>
              <li>
                <strong className="text-white">Tabular Numerals:</strong> Always add <code className="text-emerald-400">tabular-nums font-mono</code> to metric cards so that updating values do not jitter or cause layout layout reflows.
              </li>
              <li>
                <strong className="text-white">Single-Elevation Depth:</strong> Keep cards on a flat plane with a subtle 1px border (<code className="text-slate-300">border border-slate-800</code>). Avoid nesting cards within cards.
              </li>
            </ul>
          </div>

          {/* Subsection: Dynamic Icons */}
          <div id="dynamic-icons" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Dynamic Weather Icons Mapping
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              OpenWeatherMap returns a 3-character icon code (e.g. <code className="text-slate-200">"01d"</code> for clear day, <code className="text-slate-200">"10d"</code> for rain).
              Rather than loading low-resolution PNGs from external servers, map these codes to crisp SVG icons from <code className="text-emerald-400">lucide-react</code>:
            </p>

            <CodeBlock
              filename="components/DynamicWeatherIcon.tsx"
              language="tsx"
              code={`// components/DynamicWeatherIcon.tsx
import React from 'react';
import {
  Sun,
  Moon,
  Cloud,
  CloudSun,
  CloudMoon,
  CloudRain,
  CloudDrizzle,
  CloudLightning,
  CloudSnow,
  CloudFog,
} from 'lucide-react';

interface Props {
  iconCode?: string;
  condition?: string;
  className?: string;
}

export const DynamicWeatherIcon: React.FC<Props> = ({
  iconCode = '01d',
  condition = '',
  className = 'w-8 h-8',
}) => {
  // Mapping OpenWeatherMap standard icon codes
  switch (iconCode) {
    case '01d':
      return <Sun className={\`\${className} text-amber-400\`} />;
    case '01n':
      return <Moon className={\`\${className} text-indigo-300\`} />;
    case '02d':
      return <CloudSun className={\`\${className} text-amber-300\`} />;
    case '02n':
      return <CloudMoon className={\`\${className} text-indigo-200\`} />;
    case '03d':
    case '03n':
    case '04d':
    case '04n':
      return <Cloud className={\`\${className} text-slate-300\`} />;
    case '09d':
    case '09n':
      return <CloudDrizzle className={\`\${className} text-cyan-400\`} />;
    case '10d':
    case '10n':
      return <CloudRain className={\`\${className} text-cyan-400\`} />;
    case '11d':
    case '11n':
      return <CloudLightning className={\`\${className} text-amber-400\`} />;
    case '13d':
    case '13n':
      return <CloudSnow className={\`\${className} text-sky-200\`} />;
    case '50d':
    case '50n':
      return <CloudFog className={\`\${className} text-slate-400\`} />;
    default:
      return <Sun className={\`\${className} text-amber-400\`} />;
  }
};`}
            />

            <div className="pt-4 flex justify-between items-center">
              <button
                type="button"
                onClick={() => onSelectSection('step-1-types')}
                className="text-xs text-slate-400 hover:text-slate-200"
              >
                ← Back to Step 1: Types
              </button>
              <button
                type="button"
                onClick={() => onSelectSection('step-3-implementation')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-colors cursor-pointer"
              >
                <span>Proceed to Step 3: Implementation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* SECTION: STEP 3 - IMPLEMENTATION */}
      {activeSection === 'step-3-implementation' && (
        <section className="space-y-10 animate-in fade-in duration-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold mb-2">
              <span>Step-by-Step Guides</span>
              <span>/</span>
              <span>Step 3: Implementation Guide</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Implementation Guide: API Fetching, States & Persistence
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Step-by-step instructions for implementing asynchronous data fetching, managing loading
              and error states, building city search, and persisting recent queries to localStorage.
            </p>
          </div>

          {/* Subsection: Asynchronous API Fetching */}
          <div id="async-fetching" className="space-y-4 pt-4 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Asynchronous API Fetching Function
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Create a dedicated API helper module at <code className="text-emerald-400">lib/weather.ts</code>.
              This function safely handles URL encoding, builds query parameters for units (<code className="text-slate-200">metric</code> or <code className="text-slate-200">imperial</code>),
              and throws descriptive errors for non-200 responses:
            </p>

            <CodeBlock
              filename="lib/weather.ts"
              language="typescript"
              code={`// lib/weather.ts
import type { WeatherResponse } from '@/types/weather';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function fetchWeatherByCity(
  city: string,
  units: 'metric' | 'imperial' = 'metric'
): Promise<WeatherResponse> {
  const trimmedCity = city.trim();
  if (!trimmedCity) {
    throw new Error('City name cannot be blank.');
  }

  if (!API_KEY) {
    throw new Error('Missing OpenWeatherMap API key in environment variables.');
  }

  const endpoint = \`\${BASE_URL}?q=\${encodeURIComponent(trimmedCity)}&units=\${units}&appid=\${API_KEY}\`;

  const response = await fetch(endpoint, {
    // Next.js cache configuration: cache for 60 seconds
    next: { revalidate: 60 },
  });

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(\`City "\${trimmedCity}" not found. Please check spelling.\`);
    }
    if (response.status === 401) {
      throw new Error('Invalid OpenWeatherMap API key. Check .env.local configuration.');
    }
    if (response.status === 429) {
      throw new Error('Rate limit exceeded. Please wait a minute before querying again.');
    }
    throw new Error(data.message || 'Failed to fetch weather data.');
  }

  return data as WeatherResponse;
}`}
            />
          </div>

          {/* Subsection: Loading States */}
          <div id="loading-states" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Loading States & Skeleton Placeholders
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Never present a frozen or blank screen during network requests. While <code className="text-emerald-400">loading === true</code>,
              disable the search button and display pulse animated skeleton blocks:
            </p>

            <CodeBlock
              filename="components/WeatherSkeleton.tsx"
              language="tsx"
              code={`// components/WeatherSkeleton.tsx
export const WeatherSkeleton = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Primary card skeleton */}
      <div className="h-44 bg-slate-900 rounded-2xl border border-slate-800" />
      {/* 4-column metric grid skeletons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="h-24 bg-slate-900 rounded-xl border border-slate-800" />
        <div className="h-24 bg-slate-900 rounded-xl border border-slate-800" />
        <div className="h-24 bg-slate-900 rounded-xl border border-slate-800" />
        <div className="h-24 bg-slate-900 rounded-xl border border-slate-800" />
      </div>
    </div>
  );
};`}
            />
          </div>

          {/* Subsection: Error States */}
          <div id="error-handling" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Error States & User Feedback
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              When an API request fails, catch the error and present an actionable alert rather than
              an unhandled JavaScript error:
            </p>

            <CodeBlock
              filename="components/ErrorAlert.tsx"
              language="tsx"
              code={`// components/ErrorAlert.tsx
import { AlertCircle } from 'lucide-react';

interface ErrorAlertProps {
  message: string;
}

export const ErrorAlert = ({ message }: ErrorAlertProps) => (
  <div
    role="alert"
    className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/40 text-rose-300 flex items-start gap-3"
  >
    <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
    <div className="text-sm">
      <span className="font-semibold block">Query Error</span>
      <p className="text-rose-300/90 text-xs mt-0.5">{message}</p>
    </div>
  </div>
);`}
            />
          </div>

          {/* Subsection: City Search */}
          <div id="city-search" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              City Search Handling
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              The search input component handles form submission with <code className="text-slate-200">e.preventDefault()</code>,
              trims whitespace, and prevents duplicate submissions while loading:
            </p>

            <CodeBlock
              filename="components/SearchBar.tsx"
              language="tsx"
              code={`// components/SearchBar.tsx
'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSearch(input.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full max-w-md">
      <div className="relative flex-1">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter city name (e.g. London, Tokyo)..."
          className="w-full pl-9 pr-4 py-2 text-sm bg-slate-900 border border-slate-700/80 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm rounded-lg transition-colors disabled:opacity-50"
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};`}
            />
          </div>

          {/* Subsection: Recent Searches Persistence */}
          <div id="search-persistence" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Recent Searches Persistence via LocalStorage
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              To persist recent searches across page reloads without a server database, store an array of
              recent queries in the browser's <code className="text-emerald-400">localStorage</code>:
            </p>

            <CodeBlock
              filename="lib/storage.ts"
              language="typescript"
              code={`// lib/storage.ts
import type { RecentSearchItem } from '@/types/weather';

const STORAGE_KEY = 'weather_recent_searches';
const MAX_RECENT_ITEMS = 5;

export function getSavedSearches(): RecentSearchItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveRecentSearch(city: string, temp?: number, condition?: string): RecentSearchItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = getSavedSearches();
    // Filter out existing duplicate (case-insensitive)
    const filtered = current.filter(
      (item) => item.city.toLowerCase() !== city.toLowerCase()
    );
    const updated: RecentSearchItem[] = [
      { city, timestamp: Date.now(), temp, condition },
      ...filtered,
    ].slice(0, MAX_RECENT_ITEMS);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function clearSavedSearches(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}`}
            />

            <Callout type="tip" title="Hydration Safety in Next.js">
              Always wrap <code className="text-emerald-300">localStorage</code> reads inside a <code className="text-emerald-300">useEffect</code> hook or guard with <code className="text-emerald-300">typeof window !== 'undefined'</code>. Reading localStorage during initial server rendering will cause a Next.js hydration mismatch error.
            </Callout>

            <div className="pt-4 flex justify-between items-center">
              <button
                type="button"
                onClick={() => onSelectSection('step-2-styling')}
                className="text-xs text-slate-400 hover:text-slate-200"
              >
                ← Back to Step 2: Styling
              </button>
              <button
                type="button"
                onClick={() => onSelectSection('code-reference')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-colors cursor-pointer"
              >
                <span>Proceed to Code Reference</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* SECTION: CODE REFERENCE */}
      {activeSection === 'code-reference' && (
        <section className="space-y-10 animate-in fade-in duration-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold mb-2">
              <span>Code Reference</span>
              <span>/</span>
              <span>Production Modules</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Complete Production Code Reference
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Direct, copy-pasteable TypeScript code files for each module of the Weather Dashboard.
              Click the copy button on any code block to copy the full snippet to your clipboard.
            </p>
          </div>

          {/* types/weather.ts */}
          <div id="code-types" className="space-y-4 pt-4 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              1. types/weather.ts
            </h2>
            <CodeBlock
              filename="types/weather.ts"
              language="typescript"
              code={`export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainWeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface WindData {
  speed: number;
  deg: number;
  gust?: number;
}

export interface Coordinates {
  lon: number;
  lat: number;
}

export interface SysData {
  country: string;
  sunrise: number;
  sunset: number;
}

export interface WeatherResponse {
  coord: Coordinates;
  weather: WeatherCondition[];
  base: string;
  main: MainWeatherData;
  visibility: number;
  wind: WindData;
  clouds: {
    all: number;
  };
  dt: number;
  sys: SysData;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface RecentSearchItem {
  city: string;
  timestamp: number;
  temp?: number;
  condition?: string;
}`}
            />
          </div>

          {/* lib/weather.ts */}
          <div id="code-api" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              2. lib/weather.ts
            </h2>
            <CodeBlock
              filename="lib/weather.ts"
              language="typescript"
              code={`import type { WeatherResponse } from '@/types/weather';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function fetchWeatherByCity(
  city: string,
  units: 'metric' | 'imperial' = 'metric'
): Promise<WeatherResponse> {
  const trimmed = city.trim();
  if (!trimmed) {
    throw new Error('Please enter a valid city name.');
  }

  if (!API_KEY) {
    throw new Error('API key is missing. Add NEXT_PUBLIC_OPENWEATHER_API_KEY to your .env.local file.');
  }

  const url = \`\${BASE_URL}?q=\${encodeURIComponent(trimmed)}&units=\${units}&appid=\${API_KEY}\`;

  const response = await fetch(url, {
    next: { revalidate: 60 },
  });

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(\`City "\${trimmed}" was not found. Please verify spelling.\`);
    }
    if (response.status === 401) {
      throw new Error('Unauthorized: Invalid API key or key activation pending.');
    }
    throw new Error(data.message || 'Error fetching weather data.');
  }

  return data as WeatherResponse;
}`}
            />
          </div>

          {/* components/WeatherDashboard.tsx */}
          <div id="code-dashboard" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              3. components/WeatherDashboard.tsx
            </h2>
            <CodeBlock
              filename="components/WeatherDashboard.tsx"
              language="tsx"
              code={`'use client';

import React, { useState, useEffect } from 'react';
import type { WeatherResponse, RecentSearchItem } from '@/types/weather';
import { fetchWeatherByCity } from '@/lib/weather';
import { Search, Wind, Droplets, Gauge, Eye, RotateCcw } from 'lucide-react';

export default function WeatherDashboard() {
  const [city, setCity] = useState('London');
  const [input, setInput] = useState('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [recent, setRecent] = useState<RecentSearchItem[]>([]);

  // Initial load
  useEffect(() => {
    loadWeather('London');
    const stored = localStorage.getItem('weather_recent');
    if (stored) {
      try {
        setRecent(JSON.parse(stored));
      } catch {}
    }
  }, []);

  const loadWeather = async (targetCity: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherByCity(targetCity, unit);
      setWeather(data);
      // Update persistence
      const updated = [
        { city: data.name, timestamp: Date.now(), temp: data.main.temp, condition: data.weather[0]?.main },
        ...recent.filter((r) => r.city.toLowerCase() !== data.name.toLowerCase()),
      ].slice(0, 5);
      setRecent(updated);
      localStorage.setItem('weather_recent', JSON.stringify(updated));
    } catch (err: any) {
      setError(err.message || 'Failed to fetch weather.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      loadWeather(input.trim());
      setInput('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Search Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <form onSubmit={handleSearch} className="flex items-center gap-2 w-full sm:w-auto flex-1">
          <input
            type="text"
            placeholder="Search city..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-lg text-sm"
          >
            Search
          </button>
        </form>

        <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
          <button
            onClick={() => setUnit('metric')}
            className={\`px-3 py-1 rounded \${unit === 'metric' ? 'bg-slate-800 text-emerald-400 font-bold' : 'text-slate-400'}\`}
          >
            °C
          </button>
          <button
            onClick={() => setUnit('imperial')}
            className={\`px-3 py-1 rounded \${unit === 'imperial' ? 'bg-slate-800 text-emerald-400 font-bold' : 'text-slate-400'}\`}
          >
            °F
          </button>
        </div>
      </div>

      {/* Error alert */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-sm">
          {error}
        </div>
      )}

      {/* Weather Content */}
      {weather && !loading && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-white">{weather.name}, {weather.sys.country}</h2>
              <p className="text-slate-400 capitalize mt-1">{weather.weather[0]?.description}</p>
            </div>
            <div className="text-4xl font-extrabold text-white">
              {Math.round(weather.main.temp)}°{unit === 'metric' ? 'C' : 'F'}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400">Wind</span>
              <p className="text-lg font-bold">{weather.wind.speed} m/s</p>
            </div>
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400">Humidity</span>
              <p className="text-lg font-bold">{weather.main.humidity}%</p>
            </div>
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400">Pressure</span>
              <p className="text-lg font-bold">{weather.main.pressure} hPa</p>
            </div>
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400">Visibility</span>
              <p className="text-lg font-bold">{(weather.visibility / 1000).toFixed(1)} km</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}`}
            />
          </div>

          {/* app/page.tsx */}
          <div id="code-page" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              4. app/page.tsx
            </h2>
            <CodeBlock
              filename="app/page.tsx"
              language="tsx"
              code={`import WeatherDashboard from '@/components/WeatherDashboard';

export const metadata = {
  title: 'Weather Dashboard',
  description: 'Real-time meteorological insights powered by OpenWeatherMap API',
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 py-10 px-4">
      <WeatherDashboard />
    </main>
  );
}`}
            />

            <div className="pt-4 flex justify-between items-center">
              <button
                type="button"
                onClick={() => onSelectSection('step-3-implementation')}
                className="text-xs text-slate-400 hover:text-slate-200"
              >
                ← Back to Step 3: Implementation
              </button>
              <button
                type="button"
                onClick={() => onSelectSection('troubleshooting')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-colors cursor-pointer"
              >
                <span>Proceed to Troubleshooting</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* SECTION: TROUBLESHOOTING */}
      {activeSection === 'troubleshooting' && (
        <section className="space-y-10 animate-in fade-in duration-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400 font-semibold mb-2">
              <span>Troubleshooting</span>
              <span>/</span>
              <span>Common Errors</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Troubleshooting & Common Errors
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Diagnostic checklist and solutions for frequent HTTP error codes, API key delays,
              rate limits, and Next.js hydration anomalies.
            </p>
          </div>

          {/* 404 City Not Found */}
          <div id="err-404" className="space-y-4 pt-4 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="font-mono text-rose-400">404</span>
              <span>City Not Found</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              <strong>Symptom:</strong> The API responds with status code 404 and error body <code className="text-rose-300">{`{"cod": "404", "message": "city not found"}`}</code>.
            </p>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm space-y-2 text-slate-300">
              <span className="font-semibold text-white block">Root Cause & Diagnostic Steps:</span>
              <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm pl-1">
                <li>Leading or trailing whitespace submitted in query strings. Call <code className="text-emerald-400">city.trim()</code> before making requests.</li>
                <li>Unencoded special characters, accents, or spaces. Wrap search terms in <code className="text-emerald-400">encodeURIComponent()</code>.</li>
                <li>Ambiguous city names. Prompt users to include the two-letter ISO country code, for example <code className="text-slate-200">"London,UK"</code> or <code className="text-slate-200">"Paris,FR"</code>.</li>
              </ul>
            </div>

            <CodeBlock
              filename="lib/weather.ts (404 Defensive Handling)"
              language="typescript"
              code={`// Defensive helper to catch 404 responses cleanly
export async function getCityWeather(cityName: string) {
  const query = cityName.trim();

  if (!query) {
    throw new Error('Please enter a city name.');
  }

  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  const endpoint = \`https://api.openweathermap.org/data/2.5/weather?q=\${encodeURIComponent(query)}&appid=\${apiKey}&units=metric\`;

  const response = await fetch(endpoint);

  if (response.status === 404) {
    throw new Error(\`City "\${query}" was not found. Please verify spelling or try adding a country code like "\${query},US".\`);
  }

  if (!response.ok) {
    throw new Error('Weather data could not be retrieved.');
  }

  return response.json();
}`}
            />
          </div>

          {/* 401 Invalid API Key */}
          <div id="err-401" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="font-mono text-amber-400">401</span>
              <span>Invalid API Key / Unauthorized</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              <strong>Symptom:</strong> The API responds with status code 401 and error message <code className="text-amber-300">{`{"cod": 401, "message": "Invalid API key"}`}</code>.
            </p>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm space-y-2 text-slate-300">
              <span className="font-semibold text-white block">Root Cause & Diagnostic Steps:</span>
              <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm pl-1">
                <li>
                  <strong>Activation Delay:</strong> Newly created OpenWeatherMap keys typically require 10 to 60 minutes to propagate across their global edge network.
                </li>
                <li>
                  <strong>Missing NEXT_PUBLIC_ Prefix:</strong> In Next.js client components, environment variables without <code className="text-emerald-400">NEXT_PUBLIC_</code> compile to <code className="text-slate-400">undefined</code>.
                </li>
                <li>
                  <strong>Server Restart Needed:</strong> Next.js loads <code className="text-slate-200">.env.local</code> only at startup. Restart using <code className="text-emerald-400">npm run dev</code> after editing your key.
                </li>
              </ul>
            </div>

            <CodeBlock
              filename="lib/weather.ts (401 & Config Validation)"
              language="typescript"
              code={`// Validate API key configuration before making the request
export async function checkAndFetchWeather(city: string) {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  if (!apiKey || apiKey === 'your_api_key_here') {
    throw new Error('API key is missing. Add NEXT_PUBLIC_OPENWEATHER_API_KEY in .env.local and restart the server.');
  }

  const endpoint = \`https://api.openweathermap.org/data/2.5/weather?q=\${encodeURIComponent(city)}&appid=\${apiKey}&units=metric\`;
  const response = await fetch(endpoint);

  if (response.status === 401) {
    throw new Error('OpenWeather rejected the key (401). If recently created, allow up to 30 minutes for server activation.');
  }

  return response.json();
}`}
            />
          </div>

          {/* 429 Rate Limits */}
          <div id="err-429" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="font-mono text-cyan-400">429</span>
              <span>Too Many Requests / Rate Limits</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              <strong>Symptom:</strong> The API returns HTTP 429 stating subscription request limit exceeded.
            </p>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm space-y-2 text-slate-300">
              <span className="font-semibold text-white block">Root Cause & Diagnostic Steps:</span>
              <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm pl-1">
                <li>The free OpenWeatherMap plan permits up to 60 calls per minute. Do not trigger fetches on input keypress events.</li>
                <li>Implement a client-side in-memory cache to return stored city responses for queries made within 60 seconds.</li>
              </ul>
            </div>

            <CodeBlock
              filename="lib/weather.ts (In-Memory Throttle & Cache)"
              language="typescript"
              code={`// In-memory cache to prevent exceeding the 60 calls per minute quota
const weatherCache = new Map<string, { timestamp: number; data: any }>();
const CACHE_LIFETIME_MS = 60000;

export async function fetchWithRateLimitGuard(city: string) {
  const normalized = city.trim().toLowerCase();
  const cached = weatherCache.get(normalized);
  const now = Date.now();

  // Return cached result if fetched less than 60 seconds ago
  if (cached && now - cached.timestamp < CACHE_LIFETIME_MS) {
    return cached.data;
  }

  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  const endpoint = \`https://api.openweathermap.org/data/2.5/weather?q=\${encodeURIComponent(city)}&appid=\${apiKey}&units=metric\`;

  const response = await fetch(endpoint);

  if (response.status === 429) {
    throw new Error('Rate limit reached (429). The free tier allows 60 calls per minute. Please pause for a moment.');
  }

  const json = await response.json();
  weatherCache.set(normalized, { timestamp: now, data: json });
  return json;
}`}
            />
          </div>

          {/* Next.js Hydration */}
          <div id="err-hydration" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Next.js Hydration & LocalStorage Safety
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Accessing browser globals like <code className="text-emerald-400">localStorage</code> or <code className="text-emerald-400">window</code> directly
              during component initialization triggers Next.js hydration errors because the initial server render does not have access to the browser window.
            </p>

            <CodeBlock
              filename="hooks/useRecentSearches.ts (Hydration-Safe Storage Hook)"
              language="typescript"
              code={`// Safe custom hook that only reads localStorage on the client after mount
import { useState, useEffect } from 'react';

export function useRecentSearches() {
  const [history, setHistory] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('weather_history');
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Failed to parse localStorage history', err);
    }
    setIsReady(true);
  }, []);

  const addSearchCity = (newCity: string) => {
    const trimmed = newCity.trim();
    if (!trimmed) return;

    const filtered = history.filter(c => c.toLowerCase() !== trimmed.toLowerCase());
    const updated = [trimmed, ...filtered].slice(0, 5);

    setHistory(updated);
    try {
      localStorage.setItem('weather_history', JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to write to localStorage', err);
    }
  };

  return { history, addSearchCity, isReady };
}`}
            />

            <Callout type="warning" title="Avoid Server-Side LocalStorage Access">
              Executing <code className="text-rose-300">localStorage.getItem(...)</code> outside of a <code className="text-emerald-300">useEffect</code> hook triggers a build error because <code className="text-slate-300">localStorage</code> is undefined during server-side compilation!
            </Callout>

            <div className="pt-4 flex justify-between items-center">
              <button
                type="button"
                onClick={() => onSelectSection('code-reference')}
                className="text-xs text-slate-400 hover:text-slate-200"
              >
                ← Back to Code Reference
              </button>
              <button
                type="button"
                onClick={() => onSelectSection('live-demo')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-colors cursor-pointer"
              >
                <span>View Live Weather Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* SECTION: LIVE DEMO */}
      {activeSection === 'live-demo' && (
        <section className="space-y-10 animate-in fade-in duration-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold mb-2">
              <span>DevoraCamp Interactive Section</span>
              <span>/</span>
              <span>Live Demonstration</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Live Weather Dashboard Demonstration
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              This embedded interactive component demonstrates the completed Weather Dashboard taught
              throughout this documentation. Try searching global cities, switching temperature units,
              inspecting JSON responses, and viewing recent searches.
            </p>
          </div>

          {/* Embedded live interactive demo component */}
          <div id="embedded-demo" className="pt-2">
            <LiveWeatherDashboard />
          </div>

          {/* Subsection: Feature Walkthrough */}
          <div id="demo-features" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Component Feature Checklist
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-300">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <span className="font-semibold text-white block">1. Dynamic Weather Icons</span>
                <p className="text-xs text-slate-400">
                  Maps OpenWeatherMap codes to SVG icons like Sun, Rain, CloudSnow, and CloudLightning based on the payload.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <span className="font-semibold text-white block">2. Real-time Unit Conversion</span>
                <p className="text-xs text-slate-400">
                  Switch between Metric (°C) and Imperial (°F) instantly with synchronized wind speed units (m/s vs mph).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <span className="font-semibold text-white block">3. LocalStorage Persistence</span>
                <p className="text-xs text-slate-400">
                  Queries are automatically appended to a 5-item recent searches list, with quick click-to-reload and clear history buttons.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <span className="font-semibold text-white block">4. Error State Handling</span>
                <p className="text-xs text-slate-400">
                  Search for an unrecognized city name to observe graceful user alerts without unhandled rejections.
                </p>
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center">
              <button
                type="button"
                onClick={() => onSelectSection('troubleshooting')}
                className="text-xs text-slate-400 hover:text-slate-200"
              >
                ← Back to Troubleshooting
              </button>
              <button
                type="button"
                onClick={() => onSelectSection('overview')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-colors cursor-pointer"
              >
                <span>Return to Overview</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>
      )}
    </article>
  );
};
