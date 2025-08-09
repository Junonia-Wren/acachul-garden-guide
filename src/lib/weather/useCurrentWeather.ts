// src/lib/weather/useCurrentWeather.ts
import { useEffect, useState } from "react";
import { openWeatherClient } from "./openWeatherClient";
import { formatWeatherData, CurrentWeather } from "./weatherUtils";

function generatePlantCareTip(temp: number, humidity: number, description: string): string {
  if (description.includes("lluvia") || description.includes("tormenta")) {
    return "Habrá lluvias, evita regar hoy para no encharcar tus plantas.";
  }
  if (temp > 30) {
    return "Clima caluroso, riega temprano en la mañana para evitar evaporación rápida.";
  }
  if (temp < 10) {
    return "Temperaturas frías, protege plantas sensibles del frío extremo.";
  }
  if (humidity < 40) {
    return "Ambiente seco, revisa la humedad del suelo y riega si es necesario.";
  }
  return "Clima estable, mantén tu rutina de riego habitual.";
}

export function useCurrentWeather(lat?: number, lon?: number) {
  const [weather, setWeather] = useState<(CurrentWeather & { plantCareTip: string }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (lat == null || lon == null) return;

    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await openWeatherClient.get("/weather", {
          params: { lat, lon, units: "metric", lang: "es" },
        });
        const data = formatWeatherData(response.data);
        const plantCareTip = generatePlantCareTip(
          data.temperature,
          data.humidity,
          data.description.toLowerCase()
        );
        setWeather({ ...data, plantCareTip });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido al obtener el clima.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [lat, lon]);

  return { weather, loading, error };
}
