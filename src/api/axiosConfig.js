/*Tu Frontend (React) y tu Backend (Java) son como dos personas en habitaciones distintas. Necesitan un teléfono para hablar.
Axios es ese teléfono. En lugar de escribir http://localhost:8080 en cada pantalla de tu proyecto,lo configuramos aquí una sola vez.
Además, le damos una regla automática: "Si tienes el Token de seguridad guardado, pégalo siempre en cada mensaje que envíes a Java". */
import axios from "axios";

// 1. Configuramos el número de teléfono de tu Backend
const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// 2. Interceptor: El "revisor" automático antes de enviar cualquier mensaje
api.interceptors.request.use((config) => {
  // Miramos si hay un token guardado en el navegador
  const token = localStorage.getItem("token");
  console.log("🔑 Token en localStorage:", token ? "✓ Existe" : "✗ No existe"); // DEBUG
  if (token) {
    // Si lo hay, lo pegamos en la cabecera (como exige Spring Security)
    config.headers.Authorization = `Bearer ${token}`;
    console.log(
      "📤 Cabecera Authorization enviada:",
      `Bearer ${token.substring(0, 20)}...`,
    ); // DEBUG
  } else {
    console.log("⚠️ Sin token - Petición sin autenticación"); // DEBUG
  }
  return config;
});

export default api;
