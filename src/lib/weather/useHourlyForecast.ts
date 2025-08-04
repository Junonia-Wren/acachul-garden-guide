// src/lib/weather/useHourlyForecast.ts

import { useEffect, useState } from "react";
import { openWeatherClient } from "./openWeatherClient";
import type { HourlyData } from "./weatherUtils";
import { getDaySummaries } from "./weatherUtils";

export interface HourlyForecastEntry {
  time: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  icon: string;
  description: string;
  date: string; // para agrupar luego
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
    dt_txt: string;
  }[];
}

export interface DaySummary {
  date: string;
  dayNumber: number;
  dayName: string;
  tempMax: number;
  tempMin: number;
  icon: string;
}

export type GroupedForecastByDay = {
  [date: string]: HourlyData[];
};

export function useHourlyForecast(lat: number, lon: number) {
  const [forecast, setForecast] = useState<HourlyForecastEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [groupedForecastByDay, setGroupedForecastByDay] = useState<GroupedForecastByDay>({});
  const [daySummaries, setDaySummaries] = useState<DaySummary[]>([]);

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

        const rawData = response.data.list.slice(0, 40); // hasta 5 días * 8 periodos (3h cada uno)

        // Formatear datos horarios
        const formattedData: HourlyForecastEntry[] = rawData.map((entry) => {
          const dateObj = new Date(entry.dt * 1000);
          const time = dateObj.toLocaleTimeString("es-MX", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });
          const date = entry.dt_txt.split(" ")[0]; // yyyy-mm-dd

          return {
            time,
            temperature: Math.round(entry.main.temp),
            humidity: entry.main.humidity,
            windSpeed: Math.round(entry.wind.speed),
            precipitation: entry.rain?.["3h"] ?? 0,
            icon: entry.weather[0].icon,
            description: entry.weather[0].description,
            date,
          };
        });

        setForecast(formattedData);

        // Agrupar por día
        const grouped = formattedData.reduce<GroupedForecastByDay>((acc, curr) => {
          if (!acc[curr.date]) acc[curr.date] = [];
          acc[curr.date].push({
            main: {
              temp: curr.temperature,
              humidity: curr.humidity,
            },
            weather: [{ icon: curr.icon, description: curr.description }],
            windSpeed: curr.windSpeed,
            precipitation: curr.precipitation,
            dt_txt: `${curr.date} ${curr.time}`,
          });
          return acc;
        }, {});


        setGroupedForecastByDay(grouped);

        // Obtener resumen por día (max, min, icono)
        const summaries = getDaySummaries(grouped);
        setDaySummaries(summaries);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Error desconocido al obtener el pronóstico por hora.");
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [lat, lon]);

  return { forecast, loading, error, groupedForecastByDay, daySummaries };
}
