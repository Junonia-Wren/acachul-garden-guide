// src/lib/weather/weatherUtils.ts

export interface CurrentWeather {
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  city: string;
  country: string;
  date: string;
  feelsLike: number;
  visibility: number;
  pressure: number;
  dewPoint: number;
}

export function getCurrentDateString(): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "2-digit",
    month: "short",
  };
  return new Date().toLocaleDateString("es-MX", options);
}

export function getCurrentTimeString(): string {
  return new Date().toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function getWeatherIconUrl(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
}

// Tipamos explícitamente la respuesta esperada
export function formatWeatherData(data: {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: { description: string; icon: string }[];
  wind: { speed: number };
  visibility: number;
  name: string;
  sys: { country: string };
}): CurrentWeather {
  const {
    main: { temp, feels_like, humidity, pressure },
    weather,
    wind: { speed },
    visibility,
    name,
    sys: { country },
  } = data;

  const description = weather[0].description;
  const icon = weather[0].icon;

  return {
    temperature: Math.round(temp),
    description: capitalizeFirstLetter(description),
    icon,
    humidity,
    windSpeed: Math.round(speed),
    city: name,
    country,
    date: getCurrentDateString(),
    feelsLike: Math.round(feels_like),
    visibility: Math.round(visibility / 1000), // en km
    pressure,
    dewPoint: calculateDewPoint(temp, humidity),
  };
}

function capitalizeFirstLetter(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Fórmula simplificada para calcular punto de rocío
function calculateDewPoint(temp: number, humidity: number): number {
  const a = 17.27;
  const b = 237.7;
  const alpha = ((a * temp) / (b + temp)) + Math.log(humidity / 100);
  const dewPoint = (b * alpha) / (a - alpha);
  return Math.round(dewPoint);
}
