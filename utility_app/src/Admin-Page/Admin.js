import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  // const pdf2excel = require('pdf-to-excel');
  // const handleFileChange = (event) => {
  //   setSelectedFile(event.target.files[0]);
  //   // pdf2excel.genXlsx(event.target.files[0], "output.xlsx", (err) => {
  //   //   if (err) {
  //   //     console.log(err);
  //   //   } else {
  //   //     console.log("Excel file generated successfully!");
  //   //   }
  //   // });
  // };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    
    if (!file) return;
  
    setSelectedFile(file);
  };
  


  return (
    <div
      className="container-fluid p-0 position-relative"
      style={{ height: "100vh", overflow: "hidden" }}
    >
      {/* Top Card */}
      <div
        className="card text-white rounded-0 position-relative"
        style={{
          width: "110%",
          height: "33.33vh",
          background: "linear-gradient(270deg, #540B0E, #CE4257)",
          border: "none",
        }}
      >
        <div
          className="card-body d-flex justify-content-between align-items-center"
          style={{ marginLeft: "20px", marginRight: "20px" }}
        >
          <h1
            className="krona-style"
            style={{
              height: "70%",
              fontSize: "33px",
              width: "50%",
              textAlign: "left",
            }}
          >
            Admin
          </h1>

          {/* Exit Icon */}
          <i
            className="bi bi-x-lg"
            style={{
              fontSize: "4vh",
              cursor: "pointer",
              position: "absolute",
              right: "10vh",
              top: "33%",
              transform: "translateY(-100%)",
            }}
            onClick={() => navigate("/")}
          ></i>
        </div>
      </div>

      {/* Bottom Card */}
      <div
        className="card shadow"
        style={{
          padding: "2vh",
          width: "100%",
          position: "absolute",
          top: "15vh",
          left: "50%",
          transform: "translateX(-50%)",
          height: "100vh",
          border: "none",
          borderRadius: "6vh",
          overflow: "hidden",
        }}
      >
        <div className="card-body" style={{ marginTop: "1vh" }}>
          {/* Event Section */}
          <h5 className="mb-3" style={{ fontSize: "3vh", fontWeight: "650" }}>
            Event
          </h5>
          <div className="card p-3 mb-4">
            <select className="form-select mb-3">
              <option>Choose Club/ Event Organisers</option>
              <option>DW</option>
              <option>SS</option>
              <option>Techmaniacs</option>
              <option>Navgati</option>
            </select>
            <textarea
              className="form-control"
              placeholder="Description..."
              rows="4"
            ></textarea>
          </div>

          {/* Mess/Bus Section */}
          <h5
            className="mb-3"
            style={{ fontSize: "3vh", fontWeight: "650", marginTop: "4vh" }}
          >
            Mess/Bus
          </h5>
          <div className="card p-3 mb-4 justify-content-center">
            <select className="form-select mb-3">
              <option>Choose Mess/Bus</option>
              <option>Mess</option>
              <option>Bus</option>
            </select>

            {/* PDF Upload */}
            <div className="d-flex align-items-center justify-content-center">
              <label
                htmlFor="pdfUpload"
                className="d-flex align-items-center"
                style={{ cursor: "pointer" }}
              >
                <i
                  className="bi bi-file-earmark-pdf"
                  style={{ fontSize: "24px", marginRight: "10px" }}
                ></i>
                <span>
                  {selectedFile ? selectedFile.name : "Select PDF"}
                </span>
              </label>
              <input
                type="file"
                id="pdfUpload"
                accept="application/pdf"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center" style={{ marginTop: "7vh" }}>
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
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
