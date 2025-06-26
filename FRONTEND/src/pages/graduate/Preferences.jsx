import { useEffect, useState } from "react";
import { getAllPreferences } from "../../api/preference_options.service";
import {
  getAllGraduatePreferencesById,
  assignPreferenceToGraduate,
  removePreferenceFromGraduate,
} from "../../api/graduate_preference.service";
import { useAuth } from "../../context/AuthContext";
import {
  CirclePlus,
  CircleMinus,
  Search,
  Star,
} from "lucide-react";

export default function Preferences() {
  const { user } = useAuth();
  const idGraduate = user?.id_user;

  const [allOptions, setAllOptions] = useState([]);
  const [myPrefs, setMyPrefs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchData() {
      const options = await getAllPreferences();
      setAllOptions(options);

      const prefs = await getAllGraduatePreferencesById(idGraduate);
      setMyPrefs(prefs.map((p) => p.id_option));
    }
    if (idGraduate) fetchData();
  }, [idGraduate]);

  const alreadyHas = (idOpt) => myPrefs.includes(idOpt);

  const handleAdd = async (idOpt) => {
    await assignPreferenceToGraduate({
      id_graduate: idGraduate,
      id_option: idOpt,
    });
    setMyPrefs((prev) => [...prev, idOpt]);
  };

  const handleRemove = async (idOpt) => {
    await removePreferenceFromGraduate(idGraduate, idOpt);
    setMyPrefs((prev) => prev.filter((id) => id !== idOpt));
  };

  const visibleOptions = allOptions.filter((opt) =>
    opt.name.toLowerCase().includes(search.toLowerCase())
  );

  const myOptions = visibleOptions.filter((opt) => alreadyHas(opt.id_option));
  const otherOptions = visibleOptions.filter((opt) => !alreadyHas(opt.id_option));

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-blue-900">Preferencias de Interés</h2>

      {/* Buscador */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Buscar preferencias..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border pl-10 p-2 rounded w-full md:w-1/2 shadow-sm focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Mis preferencias actuales */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-blue-800 flex items-center gap-2 mb-2">
          <Star className="w-5 h-5" /> Mis Preferencias
        </h3>
        {myOptions.length === 0 ? (
          <p className="text-gray-600 italic">No tienes preferencias asignadas aún.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myOptions.map((opt) => (
              <div
                key={opt.id_option}
                className="p-4 border border-blue-300 bg-blue-50 rounded flex justify-between items-center shadow-sm"
              >
                <span className="font-medium text-blue-800">{opt.name}</span>
                <button
                  onClick={() => handleRemove(opt.id_option)}
                  className="bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-red-700"
                >
                  <CircleMinus className="w-4 h-4" /> Quitar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Otras preferencias disponibles */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Otras Preferencias</h3>
        {otherOptions.length === 0 ? (
          <p className="text-gray-600 italic">No hay coincidencias o ya las tienes asignadas.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {otherOptions.map((opt) => (
              <div
                key={opt.id_option}
                className="p-4 border rounded flex justify-between items-center bg-white hover:bg-gray-50 shadow-sm"
              >
                <span className="font-medium">{opt.name}</span>
                <button
                  onClick={() => handleAdd(opt.id_option)}
                  className="bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-green-700"
                >
                  <CirclePlus className="w-4 h-4" /> Añadir
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
