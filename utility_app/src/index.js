import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <App />
  /* </React.StrictMode> */
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
      navigator.serviceWorker.register("/service-worker.js")
          .then((reg) => console.log("Service Worker registered!", reg))
          .catch((err) => console.log("Service Worker registration failed!", err));
  });
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((reg) => reg.update()); // Forces update
  });
}



reportWebVitals();
