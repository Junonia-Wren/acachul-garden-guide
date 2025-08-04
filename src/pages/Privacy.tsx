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
            Yol na, plataforma digital gestionada por “Violet”, con ubicación en Xicotepec de Juárez Puebla, México, es responsable del tratamiento de sus datos personales.
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
                  <h4 className="font-medium mb-2">Proporcionados directamente:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Nombre completo</li>
                    <li>Edad</li>
                    <li>Correo electrónico</li>
                    <li>Contraseña</li>
                    <li>Ubicación</li>
                    <li>Fotografías de plantas</li>
                    <li>Datos manuales de sensores (pH, humedad, temperatura, luz)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Sitio web o servicios en línea:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Dirección IP</li>
                    <li>Tipo de navegador</li>
                    <li>Actividad de navegación dentro de la plataforma</li>
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
                  <h4 className="font-medium text-primary mb-1">Finalidades descritas:</h4>
                  <p className="text-sm text-muted-foreground">
                    Los datos personales serán utilizados únicamente para las finalidades descritas en el presente aviso de privacidad y no serán divulgados ni compartidos con terceros sin su consentimiento expreso, salvo en los casos permitidos por la ley.
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
                  <h4 className="font-medium mb-2 text-success">✅ Datos sensibles recabados:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Nombre completo</li>
                    <li>Ubicación geográfica</li>
                    <li>Contraseña de acceso (en formato cifrado)</li>
                  </ul>
                </div>

                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <h4 className="font-medium text-destructive mb-2">🔒 Seguridad y confidencialidad</h4>
                  <p className="text-sm text-muted-foreground">
                    Nos comprometemos a implementar y mantener medidas administrativas, técnicas y físicas que garanticen la protección de estos datos contra daño, pérdida, alteración, destrucción o acceso no autorizado.
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
                  <h4 className="font-medium">Acceso:</h4>
                  <p className="text-sm text-muted-foreground">
                    Conocer qué datos personales tenemos de usted, para qué los usamos y las condiciones del uso que les damos.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Rectificación:</h4>
                  <p className="text-sm text-muted-foreground">
                    Solicitar la corrección de su información personal si está incorrecta, inexacta o incompleta.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Cancelación:</h4>
                  <p className="text-sm text-muted-foreground">
                    Pedir que eliminemos sus datos si considera que no están siendo usados conforme a la ley.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Oposición:</h4>
                  <p className="text-sm text-muted-foreground">
                    Oponerse al uso de sus datos personales para fines específicos.
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
                  Para cualquier duda, aclaración o solicitud relacionada con sus datos personales, puede comunicarse con:
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 bg-muted rounded-lg">
                    <h4 className="font-medium mb-1">Correo electrónico:</h4>
                    <p className="text-sm text-primary">220701@utxicotepec.edu.mx</p>
                  </div>

                  <div className="p-3 bg-muted rounded-lg">
                    <h4 className="font-medium mb-1">Correo para solicitudes ARCO:</h4>
                    <p className="text-sm text-muted-foreground">220483@utxicotepec.edu.mx</p>
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
