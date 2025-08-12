// src/lib/weather/useMonthlyForecast.ts
import { useEffect, useState } from "react";

export interface MonthlyDayData {
  day: number;
  weekday: string;
  icon: string;
  maxTemp: number;
  rainChance: number;
}

interface UseMonthlyForecastReturn {
  loading: boolean;
  error: string | null;
  days: MonthlyDayData[];
}

const WEEKDAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

const possibleIcons = [
  "01d", "02d", "03d", "04d", "09d", "10d", "11d", /*"13d",*/ "50d",
];

function getRandomIcon(): string {
  const idx = Math.floor(Math.random() * possibleIcons.length);
  return possibleIcons[idx];
}

function generateBaseMonthData(
  year: number,
  month: number,
  minTemp = 21,
  maxTemp = 29
): MonthlyDayData[] {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const out: MonthlyDayData[] = [];

  for (let d = 1; d <= daysInMonth; d++) {
    const dt = new Date(year, month, d);
    const weekday = WEEKDAYS[dt.getDay()];
    out.push({
      day: d,
      weekday,
      icon: getRandomIcon(),
      maxTemp: Math.round(minTemp + Math.random() * (maxTemp - minTemp)),
      rainChance: Math.round(Math.random() * 60),
    });
  }

  return out;
}

// Tipos para la respuesta del forecast 3h OpenWeather
interface Forecast3hWeather {
  icon: string;
}

interface Forecast3hMain {
  temp_max: number;
  temp: number;
}

interface Forecast3hItem {
  dt: number; // timestamp unix
  main: Forecast3hMain;
  weather: Forecast3hWeather[];
  pop?: number; // probabilidad precipitación 0..1
}

interface Forecast3hResponse {
  list: Forecast3hItem[];
}

export function useMonthlyForecast(
  minTempBase = 15,
  maxTempBase = 35
): UseMonthlyForecastReturn {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState<MonthlyDayData[]>([]);

  useEffect(() => {
    let mounted = true;

    function getCoords(): Promise<{ lat: number; lon: number }> {
      return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error("Geolocalización no soportada"));
        } else {
          navigator.geolocation.getCurrentPosition(
            (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
            (err) => reject(err)
          );
        }
      });
    }

    async function fetchData(lat: number, lon: number) {
      setLoading(true);
      setError(null);

      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth();

      const base = generateBaseMonthData(year, month, minTempBase, maxTempBase);

      try {
        const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY as string | undefined;
        if (!apiKey) {
          throw new Error("Falta VITE_OPENWEATHER_API_KEY en las variables de entorno");
        }

        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&lang=es`;
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`API respondió con ${res.status}`);
        }

        const data = (await res.json()) as Forecast3hResponse;

        if (!data.list || !Array.isArray(data.list)) {
          throw new Error("Datos inesperados de la API");
        }

        const dayMap = new Map<number, MonthlyDayData>();

        data.list.forEach((item) => {
          const dt = new Date(item.dt * 1000);
          if (dt.getFullYear() !== year || dt.getMonth() !== month) return;

          const day = dt.getDate();

          const temp = item.main.temp_max ?? item.main.temp;
          if (temp === undefined) return;

          const pop = item.pop !== undefined ? Math.round(item.pop * 100) : 0;

          const icon = item.weather?.[0]?.icon ?? "01d";

          const prev = dayMap.get(day);
          if (!prev) {
            dayMap.set(day, {
              day,
              weekday: WEEKDAYS[dt.getDay()],
              icon,
              maxTemp: Math.round(temp),
              rainChance: pop,
            });
          } else {
            if (Math.round(temp) > prev.maxTemp) prev.maxTemp = Math.round(temp);
            if (pop > prev.rainChance) prev.rainChance = pop;
          }
        });

        const finalDays = base.map((d) => {
          if (dayMap.has(d.day)) {
            return dayMap.get(d.day)!;
          }
          return d;
        });

        if (mounted) {
          setDays(finalDays);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setDays(base);
          setError(err instanceof Error ? err.message : String(err));
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    getCoords()
      .then(({ lat, lon }) => fetchData(lat, lon))
      .catch((err) => {
        if (mounted) {
          setError(err instanceof Error ? err.message : String(err));
          const today = new Date();
          setDays(generateBaseMonthData(today.getFullYear(), today.getMonth(), minTempBase, maxTempBase));
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [minTempBase, maxTempBase]);

  return { loading, error, days };
}
