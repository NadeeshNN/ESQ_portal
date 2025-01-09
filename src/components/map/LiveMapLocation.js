import React, { useState } from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import MarkerDetails from "./MarkerDetails";


const Map = ({ center,  markers }) => {
  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };
  const parentContainerStyle = {
    height: "70vh",
  };

  

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

  const [map, setMap] = useState(null);
  const [isMapOverlayed, setIsMapOverlayed] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  //const [onfieldtruck, setOnfieldtruck] = useState();
  // const [onfieldtruckFetched, setonfieldtruckFetched] = useState(false);

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
  
  const onLoad = (map) => {
    setMap(map);
  };

  const onUnmount = () => {
    setMap(null);
  };

  return (
    <>
      <row>{/* <div> legend will be added here</div> */}</row>
      <div style={parentContainerStyle}>
        <LoadScript googleMapsApiKey="AIzaSyDxSuA9w2SdolXwys_ZKkS0F6ez5rbj7os">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            onLoad={onLoad}
            onUnmount={onUnmount}
            center={center}
            zoom={10.5}
            onClick={() => setSelectedMarker(null)}
          >
            {markers.map((marker) => (
              <Marker
                key={marker.id}
                position={marker.position}
                title={marker.title}
                label={{
                  text: marker.id,
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "16px",
                  padding: "10px",
                  backgroundColor: "red",
                }}
                labelStyle={{
                  marginBottom: 30,
                }}
                icon={marker.icon}
                onClick={() => handleMarkerClick(marker)}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>

      {isMapOverlayed && (
        <>
          <div style={overlayStyle} onClick={handleOverlayClick}>
            <div>
              {selectedMarker && (
                <MarkerDetails
                  truckId={selectedMarker.id}
                  onClose={() => setSelectedMarker(null)}
                  //onfieldtruck={onfieldtruck}
                />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Map;
