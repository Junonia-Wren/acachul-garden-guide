import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, MessageSquare, User, LogOut, SquareKanban} from "lucide-react";
import { useAuth } from "@/context/AuthContext"; 

export const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth(); 

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">Yol ná</span>
            </Link>

            <nav className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-sm text-muted-foreground flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {user.name}
                  </span>

                  <Link to="/dashboard">
                    <Button variant={location.pathname === '/dashboard' ? 'default' : 'ghost'}>
                      <SquareKanban className="h-4 w-4 mr-2" />
                      Panel Principal
                    </Button>
                  </Link>

                  <Link to="/chatbot">
                    <Button variant={location.pathname === '/chatbot' ? 'default' : 'ghost'}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Asistente
                    </Button>
                  </Link>

                   <Link to="/info">
                    <Button variant={location.pathname === '/info' ? 'default' : 'ghost'}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Información
                    </Button>
                  </Link>

                  <Link to="/contac">
                    <Button variant={location.pathname === '/contac' ? 'default' : 'ghost'}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contacto
                    </Button>
                  </Link>

                  <Button variant="ghost" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Cerrar Sesión
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost">Iniciar Sesión</Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="default">Registrarse</Button>
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-muted mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 Yol Ná. Todos los derechos reservados.</p>
            <Link to="/privacy" className="text-primary hover:underline">
              Aviso de Privacidad
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
