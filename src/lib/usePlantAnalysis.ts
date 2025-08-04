// Escalas ideales (ajustables)
const idealPh = 6.5;
const idealHumidity = 65;
const idealLight = 15000;

// Penalización por desviación
const weightPh = 0.33;
const weightHumidity = 0.33;
const weightLight = 0.34;

// Función principal
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
  const phScore = Math.max(
    0,
    100 - Math.abs(ph - idealPh) * (100 / idealPh)
  );
  const humidityScore = Math.max(
    0,
    100 - Math.abs(humidity - idealHumidity) * (100 / idealHumidity)
  );
  const lightScore = Math.max(
    0,
    100 - Math.abs(light - idealLight) * (100 / idealLight)
  );

  const weightedAverage =
    phScore * weightPh +
    humidityScore * weightHumidity +
    lightScore * weightLight;

  const finalScore = Math.max(0, weightedAverage - diseasePenalty);

  return Math.round(finalScore);
}

// Interpretación textual por parámetro
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

// Recomendaciones automáticas
export function generateRecommendations(
  ph: number,
  humidity: number,
  light: number
): string[] {
  const tips: string[] = [];

  if (ph < 5.5) tips.push("Añadir cal para reducir la acidez del suelo.");
  else if (ph > 7.5) tips.push("Añadir materia orgánica para acidificar el suelo.");

  if (humidity < 30) tips.push("Aumentar el riego.");
  else if (humidity > 80) tips.push("Mejorar el drenaje del suelo.");

  if (light < 40) tips.push("Mover la planta a un área más soleada.");
  else if (light > 90) tips.push("Proporcionar sombra parcial.");

  if (tips.length === 0) tips.push("Condiciones óptimas. Mantener el cuidado actual.");

  return tips;
}
