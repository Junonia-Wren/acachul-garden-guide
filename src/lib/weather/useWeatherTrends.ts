// src/lib/weather/useWeatherTrends.ts
import { useState, useEffect } from "react";

export interface MonthlyTrendData {
  month: string; // "Ene", "Feb", etc.
  temperatureMax: number;
  temperatureMin: number;
  precipitation: number;
  humidity: number;
  wind: number;
}

export interface DailySummaryData {
  date: string; // "YYYY-MM-DD"
  temperatureMax: number;
  temperatureMin: number;
  precipitation: number;
  wind: number;
}

interface UseWeatherTrendsReturn {
  loading: boolean;
  error: string | null;

  // Datos mensuales simulados para la tabla info tiempo
  monthlyInfo: MonthlyTrendData[];

  // Datos reales últimos 5 días para resumen y gráficas
  dailySummary: DailySummaryData[];
}

const MONTHS = [
  "Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
];

// Datos reales que me diste para "Información sobre el tiempo" (tabla inferior izquierda)
const REAL_MONTHLY_INFO: MonthlyTrendData[] = [
  { month: "Ene", temperatureMax: 25, temperatureMin: 10, precipitation: 50, humidity: 80, wind: 15 },
  { month: "Feb", temperatureMax: 27, temperatureMin: 12, precipitation: 45, humidity: 78, wind: 14 },
  { month: "Mar", temperatureMax: 30, temperatureMin: 15, precipitation: 60, humidity: 75, wind: 16 },
  { month: "Abr", temperatureMax: 32, temperatureMin: 17, precipitation: 40, humidity: 70, wind: 20 },
  { month: "May", temperatureMax: 35, temperatureMin: 20, precipitation: 55, humidity: 65, wind: 22 },
  { month: "Jun", temperatureMax: 33, temperatureMin: 21, precipitation: 80, humidity: 85, wind: 18 },
  { month: "Jul", temperatureMax: 31, temperatureMin: 19, precipitation: 90, humidity: 88, wind: 17 },
  { month: "Ago", temperatureMax: 30, temperatureMin: 18, precipitation: 85, humidity: 87, wind: 16 },
  { month: "Sep", temperatureMax: 28, temperatureMin: 16, precipitation: 75, humidity: 90, wind: 15 },
  { month: "Oct", temperatureMax: 27, temperatureMin: 14, precipitation: 65, humidity: 80, wind: 14 },
  { month: "Nov", temperatureMax: 26, temperatureMin: 12, precipitation: 55, humidity: 78, wind: 13 },
  { month: "Dic", temperatureMax: 24, temperatureMin: 10, precipitation: 45, humidity: 75, wind: 12 },
];

export function useWeatherTrends(): UseWeatherTrendsReturn {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dailySummary, setDailySummary] = useState<DailySummaryData[]>([]);
  
  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        // Obtener ubicación automática
        const getCoords = () =>
          new Promise<{ lat: number; lon: number }>((resolve, reject) => {
            if (!navigator.geolocation) {
              reject(new Error("Geolocalización no disponible"));
            }
            navigator.geolocation.getCurrentPosition(
              (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
              (err) => reject(err)
            );
          });

        const { lat, lon } = await getCoords();

        // Consultar API /forecast para últimos 5 días (real)
        const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY as string | undefined;
        if (!apiKey) throw new Error("Falta API KEY");

        // La API free no da datos históricos, pero sí forecast 5 días a cada 3 horas
        // Tomaremos 5 días y promediaremos valores por día

        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&lang=es`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`API respondió con ${res.status}`);

        const data = await res.json();

        // Procesar datos para obtener resumen diario (max, min temp, sum prec, avg viento)
        type ForecastItem = {
          dt_txt: string;
          main: { temp_max: number; temp_min: number };
          rain?: { "3h"?: number };
          wind: { speed: number };
        };

        const items: ForecastItem[] = data.list || [];

        // Agrupar por día YYYY-MM-DD
        const dailyMap: Record<string, ForecastItem[]> = {};
        items.forEach((item) => {
          const day = item.dt_txt.split(" ")[0];
          if (!dailyMap[day]) dailyMap[day] = [];
          dailyMap[day].push(item);
        });

        const dailySummaryData: DailySummaryData[] = Object.entries(dailyMap)
          .slice(0, 5) // solo 5 días
          .map(([date, entries]) => {
            const maxTemps = entries.map((e) => e.main.temp_max);
            const minTemps = entries.map((e) => e.main.temp_min);
            const rainTotals = entries.map((e) => (e.rain?.["3h"] ?? 0));
            const windSpeeds = entries.map((e) => e.wind.speed);

            return {
              date,
              temperatureMax: Math.round(Math.max(...maxTemps)),
              temperatureMin: Math.round(Math.min(...minTemps)),
              precipitation: Math.round(rainTotals.reduce((a, b) => a + b, 0)),
              wind: Math.round(windSpeeds.reduce((a, b) => a + b, 0) / windSpeeds.length),
            };
          });

        if (mounted) {
          setDailySummary(dailySummaryData);
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : String(err));
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    loading,
    error,
    monthlyInfo: REAL_MONTHLY_INFO, // tabla inferior izquierda (datos reales que me diste)
    dailySummary, // tabla inferior derecha y gráficos
  };
}
