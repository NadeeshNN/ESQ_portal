/**
 * Created by Nadeesh Perera - 2023-03-02
 *
 *
 */

import { useState, useEffect } from "react";
import polyline from "google-polyline";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { apiGetCall } from "src/generics/APIFunctions";
import { API_URL } from "src/components/util/config";
import RefreshIcon from "@mui/icons-material/Refresh";
import GeneralMap from "./GeneralMap";
import truckIconGreen from "./../../assets/icons/truckicon (3).png";
import truckIconYellow from "./../../assets/icons/truckicon (4).png";
import truckIconOrange from "./../../assets/icons/truckicon (5).png";
import truckIconPurple from "./../../assets/icons/truckicon (6).png";

// //Firebase configuyration for the live Apllication
// var firebaseConfig = {
//   apiKey: "AIzaSyDPYQiGcw5NsuBsf3LPgMapPtIYJXta-Fk",

//   authDomain: "eqtruckapp.firebaseio.com",
//   // The value of `databaseURL` depends on the location of the database
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

const mapContainerStyle = {
  width: "100%",
  height: "60vh",

  //left: -270,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function MarkerDetails({ truckId, onClose }) {
  const [truckLocation, setTruckLocation] = useState(null);
  const [truckDestination, setTruckDestination] = useState();
  const [truckOrgin, setTruckOrgin] = useState();
  const [polylinePath, setPolylinePath] = useState(null);
  const [polylineFetched, setPolylineFetched] = useState(false);
  const [RemainingTime, setTime] = useState();
  const [isClicked, setIsCircleClicked] = useState(false);
  const [truckStatusUpdated, settruckStatusUpdated] = useState();
  const [driverCode, setdriverCode] = useState();
  const [arriveStatus, setarriveStatus] = useState();
  const [customer, setcustomer] = useState();
  const [customerN, setcustomerN] = useState();
  const [pickedQty, setpickedQty] = useState();
  const [material, setmaterial] = useState();
  const [orderNo, setorderNo] = useState();

  // Load truck location from Firebase
  useEffect(() => {
    const dbRef = ref(database, `location/trucks/${truckId}`);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();

      const position = data.location ? data.location.split(",") : null;
      const destination = data.destination ? data.destination.split(",") : null;
      const origin = data.origin ? data.origin.split(",") : null;
      const arriveStatus = data.status; //? data.status : null;
      const drivercode = data.drivercode;
      const aStatus = data.status;
      const c_name = data.cname;
      const c_code = data.ccode;
      const product_code = data.material;
      const order_no = data.orderno;
      const picked_qty = data.pickedqty;
      setcustomerN(c_name);
      setcustomer(c_code);
      setmaterial(product_code);
      setorderNo(order_no);
      setpickedQty(picked_qty);
      setdriverCode(drivercode);
      setarriveStatus(aStatus);
      // console.log("data marker", data);
      /**
       * 0 = start on the way to quarry
       * 1 = arrived at quarry
       * 2 = picked up load and way to customer
       * 3 = Arrived at customer location
       * 4 = completed
       *
       */
      if (arriveStatus === 0) {
        settruckStatusUpdated("On the way to quarry");
      } else if (arriveStatus === 1) {
        settruckStatusUpdated("Truck Arrived at quarry");
      } else if (arriveStatus === 2) {
        settruckStatusUpdated("On the way to Customer Site");
      } else if (arriveStatus === 3) {
        settruckStatusUpdated("Truck Arrived at Customer Site");
      } else if (arriveStatus === 4) {
        settruckStatusUpdated("Job Completed");
      } else {
        settruckStatusUpdated("");
      }

      const latLng = position
        ? {
            lat: parseFloat(position[0]),
            lng: parseFloat(position[1]),
          }
        : null;
      const desticationlatLng = destination
        ? {
            lat: parseFloat(destination[0]),
            lng: parseFloat(destination[1]),
          }
        : null;
      const originlatlng = origin
        ? {
            lat: parseFloat(origin[0]),
            lng: parseFloat(origin[1]),
          }
        : null;

      setTruckLocation(latLng);
      setTruckDestination(desticationlatLng);
      setTruckOrgin(originlatlng);
    });
  }, [truckId]);

  const handleCloseClick = () => {
    onClose();
  };

  useEffect(() => {
    if (!polylineFetched) {
      const originLat = truckOrgin ? truckOrgin.lat : null;
      const originLng = truckOrgin ? truckOrgin.lng : null;
      const destLat = truckDestination ? truckDestination.lat : null;
      const destLng = truckDestination ? truckDestination.lng : null;

      if (originLat && originLng && destLat && destLng) {
        getPolyline(originLat, originLng, destLat, destLng);
      }
    }
  }, [truckOrgin, truckDestination, polylineFetched]);

  const gettime = () => {
    const truckLastlat = truckLocation?.lat;
    const trucklastlng = truckLocation?.lng;
    const destLat = truckDestination?.lat;
    const destLng = truckDestination?.lng;
    const url = `${API_URL}centralcontol/getAproxDistTime?orgin=${truckLastlat},${trucklastlng}&distination=${destLat},${destLng}`;

    const successCallback = (data) => {
      if (data.IsSuccess && data.ResultSet && data.ResultSet.length > 0) {
        const time = data.ResultSet[0];
        const ReTime = time;
        const approxTime = ReTime.split(",")[1];
        setTime(approxTime);
      }
    };
    const errorCallback = (error) => {
      console.error(error);
    };
    apiGetCall(url, successCallback, errorCallback);
  };
  //setTimeout(gettime, 10 * 60 * 1000);
  // get polyline from the api
  const getPolyline = (originLat, originLng, destLat, destLng) => {
    const url = `${API_URL}centralcontol/getplloyline?orgin=${originLat},${originLng}&distination=${destLat},${destLng}`;

    const successCallback = (data) => {
      if (data.IsSuccess && data.ResultSet && data.ResultSet.length > 0) {
        const polylineString = data.ResultSet[0];
        // Store the polyline string in a variable
        const updatedPolylinePath = polylineString;
        // Update the state outside the callback function
        setPolylinePath(updatedPolylinePath);
        setPolylineFetched(true);
      }
    };

    const errorCallback = (error) => {
      console.error(error);
    };

    apiGetCall(url, successCallback, errorCallback);
  };

  const decodedPath = polylinePath ? polyline.decode(polylinePath) : []; // decode polyline string

  const coordinates = decodedPath.map((point) => ({
    lat: point[0],
    lng: point[1],
  }));

  const points = coordinates;
  const center = truckLocation;

  // this code is to calculte distance between truck and the destination
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance.toFixed(2);
  };
  const distance = calculateDistance(
    truckLocation?.lat,
    truckLocation?.lng,
    truckDestination?.lat,
    truckDestination?.lng
  );
  // this code is to calculte distance between origin  and the destination
  const calculateTotalDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance.toFixed(2);
  };
  const Totaldistance = calculateTotalDistance(
    truckOrgin?.lat,
    truckOrgin?.lng,
    truckDestination?.lat,
    truckDestination?.lng
  );

  let ico = {
    url: "",
    scaledSize: { width: 60, height: 60 },
  };
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

  // newMarkers.push({
  //   id: key,
  //   position: latLng,
  //   icon: ico,
  //   title: titledata,
  // });

  //newMarkers.push({ position: defaultCenter });

  // const ico = {
  //   url: truckICon,
  // };
  if (window.google && window.google.maps) {
    ico.scaledSize = new window.google.maps.Size(50, 40);
  }

  // const handleDetailsClick = () => {
  //   setIsCard2Open(true);
  // };

  // const handleCloseClick2 = () => {
  //   setIsCard2Open(false);
  // };

  //get details from the onfield truck array, check the truckcode and map

  // const truckIdToMatch = truckId;
  // const filteredTruckData = onfieldtruck
  //   ? onfieldtruck.filter((truck) => truck.TruckCode === truckIdToMatch)
  //   : [];
  // const Material =
  //   filteredTruckData.length > 0 ? filteredTruckData[0].Material : "";
  // const CustomerCode =
  //   filteredTruckData.length > 0 ? filteredTruckData[0].CustomerCode : "";
  // const OrderNo =
  //   filteredTruckData.length > 0 ? filteredTruckData[0].OrderNo : "";
  // const PickedQty =
  //   filteredTruckData.length > 0 ? filteredTruckData[0].PickedQty : "";
  // const DriverCode =
  //   filteredTruckData.length > 0 ? filteredTruckData[0].DriverCode : "";
  // const Customer =
  //   filteredTruckData.length > 0 ? filteredTruckData[0].Customer : "";

  const handleClickcircle = () => {
    setIsCircleClicked(true);
    // Perform other actions on button click
  };
  // Calculate center based on average latitude and longitude

  //const title = `Truck Code - ${truckId}\nDriver Code - ${DriverCode}\nCustomer - ${Customer}\nPickedQty - ${PickedQty}\nCustomerCode - ${CustomerCode}\nDistance - 36Km`;
  return (
    <CCard style={{ width: "150vh" }}>
      <CCardHeader className="headerEQModal">
        LIVE VIEW | Truck Code: {truckId}| Remaining Distance: {distance} km
      </CCardHeader>
      <CCardBody>
        <div className="marker-details">
          {/* <div className="marker-details-close" onClick={handleCloseClick}>
            X
          </div> */}
          <CRow className="detailsHeadingrow">
            <div>
              {/* <button
                className="animated-card-button"
                onClick={handleDetailsClick}
                onDoubleClick={handleCloseClick2}
              >
                Details
              </button> */}
            </div>
            <div
              className="detailsHeading"
              style={{
                marginLeft: "20px",
                fontSize: 15,
                fontWeight: 700,
                fontStyle: "bold",
              }}
            >
              Truck Code: {truckId}
            </div>
            <div
              className="detailsHeading"
              style={{
                marginLeft: "30%",
                color: "green",
                fontSize: 15,
                fontWeight: 700,
                fontStyle: "bold",
              }}
            >
              {truckStatusUpdated}
            </div>
            <div
              className="detailsHeading"
              style={{
                position: "absolute",
                right: "30px",
                fontSize: 15,
                fontWeight: 700,
                fontStyle: "bold",
              }}
            >
              Driver Code: {driverCode}
            </div>
          </CRow>
          {/* {isCard2Open && ( */}
          <CRow>
            <CCol md={3}>
              <CCardBody className="animated-card-body">
                <div className="animated-card-content">
                  {/* <div
                    className={`circle ${isClicked ? "clicked" : ""}`}
                    onClick={() => {
                      gettime();
                      handleClickcircle();
                    }}
                  >
                    <span className="textcircle">{RemainingTime}</span>
                    <div className="tooltip">Refresh</div>
                  </div> */}
                  <div className="timeview">
                    <div className="card-content-value3">
                      Approx Time{" "}
                      <RefreshIcon
                        title="Refresh"
                        className="refreshIcon"
                        style={{
                          marginLeft: 20,
                          color: "blue",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          gettime();
                        }}
                      />
                    </div>
                    <div className="ApproxTime circle">{RemainingTime}</div>
                  </div>

                  <div className="card-content-row">
                    <div className="card-content-label">Customer</div>
                    <div className="card-content-value">{customer}</div>
                  </div>
                  <div className="card-content-row">
                    <div className="card-content-value2">{customerN}</div>
                  </div>

                  <div className="card-content-row">
                    <div className="card-content-label">Material:</div>
                    <div className="card-content-value">{material}</div>
                  </div>
                  <div className="card-content-row">
                    <div className="card-content-label">PickedQty:</div>
                    <div className="card-content-value">{pickedQty}</div>
                  </div>
                  <div className="card-content-row">
                    <div className="card-content-label">Order No:</div>
                    <div className="card-content-value">{orderNo}</div>
                  </div>
                  <div className="card-content-row">
                    <div className="card-content-label">
                      Remaining Distance:
                    </div>
                    <div className="card-content-value">{distance} km</div>
                  </div>
                  <div className="card-content-row">
                    <div className="card-content-label">Total Distance:</div>
                    <div className="card-content-value">{Totaldistance} km</div>
                  </div>
                </div>
              </CCardBody>
            </CCol>
            {/* )} */}
            <CCol>
              <CCardBody style={{ padding: 0, margin: 0 }}>
                <GeneralMap
                  center={center}
                  zoom={15}
                  mapContainerStyle={mapContainerStyle}
                  truckOrgin={truckOrgin}
                  truckDestination={truckDestination}
                  truckLocation={truckLocation}
                  points={points}
                  icon={ico}
                  type="live"
                  markerData={[
                    {
                      titile: "Origin", //truck origin
                      text: "S",
                      color: "white",
                      fontSize: "16px",
                      fontWeight: "bold",
                    },
                    {
                      text: truckId,
                      titile: titledata, // trucklocation with icon
                      color: "black",
                      fontSize: "12px",
                      fontWeight: "bold",
                    },
                    {
                      titile: "Truck", //trcuk Destination
                      text: "D",
                      color: "white",
                      fontSize: "16px",
                      fontWeight: "bold",
                    },
                  ]}
                  polylineOptions={[
                    {
                      strokeColor: "blue",
                      strokeOpacity: 0.6,
                      strokeWeight: 4,
                    },
                  ]}
                />
              </CCardBody>
            </CCol>
          </CRow>
        </div>
      </CCardBody>
    </CCard>
  );
}
export default MarkerDetails;
