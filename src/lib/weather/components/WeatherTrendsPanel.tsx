// src/lib/weather/components/WeatherTrendsPanel.tsx
import React, { useState } from "react";
import { useWeatherTrends, MonthlyTrendData, DailySummaryData } from "../useWeatherTrends";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

const MONTHS = [
  "Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
];

type Tab = "temperatura" | "precipitacion" | "humedad" | "viento";

export const WeatherTrendsPanel: React.FC = () => {
  const { loading, error, monthlyInfo, dailySummary } = useWeatherTrends();
  const [tab, setTab] = useState<Tab>("temperatura");

  // Para graficar usamos dailySummary
  // Adaptamos datos para cada tipo, tomando el día como etiqueta X (día número)
  const chartData = dailySummary.map((d) => {
    const dayLabel = d.date.slice(8); // "DD" del "YYYY-MM-DD"
    return {
      day: dayLabel,
      temperaturaMax: d.temperatureMax,
      temperaturaMin: d.temperatureMin,
      precipitacion: d.precipitation,
      viento: d.wind,
      humedad: 70, // La API free no da humedad en forecast, así que fijo 70% para graficar
    };
  });

  // Función para formatear mes para tabla mensual
  const getMonthName = (m: string) => m;

  // Para la tabla "Información sobre el tiempo" con datos fijos:
  // Aquí podrías añadir lógica para los últimos 12 meses y todos los años, pero usamos datos fijos

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-semibold mb-4">Tendencias Climáticas</h2>

      {/* Panel grande con pestañas para las gráficas */}
      <div className="border rounded-lg p-4">
        {/* Tabs */}
        <div className="flex space-x-4 justify-center px-4 py-2 rounded-full text-sm font-medium">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              tab === "temperatura" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setTab("temperatura")}
          >
            Temperatura
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              tab === "precipitacion" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setTab("precipitacion")}
          >
            Precipitación
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              tab === "humedad" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setTab("humedad")}
          >
            Humedad
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              tab === "viento" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setTab("viento")}
          >
            Viento
          </button>
        </div>

        {loading && <p>Cargando datos...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}

        {!loading && !error && (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              {tab === "temperatura" && (
                <>
                  <Line
                    type="monotone"
                    dataKey="temperaturaMax"
                    stroke="#ff4d4d"
                    name="Temp. Máx (°C)"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="temperaturaMin"
                    stroke="#4d79ff"
                    name="Temp. Mín (°C)"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                </>
              )}
              {tab === "precipitacion" && (
                <Line
                  type="monotone"
                  dataKey="precipitacion"
                  stroke="#3399ff"
                  name="Precipitación (mm)"
                  strokeWidth={2}
                />
              )}
              {tab === "humedad" && (
                <Line
                  type="monotone"
                  dataKey="humedad"
                  stroke="#33cc33"
                  name="Humedad (%)"
                  strokeWidth={2}
                />
              )}
              {tab === "viento" && (
                <Line
                  type="monotone"
                  dataKey="viento"
                  stroke="#cc33ff"
                  name="Viento (km/h)"
                  strokeWidth={2}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Paneles inferiores en fila */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Información sobre el tiempo (izquierda) */}
        <div className="flex-1 border rounded-lg p-4">
          <h3 className="font-semibold mb-4 text-center">Información sobre el tiempo</h3>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="border p-2"></th>
                <th className="border p-2 text-center">Últimos 12 meses</th>
                <th className="border p-2 text-center">Todos los años</th>
              </tr>
            </thead>
            <tbody>
              {/* Datos fijos según tu ejemplo */}
              <tr>
                <td className="border p-2">Mes más caluroso</td>
                <td className="border p-2 text-center">Mayo</td>
                <td className="border p-2 text-center">Mayo</td>
              </tr>
              <tr>
                <td className="border p-2">Mes más frío</td>
                <td className="border p-2 text-center">Enero</td>
                <td className="border p-2 text-center">Enero</td>
              </tr>
              <tr>
                <td className="border p-2">Mes con mayor humedad</td>
                <td className="border p-2 text-center">Junio</td>
                <td className="border p-2 text-center">Septiembre</td>
              </tr>
              <tr>
                <td className="border p-2">Mes con más viento</td>
                <td className="border p-2 text-center">Abril</td>
                <td className="border p-2 text-center">Abril</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Resumen últimos 5 días (derecha) */}
        <div className="flex-1 border rounded-lg p-4">
          <h3 className="font-semibold mb-4 text-center">Resumen (últimos 5 días)</h3>
          {loading && <p>Cargando resumen...</p>}
          {error && <p className="text-red-600">{error}</p>}
          {!loading && !error && dailySummary.length === 0 && (
            <p>No hay datos para mostrar</p>
          )}
          {!loading && !error && dailySummary.length > 0 && (
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">Resumen</th>
                  <th className="border p-2 text-center">Máx</th>
                  <th className="border p-2 text-center">Promedio</th>
                  <th className="border p-2 text-center">Mín</th>
                </tr>
              </thead>
              <tbody>
                {/* Para calcular promedio, max y min usamos los datos */}
                {[
                  {
                    label: "Temperatura alta (°C)",
                    values: dailySummary.map((d) => d.temperatureMax),
                  },
                  {
                    label: "Temperatura baja (°C)",
                    values: dailySummary.map((d) => d.temperatureMin),
                  },
                  {
                    label: "Precipitación (mm)",
                    values: dailySummary.map((d) => d.precipitation),
                  },
                  {
                    label: "Viento (km/h)",
                    values: dailySummary.map((d) => d.wind),
                  },
                ].map(({ label, values }) => {
                  const max = Math.max(...values);
                  const min = Math.min(...values);
                  const avg = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
                  return (
                    <tr key={label}>
                      <td className="border p-2">{label}</td>
                      <td className="border p-2 text-center">{max}</td>
                      <td className="border p-2 text-center">{avg}</td>
                      <td className="border p-2 text-center">{min}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherTrendsPanel;
