import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "bootstrap/dist/css/bootstrap.min.css";

// Ensure the OSMBuildings script is loaded (e.g., include this in your index.html):
// <script src="https://cdn.osmbuildings.org/4.1.1/OSMBuildings.js"></script>

const Nav2 = () => {
  const [userLocation, setUserLocation] = useState(null);
  // We'll use an empty string for "no selection" to avoid React warnings.
  const [destination, setDestination] = useState("");
  const mapRef = useRef();

  useEffect(() => {
    // Get user location on mount
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
  }, []);

  const locations = [
    { lat: 13.718391141515943, lng: 79.58766854203355, name: "Malhar Hostel" },
    { lat: 13.715830153341601, lng: 79.59070250588617, name: "AB1" },
    { lat: 13.715185613847135, lng: 79.59430048961158, name: "Admin Block" },
  ];

  const handleSearch = (event) => {
    const selectedName = event.target.value;
    const selectedLocation = locations.find((loc) => loc.name === selectedName);
    if (selectedLocation) {
      // We store the destination as a string "lat,lng" for simplicity.
      setDestination(`${selectedLocation.lat},${selectedLocation.lng}`);
      // Pan the map to the destination (if the map is ready)
      if (mapRef.current) {
        mapRef.current.setView([selectedLocation.lat, selectedLocation.lng], 16);
      }
    } else {
      setDestination("");
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <select
        value={destination}
        onChange={handleSearch}
        className="form-control"
        style={{ marginBottom: "10px" }}
      >
        <option value="">Select a location</option>
        {locations.map((loc) => (
          <option key={loc.name} value={loc.name}>
            {loc.name}
          </option>
        ))}
      </select>

      <MapContainer
        center={userLocation || [13.7072, 79.5945]}
        zoom={16}
        style={{ height: "500px", width: "100%" }}
        whenCreated={(map) => {
          mapRef.current = map;
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {userLocation && (
          <Marker position={userLocation}>
            <Popup>Your Location</Popup>
          </Marker>
        )}
        {destination && (() => {
          const [lat, lng] = destination.split(",").map(Number);
          return (
            <Marker position={[lat, lng]}>
              <Popup>Destination</Popup>
            </Marker>
          );
        })()}
        {userLocation && destination && (
          <Routing userLocation={userLocation} destination={destination} />
        )}
        {/* This component creates (or reuses) the OSMBuildings overlay */}
        <OSMBuildingsLayer />
      </MapContainer>
    </div>
  );
};

const Routing = ({ userLocation, destination }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    const [destLat, destLng] = destination.split(",").map(Number);
    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(userLocation[0], userLocation[1]),
        L.latLng(destLat, destLng)
      ],
      routeWhileDragging: true,
      createMarker: () => null // Hide default markers from routing control
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, userLocation, destination]);

  return null;
};

const OSMBuildingsLayer = () => {
  const map = useMap();
  const osmbRef = useRef(null);

  useEffect(() => {
    if (!map || !window.OSMBuildings) return;

    // Create or select an overlay container for OSMBuildings
    let osmbContainer = document.getElementById("osmb");
    if (!osmbContainer) {
      osmbContainer = document.createElement("div");
      osmbContainer.id = "osmb";
      // Position the container absolutely over the Leaflet map container
      osmbContainer.style.position = "absolute";
      osmbContainer.style.top = "0";
      osmbContainer.style.left = "0";
      osmbContainer.style.width = "100%";
      osmbContainer.style.height = "100%";
      osmbContainer.style.pointerEvents = "none"; // Allow interactions to pass through to Leaflet
      osmbContainer.style.zIndex = "500"; // Adjust z-index to be above tile layers
      // Append it to the Leaflet map container
      const mapContainer = map.getContainer();
      mapContainer.appendChild(osmbContainer);
    }

    // Initialize OSMBuildings in the overlay container
    const osmb = new window.OSMBuildings({
      container: "osmb",
      position: {
        latitude: map.getCenter().lat,
        longitude: map.getCenter().lng
      },
      zoom: map.getZoom(),
      minZoom: 15,
      maxZoom: 18,
      rotation: 0
    });
    osmb.addMapTiles(
      "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
    );
    osmb.addGeoJSONTiles(
      "https://{s}.data.osmbuildings.org/0.2/59fcc2e8/tile/{z}/{x}/{y}.json"
    );
    osmbRef.current = osmb;

    // Whenever the Leaflet map moves, update the OSMBuildings view.
    const syncOSMB = () => {
      const center = map.getCenter();
      osmb.setPosition({
        latitude: center.lat,
        longitude: center.lng
      });
      osmb.setZoom(map.getZoom());
    };

    map.on("moveend", syncOSMB);
    return () => {
      map.off("moveend", syncOSMB);
      // Optionally: clean up the osmb instance here if needed.
    };
  }, [map]);

  return null;
};

export default Nav2;
