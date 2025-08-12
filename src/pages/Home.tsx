import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Leaf,
  Thermometer,
  Cloud,
  AlertCircle,
  Users,
  FlaskConical,
  HeartHandshake,
  GraduationCap,
} from "lucide-react";

export const Home = () => {
  return (
    <div className="min-h-screen">

      {/* ==============================
          HERO (NO TOCAR - se mantiene igual)
         ============================== */}
      <section className="bg-gradient-to-br from-primary-light to-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Comienza tu guía{" "}
            <span className="text-primary block">de cuidado</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Sistema avanzado de monitoreo y diagnóstico para plantas de Acachul. 
            Analiza el estado de salud, recibe recomendaciones personalizadas y 
            optimiza el crecimiento de tus plantas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="w-full sm:w-auto">
                Comenzar Ahora
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Iniciar Sesión
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ==============================
          BENEFICIOS (estructura con imagen central)
         ============================== */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
         
            <div className="max-w-6xl mx-auto px-4 text-center">

    <p className="text-green-700 text-lg mb-2">Bienvenido</p>
    <h1 className="text-4xl font-bold text-green-900 mb-6">
      Yol – ná
    </h1>
    <p className="text-gray-800 max-w-3xl mx-auto mb-4">
      Yol Ná es un sistema que utiliza sensores ambientales y visión artificial para
      detectar enfermedades en cultivos como el acachul.
    </p>
    <p className="text-gray-800 max-w-3xl mx-auto">
      Ayuda a tomar decisiones de riego, tratamiento y cuidado para maximizar la salud
      del cultivo.
    </p>
  </div>

  <section className="py-16 bg-gray-50">
  <div className="max-w-6xl mx-auto px-4">
    <h3 className="text-center text-2xl font-semibold text-[#00461f] mb-2">
      Beneficios de utilizar
    </h3>
    <p className="text-center text-2xl font-semibold text-[#00461f] mb-8 max-w-3xl mx-auto">
      Yol – ná
    </p>
  </div>
</section>

          {/* fila superior: icon - imagen - icon */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="text-center space-y-3">
              <Thermometer className="h-10 w-10 text-[#005726] mx-auto" />
              <p className="text-sm text-gray-600">Monitoreo de pH, humedad y luz.</p>
            </div>

            <div className="flex justify-center">
              {/* placeholder para que tú reemplaces la imagen */}
              <div className="relative">
                <div className="w-48 h-48 rounded-full bg-[#d2eed3] p-2 flex items-center justify-center shadow-md">
                  <div className="w-full h-full rounded-full border-4 border-[#00461f] overflow-hidden">
                    <img
                      src="ruta-de-tu-imagen-beneficio.jpg"
                      alt="beneficio"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center space-y-3">
              <AlertCircle className="h-10 w-10 text-[#005726] mx-auto" />
              <p className="text-sm text-gray-600">Detección con IA de problemas comunes.</p>
            </div>
          </div>

          {/* fila inferior: dos beneficios */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            <div className="text-center space-y-3">
              <Cloud className="h-10 w-10 text-[#318a1d] mx-auto" />
              <p className="text-sm text-gray-600">Integración con clima en tiempo real.</p>
            </div>
            <div className="text-center space-y-3">
              <Leaf className="h-10 w-10 text-[#0f961c] mx-auto" />
              <p className="text-sm text-gray-600">Recomendaciones automáticas de tratamiento.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================
          ¿PARA QUIÉN ES YOL-NÁ? (imagen circular + panel verde sutil)
         ============================== */}
      <section className="py-0">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            {/* izquierda: imagen circular (placeholder) */}
            <div className="flex justify-center md:justify-start p-6">
              <div className="relative">
                <div className="w-56 h-56 rounded-full bg-[#d2eed3] p-3 flex items-center justify-center shadow-lg">
                  <div className="w-full h-full rounded-full border-6 border-[#00461f] overflow-hidden">
                    <img
                      src="ruta-de-tu-imagen-para-quien.jpg"
                      alt="agricultor"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* pequeño decor en la esquina superior derecha (opcional) */}
                </div>
              </div>
            </div>

            {/* derecha: panel con fondo verde suave hacia oscuro (puedes quitar la imagen de fondo si no la usas) */}
            <div
              className="p-8 md:p-12 text-white"
              style={{
                background:
                  "linear-gradient(90deg, rgba(210,238,211,1) 0%, rgba(49,138,29,0.12) 40%, rgba(0,70,31,0.88) 100%)",
              }}
            >
              <h3 className="text-2xl font-semibold mb-4">¿Para quién es Yol-Ná?</h3>
              <p className="max-w-xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Yol Ná está diseñado para quienes buscan cuidar sus cultivos con inteligencia, tecnología y conciencia ambiental.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================
          PÚBLICO OBJETIVO (4 tarjetas estilo maqueta)
         ============================== */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* tarjeta 1 */}
          <div className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition">
            <h4 className="text-sm text-[#318a1d] mb-4">Agricultores</h4>
            <div className="flex flex-col items-start md:items-center">
              <div className="mb-4">
                <div className="w-20 h-20 rounded-full bg-[#d2eed3] p-2 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full border-4 border-[#00461f] bg-white flex items-center justify-center">
                    <Users className="h-6 w-6 text-[#00461f]" />
                  </div>
                </div>
              </div>
              <p className="text-gray-600">Optimiza tu cosecha y reduce costos.</p>
            </div>
          </div>

          {/* tarjeta 2 */}
          <div className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition">
            <h4 className="text-sm text-[#318a1d] mb-4">Investigadores</h4>
            <div className="flex flex-col items-start md:items-center">
              <div className="mb-4">
                <div className="w-20 h-20 rounded-full bg-[#d2eed3] p-2 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full border-4 border-[#00461f] bg-white flex items-center justify-center">
                    <FlaskConical className="h-6 w-6 text-[#00461f]" />
                  </div>
                </div>
              </div>
              <p className="text-gray-600">Accede a datos precisos para tus estudios.</p>
            </div>
          </div>

          {/* tarjeta 3 */}
          <div className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition">
            <h4 className="text-sm text-[#318a1d] mb-4">Amantes de la agricultura sustentable</h4>
            <div className="flex flex-col items-start md:items-center">
              <div className="mb-4">
                <div className="w-20 h-20 rounded-full bg-[#d2eed3] p-2 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full border-4 border-[#00461f] bg-white flex items-center justify-center">
                    <HeartHandshake className="h-6 w-6 text-[#00461f]" />
                  </div>
                </div>
              </div>
              <p className="text-gray-600">Logra cosechas abundantes.</p>
            </div>
          </div>

          {/* tarjeta 4 */}
          <div className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition">
            <h4 className="text-sm text-[#318a1d] mb-4">Escuelas</h4>
            <div className="flex flex-col items-start md:items-center">
              <div className="mb-4">
                <div className="w-20 h-20 rounded-full bg-[#d2eed3] p-2 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full border-4 border-[#00461f] bg-white flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-[#00461f]" />
                  </div>
                </div>
              </div>
              <p className="text-gray-600">Introduce la tecnología en el aprendizaje agrícola.</p>
            </div>
          </div>
        </div>
      </section>

      {/* frase final */}
      <section className="py-6 bg-white">
        <p className="text-center text-[#005726] italic">"Yol-ná. Corazón de la Tierra."</p>
      </section>
    </div>
  );
};
