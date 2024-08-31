import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate=useNavigate()

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        formData
      );
      setIsLoading(false);
      toast.success("Login successful!");
        localStorage.setItem("token", JSON.stringify(data.token))
        navigate("/home")
    } catch (error) {
      setIsLoading(false);
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
      console.log(error);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div
          className="card p-4 shadow-sm"
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <h2 className="card-title text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="email" className="mb-2">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-3 position-relative">
              <label htmlFor="password" className="mb-2">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                placeholder="Enter your password"
                required
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <span
                className="position-absolute top-50 mt-2 end-0 translate-middle-y me-3"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="d-flex justify-content-center align-items-center">
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span className="ms-2">Loading...</span>
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <p className="text-center mt-3">
            Don't have an account? <Link to="/sign-up">Sign Up</Link>
          </p>
        </div>
      </div>
      <ToastContainer position="bottom-center" />
    </>
  );
}

export default Login;
