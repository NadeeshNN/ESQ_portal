// import React from 'react'

// export default function Qt_Mapref() {
//   return (
//     <div>Qt_Mapref</div>
//   )
// }
import React, { useEffect } from "react";
import { useState } from "react";
import { API_URL } from "src/components/util/config";
import LinearProgress from "@material-ui/core/LinearProgress";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import { Box, Pagination, TablePagination } from "@mui/material";
import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
export default function Qt_Mapref(props) {
  const [loading, setLoading] = useState(false);
  const [customerDetails, setCustomerDetails] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(35);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [filters, setFilters] = useState({
    Code: props.mapRef || "",
    Description: "",
  });
  const handleChangePage = (event, page) => {
    getTableData(page);
    setPageNumber(page);
    // getTableData(newPage, rowsPerPage);
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
  const getTableData = (pageNumber) => {
    // if (goClick) {
    //   setPageNumber(1);
    // }
    setLoading(true);

    // Fetch data from the API
    fetch(
      `${API_URL}quotation/mapreflookup?mapref=${filters.Code}&address=&PageSize=30&PageNumber=${pageNumber}`
    )
      .then((response) => response.json())
      .then((data) => {
        const contacts = data.ResultSet;
        if (pageNumber === 1) {
          const pagesize = data.TotalPages;
          const totalPages = data.TotalPages;
          const totalrecords = data.TotalRecords;
          const pageNumber = data.PageNumber;
          setPageNumber(pageNumber);
          setPageSize(pagesize);
          setTotalPages(totalPages);
          setTotalRecords(totalrecords);
        }
        // Assuming data is an array of objects like you provided
        setCustomerDetails(contacts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data from the API:", error);
        setLoading(false);
      });
  };
  // useEffect(() => {
  //   getTableData();
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

  const handleRowClick = (mapref, address) => {
    // Store the selected "Quote No" in session storage
    sessionStorage.setItem("selectedMaprefCode", mapref);
    sessionStorage.setItem("selectedMaprefAddress", address);
    if (props.onClose) {
      props.onClose();
    }
  };

  return (
    <CCard
      //className="routehistoryGlass"
      style={{ width: "80%h", height: "80%", color: "white" }}
    >
      <CCardHeader className="headerEQModal">
        {" "}
        Map reference lookup{" "}
      </CCardHeader>
      <CCardBody style={{ alignItems: "center" }}>
        <div style={{ justifyContent: "center" }}>
          <button
            id="goButton" // Provide a valid id for the button
            className="inputdivbutton"
            style={{
              marginTop: "0px",
              width: "75px",
              marginLeft: "5px",
              marginBottom: "5px",
            }}
            onClick={() => getTableData(1)}
          >
            Go
          </button>
          <div className="Qt-SiteTable">
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
                    <th style={{ minWidth: "180px" }}>
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
                    <th style={{ minWidth: "500px" }}>
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
                    <th style={{ minWidth: "180px" }}>Customer Code</th>
                    <th style={{ minWidth: "500px" }}>Name</th>
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
                          onDoubleClick={() =>
                            handleRowClick(item.Code, item.Description)
                          }
                        >
                          <td style={{ minWidth: "180px" }}>{item.Code}</td>
                          <td style={{ minWidth: "500px" }}>
                            {item.Description}
                          </td>
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

            <Box display="flex-wrap" justifyContent="center" marginTop={2}>
              <Pagination
                count={totalPages}
                page={pageNumber}
                variant="outlined"
                shape="rounded"
                // rowsPerPage={rowsPerPage}
                onChange={handleChangePage}
                //onRowsPerPageChange={handleChangeRowsPerPage}
                color="primary"
              />
            </Box>
          </div>
        </div>
      </CCardBody>{" "}
    </CCard>
  );
}
