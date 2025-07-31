import { useEffect, useState } from "react";
import { openWeatherClient } from "./openWeatherClient";
import { formatWeatherData } from "./weatherUtils";

interface CurrentWeather {
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  city: string;
  country: string;
  date: string;
}

export function useCurrentWeather(lat: number, lon: number) {
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await openWeatherClient.get("/weather", {
          params: {
            lat,
            lon,
            units: "metric",
          },
        });

        const data = formatWeatherData(response.data);
        setWeather(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
          console.error(err);
        } else {
          setError("Error desconocido.");
          console.error("Error desconocido", err);
        }
      } finally {
        setLoading(false);
      }
    };

    if (lat && lon) {
      fetchWeather();
    }
  }, [lat, lon]);

  return { weather, loading, error };
}
