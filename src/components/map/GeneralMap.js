import { GoogleMap, Marker, Polyline } from "@react-google-maps/api";
import React from "react";

export default function GeneralMap({
  center,
  zoom,
  mapContainerStyle,
  truckOrgin,
  truckDestination,
  truckLocation,
  points,
  icon,
  markerData,
  polylineOptions,
  type,
}) {
  return (
    <div>
      <GoogleMap
        // center={truckLocation}
        center={center}
        zoom={zoom}
        mapContainerStyle={mapContainerStyle}
      >
        <Marker
          position={truckOrgin}
          title={markerData[0].title}
          label={{
            text: markerData[0].text,
            color: markerData[0].color,
            fontSize: markerData[0].fontSize,
            fontWeight: markerData[0].fontWeight,
          }}
        />
        {type == "live" && (
          <Marker
            position={truckLocation}
            title={markerData[1].titile}
            label={{
              text: markerData[1].text,
              color: markerData[1].color,
              fontSize: markerData[1].fontSize,
              fontWeight: markerData[1].fontWeight,
            }}
            icon={icon}
            // title={title}
          />
        )}
        <Marker
          position={truckDestination}
          titile="Truck"
          label={{
            text: markerData[2].text,
            color: markerData[2].color,
            fontSize: markerData[2].fontSize,
            fontWeight: markerData[2].fontWeight,
          }}
        />
        {points && (
          <Polyline
            path={points}
            // path={polyline.decode(polylinePath)}
            options={{
              strokeColor: polylineOptions[0].strokeColor, // Replace with your desired color
              strokeOpacity: polylineOptions[0].strokeOpacity,
              strokeWeight: polylineOptions[0].strokeWeight,
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
}
