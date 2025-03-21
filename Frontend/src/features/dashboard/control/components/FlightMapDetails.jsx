import { useState, useRef, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import * as turf from "@turf/turf";
import useTranslations from "../../../../components/Language";


// eslint-disable-next-line react/prop-types
const VideoViewer = ({setVideoView}) => {

    const shipPosition2 = [35.0766977, 129.0921082];
    const waypoints2 = [
    shipPosition2,
    [35.07412700, 129.09210300],
    [35.06839900, 129.08966600],
    [35.06650400, 129.09180900],
    [35.06537000, 129.09309500],
    [35.06336400, 129.09038300],
    [35.06322000, 129.09018100],
    [35.06495500, 129.08833500],
    [35.06657900, 129.08660600],
    [35.06713600, 129.08601300],
    [35.07430900, 129.09176100],
    [35.07669760, 129.09210820],
    [35.0766975, 129.0921080],
    ];
    const line2 = turf.lineString(waypoints2.map(([lat, lng]) => [lng, lat]));

    // State for each video's zoom and position
    const [video1State, setVideo1State] = useState({ scale: 1, x: 0, y: 0 });
    const [video2State, setVideo2State] = useState({ scale: 1, x: 0, y: 0 });

    const videoRefs = [useRef(null), useRef(null)];
    const isDragging = useRef(false);
    const lastPosition = useRef({ x: 0, y: 0 });

    const [dronePosition, setDronePosition] = useState(waypoints2[0]);
    const [rotation, setRotation] = useState(0);
    const [index, setIndex] = useState(0);
    const intervalRef = useRef(null);
    const animationActive = useRef(false);
    const [wayPointsVisible, setWayPointsVisible] = useState(true);
    // const t = useTranslations();

    const droneData = [
        {
          "Drone_ID": "MDT250101VT001",
          "Vessel ID": "??",
          "lat": "35.30054 N",
          "Ion": "148.40883 S", 
          "alt": 426.15,
          "dist_traveled": 56.12,
          "wp_dist": 297.00,
          "dist_to_home": 1402.29,
          "vertical_speed": 0.47,
          "wind_vel": 5.12,
          "airspeed": 27.78,
          "groundspeed": 32.90,
          "roll": 17.43,
          "pitch": -3.75,
          "yaw": 150.00,
          "toh": 42.55,
          "tot": 9.02,
          "time_in_air": 3.52,
          "time_in_air_min_sec": 3.52,
          "gps_hdop": 30.00,
          "battery_voltage": 56.12,
          "battery_current": 8.00,
          "ch3percent": 50,
          "ch3out": 1500.000,
          "ch9out": 1000.000,
          "ch10out": 1000.000,
          "ch11out": 1000.000,
          "ch12out": 1000.000,
          "waypoints": 3
        }
      ];
      
      useEffect(() => {
        // Prevent overlapping animations
        if (animationActive.current) return null;
      
        const moveDrone = () => {
          animationActive.current = true;
          // Stop if we've reached the last waypoint
          if (index >= waypoints2.length - 1) {
            animationActive.current = false;
            return;
          }
      
          const currentIdx = index;
          const nextIdx = index + 1;
          const current = waypoints2[currentIdx];
          const next = waypoints2[nextIdx];
      
          const segment = turf.lineSlice(
            turf.point([current[1], current[0]]),
            turf.point([next[1], next[0]]),
            line2,
          );
          const segmentLength = turf.length(segment, { units: "kilometers" });
          const stepSize = segmentLength / 300; // 300 steps per segment
          let distanceTraveled = 0;
      
          // Calculate rotation once per segment
          const dx = next[1] - current[1];
          const dy = next[0] - current[0];
          let angle = Math.atan2(dx, dy) * (180 / Math.PI);
          angle = (angle + 360) % 360;
          setRotation(angle);
      
          // Start animation
          intervalRef.current = setInterval(() => {
            if (distanceTraveled < segmentLength) {
              distanceTraveled += stepSize;
              const newPosition = turf.along(segment, distanceTraveled, { units: "kilometers" });
              setDronePosition([newPosition.geometry.coordinates[1], newPosition.geometry.coordinates[0]]);
            } else {
              clearInterval(intervalRef.current);
              setIndex((prev) => prev + 1);
              animationActive.current = false; // Allow next segment to start
            }
          }, 100); // 100ms interval for smooth movement
        };
      
        const timeout = setTimeout(moveDrone, 200); // Small delay before starting
      
        // Cleanup
        return () => {
          clearTimeout(timeout);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            animationActive.current = false;
          }
        };
      }, [index]); // Added waypoints to dependency array

      // Custom Drone Icon
      const droneIcon = (rotation) =>
        new L.DivIcon({
          className: "custom-drone-icon",
          html: `<div style="transform: rotate(${rotation}deg);"><img src="droneIcon.png" width="25" height="25"/></div>`,
          iconSize: [25, 25],
          iconAnchor: [12, 12],
        });
      
      // Custom Ship Icon 
      const shipIcon = new L.Icon({
        iconUrl: "shipIcon.png",
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      });
      

    // Handle zoom for each video
    const handleWheelZoom = (event, videoIndex) => {
        event.preventDefault();
        const zoomFactor = 0.1;
        const maxScale = 3;
        const minScale = 1;

        if (videoIndex === 0) {
            setVideo1State((prev) => {
                const newScale = event.deltaY < 0 ? prev.scale + zoomFactor : prev.scale - zoomFactor;
                return { ...prev, scale: Math.max(minScale, Math.min(newScale, maxScale)) };
            });
        } else {
            setVideo2State((prev) => {
                const newScale = event.deltaY < 0 ? prev.scale + zoomFactor : prev.scale - zoomFactor;
                return { ...prev, scale: Math.max(minScale, Math.min(newScale, maxScale)) };
            });
        }
    };

    // Handle dragging (pan) for each video when zoomed in
    const handleMouseDown = (event, videoIndex) => {
        if ((videoIndex === 0 && video1State.scale > 1) || (videoIndex === 1 && video2State.scale > 1)) {
            isDragging.current = { videoIndex, active: true };
            lastPosition.current = { x: event.clientX, y: event.clientY };
        }
    };

    const handleMouseMove = (event) => {
        if (isDragging.current?.active) {
            const videoIndex = isDragging.current.videoIndex;
            const dx = event.clientX - lastPosition.current.x;
            const dy = event.clientY - lastPosition.current.y;

            if (videoIndex === 0) {
                setVideo1State((prev) => ({
                    ...prev,
                    x: prev.x + dx,
                    y: prev.y + dy,
                }));
            } else {
                setVideo2State((prev) => ({
                    ...prev,
                    x: prev.x + dx,
                    y: prev.y + dy,
                }));
            }

            lastPosition.current = { x: event.clientX, y: event.clientY };
        }
    };

    const handleMouseUp = () => {
        isDragging.current = { videoIndex: null, active: false };
    };

    // Reset zoom for a specific video
    const resetZoom = (videoIndex) => {
        if (videoIndex === 0) {
            setVideo1State({ scale: 1, x: 0, y: 0 });
        } else {
            setVideo2State({ scale: 1, x: 0, y: 0 });
        }
    };

    return (
        <div className="w-full h-full absolute z-50 flex flex-col top-0 left-0 font-pretendard bg-white text-white">
            {/* Header */}
            <div className="w-full flex justify-between items-center pt-2 pb-2 pl-4 pr-4 bg-primary bg-opacity-70">
                <div className="w-1 h-1 rounded-full bg-[#4ECC00]"></div>
                <div className="text-sm ">Live Flight Video</div>
                <RxCross2 onClick={() => setVideoView(false)} className="cursor-pointer" />
            </div>

            {/* Video Container */}
            <div className="w-full flex items-center h-1/2 bg-primary">
                {/* Video 1 */}
                <div
                    className="w-1/2 overflow-hidden flex justify-center items-center"
                    onWheel={(e) => handleWheelZoom(e, 0)}
                    onMouseDown={(e) => handleMouseDown(e, 0)}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onDoubleClick={() => resetZoom(0)}
                >
                    <video
                        ref={videoRefs[0]}
                        src="TestVideo2.mp4"
                        autoPlay
                        loop
                        className="cursor-grab w-full h-full"
                        style={{
                            transform: `scale(${video1State.scale}) translate(${video1State.x}px, ${video1State.y}px)`,
                            transition: "transform 0.1s ease-out",
                        }}
                    ></video>
                </div>

                {/* Video 2 */}
                <div
                    className="w-1/2 overflow-hidden flex justify-center items-center"
                    onWheel={(e) => handleWheelZoom(e, 1)}
                    onMouseDown={(e) => handleMouseDown(e, 1)}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onDoubleClick={() => resetZoom(1)}
                >
                    <video
                        ref={videoRefs[1]}
                        src="TestVideo2.mp4"
                        autoPlay
                        loop
                        className="cursor-grab w-full h-full"
                        style={{
                            transform: `scale(${video2State.scale}) translate(${video2State.x}px, ${video2State.y}px)`,
                            transition: "transform 0.1s ease-out",
                        }}
                    ></video>
                </div>
            </div>

            {/* Telemetric data and map */}
            <div className="w-full flex items-center h-1/2">
                {/** Telemetric data */}
                <div className="w-1/2 h-full p-2 flex flex-col gap-2 text-black">
                    <div className="w-full flex justify-center items-center p-2 bg-primary bg-opacity-[8%] rounded-md text-sm font-semibold">Flight Info</div>
                    
                    <div className="w-full flex flex-wrap mr-2 justify-start items-center text-sm">
                        {Object.entries(droneData[0]).map(([key, value]) => (
                            <div key={key} className="w-1/3 flex items-center p-2 justify-between border-b-0.5">
                                <div className="font-semibold">{key}:</div>
                                <div>{value}</div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Map */}
        <MapContainer
            center={waypoints2[1]}
            zoom={16}
            className="z-0 w-1/2 h-full"
            zoomControl={false}
      >
        <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker 
                  position={dronePosition} 
                  icon={droneIcon(rotation)} 
                  eventHandlers={{
                    mouseover: (e) => e.target.openPopup(),
                    mouseout: (e) => e.target.closePopup(),
                  }}>
                  <Popup>ID: MDT250101VT001</Popup>
                </Marker>
        <Marker
          position={shipPosition2}
          icon={shipIcon}
        />
        {wayPointsVisible &&<Polyline positions={waypoints2} color="#111111" opacity={0.5} weight={2} dashArray="5, 10"/>}
        
      </MapContainer>

            </div>

        </div>
    );
};

export default VideoViewer;
