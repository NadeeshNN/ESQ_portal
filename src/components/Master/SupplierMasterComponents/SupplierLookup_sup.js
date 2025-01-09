import React from "react";
import { useState } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";

export default function SupplierLookup_sup() {
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    Code: "",
    Description: "",
  });
  return (
    <CCard
      className="routehistoryGlass"
      style={{ width: "80vh", height: "75vh", color: "white" }}
    >
      <CCardHeader className="headerEQModal"> Supplier Code lookup</CCardHeader>
      <CCardBody style={{ alignItems: "center" }}>
        <div style={{ justifyContent: "center" }}>
          <div className="Qt-SiteTable">
            <table class="tableQt-SiteTable" style={{ marginTop: "10px" }}>
              <thead
                class="tableQt-SiteTable-grey-header"
                style={{
                  height: "3px",
                  position: "sticky",
                  top: "0",
                  fontSize: "11px",
                }}
              >
                <tr>
                  <th>
                    <input
                      type="text"
                      placeholder=""
                      // value={filters.Code}
                      // onChange={(e) =>
                      //   handleFilterChange("Code", e.target.value)
                      // }
                      style={{ width: "180px" }}
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      placeholder=""
                      // value={filters.Description}
                      // onChange={(e) =>
                      //   handleFilterChange("Description", e.target.value)
                      // }
                      style={{ width: "500px" }}
                    />
                  </th>
                </tr>
                <tr>
                  <th style={{ width: "180px" }}>Supplier Code</th>
                  <th style={{ width: "500px" }}>Name</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan="19">
                      {/* <LinearProgress style={{ width: "100%" }} /> */}
                    </td>
                  </tr>
                )}
                {/* {!loading &&
                  (customerDetails?.length > 0 ? (
                    filteredData.map((item, index) => {
                      return (
                        <tr
                          key={index}
                          className="siteThover-effect"
                          style={{
                            fontSize: "9px",
                            height: "5px",
                            marginBottom: "0px",
                            padding: "0px",
                            marginTop: "0px",
                          }}
                         // onDoubleClick={() => handleRowClick(item.Code)}
                        >
                          <td style={{}}>{item.Code}</td>
                          <td style={{}}>{item.Description}</td>

                          {/* 
                         
                          <td>{item.Total_price}</td> 
                        </tr>
                        //if item.ColorBoldCol == ture then i need to make that row Total_cost,Total_price,Price need to color in oragne bold
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="19">No data available</td>
                    </tr>
                  ))} */}
              </tbody>
            </table>
          </div>
        </div>
      </CCardBody>{" "}
    </CCard>
  );
}
