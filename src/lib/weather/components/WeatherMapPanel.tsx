import {
  MapContainer,
  TileLayer,
  LayersControl,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { useWeatherMapTile, WeatherLayer } from "@/lib/weather/useWeatherMaps";
import { useState } from "react";

const WeatherMapPanel = () => {
  const [zoom, setZoom] = useState(5);
  const [layer, setLayer] = useState<WeatherLayer>("temp_new");

  const { lat, lon, error } = useWeatherMapTile({ zoom, layer });

  if (!lat || !lon) {
    return <p className="text-center">Obteniendo ubicación...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  const layers: { label: string; value: WeatherLayer }[] = [
    { label: "Temperatura", value: "temp_new" },
    { label: "Nubes", value: "clouds_new" },
    { label: "Precipitación", value: "precipitation_new" },
    { label: "Viento", value: "wind_new" },
  ];

  return (
    <div className="w-full h-[500px]">
      <div className="mb-2 flex flex-wrap justify-center gap-2">
        {layers.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setLayer(value)}
            className={`px-3 py-1 rounded-full border ${
              value === layer
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-800 border-gray-300"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <MapContainer
        center={[lat, lon]}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <ZoomControl position="bottomright" />

        {/* Mapa base visible */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/* Capa meteorológica encima */}
        <TileLayer
          url={`https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`}
          attribution='&copy; <a href="https://openweathermap.org/">OpenWeather</a>'
        />
      </MapContainer>
    </div>
  );
};

export default WeatherMapPanel;
