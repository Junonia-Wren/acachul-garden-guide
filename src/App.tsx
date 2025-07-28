import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { Chatbot } from "./pages/Chatbot";
import { Privacy } from "./pages/Privacy";
import NotFound from "./pages/NotFound";

import { PrivateRoute } from "./components/PrivateRoute"; 
import { useAuth } from "@/context/AuthContext"; // Opcional si usas para algo aquí o para públicas

const queryClient = new QueryClient();

const App = () => {
  // Ya no necesitas este estado local para autenticación
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const handleLogout = () => setIsAuthenticated(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Rutas públicas dentro del layout */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="privacy" element={<Privacy />} />

              {/* Rutas privadas protegidas */}
              <Route element={<PrivateRoute />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="chatbot" element={<Chatbot />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
