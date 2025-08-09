import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Camera, BarChart3, MessageSquare } from "lucide-react";




import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react'; // Importamos iconos de lucide-react
import { FaFacebookF, FaWhatsapp, FaInstagram, FaTiktok } from 'react-icons/fa'; // Importamos iconos de redes sociales

export const Contac = () => {
  return (
    <div className="min-h-screen font-sans bg-white">
      {/* Sección 1: Encabezado con imagen de fondo y texto */}
      <section 
        className="relative h-96 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/Imagenes/contact-header.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-50 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-widest">
            CONTACTO
          </h1>
        </div>
      </section>

      {/* Sección 2: Mensaje principal */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          ¡Hablemos!
        </h2>
        <p className="text-xl text-green-600 font-semibold px-4">
          ¿Tienes dudas, comentarios o quieres saber más sobre Yol-Ná?
        </p>
      </section>

      {/* Sección 3: Mapa y formulario en dos columnas */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          
          {/* Mapa funcional del lado izquierdo */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden h-[500px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15024.49658097034!2d-97.98637207010416!3d20.3014163994966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d0d82d43e5210d%3A0xc3c5180630b427b!2sUniversidad%20Tecnol%C3%B3gica%20de%20Xicotepec%20de%20Ju%C3%A1rez!5e0!3m2!1ses-419!2smx!4v1714936494793!5m2!1ses-419!2smx"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de la Universidad Tecnológica de Xicotepec de Juárez"
            ></iframe>
          </div>

          {/* Formulario del lado derecho */}
          <div className="p-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              ¡Tu opinión es importante!
            </h3>
            <form className="space-y-6">
              <div>
                <label htmlFor="nombre" className="block text-sm text-gray-700 mb-1">
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-gray-700 mb-1">
                  Correo Electronico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label htmlFor="mensaje" className="block text-sm text-gray-700 mb-1">
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={4}
                  className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-black"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 px-6 text-sm font-semibold text-white bg-black hover:bg-gray-800 transition-colors duration-300"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Sección 4: Información de Contacto con cuadros independientes */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              Información Directa
            </h3>
            <p className="text-lg text-gray-600">
              Puedes encontrarnos en las siguientes plataformas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cuadro de Correo */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center text-center space-y-4">
              <div className="bg-gray-100 p-4 rounded-full shadow-md">
                <Mail className="h-8 w-8 text-gray-700" />
              </div>
              <h4 className="text-xl font-bold text-gray-900">Correo</h4>
              <p className="text-base text-gray-700">yolna.proyecto@gmail.com</p>
            </div>

            {/* Cuadro de Horario */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center text-center space-y-4">
              <div className="bg-gray-100 p-4 rounded-full shadow-md">
                <Clock className="h-8 w-8 text-gray-700" />
              </div>
              <h4 className="text-xl font-bold text-gray-900">Horario</h4>
              <p className="text-base text-gray-700">Lunes a Viernes</p>
              <p className="text-base text-gray-700">9:00 am - 6:00 pm</p>
            </div>

            {/* Cuadro de Ubicación */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center text-center space-y-4">
              <div className="bg-gray-100 p-4 rounded-full shadow-md">
                <MapPin className="h-8 w-8 text-gray-700" />
              </div>
              <h4 className="text-xl font-bold text-gray-900">Ubicación</h4>
              <p className="text-base text-gray-700">Xicotepec de Juárez, Puebla</p>
            </div>
          </div>

          {/* Redes Sociales */}
          <div className="mt-16 text-center">
            <h4 className="text-xl font-bold text-gray-900 mb-6">
              Visítanos en nuestras Redes sociales
            </h4>
            <div className="flex justify-center space-x-6">
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-gray-600 transition-colors duration-300">
                <FaFacebookF className="h-8 w-8" />
              </a>
              <a href="https://wa.me/521234567890" target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-gray-600 transition-colors duration-300">
                <FaWhatsapp className="h-8 w-8" />
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-gray-600 transition-colors duration-300">
                <FaInstagram className="h-8 w-8" />
              </a>
              <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-gray-600 transition-colors duration-300">
                <FaTiktok className="h-8 w-8" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
