import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// Este componente envuelve a las páginas privadas.
// Si hay usuario, deja pasar (children).
// Si no hay usuario, te manda al login.
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  // Mientras comprueba si hay token en el localStorage, no hacemos nada
  if (loading)
    return <div className="p-10 text-center">Cargando sesión...</div>;

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
