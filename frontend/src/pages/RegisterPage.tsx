import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import styles from "../styles/LoginPage.module.css"; 
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?]).{10,}$/;
    const isPasswordValid = passwordRegex.test(formData.password);
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      alert("Password must be at least 10 characters long and include uppercase, lowercase, numbers, and special characters.");
      return;
    }
    if (!isPasswordValid) {
      alert("Passwords do not match");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("/auth/signup", formData);
      alert("Registration successful!");

      const { token, user } = response.data;
      localStorage.setItem('justLoggedIn', 'true');
      dispatch(loginSuccess({ user, token }));

      navigate("/home");
    } catch (err) {
      console.error("Signup failed:", err);
      alert("Signup failed. Try again with different info.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img className={styles.logo} src="/minigram-logo.png" alt="Minigram Logo"/>
        <h2 className={styles.title}>Sign Up</h2>
        <form className={styles.form} onSubmit={handleSignup}>
          <input
            className={styles.input}
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            className={styles.input}
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            className={styles.input}
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className={styles.input}
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            className={styles.input}
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button className={styles.button} type="submit">
            Sign Up
          </button>
        </form>

        <p className={styles.loginRedirect}>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
