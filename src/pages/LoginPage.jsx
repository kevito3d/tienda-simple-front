import { useState } from "react";
import "./Login.css"
import { useNavigate } from "react-router-dom";
import { host } from "../utils";
function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const respuesta = await fetch(`${host}/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (respuesta.ok) {
      const json = await respuesta.json();
      localStorage.setItem("token", json.token);
      navigate("/");
      
    } else {
    //   Seterror("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Usuario</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      {/* iniciar sin logearse */}
      <button 
      style={{marginTop: "20px"}}
      onClick={() => navigate("/")}>Iniciar sin logearse</button>
    </div>
  );
}

export default LoginPage;
