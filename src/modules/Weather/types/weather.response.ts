export interface WeatherResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: CurrentUnits;
  current: CurrentWeather;
  hourly_units: HourlyUnits;
  hourly: HourlyWeather;
  daily_units: DailyUnits;
  daily: DailyWeather;
}

export interface DailyWeather {
  time: string[];
  weather_code: number[];
  temperature_2m_min: number[];
  temperature_2m_max: number[];
}

export interface DailyUnits {
  time: string;
  weather_code: string;
  temperature_2m_min: string;
  temperature_2m_max: string;
}

export interface HourlyWeather {
  time: string[];
  temperature_2m: number[];
  weather_code: number[];
}

export interface HourlyUnits {
  time: string;
  temperature_2m: string;
  weather_code: string;
}

export interface CurrentWeather {
  time: string;
  interval: number;
  temperature_2m: number;
  weather_code: number;
  is_day: number;
}

export interface CurrentUnits {
  time: string;
  interval: string;
  temperature_2m: string;
  weather_code: string;
  is_day: string;
}