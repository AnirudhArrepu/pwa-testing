import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const Nav = () => {
  const navigate = useNavigate();
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [searchLocation, setSearchLocation] = useState("");
  const [showLocationModal, setShowLocationModal] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.osmbuildings.org/4.1.1/OSMBuildings.js";
    script.async = true;
    script.onload = () => {
      const newMap = new window.OSMBuildings({
        container: "map",
        position: { latitude: 13.7072, longitude: 79.5945 },
        zoom: 16,
        minZoom: 15,
        maxZoom: 18,
      });

      newMap.addMapTiles("https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}");
      newMap.addGeoJSONTiles("https://{s}.data.osmbuildings.org/0.2/59fcc2e8/tile/{z}/{x}/{y}.json");

      if (navigator.geolocation) {
        navigator.permissions.query({ name: "geolocation" }).then((result) => {
          if (result.state === "granted") {
            getUserLocation(newMap);
          } else if (result.state === "prompt" || result.state === "denied") {
            setShowLocationModal(true);
          }
        });
      }

      setMap(newMap);
    };

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const requestLocation = () => {
    setShowLocationModal(false);
    navigator.geolocation.getCurrentPosition(
      (position) => getUserLocation(map, position),
      (error) => {
        console.error("Error getting user location:", error);
        alert("Location permission is required for better accuracy.");
      }
    );
  };

  const getUserLocation = (newMap, position) => {
    if (!position) return;
    const { latitude, longitude } = position.coords;
    newMap.setPosition({ latitude, longitude });
    newMap.setZoom(18);
    newMap.addMarker({ latitude, longitude, altitude: 20, color: "red" });
  };

  return (
    <div>
      <div className="card text-white rounded-0 position-relative" style={{ width: "100%", height: "33.33vh", background: "linear-gradient(270deg, #540B0E, #CE4257)", border: "none" }}>
        <div className="card-body d-flex justify-content-between align-items-center" style={{ marginLeft: "20px", marginRight: "20px" }}>
          <h1 style={{ height: "70%", fontSize: "33px", width: "50%", textAlign: "left" }}>Map</h1>
          <i className="bi bi-x-lg" style={{ fontSize: "4vh", cursor: "pointer", position: "absolute", right: "6vh", top: "33%", transform: "translateY(-100%)" }} onClick={() => navigate("/home")}></i>
        </div>
      </div>
      <div id="map" style={{ width: "100%", height: "100vh" }} />

      {/* Location Permission Modal */}
      <Modal show={showLocationModal} onHide={() => setShowLocationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enable Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>This app requires location access to function properly. Please enable location services.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLocationModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={requestLocation}>
            Enable Location
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Nav;
