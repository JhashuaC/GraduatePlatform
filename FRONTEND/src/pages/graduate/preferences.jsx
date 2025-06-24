import { useEffect, useState } from "react";
import {
    getAllPreferences,
} from "../../api/preference_options.service";
import {
    getAllGraduatePreferencesById,
    assignPreferenceToGraduate,
    removePreferenceFromGraduate,
} from "../../api/graduate_preference.service";
import { useAuth } from "../../context/AuthContext";

export default function Preferences() {
    const { user } = useAuth();                // id_user === id_graduate
    const idGraduate = user?.id_user;

    const [allOptions, setAllOptions] = useState([]);
    const [myPrefs, setMyPrefs] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        async function fetchData() {
            const options = await getAllPreferences();
            setAllOptions(options);

            const prefs = await getAllGraduatePreferencesById(idGraduate);
            setMyPrefs(prefs.map(p => p.id_option)); 
            setMyPrefs(prefs.map(p => p.id_option)); 
        }
        if (idGraduate) fetchData();
    }, [idGraduate]);

    /* helpers locales */
    const alreadyHas = (idOpt) => myPrefs.includes(idOpt);

    const handleAdd = async (idOpt) => {
        await await assignPreferenceToGraduate({
            id_graduate: idGraduate,
            id_option: idOpt,
        });
        setMyPrefs(prev => [...prev, idOpt]);
    };

    const handleRemove = async (idOpt) => {
        await removePreferenceFromGraduate(idGraduate, idOpt);
        setMyPrefs(prev => prev.filter(id => id !== idOpt));
    };

    /* filtro de búsqueda */
    const visibleOptions = allOptions.filter(opt =>
        opt.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-blue-900">Preferencias de Interés</h2>

            {/* Buscador */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Buscar preferencias..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-2 rounded w-full md:w-1/2"
                />
            </div>

            {/* Todas las opciones disponibles */}
            {visibleOptions.length === 0 ? (
                <p className="text-gray-600">No hay coincidencias.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {visibleOptions.map((opt) => (
                        <div
                            key={opt.id_option}
                            className={`p-4 border rounded flex justify-between items-center ${alreadyHas(opt.id_option) ? "bg-blue-50 border-blue-300" : ""
                                }`}
                        >
                            <span className="font-medium">{opt.name}</span>
                            {alreadyHas(opt.id_option) ? (
                                <button
                                    onClick={() => handleRemove(opt.id_option)}
                                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                >
                                    Quitar
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleAdd(opt.id_option)}
                                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                                >
                                    Añadir
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
