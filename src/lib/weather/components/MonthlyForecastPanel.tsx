// src/lib/weather/components/MonthlyWeatherPanel.tsx
import React from "react";
import { useMonthlyForecast, MonthlyDayData } from "../useMonthlyForecast";

const WEEKDAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

function getIconUrl(iconCode: string) {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

interface MonthlyWeatherPanelProps {
  minTempLimit?: number; 
  maxTempLimit?: number; 
}

export const MonthlyWeatherPanel: React.FC<MonthlyWeatherPanelProps> = ({
  minTempLimit = -10,
  maxTempLimit = 45,
}) => {
  const { loading, error, days } = useMonthlyForecast();

  const today = new Date().getDate();

  // Obtener día de la semana del primer día del mes para offset del grid
  const firstDayOfWeek = days.length > 0 ? WEEKDAYS.indexOf(days[0].weekday) : 0;

  // Función para limitar temperatura dentro del rango definido
  const clampTemp = (temp: number) => {
    if (temp < minTempLimit) return minTempLimit;
    if (temp > maxTempLimit) return maxTempLimit;
    return temp;
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Pronóstico Mensual</h2>

      {/* Encabezados de días de la semana */}
      <div className="grid grid-cols-7 text-center font-semibold mb-2">
        {WEEKDAYS.map((wd) => (
          <div key={wd} className="py-1 border-b border-gray-300">
            {wd}
          </div>
        ))}
      </div>

      {loading && <p className="text-center">Cargando datos...</p>}
      {error && (
        <p className="text-center text-red-600">
          Error al cargar datos: {error}
        </p>
      )}

      {!loading && !error && (
        <div
          className="grid grid-cols-7 gap-4"
          style={{ minHeight: "400px" }}
        >
          {/* offset para el primer día del mes para que inicie en el día correcto */}
          {[...Array(firstDayOfWeek)].map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {/* Cards de días */}
          {days.map((day: MonthlyDayData) => {
            const isToday = day.day === today;
            return (
              <div
                key={day.day}
                className={`border rounded-lg p-3 flex flex-col items-center shadow-sm hover:shadow-md transition ${
                  isToday ? "border-blue-600 ring-2 ring-green-400" : "border-gray-300"
                }`}
              >
                {/* Día del mes en esquina superior izquierda */}
                <div className="self-start font-semibold mb-2">{day.day}</div>

                {/* Icono y temperatura */}
                <div className="flex items-center space-x-2 mb-1">
                  <img
                    src={getIconUrl(day.icon)}
                    alt="Icono clima"
                    className="w-12 h-12"
                    draggable={false}
                  />
                  <span className="text-xl font-semibold">
                    {clampTemp(Math.round(day.maxTemp))}°C
                  </span>
                </div>

                {/* Probabilidad de lluvia con icono */}
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 15a4 4 0 004 4h10a4 4 0 000-8H7a4 4 0 00-4 4z"
                    />
                  </svg>
                  <span>{day.rainChance}%</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mx-auto w-fit">
        <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 15a4 4 0 004 4h10a4 4 0 000-8H7a4 4 0 00-4 4z"
                    />
                  </svg><span></span>
                  Porcentaje de Lluvia
                </div>

      </div>
    </div>
  );
};

export default MonthlyWeatherPanel;
