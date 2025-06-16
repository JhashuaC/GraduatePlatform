import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
    const { login, register } = useAuth();
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);

    // Estados para login
    const [loginForm, setLoginForm] = useState({ email: "", password: "" });
    const [loginError, setLoginError] = useState("");

    // Estados para registro
    const [regForm, setRegForm] = useState({
        name: "",
        last_name: "",
        email: "",
        password: "",
        id_role: "user",
    });
    const [regError, setRegError] = useState("");
    const [regSuccess, setRegSuccess] = useState("");

    const handleLoginChange = (e) =>
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

    const handleRegisterChange = (e) =>
        setRegForm({ ...regForm, [e.target.name]: e.target.value });

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoginError("");
        try {
            await login(loginForm);
            navigate("/home");
        } catch (err) {
            setLoginError("Credenciales inválidas");
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setRegError("");
        setRegSuccess("");
        try {
            await register(regForm);
            setRegSuccess("Usuario registrado con éxito. Ahora inicia sesión.");
            setRegForm({ name: "", last_name: "", email: "", password: "", id_role: "user" });
            setIsLogin(true);
        } catch (err) {
            setRegError("Error al registrar usuario");
        }
    };

    return (
        <div className=" bg-blue-950 min-h-screen flex items-center justify-center">
            <div className="p-4 bg-white rounded shadow w-80 mx-auto mt-20">
                {isLogin ? (
                    <form onSubmit={handleLoginSubmit}>
                        <h2 className="text-xl mb-4">Iniciar sesión</h2>
                        {loginError && <p className="text-red-500">{loginError}</p>}
                        <input
                            name="email"
                            placeholder="Email"
                            value={loginForm.email}
                            onChange={handleLoginChange}
                            required
                            className="block w-full mb-2 p-2 border"
                        />
                        <input
                            name="password"
                            type="password"
                            placeholder="Contraseña"
                            value={loginForm.password}
                            onChange={handleLoginChange}
                            required
                            className="block w-full mb-4 p-2 border"
                        />
                        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full mb-2">
                            Entrar
                        </button>

                        <p className="text-center text-sm">
                            ¿No tienes cuenta?{" "}
                            <button
                                type="button"
                                onClick={() => setIsLogin(false)}
                                className="text-blue-600 hover:underline"
                            >
                                Regístrate aquí
                            </button>
                        </p>
                    </form>
                ) : (
                    <form onSubmit={handleRegisterSubmit}>
                        <h2 className="text-xl mb-4">Registrar usuario</h2>
                        {regError && <p className="text-red-500">{regError}</p>}
                        {regSuccess && <p className="text-green-500">{regSuccess}</p>}

                        <input
                            name="name"
                            placeholder="Nombre"
                            value={regForm.name}
                            onChange={handleRegisterChange}
                            required
                            className="block w-full mb-2 p-2 border"
                        />
                        <input
                            name="last_name"
                            placeholder="Apellido"
                            value={regForm.last_name}
                            onChange={handleRegisterChange}
                            required
                            className="block w-full mb-2 p-2 border"
                        />
                        <input
                            name="email"
                            placeholder="Email" //kkk
                            value={regForm.email}
                            onChange={handleRegisterChange}
                            required
                            className="block w-full mb-2 p-2 border"
                        />
                        <input
                            name="password"
                            type="password"
                            placeholder="Contraseña"
                            value={regForm.password}
                            onChange={handleRegisterChange}
                            required
                            className="block w-full mb-4 p-2 border"
                        />
                        <select
                            name="id_role"
                            value={regForm.id_role}
                            onChange={handleRegisterChange}
                            className="block w-full mb-4 p-2 border"
                        >
                            <option value="user">Usuario</option>
                            <option value="admin">Administrador</option>
                        </select>

                        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full mb-2">
                            Registrar
                        </button>

                        <p className="text-center text-sm">
                            ¿Ya tienes cuenta?{" "}
                            <button
                                type="button"
                                onClick={() => setIsLogin(true)}
                                className="text-blue-600 hover:underline"
                            >
                                Inicia sesión
                            </button>
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
}
