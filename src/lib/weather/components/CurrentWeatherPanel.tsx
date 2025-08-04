// src/components/weather/CurrentWeatherPanel.tsx

import { useCurrentWeather } from "@/lib/weather/useCurrentWeather";
import {
  getCurrentDateString,
  getCurrentTimeString,
  getWeatherIconUrl,
} from "@/lib/weather/weatherUtils";

export default function CurrentWeatherPanel() {
  const lat = 20.2781;
  const lon = -97.9613;
  const { weather, loading, error } = useCurrentWeather(lat, lon);

  if (loading) return <div className="p-4">Cargando clima actual...</div>;
  if (error || !weather) return <div className="p-4 text-red-500">Error al cargar clima.</div>;

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md space-y-4">
      {/* Ciudad, fecha y hora */}
      <div>
        <h2 className="text-2xl font-semibold">{weather.city}, {weather.country}</h2>
        <p className="text-sm text-gray-500">
          {getCurrentDateString()} • {getCurrentTimeString()}
        </p>
      </div>

      {/* Icono, temperatura, descripción */}
      <div className="flex items-center gap-6">
        <img
          src={getWeatherIconUrl(weather.icon)}
          alt="icono clima"
          className="w-24 h-24"
        />
        <div>
          <p className="text-4xl font-bold">{weather.temperature}°C</p>
          <p className="capitalize text-lg text-gray-600">{weather.description}</p>
          <p className="text-sm text-gray-500">
            Sensación térmica {weather.feelsLike}°C
          </p>
        </div>
      </div>

      {/* Descripción general */}
      <div>
        <p className="text-gray-700">
          Se esperan tormentas eléctricas fuertes. Una temperatura máxima de 28° en un día húmedo.
        </p>
      </div>

      {/* Métricas detalladas */}
      <div className="grid grid-cols-5 gap-4 text-center">
        <div>
          <p className="text-xs text-gray-500">Viento</p>
          <p className="font-medium">{weather.windSpeed} km/h</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Humedad</p>
          <p className="font-medium">{weather.humidity}%</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Visibilidad</p>
          <p className="font-medium">{weather.visibility} km</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Presión</p>
          <p className="font-medium">{weather.pressure} mbar</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Punto de rocío</p>
          <p className="font-medium">{weather.dewPoint}°</p>
        </div>
      </div>
    </div>
  );
}
