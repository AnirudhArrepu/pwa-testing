import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // ✅ Use Routes
import { useEffect, useState } from "react";
import LoginPage from "./Login";
import DeviceCheck from "./DeviceCheck";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import AdminPage from "./Admin-Page/Admin";
import Nav from "./Nav-Page/Nav";
import HomePage from "./Home-Page/Home";

const App = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(/iPhone|iPad|iPod|Android|tablet/i.test(navigator.userAgent));
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // return (
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path="/" element={isMobile? <HomePage />: <DeviceCheck/>} />
  //       <Route path="/admin" element={isMobile? <AdminPage />: <DeviceCheck/>} />
  //       <Route path="/map" element={isMobile? <Nav />: <DeviceCheck/>} />
  //     </Routes>
  //   </BrowserRouter>
  // );
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/map" element={<Nav />} />
        <Route path="/map" element={<Nav />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
