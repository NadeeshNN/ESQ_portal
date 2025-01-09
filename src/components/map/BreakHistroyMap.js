/**
 * Created By Nadeesh Perera
 * Discription : this map is used in BreakHistory Map  [BreakHistory.js] Component
 *
 */

import React from "react";
import polyline from "google-polyline";
import {
  GoogleMap,
  Polyline,
  Marker,
  LoadScript,
} from "@react-google-maps/api";


const containerStyle = {
  width: "100%",
  height: "400px",
};

//const center = points[0];

const BreakHistroyMap = (props) => {
  const origin = {
    lat: props.latitudeA,
    lng: props.longitudeA,
  };
  const destination = {
    lat: props.latitudeB,
    lng: props.longitudeB,
  };
  const polylinePath = props.polylinePath;

  const decodedPath = polyline.decode(polylinePath);

  // Convert the decoded path to LatLng objects
  const coordinates = decodedPath.map((point) => ({
    lat: point[0],
    lng: point[1],
  }));

  const points = coordinates;
  const center = coordinates[0];
  return (
    <LoadScript googleMapsApiKey="AIzaSyDxSuA9w2SdolXwys_ZKkS0F6ez5rbj7os">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        <Marker
          position={origin}
          label={{
            text: "E",
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        />

        <Marker
          position={destination}
          label={{
            text: "S",
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
  );
};

export default BreakHistroyMap;
