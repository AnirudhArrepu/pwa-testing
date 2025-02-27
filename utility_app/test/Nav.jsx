import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Nav = () => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [searchLocation, setSearchLocation] = useState("");
  
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
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            newMap.setPosition({ latitude, longitude });
            newMap.setZoom(18);

            newMap.addMarker({
              latitude,
              longitude,
              altitude: 20,
              color: "red",
            });
          },
          (error) => {
            console.error("Error getting user location:", error);
          }
        );
      }

      setMap(newMap);
    };

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const locations = [
    { lat: 13.718391141515943, lng: 79.58766854203355, name: "Malhar Hostel" },
    { lat: 13.715830153341601, lng: 79.59070250588617, name: "AB1" },
    { lat: 13.715185613847135, lng: 79.59430048961158, name: "Admin Block" },
  ];

  const handleSearch = (event) => {
    const selectedLocation = locations.find((loc) => loc.name === event.target.value);
    setSearchLocation(event.target.value);
  
    if (selectedLocation && map) {
      if (marker) {
        map.remove(marker);
        setMarker(null);
      }
  
      const newMarker = map.addMarker({
        latitude: selectedLocation.lat,
        longitude: selectedLocation.lng,
        altitude: 20,
        color: "blue",
      });
  
      setMarker(newMarker);
  
      // Get user's current location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
  
          // Calculate bounding box
          const minLat = Math.min(userLat, selectedLocation.lat);
          const maxLat = Math.max(userLat, selectedLocation.lat);
          const minLng = Math.min(userLng, selectedLocation.lng);
          const maxLng = Math.max(userLng, selectedLocation.lng);
  
          // Center the map to the midpoint
          const centerLat = (minLat + maxLat) / 2;
          const centerLng = (minLng + maxLng) / 2;
  
          // Adjust zoom dynamically
          const zoom = 16; // Adjust this based on distance if needed
  
          map.setPosition({ latitude: centerLat, longitude: centerLng });
          map.setZoom(zoom);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
  };

  return (
    <div>
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
            Map
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
            onClick={() => console.log("Exit clicked")}
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
        <select value={searchLocation} onChange={handleSearch} className="form-control" style={{ marginBottom: "10px", marginTop: "2vh"}}>
          <option value="">Select a Destination Location</option>
          {locations.map((loc) => (
            <option key={loc.name} value={loc.name}>{loc.name}</option>
          ))}
        </select>
        <div id="map" style={{ width: "100%", height: "60vh", marginTop: "2vh"}} />
        <div id="note" style={{fontStyle: "italic", marginTop: "1vh"}}>One fingers gesture to span, two finger gesture to rotate <br></br>Destination and Current locations are denoted by a black marker</div>
      </div>
    </div>
  );
};

export default Nav;