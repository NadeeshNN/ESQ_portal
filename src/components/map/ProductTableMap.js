/**
 * Created By Nadeesh Perera
 * Discription : this map is used in BreakHistory Map  [BreakHistory.js] Component
 *
 */
// import React from 'react'

// export default function ProductTableMap() {
//   return (
//     <div>ProductTableMap</div>
//   )
// }

import React, { useState } from "react";

import {
  GoogleMap,
  Marker,
  LoadScript,
  useJsApiLoader,
  Polyline,
} from "@react-google-maps/api";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";

const containerStyle = {
  width: "100%",
  height: "100%",
};

//const center = points[0];


const ProductTableMap = (props) => {
 
  const { SupName } = props;
  
  const [map, setMap] = useState(null);
  // const [destination, setDestination] = useState({
  //   lat: "",
  //   lng: "",
  // });
  const [decordeOrigin, setDecordeOrigin] = useState({
    lat: "",
    lng: "",
  });
  const [directions, setDirections] = useState(null);
  const [arrayIndex, setArrayIdex] = useState(1);
  const [polylinePath, setPolylinePath] = useState([]);
  const [routeDetails, setRouteDetails] = useState({
    duration: "N/A",
    distance: "N/A",
    // You can extract more details as needed
    // For alternative routes, you can use results.routes.slice(1)
    alternativeRoutes: [],
  });

  const origin = {
    lat: props.latitudeA,
    lng: props.longitudeA,
  };
  const destination = {
    lat: props.latitudeB,
    lng: props.longitudeB,
  };

  async function calculateRoute() {
    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: origin,
      destination: destination,
      travelMode: window.google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: true,
    });

    if (results?.routes?.[arrayIndex]?.overview_path) {
      const path = results.routes[arrayIndex].overview_path.map((point) => ({
        lat: point.lat(),
        lng: point.lng(),
      }));
      setDirections(results);
      setPolylinePath(path);
    }
    setRouteDetails({
      duration: results?.routes?.[0]?.legs?.[0]?.duration?.text || "N/A",
      distance: results?.routes?.[0]?.legs?.[0]?.distance?.text || "N/A",
      // You can extract more details as needed
      // For alternative routes, you can use results.routes.slice(1)
      alternativeRoutes: results?.routes?.slice(1) || [],
    });
    //setPolylinePath(results.routes.overview_path);
    //console.log("path", path);
    
  }
  function getRandomColor(index) {
    return ["#FF0000", "#00FF00", "#0000FF"][index % 3];
  }
  const handleRouteItemClick = (index, route) => {
    setPolylinePath(route.overview_path);

    // Access the index variable here and perform any actions you need
   
    // You can set the index to your state or perform any other logic
    setArrayIdex(index);
  };
  return (
    <CCard
      //className="routehistoryGlass"
      style={{ width: "130vh", height: "75vh", color: "white" }}
    >
      <CCardHeader className="headerEQModal">
        {" "}
        Product Map | Supplier Name :{SupName}| Duration:{" "}
        {routeDetails.duration} |Distance: {routeDetails.distance}
      </CCardHeader>
      <CCardBody>
        <LoadScript
          googleMapsApiKey="AIzaSyAf3aGbbMvnOvzXK-LWhWWQNvv1qFeMjqY"
          libraries={["places"]}
          onLoad={() => {
            calculateRoute();
          }}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            gestureHandling="cooperative"
            zoom={11}
            center={{
              lat: (origin.lat + destination.lat) / 2,
              lng: (origin.lng + destination.lng) / 2,
            }}
            // center={origin}
          >
            {origin && (
              <Marker
                position={origin}
                label={{
                  text: "C",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              />
            )}

            {destination && (
              <Marker
                position={destination}
                label={{
                  text: "D",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              />
            )}
            {polylinePath.length > 0 && (
              <Polyline
                path={polylinePath}
                options={{
                  strokeColor: "#FF0000",
                  strokeOpacity: 1,
                  strokeWeight: 2,
                }}
              />
            )}
            {/* {directions && (
          <DirectionsRenderer directions={directions} />
        )} */}
            {/* {directions && directions.routes.map((route, index) => (
  <Polyline
    path={route.overview_path.map(point => ({ lat: point.lat(), lng: point.lng() }))}
    options={{
      strokeColor: getRandomColor(index + 1),
      strokeOpacity: 1,
      strokeWeight: 4
    }}
  />
))} */}

            {routeDetails && (
              <div
                style={{
                  position: "absolute",
                  top: 60,
                  left: 10,
                  background: "rgba(210,210, 210)",
                  padding: 10,
                  color: "black",
                  style: "bold",
                }}
              >
                <div>Duration: {routeDetails.duration}</div>
                <div>Distance: {routeDetails.distance}</div>
                {routeDetails.alternativeRoutes.length > 0 && (
                  <div>
                    <strong>Alternative Routes:</strong>
                    <ul>
                      {routeDetails.alternativeRoutes.map((route, index) => (
                        <button
                          className="alternativeroute"
                          onClick={() => handleRouteItemClick(index, route)}
                        >
                          <li key={index} style={{ marginBottom: "5px" }}>
                            Duration: {route.legs[0].duration.text}, Distance:{" "}
                            {route.legs[0].distance.text}
                          </li>
                        </button>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </GoogleMap>
        </LoadScript>
      </CCardBody>
    </CCard>
  );
};

export default ProductTableMap;
