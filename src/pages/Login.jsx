import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Para poder saltar de página
import { AuthContext } from "../context/AuthContext";
import api from "../api/axiosConfig";
// Página de Login (Pública)
export default function Login() {
  // 1. Estados para controlar el formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 2. Herramientas de React Router y nuestro Contexto
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // 3. Función que gestiona el envío de datos
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    console.log("📤 Enviando credenciales:", { email, password }); // DEBUG

    try {
      // Llamada al Backend (Java)
      const response = await api.post("/auth/login", { email, password });

      console.log("✅ Respuesta del backend:", response.data); // DEBUG

      // Si Java responde bien, extraemos el Token y los datos del Usuario
      const { token, user } = response.data;

      // Guardamos la sesión en el navegador (vía AuthContext)
      login(token, user);

      // Redirigimos al área privada
      navigate("/pokedex");
    } catch (err) {
      console.error("❌ Error completo:", err); // DEBUG completo
      console.error("❌ Response data:", err.response?.data); // DEBUG: Mensaje del backend
      console.error("❌ Status:", err.response?.status); // DEBUG: Código de error
      console.error("❌ Email enviado:", email); // DEBUG: Verificar qué email se envió
      console.error("❌ Password (length):", password?.length); // DEBUG: Verificar longitud contraseña

      setError("Credenciales incorrectas. Revisa tu email y contraseña.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border-t-8 border-red-600">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800">POKÉDEX</h2>
          <p className="text-gray-500 mt-2">¡Identifícate, Entrenador!</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2 uppercase tracking-wide">
              Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
              focus:outline-none focus:ring-red-500 focus:border-red-500 
              text-gray-900 font-medium placeholder-gray-400 bg-white"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2 uppercase tracking-wide">
              Contraseña
            </label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
              focus:outline-none focus:ring-red-500 focus:border-red-500 
              text-gray-900 font-medium placeholder-gray-400 bg-white"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 transform hover:scale-[1.02] transition duration-200 shadow-lg"
          >
            Acceder a mi Pokédex
          </button>
        </form>
      </div>
    </div>
  );
}
