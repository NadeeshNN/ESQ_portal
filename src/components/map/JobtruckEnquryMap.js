import React from "react";
import polyline from "google-polyline";
import {
  GoogleMap,
  Polyline,
  Marker,
  LoadScript,
} from "@react-google-maps/api";

import { CCard, CCardBody, CCardHeader } from "@coreui/react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

//const center = points[0];

const JobtruckEnquryMap = (props) => {
  const origin = {
    lat: props.TruckLastLatitude,
    lng: props.TruckLastLongitude,
  };
  const destination = {
    lat: props.destination_latitude,
    lng: props.destination_longitude,
  };

  const polylinePath = props.polylinePath;
  const decodedPath = polyline.decode(polylinePath);

  // Convert the decoded path to LatLng objects
  const coordinates = decodedPath.map((point) => ({
    lat: point[0],
    lng: point[1],
  }));

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
    origin.lat,
    origin.lng,
    destination.lat,
    destination.lng
  );
  const points = coordinates;
  const center = coordinates[0];
  const Truckcode = props.Truckcode;
  const customer = props.customer;
  const Status = props.StatusDesc;
  const MarkerText = props.MarkerText;
  return (
    <CCard>
      <CCardHeader className="headerEQModal">
        Truck Code: {Truckcode}| Status : {Status} | Customer : {customer}|
        Distance: {distance} km
      </CCardHeader>
      <CCardBody>
        <LoadScript googleMapsApiKey="AIzaSyDxSuA9w2SdolXwys_ZKkS0F6ez5rbj7os">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
          >
            <Marker
              position={origin}
              label={{
                text: "T",
                color: "white",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            />

            <Marker
              position={destination}
              label={{
                text: MarkerText,
                color: "white",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            />

            {points && (
              <Polyline
                path={points}
                options={{
                  strokeColor: "#FF0000", // Replace with your desired color
                  strokeOpacity: 1,
                  strokeWeight: 2,
                }}
              />
            )}
          </GoogleMap>
        </LoadScript>
      </CCardBody>
    </CCard>
  );
};

export default JobtruckEnquryMap;
