import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";

const socket = io("http://localhost:5000", { auth: { token: localStorage.getItem("token") } });

export default function AdminMap() {
  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY });
  const [markers, setMarkers] = useState({}); // keyed by employeeId
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    // initial load from REST to populate existing employees
    fetch("/api/employees", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }})
      .then(res => res.json())
      .then(data => {
        const map = {};
        data.employees.forEach(emp => {
          if (emp.currentLocation?.lat != null)
            map[emp.employeeId] = emp;
        });
        setMarkers(map);
      });

    socket.on("locationUpdate", (employee) => {
      setMarkers(prev => ({ ...prev, [employee.employeeId]: employee }));
    });

    return () => socket.off("locationUpdate");
  }, []);

  if (!isLoaded) return <div>Loading map...</div>;

  const allPositions = Object.values(markers).map(e => [e.currentLocation.lat, e.currentLocation.lng]);
  const center = allPositions.length ? { lat: allPositions[0][0], lng: allPositions[0][1] } : { lat: 28.7041, lng: 77.1025 };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "70vw", height: "80vh" }}>
        <GoogleMap mapContainerStyle={{ width: "100%", height: "100%" }} center={center} zoom={10}>
          {Object.values(markers).map(emp => (
            <Marker
              key={emp.employeeId}
              position={{ lat: emp.currentLocation.lat, lng: emp.currentLocation.lng }}
              onClick={() => setSelected(emp)}
            />
          ))}

          {selected && (
            <InfoWindow
              position={{ lat: selected.currentLocation.lat, lng: selected.currentLocation.lng }}
              onCloseClick={() => setSelected(null)}
            >
              <div>
                <h4>{selected.name} ({selected.employeeId})</h4>
                <p>Last: {new Date(selected.locationUpdatedAt).toLocaleString()}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>

      <div style={{ width: "30vw", padding: 12 }}>
        <h3>Employees</h3>
        <table>
          <thead><tr><th>ID</th><th>Name</th><th>Last Seen</th></tr></thead>
          <tbody>
            {Object.values(markers).map(emp => (
              <tr key={emp.employeeId}>
                <td>{emp.employeeId}</td>
                <td>{emp.name}</td>
                <td>{new Date(emp.locationUpdatedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
