import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import TopBar from "../../components/TopBar";
import { RxCross2 } from "react-icons/rx";
import { IoInformationCircle } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import FlightMapDetails from "./FlightMapDetails";
import { IoMdSearch } from "react-icons/io";
import useTranslations from "../../../../components/Language";

const shipIcon = new L.Icon({
  iconUrl: "shipIcon.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const RealTimeInfo = () => {
  const [ships, setShips] = useState([]);
  const [drones, setDrones] = useState({});
  const reconnectInterval = useRef(null);

  const droneIcon = (rotation) =>
    new L.DivIcon({
      className: "custom-drone-icon",
      html: `<div style="transform: rotate(${rotation}deg);"><img src="droneIcon.png" width="40" height="40"/></div>`,
      iconSize: [25, 25],
    });

  const ws = useRef(null);

  useEffect(() => {
    const connectWebSocket = () => {
      console.log("Attempting WebSocket connection...");
      const wsUrl = process.env.REACT_APP_WS_URL || "ws://52.78.238.179:8080/telemetry";
      ws.current = new WebSocket(wsUrl);

      ws.current.onopen = () => {
        console.log("WebSocket connected.");
        if (reconnectInterval.current) {
          clearInterval(reconnectInterval.current);
          reconnectInterval.current = null;
        }
      };

      ws.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.drones && Array.isArray(data.drones)) {
            const updatedDrones = {};
            data.drones.forEach((drone) => {
              drone.waypoints = Array.isArray(drone.waypoints) ? drone.waypoints : [];
              updatedDrones[drone.GCS_IP] = drone;
            });
            setDrones(updatedDrones);
            console.log(updatedDrones);
          } else {
            console.warn("Invalid WebSocket data:", data);
          }
        } catch (error) {
          console.error("Error parsing WebSocket data:", error);
        }
      };

      ws.current.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      ws.current.onclose = () => {
        console.warn("WebSocket disconnected, retrying...");
        if (!reconnectInterval.current) {
          reconnectInterval.current = setInterval(connectWebSocket, 5000);
        }
      };
    };

    connectWebSocket();

    return () => {
      if (ws.current) ws.current.close();
      if (reconnectInterval.current) clearInterval(reconnectInterval.current);
    };
  }, []);

  const [videoView, setVideoView] = useState(false);
  const [shipDetails, setShipDetails] = useState(false);
  const [wayPointsVisible, setWayPointsVisible] = useState(false);
  const searchRef = useRef(null);
  const t = useTranslations();

  const shipData = [
    {
      Vessel: "Serena Ver.2",
      [t.captain]: "name",
      [t.country]: "KOREA",
      Mate: "name",
      IMO: "MDT-V290",
      "Call Sign": "SXZB",
      MMSI: "MDT-V290",
      Yield: "300t",
      Latitude: "35.30054 N",
      Longitude: "148.40883 S",
    },
  ];

  const droneData = [
    {
      Model: "MDT-V290",
      "Serial No": "name",
      "Drone ID": "123DFSEW34",
      "Call Sign": "SXZB",
    },
    {
      Model: "MDT-V290",
      "Serial No": "name",
      "Drone ID": "456GHJK89",
      "Call Sign": "SXZB",
    },
  ];

  return (
    <div className="w-full relative flex flex-col min-h-screen">
      <div className="absolute top-0 left-0 w-full bg-transparent z-40 flex flex-col gap-2 p-3">
        <TopBar />
      </div>

      {shipDetails && (
        <div className="absolute top-[70px] left-7 w-1/5 h-5/6 bg-white z-40 flex flex-col rounded-md shadow-md overflow-y-scroll no-scrollbar cursor-grabbing">
          <div className="w-full pt-1 pb-1 pl-3 pr-3 flex justify-between items-center bg-transparent shadow-md">
            <span className="font-semibold">Serena ver.2</span>
            <RxCross2 onClick={() => setShipDetails(!shipDetails)} className="cursor-pointer" />
          </div>
          <div className="w-full object-contain">
            <img src="shipImage_example.jpg" alt="Ship Image" className="w-full h-36" />
          </div>
          <div className="w-full flex pt-1 pb-1 pl-3 flex-col">
            <div className="w-full flex items-end justify-start gap-1">
              <div className="flex justify-center items-center text-[16px] text-center font-semibold">Vessels Info</div>
              <IoInformationCircle size={"20px"} className="text-gray-400" />
            </div>
            <div className="w-full flex flex-wrap mt-2 border-b-0.5 text-[14px]">
              {Object.entries(shipData[0]).map(([key, value]) => (
                <div className="w-1/2 flex flex-col mb-2" key={key}>
                  <div className="w-full flex items-center text-[12px] text-gray-500">{key}</div>
                  <div className="w-full flex items-center font-semibold">{value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full flex pt-1 pb-1 pl-3 flex-col">
            <div className="w-full flex items-end justify-start gap-1">
              <div className="flex justify-center items-center text-[16px] text-center font-semibold">Drone Info</div>
              <IoInformationCircle size={"20px"} className="text-gray-400" />
            </div>
            <div className="w-full flex flex-wrap mt-2 border-b-0.5 text-[14px]">
              {Object.entries(droneData[0]).map(([key, value]) => (
                <div className="w-1/2 flex flex-col mb-2" key={key}>
                  <div className="w-full flex items-center text-[12px] text-gray-500">{key}</div>
                  <div className="w-full flex items-center font-semibold">{value}</div>
                </div>
              ))}
              {Object.entries(droneData[1]).map(([key, value]) => (
                <div className="w-1/2 flex flex-col mb-2" key={key}>
                  <div className="w-full flex items-center text-[12px] text-gray-500">{key}</div>
                  <div className="w-full flex items-center font-semibold">{value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full flex pt-1 pb-1 pl-3 flex-col">
            <div className="w-full flex items-end justify-start gap-1">
              <div className="flex justify-center items-center text-[16px] text-center font-semibold">Pilot Info</div>
            </div>
            <div className="w-full flex flex-col flex-wrap mt-2 text-[14px]">
              <div className="w-full flex mb-2">
                <div className="w-1/2 flex items-center text-[12px] text-gray-500">Internal pilot</div>
                <div className="w-1/2 flex justify-center items-center font-semibold gap-1">
                  <img src="dronePilotExample.jpg" alt="Pilot Image" className="w-7 h-7 rounded-full object-contain border-0.5" />
                  <span className="font-semibold">name</span>
                  <IoInformationCircle size={"15px"} className="text-gray-400" />
                </div>
              </div>
              <div className="w-full flex mb-2">
                <div className="w-1/2 flex items-center text-[12px] text-gray-500">Outside pilot</div>
                <div className="w-1/2 flex justify-center items-center font-semibold gap-1">
                  <img src="dronePilotExample.jpg" alt="Pilot Image" className="w-7 h-7 rounded-full object-contain border-0.5" />
                  <span className="font-semibold">name</span>
                  <IoInformationCircle size={"15px"} className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex pt-1 pb-1 pl-3 pr-3 gap-2 mt-3 mb-3">
            <button
              className="flex justify-center items-center w-1/2 bg-[#3B5BDC] bg-opacity-[8%] text-white rounded-md pl-4 pr-4 pt-2 pb-2 gap-3"
              onClick={() => setVideoView(true)}
            >
              <img src="videoIcon.png" alt="" className="w-6 h-6" />
              <span className="text-primary font-semibold">{t.video}</span>
            </button>
            <button
              className="flex justify-center items-center w-1/2 bg-[#3B5BDC] bg-opacity-[8%] text-white rounded-md pl-4 pr-4 pt-2 pb-2 gap-3"
              onClick={() => setWayPointsVisible(!wayPointsVisible)}
            >
              <img src="compassIcon.png" alt="" className="w-6 h-6" />
              <span className="text-primary font-semibold">{t.wayPoints}</span>
            </button>
          </div>
        </div>
      )}

      <div className="absolute top-[70px] right-3 w-[370px] bg-white z-40 flex justify-between items-center rounded-md shadow-lg pl-1 pt-1 pb-1">
        <input type="text" placeholder={t.quickSearch} className="p-2 rounded-sm bg-transparent text-sm w-5/6" ref={searchRef} />
        <IoMdSearch className="w-1/6 text-2xl text-[#767676] cursor-pointer" onClick={() => searchRef.current.focus()} />
      </div>

      <div className="w-full flex-1 relative">
        <MapContainer center={[35.0767, 129.0921]} zoom={13} style={{ height: "100vh", width: "100%" }} className="z-0 w-full h-full" zoomControl={false} trackResize={true}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {Object.values(drones).map((drone) => (
            <div key={drone.GCS_IP}>
              <Marker
                position={[drone.lat, drone.lon]}
                icon={droneIcon(drone.yaw)}
              >
                <Popup>
                  <div>
                    <strong>Drone ID:</strong> {drone.droneId || drone.system_id || "Unknown"} <br />
                    <strong>GCS IP:</strong> {drone.GCS_IP || "N/A"} <br />
                    <strong>Latitude:</strong> {drone.lat ? drone.lat.toFixed(5) : "N/A"} <br />
                    <strong>Longitude:</strong> {drone.lon ? drone.lon.toFixed(5) : "N/A"} <br />
                    <strong>Altitude:</strong> {drone.alt ? drone.alt.toFixed(1) : "N/A"} m <br />
                    <strong>Airspeed:</strong> {drone.airspeed ? drone.airspeed.toFixed(2) : "N/A"} m/s <br />
                    <strong>Ground Speed:</strong> {drone.ground_speed ? drone.ground_speed.toFixed(2) : "N/A"} m/s <br />
                    <strong>Vertical Speed:</strong> {drone.vertical_speed ? drone.vertical_speed.toFixed(2) : "N/A"} m/s <br />
                    <strong>Battery Voltage:</strong> {drone.battery_voltage ? drone.battery_voltage.toFixed(1) : "N/A"} V <br />
                    <strong>Battery Current:</strong> {drone.battery_current ? drone.battery_current.toFixed(1) : "N/A"} A <br />
                    <strong>Distance to Home:</strong> {drone.dist_to_home ? drone.dist_to_home.toFixed(0) : "N/A"} m <br />
                    <strong>Distance Traveled:</strong> {drone.dist_traveled || "N/A"} m <br />
                    <strong>Waypoint Distance:</strong> {drone.wp_dist || "N/A"} m <br />
                    <strong>GPS HDOP:</strong> {drone.gps_hdop ? drone.gps_hdop.toFixed(2) : "N/A"} <br />
                    <strong>Roll:</strong> {drone.roll || "N/A"}° <br />
                    <strong>Pitch:</strong> {drone.pitch || "N/A"}° <br />
                    <strong>Yaw:</strong> {drone.yaw || "N/A"}° <br />
                    <strong>Wind Velocity:</strong> {drone.wind_vel ? drone.wind_vel.toFixed(2) : "N/A"} m/s <br />
                    <strong>Time in Air:</strong> {drone.time_in_air || "N/A"} s <br />
                    <strong>Timestamp:</strong> {drone.timestamp || "N/A"} <br />
                  </div>
                </Popup>
              </Marker>
              {drone.waypoints && drone.waypoints.length > 0 && (
                <Polyline
                  positions={drone.waypoints.map((waypoint) => [waypoint.lat, waypoint.lon])}
                  color="red"
                  opacity={0.5}
                  weight={2}
                  dashArray="5, 10"
                />
              )}
            </div>
          ))}
        </MapContainer>
      </div>

      {videoView && <FlightMapDetails videoView={videoView} setVideoView={setVideoView} />}
    </div>
  );
};

export default RealTimeInfo;