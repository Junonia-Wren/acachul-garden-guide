// src/lib/usePlantAnalysis.ts
import { useMemo } from "react";
import { useHourlyForecast } from "./weather/useHourlyForecast";
import type { HourlyForecastEntry } from "./weather/useHourlyForecast";

/* =========================================================
 * Escalas ideales (ajustables) y utilidades existentes
 * (Se mantienen para no romper el dashboard actual)
 * ========================================================= */
const idealPh = 6.5;
const idealHumidity = 65;
const idealLight = 15000;

// Penalización por desviación
const weightPh = 0.33;
const weightHumidity = 0.33;
const weightLight = 0.34;

// Función principal (SE MANTIENE)
export function calculateHealthIndex({
  ph,
  humidity,
  light,
  diseasePenalty = 0,
}: {
  ph: number;
  humidity: number;
  light: number;
  diseasePenalty?: number; // porcentaje de salud que se resta si hay enfermedades
}): number {
  // Normaliza cada parámetro a un valor entre 0 y 100 según cercanía al ideal
  const phScore = Math.max(0, 100 - Math.abs(ph - idealPh) * (100 / idealPh));
  const humidityScore = Math.max(
    0,
    100 - Math.abs(humidity - idealHumidity) * (100 / idealHumidity)
  );
  const lightScore = Math.max(
    0,
    100 - Math.abs(light - idealLight) * (100 / idealLight)
  );

  const weightedAverage =
    phScore * weightPh + humidityScore * weightHumidity + lightScore * weightLight;

  const finalScore = Math.max(0, weightedAverage - diseasePenalty);

  return Math.round(finalScore);
}

// Interpretación textual por parámetro (SE MANTIENEN)
export function interpretPh(ph: number): string {
  if (ph < 5.5) return "Muy ácido";
  if (ph < 6.5) return "Ligeramente ácido (óptimo)";
  if (ph < 7.5) return "Neutral a ligeramente alcalino";
  return "Muy alcalino";
}

export function interpretHumidity(h: number): string {
  if (h < 30) return "Muy seco";
  if (h < 60) return "Moderadamente húmedo";
  if (h <= 80) return "Óptimo";
  return "Exceso de humedad";
}

export function interpretLight(l: number): string {
  if (l < 10000) return "Poca luz";
  if (l < 15000) return "Luz moderada";
  if (l <= 25000) return "Óptimo";
  return "Exceso de luz solar";
}

// Recomendaciones simples por inputs del formulario (SE MANTIENE)
export function generateRecommendations(ph: number, humidity: number, light: number): string[] {
  const tips: string[] = [];

  if (ph < 5.5) tips.push("Añadir cal para reducir la acidez del suelo.");
  else if (ph > 7.5) tips.push("Añadir materia orgánica para acidificar el suelo.");

  if (humidity < 30) tips.push("Aumentar el riego.");
  else if (humidity > 80) tips.push("Mejorar el drenaje del suelo.");

  // NOTA: aquí mantengo tus umbrales originales (40/90) para no romper comportamiento actual
  if (light < 40) tips.push("Mover la planta a un área más soleada.");
  else if (light > 90) tips.push("Proporcionar sombra parcial.");

  if (tips.length === 0) tips.push("Condiciones óptimas. Mantener el cuidado actual.");

  return tips;
}

/* =========================================================
 * Hook con clima (nueva integración) — genera tarjetas ricas
 * ========================================================= */

export type Severity = "info" | "warning" | "danger";

export interface RecommendationCard {
  id: string;
  title: string;
  category: "Riego" | "Luz" | "Temperatura" | "Humedad" | "Viento" | "Suelo" | "Manejo" | "Enfermedades";
  severity: Severity;
  summary: string;
  details: string;
  actions: string[];
}

export interface EnvContext {
  hourly: HourlyForecastEntry[];
}

// Helpers
const toKmh = (ms: number) => Math.round(ms * 3.6);
const round1 = (v: number) => Math.round(v * 10) / 10;

function sumRain(next: HourlyForecastEntry[], hoursAhead: number): number {
  const steps = Math.max(1, Math.floor(hoursAhead / 3));
  return next.slice(0, steps).reduce((acc, x) => acc + (x.precipitation ?? 0), 0);
}

function maxWind(next: HourlyForecastEntry[], hoursAhead: number): number {
  const steps = Math.max(1, Math.floor(hoursAhead / 3));
  return next.slice(0, steps).reduce((m, x) => Math.max(m, x.windSpeed ?? 0), -Infinity);
}

function maxTemp(next: HourlyForecastEntry[], hoursAhead: number): number {
  const steps = Math.max(1, Math.floor(hoursAhead / 3));
  // OJO: m es número; la propiedad viene de x.temperature
  return next.slice(0, steps).reduce((m, x) => Math.max(m, x.temperature ?? -Infinity), -Infinity);
}

function minTemp(next: HourlyForecastEntry[], hoursAhead: number): number {
  const steps = Math.max(1, Math.floor(hoursAhead / 3));
  return next.slice(0, steps).reduce((m, x) => Math.min(m, x.temperature ?? Infinity), Infinity);
}

function avgRH(next: HourlyForecastEntry[], hoursAhead: number): number {
  const steps = Math.max(1, Math.floor(hoursAhead / 3));
  const slice = next.slice(0, steps);
  const sum = slice.reduce((acc, x) => acc + (x.humidity ?? 0), 0);
  return slice.length ? Math.round(sum / slice.length) : 0;
}

// Escalas ideales luz para tarjetas
const idealLuxMin = 10000;
const idealLuxMax = 25000;

/**
 * Hook que genera recomendaciones para la planta
 * usando tanto los datos del formulario como el pronóstico horario
 */
export function usePlantAnalysis(
  plant: { ph: number; soilMoisture: number; lux: number },
  lat: number,
  lon: number
): { recommendations: RecommendationCard[]; loading: boolean; error: string | null } {
  const { forecast, loading, error } = useHourlyForecast(lat, lon);

  const recommendations = useMemo((): RecommendationCard[] => {
    if (!forecast?.length) return [];

    const recs: RecommendationCard[] = [];

    const rain12 = sumRain(forecast, 12);
    const rain24 = sumRain(forecast, 24);
    const wind12 = maxWind(forecast, 12);
    const wind24 = maxWind(forecast, 24);
    const tMax12 = maxTemp(forecast, 12);
    const tMin24 = minTemp(forecast, 24);
    const rh12 = avgRH(forecast, 12);

    // --- Lluvia próxima ---
    if (rain12 >= 5) {
      recs.push({
        id: "rain-irrigation-delay",
        title: "Lluvia prevista (ajusta el riego)",
        category: "Riego",
        severity: rain12 >= 15 ? "warning" : "info",
        summary: `Se esperan ~${round1(rain12)} mm en las próximas 12 h.`,
        details:
          rain12 >= 15
            ? "La precipitación será significativa. Evita regar y verifica que el sustrato drene bien para prevenir asfixia radicular."
            : "Habrá lluvia. Retrasa el riego y revisa humedad del sustrato antes de volver a aportar agua.",
        actions: [
          "Evita riegos en las próximas 12–24 h.",
          "Comprueba que la maceta/terreno tenga buen drenaje.",
          "Evita fertilizar antes de la lluvia.",
        ],
      });
    }

    // --- Viento ---
    if (wind12 >= 10 || wind24 >= 10) {
      const w = Math.max(wind12, wind24);
      recs.push({
        id: "wind-staking",
        title: "Rachas de viento fuertes",
        category: "Viento",
        severity: w >= 14 ? "danger" : "warning",
        summary: `Ráfagas de hasta ~${toKmh(w)} km/h en 12–24 h.`,
        details: "El viento incrementa la transpiración y puede quebrar tallos tiernos.",
        actions: ["Entutora tallos largos", "Coloca barreras cortaviento", "Riega por la mañana si es necesario"],
      });
    }

    // --- Calor ---
    if (tMax12 >= 32) {
      recs.push({
        id: "heat-shade",
        title: "Estrés por calor",
        category: "Temperatura",
        severity: tMax12 >= 35 ? "danger" : "warning",
        summary: `Temperaturas máximas ~${tMax12} °C.`,
        details: "Con calor alto, la planta reduce crecimiento y puede presentar marchitez.",
        actions: ["Riega temprano", "Usa sombra 30–40%", "Aplica mulcha"],
      });
    }

    // --- Frío ---
    if (tMin24 <= 5) {
      recs.push({
        id: "cold-protection",
        title: "Protección contra frío nocturno",
        category: "Temperatura",
        severity: tMin24 <= 2 ? "danger" : "warning",
        summary: `Mínimas ~${tMin24} °C.`,
        details: "El frío reduce absorción radicular y puede dañar tejido tierno.",
        actions: ["Cubre por la noche", "Evita podas/fertilizaciones", "Mulcha para la raíz"],
      });
    }

    // --- Humedad relativa ---
    if (rh12 <= 35 && tMax12 >= 28) {
      recs.push({
        id: "dry-air",
        title: "Aire seco + calor",
        category: "Humedad",
        severity: "warning",
        summary: `HR media ~${rh12}% y máximas ~${tMax12} °C.`,
        details: "Baja humedad y calor aceleran la deshidratación.",
        actions: ["Riega por la mañana", "Mulcha y sombra parcial", "Evita trasplantes"],
      });
    }

    // --- pH (por inputs) ---
    if (plant.ph < 5.5) {
      recs.push({
        id: "low-ph",
        title: "pH bajo",
        category: "Suelo",
        severity: "info",
        summary: `pH ~${plant.ph.toFixed(1)}.`,
        details: "pH demasiado bajo limita disponibilidad de nutrientes.",
        actions: ["Incorpora cal dolomítica", "Evita fertilizantes acidificantes"],
      });
    } else if (plant.ph > 7.5) {
      recs.push({
        id: "high-ph",
        title: "pH alto",
        category: "Suelo",
        severity: "info",
        summary: `pH ~${plant.ph.toFixed(1)}.`,
        details: "pH alto puede bloquear Fe, Mn y Zn.",
        actions: ["Añade materia orgánica", "Usa fertilizantes ligeramente acidificantes"],
      });
    }

    // --- Luz (por inputs) ---
    if (plant.lux > idealLuxMax) {
      recs.push({
        id: "too-much-light",
        title: "Exceso de luz",
        category: "Luz",
        severity: "warning",
        summary: `Lux ~${plant.lux.toLocaleString()}.`,
        details: "La radiación alta aumenta estrés hídrico y riesgo de quemaduras.",
        actions: ["Sombrea 30–40%", "Riega temprano", "Evita fertilizaciones foliares"],
      });
    } else if (plant.lux < idealLuxMin) {
      recs.push({
        id: "low-light",
        title: "Luz insuficiente",
        category: "Luz",
        severity: "info",
        summary: `Lux ~${plant.lux.toLocaleString()}.`,
        details: "Luz por debajo del rango óptimo reduce fotosíntesis y vigor.",
        actions: ["Reubica a luz indirecta brillante", "Limpia hojas de polvo"],
      });
    }

    // Evitar duplicados manteniendo la última versión de cada id
    const uniq = new Map<string, RecommendationCard>();
    for (const r of recs) uniq.set(r.id, r);
    return Array.from(uniq.values());
  }, [plant, forecast]);

  return { recommendations, loading, error };
}
