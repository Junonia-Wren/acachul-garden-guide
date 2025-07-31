// src/lib/weather/useWeatherDetails.ts

import { useEffect, useState } from "react";
import { openWeatherClient } from "./openWeatherClient";
import { formatTime, kelvinToCelsius } from "./weatherUtils";

interface WeatherDetails {
  pressure: number;
  sunrise: string;
  sunset: string;
  visibility: number;
  cloudiness: number;
  feelsLike: number;
}

interface WeatherDetailsResponse {
  main: {
    pressure: number;
    feels_like: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
  visibility: number;
  clouds: {
    all: number;
  };
}

export const useWeatherDetails = (lat: number, lon: number) => {
  const [details, setDetails] = useState<WeatherDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const response = await openWeatherClient.get<WeatherDetailsResponse>("/weather", {
          params: {
            lat,
            lon,
            lang: "es",
          },
        });

        const data = response.data;

        const parsedDetails: WeatherDetails = {
          pressure: data.main.pressure,
          feelsLike: kelvinToCelsius(data.main.feels_like),
          sunrise: formatTime(data.sys.sunrise),
          sunset: formatTime(data.sys.sunset),
          visibility: data.visibility,
          cloudiness: data.clouds.all,
        };

        setDetails(parsedDetails);
      } catch (err) {
        console.error(err);
        setError("Error al obtener los detalles del clima.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [lat, lon]);

  return { details, loading, error };
};
