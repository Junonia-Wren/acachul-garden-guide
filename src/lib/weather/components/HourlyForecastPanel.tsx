import { useState, useEffect } from "react";
import { useHourlyForecast, DaySummary, GroupedForecastByDay } from "@/lib/weather/useHourlyForecast";
import type { HourlyData, getWeatherIconUrl } from "@/lib/weather/weatherUtils";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { getWeatherIconUrl as getIconUrl } from "@/lib/weather/weatherUtils";

const TABS = ["General", "Precipitaciones", "Humedad", "Viento"] as const;
type TabType = typeof TABS[number];

export default function HourlyForecastPanel() {
  const lat = 20.2781;
  const lon = -97.9613;

  const { loading, error, groupedForecastByDay, daySummaries } = useHourlyForecast(lat, lon);

  const [activeTab, setActiveTab] = useState<TabType>("General");
  const [selectedDate, setSelectedDate] = useState<string>("");

  useEffect(() => {
    if (!selectedDate && daySummaries.length > 0) {
      setSelectedDate(daySummaries[0].date);
    }
  }, [daySummaries, selectedDate]);

  if (loading) return <div className="p-4">Cargando pronóstico...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (!groupedForecastByDay || daySummaries.length === 0)
    return <div className="p-4">No hay datos disponibles</div>;

  // Datos horarios del día seleccionado
  const hourlyDataForSelectedDay: HourlyData[] = groupedForecastByDay[selectedDate] || [];

  // Tooltip personalizado y tipado sin usar any
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: { payload: HourlyData }[];
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 rounded shadow border text-center">
          <div className="font-semibold">{label}</div>
          <img
            src={getIconUrl(data.weather[0].icon)}
            alt={data.weather[0].description}
            className="w-10 h-10 mx-auto"
          />
          <div className="capitalize">{data.weather[0].description}</div>
          <div className="mt-1">
            Temp: {data.main.temp}°C
            {activeTab === "Precipitaciones" && ` | Precip: ${data.precipitation ?? 0} mm`}
            {activeTab === "Humedad" && ` | Humedad: ${data.main.humidity ?? 0}%`}
            {activeTab === "Viento" && ` | Viento: ${data.windSpeed ?? 0} km/h`}
          </div>
        </div>
      );
    }
    return null;
  };

  // Renderizar el gráfico según pestaña activa
  const renderChart = () => {
    switch (activeTab) {
      case "General":
        return (
          <AreaChart
            data={hourlyDataForSelectedDay}
            margin={{ top: 40, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorTempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.8} />
                <stop offset="50%" stopColor="#22c55e" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.4} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              interval={1}
              tick={{ fontSize: 12 }}
              height={60}
              tickMargin={10}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 45]}
              ticks={[0, 5, 15, 25, 35, 45]}
              unit="°C"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              width={40}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="main.temp"
              stroke="#ef4444"
              fill="url(#colorTempGradient)"
              fillOpacity={0.6}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        );
      case "Precipitaciones":
        return (
          <AreaChart
            data={hourlyDataForSelectedDay}
            margin={{ top: 40, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPrecipitationGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.4} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              interval={1}
              tick={{ fontSize: 12 }}
              height={60}
              tickMargin={10}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[
                0,
                Math.max(
                  ...hourlyDataForSelectedDay.map((d) => d.precipitation ?? 0)
                ) || 10,
              ]}
              ticks={[0, 1, 3, 5, 7, 10]}
              unit=" mm"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              width={40}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="precipitation"
              stroke="#0ea5e9"
              fill="url(#colorPrecipitationGradient)"
              fillOpacity={0.6}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        );
      case "Humedad":
        return (
          <AreaChart
            data={hourlyDataForSelectedDay}
            margin={{ top: 40, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorHumidityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#a7f3d0" stopOpacity={0.4} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              interval={1}
              tick={{ fontSize: 12 }}
              height={60}
              tickMargin={10}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              unit="%"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              width={40}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="main.humidity"
              stroke="#22c55e"
              fill="url(#colorHumidityGradient)"
              fillOpacity={0.6}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        );
      case "Viento":
        return (
          <AreaChart
            data={hourlyDataForSelectedDay}
            margin={{ top: 40, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorWindGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f97316" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#fcd34d" stopOpacity={0.4} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              interval={1}
              tick={{ fontSize: 12 }}
              height={60}
              tickMargin={10}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 40]}
              ticks={[0, 10, 20, 30, 40]}
              unit=" km/h"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              width={40}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="windSpeed"
              stroke="#f97316"
              fill="url(#colorWindGradient)"
              fillOpacity={0.6}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md space-y-6">
      {/* Selector de pestañas */}
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

      {/* Cards de días */}
      <div className="flex justify-center space-x-4 overflow-x-auto">
        {daySummaries.map(({ date, dayNumber, dayName, tempMax, tempMin, icon }) => (
          <div
            key={date}
            onClick={() => setSelectedDate(date)}
            className={`cursor-pointer rounded-lg p-4 border ${
              selectedDate === date ? "border-blue-600 bg-blue-50" : "border-gray-300"
            } flex flex-col items-center min-w-[100px]`}
          >
            <div className="w-full flex justify-between text-xs font-semibold mb-2">
              <span>{dayNumber}</span>
              <span>{dayName === "Hoy" ? "Hoy" : dayName}</span>
            </div>
            <img
              src={getIconUrl(icon)}
              alt="Icono clima"
              className="w-12 h-12 mb-1"
            />
            <div className="text-center">
              <div className="font-semibold text-lg">{tempMax}°C</div>
              <div className="text-sm text-gray-600">{tempMin}°C</div>
            </div>
          </div>
        ))}
      </div>

      {/* Título + switch placeholder */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{activeTab}</h2>
        <button
          type="button"
          className="px-3 py-1 border rounded text-sm text-gray-700 hover:bg-gray-100"
          onClick={() => alert("Toggle línea de tendencia (no implementado)")}
        >
          Mostrar línea de tendencia
        </button>
      </div>

      {/* Gráfico */}
      <div className="h-72">
        <ForecastXAxisTop data={hourlyDataForSelectedDay} />
        <ResponsiveContainer width="100%" height={300}>

          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const ForecastXAxisTop = ({ data }: { data: HourlyData[] }) => {
  return (
    <div className="flex w-full overflow-x-auto px-4 pb-2 justify-between text-center text-xs text-muted-foreground">
      {data.map((hour, idx) => {
        const date = new Date(hour.dt_txt);
        const hourLabel = date.toLocaleTimeString("es-MX", {
          hour: "numeric",
          hour12: true,
        });
        const iconUrl = `https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`;
        const temperature = Math.round(hour.main.temp);

        return (
          <div key={idx} className="flex flex-col items-center min-w-[40px]">
            <span className="font-medium">{hourLabel}</span>
            <img src={iconUrl} alt="icono" className="h-6 w-6" />
            <span>{temperature}°C</span>
          </div>
        );
      })}
    </div>
  );
};

