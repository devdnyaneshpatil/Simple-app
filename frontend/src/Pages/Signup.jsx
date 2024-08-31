import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNo: "",
    profession: "",
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
        "http://localhost:8080/api/v1/auth/sign-up",
        formData
      );
      setIsLoading(false);
      toast.success("Signup successful!");
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      toast.error(
        error.response?.data?.message || "Signup failed. Please try again."
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
          <h2 className="card-title text-center">Signup</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="name" className="mb-2">
                Enter Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your Name"
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
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
                className="position-absolute top-50 mt-3 end-0 translate-middle-y me-3"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="phoneNo" className="mb-2">
                Mobile Numer
              </label>
              <input
                type="text"
                className="form-control"
                id="phoneNo"
                placeholder="Enter your Mobile"
                required
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="profession" className="mb-2">
                Profession
              </label>
              <input
                type="text"
                className="form-control"
                id="profession"
                placeholder="Enter your Profession"
                required
                name="profession"
                value={formData.profession}
                onChange={handleChange}
              />
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
                "Signup"
              )}
            </button>
          </form>
          <p className="text-center mt-3">
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </div>
      <ToastContainer position="bottom-center" />
    </>
  );
}

export default Signup;
