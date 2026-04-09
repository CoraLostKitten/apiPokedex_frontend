import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    /* Usamos clases de DaisyUI (navbar, btn, etc.) */
    <div className="navbar bg-red-600 text-white shadow-lg px-4 md:px-10 sticky top-0 z-50">
      <div className="flex-1">
        <Link to="/" className="text-xl font-bold tracking-tighter uppercase">
          Poké<span className="text-yellow-400">dex</span> Pro
        </Link>
      </div>

      <div className="flex-none gap-2">
        {/* Lógica condicional: ¿Hay usuario? */}
        {user ? (
          <>
            <div className="flex items-center gap-3">
              {/* Badge de la biblioteca para el email */}
              <span className="badge badge-ghost border-white text-white p-3">
                {user.email}
              </span>

              <Link to="/pokedex" className="btn btn-ghost btn-sm text-white">
                Mi Equipo
              </Link>

              <button
                onClick={handleLogout}
                className="btn btn-sm btn-outline text-white border-white hover:bg-white hover:text-red-600"
              >
                Cerrar Sesión
              </button>
            </div>
          </>
        ) : (
          /* Si no hay usuario, mostramos el botón de ir al Login */
          <Link
            to="/login"
            className="btn btn-sm bg-white text-red-600 border-none font-bold"
          >
            Identificarse
          </Link>
        )}
      </div>
    </div>
  );
}
