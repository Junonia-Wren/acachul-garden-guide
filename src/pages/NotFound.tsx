import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-muted-foreground">404</h1>
        <h2 className="text-2xl font-semibold mb-4 text-foreground">Página no encontrada</h2>
        <p className="text-xl text-muted-foreground mb-8">
          La página que buscas no existe o ha sido movida
        </p>
        <Link to="/">
          <Button>
            <Home className="h-4 w-4 mr-2" />
            Volver al Inicio
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
