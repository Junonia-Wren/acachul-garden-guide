import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Eye, EyeOff } from "lucide-react";
import { registerUser } from "@/services/auth";

export const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    city: "",
    email: "",
    password: "",
    acceptPrivacy: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.acceptPrivacy) {
      alert("Debes aceptar el aviso de privacidad para continuar");
      return;
    }

    setIsLoading(true);

    try {
      const user = {
        name: formData.name,
        age: Number(formData.age),
        email: formData.email,
        password: formData.password,
        city: formData.city
      };

      await registerUser(user);
      navigate("/login");
    } catch (error: unknown) {
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };

      console.error("Error al registrar:", axiosError);
      alert(axiosError.response?.data?.message || "Error en el registro");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? e.target.checked : value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-light to-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center space-x-2 mb-8">
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">Yol ná</span>
          </Link>
          <h2 className="text-3xl font-bold text-foreground">
            Crear Cuenta
          </h2>
          <p className="mt-2 text-muted-foreground">
            Únete a la comunidad de cuidadores de plantas
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Registro de Usuario</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Nombre completo</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tu nombre completo"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="age">Edad</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  min="1"
                  max="120"
                  required
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="25"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="city">Ubicación</Label>
                <Input
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Ciudad"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="acceptPrivacy"
                  checked={formData.acceptPrivacy}
                  onCheckedChange={(checked) =>
                    setFormData(prev => ({ ...prev, acceptPrivacy: checked as boolean }))
                  }
                />
                <Label
                  htmlFor="acceptPrivacy"
                  className="text-sm text-muted-foreground cursor-pointer"
                >
                  Acepto el{" "}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Aviso de privacidad
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !formData.acceptPrivacy}
              >
                {isLoading ? "Creando cuenta..." : "Registrarse"}
              </Button>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  ¿Ya tienes cuenta?{" "}
                  <Link to="/login" className="text-primary hover:underline">
                    Inicia sesión aquí
                  </Link>
                </p>
              </div>

              <div className="text-center mt-4 p-4 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">
                  Al registrarte, aceptas nuestro{" "}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Aviso de privacidad
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
