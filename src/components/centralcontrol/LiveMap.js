/**
 * Created by Nadeesh Perera - 2023-03-02
 *
 *
 */
import React, { useState, useEffect, useRef } from "react";
import Map from "./../../components/map/LiveMapLocation";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import truckIconGreen from "./../../assets/icons/truckicon (3).png";
import truckIconYellow from "./../../assets/icons/truckicon (4).png";
import truckIconOrange from "./../../assets/icons/truckicon (5).png";
import truckIconPurple from "./../../assets/icons/truckicon (6).png";
import MarkerDetails from "../map/MarkerDetails";

//Firebase configuyration for the live Apllication
// var firebaseConfig = {
//   apiKey: "AIzaSyDPYQiGcw5NsuBsf3LPgMapPtIYJXta-Fk",
//   authDomain: "eqtruckapp.firebaseio.com",
//   // The value of `databaseURL` depaends on the location of the database
//   databaseURL: "https://eqtruckapp.firebaseio.com",
//   projectId: "eqtruckapp",
//   storageBucket: "eqtruckapp.appspot.com",
//   messagingSenderId: "SENDER_ID",
//   appId: "APP_ID",
//   // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
//   measurementId: "G-MEASUREMENT_ID",
// };

// Firebase con figuration for the test application
var firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "eqtruckapp-b99f2.firebaseio.com",
  // The value of `databaseURL` depends on the location of the database
  databaseURL: "https://eqtruckapp-b99f2-default-rtdb.firebaseio.com",
  projectId: "eqtruckapp-b99f2",
  storageBucket: "eqtruckapp-b99f2.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
  // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
  measurementId: "G-MEASUREMENT_ID",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
// const zoom = 10.5;

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0, 0, 0, 0.7)",
  zIndex: 9999999,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const MainparentContainerStyle = {
  height: "100%",
};
const LiveMap = () => {
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [center, setCenter] = useState([]);

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isMapOverlayed, setIsMapOverlayed] = useState(false);
  const isFirstRender = useRef(true);
  const isCenterSet = useRef(false);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setIsMapOverlayed(true);
  };

  const handleOverlayClick = (event) => {
    // Check if the clicked element is the overlay or its child elements
    if (event.target === event.currentTarget) {
      setSelectedMarker(null);
      setIsMapOverlayed(false);
    }
  };

  useEffect(() => {
    try {
      const dbRef = ref(database, "location/trucks");

      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        const newMarkers = [];
        const ico = [];

        const latc = [];
        const lonc = [];

        for (let key in data) {
          //const position = data[key].split(',');
          const position = data[key].location
            ? data[key].location.split(",")
            : null;
          const truckComplete = data[key].iscomplete
            ? data[key].iscomplete
            : null;
          const origin = data[key].origin ? data[key].origin.split(",") : null;
          const arriveStatus = data[key].status;

          const setcenterlatlng = {
            lat: origin && origin.length > 0 ? parseFloat(origin[0]) : 0,
            lng: origin && origin.length > 1 ? parseFloat(origin[1]) : 0,
          };
          const latLng = {
            lat: position && position.length > 0 ? parseFloat(position[0]) : 0,
            lng: position && position.length > 1 ? parseFloat(position[1]) : 0,
          };

          // latc.push(latLng.lat);
          // lonc.push(latLng.lng);
          if (truckComplete == "no") {
            latc.push(setcenterlatlng.lat);
            lonc.push(setcenterlatlng.lng);
          }

          let ico = {
            url: "",
            scaledSize: { width: 60, height: 60 },
          };
          /**
           * 0 = start on the way to quarry : driver accepted
           * 1 = arrived at  : loading
           * 2 = picked up load and way to customer : travreling
           * 3 = Arrived at customer location : arrived
           * 4 = completed
           *
           */

          let titledata = "";
          if (arriveStatus === 0) {
            ico.url = truckIconOrange;
            titledata = "Driver Accepted";
          } else if (arriveStatus === 1) {
            ico.url = truckIconYellow;
            titledata = "Loading";
          } else if (arriveStatus === 2) {
            ico.url = truckIconPurple;
            titledata = "Travelling";
          } else if (arriveStatus === 3) {
            ico.url = truckIconGreen;
            titledata = "Arrived";
          } else if (arriveStatus === 4) {
            ico.url = truckIconGreen;
            titledata = "Completed";
          }

          if (truckComplete == "no") {
            newMarkers.push({
              id: key,
              position: latLng,
              icon: ico,
              title: titledata,
            });
          } else {
          }
        }
        latc.push(-37.818996453901136);
        lonc.push(144.95724954021048);
        setMarkers(newMarkers);
        setLoading(false);
        const averageLatitude =
          latc.reduce((total, lat) => total + lat, 0) / latc.length;
        const averageLongitude =
          lonc.reduce((total, lng) => total + lng, 0) / lonc.length;
        if (isFirstRender.current || !isCenterSet.current) {
          setCenter({ lat: averageLatitude, lng: averageLongitude });
          isCenterSet.current = true;
        }
        if (isFirstRender.current) {
          isFirstRender.current = false;
        }
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <CCard>
      <CCardHeader className="headerEQ slideInLeft">ESQ Live Map</CCardHeader>
      <CCardBody className="slideIn">
        <div style={MainparentContainerStyle}>
          <Map markers={markers} center={center} />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", overflowX: "auto" }}>
              {markers.map((marker) => (
                <div
                  key={marker.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginRight: "5px",
                    padding: "10px",
                  }}
                >
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                      cursor: "pointer",
                    }}
                    onClick={() => setSelectedMarker(marker)}
                  >
                    <img
                      src={marker.icon.url}
                      alt={marker.title}
                      style={{ width: "100%", height: "100%", padding: "5px" }}
                    />
                  </div>
                  <span
                    style={{
                      marginTop: "5px",
                      fontStyle: "bold",
                      fontWeight: "600",
                    }}
                    title={marker.id}
                  >
                    {marker.id}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {selectedMarker && (
            <div style={overlayStyle} onClick={handleOverlayClick}>
              <MarkerDetails
                truckId={selectedMarker.id}
                onClose={() => setSelectedMarker(null)}
              />
            </div>
          )}
        </div>
      </CCardBody>
    </CCard>
  );
};

export default LiveMap;
