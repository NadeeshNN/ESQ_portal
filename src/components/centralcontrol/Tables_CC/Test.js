import React, { useState } from "react";

const TruckRouteReport = () => {
  const [groupedData, setGroupedData] = useState([
    {
      driverCode: "999",
      dateGroups: [
        {
          data: [
            {
              driverCode: "999",
              Date: "2023-07-11",
              dockectNo: "322854",
              totalDistance: 0.36,
              supplierWt: 0,
              CustWt: 100,
              completedLoad: 0,
            },
          ],
        },
      ],
    },
    {
      driverCode: "042",
      dateGroups: [
        {
          data: [
            {
              driverCode: "042",
              Date: "2023-07-12",
              dockectNo: "322858",
              totalDistance: 0.23,
              supplierWt: 0,
              CustWt: 200,
              completedLoad: 0,
            },
            {
              driverCode: "042",
              Date: "2023-07-13",
              dockectNo: "322859",
              totalDistance: 0.78,
              supplierWt: 0,
              CustWt: 150,
              completedLoad: 0,
            },
          ],
        },
      ],
    },
  ]);

  const [expandedRows, setExpandedRows] = useState([]);

  const handleRowClick = (key) => {
    setExpandedRows((prevState) =>
      prevState.includes(key)
        ? prevState.filter((row) => row !== key)
        : [...prevState, key]
    );
  };

  const toggleRow = (driverCode, Date, level) => {
    const key = `${driverCode}-${Date}-${level}`;
    setExpandedRows((prevState) =>
      prevState.includes(key)
        ? prevState.filter((row) => row !== key)
        : [...prevState, key]
    );
  };

  return (
    <div style={{ maxHeight: "45%", overflowY: "auto" }}>
      <table className="table">
        <thead className="grey-header" style={{ position: "sticky", top: "0" }}>
          <tr>
            <th>Driver Code</th>
            {!expandedRows.includes("driverCode") && (
              <>
                <th>Distance</th>
                <th>Supplier WT</th>
                <th>Customer WT</th>
                <th>CompletedLoad</th>
              </>
            )}
            {expandedRows.includes("driverCode") &&
              !expandedRows.includes("Date") && <th>Date</th>}
            {expandedRows.includes("Date") &&
              !expandedRows.includes("dockectNo") && <th>Docket No</th>}
          </tr>
        </thead>
        <tbody>
          {groupedData.map((driverGroup, index) => {
            const driverKey = `${driverGroup.driverCode}-driverCode`;
            const isDriverExpanded = expandedRows.includes(driverKey);

            const totalDistance = driverGroup.dateGroups
              .flatMap((dateGroup) =>
                dateGroup.data.reduce(
                  (sum, item) => sum + item.totalDistance,
                  0
                )
              )
              .reduce((total, distance) => total + distance, 0)
              .toFixed(2);

            const supplierWtSum = driverGroup.dateGroups
              .flatMap((dateGroup) =>
                dateGroup.data.reduce((sum, item) => sum + item.supplierWt, 0)
              )
              .reduce((total, supplierWt) => total + supplierWt, 0)
              .toFixed(2);

            const custWtSum = driverGroup.dateGroups
              .flatMap((dateGroup) =>
                dateGroup.data.reduce((sum, item) => sum + item.CustWt, 0)
              )
              .reduce((total, custWt) => total + custWt, 0)
              .toFixed(2);

            const completedLoadSum = driverGroup.dateGroups
              .flatMap((dateGroup) =>
                dateGroup.data.reduce(
                  (sum, item) => sum + item.completedLoad,
                  0
                )
              )
              .reduce((total, completedLoad) => total + completedLoad, 0)
              .toFixed(2);

            return (
              <React.Fragment key={index}>
                <tr
                  onClick={() => handleRowClick(driverKey)}
                  style={{ fontWeight: "600" }}
                >
                  <td>{driverGroup.driverCode}</td>
                  {!isDriverExpanded && (
                    <>
                      <td colSpan={1}>{totalDistance}</td>
                      <td colSpan={1}>{supplierWtSum}</td>
                      <td colSpan={1}>{custWtSum}</td>
                      <td colSpan={1}>{completedLoadSum}</td>
                    </>
                  )}
                  {isDriverExpanded && !expandedRows.includes("Date") && (
                    <td colSpan={4}>{"Dates"}</td>
                  )}
                </tr>
                {isDriverExpanded &&
                  driverGroup.dateGroups.map((dateGroup, innerIndex) => {
                    const dateDistanceSum = dateGroup.data
                      .reduce((sum, item) => sum + item.totalDistance, 0)
                      .toFixed(2);

                    const dateSupplierWtSum = dateGroup.data
                      .reduce((sum, item) => sum + item.supplierWt, 0)
                      .toFixed(2);

                    const dateCustWtSum = dateGroup.data
                      .reduce((sum, item) => sum + item.CustWt, 0)
                      .toFixed(2);

                    const dateCompletedLoadSum = dateGroup.data
                      .reduce((sum, item) => sum + item.completedLoad, 0)
                      .toFixed(2);

                    const dateKey = `${driverGroup.driverCode}-${dateGroup.data[0].Date}-Date`;
                    const isDateExpanded = expandedRows.includes(dateKey);

                    return (
                      <React.Fragment key={innerIndex}>
                        <tr
                          onClick={() =>
                            toggleRow(
                              driverGroup.driverCode,
                              dateGroup.data[0].Date,
                              "Date"
                            )
                          }
                          style={{ fontWeight: "600" }}
                        >
                          <td>{dateGroup.data[0].Date}</td>
                          {!isDateExpanded && (
                            <>
                              <td colSpan={1}>{dateDistanceSum}</td>
                              <td colSpan={1}>{dateSupplierWtSum}</td>
                              <td colSpan={1}>{dateCustWtSum}</td>
                              <td colSpan={1}>{dateCompletedLoadSum}</td>
                            </>
                          )}
                          {isDateExpanded &&
                            !expandedRows.includes("dockectNo") && (
                              <td colSpan={4}>{"Docket Numbers"}</td>
                            )}
                        </tr>
                        {isDateExpanded &&
                          dateGroup.data.map((item, innerInnerIndex) => (
                            <tr
                              key={innerInnerIndex}
                              style={{ backgroundColor: "rgb(180, 219, 235)" }}
                            >
                              <td></td>
                              <td></td>
                              <td>{item.dockectNo}</td>
                              <td>{item.totalDistance}</td>
                              <td>{item.supplierWt}</td>
                              <td>{item.CustWt}</td>
                              <td>{item.completedLoad}</td>
                            </tr>
                          ))}
                      </React.Fragment>
                    );
                  })}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TruckRouteReport;
