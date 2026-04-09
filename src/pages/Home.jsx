import { Link } from "react-router-dom";
// Página de Inicio (Pública)
export default function Home() {
  return (
    <div className="hero min-h-screen bg-gray-100">
      <div className="hero-content text-center">
        <div className="max-w-md bg-white p-10 rounded-3xl shadow-2xl border-b-8 border-red-600">
          <h1 className="text-5xl font-black text-gray-800 mb-4">
            POKÉ<span className="text-red-600">DEX</span>
          </h1>
          <div className="w-20 h-20 bg-red-600 rounded-full mx-auto mb-6 border-8 border-gray-800 relative shadow-inner after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-6 after:h-6 after:bg-white after:rounded-full after:border-4 after:border-gray-800"></div>
          <p className="py-6 text-gray-600 text-lg">
            Bienvenido al Sistema de Gestión de Equipos. Registra tus capturas y
            organiza tu equipo como un profesional.
          </p>
          <Link
            to="/login"
            className="btn btn-error btn-wide text-white font-bold rounded-full"
          >
            Entrar como Entrenador
          </Link>
        </div>
      </div>
    </div>
  );
}
