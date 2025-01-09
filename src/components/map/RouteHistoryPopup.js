import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";

import {
  GoogleMap,
  Polyline,
  Marker,
} from "@react-google-maps/api";
import React, { useState } from "react";
import { API_URL } from "../util/config";
import { useEffect } from "react";

export default function RouteHistoryPopup({
  coordinates,
  points,
  detail,
  distance,
}) {
  const MainparentContainerStyle = {
    height: "75%",
    marginTop: "20px",
  };

  const center = coordinates.start;


  const [arrivalGeoSupAddress, setArrivalGeoSupAddress] = useState("");
  const [arrivalGeoCustAddress, setArrivalGeoCustAddress] = useState("");
  const [pickupGeoSupAddress, setPickupGeoSupAddress] = useState("");
  const [completeGeoCustAddress, setCompleteGeoCustAddress] = useState("");

  const fetchAddressData = (lat, lng, setter) => {
    const url = `${API_URL}centralcontol/getaddress?geo=${lat},${lng}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const address = data.ResultSet;
        setter(address);
      })
      .catch((error) => {
        console.error("Error fetching address data:", error);
      });
  };
  useEffect(() => {
    if (detail.arrivalGeoSup?._lat && detail.arrivalGeoSup?._long) {
      fetchAddressData(
        detail.arrivalGeoSup._lat,
        detail.arrivalGeoSup._long,
        setArrivalGeoSupAddress
      );
    }
    if (detail.pickupGeoSup?._lat && detail.pickupGeoSup?._long) {
      fetchAddressData(
        detail.pickupGeoSup._lat,
        detail.pickupGeoSup._long,
        setPickupGeoSupAddress
      );
    }
    if (detail.completeGeoCust?._lat && detail.completeGeoCust?._long) {
      fetchAddressData(
        detail.completeGeoCust._lat,
        detail.completeGeoCust._long,
        setCompleteGeoCustAddress
      );
    }
    if (detail.arrivalGeoCust?._lat && detail.arrivalGeoCust?._long) {
      fetchAddressData(
        detail.arrivalGeoCust._lat,
        detail.arrivalGeoCust._long,
        setArrivalGeoCustAddress
      );
    }

    // Update the completeGeoCustAddress state based on the appropriate coordinates
    // fetchAddressData(lat, lng, setCompleteGeoCustAddress);
  }, []);

  const waitingTime =
    detail?.reducedWatingTime !== null &&
    detail?.reducedWatingTime !== "NaN:NaN"
      ? detail?.reducedWatingTime
      : detail?.waitingTime ?? "Default Value";

  return (
    <div>
      <CCard
        //className="routehistoryGlass"
        style={{ width: "170vh", height: "80vh" }}
      >
        <CCardHeader className="headerEQModal">
          {" "}
          Route History | Job No :{detail?.jobno ?? "N/A"} | Docket No:{" "}
          {detail?.docketNo ?? "N/A"} | Total Distance: {distance}km
        </CCardHeader>
        <CCardBody>
          <div>
            <CRow>
              <CCol>
                {/* <div className="topictextpopup">Supplier Site</div> */}
                <div className="">Supplier Site</div>
                <div className="">
                  <div className="RouteDetails">
                    <div className="routehistoryNumber">
                      Arrive Time {"   "}: {detail?.arrivalTime ?? "N/A"}
                    </div>
                    <div className="routehistorytext">
                      {arrivalGeoSupAddress}
                    </div>
                  </div>
                  <div className="RouteDetails">
                    <div className="routehistoryNumber">
                      Pickup Time : {detail?.pickupTime ?? "N/A"}
                    </div>
                    <div className="routehistorytext">
                      {pickupGeoSupAddress}
                    </div>
                  </div>{" "}
                  <div className="RouteDetails">
                    <div className="routehistoryNumber">
                      {/* Waiting Time : {detail?.reducedWatingTime ?? "N/A"} */}
                      Waiting Time : {waitingTime}
                      {/* Waiting Time : {detail?.waitingTime ?? "N/A"} */}
                    </div>
                    <div
                      className="routehistoryNumber"
                      style={{
                        marginLeft: "40px",
                        fontWeight: "700",
                      }}
                    >
                      Break Time: {detail?.breaktimeStartSup ?? "N/A"} -{" "}
                      {detail?.breaktimeFinishSup ?? "N/A"}
                    </div>
                  </div>
                </div>
              </CCol>
              <CCol>
                {/* <div className="topictextpopup">Customer Site</div> */}
                <div className="">Customer Site</div>
                <div className="">
                  <div className="RouteDetails">
                    <div className="routehistoryNumber">
                      {" "}
                      Arrive Time :{"   "} {detail?.arrivalTimeCust ?? "N/A"}
                    </div>
                    <div className="routehistorytext">
                      {" "}
                      {arrivalGeoCustAddress}{" "}
                    </div>
                  </div>{" "}
                  <div className="RouteDetails">
                    <div className="routehistoryNumber">
                      Complete Time : {detail?.completeTimeCust ?? "N/A"}
                    </div>
                    <div className="routehistorytext">
                      {" "}
                      {completeGeoCustAddress}
                    </div>
                  </div>
                  <div className="RouteDetails">
                    <div className="routehistoryNumber">
                      Waiting Time : {detail?.waitingTimeCust ?? "N/A"}{" "}
                    </div>{" "}
                    <div
                      className="routehistoryNumber"
                      style={{
                        marginLeft: "40px",
                        fontWeight: "700",
                      }}
                    >
                      Break Time: {detail?.breaktimeStartCust ?? "N/A"} -{" "}
                      {detail?.breaktimeFinishCust ?? "N/A"}
                    </div>
                  </div>
                </div>
              </CCol>
            </CRow>
          </div>

          <GoogleMap
            mapContainerStyle={MainparentContainerStyle}
            center={center}
            zoom={14}
          >
            <Marker
              position={coordinates.end}
              label={{
                text: "E",
                color: "white",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            />

            <Marker
              position={coordinates.start}
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
                  strokeColor: "#FF0000",
                  strokeOpacity: 1,
                  strokeWeight: 2,
                }}
              />
            )}
          </GoogleMap>
        </CCardBody>
      </CCard>
    </div>
  );
}
