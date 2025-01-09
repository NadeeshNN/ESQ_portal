import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import React, { useState, useEffect } from "react";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import LinearProgress from "@material-ui/core/LinearProgress";
import firebase from "firebase/firebase-compat";
import "firebase/firebase-firestore-compat";
import moment from "moment";
import { API_URL } from "src/components/util/config";


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

//Firebase con figuration for the test application
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

export default function TruckRouteReport() {
  const [locationArrays, setLocationArrays] = useState([]);
  const [rowData, setrowData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [toDate, settoDate] = useState("");
  const [fromDate, setfromDate] = useState("");
  const [driverCode, setDriverCode] = useState("");
  const [driverDistances, setDriverDistances] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const [eachrowData, setEachrowData] = useState([]);
  const [groupedData, setGroupedData] = useState([]);
  const [isRowExpanded, setIsRowExpanded] = useState(null);
  const [clickedRow, setClickedRow] = useState(null);



  const minFromDate = "2023-08-01";
  const TodayDate = moment().format("YYYY-MM-DD");
  const handletoDateChange = (event) => {
    const selectedDate = event.target.value;
    if (fromDate == "") {
      alert("Please select a valid 'From Date'");
    } // Check if the selected toDate is before the fromDate
    else if (selectedDate < fromDate) {
      alert("'To Date' cannot be less than 'From Date'");
      // Set default value for toDate as fromDate
      settoDate("");
    } else if (TodayDate < selectedDate) {
      alert(
        "'To Date' should not exceed today's date. Please select a valid date"
      );
      settoDate("");
    } else {
      settoDate(selectedDate);
    }
  };
  const handlefromDateChange = (event) => {
    const selectedDate = event.target.value;
    // Check if the selected fromDate is after the toDate
    if (selectedDate < minFromDate) {
      alert("'From Date' should be on or after 1st August 2023");
      // Set default value for fromDate as minimum selectable date (July 23, 2023)
      setfromDate("");
    } else if (TodayDate < selectedDate) {
      alert("'From Date' should be on or before Today");
      setfromDate("");
    } else {
      setfromDate(selectedDate);
    }
  };

  const handleDriverCodeChange = (event) => {
    setDriverCode(event.target.value);
  };

  const handleTableChange = async () => {
    setLoading(true);
    setExpandedRows([]);
    setGroupedData([]);
    setLocationArrays([]);
    setrowData([]);
    setDriverDistances([]);
    setClickedRow("");
    setEachrowData([]);
  };

  const handleGoButtonClick = async () => {
    setLoading(true);
    await handleTableChange();
    await fetchLocationArray(fromDate, toDate, driverCode);
  };

  // new code for fetch data
  const newGoButtonClick = async () => {
    await handleTableChange();

    fetchAddressData(fromDate, toDate, driverCode);
  };
  const fetchAddressData = (fromDate, toDate, driverCode) => {
    setLoading(true);
    const url = `${API_URL}centralcontol/getreportfirestore?fromdate=${fromDate}&todate=${toDate}&drivercode=${driverCode}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const rData = data;
        groupData(rData);
      })
      .catch((error) => {
        console.error("Error fetching address data:", error);
      });
  };
  // fetch data end
  async function fetchLocationArray(fromDate, toDate, driverCode) {
    console.log("data", fromDate, toDate, driverCode);
    const driversCollection = firestore.collection("drivers");

    if (driverCode) {
      // Fetch data for a specific driver code
      const querySnapshot = await driversCollection
        .where("drivercode", "==", driverCode)
        .get();

      await querySnapshot.forEach((driverDoc) => {
        const ordersRef = driverDoc.ref.collection("orders");

        fetchOrdersWithinDateRange(ordersRef, fromDate, toDate, driverDoc);
      });
    } else {
      // Fetch data for all drivers within the date range
      const querySnapshot = await driversCollection.get();

      querySnapshot.forEach((driverDoc) => {
        const ordersRef = driverDoc.ref.collection("orders");
        fetchOrdersWithinDateRange(ordersRef, fromDate, toDate, driverDoc);
      });
    }
  }

  async function fetchOrdersWithinDateRange(
    ordersRef,
    fromDate,
    toDate,
    driverDoc
  ) {
    let orderCount = 0;
    const OrderDetailArray = [];
    const currentDate = new Date(fromDate);
    const endDate = new Date(toDate);
    const dateRange = [];

    while (currentDate <= endDate) {
      const date = currentDate.toISOString().slice(0, 10);
      dateRange.push(date);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const queryPromises = dateRange.map((date) => {
      return ordersRef
        .where("date", "==", date)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((orderDoc) => {
            orderCount++;
            rowData.push([
              orderDoc.id,
              date,
              driverDoc.id,
              orderDoc.data().location,
              convertFirestoreTimestampToHHmm(orderDoc.data().arrivalTimeCust),
              convertFirestoreTimestampToHHmm(orderDoc.data().completeTimeCust),
              convertFirestoreTimestampToHHmm(orderDoc.data().arrivalTimeSup),
              convertFirestoreTimestampToHHmm(orderDoc.data().pickupTimeSup),
              convertFirestoreTimestampToHHmm(
                orderDoc.data().breaktimeStartSup
              ),
              convertFirestoreTimestampToHHmm(
                orderDoc.data().breaktimeFinishSup
              ),
              orderDoc.data().tdistance,
            ]);
          });
        })
        .catch((error) => {
          console.error("Error getting orders:", error);
        });
    });

    await Promise.all(queryPromises)
      .then(() => {
        calculateALLDistance(rowData);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  }

  function convertFirestoreTimestampToHHmm(timestamp) {
    if (!timestamp || !timestamp.seconds) {
      return "N/A";
    }

    const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}.${minutes}`;
  }

  const calculateTimeDifference = (timeString1, timeString2) => {
    if (!timeString1 || !timeString2) {
      return 0; // Return 0 if any of the time strings is missing
    }

    const timeRegex = /^(\d{1,2}).(\d{2})$/;
    if (!timeRegex.test(timeString1) || !timeRegex.test(timeString2)) {
      return 0; // Return 0 if the time strings are not in the expected format
    }

    const [hours1, minutes1] = timeString1.split(".").map(Number);
    const [hours2, minutes2] = timeString2.split(".").map(Number);

    const totalMinutes1 = hours1 * 60 + minutes1;
    const totalMinutes2 = hours2 * 60 + minutes2;

    return totalMinutes2 - totalMinutes1;
  };

  const removeDuplicates = (rowData) => {
    const uniqueData = [];
    const orderDocIds = new Set();

    rowData.forEach((row) => {
      const orderDocId = row[0]; // Assuming 'orderdoc.id' is in the first position of each row
      if (!orderDocIds.has(orderDocId)) {
        uniqueData.push(row);
        orderDocIds.add(orderDocId);
      }
    });

    return uniqueData;
  };
  const calculateALLDistance = async (rowData) => {
    rowData = removeDuplicates(rowData);
    const driverDistancesMap = new Map(); // To store distances for each driver
    const driverSupplierWtMap = new Map(); // To store supplierWt for each driver
    const driverCustWtMap = new Map(); // To store CustWt for each driver
    const driverSupplierBTMap = new Map();
    const reducedSupplierWtMap = new Map(); // To store BreatTime for each driver
    const newDataArray = [];
    const dataGroupedByDate = new Map();
    await rowData.forEach((row) => {
      const dockectNo = row[0];
      const Date = row[1];
      const driverCode = row[2];
      const locationArray = row[3];
      const customerArrivalTime = row[4];
      const customerCompleteTime = row[5];
      const supplierArrivalTime = row[6];
      const supplierCompleteTime = row[7];
      const supplierBreakStartTime = row[8];
      const supplierBreakEndTime = row[9];
      const tdistance = row[10];
      if (!Array.isArray(locationArray) || locationArray.length < 2) {
        return;
      }

      let totalDistance = 0;

      for (let i = 0; i < locationArray.length - 1; i++) {
        const coord1 = locationArray[i];
        const coord2 = locationArray[i + 1];
        // Check if coordinates are valid before calculating distance
        if (!isValidCoordinate(coord1) || !isValidCoordinate(coord2)) {
          continue;
        }
        const distance = calculateDistance(coord1, coord2);
        totalDistance += distance;
      }
      if (driverDistancesMap.has(driverCode)) {
        // If driver already exists in the map, update the total distance
        const existingDistance = driverDistancesMap.get(driverCode);

        driverDistancesMap.set(driverCode, existingDistance + totalDistance);
      } else {
        // If driver doesn't exist in the map, add it with the total distance
        driverDistancesMap.set(driverCode, totalDistance);
      }
      // Calculate supplierWt for each driver
      const supplierWt = calculateTimeDifference(
        supplierArrivalTime,
        supplierCompleteTime
      );
      if (driverSupplierWtMap.has(driverCode)) {
        // If driver already exists in the map, update the supplierWt
        const existingSupplierWt = driverSupplierWtMap.get(driverCode);
        driverSupplierWtMap.set(driverCode, existingSupplierWt + supplierWt);
      } else {
        // If driver doesn't exist in the map, add it with the supplierWt
        driverSupplierWtMap.set(driverCode, supplierWt);
      }
      // Calculate CustWt for each driver
      const CustWt = calculateTimeDifference(
        customerArrivalTime,
        customerCompleteTime
      );

      if (driverCustWtMap.has(driverCode)) {
        // If driver already exists in the map, update the CustWt
        const existingCustWt = driverCustWtMap.get(driverCode);
        driverCustWtMap.set(driverCode, existingCustWt + CustWt);
      } else {
        // If driver doesn't exist in the map, add it with the CustWt
        driverCustWtMap.set(driverCode, CustWt);
      }
      const supplierBreakTime = calculateTimeDifference(
        supplierBreakStartTime,
        supplierBreakEndTime
      );

      if (driverSupplierBTMap.has(driverCode)) {
        // If driver already exists in the map, update the supplierWt
        const existingSupplierBT = driverSupplierBTMap.get(driverCode);
        driverSupplierBTMap.set(
          driverCode,
          existingSupplierBT + supplierBreakTime
        );
      } else {
        // If driver doesn't exist in the map, add it with the supplierWt
        driverSupplierBTMap.set(driverCode, supplierBreakTime);
      }
      // Group the data by date
      const reducedSupplierWt = supplierWt - supplierBreakTime;

      if (reducedSupplierWtMap.has(driverCode)) {
        // If driver already exists in the map, update the supplierWt
        const existingreducedSupplierWt = reducedSupplierWtMap.get(driverCode);
        reducedSupplierWtMap.set(
          driverCode,
          existingreducedSupplierWt + reducedSupplierWt
        );
      } else {
        // If driver doesn't exist in the map, add it with the supplierWt
        reducedSupplierWtMap.set(driverCode, reducedSupplierWt);
      }
      //if there the supplierBreakTime is not null , then need to reduce it from SupplierWT
      // newsupplierWt = supplierWt-supplierBreakTime
      const newRowData = {
        driverCode: driverCode,
        Date: Date,
        dockectNo: dockectNo,
        totalDistance: parseFloat(totalDistance.toFixed(2)),
        supplierWt: reducedSupplierWt,
        CustWt: CustWt,
      };
      newDataArray.push(newRowData);
      setEachrowData(newDataArray);
      return dataGroupedByDate;
    });
    // Convert the maps to arrays of objects for the final output
    const updatedDriverDistances = Array.from(
      driverDistancesMap,
      ([driverCode, totalDistance]) => {
        const supplierWt = driverSupplierWtMap.get(driverCode);
        const CustWt = driverCustWtMap.get(driverCode);
        const completedLoad = rowData.filter((r) => r[2] === driverCode).length;
        return {
          driverCode,
          totalDistance: totalDistance.toFixed(2),
          supplierWt,
          CustWt,
          completedLoad,
        };
      }
    );
    setDriverDistances(updatedDriverDistances);
    return updatedDriverDistances;
  };

  // Function to check if a coordinate is valid
  const isValidCoordinate = (coord) => {
    return (
      coord && typeof coord._lat === "number" && typeof coord._long === "number"
    );
  };
  // Function to calculate the distance between two coordinates using Haversine formula
  const calculateDistance = (coord1, coord2) => {
    const lat1 = coord1._lat;
    const lon1 = coord1._long;
    const lat2 = coord2._lat;
    const lon2 = coord2._long;

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
  const handleRowClick = async (index) => {
    await groupData(); // Wait for the groupData function to finish before proceeding
    const newRowStatus = [...expandedRows];
    if (newRowStatus.includes(index)) {
      newRowStatus.splice(newRowStatus.indexOf(index), 1); // Row is expanded, so collapse it
    } else {
      newRowStatus.push(index); // Row is collapsed, so expand it
    }
    setExpandedRows(newRowStatus);
    setIsRowExpanded(index);
  };
  const groupData = (array) => {
    const grouped = array.reduce((acc, item) => {
      const driverKey = `${item.Drivercode}`;
      const dateKey = `${item.Drivercode}-${item.Date}`;

      if (!acc[driverKey]) {
        acc[driverKey] = {};
      }

      if (!acc[driverKey][dateKey]) {
        acc[driverKey][dateKey] = [];
      }

      acc[driverKey][dateKey].push(item);
      return acc;
    }, {});

    const groupedDataWithJobs = Object.entries(grouped).map(
      ([Drivercode, dateGroup]) => {
        const dateGroups = Object.entries(dateGroup).map(([key, data]) => ({
          Docketno: data.length,
          data: data,
        }));

        return {
          Drivercode: Drivercode,
          dateGroups: dateGroups,
        };
      }
    );
    setGroupedData(groupedDataWithJobs);
    setLoading(false);
  };
  const toggleRow = (Drivercode, Date, rowType) => {
    setClickedRow(rowType);
    const key = `${Drivercode}-${Date}-${rowType}`;
    setExpandedRows((prevRows) =>
      prevRows.includes(key)
        ? prevRows.filter((row) => row !== key)
        : [...prevRows, key]
    );
  };

  useEffect(() => {
    if (expandedRows.length === 0) {
      setClickedRow("");
    } else if (expandedRows.length === 1) {
      setClickedRow("Drivercode");
    }
  }, [expandedRows]);

  const Icon1 = "+";
  const Icon2 = "-";
  return (
    <div>
      <CCard
        //className="routehistoryGlass"
        style={{ width: "150vh", height: "85vh" }}
      >
        <CCardHeader className="headerEQModal">
          {" "}
          Route History Report
        </CCardHeader>
        <CCardBody>
          <div style={{ color: "" }}>
            {" "}
            <CRow
              style={{
                marginTop: "10px",
                marginBottom: "-10px",
                marginLeft: "10%",
              }}
            >
              <CCol md={3}>
                <div class="input-container">
                  <label class="input-label" style={{ width: "100%" }}>
                    From Date
                  </label>
                  <input
                    type="Date"
                    class="RouteTruckInputs withTopBorder"
                    placeholder="Date"
                    value={fromDate}
                    onChange={handlefromDateChange}
                  />
                </div>
              </CCol>
              <CCol md={3}>
                <div class="input-container">
                  <label class="input-label" style={{ width: "100%" }}>
                    To Date
                  </label>
                  <input
                    type="Date"
                    class="RouteTruckInputs withTopBorder"
                    placeholder="Date"
                    value={toDate}
                    onChange={handletoDateChange}
                  />
                </div>
              </CCol>

              <CCol md={3}>
                <div class="input-container">
                  <label class="input-label" style={{ width: "100%" }}>
                    Driver Code
                  </label>
                  <input
                    type="text"
                    className="RouteTruckInputs"
                    placeholder="Driver Code"
                    value={driverCode}
                    onChange={handleDriverCodeChange}
                  />
                </div>
              </CCol>

              <CCol md={2}>
                <div class="input-container">
                  <label class="input-label">{""}</label>
                  <button
                    className="RouteTruckButton"
                    style={{ width: "100%", marginTop: "30px" }}
                    onClick={newGoButtonClick}
                    newGoButtonClick
                  >
                    GO <PlayCircleFilledIcon />
                  </button>
                </div>
              </CCol>
            </CRow>
            <br></br>
            <hr className="divider" />
          </div>{" "}
          <div style={{ maxHeight: "75%", overflowY: "auto" }}>
            {Loading ? (
              <div>
                <LinearProgress />

                {/* <CircularProgress /> */}
              </div>
            ) : groupedData.length === 0 ? (
              <div>No Data Available</div>
            ) : (
              <table className="table" style={{ border: "2px black" }}>
                <thead
                  className="grey-header"
                  style={{ position: "sticky", top: "0" }}
                >
                  <tr>
                    <th>Driver Code </th>
                    {!expandedRows.includes("Drivercode") && (
                      <>
                        {clickedRow === "Drivercode" && (
                          <th colSpan={2}>Date</th>
                        )}
                        {clickedRow === "Date" && (
                          <>
                            <th>Date</th>
                            <th>Docket No</th>
                          </>
                        )}

                        <th>Distance(km)</th>
                        <th>Supplier WT (min)</th>
                        <th>Customer WT (min)</th>
                        <th>CompletedLoad</th>
                      </>
                    )}
                    {expandedRows.includes("Drivercode") &&
                      !expandedRows.includes("Date") && <th>Date</th>}
                    {expandedRows.includes("Date") &&
                      !expandedRows.includes("dockectNo") && <th>Docket No</th>}
                  </tr>
                </thead>
                <tbody>
                  {groupedData.map((driverGroup, index) => {
                    const firstRow = driverGroup.dateGroups[0]?.data[0]; // Change index to 0 to get the first row

                    // Check if group.data is empty or does not have data
                    const isDriverExpanded = firstRow
                      ? expandedRows.includes(
                          `${firstRow.Drivercode}-${firstRow.Date}-Drivercode`
                        )
                      : false;

                    const totalDistance = driverGroup.dateGroups
                      .flatMap((dateGroup) =>
                        dateGroup.data.reduce(
                          (sum, item) => sum + item.Distance,
                          0
                        )
                      )
                      .reduce((total, Distance) => total + Distance, 0)
                      .toFixed(2);
                    const supplierWtSum = driverGroup.dateGroups
                      .flatMap((dateGroup) =>
                        dateGroup.data.reduce(
                          (sum, item) => sum + item.Supplierwt,
                          0
                        )
                      )
                      .reduce((total, Supplierwt) => total + Supplierwt, 0);
                    const custWtSum = driverGroup.dateGroups
                      .flatMap((dateGroup) =>
                        dateGroup.data.reduce(
                          (sum, item) => sum + item.customerwt,
                          0
                        )
                      )
                      .reduce((total, customerwt) => total + customerwt, 0);
                    const completedLoadSum = driverGroup.dateGroups
                      .map(
                        (dateGroup) =>
                          dateGroup.data.filter((item) => item.Distance !== 0)
                            .length
                      )
                      .reduce(
                        (total, dateCompletedLoadSum) =>
                          total + dateCompletedLoadSum,
                        0
                      );

                    return (
                      <React.Fragment key={index}>
                        <tr
                          onClick={() =>
                            toggleRow(
                              firstRow.Drivercode,
                              firstRow.Date,
                              "Drivercode"
                            )
                          }
                          style={{
                            fontWeight: "600",
                          }}
                        >
                          <td>
                            <span>{firstRow.Drivercode}</span>
                            <span
                              style={{
                                marginLeft: "10px",
                                fontWeight: "700",
                                cursor: "pointer",
                                fontSize: "15px",
                              }}
                            >
                              {isDriverExpanded ? Icon2 : Icon1}
                              {/* {Icon} */}
                            </span>
                          </td>
                          {!expandedRows.includes("Drivercode") && (
                            <>
                              {clickedRow === "Drivercode" && (
                                <td colSpan={2}></td>
                              )}
                              {clickedRow === "Date" && <td colSpan={2}></td>}
                              <td colSpan={1}>{totalDistance}</td>
                              <td colSpan={1}>{supplierWtSum}</td>
                              <td colSpan={1}>{custWtSum}</td>
                              <td colSpan={1}>{completedLoadSum}</td>
                            </>
                          )}

                          {expandedRows.includes("Drivercode") &&
                            !expandedRows.includes("Date") && (
                              <td colSpan={1}>{"Dates"}</td>
                            )}
                        </tr>
                        {isDriverExpanded &&
                          driverGroup.dateGroups.map(
                            (dateGroup, innerIndex) => {
                              const dateDistanceSum = dateGroup.data
                                .reduce((sum, item) => sum + item.Distance, 0)
                                .toFixed(2);

                              const dateSupplierWtSum = dateGroup.data.reduce(
                                (sum, item) => sum + item.Supplierwt,
                                0
                              );
                              const dateCustWtSum = dateGroup.data.reduce(
                                (sum, item) => sum + item.customerwt,
                                0
                              );
                              const dateCompletedLoadSum =
                                dateGroup.data.filter(
                                  (item) => item.Distance !== 0
                                ).length;

                              const firstDateRow = dateGroup.data[0];

                              const isDateExpanded = firstDateRow
                                ? expandedRows.includes(
                                    `${firstDateRow.Drivercode}-${firstDateRow.Date}-Date`
                                  )
                                : false;

                              return (
                                <React.Fragment key={innerIndex}>
                                  <tr
                                    onClick={() =>
                                      toggleRow(
                                        firstDateRow.Drivercode,
                                        firstDateRow.Date,
                                        "Date"
                                      )
                                    }
                                    className="row1hover-effect"
                                  >
                                    {" "}
                                    <td colSpan={1}></td>
                                    <td>
                                      <span> {firstDateRow.Date}</span>
                                      <span
                                        style={{
                                          marginLeft: "10px",
                                          fontWeight: "700",
                                          fontSize: "15px",
                                          cursor: "pointer",
                                        }}
                                      >
                                        {isDateExpanded ? Icon2 : Icon1}
                                      </span>
                                    </td>
                                    {!expandedRows.includes("Date") && (
                                      <>
                                        {clickedRow === "Drivercode" && (
                                          <td colSpan={1}></td>
                                        )}
                                        {clickedRow === "Date" && (
                                          <td colSpan={1}></td>
                                        )}
                                        <td colSpan={1}>{dateDistanceSum}</td>
                                        <td colSpan={1}>{dateSupplierWtSum}</td>
                                        <td colSpan={1}>{dateCustWtSum}</td>
                                        <td colSpan={1}>
                                          {dateCompletedLoadSum}
                                        </td>
                                      </>
                                    )}
                                    {expandedRows.includes("Date") &&
                                      !expandedRows.includes("dockectNo") && (
                                        <td colSpan={1}>{"Docket Numbers"}</td>
                                      )}
                                  </tr>
                                  {isDateExpanded &&
                                    dateGroup.data.map((item, innerIndex) => (
                                      <tr
                                        key={innerIndex}
                                        className="row2hover-effect"
                                      >
                                        {" "}
                                        <td colSpan={2}></td>
                                        <td>{item.Docketno}</td>
                                        <td>{item.Distance}</td>
                                        <td>{item.Supplierwt}</td>
                                        <td>{item.customerwt}</td>
                                        <td>{item.totalLoad}</td>
                                      </tr>
                                    ))}
                                </React.Fragment>
                              );
                            }
                          )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </CCardBody>
      </CCard>
    </div>
  );
}
