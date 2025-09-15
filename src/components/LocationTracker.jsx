import { useEffect } from "react";
import { io } from "socket.io-client";

const LocationTracker = ({ userId }) => {
  const token = localStorage.getItem("token");

  useEffect(() => {
    // ✅ Socket.IO connect
    const socket = io("https://ruwa-backend.onrender.com", {
      auth: { token },
    });

    // Register employee online
    socket.emit("register", userId);

    if (!navigator.geolocation) {
      console.log("❌ Geolocation not supported");
      return;
    }

    // Watch position continuously
    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // ✅ API call to backend
          const res = await fetch("https://ruwa-backend.onrender.com/api/location/update-location", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
              lat: latitude,
              lng: longitude,
            }),
          });

          const data = await res.json();
          if (!res.ok) {
            console.error("❌ Location update failed:", data.message);
          } else {
            console.log("✅ Location updated:", data);
          }
        } catch (error) {
          console.error("🚨 Fetch error:", error);
        }
      },
      (error) => {
        console.error("⚠️ Geolocation error:", error);
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 20000 }
    );

    // Cleanup on unmount
    return () => {
      navigator.geolocation.clearWatch(watchId);
      socket.disconnect(); // ✅ Disconnect socket when employee logs out / closes app
    };
  }, [userId, token]);

  return null;
};

export default LocationTracker;
