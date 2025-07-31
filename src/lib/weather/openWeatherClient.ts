// src/lib/weather/openWeatherClient.ts

import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

if (!API_KEY) {
  throw new Error("Falta la API Key de OpenWeatherMap. Asegúrate de definir VITE_OPENWEATHER_API_KEY en tu archivo .env");
}

export const openWeatherClient = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: "metric", // Puedes cambiar a "imperial" si deseas Fahrenheit
    lang: "es"        // Opcional, para respuestas en español
  },
});
