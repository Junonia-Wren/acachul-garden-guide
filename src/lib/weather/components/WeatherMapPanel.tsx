import {
  MapContainer,
  TileLayer,
  ZoomControl,
  useMap,
} from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

import { useWeatherMapTile, WeatherLayer } from "@/lib/weather/useWeatherMaps";
import { cn } from "@/lib/utils";

// Botón que recentra el mapa
const RecenterButton = ({ lat, lon }: { lat: number; lon: number }) => {
  const map = useMap();

  const recenter = () => {
    map.setView([lat, lon], 9); // Puedes ajustar el zoom
  };

  return (
    <div className="absolute top-2 right-2 z-[999]">
      <button
        onClick={recenter}
        className="bg-white shadow-md border border-gray-300 px-2 py-1 text-sm rounded-md hover:bg-gray-100"
      >
        Centrar ubicación
      </button>
    </div>
  );
};

// Leyendas por capa
const legends: Record<WeatherLayer, { label: string; gradient: string; steps: string[] }> = {
  temp_new: {
    label: "Temperatura °C",
    gradient: "linear-gradient(to right, #0000ff, #00ffff, #00ff00, #ffff00, #ff0000)",
    steps: ["-20", "-10", "0", "10", "20", "30", "40"],
  },
  clouds_new: {
    label: "Nubosidad %",
    gradient: "linear-gradient(to right, #ffffff, #aaaaaa, #000000)",
    steps: ["0", "20", "40", "60", "80", "100"],
  },
  precipitation_new: {
    label: "Precipitación mm",
    gradient: "linear-gradient(to right, #ffffff, #0000ff, #000088)",
    steps: ["0", "1", "2", "5", "10", "20"],
  },
  wind_new: {
    label: "Viento km/h",
    gradient: "linear-gradient(to right, rgba(122, 0, 255, 0), #7a00ff)",
    // Estas etiquetas son km/h, el rango típico de viento para ver en un mapa
    steps: ["0", "10", "20", "30", "40", "50", "60"],
  },
};




const WeatherMapPanel = () => {
  const [zoom, setZoom] = useState(9);
  const [layer, setLayer] = useState<WeatherLayer>("temp_new");

  const { lat, lon, error } = useWeatherMapTile({ zoom, layer });

  if (!lat || !lon) {
    return <p className="text-center">Obteniendo ubicación...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  const layerOptions: { label: string; value: WeatherLayer }[] = [
    { label: "Temperatura", value: "temp_new" },
    { label: "Nubes", value: "clouds_new" },
    { label: "Precipitación", value: "precipitation_new" },
    { label: "Viento", value: "wind_new" },
  ];

  const currentLegend = legends[layer];

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Botones de capas */}
      <div className="mb-2 flex flex-wrap justify-center gap-2">
        {layerOptions.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setLayer(value)}
            className={cn(
              "px-3 py-1 rounded-full border text-sm",
              value === layer
                ? "bg-green-600 text-white"
                : "bg-white text-gray-800 border-gray-300"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Mapa */}
      <div className="relative h-[500px] rounded-md overflow-hidden border shadow">
        <MapContainer
          center={[lat, lon]}
          zoom={zoom}
          scrollWheelZoom
          zoomControl={false}
          style={{ height: "100%", width: "100%" }}
        >
          <RecenterButton lat={lat} lon={lon} />
          <ZoomControl position="bottomright" />

          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />

          <TileLayer
            url={`https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`}
            attribution='&copy; <a href="https://openweathermap.org/">OpenWeather</a>'
          />
        </MapContainer>
      </div>

      
        {/* Leyenda */}
        <div className="mt-4 w-full max-w-xl mx-auto px-4 py-2">
        <p className="text-sm font-medium text-center mb-2">{currentLegend.label}</p>
        <div className="relative h-5 rounded overflow-hidden">
            <div
            className="absolute inset-0"
            style={{ background: currentLegend.gradient }}
            />
        </div>
        <div className="flex justify-between text-xs text-gray-700 font-semibold mt-1 px-1">
            {currentLegend.steps.map((step, idx) => (
            <span key={idx}>{step}</span>
            ))}
        </div>
        </div>

    </div>
  );
};

export default WeatherMapPanel;
