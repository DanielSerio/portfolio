export interface WeatherIconProps {
  code: number;
  isNight?: boolean;
}

// 0	Clear
// 1	Mostly Clear
// 2	Partly Cloudy
// 3	Cloudy
// 45	Fog
// 48	Freezing Fog
// 51	Light Drizzle
// 53	Drizzle
// 55	Heavy Drizzle
// 56	Light Freezing Drizzle
// 57	Freezing Drizzle
// 61	Light Rain
// 63	Rain
// 65	Heavy Rain
// 66	Light Freezing Rain
// 67	Freezing Rain
// 71	Light Snow
// 73	Snow
// 75	Heavy Snow
// 77	Snow Grains
// 80	Light Rain Shower
// 81	Rain Shower
// 82	Heavy Rain Shower
// 85	Snow Shower
// 86	Heavy Snow Shower
// 95	Thunderstorm
// 96	Hailstorm
// 99	Heavy Hailstorm

const icons = {
  0: {
    day: "WiDaySunny",
    night: "WiNightClear",
  },
  1: {
    day: "WiDaySunnyOvercast",
    night: "WiNightAltPartlyCloudy",
  },
  2: {
    day: "WiDayCloudy",
    night: "WiNightAltCloudy",
  },
  3: {
    day: "WiCloud",
    night: "WiCloud",
  },
  45: {
    day: "WiDayFog",
    night: "WiNightFog",
  },
  48: {
    day: "WiFog",
    night: "WiFog",
  },
  51: {
    day: "WiDaySprinkle",
    night: "WiNightAltSprinkle",
  },
  53: {
    day: "WiDayShowers",
    night: "WiNightAltShowers",
  },
  55: {
    day: "WiDayRain",
    night: "WiNightAltRain",
  },
  56: {
    day: "WiDayRainMix",
    night: "WiNightAltRainMix",
  },
  57: {
    day: "WiDayRainMix",
    night: "WiNightAltRainMix",
  },
  61: {
    day: "WiDayShowers",
    night: "WiNightAltShowers",
  },
  63: {
    day: "WiDayRain",
    night: "WiNightAltRain",
  },
  65: {
    day: "WiRain",
    night: "WiRain",
  },
  66: {
    day: "WiDaySleet",
    night: "WiNightAltSleet",
  },
  67: {
    day: "WiDaySleet",
    night: "WiNightAltSleet",
  },
  71: {
    day: "WiDaySnow",
    night: "WiNightAltSnow",
  },
  73: {
    day: "WiDaySnowWind",
    night: "WiNightAltSnowWind",
  },
  75: {
    day: "WiSnow",
    night: "WiSnow",
  },
  77: {
    day: "WiSnow",
    night: "WiSnow",
  },
  80: {
    day: "WiDayShowers",
    night: "WiNightAltShowers",
  },
  81: {
    day: "WiDayRain",
    night: "WiNightAltRain",
  },
  82: {
    day: "WiRain",
    night: "WiRain",
  },
  85: {
    day: "WiDaySnow",
    night: "WiNightAltSnow",
  },
  86: {
    day: "WiDaySnowWind",
    night: "WiNightAltSnowWind",
  },
  95: {
    day: "WiDayThunderstorm",
    night: "WiNightAltThunderstorm",
  },
  96: {
    day: "WiDayHail",
    night: "WiNightAltHail",
  },
  99: {
    day: "WiDayHail",
    night: "WiNightAltHail",
  },
} as Record<number, { day: string; night: string }>;

export function getWeatherIconName(code: number, isNight: boolean) {
  if (code < 0 || code > 99) {
    throw new Error(`Weather code cannot exceed 99`);
  }

  const iconKey = isNight ? "night" : "day";

  return icons[code][iconKey];
}
