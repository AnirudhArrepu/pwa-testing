import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import EventWidget from "./EventWidget.js";

const HomePage = () => {
  const navigate = useNavigate();

  const announcements = [
    { title: "Exam Schedule Update", message: "Mid-term exams postponed by a week.", date: "Feb 18, 2025" },
    { title: "Workshop", message: "Flutter Workshop this Saturday. Register now!", date: "Feb 20, 2025" },
  ];
  

  const events_gradients = {
    "DW": "390BDE C5FB12",
    "Sigma Squad": "390BDE D4FCFE",
  };

  // Converted events to an array of objects to avoid duplicate keys
  const events = [
    { title: "DW", details: ["Flutter x Firebase", "20-7-24", "LHC CR 006", "20:00"] },
    { title: "Sigma Squad", details: ["Event 2 Description", "20-7-24", "LHC CR 006", "20:00"] },
    { title: "DW", details: ["Git & GitHub", "24-7-24", "LHC CR 006", "20:00"] },
  ];

  const food = {
    breakfast: "Veg Uthappam | Masala Sambar + Groundnut Chutney",
    lunch: "Rice | Dal Tadka | Mixed Veg Curry | Curd | Pappad | Gobi Fry",
    dinner: "Chapati | Paneer Butter Masala | Jeera Rice | Salad",
  };

  const busTimings = {
    "Round 1": ["13:30 AB1", "13:35 Transit Campus", "13:45 Malhar"],
    "Round 2": ["14:00 AB1", "14:05 Transit Campus", "14:15 Malhar"],
    "Round 3": ["15:30 AB1", "15:35 Transit Campus", "15:45 Malhar"],
    "Round 4": ["17:00 AB1", "17:05 Transit Campus", "17:15 Malhar"],
    "Round 5": ["00:00 AB1", "00:05 Transit Campus", "00:15 Malhar"],
  };

  const getNearestBus = () => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    // Collect all bus departure times (first entry of each round)
    const candidates = [];
    for (const [round, times] of Object.entries(busTimings)) {
      const firstTimeStr = times[0]; // AB1 departure
      const [timePart, location] = firstTimeStr.split(" ");
      const [hour, minute] = timePart.split(":").map(Number);
      let busMinutes = hour * 60 + minute;

      // Adjust for next day if needed
      if (busMinutes < currentTime) {
        busMinutes += 24 * 60;
      }

      candidates.push({
        round,
        busMinutes,
        displayTime: `${timePart} ${location}`,
      });
    }

    // Sort candidates by adjusted time and return the first one
    candidates.sort((a, b) => a.busMinutes - b.busMinutes);
    const nearest = candidates[0];

    return {
      round: nearest.round,
      time: nearest.displayTime,
    };
  };

  // Sort events based on time (fourth element in the details array)
  const sortedEvents = events.sort((a, b) => {
    const timeToMinutes = (timeStr) => {
      const [hours, minutes] = timeStr.split(":").map(Number);
      return hours * 60 + minutes;
    };
    return timeToMinutes(a.details[3]) - timeToMinutes(b.details[3]);
  });

  return (
    <div className="container-fluid p-0 position-relative" style={{ height: "100vh" }}>
      {/* Top Card */}
      <div
        className="card text-white rounded-0 position-relative"
        style={{ width: "100%", height: "33.33vh", background: "linear-gradient(270deg, #540B0E, #CE4257)", border: "none" }}
      >
        <div className="card-body d-flex justify-content-between align-items-center" style={{ marginLeft: "20px", marginRight: "20px" }}>
          <h1 className="" style={{ height: "70%", fontSize: "33px", width: "50%", textAlign: "left" }}>
            Home
          </h1>
          {/* Person Icon */}
          <i
            className="bi bi-person"
            style={{
              fontSize: "4vh",
              cursor: "pointer",
              position: "absolute",
              right: "6vh",
              top: "33%",
              transform: "translateY(-100%)",
            }}
            onClick={() => navigate("/admin")}
          ></i>
        </div>
      </div>

      {/* Bottom Card */}
      <div
        className="card shadow scroll-container"
        style={{ padding: "2vh", width: "100%", position: "fixed", top: "15vh", left: "50%", transform: "translateX(-50%)", height: "100vh", border: "none", borderRadius: "6vh", overflowY: "auto" }}
      >
        <div className="card-body" style={{ marginTop: "1vh", height: "100%" }}>
          {/* <EventWidget /> */}
          {/* Events */}
            <h5 className="mb-3" style={{ fontSize: "3vh", fontWeight: "650" }}>Events</h5>
            <div style={{
              overflowX: "auto",
              whiteSpace: "nowrap",
              scrollbarWidth: "none", // Hides scrollbar in Firefox
              marginTop: "-2vh",
              marginLeft: "-2vh"
            }} className="scroll-container d-flex gap-3 p-3">
            {sortedEvents.map((event, index) => {
              const [day, month, year] = event.details[1].split("-").map(Number);
              const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
              const monthName = monthNames[month - 1];

              return (
                <div key={index}> 
                  <EventWidget title={event.details[0]} time={event.details[3]} club={event.title} day={day.toString()} month={monthName} classroom={event.details[2]} />
                </div>
              );
            })}

            </div>

          {/* Announcements */}
          <h5 className="mb-3" style={{ fontSize: "3vh", fontWeight: "650" }}>Announcements</h5>
          {announcements.length > 0 ? (
            <div className="d-flex flex-column gap-3" style={{
              maxHeight: "25vh",
              overflowY: "auto"
            }}>
              {announcements.map((announcement, index) => (
                <div
                  key={index}
                  className="card p-3"
                  style={{
                    borderRadius: "15px",
                    background: "linear-gradient(to right, #f8d7da, #fbecec)",
                    boxShadow: "2px 2px 10px rgba(0,0,0,0.2)",
                  }}
                >
                  <div className="d-flex align-items-center">
                    <i
                      className="bi bi-info-circle"
                      style={{ fontSize: "2.5vh", color: "#721c24", marginRight: "10px" }}
                    ></i>
                    <div>
                      <h6 style={{ fontSize: "2.2vh", fontWeight: "bold", marginBottom: "3px" }}>
                        {announcement.title}
                      </h6>
                      <p style={{ fontSize: "1.8vh", marginBottom: "0" }}>{announcement.message}</p>
                      <small className="text-muted">{announcement.date}</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card p-3 text-center" style={{ borderRadius: "15px", background: "#f8f9fa" }}>
              <h6 style={{ fontSize: "2.2vh", fontWeight: "bold", color: "#6c757d" }}>
                No announcements for now!
              </h6>
              <p className="text-muted">Check back later for updates.</p>
            </div>
          )}

          {/* Mess Schedule */}
          <h5 className="mb-3" style={{ marginTop: "3vh", fontSize: "3vh", fontWeight: "650" }}>Mess Schedule</h5>
          <div style={{ display: "flex", overflowX: "scroll", scrollbarWidth: "none", msOverflowStyle: "none", gap: "10px", paddingBottom: "10px" }} className="scroll-container">
            {Object.entries(food).map(([meal, description]) => (
              <div
                key={meal}
                className="card p-3 text-center"
                style={{ borderRadius: "15px", background: "linear-gradient(to right, #d1d1d1, #a8a8a8)", boxShadow: "2px 2px 10px rgba(0,0,0,0.2)", minWidth: "250px" }}
              >
                <h5 style={{ fontSize: "2.5vh", fontWeight: "bold", marginBottom: "5px" }}>
                  {meal.charAt(0).toUpperCase() + meal.slice(1)}
                </h5>
                <hr style={{ borderTop: "2px solid black", width: "80%", margin: "auto", marginBottom: "10px" }} />
                <p style={{ fontSize: "2vh", fontWeight: "500", marginBottom: "0" }}>{description}</p>
              </div>
            ))}
          </div>

          {/* Bus Schedule */}
          <h5 className="mt-4 mb-3" style={{ fontSize: "3vh", fontWeight: "650" }}>Nearest Bus Arrival</h5>
          <div
            className="card p-3 text-center"
            style={{ borderRadius: "15px", background: "#f8f9fa", boxShadow: "2px 2px 10px rgba(0,0,0,0.2)", minWidth: "250px" }}
          >
            <h5 style={{ fontSize: "2.5vh", fontWeight: "bold", marginBottom: "5px" }}>{getNearestBus().round}</h5>
            <hr style={{ borderTop: "2px solid black", width: "80%", margin: "auto", marginBottom: "10px" }} />
            <p style={{ fontSize: "2vh", fontWeight: "500", marginBottom: "0" }}>{getNearestBus().time}</p>
          </div>

          <div style={{height: "25vh"}}>

          </div>


          <style>{`.scroll-container::-webkit-scrollbar { display: none; }`}</style>
        </div>
      </div>
      {/* Floating Action Button */}
      <button
        onClick={() => navigate("/map")}
        className="btn btn-primary position-absolute"
        style={{ height: "10vh", width: "10vh", bottom: "6vh", right: "3vh", fontSize: "2vh", backgroundImage: "linear-gradient(to right, #CE4257, #540B0E )", padding: "15px 20px", borderRadius: "5vh" }}
      >
        Map
      </button>
    </div>
  );
};

export default HomePage;
