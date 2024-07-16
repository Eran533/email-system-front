import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        formData
      );
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      navigate("/inbox");
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const handleRegisterBtn = () => {
    navigate("/register");
  };

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
      <h2 style={{ textAlign: "center" }}>Login</h2>
      <input
        type="email"
        name="email"
        value={email}
        onChange={onChange}
        placeholder="Email"
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        required
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={onChange}
        placeholder="Password"
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        required
      />
      <button
        type="submit"
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Login
      </button>
      <p></p>
      <button
        type="submit"
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
        onClick={handleRegisterBtn}
      >
        Register
      </button>
    </form>
  );
}

export default Login;
