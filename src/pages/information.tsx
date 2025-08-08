import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Camera, BarChart3, MessageSquare } from "lucide-react";
import React from 'react';



export const Information = () => {
  return (
    <div className="min-h-screen font-sans bg-gray-100">
      {/* Encabezado con imagen de fondo */}
      {/* Coloca aquí la imagen del encabezado, por ejemplo, `header-bg.jpg` */}
      <section
        className="relative h-60 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "url('/Imagenes/header-bg.jpg')", // Cambia el nombre si es diferente
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-widest">
            INFORMACIÓN
          </h1>
        </div>
      </section>

      {/* Tarjetas superiores con imagen y texto (el diseño que buscas) */}
      <section className="relative z-20 -mt-20 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Tarjeta 1 */}
          <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center text-center">
            <p className="text-sm font-medium text-gray-700 mb-2">¿Cómo saber si tu acahul esta sano?</p>
            <div className="w-16 h-16 rounded-full overflow-hidden mb-2">
              {/* Asegúrate de que esta imagen exista en public/Imagenes/acahul-sano.jpg */}
              <img src="/Imagenes/10.png" alt="Acahul sano" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Tarjeta 2 */}
          <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center text-center">
            <p className="text-sm font-medium text-gray-700 mb-2">¿Cómo tomar una buena foto?</p>
            <div className="w-16 h-16 rounded-full overflow-hidden mb-2">
              {/* Asegúrate de que esta imagen exista en public/Imagenes/tomar-foto.jpg */}
              <img src="/Imagenes/16.jpg" alt="Tomar foto" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Tarjeta 3 */}
          <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center text-center">
            <p className="text-sm font-medium text-gray-700 mb-2">Guía básica de cuidados</p>
            <div className="w-16 h-16 rounded-full overflow-hidden mb-2">
              {/* Asegúrate de que esta imagen exista en public/Imagenes/guia-cuidados.jpg */}
              <img src="/Imagenes/4.jpeg" alt="Guía de cuidados" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Sección "Todo sobre el acachul" */}
      <section className="py-12 bg-white text-center">
        <h2 className="text-xl font-bold mb-10">Todo sobre el acachul</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 max-w-5xl mx-auto px-4">
          {[
            // Asegúrate de que estas imágenes existan en public/Imagenes/ con estos nombres
            "/Imagenes/8.jpeg",
            "/Imagenes/12.png",
            "/Imagenes/2.jpeg",
            "/Imagenes/15.png",
            "/Imagenes/5.jpeg",
            "/Imagenes/14.png"
          ].map((src, i) => (
            <div key={i} className="w-full aspect-square relative overflow-hidden rounded-2xl shadow-md">
              <img
                src={src}
                alt={`Acachul ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Otras secciones... (no modificadas) */}
      <section className="bg-gray-100 py-16 text-center px-4">
        <h2 className="text-xl font-bold mb-4">¿QUÉ ES EL ACACHUL?</h2>
        <p className="max-w-3xl mx-auto text-gray-600">
          El acachul es una planta silvestre de gran importancia ecológica y cultural.
          Nuestro sistema permite conocer más sobre su estado y cuidado.
        </p>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-xl font-bold mb-4">¿QUÉ ES EL MONITOREO DEL ACACHUL?</h2>
            <p className="text-gray-600">
              Proceso de observación y registro del estado del acachul mediante
              sensores y análisis de datos para su óptimo cuidado.
            </p>
          </div>
          <img
            src="/Imagenes/8.jpg"
            alt="Monitoreo"
            className="rounded-2xl shadow-lg w-full object-cover h-64"
          />
        </div>
      </section>


      {/* Otras secciones... (no modificadas) */}
      <section className="bg-gray-100 py-16 text-center px-4">
        <h2 className="text-xl font-bold mb-4">¿Como tomar una buena foto?</h2>
        <p className="max-w-3xl mx-auto text-gray-600">
          El acachul es una planta silvestre de gran importancia ecológica y cultural.
          Nuestro sistema permite conocer más sobre su estado y cuidado.
        </p>
      </section>

<section className="py-16 bg-white">
  <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
    {/* Primero el contenedor de la imagen */}
    <img
      src="/Imagenes/8.jpg"
      alt="Monitoreo"
      className="rounded-2xl shadow-lg w-full object-cover h-64"
    />
    
    {/* Luego el contenedor del texto */}
    <div>
      <h2 className="text-xl font-bold mb-4">¿QUÉ ES EL MONITOREO DEL ACACHUL?</h2>
      <p className="text-gray-600">
        Proceso de observación y registro del estado del acachul mediante
        sensores y análisis de datos para su óptimo cuidado.
      </p>
    </div>
  </div>
</section>




      {/* Otras secciones... (no modificadas) */}
      <section className="bg-gray-100 py-16 text-center px-4">
        <h2 className="text-xl font-bold mb-4">¿Sabes cuales son los cuidados básicos?</h2>
        <p className="max-w-3xl mx-auto text-gray-600">
          El acachul es una planta silvestre de gran importancia ecológica y cultural.
          Nuestro sistema permite conocer más sobre su estado y cuidado.
        </p>
      </section>

      <section className="py-16 text-center bg-white">
        <h2 className="text-xl font-bold mb-10">Próximamente en Yolná</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-8">
          {[
            { step: "Paso 1", text: "Descarga la aplicación" },
            { step: "Paso 2", text: "Registra tu planta" },
            { step: "Paso 3", text: "Monitorea en tiempo real" },
          ].map((item, i) => (
            <div key={i} className="w-64 rounded-2xl shadow-md border border-gray-200">
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">{item.step}</h3>
                <p className="text-gray-600">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-green-50 py-12 text-center">
        <h2 className="text-xl font-bold mb-6">¿Tienes alguna duda?</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-4xl mx-auto">
          {["Paso 1", "Paso 2", "Paso 3", "Paso 4"].map((step, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow-md w-full sm:w-40">
              <p className="font-bold">{step}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};