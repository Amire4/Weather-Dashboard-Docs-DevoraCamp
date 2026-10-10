import React, { useState, useEffect } from 'react';
import {
  Search,
  Wind,
  Droplets,
  Gauge,
  Sun,
  Moon,
  Cloud,
  CloudSun,
  CloudMoon,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
  CloudFog,
  RotateCcw,
  Key,
  Code2,
  PlayCircle,
  FileJson,
  AlertCircle,
  Trash2,
} from 'lucide-react';
import type { WeatherResponse, RecentSearchItem } from '../types/docs';

// Map WMO weather codes to Google-style conditions and icons
function mapWmoCode(code: number, isDay: boolean = true) {
  if (code === 0) {
    return {
      main: isDay ? 'Sunny' : 'Clear',
      description: isDay ? 'clear sky' : 'clear night sky',
      icon: isDay ? '01d' : '01n',
    };
  }
  if (code === 1 || code === 2) {
    return {
      main: 'Partly Cloudy',
      description: isDay ? 'partly cloudy' : 'partly cloudy night',
      icon: isDay ? '02d' : '02n',
    };
  }
  if (code === 3) {
    return {
      main: 'Clouds',
      description: 'overcast clouds',
      icon: '04d',
    };
  }
  if (code === 45 || code === 48) {
    return {
      main: 'Fog',
      description: 'foggy / haze',
      icon: '50d',
    };
  }
  if (code >= 51 && code <= 57) {
    return {
      main: 'Drizzle',
      description: 'light drizzle',
      icon: '09d',
    };
  }
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) {
    return {
      main: 'Rain',
      description: code >= 65 || code === 82 ? 'heavy rain showers' : 'rain showers',
      icon: '10d',
    };
  }
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
    return {
      main: 'Snow',
      description: 'snowfall',
      icon: '13d',
    };
  }
  if (code >= 95) {
    return {
      main: 'Thunderstorm',
      description: 'thunderstorm with rain',
      icon: '11d',
    };
  }
  return {
    main: isDay ? 'Clear' : 'Clear Night',
    description: 'clear sky',
    icon: isDay ? '01d' : '01n',
  };
}

// Convert wind direction degrees to compass points
function getCompassDirection(deg: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[Math.round(deg / 45) % 8];
}

// Format local time using UTC offset seconds
function formatCityTime(utcOffsetSeconds: number): string {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const localDate = new Date(utc + utcOffsetSeconds * 1000);
  return localDate.toLocaleTimeString('en-US', {
    weekday: 'short',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

// Default initial weather data (London)
const DEFAULT_WEATHER: WeatherResponse = {
  coord: { lon: -0.1257, lat: 51.5085 },
  weather: [{ id: 802, main: 'Clouds', description: 'scattered clouds', icon: '03d' }],
  base: 'stations',
  main: {
    temp: 18,
    feels_like: 17,
    temp_min: 14,
    temp_max: 20,
    pressure: 1014,
    humidity: 68,
  },
  visibility: 10000,
  wind: { speed: 14, deg: 240 },
  clouds: { all: 40 },
  dt: 1727265600,
  sys: { country: 'GB', sunrise: 1727243400, sunset: 1727286600 },
  timezone: 3600,
  id: 2643743,
  name: 'London',
  region: 'Greater London',
  cod: 200,
  is_day: 1,
  precipitation_probability: 20,
  local_time: 'Today',
};

export const LiveWeatherDashboard: React.FC = () => {
  const [cityInput, setCityInput] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [activeTab, setActiveTab] = useState<'demo' | 'code' | 'json'>('demo');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(DEFAULT_WEATHER);
  const [recentSearches, setRecentSearches] = useState<RecentSearchItem[]>([]);

  // Load recent searches from localStorage on mount and fetch live initial city
  useEffect(() => {
    try {
      const stored = localStorage.getItem('devoracamp_weather_recent');
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      } else {
        const defaults: RecentSearchItem[] = [
          { city: 'London', timestamp: Date.now() - 3600000, temp: 21, condition: 'Clouds' },
          { city: 'Tokyo', timestamp: Date.now() - 7200000, temp: 24, condition: 'Clear' },
          { city: 'Lahore', timestamp: Date.now() - 10800000, temp: 33, condition: 'Clear' },
        ];
        setRecentSearches(defaults);
        localStorage.setItem('devoracamp_weather_recent', JSON.stringify(defaults));
      }
    } catch {
      // storage unavailable
    }

    // Load live weather for initial city
    fetchWeather('London');
  }, []);

  const saveRecentSearch = (city: string, temp?: number, condition?: string) => {
    try {
      const updated = [
        { city, timestamp: Date.now(), temp: temp !== undefined ? Math.round(temp) : undefined, condition },
        ...recentSearches.filter((item) => item.city.toLowerCase() !== city.toLowerCase()),
      ].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('devoracamp_weather_recent', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem('devoracamp_weather_recent');
    } catch {
      // ignore
    }
  };

  // Convert temperature based on active unit (metric: Celsius, imperial: Fahrenheit)
  const convertTemp = (tempC: number) => {
    return unit === 'imperial' ? Math.round((tempC * 9) / 5 + 32) : Math.round(tempC);
  };

  // Convert wind speed (metric: km/h, imperial: mph)
  const formatWindSpeed = (speedKmh: number) => {
    return unit === 'imperial'
      ? `${Math.round(speedKmh * 0.621371)} mph`
      : `${Math.round(speedKmh)} km/h`;
  };

  // Fetch live weather data: station observation matching Google Weather
  const fetchWeather = async (queryCity: string) => {
    const trimmed = queryCity.trim();
    if (!trimmed) {
      setError('Please enter a city name.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Direct OpenWeatherMap API call if custom key is provided
      if (apiKey.trim()) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          trimmed
        )}&units=metric&appid=${apiKey.trim()}`;
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
          if (response.status === 404) throw new Error(`City "${trimmed}" not found. Please check spelling.`);
          if (response.status === 401) throw new Error('Invalid OpenWeatherMap API Key.');
          throw new Error(data.message || 'Failed to fetch weather data.');
        }

        const offsetSec = data.timezone || 0;
        const localTimeStr = formatCityTime(offsetSec);

        const parsedResponse: WeatherResponse = {
          coord: data.coord || { lon: 0, lat: 0 },
          weather: data.weather || [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
          base: 'stations',
          main: {
            temp: Math.round(data.main.temp),
            feels_like: Math.round(data.main.feels_like),
            temp_min: Math.round(data.main.temp_min),
            temp_max: Math.round(data.main.temp_max),
            pressure: data.main.pressure,
            humidity: data.main.humidity,
          },
          visibility: data.visibility || 10000,
          wind: {
            speed: (data.wind?.speed || 0) * 3.6,
            deg: data.wind?.deg || 0,
          },
          clouds: data.clouds || { all: 0 },
          dt: data.dt || Math.floor(Date.now() / 1000),
          sys: {
            country: data.sys?.country || '',
            sunrise: data.sys?.sunrise || 0,
            sunset: data.sys?.sunset || 0,
          },
          timezone: offsetSec,
          id: data.id || 1,
          name: data.name,
          cod: 200,
          local_time: localTimeStr,
          is_day: (data.weather[0]?.icon || '').includes('d') ? 1 : 0,
          precipitation_probability: data.clouds?.all || 0,
        };

        setWeatherData(parsedResponse);
        saveRecentSearch(data.name, data.main.temp, data.weather[0]?.main);
        return;
      }

      // Clean city query name (e.g. "Lahore, Pakistan" -> "Lahore")
      const cleanCityName = trimmed.includes(',') ? trimmed.split(',')[0].trim() : trimmed;
      const formattedDisplayName = cleanCityName.charAt(0).toUpperCase() + cleanCityName.slice(1);

      // 2. Fetch live meteorological station observation (matches Google search metrics)
      let stationDataSucceeded = false;
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);

        const wttrRes = await fetch(
          `https://wttr.in/${encodeURIComponent(cleanCityName)}?format=j1`,
          { signal: controller.signal }
        );
        clearTimeout(timeoutId);

        if (wttrRes.ok) {
          const wttrData = await wttrRes.json();
          const curr = wttrData.current_condition?.[0];
          const area = wttrData.nearest_area?.[0];
          const todayWeather = wttrData.weather?.[0];

          if (curr) {
            const rawTemp = parseFloat(curr.temp_C);
            const feelsLike = parseFloat(curr.FeelsLikeC);
            const rawMin = parseFloat(todayWeather?.mintempC || curr.temp_C);
            const rawMax = parseFloat(todayWeather?.maxtempC || curr.temp_C);
            const desc = curr.weatherDesc?.[0]?.value?.trim() || 'Clear';

            const countryName = area?.country?.[0]?.value || '';
            const regionName = area?.region?.[0]?.value || '';

            // Map country name to short ISO code if available
            const countryCode = countryName.length > 2 
              ? (countryName.toLowerCase().includes('pakistan') ? 'PK' 
                : countryName.toLowerCase().includes('kingdom') ? 'GB' 
                : countryName.toLowerCase().includes('states') ? 'US' 
                : countryName.toLowerCase().includes('india') ? 'IN' 
                : countryName.toLowerCase().includes('japan') ? 'JP' 
                : countryName.toLowerCase().includes('emirates') ? 'AE' 
                : countryName.slice(0, 2).toUpperCase())
              : countryName.toUpperCase();

            // Check day/night via weather code or time
            const iconUrl = curr.weatherIconUrl?.[0]?.value || '';
            const isDayTime = iconUrl.includes('night') ? 0 : 1;

            const liveObservation: WeatherResponse = {
              coord: {
                lon: parseFloat(area?.longitude || '0'),
                lat: parseFloat(area?.latitude || '0'),
              },
              weather: [
                {
                  id: parseInt(curr.weatherCode, 10) || 800,
                  main: desc,
                  description: desc.toLowerCase(),
                  icon: isDayTime ? '01d' : '01n',
                },
              ],
              base: 'stations',
              main: {
                temp: Math.round(rawTemp),
                feels_like: Math.round(feelsLike),
                temp_min: Math.round(rawMin),
                temp_max: Math.round(rawMax),
                pressure: parseInt(curr.pressure, 10) || 1013,
                humidity: parseInt(curr.humidity, 10) || 50,
              },
              visibility: (parseFloat(curr.visibility) || 10) * 1000,
              wind: {
                speed: parseFloat(curr.windspeedKmph) || 12,
                deg: parseInt(curr.winddirDegree, 10) || 0,
              },
              clouds: { all: parseInt(curr.cloudcover, 10) || 0 },
              dt: Math.floor(Date.now() / 1000),
              sys: {
                country: countryCode,
                sunrise: 0,
                sunset: 0,
              },
              timezone: 0,
              id: 2001,
              name: formattedDisplayName,
              region: regionName || countryName,
              cod: 200,
              is_day: isDayTime,
              precipitation_probability: parseFloat(curr.precipMM) > 0 ? 80 : 0,
              local_time: curr.observation_time ? `${curr.observation_time} local` : 'Live observation',
            };

            setWeatherData(liveObservation);
            saveRecentSearch(formattedDisplayName, rawTemp, desc);
            stationDataSucceeded = true;
            return;
          }
        }
      } catch {
        // Fallback to satellite grid forecast
      }

      if (stationDataSucceeded) return;

      // 3. Fallback to Open-Meteo with sea-level pressure (MSL) and best-match models
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          cleanCityName
        )}&count=1&language=en&format=json`
      );

      if (!geoRes.ok) throw new Error(`Could not find location for "${trimmed}".`);
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error(`City "${trimmed}" not found. Please check the spelling.`);
      }

      const place = geoData.results[0];
      const lat = place.latitude;
      const lon = place.longitude;
      const placeCity = place.name || formattedDisplayName;
      const placeCountry = place.country_code || (place.country ? place.country.slice(0, 2).toUpperCase() : '');
      const placeRegion = place.admin1 || place.country || '';

      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,pressure_msl,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset&timezone=auto`;
      const res = await fetch(weatherUrl);
      if (!res.ok) throw new Error('Could not retrieve meteorological station forecast.');
      const data = await res.json();

      const current = data.current;
      const daily = data.daily;
      const code = current.weather_code ?? 0;
      const isDay = current.is_day ?? 1;
      const mapped = mapWmoCode(code, isDay === 1);
      const offsetSec = data.utc_offset_seconds || 0;
      const localTimeStr = formatCityTime(offsetSec);

      const liveData: WeatherResponse = {
        coord: { lon, lat },
        weather: [
          {
            id: 800,
            main: mapped.main,
            description: mapped.description,
            icon: mapped.icon,
          },
        ],
        base: 'stations',
        main: {
          temp: Math.round(current.temperature_2m),
          feels_like: Math.round(current.apparent_temperature),
          temp_min: Math.round(daily?.temperature_2m_min?.[0] ?? (current.temperature_2m - 3)),
          temp_max: Math.round(daily?.temperature_2m_max?.[0] ?? (current.temperature_2m + 3)),
          pressure: Math.round(current.pressure_msl || 1013),
          humidity: Math.round(current.relative_humidity_2m),
        },
        visibility: 10000,
        wind: {
          speed: current.wind_speed_10m,
          deg: current.wind_direction_10m,
        },
        clouds: { all: daily?.precipitation_probability_max?.[0] ?? 10 },
        dt: Math.floor(Date.now() / 1000),
        sys: {
          country: placeCountry,
          sunrise: daily?.sunrise?.[0] ? Math.floor(new Date(daily.sunrise[0]).getTime() / 1000) : 1727240000,
          sunset: daily?.sunset?.[0] ? Math.floor(new Date(daily.sunset[0]).getTime() / 1000) : 1727284000,
        },
        timezone: offsetSec,
        id: 1001,
        name: placeCity,
        region: placeRegion,
        cod: 200,
        is_day: isDay,
        precipitation_probability: daily?.precipitation_probability_max?.[0] ?? 0,
        local_time: localTimeStr,
      };

      setWeatherData(liveData);
      saveRecentSearch(placeCity, current.temperature_2m, mapped.main);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : `City "${trimmed}" could not be retrieved.`;
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeather(cityInput);
  };

  // Return Google-style weather icon according to condition and Day/Night cycle
  const getWeatherIcon = (conditionName: string = '', isDay: number = 1) => {
    const c = conditionName.toLowerCase();
    if (c.includes('rain')) return <CloudRain className="w-12 h-12 text-cyan-400" />;
    if (c.includes('drizzle')) return <CloudDrizzle className="w-12 h-12 text-cyan-300" />;
    if (c.includes('snow')) return <CloudSnow className="w-12 h-12 text-sky-200" />;
    if (c.includes('thunder') || c.includes('lightning')) return <CloudLightning className="w-12 h-12 text-amber-400" />;
    if (c.includes('fog') || c.includes('mist') || c.includes('haze')) return <CloudFog className="w-12 h-12 text-slate-300" />;
    if (c.includes('partly') || c.includes('scattered') || c.includes('few')) {
      return isDay === 1 ? <CloudSun className="w-12 h-12 text-amber-300" /> : <CloudMoon className="w-12 h-12 text-indigo-300" />;
    }
    if (c.includes('cloud') || c.includes('overcast')) return <Cloud className="w-12 h-12 text-slate-300" />;
    return isDay === 1 ? <Sun className="w-12 h-12 text-amber-400" /> : <Moon className="w-12 h-12 text-indigo-300" />;
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl overflow-hidden my-8">
      {/* Dashboard Top Header */}
      <div className="px-5 py-4 border-b border-slate-800 bg-slate-950/60 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-base font-bold text-slate-100 tracking-tight">
              Live Weather Dashboard Demo
            </h3>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Real-time Global Weather
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Accurate meteorological observation for any city and country worldwide.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 bg-slate-900 rounded-lg border border-slate-800 overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab('demo')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'demo'
                ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <PlayCircle className="w-3.5 h-3.5" />
            Live Preview
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'code'
                ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            Component Code
          </button>
          <button
            onClick={() => setActiveTab('json')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'json'
                ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileJson className="w-3.5 h-3.5" />
            JSON Output
          </button>
        </div>
      </div>

      {/* Main Interactive Demo Tab */}
      {activeTab === 'demo' && (
        <div className="p-5 sm:p-7 space-y-6">
          {/* Search Controls & Unit Switcher */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <form onSubmit={handleSearchSubmit} className="relative flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search any city or country (e.g. Lahore, Tokyo, New York)..."
                  value={cityInput}
                  onChange={(e) => setCityInput(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm bg-slate-950/80 border border-slate-700/80 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-semibold text-sm rounded-lg transition-colors shadow-sm flex items-center gap-1.5"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </form>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              {/* Unit Toggle */}
              <div className="flex items-center p-0.5 bg-slate-950 rounded-lg border border-slate-800 text-xs">
                <button
                  type="button"
                  onClick={() => setUnit('metric')}
                  className={`px-2.5 py-1.5 rounded-md font-semibold transition-colors ${
                    unit === 'metric'
                      ? 'bg-slate-800 text-emerald-400 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  °C Metric
                </button>
                <button
                  type="button"
                  onClick={() => setUnit('imperial')}
                  className={`px-2.5 py-1.5 rounded-md font-semibold transition-colors ${
                    unit === 'imperial'
                      ? 'bg-slate-800 text-emerald-400 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  °F Imperial
                </button>
              </div>

              {/* Optional Custom API Key Toggle */}
              <button
                type="button"
                onClick={() => setShowKeyInput(!showKeyInput)}
                className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
                  showKeyInput || apiKey
                    ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                }`}
                title="Use your personal OpenWeatherMap API Key"
              >
                <Key className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Custom Key</span>
              </button>
            </div>
          </div>

          {/* Collapsible Custom Key Input */}
          {showKeyInput && (
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 animate-in fade-in duration-150">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold text-slate-200">
                  OpenWeatherMap API Key (Optional)
                </span>
              </div>
              <div className="flex gap-2">
                <input
                  type="password"
                  placeholder="Paste your 32-character OpenWeatherMap API key..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 font-mono placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                />
                {apiKey && (
                  <button
                    type="button"
                    onClick={() => setApiKey('')}
                    className="px-2.5 py-1 text-xs text-rose-400 hover:text-rose-300 border border-rose-900/40 rounded-lg"
                  >
                    Clear
                  </button>
                )}
              </div>
              <p className="text-[11px] text-slate-400">
                Leaving this empty uses real-time global meteorological observation. Provide your key if you wish to verify your own account.
              </p>
            </div>
          )}

          {/* Error Alert Display */}
          {error && (
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/40 text-rose-300 flex items-start gap-3 text-sm">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold">{error}</p>
                <p className="text-xs text-rose-400/80">
                  Tip: Verify that the city name is spelled correctly (e.g. Lahore, Karachi, London, New York).
                </p>
              </div>
            </div>
          )}

          {/* Loading Skeleton */}
          {loading && (
            <div className="animate-pulse space-y-4">
              <div className="h-44 bg-slate-800/60 rounded-xl" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="h-24 bg-slate-800/60 rounded-xl" />
                <div className="h-24 bg-slate-800/60 rounded-xl" />
                <div className="h-24 bg-slate-800/60 rounded-xl" />
                <div className="h-24 bg-slate-800/60 rounded-xl" />
              </div>
            </div>
          )}

          {/* Google-Style Weather Card */}
          {!loading && weatherData && (
            <div className="space-y-5">
              {/* Primary Condition Hero Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-800/80 via-slate-800/40 to-slate-900/90 border border-slate-700/60 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                  {getWeatherIcon(weatherData.weather[0]?.main, weatherData.is_day ?? 1)}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
                  <div>
                    <div className="flex items-center flex-wrap gap-2">
                      <h4 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        {weatherData.name}
                      </h4>
                      {weatherData.region && (
                        <span className="text-sm font-medium text-slate-300">
                          {weatherData.region}
                        </span>
                      )}
                      {weatherData.sys.country && (
                        <span className="px-2 py-0.5 text-xs font-bold rounded bg-slate-700 text-slate-200">
                          {weatherData.sys.country}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                      {weatherData.local_time && <span>{weatherData.local_time}</span>}
                      {weatherData.local_time && <span>·</span>}
                      <span className="capitalize">{weatherData.weather[0]?.description}</span>
                    </div>

                    <div className="flex items-center flex-wrap gap-3 mt-4 text-xs text-slate-300">
                      <span className="font-semibold text-white">
                        High: {convertTemp(weatherData.main.temp_max)}°
                      </span>
                      <span className="text-slate-500">·</span>
                      <span className="font-semibold text-white">
                        Low: {convertTemp(weatherData.main.temp_min)}°
                      </span>
                      <span className="text-slate-500">·</span>
                      <span className="text-slate-300">
                        Feels like {convertTemp(weatherData.main.feels_like)}°{unit === 'metric' ? 'C' : 'F'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div>{getWeatherIcon(weatherData.weather[0]?.main, weatherData.is_day ?? 1)}</div>
                    <div className="text-right">
                      <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tighter tabular-nums">
                        {convertTemp(weatherData.main.temp)}°
                        <span className="text-2xl text-emerald-400 font-semibold ml-1">
                          {unit === 'metric' ? 'C' : 'F'}
                        </span>
                      </div>
                      <div className="text-xs text-emerald-400 font-medium capitalize mt-1">
                        {weatherData.weather[0]?.main}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Weather Condition Metric Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {/* Precipitation Card */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                    <CloudRain className="w-4 h-4 text-cyan-400" />
                    <span>Precipitation</span>
                  </div>
                  <div className="text-lg font-bold text-white tabular-nums">
                    {weatherData.precipitation_probability ?? 0}%
                  </div>
                  <div className="text-[11px] text-slate-500">Chance of rain</div>
                </div>

                {/* Humidity Card */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                    <Droplets className="w-4 h-4 text-blue-400" />
                    <span>Humidity</span>
                  </div>
                  <div className="text-lg font-bold text-white tabular-nums">
                    {weatherData.main.humidity}%
                  </div>
                  <div className="text-[11px] text-slate-500">Relative humidity</div>
                </div>

                {/* Wind Card */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                    <Wind className="w-4 h-4 text-emerald-400" />
                    <span>Wind</span>
                  </div>
                  <div className="text-lg font-bold text-white tabular-nums">
                    {formatWindSpeed(weatherData.wind.speed)}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Direction: {getCompassDirection(weatherData.wind.deg)} ({weatherData.wind.deg}°)
                  </div>
                </div>

                {/* Pressure Card */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                    <Gauge className="w-4 h-4 text-amber-400" />
                    <span>Pressure</span>
                  </div>
                  <div className="text-lg font-bold text-white tabular-nums">
                    {weatherData.main.pressure}{' '}
                    <span className="text-xs text-slate-400 font-normal">hPa</span>
                  </div>
                  <div className="text-[11px] text-slate-500">Atmospheric</div>
                </div>
              </div>
            </div>
          )}

          {/* Recent Searches Section (Requirement: LocalStorage Persistence) */}
          <div className="pt-4 border-t border-slate-800/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300">
                Recent Searches (LocalStorage Persistence)
              </span>
              {recentSearches.length > 0 && (
                <button
                  type="button"
                  onClick={clearRecentSearches}
                  className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-rose-400 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                  Clear history
                </button>
              )}
            </div>

            {recentSearches.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No recent searches yet.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((item, idx) => (
                  <button
                    key={`${item.city}-${idx}`}
                    type="button"
                    onClick={() => {
                      setCityInput(item.city);
                      fetchWeather(item.city);
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 transition-all hover:text-white"
                  >
                    <RotateCcw className="w-3 h-3 text-slate-500" />
                    <span className="font-medium">{item.city}</span>
                    {item.temp !== undefined && (
                      <span className="text-emerald-400 font-mono text-[11px]">
                        {convertTemp(item.temp)}°
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Code Inspector Tab */}
      {activeTab === 'code' && (
        <div className="p-4 sm:p-6 bg-[#070b14] overflow-x-auto text-xs font-mono leading-relaxed text-slate-200">
          <pre>{`// app/components/WeatherDashboard.tsx
'use client';

import { useState } from 'react';
import type { WeatherResponse, RecentSearchItem } from '@/types/weather';
import { fetchWeatherData } from '@/lib/weather';

export default function WeatherDashboard() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recent, setRecent] = useState<RecentSearchItem[]>([]);

  const handleSearch = async (targetCity: string) => {
    if (!targetCity.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherData(targetCity);
      setWeather(data);
      // Persist to localStorage
      const updated = [{ city: data.name, timestamp: Date.now() }, ...recent].slice(0, 5);
      setRecent(updated);
      localStorage.setItem('weather_history', JSON.stringify(updated));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error fetching weather';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <form onSubmit={(e) => { e.preventDefault(); handleSearch(city); }}>
        <input 
          value={city} 
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search any city or country..."
          className="border rounded-lg px-4 py-2"
        />
        <button type="submit" disabled={loading}>Search</button>
      </form>

      {error && <div className="text-red-500">{error}</div>}
      {loading && <div>Loading weather...</div>}

      {weather && (
        <div className="p-6 bg-slate-900 rounded-xl text-white">
          <h2 className="text-2xl font-bold">{weather.name}, {weather.sys.country}</h2>
          <div className="text-4xl font-extrabold">{Math.round(weather.main.temp)}°C</div>
          <p>{weather.weather[0]?.description}</p>
        </div>
      )}
    </div>
  );
}`}</pre>
        </div>
      )}

      {/* JSON Inspector Tab */}
      {activeTab === 'json' && (
        <div className="p-4 sm:p-6 bg-[#070b14] overflow-x-auto text-xs font-mono leading-relaxed text-emerald-400">
          <pre>{JSON.stringify(weatherData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
