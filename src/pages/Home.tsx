import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Camera, BarChart3, MessageSquare } from "lucide-react";

export const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-light to-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Comienza tu guía 
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

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Características principales
            </h2>
            <p className="text-xl text-muted-foreground">
              Todo lo que necesitas para el cuidado óptimo de tus plantas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Camera className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Análisis por Imagen</h3>
                <p className="text-muted-foreground">
                  Sube fotos de tus plantas para diagnóstico automático
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <BarChart3 className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Monitoreo de Sensores</h3>
                <p className="text-muted-foreground">
                  Registra pH, humedad y niveles de luz en tiempo real
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <MessageSquare className="h-12 w-12 text-info mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Asistente Virtual</h3>
                <p className="text-muted-foreground">
                  Chatbot especializado para resolver dudas sobre cuidado
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Leaf className="h-12 w-12 text-success mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Recomendaciones</h3>
                <p className="text-muted-foreground">
                  Sugerencias personalizadas basadas en IA
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para mejorar el cuidado de tus plantas?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Únete a Yol ná y transforma la manera en que cuidas tus plantas
          </p>
          <Link to="/register">
            <Button size="lg" variant="secondary">
              Registrarse Gratis
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};