// import React from "react";

// export default function JobOrderBrowse() {
//   return <div>JobOrderBrowse</div>;
// }
import React from "react";
import { useState } from "react";
import { API_URL } from "src/components/util/config";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Box, Pagination } from "@mui/material";

import {
  CCard,
  CCardBody,
  CCardHeader,
  CInputGroupText,
  CSelect,
} from "@coreui/react";

export default function JobOrderBrowse(props) {
  const [loading, setLoading] = useState(false);


  const [siteDetails, setSiteDetails] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  // const [pageSize, setPageSize] = useState(30);
  const [totalPages, setTotalPages] = useState(0);
 // const [totalRecords, setTotalRecords] = useState(0);
  // const [showAlert, setShowAlert] = useState(false);
  // const [alertMessage, setAlertMessage] = useState("");
  // const [alertType, setAlertType] = useState("");
  // const [alertTitle, setAlertTitle] = useState("");
  const { soderNo } = props;

  const [filters, setFilters] = useState({
    SorderNo: soderNo,
    OrderDate: "",
    CustCode: "",
    Name: "",
    OrderBy: "",
    SiteAddress: "",
    City: "",
    OrderProductType: "",
    AreaCode: "",
    MapReference: "",
  });

  const handleChangePage = (event, page) => {
    getSiteDetails(page);
    setPageNumber(page);
    // getTableData(newPage, rowsPerPage);
  };

  const getSiteDetails = (pageNumber) => {
    // if (!filters.SorderNo) {
    //   window.alert("Please Enter a orderNo!! ");
    //   return;
    // }
    setLoading(true);

    //const quoteno = JSON.parse(sessionStorage.getItem("selectedQuoteNo"));
    fetch(
      `${API_URL}joborder/joborderfind?orderrad=1&SorderNo=${filters.SorderNo}&OrderDate=${filters.OrderDate}&CustCode=${filters.CustCode}&Name=${filters.Name}&OrderBy=${filters.OrderBy}&SiteAddress=${filters.SiteAddress}&City=${filters.City}&OrderProductType=${filters.OrderProductType}&AreaCode=${filters.AreaCode}&MapReference=${filters.MapReference}&PageSize=25&PageNumber=${pageNumber}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        //body: JSON.stringify(filters),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const datar = data.ResultSet;


        setSiteDetails(datar);
        if (pageNumber === 1) {
        
          const totalPages = data.TotalPages;
          // const totalrecords = data.TotalRecords;
          const pageNumber = data.PageNumber;
          setPageNumber(pageNumber);
          // setPageSize(pagesize);
          setTotalPages(totalPages);
          //setTotalRecords(totalrecords);
        }
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
  // const filteredData = siteDetails
  //   ? siteDetails.filter((row) => {
  //       const SorderNoMatch = row.SorderNo.toString().includes(
  //         filters.Parent_code
  //       );
  //       const OrderDateMatch = row.OrderDate.toUpperCase().includes(
  //         filters.OrderDate
  //       );

  //       const CustCodeMatch = row.CustCode.toUpperCase().includes(
  //         filters.CustCode
  //       );
  //       const NameMatch = row.Name.toUpperCase().includes(filters.Name);
  //       const OrderByMatch = row.OrderBy.toUpperCase().includes(
  //         filters.OrderBy
  //       );
  //       const SiteAddressMatch = row.SiteAddress.toUpperCase().includes(
  //         filters.SiteAddress
  //       );
  //       const CityMatch = row.City.toUpperCase().includes(filters.City);
  //       const OrderProductTypeMatch =
  //         row.OrderProductType.toUpperCase().includes(filters.OrderProductType);

  //       const AreaCodeMatch = row.AreaCode.toUpperCase().includes(
  //         filters.AreaCode
  //       );
  //       const MapReferenceMatch = row.MapReference.toString().includes(
  //         filters.MapReference
  //       );

  //       return (
  //         SorderNoMatch &&
  //         NameMatch &&
  //         OrderDateMatch &&
  //         CustCodeMatch &&
  //         OrderByMatch &&
  //         SiteAddressMatch &&
  //         CityMatch &&
  //         OrderProductTypeMatch &&
  //         AreaCodeMatch &&
  //         MapReferenceMatch
  //       );
  //     })
  //   : [];

  const handleRowClick = (SorderNo, rowIndex) => {
    // Store the selected "Quote No" in session storage
    sessionStorage.setItem("selectedSorderNo", SorderNo);
    if (props.onClose) {
      props.onClose();
      //   props.clearfunction();
    }
  };

  return (
    <CCard
      //className="routehistoryGlass"
      style={{ width: "142vh", height: "95vh", color: "white" }}
    >
      <CCardHeader className="headerEQModal"> Job Order Browse </CCardHeader>
      <CCardBody>
        <div>
          <div class="row">
            <div
              style={{
                marginRight: "20px",
                marginLeft: "20px",
                display: "flex",
                width: "200px",
              }}
            >
              <CInputGroupText className="small-input-text" style={{}}>
                Order Type:
              </CInputGroupText>
              <CSelect size="sm" style={{}}>
                <option value="Export">Export </option>
                <option value="Standard">Standard </option>
                <option value="StandingO"> Standing Order</option>
              </CSelect>
            </div>
            <button
              id="goButton" // Provide a valid id for the button
              className="inputdivbutton"
              //disabled={!filters.SorderNo}
              style={{
                marginTop: "0px",
                width: "65px",
                marginLeft: "20px",
                marginRight: "35%",
              }}
              onClick={() => getSiteDetails(1)}
            >
              Go
            </button>{" "}
          </div>
          <div className="JoborderbrowseTable">
            <table
              class="tableQt-SiteTable"
              style={{ marginTop: "10px", height: "auto" }}
            >
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
                      value={filters.SorderNo}
                      onChange={(e) =>
                        handleFilterChange("SorderNo", e.target.value)
                      }
                      style={{ width: "70px" }}
                    />
                  </th>

                  <th>
                    <input
                      type="text"
                      placeholder=""
                      value={filters.OrderDate}
                      onChange={(e) =>
                        handleFilterChange("OrderDate", e.target.value)
                      }
                      style={{ width: "120px" }}
                    />
                  </th>

                  <th>
                    <input
                      type="text"
                      placeholder=""
                      value={filters.CustCode}
                      onChange={(e) =>
                        handleFilterChange("CustCode", e.target.value)
                      }
                      style={{ width: "100px" }}
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      placeholder=""
                      value={filters.OrderProductType}
                      onChange={(e) =>
                        handleFilterChange("OrderProductType", e.target.value)
                      }
                      style={{ width: "100px" }}
                    />
                  </th>

                  <th>
                    <input
                      type="text"
                      placeholder=""
                      value={filters.Name}
                      onChange={(e) =>
                        handleFilterChange("Name", e.target.value)
                      }
                      style={{
                        width: "250px",
                      }}
                    />
                  </th>

                  <th>
                    <input
                      type="text"
                      placeholder=""
                      value={filters.SiteAddress}
                      onChange={(e) =>
                        handleFilterChange("SiteAddress", e.target.value)
                      }
                      style={{ width: "220px" }}
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      placeholder=""
                      value={filters.City}
                      onChange={(e) =>
                        handleFilterChange("City", e.target.value)
                      }
                      style={{ width: "120px" }}
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      placeholder=""
                      value={filters.MapReference}
                      onChange={(e) =>
                        handleFilterChange("MapReference", e.target.value)
                      }
                      style={{ width: "100px" }}
                    />
                  </th>
                </tr>
                <tr>
                  <th style={{ width: "70px" }}>Order No</th>
                  <th style={{ width: "120px" }}>Date</th>
                  <th style={{ width: "100px" }}>Cust Code</th>
                  <th style={{ width: "100px" }}>Order Type</th>
                  <th style={{ width: "250px" }}>Name</th>
                  <th style={{ width: "220px" }}>Site Address</th>
                  <th style={{ width: "120px" }}>Suburb</th>
                  <th style={{ width: "100px" }}>Map Ref</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan="19">
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
                          onDoubleClick={() =>
                            handleRowClick(item.SorderNo, index)
                          }
                        >
                          <td style={{}}>{item.SorderNo}</td>
                          <td style={{}}>{item.OrderDate.split("T")[0]}</td>
                          <td style={{}}>{item.CustCode.slice(0, 20)}</td>
                          <td>{item.OrderProductType} </td>
                          <td>{item.Name}</td>
                          <td>{item.SiteAddress}</td>
                          <td>{item.City}</td>
                          <td>{item.MapReference}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="7" style={{ color: "white" }}>
                        No data available
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
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
