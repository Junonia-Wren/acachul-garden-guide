// src/lib/weather/useWeatherMaps.ts

import { useEffect, useState } from "react";

export type WeatherLayer =
  | "temp_new"
  | "clouds_new"
  | "precipitation_new"
  | "wind_new";

export interface UseWeatherMapTileOptions {
  zoom?: number;
  layer?: WeatherLayer;
}

const DEFAULT_COORDS = {
  lat: 20.2770,
  lon: -97.9611
};

export const useWeatherMapTile = ({
  zoom = 5,
  layer = "temp_new",
}: UseWeatherMapTileOptions = {}) => {
  const [lat, setLat] = useState<number>(DEFAULT_COORDS.lat);
  const [lon, setLon] = useState<number>(DEFAULT_COORDS.lon);
  const [currentLayer, setLayer] = useState<WeatherLayer>(layer);
  const [currentZoom, setZoom] = useState<number>(zoom);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocalización no soportada");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      },
      (err) => {
        console.error("Error al obtener ubicación:", err);
        setError("No se pudo obtener la ubicación. Usando ubicación por defecto.");
      }
    );
  }, []);

  return {
    lat,
    lon,
    zoom: currentZoom,
    layer: currentLayer,
    setLayer,
    setZoom,
    error,
  };
};
