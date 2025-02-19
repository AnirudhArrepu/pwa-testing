import React from "react";

const EventWidget = ({ title, time, club, day, month, classroom }) => {
  return (
    <div className="card" style={{ borderRadius: "1.5vh", width: "25vh" }}>
      {/* Date Badge */}
      <div 
        className="position-absolute top-0 start-0 bg-dark text-white p-2 text-center rounded-bottom-end" 
        style={{ borderBottomRightRadius: "1.5vh", width: "7vh", borderTopLeftRadius: "1.5vh" }}
      >
        <h5 className="m-0">{day}</h5>
        <p className="m-0 small">{month}</p>
      </div>

      {/* Event Icon */}
      <div className="card-header justify-content-center d-flex align-items-center">
        <img src="/dwicon.jpeg" alt={club} style={{ maxHeight: "14vh" }} />
      </div>

      {/* Event Details */}
      <div className="card-body p-10">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{classroom}</p>
      </div>

      {/* Time */}
      <div 
        style={{ backgroundColor: "rgb(216, 220, 224)", borderRadius: "12px", padding: "8px", width: "fit-content" }}
      >
        <i className="bi bi-clock"></i>
        <span className="p-2">{time}</span>
      </div>
    </div>
  );
};

export default EventWidget;
