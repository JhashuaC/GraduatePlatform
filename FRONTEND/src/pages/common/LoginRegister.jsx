import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../api/user.service";
import { createGraduate } from "../../api/graduate.service";
import { createSpeaker } from "../../api/speaker.service";
import { getAllCareers } from "../../api/career.service";
import {
  Mail,
  Lock,
  User,
  Phone,
  Home,
  GraduationCap,
  BookOpen,
  Briefcase,
  IdCard,
} from "lucide-react";

export default function AuthPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [careers, setCareers] = useState([]);

  useEffect(() => {
    async function fetchCareers() {
      const data = await getAllCareers();
      setCareers(data);
    }
    fetchCareers();
  }, []);

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
    } catch {
      setLoginError("Credenciales inválidas");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegError("");
    setRegSuccess("");

    try {
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

      const createdUser = await createUser(userPayload);

      if (regForm.id_role === "2") {
        await createGraduate({
          id_graduate: createdUser.id_user,
          graduation_year: regForm.graduation_year,
          id_career: regForm.id_career,
          category: regForm.category,
          work_phone: regForm.work_phone,
        });
      }

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

  const renderInput = (icon, props) => (
    <div className="flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden">
      <div className="p-2 bg-gray-100 text-gray-500">{icon}</div>
      <input
        {...props}
        className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-800 flex flex-col items-center justify-center px-4 py-12">
      <img src="/logo.png" alt="Logo" className="w-35 mb-7" />

      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-3xl p-8">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
          {isLogin ? "Iniciar Sesión" : "Registro de Usuario"}
        </h2>

        {isLogin ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
            {renderInput(<Mail size={20} />, {
              name: "email",
              type: "email",
              placeholder: "Correo electrónico",
              value: loginForm.email,
              onChange: handleLoginChange,
              required: true,
            })}
            {renderInput(<Lock size={20} />, {
              name: "password",
              type: "password",
              placeholder: "Contraseña",
              value: loginForm.password,
              onChange: handleLoginChange,
              required: true,
            })}
             <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg shadow-md transition-transform hover:scale-105">
              Entrar
            </button>
            <p className="text-sm text-center">
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
            {regError && <p className="text-red-500 text-sm">{regError}</p>}
            {regSuccess && <p className="text-green-500 text-sm">{regSuccess}</p>}

            <div className="grid md:grid-cols-2 gap-4">
              {renderInput(<User size={20} />, {
                name: "name",
                placeholder: "Nombre",
                value: regForm.name,
                onChange: handleRegisterChange,
                required: true,
              })}
              {renderInput(<User size={20} />, {
                name: "last_name1",
                placeholder: "Primer Apellido",
                value: regForm.last_name1,
                onChange: handleRegisterChange,
                required: true,
              })}
              {renderInput(<User size={20} />, {
                name: "last_name2",
                placeholder: "Segundo Apellido",
                value: regForm.last_name2,
                onChange: handleRegisterChange,
              })}
              {renderInput(<IdCard size={20} />, {
                name: "identity_number",
                placeholder: "Cédula",
                value: regForm.identity_number,
                onChange: handleRegisterChange,
                required: true,
              })}
              {renderInput(<Mail size={20} />, {
                name: "email",
                placeholder: "Correo",
                value: regForm.email,
                onChange: handleRegisterChange,
                required: true,
              })}
              {renderInput(<Phone size={20} />, {
                name: "phone",
                placeholder: "Teléfono",
                value: regForm.phone,
                onChange: handleRegisterChange,
              })}
              {renderInput(<Home size={20} />, {
                name: "address",
                placeholder: "Dirección",
                value: regForm.address,
                onChange: handleRegisterChange,
              })}
              {renderInput(<Lock size={20} />, {
                name: "password",
                type: "password",
                placeholder: "Contraseña",
                value: regForm.password,
                onChange: handleRegisterChange,
                required: true,
              })}

              <select
                name="id_role"
                value={regForm.id_role}
                onChange={handleRegisterChange}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1">Administrador</option>
                <option value="2">Graduado</option>
                <option value="3">Facilitador</option>
              </select>

              {regForm.id_role === "2" && (
                <>
                  {renderInput(<GraduationCap size={20} />, {
                    name: "graduation_year",
                    placeholder: "Año de Graduación",
                    value: regForm.graduation_year,
                    onChange: handleRegisterChange,
                  })}
                  <select
                    name="id_career"
                    value={regForm.id_career}
                    onChange={handleRegisterChange}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 "
                    required
                  >
                    <option value="">Seleccionar carrera</option>
                    {careers.map((c) => (
                      <option key={c.id_career} value={c.id_career}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  {renderInput(<BookOpen size={20} />, {
                    name: "category",
                    placeholder: "Categoría",
                    value: regForm.category,
                    onChange: handleRegisterChange,
                  })}
                  {renderInput(<Briefcase size={20} />, {
                    name: "work_phone",
                    placeholder: "Teléfono Laboral",
                    value: regForm.work_phone,
                    onChange: handleRegisterChange,
                  })}
                </>
              )}

              {regForm.id_role === "3" && (
                <>
                  {renderInput(<BookOpen size={20} />, {
                    name: "specialty",
                    placeholder: "Especialidad",
                    value: regForm.specialty,
                    onChange: handleRegisterChange,
                  })}
                  {renderInput(<Briefcase size={20} />, {
                    name: "work_phone",
                    placeholder: "Teléfono Laboral",
                    value: regForm.work_phone,
                    onChange: handleRegisterChange,
                  })}
                </>
              )}
            </div>

              <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg shadow-md transition-transform hover:scale-105"
            >
              Registrar
            </button>
            <p className="text-sm text-center mt-3">
              ¿Ya tienes cuenta?{" "}
              <button type="button" onClick={() => setIsLogin(true)} className="text-blue-600 hover:underline">
                Inicia sesión
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
