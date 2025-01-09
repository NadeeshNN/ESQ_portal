/**
 * Created By Nadeesh Perera
 * Discription : this map is used for the loginMap and clockin Map IN [TimesheetEnq.js] Component
 *
 */

import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import React from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const TruckLocationMap = (props) => {
  const origin = {
    lat: props.latitude,
    lng: props.longitude,
  };

  const drivercode = props.DriverCode;
  const field = props.field;

  return (
    <CCard>
      <CCardHeader className="headerEQModal">
        Driver Code: {drivercode}| Date : {field}
      </CCardHeader>
      <CCardBody>
        <LoadScript googleMapsApiKey="AIzaSyAf3aGbbMvnOvzXK-LWhWWQNvv1qFeMjqY">
          <GoogleMap
            mapContainerStyle={containerStyle}
            gestureHandling="cooperative"
            zoom={12}
            center={origin}
          >
            <Marker
              position={origin}
              title={drivercode}
              label={{
                text: "T",
                color: "white",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            />
          </GoogleMap>
        </LoadScript>
      </CCardBody>
    </CCard>
  );
};

export default TruckLocationMap;
