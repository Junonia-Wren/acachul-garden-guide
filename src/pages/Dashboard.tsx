import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Camera, BarChart3, BookOpen, Lightbulb } from "lucide-react";

export const Dashboard = () => {
  const [plantData, setPlantData] = useState({
    image: null as File | null,
    description: "",
    ph: "",
    humidity: "",
    light: ""
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPlantData(prev => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Plant analysis data:", plantData);
    // Aquí iría la lógica de análisis
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Panel de Administración</h1>
          <p className="text-muted-foreground mt-2">
            Analiza el estado de tus plantas y recibe recomendaciones personalizadas
          </p>
        </div>

        <Tabs defaultValue="analysis" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="analysis">Análisis</TabsTrigger>
            <TabsTrigger value="results">Resultados</TabsTrigger>
            <TabsTrigger value="catalog">Catálogo</TabsTrigger>
          </TabsList>

          <TabsContent value="analysis" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Formulario de análisis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Camera className="h-5 w-5 mr-2" />
                    Datos de la Planta
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="image">Imagen de la planta</Label>
                      <div className="mt-2">
                        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                          <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                          <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                          <Label htmlFor="image" className="cursor-pointer">
                            <span className="text-primary hover:underline">
                              Haz clic para subir una imagen
                            </span>
                            <p className="text-sm text-muted-foreground mt-1">
                              PNG, JPG hasta 10MB
                            </p>
                          </Label>
                        </div>
                        {plantData.image && (
                          <p className="text-sm text-success mt-2">
                            Archivo seleccionado: {plantData.image.name}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">Descripción del estado visual</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe lo que observas en la planta: color de las hojas, manchas, crecimiento, etc."
                        value={plantData.description}
                        onChange={(e) => setPlantData(prev => ({ ...prev, description: e.target.value }))}
                        className="mt-1"
                        rows={4}
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="ph">pH del suelo</Label>
                        <Input
                          id="ph"
                          type="number"
                          step="0.1"
                          min="0"
                          max="14"
                          placeholder="6.5"
                          value={plantData.ph}
                          onChange={(e) => setPlantData(prev => ({ ...prev, ph: e.target.value }))}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="humidity">Humedad (%)</Label>
                        <Input
                          id="humidity"
                          type="number"
                          min="0"
                          max="100"
                          placeholder="65"
                          value={plantData.humidity}
                          onChange={(e) => setPlantData(prev => ({ ...prev, humidity: e.target.value }))}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="light">Luz (lux)</Label>
                        <Input
                          id="light"
                          type="number"
                          min="0"
                          placeholder="2000"
                          value={plantData.light}
                          onChange={(e) => setPlantData(prev => ({ ...prev, light: e.target.value }))}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full">
                      Analizar Planta
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Vista previa de datos */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Resumen de Datos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">Estado de Sensores</h4>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">pH</p>
                          <p className="font-medium">{plantData.ph || "--"}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Humedad</p>
                          <p className="font-medium">{plantData.humidity ? `${plantData.humidity}%` : "--"}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Luz</p>
                          <p className="font-medium">{plantData.light ? `${plantData.light} lux` : "--"}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-primary-light rounded-lg">
                      <h4 className="font-medium mb-2">Estado de la Imagen</h4>
                      <p className="text-sm text-muted-foreground">
                        {plantData.image ? 
                          "✅ Imagen cargada correctamente" : 
                          "⏳ Esperando imagen de la planta"}
                      </p>
                    </div>

                    <div className="p-4 bg-accent/10 rounded-lg">
                      <h4 className="font-medium mb-2">Descripción</h4>
                      <p className="text-sm text-muted-foreground">
                        {plantData.description || "Sin descripción proporcionada"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2" />
                  Resultados y Recomendaciones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No hay resultados disponibles</h3>
                  <p className="text-muted-foreground">
                    Primero analiza una planta en la pestaña "Análisis" para ver los resultados aquí
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="catalog" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Catálogo Visual - Estados del Acachul
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Placeholder para estados comunes */}
                  {[
                    { name: "Planta Saludable", status: "success", description: "Hojas verdes, sin manchas" },
                    { name: "Falta de Agua", status: "warning", description: "Hojas marchitas, suelo seco" },
                    { name: "Exceso de Humedad", status: "error", description: "Manchas marrones, hongos" },
                    { name: "Deficiencia Nutricional", status: "warning", description: "Hojas amarillentas" },
                    { name: "Plagas", status: "error", description: "Insectos visibles, daños en hojas" },
                    { name: "Quemadura Solar", status: "warning", description: "Bordes secos, decoloración" }
                  ].map((item, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center">
                          <Camera className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h4 className="font-medium mb-1">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                        <div className={`mt-2 inline-block px-2 py-1 rounded text-xs ${
                          item.status === 'success' ? 'bg-success/10 text-success' :
                          item.status === 'warning' ? 'bg-warning/10 text-warning' :
                          'bg-destructive/10 text-destructive'
                        }`}>
                          {item.status === 'success' ? 'Saludable' :
                           item.status === 'warning' ? 'Atención' : 'Problema'}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};