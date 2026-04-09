import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";

// 1. Importación de Páginas (Asegúrate de que los archivos existan en src/pages/)
import Home from "./pages/Home";
import Login from "./pages/Login";
import Pokedex from "./pages/Pokedex";
import AddPokemon from "./pages/AddPokemon";
import EditPokemon from "./pages/EditPokemon"; // <-- Tu nueva importación
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    /* Proveedor de autenticación para que toda la app sepa si estamos logueados */
    <AuthProvider>
      <Router>
        {/* El Navbar se pone fuera de <Routes> para que sea visible en TODAS las páginas */}
        <Navbar />

        {/* Contenedor principal con un poco de estilo base */}
        <main className="min-h-screen bg-gray-50">
          <Routes>
            {/* --- RUTAS PÚBLICAS --- */}
            {/* Página de inicio (Requisito 1: Inicio pública) */}
            <Route path="/" element={<Home />} />

            {/* Página de Login (Requisito 2: Login) */}
            <Route path="/login" element={<Login />} />

            {/* --- RUTAS PRIVADAS (Protegidas por PrivateRoute) --- */}
            {/* Listado de Pokémon (Requisito 3: Página privada 1) */}
            <Route
              path="/pokedex"
              element={
                <PrivateRoute>
                  <Pokedex />
                </PrivateRoute>
              }
            />

            {/* Formulario de añadir (Requisito 4: Página privada 2) */}
            <Route
              path="/pokedex/add"
              element={
                <PrivateRoute>
                  <AddPokemon />
                </PrivateRoute>
              }
            />

            {/* ✏️ NUEVA RUTA: Formulario de Editar */}
            <Route
              path="/pokedex/edit/:id"
              element={
                <PrivateRoute>
                  <EditPokemon />
                </PrivateRoute>
              }
            />

            {/* --- RUTA 404 --- */}
            {/* Cualquier otra ruta mostrará esta página (Requisito 5: Página 404) */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}
