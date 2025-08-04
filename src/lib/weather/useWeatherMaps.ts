// src/lib/weather/useWeatherMaps.ts
import { useMemo } from "react";

const BASE_URL = "https://tile.openweathermap.org/map";
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

interface UseWeatherMapTileProps {
  lat: number;
  lon: number;
  zoom?: number;
  layer?: "temp_new" | "clouds_new" | "precipitation_new" | "wind_new";
}

export const useWeatherMapTile = ({
  lat,
  lon,
  zoom = 5,
  layer = "temp_new",
}: UseWeatherMapTileProps): string => {
  const tileUrl = useMemo(() => {
    const tileX = Math.floor(((lon + 180) / 360) * Math.pow(2, zoom));
    const tileY = Math.floor(
      ((1 -
        Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) /
          Math.PI) /
        2) *
        Math.pow(2, zoom)
    );

    return `${BASE_URL}/${layer}/${zoom}/${tileX}/${tileY}.png?appid=${API_KEY}`;
  }, [lat, lon, zoom, layer]);

  return tileUrl;
};
