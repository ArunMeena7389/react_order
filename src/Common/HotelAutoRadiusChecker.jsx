// HotelAutoRadiusChecker.js
import React, { useEffect, useState } from "react";

function HotelAutoRadiusChecker() {
  const [hotelLocation] = useState({ lat: 23.02935, lng: 72.53524 }); // static hotel location
  const [customerLocation, setCustomerLocation] = useState(null);
  const [samples, setSamples] = useState([]);
  const [result, setResult] = useState("");

  const toRad = (x) => (x * Math.PI) / 180;

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371000;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          setSamples((prev) => {
            const updated = [
              ...prev,
              { lat: pos.coords.latitude, lng: pos.coords.longitude },
            ];
            if (updated.length > 5) updated.shift(); // keep last 5 readings
            return updated;
          });
        },
        (err) => alert(err.message),
        { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  // Average readings
  useEffect(() => {
    if (samples.length) {
      const avgLat = samples.reduce((s, v) => s + v.lat, 0) / samples.length;
      const avgLng = samples.reduce((s, v) => s + v.lng, 0) / samples.length;
      setCustomerLocation({ lat: avgLat, lng: avgLng });
    }
  }, [samples]);

  // Calculate distance and check radius
  useEffect(() => {
    if (hotelLocation && customerLocation) {
      const distance = getDistance(
        customerLocation.lat,
        customerLocation.lng,
        hotelLocation.lat,
        hotelLocation.lng
      );
      setResult(distance <= 250 ? "✅ Inside 200m (with buffer)" : "❌ Outside 200m");
    }
  }, [hotelLocation, customerLocation]);

  return (
    <div>
      <h3>Hotel Radius Checker</h3>
      {hotelLocation && (
        <p>
          Hotel: {hotelLocation.lat.toFixed(5)}, {hotelLocation.lng.toFixed(5)}
        </p>
      )}
      {customerLocation && (
        <p>
          Customer: {customerLocation.lat.toFixed(5)}, {customerLocation.lng.toFixed(5)}
        </p>
      )}
      {result && <p>{result}</p>}
    </div>
  );
}

export default HotelAutoRadiusChecker;
