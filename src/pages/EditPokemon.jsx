import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axiosConfig";

export default function EditPokemon() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Estados del formulario
  const [nombre, setNombre] = useState("");
  const [numPokedex, setNumPokedex] = useState("");
  const [nivel, setNivel] = useState("");
  const [descripcion, setDescripcion] = useState("");

  // Estados para la lógica de Tipos
  const [tiposDisponibles, setTiposDisponibles] = useState([]);
  const [tiposSeleccionados, setTiposSeleccionados] = useState([]); // Guarda solo IDs [1, 2]

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // 1. Cargar datos al iniciar
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // Pedimos los tipos y el pokemon en paralelo
        const [resTipos, resPokemon] = await Promise.all([
          api.get("/pokemon/tipos"),
          api.get(`/pokemon/${id}`),
        ]);

        setTiposDisponibles(resTipos.data);

        const p = resPokemon.data;
        setNombre(p.nombre);
        setNumPokedex(p.numPokedex);
        setNivel(p.nivel);
        setDescripcion(p.descripcion);

        // Mapeamos los tipos que ya tiene para marcar los checkboxes
        if (p.tipos) {
          setTiposSeleccionados(p.tipos.map((t) => t.id));
        }
      } catch (err) {
        console.error("Error al cargar:", err);
        setError("No se pudieron cargar los datos del Pokémon.");
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, [id]);

  // 2. Manejar Checkboxes
  const handleCheckboxChange = (tipoId) => {
    setTiposSeleccionados((prev) =>
      prev.includes(tipoId)
        ? prev.filter((id) => id !== tipoId)
        : [...prev, tipoId],
    );
  };

  // 3. Enviar Formulario (PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const pokemonData = {
        nombre,
        numPokedex: parseInt(numPokedex),
        nivel: parseInt(nivel),
        descripcion,
        // Convertimos IDs [1, 2] -> [{id: 1}, {id: 2}] para Java
        tipos: tiposSeleccionados.map((tId) => ({ id: tId })),
      };

      await api.put(`/pokemon/${id}`, pokemonData);
      navigate("/pokedex");
    } catch (err) {
      console.error("Error al guardar:", err);
      setError("Error al guardar los cambios. Revisa los datos.");
    }
  };

  if (loading)
    return (
      <div className="p-10 text-center text-xl font-bold text-gray-600">
        Buscando datos en la Pokédex...
      </div>
    );

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-black text-gray-800 mb-8 text-center uppercase tracking-wider">
        ✏️ Editar Pokémon
      </h1>

      {error && (
        <div className="alert alert-error shadow-lg mb-6 border-2 border-red-200">
          <span className="font-bold text-white">{error}</span>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col gap-5 border border-gray-100"
      >
        {/* Nombre */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-bold text-gray-700">
              Nombre del Pokémon
            </span>
          </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="input input-bordered w-full focus:input-primary bg-white text-gray-800"
          />
        </div>

        {/* N Pokedex y Nivel */}
        <div className="flex gap-4">
          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text font-bold text-gray-700">
                Nº Pokedex
              </span>
            </label>
            <input
              type="number"
              value={numPokedex}
              onChange={(e) => setNumPokedex(e.target.value)}
              required
              className="input input-bordered w-full bg-white text-gray-800"
            />
          </div>
          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text font-bold text-gray-700">Nivel</span>
            </label>
            <input
              type="number"
              value={nivel}
              onChange={(e) => setNivel(e.target.value)}
              required
              className="input input-bordered w-full bg-white text-gray-800"
            />
          </div>
        </div>

        {/* Descripción */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-bold text-gray-700">
              Descripción / Biografía
            </span>
          </label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
            className="textarea textarea-bordered h-28 w-full bg-white text-gray-800 text-base"
          ></textarea>
        </div>

        {/* Sección de Tipos */}
        <div className="form-control w-full mt-2">
          <label className="label border-b mb-2">
            <span className="label-text font-bold text-gray-700">
              Elementos / Tipos
            </span>
          </label>
          <div className="flex flex-wrap gap-4 bg-gray-50 p-5 rounded-xl border border-dashed border-gray-300">
            {tiposDisponibles.map((tipo) => (
              <label
                key={tipo.id}
                className="cursor-pointer flex items-center gap-3 p-2 hover:bg-white rounded-lg transition-colors shadow-sm"
              >
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary checkbox-md"
                  checked={tiposSeleccionados.includes(tipo.id)}
                  onChange={() => handleCheckboxChange(tipo.id)}
                />
                <span className="font-bold text-gray-900 text-base">
                  {tipo.nombre}
                </span>
              </label>
            ))}
            {tiposDisponibles.length === 0 && (
              <p className="text-sm text-amber-600 font-medium">
                ⚠️ No hay tipos configurados en la base de datos.
              </p>
            )}
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="flex justify-end gap-4 mt-8 pt-4 border-t">
          <button
            type="button"
            onClick={() => navigate("/pokedex")}
            className="btn bg-gray-600 hover:bg-gray-800 text-white border-none px-8"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn btn-primary px-8 text-white shadow-lg"
          >
            Actualizar Pokémon
          </button>
        </div>
      </form>
    </div>
  );
}
