import { useEffect, useState } from "react";
import { openWeatherClient } from "./openWeatherClient";
import {
  kelvinToCelsius,
  formatDate,
  capitalizeFirstLetter,
  getWeatherIconUrl,
} from "./weatherUtils";

interface DailySummary {
  date: string;
  averageTemp: number;
  minTemp: number;
  maxTemp: number;
  icon: string;
  description: string;
}

interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

interface ForecastResponse {
  list: ForecastItem[];
}

export const useMonthlyForecast = (lat: number, lon: number) => {
  const [forecast, setForecast] = useState<DailySummary[]>([]);
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

        const groupedData: { [date: string]: ForecastItem[] } = {};

        // Agrupar por fecha (sin hora)
        response.data.list.forEach((item) => {
          const date = formatDate(item.dt);
          if (!groupedData[date]) groupedData[date] = [];
          groupedData[date].push(item);
        });

        // Resumir por día
        const summaries: DailySummary[] = Object.entries(groupedData).map(([date, items]) => {
          const temps = items.map((i) => kelvinToCelsius(i.main.temp));
          const minTemps = items.map((i) => kelvinToCelsius(i.main.temp_min));
          const maxTemps = items.map((i) => kelvinToCelsius(i.main.temp_max));

          const averageTemp = Math.round(temps.reduce((a, b) => a + b, 0) / temps.length);
          const minTemp = Math.min(...minTemps);
          const maxTemp = Math.max(...maxTemps);

          const { icon, description } = items[Math.floor(items.length / 2)].weather[0];

          return {
            date,
            averageTemp,
            minTemp,
            maxTemp,
            icon: getWeatherIconUrl(icon),
            description: capitalizeFirstLetter(description),
          };
        });

        setForecast(summaries);
      } catch (err) {
        setError("Error al obtener el pronóstico mensual.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [lat, lon]);

  return { forecast, loading, error };
};
