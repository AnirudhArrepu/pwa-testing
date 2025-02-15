import React from "react";

const DeviceCheck = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#1a1a1a" }}
    >
      <div
        className="card p-5 text-center"
        style={{
          maxWidth: "600px",
          background: "linear-gradient(135deg, #b71c1c, #880e4f)",
          color: "white",
        }}
      >
        <h2 className="mb-4">Please Open on Mobile</h2>
        <p>
          To use this App, please install it as a PWA on your mobile device (i.e. Bookmark the app).
        </p>
        <i className="bi bi-phone fs-1 mt-3"></i>
      </div>
    </div>
  );
};

export default DeviceCheck;
