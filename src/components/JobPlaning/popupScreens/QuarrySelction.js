
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { API_URL } from "src/components/util/config";
import LinearProgress from "@material-ui/core/LinearProgress";


export default function QuarrySelction(props) {
  const [loading, setLoading] = useState(false);
  const [customerDetails, setCustomerDetails] = useState([]);
  const [filters, setFilters] = useState({
    Code: props.customerCode || "",
    Description: "",
  });

  const handleFilterChange = (column, value) => {
    let newValue = value;
    newValue = value.toUpperCase();
    // }
    setFilters({
      ...filters,
      [column]: newValue,
    });
  };
  // useEffect(() => {
  //   const Token = localStorage.getItem("AccessToken");
  //   setLoading(true);
  //   // Fetch data from the API
  //   fetch(
  //     `${API_URL}customer/customerlookup/?company=ESQ&custcode=&name=&available=true`,
  //     {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         Authorization: `Bearer ${Token}`,
  //       },
  //     }
  //   )
  //     .then((response) => {
  //       if (response.status === 401) {
  //         localStorage.removeItem("AccessToken");
  //         window.location.reload(true);

  //         throw new Error("Unauthorized access - 401");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       const contacts = data.ResultSet;

  //       // Assuming data is an array of objects like you provided
  //       setCustomerDetails(contacts);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data from the API:", error);
  //       setLoading(false);
  //     });
  // }, []);

  const filteredData = customerDetails
    ? customerDetails.filter((row) => {
        const CodeMatch = row.Code.toUpperCase().includes(filters.Code);
        const DescriptionMatch = row.Description.toUpperCase().includes(
          filters.Description
        );

        return CodeMatch && DescriptionMatch;
      })
    : [];

  const handleRowClick = (custCode) => {
    // Store the selected "Quote No" in session storage
    sessionStorage.setItem("selectedCustCode", custCode);
    if (props.onClose) {
      props.onClose();
    }
  };

  return (
    <CCard
      //className="routehistoryGlass"
      style={{ width: "85vh", height: "70%", color: "white" }}
    >
      <CCardHeader className="headerEQModal"> Quarry Selection</CCardHeader>
      <CCardBody style={{ alignItems: "center" }}>
        <div style={{ justifyContent: "center" }}>
          <div className="Qt-CustCodeTable" style={{ overflowX: "auto" }}>
            <table
              className="tableQt-SiteTable"
              style={{ marginTop: "10px", width: "100%" }}
            >
              <thead
                className="tableQt-SiteTable-grey-header"
                style={{
                  position: "sticky",
                  top: "0",
                  fontSize: "11px",
                }}
              >
                <tr>
                  <th style={{ width: "35%" }}>
                    <input
                      type="text"
                      placeholder="Customer Code"
                      value={filters.Code}
                      onChange={(e) =>
                        handleFilterChange("Code", e.target.value)
                      }
                      style={{ width: "100%" }}
                    />
                  </th>
                  <th style={{ width: "35%" }}>
                    <input
                      type="text"
                      placeholder="Name"
                      value={filters.Description}
                      onChange={(e) =>
                        handleFilterChange("Description", e.target.value)
                      }
                      style={{ width: "100%" }}
                    />
                  </th>
                  <th style={{ width: "35%" }}>
                    <input
                      type="text"
                      placeholder="Name"
                      value={filters.Description}
                      onChange={(e) =>
                        handleFilterChange("Description", e.target.value)
                      }
                      style={{ width: "100%" }}
                    />
                  </th>
                </tr>
                <tr>
                  <th style={{ width: "35%" }}>Supplier Code</th>
                  <th style={{ width: "35%" }}>Name</th>
                  <th style={{ width: "35%" }}>Supplier Store</th>
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
                  (customerDetails?.length > 0 ? (
                    filteredData.map((item, index) => (
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
                        <td>{item.Code}</td>
                        <td>{item.Description}</td>
                        <td>{item.Description}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2">No data available</td>
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
