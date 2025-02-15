import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div
      className="container-fluid p-0 position-relative"
      style={{ height: "100vh", overflow: "hidden" }}
    >
      {/* Top Card */}
      <div
        className="card text-white rounded-0"
        style={{
          width: "110%",
          height: "33.33vh",
          background: "linear-gradient(270deg, #540B0E, #CE4257)",
          border: "none",
        }}
      >
        <div
          className="card-body d-flex justify-content-left align-items-center"
          style={{ marginLeft: "20px" }}
        >
          <h1
            className="krona-style"
            style={{
              height: "35%",
              fontSize: "30px",
              width: "50%",
              textAlign: "left",
            }}
          >
            Hello, Signin!
          </h1>
        </div>
      </div>

      {/* Bottom Card */}
      <div
        className="card shadow"
        style={{
          width: "100%",
          position: "absolute",
          top: "25vh",
          left: "50%",
          transform: "translateX(-50%)",
          height: "100vh",
          border: "none",
          borderRadius: "6vh",
          overflow: "hidden",
        }}
      >
        <div
          className="card-body d-flex justify-content-center align-items-top"
          style={{ marginTop: "5vh" }}
        >
          <form
            style={{
              width: "100%",
              padding: "0 20px",
              fontSize: "2.8vh",
              color: "#FF0000",
              fontWeight: "500",
            }}
          >
            <div className="mb-3" style={{ marginTop: "-1vh" }}>
              <label htmlFor="username" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                style={{ fontSize: "2.3vh" }}
                id="username"
                placeholder="Enter username"
              />
            </div>
            <div className="mb-3" style={{ marginTop: "5vh" }}>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  style={{ fontSize: "2.3vh" }}
                  className="form-control"
                  id="password"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  // style={{background: "transparent"}}
                  onClick={togglePassword}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>
            <button
              className="btn d-block mx-auto"
              style={{ marginTop: "2vh" }}
            >
              Forgot Password?
            </button>
            <button
              type="submit"
              className="btn btn-primary d-block mx-auto"
              style={{
                marginTop: "2vh",
                height: "7vh",
                borderRadius: "5vh",
                fontSize: "2.3vh",
                width: "70%",
                background: "linear-gradient(270deg, #540B0E, #CE4257)",
              }}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
