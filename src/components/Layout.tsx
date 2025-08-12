import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, MessageSquare, User, LogOut, SquareKanban} from "lucide-react";
import { useAuth } from "@/context/AuthContext"; 
import LogoH from "../assets/LogoH.png";
import LogoSF from "../assets/LogoSF.png";


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
            <img src={LogoH} alt="Logo Yol Ná" className="h-12 w-auto" />
            {/* Si no quieres texto, elimina el span */}
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

  <footer className="bg-[#164F4E] text-white mt-auto">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
    
    {/* Columna 1: Logo y descripción */}
    <div>
<div className="flex items-center mb-4 space-x-4">
  <img
    src={LogoSF}
    alt="Logo Yol Ná Footer"
    className="h-32 w-auto"
  />
  <span className="text-3xl text-white select-none">Yolná</span>
</div>


      <p className="text-sm text-gray-300 mb-4">
        Yolná es un espacio para cuidar y aprender sobre el acachul y otras plantas nativas. Cuidemos lo que nace de nuestra tierra.
      </p>
      <div className="flex space-x-4">
        <a href="#" className="hover:text-primary"><i className="fab fa-twitter"></i></a>
        <a href="#" className="hover:text-primary"><i className="fab fa-facebook"></i></a>
        <a href="#" className="hover:text-primary"><i className="fab fa-pinterest"></i></a>
        <a href="#" className="hover:text-primary"><i className="fab fa-instagram"></i></a>
      </div>
    </div>

    {/* Columna 2: Explora */}
    <div>
      <h3 className="text-lg font-semibold mb-4 border-b-2 border-primary inline-block">Explora</h3>
      <ul className="space-y-2 text-gray-300">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/chatbot">Asistente</Link></li>
        <li><Link to="/about">Nosotros</Link></li>
        <li><Link to="/info">Información</Link></li>
        <li><Link to="/contact">Contacto</Link></li>
        <li><Link to="/form">Formulario</Link></li>
      </ul>
    </div>

    {/* Columna 3: Noticias */}
    <div>
      <h3 className="text-lg font-semibold mb-4 border-b-2 border-primary inline-block">Noticias</h3>
      <div className="space-y-4">
        <div>
          <a href="#" className="text-white font-medium hover:text-primary">Bringing Food Production Back To Cities</a>
          <p className="text-xs text-gray-400">July 5, 2022</p>
        </div>
        <div>
          <a href="#" className="text-white font-medium hover:text-primary">The Future of Farming, Smart Irrigation Solutions</a>
          <p className="text-xs text-gray-400">July 5, 2022</p>
        </div>
      </div>
    </div>

    {/* Columna 4: Contacto */}
    <div>
      <h3 className="text-lg font-semibold mb-4 border-b-2 border-primary inline-block">Contacto</h3>
      <ul className="space-y-3 text-gray-300 text-sm">
      
        <li className="flex items-center">
          <i className="fas fa-envelope mr-2 text-primary"></i> yolna.proyecto@gmail.com
        </li>
        <li className="flex items-center">
          <i className="fas fa-map-marker-alt mr-2 text-primary"></i> Xicotepec de Juárez, Puebla. 
        </li>
      </ul>
      <form className="mt-4 flex">
        <input
          type="email"
          placeholder="Your Email Address"
          className="w-full px-3 py-2 text-gray-800 rounded-l-md focus:outline-none"
        />
        <button className="bg-primary px-4 py-2 rounded-r-md hover:bg-primary/80">
          <i className="fas fa-paper-plane text-white"></i>
        </button>
      </form>
    </div>
  </div>

  {/* Línea inferior */}
  <div className="bg-[#000000] text-center py-4 text-sm text-gray-400">
    &copy; 2024 Yol Ná. Todos los derechos reservados. 
    <Link to="/privacy" className="text-primary hover:underline ml-2">Aviso de Privacidad</Link>
  </div>
</footer>

    </div>
  );
};
