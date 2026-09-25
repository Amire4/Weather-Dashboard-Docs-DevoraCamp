export interface DocSection {
  id: string;
  title: string;
  category: 'Overview' | 'Setup' | 'Step-by-Step Guides' | 'Code Reference' | 'Troubleshooting' | 'Live Demo';
  summary: string;
  subsections: {
    id: string;
    title: string;
  }[];
}

export interface SearchResultItem {
  id: string;
  title: string;
  sectionId: string;
  category: string;
  snippet: string;
}

// OpenWeatherMap API Types defined for the tutorial and dashboard
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

export interface WeatherResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: WeatherCondition[];
  base: string;
  main: MainWeatherData;
  visibility: number;
  wind: WindData;
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
  is_day?: number;
  precipitation_probability?: number;
  region?: string;
  local_time?: string;
}

export interface RecentSearchItem {
  city: string;
  timestamp: number;
  temp?: number;
  condition?: string;
}
