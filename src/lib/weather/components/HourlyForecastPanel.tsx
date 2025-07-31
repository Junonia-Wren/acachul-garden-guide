// src/lib/weather/components/HourlyForecastPanel.tsx

import { useState } from "react";
import { useHourlyForecast } from "@/lib/weather/useHourlyForecast";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const TABS = ["General", "Precipitaciones", "Humedad", "Viento"];

export default function HourlyForecastPanel() {
  const lat = 20.2781;
  const lon = -97.9613;
  const { forecast, loading, error } = useHourlyForecast(lat, lon);
  const [activeTab, setActiveTab] = useState("General");

  if (loading) return <div className="p-4">Cargando pronóstico...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  const renderChart = () => {
    switch (activeTab) {
      case "General":
        return (
          <LineChart data={forecast}>
            <XAxis dataKey="time" />
            <YAxis unit="°C" />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Line type="monotone" dataKey="temperature" stroke="#3b82f6" />
          </LineChart>
        );
      case "Precipitaciones":
        return (
          <LineChart data={forecast}>
            <XAxis dataKey="time" />
            <YAxis unit=" mm" />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Line type="monotone" dataKey="precipitation" stroke="#0ea5e9" />
          </LineChart>
        );
      case "Humedad":
        return (
          <LineChart data={forecast}>
            <XAxis dataKey="time" />
            <YAxis unit="%" />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Line type="monotone" dataKey="humidity" stroke="#22c55e" />
          </LineChart>
        );
      case "Viento":
        return (
          <LineChart data={forecast}>
            <XAxis dataKey="time" />
            <YAxis unit=" km/h" />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Line type="monotone" dataKey="windSpeed" stroke="#f97316" />
          </LineChart>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md space-y-6">
      {/* Selector de pestañas internas */}
      <div className="flex space-x-4 justify-center">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Gráfico dinámico */}
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
