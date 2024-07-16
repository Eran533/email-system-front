import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/Login.css";

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
    <form onSubmit={onSubmit} className="login-form">
      <h2>WELCOME</h2>
      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={email}
        onChange={onChange}
        placeholder="some@email.com"
        required
      />
      <label>Password:</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={onChange}
        placeholder="*******"
        required
      />
      <a href="#" className="forgot-password">
        Forgot your password?
      </a>
      <div className="btn-group">
        <button type="submit" className="login-btn">
          Login
        </button>
        <span className="btn-divider">/</span>
        <button
          type="button"
          className="register-btn"
          onClick={handleRegisterBtn}
        >
          Register
        </button>
      </div>
    </form>
  );
}

export default Login;