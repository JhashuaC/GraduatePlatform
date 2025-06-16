import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    id_role: 2, // o el id por defecto
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      navigate("/home");
    } catch (err) {
      alert("Error al registrarse");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow w-80 mx-auto mt-20">
      <h2 className="text-xl mb-4">Registrarse</h2>
      <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required className="block w-full mb-2 p-2 border" />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required className="block w-full mb-2 p-2 border" />
      <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required className="block w-full mb-4 p-2 border" />
      <button className="bg-green-600 text-white px-4 py-2 rounded w-full">Registrarse</button>
    </form>
  );
}
