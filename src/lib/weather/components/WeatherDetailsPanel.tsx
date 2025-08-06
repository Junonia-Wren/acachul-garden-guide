// src/lib/weather/components/WeatherDetailsPanel.tsx

import React from "react";
import { useWeatherDetails, WeatherDetail } from "../useWeatherDetails";

export const WeatherDetailsPanel = () => {
  const { details, loading } = useWeatherDetails();

  if (loading) {
    return (
      <div className="grid grid-cols-4 gap-6">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="h-48 rounded-xl bg-gray-300 animate-pulse"
            aria-label="loading skeleton"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-6">
      {details.map((detail: WeatherDetail) => (
        <div
          key={detail.id}
          className="p-4 bg-white rounded-xl shadow-md flex flex-col items-center text-center"
        >
          <h3 className="text-lg font-semibold mb-2">{detail.title}</h3>
          <img
            src={detail.icon}
            alt={detail.title + " icon"}
            className="w-20 h-20 mb-4"
            loading="lazy"
          />
          <p className="font-medium">{detail.summary}</p>
          <p className="mt-2 text-sm text-gray-600">{detail.description}</p>
        </div>
      ))}
    </div>
  );
};
