import { useEffect, useState } from "react";
import { openWeatherClient } from "./openWeatherClient";
import { formatTime } from "./weatherUtils";

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
      try {
        setLoading(true);

        const response = await openWeatherClient.get<WeatherDetailsResponse>("/weather", {
          params: {
            lat,
            lon,
            lang: "es",
          },
        });

        const data = response.data;

        setDetails({
          pressure: data.main.pressure,
          feelsLike: Math.round(data.main.feels_like - 273.15), // Kelvin a °C
          sunrise: formatTime(data.sys.sunrise),
          sunset: formatTime(data.sys.sunset),
          visibility: data.visibility,
          cloudiness: data.clouds.all,
        });
      } catch (err) {
        setError("Error al obtener los detalles del clima.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [lat, lon]);

  return { details, loading, error };
};
