// src/lib/weather/useWeatherDetails.ts

import { useEffect, useState } from "react";
import { openWeatherClient } from "./openWeatherClient";
import { getWeatherIconUrl } from "./weatherUtils";

export interface WeatherDetail {
  id: string;
  title: string;
  icon: string;
  summary: string;      // breve resumen
  description: string;  // descripción larga
}

export function useWeatherDetails() {
  const [details, setDetails] = useState<WeatherDetail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherDetails = async (lat: number, lon: number) => {
      try {
        setLoading(true);
        const { data } = await openWeatherClient.get("/weather", {
          params: {
            lat,
            lon,
            units: "metric",
            lang: "es",
          },
        });

        const current = data;

        const details: WeatherDetail[] = [
          {
            id: "temperature",
            title: "Temperatura",
            icon: getWeatherIconUrl(current.weather[0].icon),
            summary: `Actualmente ${Math.round(current.main.temp)}°C.`,
            description: `La temperatura actual es de ${Math.round(current.main.temp)} grados Celsius con una sensación térmica de ${Math.round(current.main.feels_like)}°C.`,
          },
          {
            id: "humidity",
            title: "Humedad",
            icon: getWeatherIconUrl("50d"),
            summary: `Humedad relativa ${current.main.humidity}%.`,
            description: `La humedad relativa del aire es del ${current.main.humidity}%, lo cual afecta la sensación térmica y el confort.`,
          },
          {
            id: "pressure",
            title: "Presión atmosférica",
            icon: getWeatherIconUrl("13d"),
            summary: `Presión de ${current.main.pressure} hPa.`,
            description: `La presión atmosférica es de ${current.main.pressure} hectopascales, importante para predecir cambios climáticos.`,
          },
          {
            id: "wind",
            title: "Viento",
            icon: getWeatherIconUrl("11d"),
            summary: `Viento a ${Math.round(current.wind.speed)} km/h.`,
            description: `El viento sopla a una velocidad aproximada de ${Math.round(current.wind.speed)} kilómetros por hora, lo que puede influir en la sensación térmica.`,
          },
          {
            id: "clouds",
            title: "Nubosidad",
            icon: getWeatherIconUrl("03d"),
            summary: `${current.clouds.all}% de nubosidad.`,
            description: `El cielo presenta una cobertura nubosa del ${current.clouds.all}%, lo que afecta la cantidad de radiación solar recibida.`,
          },
          {
            id: "visibility",
            title: "Visibilidad",
            icon: getWeatherIconUrl("50n"),
            summary: `Visibilidad de ${current.visibility / 1000} km.`,
            description: `La visibilidad actual es de ${current.visibility / 1000} kilómetros, ideal para actividades al aire libre.`,
          },
          {
            id: "sunrise",
            title: "Amanecer",
            icon: getWeatherIconUrl("01d"),
            summary: `Amanecer a las ${formatUnixHour(current.sys.sunrise)}.`,
            description: `El sol saldrá a las ${formatUnixHour(current.sys.sunrise)}, marcando el inicio del día.`,
          },
          {
            id: "sunset",
            title: "Atardecer",
            icon: getWeatherIconUrl("01n"),
            summary: `Atardecer a las ${formatUnixHour(current.sys.sunset)}.`,
            description: `El sol se pondrá a las ${formatUnixHour(current.sys.sunset)}, dando fin al día.`,
          },
          // Puedes agregar más paneles según datos disponibles
        ];

        setDetails(details);
      } catch (error) {
        console.error("Error al obtener detalles del clima:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!navigator.geolocation) {
      console.error("Geolocalización no soportada por el navegador.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchWeatherDetails(lat, lon);
      },
      (error) => {
        console.error("Error obteniendo la ubicación:", error.message);
        setLoading(false);
      }
    );
  }, []);

  return { details, loading };
}

function formatUnixHour(unix: number): string {
  const date = new Date(unix * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const hour12 = hours % 12 || 12;
  const ampm = hours >= 12 ? "PM" : "AM";
  return `${hour12}:${minutes.toString().padStart(2, "0")} ${ampm}`;
}
