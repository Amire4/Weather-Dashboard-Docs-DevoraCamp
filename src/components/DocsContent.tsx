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
  Terminal,
  Layers,
  Wrench,
  CheckCircle,
  Play,
  RotateCcw,
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
      {/* ========================================================= */}
      {/* SECTION: OVERVIEW                                         */}
      {/* ========================================================= */}
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
              Welcome to the DevoraCamp technical documentation for building a responsive, production-ready
              Weather Dashboard from scratch using Next.js (App Router), TypeScript, and Tailwind CSS.
            </p>
          </div>

          <InteractiveChecklist />

          {/* Subsection: Introduction & Learning Goals */}
          <div id="project-introduction" className="space-y-4 pt-4 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
              <CheckCircle className="w-6 h-6 text-emerald-400" />
              <span>Project Introduction & Learning Goals</span>
            </h2>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              The goal of this project is to develop a production-ready weather application that consumes
              the OpenWeatherMap REST API. This guide is designed so that a developer starting with only
              Node.js installed can follow each step in sequence and produce a fully working project.
              By completing this tutorial, you will master:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-slate-300 pl-2">
              <li>
                <strong className="text-white">Strict TypeScript Modeling:</strong> Defining complete,
                strongly-typed interfaces for the nested OpenWeatherMap API JSON response.
              </li>
              <li>
                <strong className="text-white">Asynchronous Data Lifecycle:</strong> Handling network requests
                with <code className="text-emerald-400">async/await</code> and managing pending, loaded, and error states.
              </li>
              <li>
                <strong className="text-white">API Key Security & Environment Configuration:</strong> Storing
                sensitive keys in <code className="text-emerald-400">.env.local</code> and protecting them with <code className="text-emerald-400">.gitignore</code>.
              </li>
              <li>
                <strong className="text-white">Celsius & Fahrenheit Unit Switching:</strong> Providing instant,
                seamless temperature and wind speed unit conversion without layout shifts.
              </li>
              <li>
                <strong className="text-white">Client-side Persistence:</strong> Storing recent search history
                in <code className="text-emerald-400">localStorage</code> with SSR hydration safety.
              </li>
              <li>
                <strong className="text-white">Responsive Tailwind UI:</strong> Crafting high-contrast weather cards,
                skeleton loading placeholders, and responsive layouts down to 375px mobile screens.
              </li>
            </ul>

            <Callout type="info" title="Curriculum Scope">
              This guide focuses purely on core developer competencies: asynchronous API integration,
              robust error boundaries, strict types, and clean component architecture. No complex external database
              or server backend is required.
            </Callout>
          </div>

          {/* Subsection: Tech Stack & System Prerequisites */}
          <div id="tech-stack" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
              <Layers className="w-6 h-6 text-cyan-400" />
              <span>Tech Stack & System Prerequisites</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Before proceeding to the installation steps, verify that your development environment meets
              the following software requirements:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-xs font-mono text-emerald-400 font-semibold block mb-1">
                  Runtime & Package Manager
                </span>
                <h4 className="text-base font-bold text-white">Node.js (v18.17+ or v20+) & npm (v9+)</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Required for running Next.js App Router and compiling TypeScript modules.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-xs font-mono text-emerald-400 font-semibold block mb-1">
                  Framework
                </span>
                <h4 className="text-base font-bold text-white">Next.js 14+ / 15 (App Router)</h4>
                <p className="text-xs text-slate-400 mt-1">
                  React Client Component directives (<code className="text-slate-300">'use client'</code>) and fast bundling.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-xs font-mono text-emerald-400 font-semibold block mb-1">
                  Language & Type Safety
                </span>
                <h4 className="text-base font-bold text-white">TypeScript (Strict Mode)</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Compile-time type checking, zero implicit <code className="text-slate-300">any</code>, and precise interfaces.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-xs font-mono text-emerald-400 font-semibold block mb-1">
                  Styling & Icons
                </span>
                <h4 className="text-base font-bold text-white">Tailwind CSS & Lucide React</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Utility classes for responsive layouts and clean vector SVG weather condition icons.
                </p>
              </div>
            </div>
          </div>

          {/* Subsection: Data Flow & Architecture */}
          <div id="data-flow" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
              <Wrench className="w-6 h-6 text-indigo-400" />
              <span>Data Flow & System Architecture</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              The data flow within the Weather Dashboard follows a single-direction reactive cycle:
            </p>

            <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-xs sm:text-sm text-slate-300 space-y-3">
              <div className="flex items-center flex-wrap gap-2 text-emerald-400 font-bold">
                <span>User Input</span>
                <span>⟶</span>
                <span>Validation</span>
                <span>⟶</span>
                <span>Async Fetch</span>
                <span>⟶</span>
                <span>LocalStorage + UI Render</span>
              </div>
              <p className="text-slate-400 text-xs font-sans leading-relaxed">
                1. <strong>Input Form:</strong> User types a city name (e.g., "Tokyo") and clicks Search.<br />
                2. <strong>Fetch Utility:</strong> Validates input string, encodes URL parameters, and issues an HTTP GET request to OpenWeatherMap.<br />
                3. <strong>State Orchestration:</strong> Activates skeleton loading; upon resolution, validates HTTP status codes (200, 401, 404, 429).<br />
                4. <strong>Cache & Persistence:</strong> Pushes city name into <code className="text-slate-200">localStorage</code> and updates state.<br />
                5. <strong>UI Metric Cards:</strong> Re-renders temperature, condition badges, and tabular metrics.
              </p>
            </div>

            <div className="pt-4 flex justify-between items-center">
              <span className="text-xs text-slate-500">Ready to start building?</span>
              <button
                type="button"
                onClick={() => onSelectSection('setup')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-colors cursor-pointer"
              >
                <span>Continue to Setup & Installation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* SECTION: SETUP & INSTALLATION                             */}
      {/* ========================================================= */}
      {activeSection === 'setup' && (
        <section className="space-y-10 animate-in fade-in duration-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold mb-2">
              <span>DevoraCamp Technical Guide</span>
              <span>/</span>
              <span>Setup & Installation</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Project Setup & Installation Guide
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Step-by-step instructions to create the project, install dependencies, configure TypeScript,
              obtain your OpenWeatherMap API key, and launch the development server.
            </p>
          </div>

          {/* Subsection: Prerequisites */}
          <div id="prerequisites" className="space-y-4 pt-4 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
              <Terminal className="w-6 h-6 text-emerald-400" />
              <span>1. Prerequisites & System Verification</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Open your terminal and verify that Node.js and npm are installed on your computer:
            </p>

            <CodeBlock
              filename="Terminal"
              language="bash"
              code={`# Check Node.js version (must be v18.17.0 or higher, recommended v20.x+)
node -v

# Check npm version (must be v9.0.0 or higher)
npm -v`}
            />

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              If Node.js is not installed, download the Active LTS release from{' '}
              <a
                href="https://nodejs.org"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 hover:underline font-medium inline-flex items-center gap-1"
              >
                nodejs.org <ExternalLink className="w-3.5 h-3.5" />
              </a>.
            </p>
          </div>

          {/* Subsection: Project Creation & Dependencies */}
          <div id="project-creation" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
              <Folder className="w-6 h-6 text-cyan-400" />
              <span>2. Creating the Next.js Project & Installing Dependencies</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Run the official <code className="text-emerald-400">create-next-app</code> CLI command to generate a new
              Next.js application configured with TypeScript and Tailwind CSS:
            </p>

            <CodeBlock
              filename="Terminal"
              language="bash"
              code={`# 1. Initialize the Next.js App Router project
npx create-next-app@latest weather-dashboard --typescript --tailwind --app --eslint --src-dir=false --import-alias="@/*"

# 2. Navigate into the new project directory
cd weather-dashboard

# 3. Install Lucide React for crisp weather and UI SVG icons
npm install lucide-react`}
            />

            <Callout type="tip" title="Explicit Dependencies">
              The project uses only one third-party package beyond the standard Next.js stack:{' '}
              <code className="text-emerald-300">lucide-react</code> for lightweight vector icons. No heavy UI component libraries or extra runtime dependencies are required.
            </Callout>
          </div>

          {/* Subsection: Folder Structure */}
          <div id="folder-structure" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
              <Folder className="w-6 h-6 text-indigo-400" />
              <span>3. Recommended Project Folder Structure</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Organize your project into clearly separated directories for types, helpers, and components:
            </p>

            <CodeBlock
              filename="Project Tree"
              language="bash"
              code={`weather-dashboard/
├── app/
│   ├── layout.tsx              # Root HTML document and global layout
│   ├── page.tsx                # Main page rendering WeatherDashboard
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
└── tsconfig.json               # TypeScript compiler options with strict mode`}
            />
          </div>

          {/* Subsection: Base TypeScript Setup */}
          <div id="base-typescript-setup" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
              <FileCode className="w-6 h-6 text-indigo-400" />
              <span>4. Base TypeScript Setup (tsconfig.json)</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Ensure your <code className="text-emerald-400">tsconfig.json</code> has strict mode enabled and path aliases configured:
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
              <span>5. Obtaining an OpenWeatherMap API Key</span>
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
                A default key is generated automatically, or you can enter a name (e.g. <em>"Weather Dashboard"</em>) and click <strong className="text-white">Generate</strong>.
              </li>
              <li>
                Copy the 32-character hexadecimal key (e.g. <code className="text-slate-200">a1b2c3d4e5f6...</code>).
              </li>
            </ol>

            <Callout type="rate-limit" title="OpenWeatherMap Free Tier Limits">
              The free <strong>Current Weather API</strong> plan permits up to <strong>60 API calls per minute</strong> and <strong>1,000,000 calls per month</strong>. This is more than adequate for local development and portfolio deployment.
            </Callout>

            <Callout type="warning" title="API Key Activation Delay">
              Newly created OpenWeatherMap API keys are not always active immediately. It typically takes <strong>10 to 60 minutes</strong> (and occasionally up to 2 hours) for a new key to propagate across global edge servers. If you encounter an HTTP <code className="text-rose-300">401 Unauthorized</code> right after generating the key, wait 30 minutes before retesting.
            </Callout>
          </div>

          {/* Subsection: Environment Variables & Running Dev Server */}
          <div id="environment-variables" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <span>6. Secure API Key (.env.local) & Running the Dev Server</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Never hardcode your API key inside TypeScript files. Create a local environment variable file
              named <code className="text-emerald-400">.env.local</code> in the root directory:
            </p>

            <CodeBlock
              filename=".env.local"
              language="bash"
              code={`# OpenWeatherMap API Key
# In Next.js client components, environment variables must start with NEXT_PUBLIC_
NEXT_PUBLIC_OPENWEATHER_API_KEY="your_32_character_api_key_here"`}
            />

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Also create a sanitized <code className="text-emerald-400">.env.example</code> file to commit to Git as documentation:
            </p>

            <CodeBlock
              filename=".env.example"
              language="bash"
              code={`# Sample environment configuration
NEXT_PUBLIC_OPENWEATHER_API_KEY="your_openweathermap_api_key_here"`}
            />

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Verify that <code className="text-emerald-400">.gitignore</code> contains <code className="text-slate-200">.env*.local</code> so your private key is never pushed to GitHub:
            </p>

            <CodeBlock
              filename=".gitignore"
              language="bash"
              code={`# Local environment files
.env*.local`}
            />

            <h3 className="text-lg font-bold text-white pt-2">Starting the Development Server</h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Launch the local development server with npm:
            </p>

            <CodeBlock
              filename="Terminal"
              language="bash"
              code={`npm run dev`}
            />

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Open your browser and navigate to{' '}
              <a
                href="http://localhost:3000"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 hover:underline font-mono font-medium"
              >
                http://localhost:3000
              </a>.
            </p>

            <div className="pt-4 flex justify-between items-center">
              <button
                type="button"
                onClick={() => onSelectSection('overview')}
                className="text-xs text-slate-400 hover:text-slate-200 cursor-pointer"
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

      {/* ========================================================= */}
      {/* SECTION: STEP 1 - TYPESCRIPT DEFINITIONS                  */}
      {/* ========================================================= */}
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
              Inspect the OpenWeatherMap JSON payload and model it into strict TypeScript contracts that
              provide compile-time safety and eliminate runtime property errors.
            </p>
          </div>

          {/* Subsection: Weather Response Interface */}
          <div id="weather-interfaces" className="space-y-4 pt-4 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Inspecting the API Response Structure
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              When querying the endpoint <code className="text-slate-200">GET https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=...</code>,
              the server returns a JSON structure:
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

          {/* Subsection: Sub-types in types/weather.ts */}
          <div id="sub-types" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Modeling Sub-Interfaces in types/weather.ts
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Create a new file at <code className="text-emerald-400">types/weather.ts</code> and model each sub-object:
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
              append the following interface to <code className="text-emerald-400">types/weather.ts</code>:
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
              By typing <code className="text-emerald-300">weather: WeatherCondition[]</code>, your code editor will immediately provide autocomplete for <code className="text-emerald-300">weather[0].description</code> and flag errors if you accidentally try to access invalid properties.
            </Callout>

            <div className="pt-4 flex justify-between items-center">
              <button
                type="button"
                onClick={() => onSelectSection('setup')}
                className="text-xs text-slate-400 hover:text-slate-200 cursor-pointer"
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

      {/* ========================================================= */}
      {/* SECTION: STEP 2 - STYLING & UI COMPONENTS                 */}
      {/* ========================================================= */}
      {activeSection === 'step-2-styling' && (
        <section className="space-y-10 animate-in fade-in duration-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold mb-2">
              <span>Step-by-Step Guides</span>
              <span>/</span>
              <span>Step 2: Styling Guide</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Styling Guide: UI Layout, Cards & Dynamic Icons
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Build clean, responsive UI components using Tailwind CSS utility classes, dynamic SVG weather
              icons, and responsive grid layouts designed down to 375px mobile screens.
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
              <p>1. <strong className="text-white">Search & Controls Bar:</strong> City text input, Search button, and Metric (°C) / Imperial (°F) unit toggles.</p>
              <p>2. <strong className="text-white">Primary Condition Banner:</strong> City name, country tag, current temperature in large tabular numerals, High/Low, and condition badge.</p>
              <p>3. <strong className="text-white">Metric Condition Grid:</strong> Responsive 4-column card grid displaying Wind Speed, Humidity, Atmospheric Pressure, and Visibility.</p>
            </div>
          </div>

          {/* Subsection: Dynamic Icons Mapping */}
          <div id="dynamic-icons" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Dynamic Weather Icons Mapping (components/DynamicWeatherIcon.tsx)
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              OpenWeatherMap returns standard 3-character icon codes (e.g. <code className="text-slate-200">"01d"</code> for clear day, <code className="text-slate-200">"01n"</code> for clear night, <code className="text-slate-200">"10d"</code> for rain).
              Rather than loading low-resolution raster images, map them to sharp SVG icons from <code className="text-emerald-400">lucide-react</code>:
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

interface DynamicWeatherIconProps {
  iconCode?: string;
  condition?: string;
  className?: string;
}

export const DynamicWeatherIcon: React.FC<DynamicWeatherIconProps> = ({
  iconCode = '01d',
  className = 'w-12 h-12',
}) => {
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
          </div>

          {/* Subsection: Weather Card */}
          <div id="weather-card" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Primary Weather Card (components/WeatherCard.tsx)
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Create <code className="text-emerald-400">components/WeatherCard.tsx</code> to display the primary weather summary:
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
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {weather.name}
            </h2>
            {weather.sys?.country && (
              <span className="px-2 py-0.5 text-xs font-bold rounded bg-slate-800 text-slate-300 border border-slate-700">
                {weather.sys.country}
              </span>
            )}
          </div>
          <p className="text-slate-400 capitalize text-sm mt-1">
            {weather.weather[0]?.description}
          </p>
          <div className="flex items-center gap-3 text-xs text-slate-400 mt-4 flex-wrap">
            <span>High: {Math.round(weather.main.temp_max)}°</span>
            <span>·</span>
            <span>Low: {Math.round(weather.main.temp_min)}°</span>
            <span>·</span>
            <span>Feels like: {Math.round(weather.main.feels_like)}°{unit === 'metric' ? 'C' : 'F'}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <DynamicWeatherIcon
            iconCode={weather.weather[0]?.icon}
            condition={weather.weather[0]?.main}
            className="w-14 h-14"
          />
          <div className="text-right">
            <div className="text-4xl sm:text-5xl font-extrabold text-white tabular-nums tracking-tighter">
              {Math.round(weather.main.temp)}°
              <span className="text-2xl text-emerald-400 font-semibold ml-1">
                {unit === 'metric' ? 'C' : 'F'}
              </span>
            </div>
            <div className="text-xs text-emerald-400 font-semibold mt-1 capitalize">
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

          {/* Subsection: Metric Grid */}
          <div id="metric-grid" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              4-Column Secondary Metrics Grid (components/MetricGrid.tsx)
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Create <code className="text-emerald-400">components/MetricGrid.tsx</code> to display wind speed, humidity, pressure, and visibility:
            </p>

            <CodeBlock
              filename="components/MetricGrid.tsx"
              language="tsx"
              code={`// components/MetricGrid.tsx
import React from 'react';
import type { WeatherResponse } from '@/types/weather';
import { Wind, Droplets, Gauge, Eye } from 'lucide-react';

interface MetricGridProps {
  weather: WeatherResponse;
  unit: 'metric' | 'imperial';
}

export const MetricGrid: React.FC<MetricGridProps> = ({ weather, unit }) => {
  const windDisplay = unit === 'metric' 
    ? \`\${weather.wind.speed} m/s\` 
    : \`\${weather.wind.speed} mph\`;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
      {/* Wind */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
        <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
          <Wind className="w-4 h-4 text-cyan-400" />
          <span>Wind</span>
        </div>
        <div className="text-lg font-bold text-white tabular-nums">
          {windDisplay}
        </div>
        <div className="text-[11px] text-slate-500">
          Direction: {weather.wind.deg}°
        </div>
      </div>

      {/* Humidity */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
        <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
          <Droplets className="w-4 h-4 text-blue-400" />
          <span>Humidity</span>
        </div>
        <div className="text-lg font-bold text-white tabular-nums">
          {weather.main.humidity}%
        </div>
        <div className="text-[11px] text-slate-500">
          Dew point relative
        </div>
      </div>

      {/* Pressure */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
        <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
          <Gauge className="w-4 h-4 text-emerald-400" />
          <span>Pressure</span>
        </div>
        <div className="text-lg font-bold text-white tabular-nums">
          {weather.main.pressure} <span className="text-xs text-slate-400 font-normal">hPa</span>
        </div>
        <div className="text-[11px] text-slate-500">
          Atmospheric
        </div>
      </div>

      {/* Visibility */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
        <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
          <Eye className="w-4 h-4 text-indigo-400" />
          <span>Visibility</span>
        </div>
        <div className="text-lg font-bold text-white tabular-nums">
          {(weather.visibility / 1000).toFixed(1)} <span className="text-xs text-slate-400 font-normal">km</span>
        </div>
        <div className="text-[11px] text-slate-500">
          Line of sight
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
              CSS & Tailwind Design Rules
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-slate-300 pl-2">
              <li>
                <strong className="text-white">Color Palette:</strong> Deep slate canvas (<code className="text-slate-200">bg-slate-950</code>), structural surfaces (<code className="text-slate-200">bg-slate-900 border-slate-800</code>), and emerald accent (<code className="text-emerald-400">text-emerald-400 / bg-emerald-500</code>).
              </li>
              <li>
                <strong className="text-white">Tabular Numerals:</strong> Always apply <code className="text-emerald-400">tabular-nums</code> to metric values so changing digits do not cause layout jank.
              </li>
              <li>
                <strong className="text-white">Mobile Responsiveness down to 375px:</strong> Use <code className="text-slate-200">grid-cols-2 sm:grid-cols-4</code> and flexible column wraps so all elements remain legible without horizontal scrollbars.
              </li>
            </ul>

            <div className="pt-4 flex justify-between items-center">
              <button
                type="button"
                onClick={() => onSelectSection('step-1-types')}
                className="text-xs text-slate-400 hover:text-slate-200 cursor-pointer"
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

      {/* ========================================================= */}
      {/* SECTION: STEP 3 - IMPLEMENTATION GUIDE                    */}
      {/* ========================================================= */}
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
              and error states, building city search, unit conversion, and persisting queries to localStorage.
            </p>
          </div>

          {/* Subsection: Asynchronous API Fetching */}
          <div id="async-fetching" className="space-y-4 pt-4 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              1. Asynchronous API Fetching (lib/weather.ts)
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Create a dedicated API client module at <code className="text-emerald-400">lib/weather.ts</code>.
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
  const trimmed = city.trim();
  if (!trimmed) {
    throw new Error('Please enter a valid city name.');
  }

  if (!API_KEY) {
    throw new Error('OpenWeatherMap API key is missing. Add NEXT_PUBLIC_OPENWEATHER_API_KEY in .env.local.');
  }

  const url = \`\${BASE_URL}?q=\${encodeURIComponent(trimmed)}&units=\${units}&appid=\${API_KEY}\`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(\`City "\${trimmed}" was not found. Please verify spelling.\`);
    }
    if (response.status === 401) {
      throw new Error('Invalid OpenWeatherMap API key (401). If newly created, wait 10-60 minutes for server activation.');
    }
    if (response.status === 429) {
      throw new Error('API rate limit reached (429). The free tier allows 60 calls/minute.');
    }
    throw new Error(data.message || 'Failed to fetch weather data.');
  }

  return data as WeatherResponse;
}`}
            />
          </div>

          {/* Subsection: City Search Input */}
          <div id="search-bar" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              2. City Search Input Component (components/SearchBar.tsx)
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Create <code className="text-emerald-400">components/SearchBar.tsx</code>. It handles form submission with <code className="text-slate-200">e.preventDefault()</code>,
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
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full max-w-md">
      <div className="relative flex-1">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter city (e.g. London, Tokyo, New York)..."
          className="w-full pl-9 pr-4 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-semibold text-sm rounded-lg transition-colors cursor-pointer"
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};`}
            />
          </div>

          {/* Subsection: Loading States & Skeletons */}
          <div id="loading-states" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              3. Loading States & Skeletons (components/WeatherSkeleton.tsx)
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Create <code className="text-emerald-400">components/WeatherSkeleton.tsx</code> to display animated placeholders during active network requests:
            </p>

            <CodeBlock
              filename="components/WeatherSkeleton.tsx"
              language="tsx"
              code={`// components/WeatherSkeleton.tsx
import React from 'react';

export const WeatherSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Primary card skeleton */}
      <div className="h-44 bg-slate-900 rounded-2xl border border-slate-800" />
      {/* 4-column metric grid skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
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
              4. Error States & User Feedback (components/ErrorAlert.tsx)
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Create <code className="text-emerald-400">components/ErrorAlert.tsx</code> to render user-friendly, actionable alerts when requests fail:
            </p>

            <CodeBlock
              filename="components/ErrorAlert.tsx"
              language="tsx"
              code={`// components/ErrorAlert.tsx
import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorAlertProps {
  message: string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => (
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

          {/* Subsection: Celsius & Fahrenheit Unit Conversion */}
          <div id="unit-conversion" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              5. Celsius & Fahrenheit Unit Switching
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              The dashboard supports both Metric (°C, m/s) and Imperial (°F, mph). Explain and implement
              both approaches:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-slate-300 pl-2">
              <li>
                <strong className="text-white">API Level:</strong> Passing <code className="text-emerald-300">&units=metric</code> returns Celsius and m/s; passing <code className="text-emerald-300">&units=imperial</code> returns Fahrenheit and mph.
              </li>
              <li>
                <strong className="text-white">Instant Client Conversion:</strong> When toggling units for the already displayed city, convert mathematically without repeating network requests to save API calls:
                <br />
                <span className="font-mono text-xs text-emerald-400 pl-4 block mt-1">
                  °F = (C × 9/5) + 32 &nbsp;|&nbsp; °C = (F - 32) × 5/9
                </span>
              </li>
            </ul>
          </div>

          {/* Subsection: LocalStorage Persistence */}
          <div id="search-persistence" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              6. Recent Searches Persistence (lib/storage.ts & components/RecentSearches.tsx)
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Create <code className="text-emerald-400">lib/storage.ts</code> to encapsulate safe browser storage operations with SSR hydration protection:
            </p>

            <CodeBlock
              filename="lib/storage.ts"
              language="typescript"
              code={`// lib/storage.ts
import type { RecentSearchItem } from '@/types/weather';

const STORAGE_KEY = 'weather_recent_searches';
const MAX_ITEMS = 5;

export function getSavedSearches(): RecentSearchItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveRecentSearch(
  city: string,
  temp?: number,
  condition?: string
): RecentSearchItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = getSavedSearches();
    const filtered = current.filter(
      (item) => item.city.toLowerCase() !== city.toLowerCase()
    );
    const updated: RecentSearchItem[] = [
      { city, timestamp: Date.now(), temp, condition },
      ...filtered,
    ].slice(0, MAX_ITEMS);

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
  } catch {}
}`}
            />

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-4">
              Now create <code className="text-emerald-400">components/RecentSearches.tsx</code> to render clickable history pills:
            </p>

            <CodeBlock
              filename="components/RecentSearches.tsx"
              language="tsx"
              code={`// components/RecentSearches.tsx
import React from 'react';
import type { RecentSearchItem } from '@/types/weather';
import { RotateCcw, Trash2 } from 'lucide-react';

interface RecentSearchesProps {
  items: RecentSearchItem[];
  onSelectCity: (city: string) => void;
  onClear: () => void;
  unit: 'metric' | 'imperial';
}

export const RecentSearches: React.FC<RecentSearchesProps> = ({
  items,
  onSelectCity,
  onClear,
  unit,
}) => {
  if (items.length === 0) return null;

  return (
    <div className="pt-4 border-t border-slate-800">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-slate-400">Recent Searches</span>
        <button
          type="button"
          onClick={onClear}
          className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
        >
          <Trash2 className="w-3 h-3" />
          <span>Clear history</span>
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item, idx) => (
          <button
            key={\`\${item.city}-\${idx}\`}
            type="button"
            onClick={() => onSelectCity(item.city)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <RotateCcw className="w-3 h-3 text-slate-500" />
            <span className="font-medium">{item.city}</span>
            {item.temp !== undefined && (
              <span className="text-emerald-400 font-mono text-[11px]">
                {Math.round(item.temp)}°{unit === 'metric' ? 'C' : 'F'}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};`}
            />

            <div className="pt-4 flex justify-between items-center">
              <button
                type="button"
                onClick={() => onSelectSection('step-2-styling')}
                className="text-xs text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                ← Back to Step 2: Styling
              </button>
              <button
                type="button"
                onClick={() => onSelectSection('code-reference')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-colors cursor-pointer"
              >
                <span>Proceed to Complete Code Reference</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* SECTION: COMPLETE CODE REFERENCE                          */}
      {/* ========================================================= */}
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
              Every single production-ready TypeScript and TSX file required to build the Weather Dashboard.
              Copy each file directly into your project to achieve a fully compiling, working application.
            </p>
          </div>

          {/* 1. types/weather.ts */}
          <div id="code-types" className="space-y-4 pt-4 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              1. types/weather.ts
            </h2>
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
}

export interface RecentSearchItem {
  city: string;
  timestamp: number;
  temp?: number;
  condition?: string;
}`}
            />
          </div>

          {/* 2. lib/weather.ts */}
          <div id="code-api" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              2. lib/weather.ts
            </h2>
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
  const trimmed = city.trim();
  if (!trimmed) {
    throw new Error('Please enter a valid city name.');
  }

  if (!API_KEY) {
    throw new Error('API key is missing. Add NEXT_PUBLIC_OPENWEATHER_API_KEY to your .env.local file.');
  }

  const url = \`\${BASE_URL}?q=\${encodeURIComponent(trimmed)}&units=\${units}&appid=\${API_KEY}\`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(\`City "\${trimmed}" was not found. Please verify spelling.\`);
    }
    if (response.status === 401) {
      throw new Error('Invalid OpenWeatherMap API key (401). If newly created, allow 10-60 minutes for server activation.');
    }
    if (response.status === 429) {
      throw new Error('Rate limit exceeded (429). The free tier allows 60 calls per minute.');
    }
    throw new Error(data.message || 'Error fetching weather data.');
  }

  return data as WeatherResponse;
}`}
            />
          </div>

          {/* 3. lib/storage.ts */}
          <div id="code-storage" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              3. lib/storage.ts
            </h2>
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

export function saveRecentSearch(
  city: string,
  temp?: number,
  condition?: string
): RecentSearchItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = getSavedSearches();
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
  } catch {}
}`}
            />
          </div>

          {/* 4. components/DynamicWeatherIcon.tsx */}
          <div id="code-icons" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              4. components/DynamicWeatherIcon.tsx
            </h2>
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

interface DynamicWeatherIconProps {
  iconCode?: string;
  condition?: string;
  className?: string;
}

export const DynamicWeatherIcon: React.FC<DynamicWeatherIconProps> = ({
  iconCode = '01d',
  className = 'w-12 h-12',
}) => {
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
          </div>

          {/* 5. components/WeatherCard.tsx */}
          <div id="code-card" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              5. components/WeatherCard.tsx
            </h2>
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
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {weather.name}
            </h2>
            {weather.sys?.country && (
              <span className="px-2 py-0.5 text-xs font-bold rounded bg-slate-800 text-slate-300 border border-slate-700">
                {weather.sys.country}
              </span>
            )}
          </div>
          <p className="text-slate-400 capitalize text-sm mt-1">
            {weather.weather[0]?.description}
          </p>
          <div className="flex items-center gap-3 text-xs text-slate-400 mt-4 flex-wrap">
            <span>High: {Math.round(weather.main.temp_max)}°</span>
            <span>·</span>
            <span>Low: {Math.round(weather.main.temp_min)}°</span>
            <span>·</span>
            <span>Feels like: {Math.round(weather.main.feels_like)}°{unit === 'metric' ? 'C' : 'F'}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <DynamicWeatherIcon
            iconCode={weather.weather[0]?.icon}
            condition={weather.weather[0]?.main}
            className="w-14 h-14"
          />
          <div className="text-right">
            <div className="text-4xl sm:text-5xl font-extrabold text-white tabular-nums tracking-tighter">
              {Math.round(weather.main.temp)}°
              <span className="text-2xl text-emerald-400 font-semibold ml-1">
                {unit === 'metric' ? 'C' : 'F'}
              </span>
            </div>
            <div className="text-xs text-emerald-400 font-semibold mt-1 capitalize">
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

          {/* 6. components/MetricGrid.tsx */}
          <div id="code-metric" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              6. components/MetricGrid.tsx
            </h2>
            <CodeBlock
              filename="components/MetricGrid.tsx"
              language="tsx"
              code={`// components/MetricGrid.tsx
import React from 'react';
import type { WeatherResponse } from '@/types/weather';
import { Wind, Droplets, Gauge, Eye } from 'lucide-react';

interface MetricGridProps {
  weather: WeatherResponse;
  unit: 'metric' | 'imperial';
}

export const MetricGrid: React.FC<MetricGridProps> = ({ weather, unit }) => {
  const windDisplay = unit === 'metric' 
    ? \`\${weather.wind.speed} m/s\` 
    : \`\${weather.wind.speed} mph\`;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
        <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
          <Wind className="w-4 h-4 text-cyan-400" />
          <span>Wind</span>
        </div>
        <div className="text-lg font-bold text-white tabular-nums">
          {windDisplay}
        </div>
        <div className="text-[11px] text-slate-500">
          Direction: {weather.wind.deg}°
        </div>
      </div>

      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
        <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
          <Droplets className="w-4 h-4 text-blue-400" />
          <span>Humidity</span>
        </div>
        <div className="text-lg font-bold text-white tabular-nums">
          {weather.main.humidity}%
        </div>
        <div className="text-[11px] text-slate-500">
          Dew point relative
        </div>
      </div>

      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
        <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
          <Gauge className="w-4 h-4 text-emerald-400" />
          <span>Pressure</span>
        </div>
        <div className="text-lg font-bold text-white tabular-nums">
          {weather.main.pressure} <span className="text-xs text-slate-400 font-normal">hPa</span>
        </div>
        <div className="text-[11px] text-slate-500">
          Atmospheric
        </div>
      </div>

      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
        <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
          <Eye className="w-4 h-4 text-indigo-400" />
          <span>Visibility</span>
        </div>
        <div className="text-lg font-bold text-white tabular-nums">
          {(weather.visibility / 1000).toFixed(1)} <span className="text-xs text-slate-400 font-normal">km</span>
        </div>
        <div className="text-[11px] text-slate-500">
          Line of sight
        </div>
      </div>
    </div>
  );
};`}
            />
          </div>

          {/* 7. components/SearchBar.tsx */}
          <div id="code-search" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              7. components/SearchBar.tsx
            </h2>
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
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full max-w-md">
      <div className="relative flex-1">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter city (e.g. London, Tokyo, New York)..."
          className="w-full pl-9 pr-4 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-semibold text-sm rounded-lg transition-colors cursor-pointer"
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};`}
            />
          </div>

          {/* 8. components/WeatherSkeleton.tsx */}
          <div id="code-skeleton" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              8. components/WeatherSkeleton.tsx
            </h2>
            <CodeBlock
              filename="components/WeatherSkeleton.tsx"
              language="tsx"
              code={`// components/WeatherSkeleton.tsx
import React from 'react';

export const WeatherSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-44 bg-slate-900 rounded-2xl border border-slate-800" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
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

          {/* 9. components/ErrorAlert.tsx */}
          <div id="code-error" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              9. components/ErrorAlert.tsx
            </h2>
            <CodeBlock
              filename="components/ErrorAlert.tsx"
              language="tsx"
              code={`// components/ErrorAlert.tsx
import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorAlertProps {
  message: string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => (
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

          {/* 10. components/RecentSearches.tsx */}
          <div id="code-recent" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              10. components/RecentSearches.tsx
            </h2>
            <CodeBlock
              filename="components/RecentSearches.tsx"
              language="tsx"
              code={`// components/RecentSearches.tsx
import React from 'react';
import type { RecentSearchItem } from '@/types/weather';
import { RotateCcw, Trash2 } from 'lucide-react';

interface RecentSearchesProps {
  items: RecentSearchItem[];
  onSelectCity: (city: string) => void;
  onClear: () => void;
  unit: 'metric' | 'imperial';
}

export const RecentSearches: React.FC<RecentSearchesProps> = ({
  items,
  onSelectCity,
  onClear,
  unit,
}) => {
  if (items.length === 0) return null;

  return (
    <div className="pt-4 border-t border-slate-800">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-slate-400">Recent Searches</span>
        <button
          type="button"
          onClick={onClear}
          className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
        >
          <Trash2 className="w-3 h-3" />
          <span>Clear history</span>
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item, idx) => (
          <button
            key={\`\${item.city}-\${idx}\`}
            type="button"
            onClick={() => onSelectCity(item.city)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <RotateCcw className="w-3 h-3 text-slate-500" />
            <span className="font-medium">{item.city}</span>
            {item.temp !== undefined && (
              <span className="text-emerald-400 font-mono text-[11px]">
                {Math.round(item.temp)}°{unit === 'metric' ? 'C' : 'F'}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};`}
            />
          </div>

          {/* 11. components/WeatherDashboard.tsx */}
          <div id="code-dashboard" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              11. components/WeatherDashboard.tsx (Coordinator)
            </h2>
            <CodeBlock
              filename="components/WeatherDashboard.tsx"
              language="tsx"
              code={`// components/WeatherDashboard.tsx
'use client';

import React, { useState, useEffect } from 'react';
import type { WeatherResponse, RecentSearchItem } from '@/types/weather';
import { fetchWeatherByCity } from '@/lib/weather';
import { getSavedSearches, saveRecentSearch, clearSavedSearches } from '@/lib/storage';
import { SearchBar } from './SearchBar';
import { WeatherCard } from './WeatherCard';
import { MetricGrid } from './MetricGrid';
import { WeatherSkeleton } from './WeatherSkeleton';
import { ErrorAlert } from './ErrorAlert';
import { RecentSearches } from './RecentSearches';

export default function WeatherDashboard() {
  const [city, setCity] = useState<string>('London');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [recent, setRecent] = useState<RecentSearchItem[]>([]);

  // Load initial city and read recent searches on mount
  useEffect(() => {
    loadWeather('London', 'metric');
    setRecent(getSavedSearches());
  }, []);

  const loadWeather = async (targetCity: string, activeUnit: 'metric' | 'imperial') => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherByCity(targetCity, activeUnit);
      setWeather(data);
      setCity(data.name);

      // Persist to localStorage
      const updated = saveRecentSearch(
        data.name,
        data.main.temp,
        data.weather[0]?.main
      );
      setRecent(updated);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch weather.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchCity: string) => {
    loadWeather(searchCity, unit);
  };

  // Toggle temperature unit with instant query update
  const handleToggleUnit = (newUnit: 'metric' | 'imperial') => {
    if (newUnit === unit) return;
    setUnit(newUnit);
    if (weather) {
      loadWeather(weather.name, newUnit);
    }
  };

  const handleClearHistory = () => {
    clearSavedSearches();
    setRecent([]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Search Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <SearchBar onSearch={handleSearch} isLoading={loading} />

        {/* Metric / Imperial Unit Toggle */}
        <div className="flex items-center self-end sm:self-auto p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-semibold">
          <button
            type="button"
            onClick={() => handleToggleUnit('metric')}
            className={\`px-3 py-1.5 rounded-md transition-colors cursor-pointer \${
              unit === 'metric'
                ? 'bg-slate-800 text-emerald-400 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }\`}
          >
            °C Metric
          </button>
          <button
            type="button"
            onClick={() => handleToggleUnit('imperial')}
            className={\`px-3 py-1.5 rounded-md transition-colors cursor-pointer \${
              unit === 'imperial'
                ? 'bg-slate-800 text-emerald-400 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }\`}
          >
            °F Imperial
          </button>
        </div>
      </div>

      {/* Error Feedback Alert */}
      {error && <ErrorAlert message={error} />}

      {/* Loading Skeleton */}
      {loading && <WeatherSkeleton />}

      {/* Loaded Weather Cards */}
      {!loading && weather && (
        <div className="space-y-6">
          <WeatherCard weather={weather} unit={unit} />
          <MetricGrid weather={weather} unit={unit} />
        </div>
      )}

      {/* Recent Search History */}
      <RecentSearches
        items={recent}
        onSelectCity={(selectedCity: string) => loadWeather(selectedCity, unit)}
        onClear={handleClearHistory}
        unit={unit}
      />
    </div>
  );
}`}
            />
          </div>

          {/* 12. app/layout.tsx & globals.css */}
          <div id="code-layout" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              12. app/layout.tsx & app/globals.css
            </h2>
            <CodeBlock
              filename="app/layout.tsx"
              language="tsx"
              code={`// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Weather Dashboard',
  description: 'Real-time global weather dashboard built with Next.js and OpenWeatherMap API',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}`}
            />

            <CodeBlock
              filename="app/globals.css"
              language="css"
              code={`@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #020617;
  color: #f8fafc;
}`}
            />
          </div>

          {/* 13. app/page.tsx */}
          <div id="code-page" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              13. app/page.tsx
            </h2>
            <CodeBlock
              filename="app/page.tsx"
              language="tsx"
              code={`// app/page.tsx
import WeatherDashboard from '@/components/WeatherDashboard';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <header className="max-w-4xl mx-auto mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Weather Dashboard
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Real-time meteorological insights powered by OpenWeatherMap API
        </p>
      </header>

      <WeatherDashboard />
    </main>
  );
}`}
            />
          </div>

          {/* 14. Running & Building the Application */}
          <div id="code-run" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
              <Play className="w-6 h-6 text-emerald-400" />
              <span>14. Running & Building the Application</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Once you have created these files and added your API key to <code className="text-emerald-400">.env.local</code>,
              run the project locally:
            </p>

            <CodeBlock
              filename="Terminal"
              language="bash"
              code={`# Start the local development server
npm run dev

# Open in browser: http://localhost:3000

# Build for production
npm run build

# Start production server
npm run start`}
            />

            <div className="pt-4 flex justify-between items-center">
              <button
                type="button"
                onClick={() => onSelectSection('step-3-implementation')}
                className="text-xs text-slate-400 hover:text-slate-200 cursor-pointer"
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

      {/* ========================================================= */}
      {/* SECTION: TROUBLESHOOTING & COMMON ERRORS                  */}
      {/* ========================================================= */}
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
              Diagnostic checklist and step-by-step solutions for dependency conflicts, HTTP status errors,
              API key delays, rate limits, missing environment variables, and hydration bugs.
            </p>
          </div>

          {/* Dependency & npm install Errors */}
          <div id="err-install" className="space-y-4 pt-4 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="font-mono text-rose-400">npm</span>
              <span>Dependency Conflicts & npm install Errors</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              <strong>Symptom:</strong> <code className="text-rose-300">npm error ERESOLVE could not resolve dependency</code> during <code className="text-slate-200">npm install</code> (frequently seen in Vercel or CI).
            </p>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm space-y-2 text-slate-300">
              <span className="font-semibold text-white block">Root Cause & Fix:</span>
              <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm pl-1">
                <li>
                  <strong>Peer Dependency Conflict:</strong> Occurs when a sub-dependency requires a specific peer version of <code className="text-emerald-400">esbuild</code> or <code className="text-emerald-400">vite</code>.
                </li>
                <li>
                  <strong>Fix:</strong> Create an <code className="text-emerald-400">.npmrc</code> file in your project root with:
                  <div className="mt-1 font-mono text-xs bg-slate-950 p-2 rounded border border-slate-800 text-emerald-300">
                    legacy-peer-deps=true
                  </div>
                </li>
                <li>
                  Alternatively, execute: <code className="text-emerald-400">npm install --legacy-peer-deps</code>.
                </li>
              </ul>
            </div>
          </div>

          {/* 404 City Not Found */}
          <div id="err-404" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="font-mono text-rose-400">404</span>
              <span>City Not Found</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              <strong>Symptom:</strong> The API responds with status code 404 and error body <code className="text-rose-300">{`{"cod": "404", "message": "city not found"}`}</code>.
            </p>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm space-y-2 text-slate-300">
              <span className="font-semibold text-white block">Root Cause & Diagnostic Steps:</span>
              <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm pl-1">
                <li>
                  <strong>Whitespace in Search Query:</strong> Leading or trailing spaces cause queries to fail. Always call <code className="text-emerald-400">city.trim()</code> before making requests.
                </li>
                <li>
                  <strong>Unencoded Special Characters:</strong> Cities with spaces or accents (e.g., "New York", "São Paulo") must be wrapped in <code className="text-emerald-400">encodeURIComponent(query)</code>.
                </li>
                <li>
                  <strong>Ambiguous Cities:</strong> Prompt users to include the ISO 3166 2-letter country code (e.g. <code className="text-slate-200">"London,UK"</code> or <code className="text-slate-200">"Paris,FR"</code>).
                </li>
              </ul>
            </div>
          </div>

          {/* 401 Invalid API Key */}
          <div id="err-401" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="font-mono text-amber-400">401</span>
              <span>Invalid API Key / Unauthorized</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              <strong>Symptom:</strong> The API responds with status code 401 and message <code className="text-amber-300">{`{"cod": 401, "message": "Invalid API key"}`}</code>.
            </p>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm space-y-2 text-slate-300">
              <span className="font-semibold text-white block">Root Cause & Diagnostic Steps:</span>
              <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm pl-1">
                <li>
                  <strong>Activation Propagation Delay:</strong> Brand new OpenWeatherMap keys typically require <strong>10 to 60 minutes</strong> to propagate across global edge servers. Allow 30 minutes before retesting.
                </li>
                <li>
                  <strong>Missing NEXT_PUBLIC_ Prefix:</strong> Next.js client components cannot read environment variables unless prefixed with <code className="text-emerald-400">NEXT_PUBLIC_</code>.
                </li>
                <li>
                  <strong>Server Restart Needed:</strong> Next.js reads <code className="text-slate-200">.env.local</code> only on server startup. Restart the development server with <code className="text-emerald-400">npm run dev</code> after editing your key.
                </li>
              </ul>
            </div>
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
              <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm pl-1">
                <li>
                  The free tier allows <strong>60 calls per minute</strong>. Never bind API calls directly to input keypress events without debouncing.
                </li>
                <li>
                  Use form submit actions or button clicks to trigger requests instead of firing on every keystroke.
                </li>
              </ul>
            </div>
          </div>

          {/* Missing Environment Variables */}
          <div id="err-env" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="font-mono text-emerald-400">ENV</span>
              <span>Missing Environment Variable & Server Restart</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              <strong>Symptom:</strong> Console logs display <code className="text-rose-300">API key is missing</code> or <code className="text-slate-400">process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY === undefined</code>.
            </p>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm space-y-2 text-slate-300">
              <span className="font-semibold text-white block">Checklist:</span>
              <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm pl-1">
                <li>Check file name: Must be exactly <code className="text-emerald-400">.env.local</code> (not <code className="text-slate-400">.env.local.txt</code> or <code className="text-slate-400">env.local</code>).</li>
                <li>Check variable name: Must start with <code className="text-emerald-400">NEXT_PUBLIC_</code> for client-side access.</li>
                <li>Stop the dev server with <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-xs font-mono">Ctrl+C</kbd> and rerun <code className="text-emerald-400">npm run dev</code>.</li>
              </ul>
            </div>
          </div>

          {/* Next.js Hydration & LocalStorage */}
          <div id="err-hydration" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="font-mono text-indigo-400">SSR</span>
              <span>Next.js Hydration & LocalStorage Mismatch</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              <strong>Symptom:</strong> <code className="text-rose-300">ReferenceError: localStorage is not defined</code> or <code className="text-rose-300">Hydration failed because the initial UI does not match</code>.
            </p>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm space-y-2 text-slate-300">
              <span className="font-semibold text-white block">Solution:</span>
              <p className="text-xs sm:text-sm">
                During server-side rendering, <code className="text-emerald-400">window</code> and <code className="text-emerald-400">localStorage</code> do not exist. Always read from <code className="text-emerald-400">localStorage</code> inside a <code className="text-emerald-400">useEffect</code> hook or guard with <code className="text-emerald-400">typeof window !== 'undefined'</code>.
              </p>
            </div>
          </div>

          {/* Build & TypeScript Errors */}
          <div id="err-build" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="font-mono text-cyan-400">TSC</span>
              <span>Build & TypeScript Compilation Errors</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              <strong>Symptom:</strong> <code className="text-rose-300">npm run build</code> fails with TypeScript type errors or missing exports.
            </p>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm space-y-2 text-slate-300">
              <span className="font-semibold text-white block">Diagnostic Command:</span>
              <div className="font-mono text-xs bg-slate-950 p-2.5 rounded border border-slate-800 text-emerald-300">
                # Run TypeScript compiler check without emitting build artifacts
                npx tsc --noEmit
              </div>
              <p className="text-xs text-slate-400 mt-2">
                This will pinpoint the exact file and line number causing the type mismatch.
              </p>
            </div>

            <div className="pt-4 flex justify-between items-center">
              <button
                type="button"
                onClick={() => onSelectSection('code-reference')}
                className="text-xs text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                ← Back to Code Reference
              </button>
              <button
                type="button"
                onClick={() => onSelectSection('live-demo')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-colors cursor-pointer"
              >
                <span>View Live Weather Dashboard Demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* SECTION: LIVE DEMO                                        */}
      {/* ========================================================= */}
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
              This embedded interactive component demonstrates the finished application taught throughout
              this documentation. Try searching global cities, toggling units between Metric (°C) and Imperial (°F),
              inspecting the JSON response, and viewing recent search persistence.
            </p>
          </div>

          {/* Embedded live interactive demo component */}
          <div id="embedded-demo" className="pt-2">
            <LiveWeatherDashboard />
          </div>

          {/* Subsection: Feature Walkthrough */}
          <div id="demo-features" className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Feature Verification Checklist
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-300">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <span className="font-semibold text-white block">1. Dynamic Weather Icons</span>
                <p className="text-xs text-slate-400">
                  Maps condition codes to vector SVG icons (Sun, Moon, CloudSun, CloudRain, CloudSnow, CloudLightning) based on the payload.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <span className="font-semibold text-white block">2. Real-time Unit Conversion</span>
                <p className="text-xs text-slate-400">
                  Instant switching between Metric (°C, km/h) and Imperial (°F, mph) without layout shift or display jitter.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <span className="font-semibold text-white block">3. LocalStorage Persistence</span>
                <p className="text-xs text-slate-400">
                  Queries are automatically appended to recent search history with quick click-to-query and clear history buttons.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <span className="font-semibold text-white block">4. Error State Handling</span>
                <p className="text-xs text-slate-400">
                  Search for misspelled cities to verify graceful error alerts and defensive validation without unhandled rejections.
                </p>
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center">
              <button
                type="button"
                onClick={() => onSelectSection('troubleshooting')}
                className="text-xs text-slate-400 hover:text-slate-200 cursor-pointer"
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
