import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

export default function AddPokemon() {
  const [nombre, setNombre] = useState("");
  const [numPokedex, setNumPokedex] = useState("");
  const [nivel, setNivel] = useState(1);
  const [descripcion, setDescripcion] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // El objeto debe tener los mismos nombres que tu clase Pokemon.java
      const nuevoPokemon = {
        nombre,
        numPokedex: parseInt(numPokedex),
        nivel: parseInt(nivel),
        descripcion,
        tipos: [], // Enviamos array vacío de momento para evitar errores de ManyToMany
      };

      await api.post("/pokemon", nuevoPokemon);
      alert("¡Pokémon registrado en la base de datos!");
      navigate("/pokedex");
    } catch (error) {
      console.error("Error al guardar:", error.response?.data);
      alert(
        "Error: " + (error.response?.data?.message || "No se pudo guardar"),
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-3xl shadow-2xl border-t-8 border-red-600">
      <h2 className="text-3xl font-black text-gray-800 mb-6 text-center uppercase tracking-tight">
        Nuevo Registro
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label font-bold text-gray-700">Nombre</label>
            <input
              type="text"
              className="input input-bordered bg-gray-50 text-gray-900"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label className="label font-bold text-gray-700">Nº Pokedex</label>
            <input
              type="number"
              className="input input-bordered bg-gray-50 text-gray-900"
              value={numPokedex}
              onChange={(e) => setNumPokedex(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label font-bold text-gray-700">Nivel</label>
          <input
            type="number"
            className="input input-bordered bg-gray-50 text-gray-900"
            value={nivel}
            onChange={(e) => setNivel(e.target.value)}
            required
          />
        </div>

        <div className="form-control">
          <label className="label font-bold text-gray-700">Descripción</label>
          <textarea
            className="textarea textarea-bordered bg-gray-50 text-gray-900 h-24"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          ></textarea>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            type="submit"
            className="btn btn-error flex-1 text-white font-bold"
          >
            Registrar
          </button>
          <button
            type="button"
            onClick={() => navigate("/pokedex")}
            className="btn btn-ghost flex-1"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
