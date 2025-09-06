// HotelAutoRadiusChecker.js
import React, { useEffect, useState } from "react";

function HotelAutoRadiusChecker() {
  const [hotelLocation, setHotelLocation] = useState(null);
  const [customerLocation, setCustomerLocation] = useState(null);
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
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setHotelLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setCustomerLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        (err) => alert(err.message)
      );
    }
  }, []);

  useEffect(() => {
    if (hotelLocation && customerLocation) {
      const distance = getDistance(
        customerLocation.lat,
        customerLocation.lng,
        hotelLocation.lat,
        hotelLocation.lng
      );
      setResult(distance <= 200 ? "✅ Inside 200m" : "❌ Outside 200m");
    }
  }, [hotelLocation, customerLocation]);

  return (
    <div>
      <h3>Hotel Radius Checker</h3>
      {hotelLocation && <p>Hotel: {hotelLocation.lat}, {hotelLocation.lng}</p>}
      {customerLocation && <p>Customer: {customerLocation.lat}, {customerLocation.lng}</p>}
      {result && <p>{result}</p>}
    </div>
  );
}

export default HotelAutoRadiusChecker; // ✅ default export
