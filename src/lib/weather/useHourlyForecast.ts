// src/lib/weather/useHourlyForecast.ts

import { useEffect, useState } from "react";
import { openWeatherClient } from "./openWeatherClient";

export interface HourlyForecastEntry {
  time: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  icon: string;
  description: string;
}

interface ForecastAPIResponse {
  list: {
    dt: number;
    main: {
      temp: number;
      humidity: number;
    };
    wind: {
      speed: number;
    };
    rain?: {
      "3h"?: number;
    };
    weather: {
      description: string;
      icon: string;
    }[];
  }[];
}

export function useHourlyForecast(lat: number, lon: number) {
  const [forecast, setForecast] = useState<HourlyForecastEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        setLoading(true);
        const response = await openWeatherClient.get<ForecastAPIResponse>("/forecast", {
          params: {
            lat,
            lon,
            units: "metric",
            lang: "es",
          },
        });

        const rawData = response.data.list.slice(0, 24); // próximas 24 horas
        const formattedData: HourlyForecastEntry[] = rawData.map((entry) => {
          const date = new Date(entry.dt * 1000);
          const time = date.toLocaleTimeString("es-MX", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });

          return {
            time,
            temperature: Math.round(entry.main.temp),
            humidity: entry.main.humidity,
            windSpeed: Math.round(entry.wind.speed),
            precipitation: entry.rain?.["3h"] ?? 0,
            icon: entry.weather[0].icon,
            description: entry.weather[0].description,
          };
        });

        setForecast(formattedData);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Error desconocido al obtener el pronóstico por hora.");
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [lat, lon]);

  return { forecast, loading, error };
}
