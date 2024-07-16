import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./css/Register.css";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const { firstName, lastName, email, password, repeatPassword } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "password" || e.target.name === "repeatPassword") {
      setPasswordError("");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        formData
      );
      console.log(res.data);
      navigate("/");
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const handleLoginBtn = () => {
    navigate("/");
  };

  return (
    <form onSubmit={onSubmit} className="register-form">
      <div className="form-header">
        <FontAwesomeIcon icon={faArrowLeft} onClick={handleLoginBtn} />
        <h2>Sign-Up</h2>
      </div>
      <div className="name-inputs">
        <div className="name-input">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={onChange}
            placeholder="First Name"
            required
          />
        </div>
        <div className="name-input">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={onChange}
            placeholder="Last Name"
            required
          />
        </div>
      </div>
      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={email}
        onChange={onChange}
        placeholder="Email"
        required
      />
      <label>Password:</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={onChange}
        placeholder="Password"
        required
      />
      <label>Repeat Password:</label>
      <input
        type="password"
        name="repeatPassword"
        value={repeatPassword}
        onChange={onChange}
        placeholder="Repeat Password"
        required
      />
      {passwordError && <p className="error-message">{passwordError}</p>}
      <div className="btn-group">
        <button type="submit" className="register-btn">
          Register
        </button>
      </div>
    </form>
  );
}

export default Register;