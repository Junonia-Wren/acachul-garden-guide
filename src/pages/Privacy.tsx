import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Mail, Eye, Lock, FileText } from "lucide-react";

export const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center">
            <Shield className="h-8 w-8 mr-3 text-primary" />
            Aviso de Privacidad
          </h1>
          <p className="text-muted-foreground mt-2">
            Información sobre el tratamiento de tus datos personales
          </p>
        </div>

        <div className="space-y-6">
          {/* Información general */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                ¿Para qué fines recabamos y utilizamos tus datos personales?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
               Sus datos personales serán utilizados para las siguientes finalidades:
                - Proveer diagnóstico automatizado sobre el estado del Acachul.
                - Mostrar métricas reales sobre tu zona.
                - Enviar notificaciones al correo sobre eventos o recomendaciones.
                - Administrar su cuenta de usuario.
                - Mejorar la calidad y funcionalidad de la plataforma.
              </p>
            </CardContent>
          </Card>

          {/* Datos recopilados */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                ¿Qué datos recopilamos?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Datos de registro:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Nombre completo</li>
                    <li>Edad</li>
                    <li>Correo electrónico</li>
                    <li>Contraseña (almacenada de forma cifrada)</li>
                    <li>Ubicación</li>
                    
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Datos de uso del sistema:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Imágenes de plantas subidas para análisis</li>
                    <li>Descripciones del estado visual de las plantas</li>
                    <li>Valores de sensores (pH, humedad, niveles de luz)</li>
                    <li>Conversaciones con el chatbot</li>
                    <li>Historial de análisis y recomendaciones</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Datos técnicos:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Dirección IP</li>
                    <li>Tipo de navegador y sistema operativo</li>
                    <li>Fecha y hora de acceso</li>
                    <li>Páginas visitadas dentro del sistema</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Finalidad del uso */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="h-5 w-5 mr-2" />
                ¿Para qué utilizamos tus datos?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-primary-light rounded-lg">
                  <h4 className="font-medium text-primary mb-1">Análisis de plantas:</h4>
                  <p className="text-sm text-muted-foreground">
                    Procesamos las imágenes y datos de sensores para diagnosticar el estado 
                    de salud de tus plantas y generar recomendaciones personalizadas.
                  </p>
                </div>

                <div className="p-3 bg-accent/10 rounded-lg">
                  <h4 className="font-medium text-accent mb-1">Mejora del sistema:</h4>
                  <p className="text-sm text-muted-foreground">
                    Utilizamos los datos de forma agregada y anónima para mejorar nuestros 
                    algoritmos de detección y la precisión de las recomendaciones.
                  </p>
                </div>

                <div className="p-3 bg-success/10 rounded-lg">
                  <h4 className="font-medium text-success mb-1">Comunicación:</h4>
                  <p className="text-sm text-muted-foreground">
                    Enviamos notificaciones importantes sobre tu cuenta, actualizaciones 
                    del sistema y consejos relacionados con el cuidado de plantas.
                  </p>
                </div>

                <div className="p-3 bg-muted rounded-lg">
                  <h4 className="font-medium mb-1">Soporte técnico:</h4>
                  <p className="text-sm text-muted-foreground">
                    Para resolver problemas técnicos y responder a tus consultas sobre 
                    el funcionamiento del sistema.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* datos personales sensibles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Datos Personales sensibles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2 text-success">✅ Compromisos de seguridad:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Utilizamos cifrado SSL/TLS para proteger la transmisión de datos</li>
                    <li>Las contraseñas se almacenan con cifrado irreversible</li>
                    <li>Acceso limitado a personal autorizado únicamente</li>
                    <li>Copias de seguridad regulares y seguras</li>
                    <li>Monitoreo continuo de seguridad</li>
                  </ul>
                </div>

                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <h4 className="font-medium text-destructive mb-2">🔒 No compartimos tus datos</h4>
                  <p className="text-sm text-muted-foreground">
                    <strong>Nunca vendemos, alquilamos o compartimos</strong> tu información personal 
                    con terceros para fines comerciales. Tus datos permanecen confidenciales y 
                    se utilizan exclusivamente para los fines descritos en este aviso.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Derechos del usuario */}
          <Card>
            <CardHeader>
              <CardTitle>Tus Derechos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Derecho de acceso:</h4>
                  <p className="text-sm text-muted-foreground">
                    Solicitar información sobre qué datos tenemos de ti
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Derecho de rectificación:</h4>
                  <p className="text-sm text-muted-foreground">
                    Corregir o actualizar información incorrecta
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Derecho de eliminación:</h4>
                  <p className="text-sm text-muted-foreground">
                    Solicitar la eliminación de tu cuenta y datos
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Derecho de oposición:</h4>
                  <p className="text-sm text-muted-foreground">
                    Oponerte al procesamiento de tus datos
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contacto */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Contacto y Consultas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Si tienes preguntas sobre este aviso de privacidad o deseas ejercer 
                  alguno de tus derechos, puedes contactarnos:
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 bg-muted rounded-lg">
                    <h4 className="font-medium mb-1">Correo electrónico:</h4>
                    <p className="text-sm text-primary">privacidad@plantcarepro.com</p>
                  </div>

                  <div className="p-3 bg-muted rounded-lg">
                    <h4 className="font-medium mb-1">Tiempo de respuesta:</h4>
                    <p className="text-sm text-muted-foreground">Máximo 30 días hábiles</p>
                  </div>
                </div>

                <div className="p-4 bg-primary-light rounded-lg">
                  <p className="text-sm text-primary">
                    <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};