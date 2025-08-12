import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import imgCentral from "../assets/24.png";
import imgIzquierda from "../assets/6.png";
import imgDerecha from "../assets/7.png";
import fondo18 from '../assets/20.png';


import {
  Leaf,
  Thermometer,
  Cloud,
  AlertCircle,
  Users,
  FlaskConical,
  HeartHandshake,
  GraduationCap,
  ClipboardList
} from "lucide-react";

export const Home = () => {
  return (
    <div className="min-h-screen">

      {/* ==============================
          HERO (NO TOCAR - se mantiene igual)
         ============================== */}
<section
  className="py-28 bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: `url(${fondo18})` }}
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-end items-center">
    <div className="text-white max-w-xl drop-shadow-lg">

      {/* Contenedor para texto alineado a la derecha pero con control de margen interno */}
      <h1 className="text-4xl md:text-6xl font-bold mb-8 text-right inline-block">
        Comienza tu guía
        <br />
        <span
          className="block"
          style={{ marginLeft: "1.8rem" }} // Ajusta para que quede bajo la C
        >
          de cuidado
        </span>
      </h1>

      <div className="flex flex-col sm:flex-row gap-4 justify-end mt-10">
        <Link to="/info">
          <Button
            size="lg"
            className="w-full sm:w-auto bg-white text-black hover:bg-gray-100"
          >
            Comenzar Ahora
          </Button>
        </Link>
        <Link to="/login">
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto border-white text-white bg-transparent hover:bg-white hover:text-black"
          >
            Iniciar Sesión
          </Button>
        </Link>
      </div>
    </div>
  </div>
</section>



      {/* ==============================
          BENEFICIOS (estructura con imagen central)
         ============================== */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
         
            <div className="max-w-6xl mx-auto px-4 text-center">

    <p className= "text-[#0A7400] text-lg mb-2">Bienvenido</p>
    <h3 className="text-4xl font-bold text-[#0A7400] mb-6">
      Yol – ná
    </h3>
    <p className="text-gray-800 max-w-3xl mx-auto mb-4">
      Yol Ná es un sistema que utiliza sensores ambientales y visión artificial para
      detectar enfermedades en cultivos como el acachul.
    </p>
    <p className="text-gray-800 max-w-3xl mx-auto">
      Ayuda a tomar decisiones de riego, tratamiento y cuidado para maximizar la salud
      del cultivo.
    </p>
  </div>

  <section className="py-16">
  <div className="max-w-6xl mx-auto px-4">
    <h3 className="text-center text-2xl font-semibold text-[#0A7400] mb-2">
      Beneficios de utilizar
    </h3>
    <p className="text-center text-2xl font-semibold text-[#0A7400] mb-8 max-w-3xl mx-auto">
      Yol – ná
    </p>
  </div>
</section>


  {/* ==============================
          CIRCULOS PEDORROS 
         ============================== */}


  <section className="py-16">
  <div className="relative max-w-xl mx-auto flex items-center justify-center">
    {/* Imagen central más pequeña */}
    <img
      src={imgCentral}
      alt="Central"
      className="w-64 h-64 rounded-full object-cover border-4 border-white shadow-xl z-30"
    />

    {/* Grupo de las dos imágenes pequeñas (más separadas de la central) */}
    <div className="absolute bottom-4 z-40 flex items-end space-x-8">
      {/* Izquierda (más pequeña) */}
      <img
        src={imgIzquierda}
        alt="Izquierda"
        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg -translate-x-6 translate-y-6"
      />

      {/* Derecha (intermedia) */}
      <img
        src={imgDerecha}
        alt="Derecha"
        className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-lg translate-x-6 translate-y-4"
      />
    </div>

    {/* Texto arriba */}
    <div className="absolute -top-24 w-52 text-center space-y-2">
      <Thermometer className="h-14 w-14 text-gray-800 mx-auto" />
      <p className="text-sm text-gray-800">Monitoreo de pH, humedad y luz.</p>
    </div>

    {/* Texto izquierda */}
    <div className="hidden md:block absolute left-[-11.5rem] top-1/2 -translate-y-1/2 w-48 text-center space-y-2">
      <Cloud className="h-14 w-14 text-gray-800 mx-auto" />
      <p className="text-sm text-gray-800">Integración con clima en tiempo real.</p>
    </div>

    {/* Texto derecha */}
    <div className="hidden md:block absolute right-[-11.5rem] top-1/2 -translate-y-1/2 w-48 text-center space-y-2">
      <AlertCircle className="h-14 w-14 text-gray-800 mx-auto" />
      <p className="text-sm text-gray-800">Detección con IA de enfermedades comunes.</p>
    </div>

    {/* Texto abajo */}
    <div className="absolute -bottom-28 w-52 text-center space-y-2">
      <ClipboardList className="h-14 w-14 text-gray-800 mx-auto" />
      <p className="text-sm text-gray-800">Recomendaciones automáticas de tratamiento.</p>
    </div>
  </div>
</section>
</div>
</section>


      {/* ==============================
          ¿PARA QUIÉN ES YOL-NÁ? (imagen circular + panel verde sutil)
         ============================== */}
<section
  className="mt-12 py-6 relative"
  style={{
    backgroundImage: `url('/src/assets/30.png')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Capa verde solo en la mitad derecha */}
  <div
    className="absolute top-0 right-0 h-full w-1/2"
    style={{
      background: "rgba(0,70,31,0.6)",
    }}
  ></div>

  <div className="max-w-7xl mx-auto px-4 relative z-10">
    <div className="grid grid-cols-1 md:grid-cols-2 items-center">
      
      {/* Izquierda: imagen circular */}
      <div className="flex justify-center md:justify-start p-6">
        <div className="relative">
          <div className="w-60 h-60 rounded-full bg-white p-1 flex items-center justify-center shadow-lg">
            <div className="w-full h-full rounded-full border-4 border-[#16A235] overflow-hidden">
              <img
                src="/src/assets/3.png"
                alt="agricultor"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Derecha: texto */}
      <div className="p-8 md:p-12 text-white flex flex-col justify-center">
        <h3 className="text-2xl font-semibold mb-4">¿Para quién es Yol-Ná?</h3>
        <p className="max-w-xl text-lg">
          Yol Ná está diseñado para quienes buscan cuidar sus cultivos con
          inteligencia, tecnología y conciencia ambiental.
        </p>
      </div>
    </div>
  </div>
</section>

      {/* ==============================
          PÚBLICO OBJETIVO (4 tarjetas estilo maqueta)
         ============================== */}
<section className="py-16 bg-white">
  <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
    
    {/* tarjeta 1 */}
    <div className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition flex flex-col items-center">
      <h4 className="text-sm text-[#318a1d] mb-4">Agricultores</h4>
      <div className="mb-4">
        <div className="w-20 h-20 rounded-full bg-[#d2eed3] p-2 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full border-4 border-[#00461f] bg-white flex items-center justify-center">
            <Users className="h-10 w-10 text-[#00461f]" />
          </div>
        </div>
      </div>
      <p className="text-gray-600 text-center">Optimiza tu cosecha y reduce costos.</p>
    </div>

    {/* tarjeta 2 */}
    <div className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition flex flex-col items-center">
      <h4 className="text-sm text-[#318a1d] mb-4">Investigadores</h4>
      <div className="mb-4">
        <div className="w-20 h-20 rounded-full bg-[#d2eed3] p-2 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full border-4 border-[#00461f] bg-white flex items-center justify-center">
            <FlaskConical className="h-10 w-10 text-[#00461f]" />
          </div>
        </div>
      </div>
      <p className="text-gray-600 text-center">Accede a datos precisos para tus estudios.</p>
    </div>

    {/* tarjeta 3 */}
    <div className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition flex flex-col items-center">
      <h4 className="text-sm text-[#318a1d] mb-4">Amantes de la agricultura sustentable</h4>
      <div className="mb-4">
        <div className="w-20 h-20 rounded-full bg-[#d2eed3] p-2 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full border-4 border-[#00461f] bg-white flex items-center justify-center">
            <HeartHandshake className="h-10 w-10 text-[#00461f]" />
          </div>
        </div>
      </div>
      <p className="text-gray-600 text-center">Logra cosechas abundantes.</p>
    </div>

    {/* tarjeta 4 */}
    <div className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition flex flex-col items-center">
      <h4 className="text-sm text-[#318a1d] mb-4">Escuelas</h4>
      <div className="mb-4">
        <div className="w-20 h-20 rounded-full bg-[#d2eed3] p-2 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full border-4 border-[#00461f] bg-white flex items-center justify-center">
            <GraduationCap className="h-10 w-10 text-[#00461f]" />
          </div>
        </div>
      </div>
      <p className="text-gray-600 text-center">Introduce la tecnología en el aprendizaje agrícola.</p>
    </div>

  </div>
</section>


      {/* frase final */}
      <section className="py-6 bg-white">
        <p className="text-2xl text-center text-[#0F961C] italic">"Yol-ná. Corazón de la Tierra."</p>
      </section>
    </div>
  );
};
