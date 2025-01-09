/**
 * Created by Nadeesh Perera - 2023-03-02
 *
 *
 */
import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
//import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import firebase from "firebase/firebase-compat";
import "firebase/firebase-firestore-compat";

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CRow,
} from "@coreui/react";

import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import LinearProgress from "@material-ui/core/LinearProgress";

import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import RouteHistoryPopup from "../map/RouteHistoryPopup";
import TruckRouteReport from "./Tables_CC/TruckRouteReport";

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

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

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
  borderRadius:"8px"
};

const MainparentContainerStyle = {
  height: "60vh",
  marginTop: "50px",
};

const center = {
  lat: -37.76646,
  lng: 144.81579,
};
const transparentIcon = {
  url: "https://www.iconspng.com/image/46460/basic-rectangle",
  scaledSize: { width: 10, height: 30 }, // Set the icon size to [0, 0]
};

const TruckRouteHistory = () => {
  const [data, setData] = useState([]);
  const [locations, setLocations] = useState([]);
  const [points, setPoints] = useState([]);
  const [lastCoordinate, setlastCoordinate] = useState([]);
  const [firstCordinate, setfirstCordinate] = useState([]);
  const [locationArrays, setLocationArrays] = useState([]);
  const [startEndCoordinates, setStartEndCoordinates] = useState([]);
  const [tooltipDetails, settooltipDetails] = useState([]);
  const [details, setDetails] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isMapOverlayed, setIsMapOverlayed] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState({});
  const [selectedPolyline, setSelectedPolyline] = useState(null);
  const [mapKey, setMapKey] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const [totalDistance, settotalDistance] = useState("");
  const [allDistance, setallDistance] = useState("");
  const [popupisloading, setpopupisloading] = useState(false);
  //report
  const [isMapOverlayedReport, setIsMapOverlayedReport] = useState(null);
  //inputs fields
  const [date, setDate] = useState("");
  const [driverCode, setDriverCode] = useState("");
  const [docketNo, setDocketNo] = useState("");
  const TodayDate = moment().format("YYYY-MM-DD");
  // user input fields functions
  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const minimumDate = new Date("2023-08-01");
    const TodayDate = new Date(moment().format("YYYY-MM-DD"));

    if (selectedDate < minimumDate) {
      // Show an alert or any other user feedback
      alert("Please select a date on or after 1st August 2023");
      setDate("");
    } else if (selectedDate > TodayDate) {
      alert(
        "'Date' should not exceed today's date. Please select a valid date"
      );
      setDate("");
    } else {
      // Set the selected date in the state
      setDate(selectedDate.toISOString().slice(0, 10));
    }
  };

  const handleDriverCodeChange = (event) => {
    // setDriverCode(event.target.value);
    const inputValue = event.target.value;
    const uppercaseValue = inputValue.toUpperCase();
    setDriverCode(uppercaseValue);
  };

  const handleDocketNoChange = (event) => {
    setDocketNo(event.target.value);
  };

  const handleGoButtonClick = () => {
    setLoading(true); //
    if (driverCode == "" || date == "") {
      alert("Date and Driver code cannot be empty ");
    } else {
      if (docketNo == "") {
        setMapKey((prevKey) => prevKey + 1);
        setLocationArrays([]);
        setPoints([]);
        setallDistance("");
        setCount(0);
        settotalDistance(0);
        setStartEndCoordinates([]);
        setSelectedPolyline([]);
        fetchLocationArray(date, driverCode);
      } else {
        setMapKey((prevKey) => prevKey + 1);
        setLocationArrays([]);
        setPoints([]);
        setallDistance("");
        setCount(0);
        settotalDistance(0);
        setStartEndCoordinates([]);
        setSelectedPolyline([]);

        fetchLocationArrayByAll(driverCode, date, docketNo);
      }
    }
    // setLoading(false);
  };

  // fetchlocationarray and fetchlocationarraybyall are used to fetch data from the firebase firestore
  async function fetchLocationArray(date, driverCode) {
    // if user input only date and driver code

    const querySnapshot = await firestore
      .collection("drivers")
      .where("drivercode", "==", driverCode)
      .get();
    const newLocationArrays = [];
    const OrderDetailArray = [];
    querySnapshot.forEach((driverDoc) => {
      const ordersRef = driverDoc.ref.collection("orders");
      let orderCount = 0;
      //truckcode //drivercode
      ordersRef
        .where("date", "==", date)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((orderDoc) => {
            orderCount++;
            const locationArray = orderDoc.data().location;
            setLocations(locationArray);
            if (locationArray) {
              //Check if location array exists

              newLocationArrays.push(locationArray);
              OrderDetailArray.push([
                orderDoc.id,
                convertFirestoreTimestampToHHmm(orderDoc.data().arrivalTimeSup),
                convertFirestoreTimestampToHHmm(orderDoc.data().pickupTimeSup),
                orderDoc.data().arrivalGeoSup,
                orderDoc.data().pickupGeoSup,
                orderDoc.data().truckcode,
                orderDoc.data().arrivalGeoCust,
                convertFirestoreTimestampToHHmm(
                  orderDoc.data().arrivalTimeCust
                ),
                convertFirestoreTimestampToHHmm(
                  orderDoc.data().completeTimeCust
                ),
                orderDoc.data().completeGeoCust,
                convertFirestoreTimestampToHHmm(orderDoc.data().breaktimeStart),
                convertFirestoreTimestampToHHmm(
                  orderDoc.data().breaktimeFinish
                ),
                convertFirestoreTimestampToHHmm(
                  orderDoc.data().breaktimeStartCust
                ),
                convertFirestoreTimestampToHHmm(
                  orderDoc.data().breaktimeFinishCust
                ),
                convertFirestoreTimestampToHHmm(
                  orderDoc.data().breaktimeStartSup
                ),
                convertFirestoreTimestampToHHmm(
                  orderDoc.data().breaktimeFinishSup
                ),
                orderDoc.data().jobno,
              ]);
              //  }

              setCount(orderCount);
              settooltipDetails(OrderDetailArray);
            }
            // arrivalTime ,pickupTime
          });

          setLocationArrays((prevLocationArrays) =>
            prevLocationArrays.concat(newLocationArrays)
          );
        })

        .catch((error) => {
          console.error("Error getting orders:", error);
          setLoading(false);
        });
    });
  }
  // Function to convert Firestore timestamp to formatted time (HH:mm)
  function convertFirestoreTimestampToHHmm(timestamp) {
    if (!timestamp || !timestamp.seconds) {
      return "N/A";
    }

    const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}.${minutes}`;
  }

  async function fetchLocationArrayByAll(driverCode, date, docketNo) {
    const querySnapshot = await firestore
      .collection("drivers")
      .where("drivercode", "==", driverCode)
      .get();
    const newLocationArrays = [];
    const OrderDetailArray = [];
    querySnapshot.forEach((driverDoc) => {
      const ordersRef = driverDoc.ref.collection("orders");
      let orderCount = 0;
      ordersRef
        .where("date", "==", date)
        .where(firebase.firestore.FieldPath.documentId(), "==", docketNo)
        .get()
        .then((querySnapshot) => {
          // Iterate over the query snapshot to find the matching order document
          querySnapshot.forEach((orderDoc) => {
            orderCount++;
            const locationArray = orderDoc.data().location;
            // if (locationArray) {
            // setLocations(locationArray);
            newLocationArrays.push(locationArray);
            OrderDetailArray.push([
              orderDoc.id,
              convertFirestoreTimestampToHHmm(orderDoc.data().arrivalTimeSup),
              convertFirestoreTimestampToHHmm(orderDoc.data().pickupTimeSup),
              orderDoc.data().arrivalGeoSup,
              orderDoc.data().pickupGeoSup,
              orderDoc.data().truckcode,
              orderDoc.data().arrivalGeoCust,
              convertFirestoreTimestampToHHmm(orderDoc.data().arrivalTimeCust),
              convertFirestoreTimestampToHHmm(orderDoc.data().completeTimeCust),
              orderDoc.data().completeGeoCust,
              convertFirestoreTimestampToHHmm(orderDoc.data().breaktimeStart),
              convertFirestoreTimestampToHHmm(orderDoc.data().breaktimeFinish),
              convertFirestoreTimestampToHHmm(
                orderDoc.data().breaktimeStartCust
              ),
              convertFirestoreTimestampToHHmm(
                orderDoc.data().breaktimeFinishCust
              ),
              convertFirestoreTimestampToHHmm(
                orderDoc.data().breaktimeStartSup
              ),
              convertFirestoreTimestampToHHmm(
                orderDoc.data().breaktimeFinishSup
              ),
              orderDoc.data().jobno,
            ]);
            //  }

            setCount(orderCount);
            settooltipDetails(OrderDetailArray);
          });
          setLocationArrays((prevLocationArrays) =>
            prevLocationArrays.concat(newLocationArrays)
          );
        })
        .catch((error) => {
          console.error("Error getting orders:", error);
        });
      setLoading(false);
    });
  }

  setTimeout(() => {
    setLoading(false); // Set loading to false once the task is completed
  }, 2000);

  // const points = coordinates;
  useEffect(() => {
    const paths = locationArrays.map((locations) => {
      // map coordinates
      if (locations) {
        const coordinates = locations.map((result) => ({
          lat: result._lat,
          lng: result._long,
        }));

        return coordinates;
      }

      return []; // Return an empty array if locations is null/undefined
    });

    if (paths.length === 0) {
      // Display a message to the user

      console.log("No locations found.");
      // setLoading(false);
    } else {
      // Set the paths and continue with the rest of your code

      setPoints(paths);
      // setLoading(false);
      //  setPoints(paths);
    }

    const startEndCoordinates = paths.map((path) => {
      let latSum = 0;
      let lngSum = 0;

      for (const coordinate of path) {
        latSum += coordinate.lat;
        lngSum += coordinate.lng;
      }

      const middlepoint = {
        // to set the dockect number to the middle of the path  need to get the  middlepoint
        lat: latSum / path.length,
        lng: lngSum / path.length,
      };

      return {
        start: path[0],
        middlepoint: middlepoint,
        end: path[path.length - 1],
      };
    });

    const normalizedDetails = tooltipDetails.map((details) => {
      const arrivalTime = details[1];
      const pickupTime = details[2];
      const arrivalTimeCust = details[7];
      const completeTimeCust = details[8];
      const breaktimeStartSup = details[14];
      const breaktimeFinishSup = details[15];

      const arrivalTimeParts = arrivalTime?.split(".");
      const pickupTimeParts = pickupTime?.split(".");
      const arrivalTimeCustparts = arrivalTimeCust?.split(".");
      const completeTimeCustparts = completeTimeCust?.split(".");
      const breaktimeStartSupParts = breaktimeStartSup?.split(".");
      const breaktimeFinishSupParts = breaktimeFinishSup?.split(".");

      if (
        (arrivalTimeParts?.length === 2 &&
          pickupTimeParts?.length === 2 &&
          !isNaN(arrivalTimeParts[0]) &&
          !isNaN(arrivalTimeParts[1])) ||
        (arrivalTimeCustparts?.length === 2 &&
          completeTimeCustparts?.length === 2 &&
          !isNaN(arrivalTimeCustparts[0]) &&
          !isNaN(arrivalTimeCustparts[1])) ||
        (breaktimeStartSupParts?.length === 2 &&
          breaktimeFinishSupParts?.length === 2 &&
          !isNaN(breaktimeStartSupParts[0]) &&
          !isNaN(breaktimeStartSupParts[1]) &&
          !isNaN(breaktimeFinishSupParts[0]) &&
          !isNaN(breaktimeFinishSupParts[1]))
      ) {
        // Perform calculations using the split parts here
        // Calculate waiting time for the supplier
        let waitingHours = 0;
        let waitingMinutes = 0;

        if (arrivalTimeParts && pickupTimeParts) {
          const arrivalHours = parseInt(arrivalTimeParts[0], 10);
          const arrivalMinutes = parseInt(arrivalTimeParts[1], 10);
          let pickupHours = parseInt(pickupTimeParts[0], 10);
          const pickupMinutes = parseInt(pickupTimeParts[1], 10);

          if (
            pickupHours < arrivalHours ||
            (pickupHours === arrivalHours && pickupMinutes < arrivalMinutes)
          ) {
            pickupHours += 24; // Assume pickup time is in the next day
          }

          waitingHours = pickupHours - arrivalHours;
          waitingMinutes = pickupMinutes - arrivalMinutes;

          // Adjust waiting minutes and hours if negative
          if (waitingMinutes < 0) {
            waitingMinutes += 60;
            waitingHours--;
          }
        }

        // Calculate waiting time for the customer
        let waitingHoursCust = 0;
        let waitingMinutesCust = 0;

        if (arrivalTimeCustparts && completeTimeCustparts) {
          const arrivalHoursCust = parseInt(arrivalTimeCustparts[0], 10);
          const arrivalMinutesCust = parseInt(arrivalTimeCustparts[1], 10);
          const completeHoursCust = parseInt(completeTimeCustparts[0], 10);
          const completeMinutesCust = parseInt(completeTimeCustparts[1], 10);

          if (
            completeHoursCust < arrivalHoursCust ||
            (completeHoursCust === arrivalHoursCust &&
              completeMinutesCust < arrivalMinutesCust)
          ) {
            completeHoursCust += 24; // Assume complete time is in the next day
          }

          waitingHoursCust = completeHoursCust - arrivalHoursCust;
          waitingMinutesCust = completeMinutesCust - arrivalMinutesCust;

          // Adjust waiting minutes and hours if negative
          if (waitingMinutesCust < 0) {
            waitingMinutesCust += 60;
            waitingHoursCust--;
          }
        }

        // Calculate break time for the supplier
        let newbreakHours = 0;
        let newbreakMinutes = 0;

        if (breaktimeStartSupParts && breaktimeFinishSupParts) {
          const breaktimeStartSupHours = parseInt(
            breaktimeStartSupParts[0],
            10
          );
          const breaktimeStartSupMinutes = parseInt(
            breaktimeStartSupParts[1],
            10
          );
          const breaktimeFinishSupHours = parseInt(
            breaktimeFinishSupParts[0],
            10
          );
          const breaktimeFinishSupMinutes = parseInt(
            breaktimeFinishSupParts[1],
            10
          );

          if (
            breaktimeFinishSupHours < breaktimeStartSupHours ||
            (breaktimeFinishSupHours === breaktimeStartSupHours &&
              breaktimeFinishSupMinutes < breaktimeStartSupMinutes)
          ) {
            breaktimeFinishSupHours += 24; // Assume pickup time is in the next day
          }

          newbreakHours = breaktimeFinishSupHours - breaktimeStartSupHours;
          newbreakMinutes =
            breaktimeFinishSupMinutes - breaktimeStartSupMinutes;

          // Adjust waiting minutes and hours if negative
          if (newbreakMinutes < 0) {
            newbreakMinutes += 60;
            newbreakHours--;
          }
        }

        // Calculate reduced waiting time
        let newreducedWatingTimeHours = waitingHours - newbreakHours;
        let newreducedWatingTimeMinutes = waitingMinutes - newbreakMinutes;

        // Handle cases where pickup time is less than arrival time
        if (newreducedWatingTimeMinutes < 0) {
          newreducedWatingTimeMinutes += 60;
          newreducedWatingTimeHours--;
        }

        // Format waiting time as HH:mm
        const formattedWaitingTime = `${waitingHours}:${waitingMinutes
          .toString()
          .padStart(2, "0")}`;

        // Format waiting time for the customer as HH:mm
        const formattedWaitingTimeCust = `${waitingHoursCust}:${waitingMinutesCust
          .toString()
          .padStart(2, "0")}`;

        // Format reduced waiting time as HH:mm
        const newReducedWatingTime = `${newreducedWatingTimeHours}:${newreducedWatingTimeMinutes
          .toString()
          .padStart(2, "0")}`;

        return {
          docketNo: details[0],
          arrivalTime: arrivalTime,
          pickupTime: pickupTime,
          waitingTime: formattedWaitingTime,
          waitingTimeCust: formattedWaitingTimeCust,
          reducedWatingTime: newReducedWatingTime,
          arrivalGeoSup: details[3],
          pickupGeoSup: details[4],
          truckcode: details[5],
          arrivalGeoCust: details[6],
          arrivalTimeCust: details[7],
          completeTimeCust: details[8],
          completeGeoCust: details[9],
          breaktimeStartCust: details[12],
          breaktimeFinishCust: details[13],
          breaktimeStartSup: details[14],
          breaktimeFinishSup: details[15],
          jobno: details[16],
        };
      }

      // Return default values if arrivalTime or pickupTime are missing or invalid
      return {
        docketNo: details[0],
        arrivalTime: arrivalTime,
        pickupTime: pickupTime,
        waitingTime: "N/A",
        waitingTimeCust: "N/A",
        reducedWatingTime: "N/A",
        arrivalGeoSup: details[3],
        pickupGeoSup: details[4],
        truckcode: details[5],
        arrivalGeoCust: details[6],
        arrivalTimeCust: details[7],
        completeTimeCust: details[8],
        completeGeoCust: details[9],
        breaktimeStartCust: details[12],
        breaktimeFinishCust: details[13],
        breaktimeStartSup: details[14],
        breaktimeFinishSup: details[15],
        jobno: details[16],
      };
    });

    setDetails(normalizedDetails);
    setStartEndCoordinates(startEndCoordinates);

    //}
  }, [locationArrays]);

  // below function is to generate random colors for the polyline path
  // const getRandomColor = () => {
  //   const letters = "0123456789ABCDEF";
  //   let color = "#";
  //   for (let i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // };

  const handleOverlayClick = (event) => {
    // popup : polyline detail map
    // Check if the clicked element is the overlay or its child elements
    if (event.target === event.currentTarget) {
      setSelectedMarker(null);
      setIsMapOverlayed(false);
    }
  };
  const handlePopupClose = () => {
    // popup : polyline detail map
    setSelectedMarker("");
    setSelectedDetail("");
    setSelectedPolyline([]);
  };
  // this is for the report buttton popup
  const handleOverlayClickReport = (event) => {
    // Check if the clicked element is the overlay or its child elements
    if (event.target === event.currentTarget) {
      setIsMapOverlayedReport(null);
    }
  };
  const handlePopupCloseReport = () => {
    // popup  report button
    setIsMapOverlayedReport("");
  };
  const getRandomColor = () => {
    // this returns a random colors that are in the array
    const colors = ["red", "blue", "black", "navy", "maroon"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  //console.log("selectedPolyline", selectedPolyline);
  // code to calculate the total distance for the a each dockt
  const calculateTotalDistance = async (polyline) => {
    let totalDistance = 0;

    for (let i = 0; i < polyline.length - 1; i++) {
      const coord1 = polyline[i];
      const coord2 = polyline[i + 1];
      const distance = calculateDistance(coord1, coord2);
      totalDistance += distance;
    }

    totalDistance = totalDistance.toFixed(2);
    settotalDistance(totalDistance);

    return totalDistance;
  };

  // Function to calculate the distance between two coordinates using Haversine formula
  const calculateDistance = (coord1, coord2) => {
    const lat1 = coord1.lat;
    const lon1 = coord1.lng;
    const lat2 = coord2.lat;
    const lon2 = coord2.lng;

    const R = 6371; // Radius of the Earth in km

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return distance;
  };

  // Function to convert degrees to radians
  const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };
  // this set date as current date

  // this is for calculate all distances kms
  const calculateALLDistance = (polylineArrays) => {
    let totalDistance = 0;

    for (let i = 0; i < polylineArrays.length; i++) {
      const polyline = polylineArrays[i];

      for (let j = 0; j < polyline.length - 1; j++) {
        const coord1 = polyline[j];
        const coord2 = polyline[j + 1];
        const distance = calculateDistance(coord1, coord2);
        totalDistance += distance;
      }
    }

    totalDistance = totalDistance.toFixed(2);
    setallDistance(totalDistance);

    return totalDistance;
  };

  return (
    <div>
      <CCard>
        <CCardHeader className="headerEQ">Route Truck Enquiry</CCardHeader>
        <CCardBody>
          <CContainer>
            <CRow style={{ marginTop: "10px", marginBottom: "-10px" }}>
              <CCol>
                <input
                  type="Date"
                  className="RouteTruckInputs"
                  placeholder="Date"
                  value={date}
                  onChange={handleDateChange}
                />
              </CCol>
              <CCol>
                <input
                  type="text"
                  className="RouteTruckInputs"
                  placeholder="Driver Code"
                  value={driverCode}
                  onChange={handleDriverCodeChange}
                  style={{ width: "100%" }}
                  // list="driverOptions"
                />

                {/* Add more options as needed */}
              </CCol>

              <CCol>
                <input
                  type="text"
                  className="RouteTruckInputs"
                  placeholder="Docket No"
                  value={docketNo}
                  onChange={handleDocketNoChange}
                />
              </CCol>
              <CCol>
                <button
                  className="RouteTruckButton"
                  onClick={handleGoButtonClick}
                >
                  GO <PlayCircleFilledIcon />
                </button>
              </CCol>
              <CCol>
                <div className="RouteTruckCount">Docket Count : {count}</div>
              </CCol>

              <CCol style={{ marginLeft: "35px" }}>
                <div className="RouteTruckCount">
                  Total Distance : {allDistance}km
                </div>
              </CCol>
              <CCol>
                <div className="">
                  <button
                    class="button-28"
                    onClick={() => setIsMapOverlayedReport({ detail: details })}
                  >
                    REPORT
                  </button>
                </div>
              </CCol>
            </CRow>
          </CContainer>
          <div>
            {loading ? (
              // Display the progress bar while loading
              // <CircularProgress />
              <LinearProgress style={{ marginTop: "30px" }} />
            ) : points.length > 0 ? (
              // Display "No Data" message if there's no data
              <div>
                <LoadScript googleMapsApiKey="AIzaSyDxSuA9w2SdolXwys_ZKkS0F6ez5rbj7os">
                  {startEndCoordinates.length > 0 && (
                    <GoogleMap
                      mapContainerStyle={MainparentContainerStyle}
                      center={startEndCoordinates[0].start}
                      zoom={12}
                      key={mapKey}
                    >
                      {/* {startEndCoordinates.map((Coordinates) => (
                  <Marker
                    position={Coordinates.end}
                    label={{
                      text: "E",
                      titile: details,
                      color: "white",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  />
                ))} */}
                      {startEndCoordinates.map((coordinates, index) => {
                        const detail = details[index];

                        return (
                          <Marker
                            key={index}
                            position={coordinates.end}
                            title={
                              details[index]
                                ? `DocktNo: ${details[index].docketNo}\nArrival Time: ${details[index].arrivalTime}\nPickup Time: ${details[index].pickupTime}\nWaiting Time: ${details[index].waitingTime}`
                                : "No details available"
                            }
                            label={{
                              text: "E",
                              color: "white",
                              fontSize: "16px",
                              fontWeight: "bold",
                            }}
                          />
                        );
                      })}
                      {startEndCoordinates.map((coordinates, index) => {
                        const detail = details[index];
                        return (
                          <Marker
                            key={index}
                            position={coordinates.start}
                            title={
                              details[index]
                                ? `DocktNo: ${details[index].docketNo}\nArrival Time: ${details[index].arrivalTime}\nPickup Time: ${details[index].pickupTime}\nWaiting Time: ${details[index].waitingTime}`
                                : "No details available"
                            }
                            label={{
                              text: "S",
                              color: "white",
                              fontSize: "16px",
                              fontWeight: "bold",
                            }}
                            // onClick={() =>
                            //   setSelectedMarker({
                            //     detail: detail,
                            //     coordinates: coordinates,
                            //   })
                            // }
                          />
                        );
                      })}

                      {points.map((path, index) => (
                        <React.Fragment key={index}>
                          <Polyline
                            key={index}
                            path={path}
                            options={{
                              strokeColor: getRandomColor(),
                              strokeOpacity: 0.6,
                              strokeWeight: 7,
                            }}
                            onLoad={() => {
                              setSelectedPolyline(path);
                              calculateALLDistance(points);
                            }}
                            // onClick={() => {
                            //   setpopupisloading(true);
                            //   setTimeout(async () => {
                            //     await calculateTotalDistance(path);
                            //     setSelectedMarker({
                            //       detail: details[index],
                            //       coordinates: startEndCoordinates[index],
                            //       points: path,
                            //     });
                            //     console.log("path", path);
                            //     console.log("selectedMarker", selectedMarker);
                            //     setpopupisloading(false);
                            //   }, 1000); // 1 seconds delay
                            // }}
                            onClick={() => {
                              if (!details) {
                                // If details array is not set, display progress cursor and wait for a few minutes
                                setpopupisloading(true);
                                setTimeout(() => {
                                  setpopupisloading(false);
                                  // Continue with the rest of the code after waiting
                                  if (details && details[index]) {
                                    const detail = details[index];
                                    calculateTotalDistance(path);
                                    setSelectedMarker({
                                      detail: detail,
                                      coordinates: startEndCoordinates[index],
                                      points: path,
                                    });
                                  }
                                }, 500); // .5 seconds delay (adjust the time as needed)
                              } else {
                                // If details array is already set, execute the code immediately
                                const detail = details[index];
                                calculateTotalDistance(path);
                                setSelectedMarker({
                                  detail: detail,
                                  coordinates: startEndCoordinates[index],
                                  points: path,
                                });
                              }
                            }}
                            style={{
                              cursor: popupisloading ? "progress" : "auto",
                            }}
                          />

                          {startEndCoordinates.map((coordinates, index) => {
                            const detail = details[index];

                            return (
                              <Marker
                                key={index}
                                position={coordinates.middlepoint}
                                icon={transparentIcon}
                                label={{
                                  text:
                                    detail && detail.docketNo
                                      ? detail.docketNo
                                      : ".",
                                  color: "black",
                                  fontWeight: "bold",
                                  fontSize: "18px",
                                  padding: "10px",
                                  backgroundColor: "white",
                                }}
                              />
                            );
                          })}
                        </React.Fragment>
                      ))}
                    </GoogleMap>
                  )}

                  <div
                    style={{
                      display: "flex",
                      // overflowX: "auto",
                      flexWrap: "wrap",
                      marginTop: "20px",
                    }}
                  >
                    {points.map((path, index) => (
                      <div
                        key={details[index]?.docketNo ?? "N/A"}
                        style={{
                          display: "flex",
                          flexDirection: "column",

                          marginRight: "5px",
                          marginLeft: "30px",
                          borderRadius: "3px",
                          padding: "10px",
                        }}
                      >
                        <div
                          className="RouteTruckDocket"
                          style={{
                            width: "79px",
                            // borderRadius: "2px",
                            // overflow: "hidden",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                            cursor: "pointer",
                            // textAlign: "center",
                            // alignContent: "center",
                          }}
                          onClick={() => {
                            if (!details) {
                              // If details array is not set, display progress cursor and wait for a few minutes
                              setpopupisloading(true);
                              setTimeout(() => {
                                setpopupisloading(false);
                                // Continue with the rest of the code after waiting
                                if (details && details[index]) {
                                  const detail = details[index];
                                  calculateTotalDistance(path);
                                  setSelectedMarker({
                                    detail: detail,
                                    coordinates: startEndCoordinates[index],
                                    points: path,
                                  });
                                }
                              }, 500); // .5 seconds delay (adjust the time as needed)
                            } else {
                              // If details array is already set, execute the code immediately
                              const detail = details[index];
                              calculateTotalDistance(path);
                              setSelectedMarker({
                                detail: detail,
                                coordinates: startEndCoordinates[index],
                                points: path,
                              });
                            }
                          }}
                        >
                          {details[index]?.docketNo ?? "N/A"}
                        </div>
                      </div>
                    ))}
                  </div>
                </LoadScript>
              </div>
            ) : (
              <p style={{ marginTop: "50px" }}>No data available.</p>
            )}
          </div>
          {selectedMarker && (
            <div
              // style={overlayStyle}
              className={`popup-container ${selectedMarker ? "open" : ""}`}
              onClick={handleOverlayClick}
            >
              <RouteHistoryPopup
                detail={selectedMarker.detail}
                coordinates={selectedMarker.coordinates}
                points={selectedMarker.points}
                //points={selectedPolyline}
                icon={selectedMarker.icon}
                onClose={handlePopupClose}
                center={center}
                distance={totalDistance}
              />
            </div>
          )}
          {isMapOverlayedReport && (
            <div
              style={overlayStyle}
              // className={`popup-container ${selectedMarker ? "open" : ""}`}
              onClick={handleOverlayClickReport}
            >
              <TruckRouteReport onClose={handlePopupCloseReport} />
            </div>
          )}
        </CCardBody>
      </CCard>
    </div>
  );
};

export default TruckRouteHistory;
