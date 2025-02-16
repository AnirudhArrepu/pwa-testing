import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const checkAuth = async () => {
    try {
      const response = await fetch("http://localhost:5000/check-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: localStorage.getItem("username"), password: localStorage.getItem("password") }), // Replace with real authentication method
      });

      const data = await response.json();

      if (data.status === "success") {
        return true
      }
    } catch (error) {
      console.error("Error checking auth:", error);
      return false;
    }

    return false;
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    checkAuth().then((authenticated) => {
      if (authenticated) {
        navigate("/admin");
        console.log("Authenticated");
      } else {
        console.log("Not authenticated");
        // alert("Invalid username or password");
      }
    });    
  }

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
              width: "70%",
              textAlign: "left",
            }}
          >
            Hello Admin, Signin!
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
                Username
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setUsername(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
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


            <div style={{ marginTop: "6vh" }}> </div>
            {/* <button
              className="btn d-block mx-auto"
              style={{ marginTop: "2vh" }}
            >
              Forgot Password?
            </button> */}


            <button
              type="submit"
              className="btn btn-primary d-block mx-auto"
              onClick={submitHandler}
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
