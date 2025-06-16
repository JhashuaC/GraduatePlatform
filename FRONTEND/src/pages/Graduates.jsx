import { useState, useEffect } from "react";
import { getGraduates, addGraduate } from "../api/graduates";
import { getCareers } from "../api/careers";
import GraduatedCard from "../components/GraduatedCard";
import Navbar from "../components/Navbar";

export default function Graduates() {
    const [graduados, setGraduados] = useState([]);
    const [careers, setCareers] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        identification: "",
        address: "",
        email: "",
        phone: "",
        work_phone: "",
        graduation_year: "",
        id_career: ""
    });

    useEffect(() => {
        async function fetchData() {
            const data = await getGraduates();
            setGraduados(data);

            const careerData = await getCareers();
            setCareers(careerData);
        }
        fetchData();
    }, []);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formToSend = {
            ...formData,
            graduation_year: Number(formData.graduation_year),
            id_career: Number(formData.id_career),
        };
        const nuevo = await addGraduate(formData);
        if (nuevo) {
            setGraduados([...graduados, nuevo]);
            setFormData({ name: "", identification: "", address: "", email: "", phone: "", work_phone: "", graduation_year: "", id_career: "" });

        }
    };

    return (
        <div className="pt-20 min-h-screen bg-gray-100 bg-gradient-to-br from-blue-950 via-cyan-00 to-blue-500">
            <Navbar />

            <div className="max-w-4xl mx-auto p-6">
                <h2 className="text-2xl font-bold mb-4 text-amber-50">AGREGAR GRADUADO</h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded shadow">
                    <input name="name" value={formData.name} onChange={handleChange} placeholder="Nombre" className="p-2 border rounded" required />
                    <input name="identification" value={formData.identification} onChange={handleChange} placeholder="Identificacion" className="p-2 border rounded" required />
                    <input name="address" value={formData.address} onChange={handleChange} placeholder="Direccion" className="p-2 border rounded" required />
                    <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="p-2 border rounded" required />
                    <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Telefono" className="p-2 border rounded" required />
                    <input name="work_phone" value={formData.work_phone} onChange={handleChange} placeholder="Telefono Trabajo" className="p-2 border rounded" required />
                    <input name="graduation_year" value={formData.graduation_year} onChange={handleChange} placeholder="Año de Graduación" className="p-2 border rounded" required />

                    <select
                        name="id_career"
                        value={formData.id_career}
                        onChange={handleChange}
                        className="p-2 border rounded"
                        required
                    >
                        <option value="">Seleccionar carrera</option>
                        {careers.map(c => (
                            <option key={c.id_career} value={c.id_career}>{c.name}</option>
                        ))}
                    </select>

                    <button type="submit" className="font-bold bg-blue-900 text-white py-2 px-4 rounded hover:bg-blue-600 col-span-full">
                          AGREGAR
                    </button>

                </form>

                <h2 className=" text-amber-50 text-2xl font-bold my-6">LISTA DE GRADUADOS</h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {graduados.map((g) => (
                        <GraduatedCard key={g.identification || g.id} graduado={g} />
                    ))}
                </div>
            </div>
        </div>
    );
}
