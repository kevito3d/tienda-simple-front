import { useState } from "react";
import "./RegisterPage.css";
import { Link } from "react-router-dom";
import { host } from "../utils";
import { useNavigate } from "react-router-dom";
function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    // Aquí puedes realizar la lógica de registro, por ejemplo, enviar los datos al servidor
    const respuesta = await fetch(`${host}/api/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await respuesta.json();
    if (respuesta.status === 201) {
      // Aquí puedes redireccionar a la página de login o hacer otra lógica
      alert("Usuario registrado correctamente");
      navigate("/login");
    } else {
     alert(data.message);
    }
    
  };

  return (
    <div className="register-page">
      <Link to="/login" className="back">regresar</Link>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-groupa">
          <label htmlFor="username">Usuario</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-groupa">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default RegisterPage;
