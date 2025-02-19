import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const [transitioning, setTransitioning] = useState(false);
  const navigate = useNavigate();
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const minSwipeDistance = 50; // Minimum swipe distance in pixels

  const onTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > minSwipeDistance;

    if (isUpSwipe) {
      setTransitioning(true);
      setTimeout(() => {
        navigate("/home"); // Navigate after transition
      }, 500); // Match transition duration
    }
  };

  return (
    <div 
      className={`splash-screen ${transitioning ? 'transitioning' : ''}`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="overlay">
        <div className="splash-content">
          <h1>IIT-TIRUPATI</h1>
          <p>Swipe up to continue</p>
        </div>
      </div>

      <style jsx>{`
        .splash-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url("/Campus.jpg") no-repeat center center;
          background-size: cover;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: transform 0.5s ease-in-out;
          z-index: 1000;
          touch-action: none;
        }

        .overlay {
          background: rgba(0, 0, 0, 0.5); /* Dark overlay for text visibility */
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          color: white;
          text-align: center;
        }

        .transitioning {
          transform: translateY(-100%);
        }

        .splash-content {
          padding: 20px;
        }

        h1 {
          font-size: 2.5rem;
          margin-bottom: 20px;
        }

        p {
          font-size: 1.2rem;
          animation: swipePrompt 2s infinite;
        }

        @keyframes swipePrompt {
          0%, 100% { transform: translateY(0); opacity: 0.8; }
          50% { transform: translateY(-10px); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
