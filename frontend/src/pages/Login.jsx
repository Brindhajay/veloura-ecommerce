import { useState } from "react";
import API from "../services/apiService";
import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      const token =
        res.data.token || res.data.jwt || res.data.accessToken || res.data;

      localStorage.setItem("token", token);

      alert("Login successful 💜");

      window.location.href = "/";
    } catch (err) {
      console.error(err);

      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleLogin}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-btn">Login</button>
      </form>
    </div>
  );
}

export default Login;
