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

/* --------- A partir de aquí funciones nuevas para el desglose por día --------- */

// Interfaz para los datos horarios según OpenWeather para forecast
export interface HourlyData {
  main: {
    temp: number;
    humidity: number; // agregar
  };
  weather: {
    icon: string;
    description: string;
  }[];
  windSpeed: number;        // agregar aquí (a nivel de HourlyData)
  precipitation: number;    // agregar aquí (a nivel de HourlyData)
  dt_txt: string;
}


// Devuelve el nombre del día (Hoy, Lunes, Martes, etc.) según la fecha
export function getDayName(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    return "Hoy";
  }
  return date.toLocaleDateString("es-MX", { weekday: "long" });
}

// Función auxiliar para encontrar el elemento más frecuente en un array
function mostFrequent(arr: string[]): string {
  const frequency: { [key: string]: number } = {};
  let maxFreq = 0;
  let mostFreqItem = arr[0];

  arr.forEach((item) => {
    frequency[item] = (frequency[item] || 0) + 1;
    if (frequency[item] > maxFreq) {
      maxFreq = frequency[item];
      mostFreqItem = item;
    }
  });

  return mostFreqItem;
}

// Devuelve un resumen por día con máximo, mínimo y icono principal
export function getDaySummaries(
  groupedForecast: { [date: string]: HourlyData[] }
): {
  date: string;
  dayNumber: number;
  dayName: string;
  tempMax: number;
  tempMin: number;
  icon: string;
}[] {
  return Object.entries(groupedForecast).map(([date, hours]) => {
    const temps = hours.map((h) => h.main.temp);
    const tempMax = Math.max(...temps);
    const tempMin = Math.min(...temps);

    const icons = hours.map((h) => h.weather[0].icon);
    const icon = mostFrequent(icons);

    const dayName = getDayName(date);
    const dayNumber = new Date(date).getDate();

    return {
      date,
      dayNumber,
      dayName,
      tempMax: Math.round(tempMax),
      tempMin: Math.round(tempMin),
      icon,
    };
  });
}