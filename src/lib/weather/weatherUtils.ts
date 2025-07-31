export const kelvinToCelsius = (kelvin: number): number => {
  return Math.round(kelvin - 273.15);
};

export const formatDate = (timestamp: number, locale = 'es-MX'): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString(locale, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
};

export const formatTime = (timestamp: number, locale = 'es-MX'): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const capitalizeFirstLetter = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const getWeatherIconUrl = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

interface WeatherAPIResponse {
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
  name: string;
  sys: {
    country: string;
  };
  dt: number;
}

export const formatWeatherData = (data: WeatherAPIResponse) => {
  return {
    temperature: kelvinToCelsius(data.main.temp),
    description: capitalizeFirstLetter(data.weather[0].description),
    icon: getWeatherIconUrl(data.weather[0].icon),
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    city: data.name,
    country: data.sys.country,
    date: formatDate(data.dt),
  };
};

