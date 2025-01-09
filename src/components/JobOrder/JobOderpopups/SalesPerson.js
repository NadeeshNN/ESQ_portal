// import React from 'react'
// export default function SalesPerson() {
//   return (
//     <div>SalesPerson</div>
//   )
// }
// import React from "react";
// export default function JobOrderBrowse() {
//   return <div>JobOrderBrowse</div>;
// }

import React from "react";
import { useState } from "react";
import { API_URL } from "src/components/util/config";
import LinearProgress from "@material-ui/core/LinearProgress";
import {
  CCard,
  CCardBody,
  CCardHeader,

} from "@coreui/react";

export default function SalesPerson(props) {
  const [loading, setLoading] = useState(false);
  const [siteDetails, setSiteDetails] = useState([]);

  const [filters, setFilters] = useState({
    RepCode: "",
    Name: "",
  });
  //https://test.esqtruckapi.com.au/api/joborder/joborderfind?orderrad=1
  const getSiteDetails = () => {
    setLoading(true);
    //const quoteno = JSON.parse(sessionStorage.getItem("selectedQuoteNo"));
    // http://localhost:8322/api/joborder/
    fetch(
      `${API_URL}joborder/salespersonlookup?rep_code=${filters.RepCode}&name=${filters.Name}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(filters),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const datar = data.ResultSet;
        setSiteDetails(datar);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  };
  const handleFilterChange = (column, value) => {
    let newValue = value;
    newValue = value.toUpperCase();
    // }
    setFilters({
      ...filters,
      [column]: newValue,
    });
  };



  const filteredData = siteDetails
    ? siteDetails.filter((row) => {
        const RepCodeMatch = row.RepCode?.toUpperCase().includes(
          filters.RepCode
        );
        const NameMatch = row.Name?.toUpperCase().includes(filters.Name);
        return RepCodeMatch && NameMatch;
      })
    : [];

  const handleRowClick = (Code, rowIndex) => {
    // Store the selected "Quote No" in session storage
    sessionStorage.setItem("salesPerson", Code);
    // sessionStorage.setItem("selectedSorderNo", SorderNo);
    if (props.onClose) {
      props.onClose();
    }
  };

  return (
    <CCard
      //className="routehistoryGlass"
      style={{ width: "45vh", height: "55vh", color: "white" }}
    >
      <CCardHeader className="headerEQModal"> Sales person </CCardHeader>
      <CCardBody>
        <div>
          <div class="row">
            <button
              id="goButton" // Provide a valid id for the button
              className="inputdivbutton"
              style={{
                marginTop: "0px",
                width: "65px",
                marginLeft: "20px",
                marginRight: "35%",
              }}
              onClick={getSiteDetails}
            >
              Go
            </button>{" "}
          </div>
          <div className="Qt-SiteTable" style={{ overflowX: "auto" }}>
            <table
              className="tableQt-SiteTable"
              style={{ marginTop: "10px", width: "100%" }}
            >
              <thead
                className="tableQt-SiteTable-grey-header"
                style={{
                  height: "3px",
                  position: "sticky",
                  top: "0",
                  fontSize: "11px",
                }}
              >
                <tr>
                  <th style={{ width: "50%" }}>
                    <input
                      type="text"
                      placeholder="Rep Code"
                      value={filters.SorderNo}
                      onChange={(e) =>
                        handleFilterChange("SorderNo", e.target.value)
                      }
                      style={{ width: "100%" }}
                    />
                  </th>
                  <th style={{ width: "50%" }}>
                    <input
                      type="text"
                      placeholder="Name"
                      value={filters.OrderDate}
                      onChange={(e) =>
                        handleFilterChange("OrderDate", e.target.value)
                      }
                      style={{ width: "100%" }}
                    />
                  </th>
                </tr>
                <tr>
                  <th style={{ width: "50%" }}>TO</th>
                  <th style={{ width: "50%" }}>TOM</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan="2">
                      <LinearProgress style={{ width: "100%" }} />
                    </td>
                  </tr>
                )}
                {!loading &&
                  (siteDetails?.length > 0 ? (
                    siteDetails.map((item, index) => {
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
                          onDoubleClick={() => handleRowClick(item.Code)}
                        >
                          <td style={{ width: "50%" }}>{item.Code}</td>
                          <td style={{ width: "50%" }}>{item.Description}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="2" style={{ color: "white" }}>
                        No data available
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </CCardBody>{" "}
    </CCard>
  );
}
