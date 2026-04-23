import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, setAuthToken } from "../api";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/login", formData);
      const { token, student } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("student", JSON.stringify(student));
      setAuthToken(token);

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid login");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="card">
        <h2>Student Login</h2>
        <form onSubmit={handleSubmit} className="form-grid">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>

        {error && <p className="error-text">{error}</p>}

        <p>
          New user? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
