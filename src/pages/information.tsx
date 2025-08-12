import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Camera, BarChart3, MessageSquare } from "lucide-react";

import React, { useState } from "react";

// Componente FAQ Accordion separado
type FAQItem = {
  pregunta: string;
  respuesta: string;
};

type FAQAccordionProps = {
  faqs: FAQItem[];
};

const FAQAccordion: React.FC<FAQAccordionProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="bg-white p-4 rounded-xl shadow-md text-left cursor-pointer"
          onClick={() => toggleFAQ(i)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggleFAQ(i);
            }
          }}
          role="button"
          tabIndex={0}
          aria-expanded={openIndex === i}
          aria-controls={`faq-answer-${i}`}
          id={`faq-question-${i}`}
        >
          <p className="font-bold text-green-700 flex justify-between items-center">
            {faq.pregunta}
            <span className="ml-2">{openIndex === i ? "−" : "+"}</span>
          </p>
          {openIndex === i && (
            <p
              className="text-gray-600 mt-2"
              id={`faq-answer-${i}`}
              aria-labelledby={`faq-question-${i}`}
            >
              {faq.respuesta}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export const Information = () => {
  // Estado para el modal de la imagen
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (imageSrc: string) => {
    setModalImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalImage(null);
    setIsModalOpen(false);
  };

  const faqs: FAQItem[] = [
    {
      pregunta: "¿Quién puede usar Yolná?",
      respuesta:
        "Cualquier persona interesada en monitorear y cuidar su planta de acachul puede usar Yolná, desde agricultores hasta aficionados y comunidades locales.",
    },
    {
      pregunta: "¿Cómo puedo subir una foto de mi planta?",
      respuesta:
        " Puedes subir una foto directamente desde la sección de monitoreo en la aplicación o página web, simplemente selecciona la opción 'Subir imagen' y elige una foto clara y nítida de tu planta..",
    },
    {
      pregunta: "¿Yolná tiene algún costo?",
      respuesta: "El servicio básico de Yolná es gratuito.",
    },
    {
      pregunta: "¿Qué tipo de información recibe el usuario tras subir una foto?",
      respuesta:
        "Tras subir la imagen, Yolná analiza la salud de la planta usando inteligencia artificial y proporciona un diagnóstico detallado junto con recomendaciones personalizadas para su cuidado.",
    },
    {
      pregunta: "¿Cómo protege Yolná mis datos personales y las imágenes que subo?",
      respuesta:
        "Yolná cumple con las normas de privacidad y seguridad, garantizando que tus datos y fotos sean usados únicamente para el monitoreo y no serán compartidos con terceros sin tu consentimiento.",
    },
  ];

  const upcomingFeatures = [
    {
      step: "Paso 1",
      text: "Descarga la aplicación",
      image: "/Imagenes/1.png", 
    },
    {
      step: "Paso 2",
      text: "Registra tu planta",
      image: "/Imagenes/16.jpg", 
    },
    {
      step: "Paso 3",
      text: "Monitorea en tiempo real",
      image: "/Imagenes/3.png", 
    },
  ];

  return (
    <div className="min-h-screen font-sans bg-gray-100">
      <section
        className="relative h-80 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "url('/Imagenes/4.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-widest">
            INFORMACIÓN
          </h1>
        </div>
      </section>

      {/* --- Aquí los recuadros con enlaces --- */}
      <section className="relative z-20 -mt-20 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href="#acachul-sano"
            className="bg-green-50 rounded-2xl p-4 flex flex-col items-center text-center cursor-pointer hover:shadow-xl transition"
          >
            <p className="text-lg font-medium text-gray-700 mb-6">
              ¿Cómo saber si tu acachul está sano?
            </p>
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-green-600">
              <img
                src="/Imagenes/10.png"
                alt="Acachul sano"
                className="w-full h-full object-cover"
              />
            </div>
          </a>

          <a
            href="#como-tomar-foto"
            className="bg-green-50 rounded-2xl p-4 flex flex-col items-center text-center cursor-pointer hover:shadow-xl transition"
          >
            <p className="text-lg font-medium text-gray-700 mb-6">
              ¿Cómo tomar una buena foto?
            </p>
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-green-600">
              <img
                src="/Imagenes/16.jpg"
                alt="Tomar foto"
                className="w-full h-full object-cover"
              />
            </div>
          </a>

          <a
            href="#guia-cuidados"
            className="bg-green-50 rounded-2xl p-4 flex flex-col items-center text-center cursor-pointer hover:shadow-xl transition"
          >
            <p className="text-lg font-medium text-gray-700 mb-6">
              Guía básica de cuidados
            </p>
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-green-600">
              <img
                src="/Imagenes/4.jpeg"
                alt="Guía de cuidados"
                className="w-full h-full object-cover"
              />
            </div>
          </a>
        </div>
      </section>


<section
        id="acachul-sano"
        className="bg-gray-100 py-16 text-center px-4"
      >
        <h2 className="text-4xl font-bold mb-4 text-gray-800">¿Cómo saber si tu Acachul esta sano?</h2>
        <p className="max-w-xl mx-auto text-gray-600 text-justify">
            El acachul es una planta silvestre de gran importancia ecológica y cultural. Nuestro sistema permite conocer más sobre su estado y cuidado. El acachul es una planta silvestre nativa que desempeña un papel fundamental en los ecosistemas locales, aportando alimento y refugio a diversas especies. Su importancia cultural radica en su uso tradicional por comunidades indígenas para medicinas, rituales y preparaciones gastronómicas que forman parte de su identidad. Además, sus frutos, ricos en nutrientes y antioxidantes, no solo son un recurso alimenticio valioso, sino también un elemento que conecta a las personas con su entorno natural. Conocer y proteger el acachul es contribuir a la conservación de la biodiversidad y al fortalecimiento de las tradiciones que lo han mantenido vivo por generaciones.
        </p>
        <p className="max-w-xl mx-auto text-gray-600 text-left mt-4 mb-4">
            Para saber si tu acachul está sano, observa las siguientes señales:
        </p>

        {/* Contenedor para imágenes al estilo de la primera captura */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="bg-green-100 rounded-2xl border border-gray-200 p-4 flex flex-col items-center text-center">
                <p className="text-lg font-medium text-gray-700 mb-6">
                    Hojas verdes y vibrantes
                </p>
                <div className="w-28 h-28 rounded-full overflow-hidden mb-4">
                    <img src="/Imagenes/1.jpeg" alt="Hojas verdes" className="w-full h-full object-cover" />
                </div>
            </div>

            <div className="bg-green-100 rounded-2xl border border-gray-200 p-4 flex flex-col items-center text-center">
                <p className="text-lg font-medium text-gray-700 mb-6">
                    Tallo fuerte y sin manchas
                </p>
                <div className="w-28 h-28 rounded-full overflow-hidden mb-4">
                    <img src="/Imagenes/10.png" alt="Tallo sano" className="w-full h-full object-cover" />
                </div>
            </div>

            <div className="bg-green-100 rounded-2xl border border-gray-200 p-4 flex flex-col items-center text-center">
                <p className="text-lg font-medium text-gray-700 mb-6">
                    Presencia de flores y frutos
                </p>
                <div className="w-28 h-28 rounded-full overflow-hidden mb-4">
                    <img src="/Imagenes/6.png" alt="Flores y frutos" className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
      </section>




{/* --- Sección de Instrucciones en Formato de Tarjetas (Mejorado) --- */}
<section id="como-tomar-foto" className="py-16 bg-white px-4">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-4xl font-bold text-green-600 mb-4 text-center">Instrucciones para un análisis preciso</h2>
    <p className="mb-12 text-gray-700 text-lg leading-relaxed text-center">
      Para obtener un diagnóstico acertado de la salud de tu planta, sigue estos pasos:
    </p>

    <div className="flex flex-col md:flex-row justify-center items-stretch space-y-8 md:space-y-0 md:space-x-8">
      {/* Tarjeta 1 */}
      <div className="flex-1 max-w-sm bg-gray-100 rounded-lg shadow-lg p-4 flex flex-col items-center text-center">
        <div className="w-full h-48 overflow-hidden rounded-md mb-4">
          <img
            src="/Imagenes/f1.png"
            alt="Paso 1: Sube una foto de la planta"
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="font-semibold text-xl text-green-500 mb-2">Paso 1</h3>
        <p className="text-gray-700 text-base">Dirígete al apartado de análisis para verificar la salud de tu planta.</p>
      </div>

      {/* Tarjeta 2 */}
      <div className="flex-1 max-w-sm bg-gray-100 rounded-lg shadow-lg p-4 flex flex-col items-center text-center">
        <div className="w-full h-48 overflow-hidden rounded-md mb-4">
          <img
            src="/Imagenes/f2.png"
            alt="Paso 2: Toma una fotografía de una hoja"
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="font-semibold text-xl text-green-500 mb-2">Paso 2</h3>
        <p className="text-gray-700 text-base">Toma una fotografía enfocando una hoja. (De preferencia coloca una hoja de color blanco debajo para obtener un mejor análisis).</p>
      </div>

      {/* Tarjeta 3 */}
      <div className="flex-1 max-w-sm bg-gray-100 rounded-lg shadow-lg p-4 flex flex-col items-center text-center">
        <div className="w-full h-48 overflow-hidden rounded-md mb-4">
          <img
            src="/Imagenes/f3.png"
            alt="Paso 3: Toma los datos de la tierra"
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="font-semibold text-xl text-green-500 mb-2">Paso 3</h3>
        <p className="text-gray-700 text-base">Tomar los datos de la tierra requeridos (Ph, Humedad, Luz). Ejemplo, ocupa el sensor 4 en 1.</p>
      </div>
      
      {/* Tarjeta 4 */}
      <div className="flex-1 max-w-sm bg-gray-100 rounded-lg shadow-lg p-4 flex flex-col items-center text-center">
        <div className="w-full h-48 overflow-hidden rounded-md mb-4">
          <img
            src="/Imagenes/f4.png"
            alt="Paso 4: Sube la foto y los datos"
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="font-semibold text-xl text-green-500 mb-2">Paso 4</h3>
        <p className="text-gray-700 text-base">En la página, sube la fotografía y coloca en su apartado los datos recabados.</p>
      </div>
      
      {/* Tarjeta 5 */}
      <div className="flex-1 max-w-sm bg-gray-100 rounded-lg shadow-lg p-4 flex flex-col items-center text-center">
        <div className="w-full h-48 overflow-hidden rounded-md mb-4">
          <img
            src="/Imagenes/f5.png"
            alt="Paso 5: Observa los resultados del análisis"
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="font-semibold text-xl text-green-500 mb-2">Paso 5</h3>
        <p className="text-gray-700 text-base">Una vez rellenados todos los apartados, podrás observar la salud de tu planta.</p>
      </div>

    </div>
  </div>
</section>






<section id="guia-cuidados" className="py-16 bg-gradient-to-b from-green-50 to-white px-4">
  <div className="max-w-4xl mx-auto text-center mb-12">
    <h2 className="text-3xl font-bold text-green-800 mb-4">
      Guía básica de cuidados del Acachul
    </h2>
    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
      El acachul es una planta silvestre de gran valor ecológico y cultural. 
      Con los cuidados adecuados, podrás mantenerla saludable, 
      floreciente y lista para brindar alimento y refugio a diversas especies.
    </p>
  </div>

  <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    {/* Paso 1 */}
    <div className="bg-white border border-green-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
      <img src="/Imagenes/19.png" alt="Riego" className="w-20 h-20 mb-4" />
      <h3 className="font-semibold text-lg text-green-700 mb-2">Riego adecuado</h3>
      <p className="text-gray-700 text-sm mb-2">
        Mantén la tierra húmeda pero no encharcada. Riega moderadamente,
        especialmente en temporada seca.
      </p>
      <span className="text-green-600 text-xs italic">
        Consejo: Revisa la humedad tocando la tierra antes de regar.
      </span>
    </div>

    {/* Paso 2 */}
    <div className="bg-white border border-green-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
      <img src="/Imagenes/9.jpeg" alt="Luz solar" className="w-20 h-20 mb-4" />
      <h3 className="font-semibold text-lg text-green-700 mb-2">Luz indirecta</h3>
      <p className="text-gray-700 text-sm mb-2">
        Coloca el acachul en un lugar con luz indirecta o sombra parcial para
        evitar que sus hojas se quemen.
      </p>
      <span className="text-green-600 text-xs italic">
        Tip: Evita exposición directa durante el mediodía.
      </span>
    </div>

    {/* Paso 3 */}
    <div className="bg-white border border-green-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
      <img src="/Imagenes/4.jpeg" alt="Sustrato" className="w-20 h-20 mb-4" />
      <h3 className="font-semibold text-lg text-green-700 mb-2">Sustrato y fertilización</h3>
      <p className="text-gray-700 text-sm mb-2">
        Usa un sustrato bien drenado y fertiliza cada 2-3 meses con abono
        orgánico para promover un buen crecimiento.
      </p>
      <span className="text-green-600 text-xs italic">
        Recomendación: Evita fertilizantes químicos muy fuertes.
      </span>
    </div>
  </div>

  <div className="mt-12 text-center">
    <p className="text-sm text-gray-600 italic max-w-lg mx-auto">
      🌱 Recuerda que cada planta es única. Observa su comportamiento y adapta los cuidados 
      según el clima y las condiciones de tu entorno.
    </p>
  </div>
</section>
<section className="py-12 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-10"><span className="text-black">Todo sobre el </span><span className="text-green-600">acachul</span></h2>

        <div className="grid grid-cols-3 gap-1 max-w-4xl mx-auto px-4">
          {[
            "/Imagenes/8.jpeg",
            "/Imagenes/2.jpeg",
            "/Imagenes/15.png",
            "/Imagenes/9.png",
            "/Imagenes/17.png",
            "/Imagenes/8.png",
            
          ].map((src, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-md"
              style={{ aspectRatio: "3 / 4", width: "90%" }}
            >
              <img
                src={src}
                alt={`Acachul ${i + 1}`}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          ))}
        </div>
      </section>





      {/* Sección de información sobre el acachul - texto en dos columnas */}
      <section className="py-16 bg-white px-4 text-gray-700">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-green-600 mb-8 text-center">¿Qué es el Acachul?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg leading-relaxed text-justify">
            <p>
El acachul (Ardisia compressa) es un arbusto o pequeño árbol nativo de México y Centroamérica, muy apreciado por sus frutos de color rojo intenso y sabor agridulce. Crece principalmente en zonas montañosas y templadas, desde Veracruz, Puebla, Hidalgo y Oaxaca, hasta regiones de Chiapas y Guatemala. Suele encontrarse en altitudes entre 800 y 2,000 metros sobre el nivel del mar, en bosques mesófilos de montaña, bosques de pino-encino y zonas con humedad moderada. La planta alcanza entre 1.5 y 4 metros de altura, con hojas alargadas y brillantes, y flores pequeñas de tono blanquecino o rosado que aparecen en racimos. Sus frutos, que maduran generalmente entre agosto y octubre, son bayas redondas de unos 5 a 8 milímetros de diámetro, muy atractivas para aves y polinizadores.

Es una planta resistente, pero su conservación está amenazada por la deforestación y el cambio de uso de suelo.            </p>
            <p>
Por ello, en los últimos años se han impulsado proyectos de cultivo controlado y reforestación para preservar la especie y fomentar su aprovechamiento sustentable. El acachul también posee un potencial económico importante, ya que puede cultivarse para la venta de frutos, la elaboración de productos artesanales y el ecoturismo enfocado en plantas nativas.El acachul no solo es apreciado por su sabor y versatilidad, sino también por su relevancia cultural y su potencial económico en comunidades rurales.En muchas comunidades, la temporada de recolección del acachul se convierte en un evento social y económico, donde familias enteras participan en la cosecha y posterior preparación de productos derivados. Este trabajo colectivo no solo fortalece la economía local, sino que también preserva conocimientos tradicionales sobre el manejo y aprovechamiento de la planta. </p>
          </div>
        </div>
      </section>

      


{/* --- SECCIÓN: Importancia del Acachul en la Naturaleza --- */}
      <section id="importancia-acachul" className="py-16 bg-white px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-gray-700 text-lg leading-relaxed text-justify">
            <h2 className="text-4xl font-bold text-green-600 mb-4">Importancia del Acachul</h2>
            <p className="mb-4">
              La importancia del acachul radica en su valor ecológico, cultural, medicinal y económico para las comunidades donde crece. En el ámbito ecológico, esta planta contribuye a la biodiversidad, ya que sirve de alimento para diversas especies de insectos, aves y mamíferos, ayudando a mantener el equilibrio de los ecosistemas. Además, sus raíces fortalecen el suelo y previenen la erosión en zonas montañosas o con pendiente.
            </p>
            <p>
              Desde el punto de vista cultural, el acachul forma parte de la tradición gastronómica y medicinal de varias regiones de México y Centroamérica. Durante generaciones, ha sido utilizado para preparar infusiones, postres y bebidas fermentadas, además de emplearse en remedios naturales contra problemas digestivos y respiratorios.
            </p>
            <p>
              En el aspecto económico, representa una fuente de ingreso para pequeños productores y recolectores locales, ya que su venta en mercados y ferias artesanales es una actividad que promueve el comercio justo y la producción sustentable. Asimismo, su cultivo y recolección fomentan el turismo rural y el interés por las plantas nativas.
            </p>
          </div>
          <div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="/Imagenes/9.jpeg"
                alt="Acachul en su hábitat natural"
                className="w-full h-full object-cover"
              />
              
            </div>
            
            <p className="mt-2 text-sm text-gray-500 text-center">
              Acachul en su hábitat natural
            </p>
          </div>
        </div>
      </section>
      {/* --- FIN SECCIÓN --- */}





{/* --- SECCIÓN: Tecnología para el Acachul --- */}
      <section id="tecnologia-acachul" className="py-16 bg-green-50 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="/Imagenes/24.png"
                alt="Agricultor usando tecnología para monitorear su cultivo"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-2 text-sm text-gray-500 text-center">
              Agricultor usando tecnología para monitorear su cultivo
            </p>
          </div>
          <div className="text-gray-700 text-lg leading-relaxed text-justify">
            <h2 className="text-4xl font-bold text-green-600 mb-4">Tecnología para el Acachul</h2>
            <p className="mb-4">
              La integración de la tecnología en la agricultura tradicional es clave para optimizar el cultivo del acachul. Herramientas digitales, como la aplicación Yolná, permiten a los pequeños agricultores monitorear la salud de sus plantas de manera precisa y oportuna. Esto no solo mejora la productividad, sino que también fomenta prácticas agrícolas más sostenibles.
            </p>
            <p>
              Mediante el análisis de imágenes, los agricultores pueden identificar plagas o deficiencias nutricionales de forma temprana, recibiendo recomendaciones personalizadas que se adaptan a las condiciones específicas de su cultivo. La tecnología se convierte en un aliado que democratiza el acceso a la información y el conocimiento agronómico, empoderando a las comunidades rurales.
            </p>
          </div>
        </div>
      </section>
      {/* --- FIN DE LA  SECCIÓN --- */}


  

      
{/* --- SECCIÓN: Valores de Yolná --- */}
      <section className="py-16 bg-white px-4 text-gray-700 text-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-green-600 mb-4">¡En Yolná, esto es lo que nos mueve!</h2>
          <p className="max-w-xl mx-auto text-lg leading-relaxed mb-8">
            Los valores de Yolná representan aquello en lo que creemos y cómo elegimos desarrollar nuestra actividad. Son los principios que rigen todo lo que hacemos.
          </p>
          <button className="bg-green-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-green-700 transition duration-300">
            Únete a Yolná
          </button>
        </div>
      </section>
      {/* --- FIN DE LA  SECCIÓN --- */}

      
      {/* Aquí insertamos el acordeón FAQ */}
      <section className="bg-green-50 py-12 px-4">
        <h2 className="text-xl font-bold mb-8 text-center">Preguntas Frecuentes</h2>
        <FAQAccordion faqs={faqs} />
      </section>

     {/* Sección de "Próximamente en Yolná" actualizada e interactiva */}
      <section className="py-16 text-center bg-white">
        <h2 className="text-xl font-bold mb-10">Próximamente en Yolná</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          {upcomingFeatures.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl p-3 shadow-md bg-green-100 border border-gray-300 cursor-pointer transition hover:shadow-lg backdrop-blur-sm flex flex-col items-center"
              onClick={() => openModal(item.image)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openModal(item.image);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <div className="w-24 h-24 overflow-hidden mb-4 rounded-2xl">
                <img
                  src={item.image}
                  alt={item.text}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-lg mb-2">{item.step}</h3>
              <p className="text-gray-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>



      {/* Modal para mostrar la imagen grande */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div className="relative bg-white rounded-lg p-4 max-w-lg w-full" onClick={e => e.stopPropagation()}>
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-800 text-2xl font-bold p-2"
            >
              &times;
            </button>
            <img src={modalImage || ''} alt="Imagen en grande" className="w-full h-auto rounded-lg" />
          </div>
        </div>
      )}
    </div>
  );
};
