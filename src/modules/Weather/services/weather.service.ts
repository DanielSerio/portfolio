import { ApiService } from "#core/services";
import type { WeatherResponse } from "#weather/types/weather.response";

class WeatherApiService extends ApiService {
  constructor() {
    super('https://api.open-meteo.com/v1');
  }

  private defaultSearchParams = {
    daily: 'weather_code,temperature_2m_min,temperature_2m_max',
    hourly: 'temperature_2m,weather_code',
    current: 'temperature_2m,weather_code,is_day',
    timezone: 'America/New_York',
    wind_speed_unit: 'mph',
    temperature_unit: 'fahrenheit',
    precipitation_unit: 'inch'
  };

  async getForecast(lat: number, lng: number) {
    const searchParams = new URLSearchParams({
      ...this.defaultSearchParams,
      latitude: lat.toPrecision(2),
      longitude: lng.toPrecision(2)
    });

    const response = await this.GET(`/forecast?${searchParams}`);

    return await response.json() as WeatherResponse;
  }
}

export const WeatherService = new WeatherApiService();