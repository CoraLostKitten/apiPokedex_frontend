import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    cargarPokemons();
  }, []);

  const cargarPokemons = async () => {
    try {
      const response = await api.get("/pokemon");
      const data = response.data.content || response.data;
      setPokemons(data);
    } catch (error) {
      console.error("Error cargando Pokémon:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (id, nombre) => {
    if (window.confirm(`¿Seguro que quieres liberar a ${nombre}?`)) {
      try {
        await api.delete(`/pokemon/${id}`);
        setPokemons(pokemons.filter((p) => p.id !== id));
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert(`Error al borrar el Pokémon: ${error.message}`);
      }
    }
  };

  if (loading)
    return <div className="p-10 text-center">Cargando equipo...</div>;

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-gray-800">CENTRO POKÉMON</h1>
        <button
          onClick={() => navigate("/pokedex/add")}
          className="btn btn-primary"
        >
          + Capturar Nuevo
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-xl">
        <table className="table w-full">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th>Nº Pokedex</th>
              <th>Nombre</th>
              <th>Tipos</th>
              <th>Nivel</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {pokemons.map((p) => (
              <tr key={p.id} className="hover">
                <td className="font-mono font-bold">#{p.numPokedex}</td>
                <td className="font-bold text-red-600">{p.nombre}</td>
                <td>
                  {p.tipos && p.tipos.length > 0 ? (
                    p.tipos.map((t, i) => (
                      <span
                        key={i}
                        className="badge badge-secondary badge-outline mr-1 text-xs uppercase"
                      >
                        {t.nombre}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 italic text-xs">
                      Sin tipo
                    </span>
                  )}
                </td>
                <td>Lvl {p.nivel}</td>
                <td className="flex justify-center gap-2">
                  <button
                    onClick={() => navigate(`/pokedex/edit/${p.id}`)}
                    className="btn btn-sm btn-circle btn-ghost text-info"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleEliminar(p.id, p.nombre)}
                    className="btn btn-sm btn-circle btn-ghost text-error"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
