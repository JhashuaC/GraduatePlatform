import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../api/user.service";
import { createGraduate } from "../../api/graduate.service";
import { createSpeaker } from "../../api/speaker.service";

export default function AuthPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  // Login
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");

  // Registro
  const [regForm, setRegForm] = useState({
    name: "",
    last_name1: "",
    last_name2: "",
    identity_number: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    id_role: "1",
    graduation_year: "",
    id_career: "",
    category: "",
    work_phone: "",
    specialty: "",
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
      // Crear en tabla users
      const userPayload = {
        first_name: regForm.name,
        last_name1: regForm.last_name1,
        last_name2: regForm.last_name2,
        identity_number: regForm.identity_number,
        email: regForm.email,
        phone: regForm.phone,
        address: regForm.address,
        password: regForm.password,
        id_role: regForm.id_role,
      };
      console.log(userPayload);

      const createdUser = await createUser(userPayload);

      // Crear en graduate
      if (regForm.id_role === "2") {
        await createGraduate({
          id_graduate: createdUser.id_user,
          graduation_year: regForm.graduation_year,
          id_career: regForm.id_career,
          category: regForm.category,
          work_phone: regForm.work_phone,
        });
      }

      // Crear en speaker
      if (regForm.id_role === "3") {
        await createSpeaker({
          id_speaker: createdUser.id_user,
          specialty: regForm.specialty,
          work_phone: regForm.work_phone,
        });
      }

      setRegSuccess("Usuario registrado con éxito. Ahora inicia sesión.");
      setRegForm({
        name: "",
        last_name1: "",
        last_name2: "",
        identity_number: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        id_role: "1",
        graduation_year: "",
        id_career: "",
        category: "",
        work_phone: "",
        specialty: "",
      });
      setIsLogin(true);
    } catch (err) {
      console.error(err);
      setRegError("Error al registrar usuario");
    }
  };

  return (
    <div className="bg-blue-950 min-h-screen flex items-center justify-center">
      <div className="p-4 bg-white rounded shadow w-96 mx-auto mt-20">
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

            {/* Datos base */}
            {[
              { name: "name", placeholder: "Nombre" },
              { name: "last_name1", placeholder: "Primer Apellido" },
              { name: "last_name2", placeholder: "Segundo Apellido" },
              { name: "identity_number", placeholder: "Identificación" },
              { name: "email", placeholder: "Correo electrónico" },
              { name: "phone", placeholder: "Teléfono" },
              { name: "address", placeholder: "Dirección" },
              { name: "password", placeholder: "Contraseña", type: "password" },
            ].map(({ name, placeholder, type = "text" }) => (
              <input
                key={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={regForm[name]}
                onChange={handleRegisterChange}
                required
                className="block w-full mb-2 p-2 border"
              />
            ))}

            <select
              name="id_role"
              value={regForm.id_role}
              onChange={handleRegisterChange}
              className="block w-full mb-4 p-2 border"
            >
              <option value="admin">Administrador</option>
              <option value="2">Graduado</option>
              <option value="3">Facilitador</option>
            </select>

            {/* Campos para Graduado */}
            {regForm.id_role === "2" && (
              <>
                <input
                  name="graduation_year"
                  placeholder="Año de Graduación"
                  value={regForm.graduation_year}
                  onChange={handleRegisterChange}
                  className="block w-full mb-2 p-2 border"
                />
                <input
                  name="id_career"
                  placeholder="ID de Carrera"
                  value={regForm.id_career}
                  onChange={handleRegisterChange}
                  className="block w-full mb-2 p-2 border"
                />
                <input
                  name="category"
                  placeholder="Categoría"
                  value={regForm.category}
                  onChange={handleRegisterChange}
                  className="block w-full mb-2 p-2 border"
                />
                <input
                  name="work_phone"
                  placeholder="Teléfono Laboral"
                  value={regForm.work_phone}
                  onChange={handleRegisterChange}
                  className="block w-full mb-2 p-2 border"
                />
              </>
            )}

            {/* Campos para Facilitador */}
            {regForm.id_role === "3" && (
              <>
                <input
                  name="specialty"
                  placeholder="Especialidad"
                  value={regForm.specialty}
                  onChange={handleRegisterChange}
                  className="block w-full mb-2 p-2 border"
                />
                <input
                  name="work_phone"
                  placeholder="Teléfono Laboral"
                  value={regForm.work_phone}
                  onChange={handleRegisterChange}
                  className="block w-full mb-2 p-2 border"
                />
              </>
            )}

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
