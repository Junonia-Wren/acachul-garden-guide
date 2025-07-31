import { useEffect, useState } from "react";
import { openWeatherClient } from "./openWeatherClient";
import {
  kelvinToCelsius,
  formatTime,
  getWeatherIconUrl,
  capitalizeFirstLetter,
} from "./weatherUtils";

interface WeatherEntry {
  dt: number;
  main: {
    temp: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

interface ForecastResponse {
  list: WeatherEntry[];
}

interface HourlyForecast {
  time: string;
  temperature: number;
  description: string;
  icon: string;
}

export const useHourlyForecast = (lat: number, lon: number) => {
  const [forecast, setForecast] = useState<HourlyForecast[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        setLoading(true);
        const response = await openWeatherClient.get<ForecastResponse>("/forecast", {
          params: {
            lat,
            lon,
            lang: "es",
          },
        });

        const hourlyData = response.data.list.slice(0, 8).map((item) => ({
          time: formatTime(item.dt),
          temperature: kelvinToCelsius(item.main.temp),
          description: capitalizeFirstLetter(item.weather[0].description),
          icon: getWeatherIconUrl(item.weather[0].icon),
        }));

        setForecast(hourlyData);
      } catch (err) {
        setError("Error al cargar el pronóstico por hora.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [lat, lon]);

  return { forecast, loading, error };
};
