import React from "react";

const EventWidget = () => {
  return (
    <div className="card" style={{borderRadius: "1.5vh", width: "25vh"}}>
        <div className="position-absolute top-0 start-0 bg-dark text-white p-2 text-center rounded-bottom-end" style={{borderBottomRightRadius: "1.5vh", width: "7vh", borderTopLeftRadius: "1.5vh"}}>
            <h5 className="m-0">10</h5>
            <p className="m-0 small">Jan</p>
        </div>
        
        <div className="card-header justify-content-center d-flex align-items-center">
            <img src="/dwicon.jpeg" alt="Event" style={{maxHeight: "14vh"}}/>
        </div>
        <div className="card-body p-10">
            <h5 className="card-title">Flutter x Firebase</h5>
            <p className="card-text">LHC CR 001</p>
        </div>

        <div style={{backgroundColor: "rgb(216, 220, 224)", borderRadius: "12px", padding: "8px", width: "fit-content"}}>
            <i class="bi bi-clock"></i>
            <span class="p-2">08:00</span>
        </div>

    </div>
  )
};

export default EventWidget;
