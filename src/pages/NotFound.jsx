import { Link } from "react-router-dom";
// Página personalizada para rutas no encontradas (404)
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-4">
      <span className="text-9xl font-extrabold text-red-200">404</span>
      <h2 className="text-3xl font-bold text-gray-800 -mt-10 mb-4">
        ¡Ruta bloqueada por un Snorlax!
      </h2>
      <p className="text-gray-500 mb-8 max-w-sm">
        Parece que el camino que buscas no existe o necesitas una PokéFlauta
        para pasar.
      </p>
      <Link to="/" className="btn btn-outline btn-error">
        Volver a la civilización
      </Link>
    </div>
  );
}
