// src/lib/weather/useCurrentWeather.ts

import { useEffect, useState } from "react";
import { openWeatherClient } from "./openWeatherClient";
import { formatWeatherData, CurrentWeather } from "./weatherUtils";

export function useCurrentWeather(lat?: number, lon?: number) {
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (lat == null || lon == null) return;

    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await openWeatherClient.get("/weather", {
          params: {
            lat,
            lon,
            units: "metric",
            lang: "es",
          },
        });
        const data = formatWeatherData(response.data);
        setWeather(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error desconocido al obtener el clima.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [lat, lon]);

  return { weather, loading, error };
}
