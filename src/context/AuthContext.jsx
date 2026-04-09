import { createContext, useState } from "react";

// Le decimos al "policía del código" (ESLint) que nos deje en paz con esta línea
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // TRUCO PRO: Le pasamos una función al useState.
  // Así React lee el localStorage solo la primera vez que carga la app.
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      return JSON.parse(userData); // Si hay datos, empezamos logueados
    }
    return null; // Si no, empezamos sin loguear
  });

  const login = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
