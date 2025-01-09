import React, { useEffect } from "react";
import { useState } from "react";
import { API_URL } from "src/components/util/config";
import LinearProgress from "@material-ui/core/LinearProgress";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import { Box, Pagination } from "@mui/material";

export default function Qt_sites(props) {
  const [loading, setLoading] = useState(false);
  const [city, setcheckCity] = useState(true);
  const [melRef, setcheckMelRef] = useState(true);
  const [region, setcheckRegion] = useState(true);
  const [spIns, setcheckspIns] = useState(true);
  const [parentName, setcheckparentName] = useState(true);
  const [siteDetails, setSiteDetails] = useState([]);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(35);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);

  const [filters, setFilters] = useState({
    Parent_code: props.custCode || "",
    Name: "",
    Parent_customer: "",
    Address_code: "",
    Address_1: "",
    Suburb_ent: "",
    Map_ref_ent: "",
  });
  const getSiteDetails = (pageNumber) => {
    setLoading(true);

    //const quoteno = JSON.parse(sessionStorage.getItem("selectedQuoteNo"));
    fetch(
      `${API_URL}quotation/getsiteaddress?Parent_code=${filters.Parent_code}&Name=${filters.Name}&Parent_customer=${filters.Parent_customer}&Address_code=${filters.Address_code}&Address_1=${filters.Address_1}&Suburb_ent=${filters.Suburb_ent}&Map_ref_ent=${filters.Map_ref_ent}&PageSize=35&PageNumber=${pageNumber}`
    )
      .then((res) => res.json())
      .then((data) => {
        const datar = data.ResultSet;
        setSiteDetails(datar);
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
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  };
  const handleChangePage = (event, page) => {
    getSiteDetails(page);
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
  const filteredData = siteDetails
    ? siteDetails.filter((row) => {
        const Parent_codeMatch = row.Parent_code.toUpperCase().includes(
          filters.Parent_code
        );
        const NameMatch = row.Name.toUpperCase().includes(filters.Name);

        const Parent_customerMatch = row.Parent_customer.toUpperCase().includes(
          filters.Parent_customer
        );
        const Address_codeMatch = row.Address_code.toUpperCase().includes(
          filters.Address_code
        );
        const Address_1Match = row.Address1.toUpperCase().includes(
          filters.Address_1
        );
        const Suburb_entMatch = row.City.toUpperCase().includes(
          filters.Suburb_ent
        );
        const Map_ref_entMatch = row.Ref_id.toString().includes(
          filters.Map_ref_ent
        );

        return (
          Parent_codeMatch &&
          NameMatch &&
          Parent_customerMatch &&
          Address_codeMatch &&
          Address_1Match &&
          Suburb_entMatch &&
          Map_ref_entMatch
        );
      })
    : [];
  const handleRowClick = (item) => {
    // Store the selected "Quote No" in session storage
    // sessionStorage.setItem("Job_refid",item.Ref_id);
    // sessionStorage.setItem("selectedMaprefAddress",item.Address1);
    sessionStorage.setItem("selectedCutSiteDetails", JSON.stringify(item));

    if (props.onClose) {
      props.onClose();
      if (props.clearfunction) {
        props.clearfunction();
      }
    }
  };
  useEffect(() => {
    if (filters.Parent_code !== "") {
      getSiteDetails();
    }
  }, []);

  return (
    <CCard
      //className="routehistoryGlass"
      style={{ width: "90%", height: "80vh", color: "black" }}
    >
      <CCardHeader className="headerEQModal">
        {" "}
        Customer Site Select{" "}
      </CCardHeader>
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
              onClick={() => getSiteDetails(1)}
            >
              Go
            </button>{" "}
            <div>
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="checkbox1"
                  style={{ color: "black !important" }}
                  checked={city}
                  onChange={() => setcheckCity(!city)}
                />
                <label
                  class="form-check-label"
                  for="checkbox1"
                  // style={{ color: "white" }}
                >
                  City
                </label>
              </div>
            </div>
            <div style={{ marginLeft: "20px" }}>
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="checkbox2"
                  checked={melRef}
                  onChange={() => setcheckMelRef(!melRef)}
                />
                <label
                  class="form-check-label"
                  for="checkbox2"
                  // style={{ color: "white" }}
                >
                  Melway Ref
                </label>
              </div>
            </div>
            <div style={{ marginLeft: "20px" }}>
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="checkbox3"
                  checked={region}
                  onChange={() => setcheckRegion(!region)}
                />
                <label
                  class="form-check-label"
                  for="checkbox3"
                  //  style={{ color: "white" }}
                >
                  Region
                </label>
              </div>
            </div>
            <div style={{ marginLeft: "20px" }}>
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="checkbox3"
                  checked={spIns}
                  onChange={() => setcheckspIns(!spIns)}
                />
                <label
                  class="form-check-label"
                  for="checkbox3"
                  //style={{ color: "white" }}
                >
                  Special Instructions
                </label>
              </div>
            </div>
            <div style={{ marginLeft: "20px" }}>
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="checkbox3"
                  checked={parentName}
                  onChange={() => setcheckparentName(!parentName)}
                />
                <label
                  class="form-check-label"
                  for="checkbox3"
                  //style={{ color: "white" }}
                >
                  Parent Name
                </label>
              </div>
            </div>
          </div>
          <div className="Qt-SiteTable" style={{ overflowX: "auto" }}>
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
                  backgroundColor: "#f7f7f7", // added for visibility when sticky
                }}
              >
                <tr>
                  <th style={{ minWidth: "70px" }}>
                    <input
                      type="text"
                      placeholder=""
                      value={filters.Parent_code}
                      onChange={(e) =>
                        handleFilterChange("Parent_code", e.target.value)
                      }
                      style={{ width: "100%" }}
                    />
                  </th>
                  {parentName && (
                    <th style={{ minWidth: "150px" }}>
                      <input
                        type="text"
                        placeholder=""
                        value={filters.Name}
                        onChange={(e) =>
                          handleFilterChange("Name", e.target.value)
                        }
                        style={{ width: "100%" }}
                      />
                    </th>
                  )}
                  <th style={{ minWidth: "150px" }}>
                    <input
                      type="text"
                      placeholder=""
                      value={filters.Parent_customer}
                      onChange={(e) =>
                        handleFilterChange("Parent_customer", e.target.value)
                      }
                      style={{ width: "100%" }}
                    />
                  </th>
                  <th style={{ minWidth: "150px" }}>
                    <input
                      type="text"
                      placeholder=""
                      value={filters.Address_code}
                      onChange={(e) =>
                        handleFilterChange("Address_code", e.target.value)
                      }
                      style={{ width: "100%" }}
                    />
                  </th>
                  {city && (
                    <th style={{ minWidth: "100px" }}>
                      <input
                        type="text"
                        placeholder=""
                        value={filters.Suburb_ent}
                        onChange={(e) =>
                          handleFilterChange("Suburb_ent", e.target.value)
                        }
                        style={{ width: "100%" }}
                      />
                    </th>
                  )}
                  {melRef && (
                    <th style={{ minWidth: "70px" }}>
                      <input
                        type="text"
                        placeholder=""
                        value={filters.Map_ref_ent}
                        onChange={(e) =>
                          handleFilterChange("Map_ref_ent", e.target.value)
                        }
                        style={{ width: "100%" }}
                      />
                    </th>
                  )}
                  <th colSpan="4" style={{ minWidth: "350px" }}>
                    <input
                      type="text"
                      placeholder=""
                      disabled
                      style={{
                        width: "100%",
                        backgroundColor: "rgba(247, 247, 247, 0.923)",
                        border: "2px solid white",
                      }}
                    />
                  </th>
                </tr>
                <tr>
                  <th style={{ minWidth: "70px" }}>Parent Code</th>
                  {parentName && (
                    <th style={{ minWidth: "150px" }}>Parent Name</th>
                  )}
                  <th style={{ minWidth: "150px" }}>Parent Customer</th>
                  <th style={{ minWidth: "150px" }}>Address</th>
                  {city && <th style={{ minWidth: "100px" }}>Suburb</th>}
                  {melRef && <th style={{ minWidth: "70px" }}>Mel Ref</th>}
                  <th style={{ minWidth: "70px" }}>Telephone</th>
                  <th style={{ minWidth: "60px" }}>Contact</th>
                  {spIns && (
                    <th style={{ minWidth: "80px" }}>Special Instructions</th>
                  )}
                  {region && <th style={{ minWidth: "60px" }}>Region</th>}
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
                    siteDetails.map((item, index) => (
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
                        onDoubleClick={() => handleRowClick(item)}
                      >
                        <td>{item.Parent_code}</td>
                        {parentName && <td>{item.Name.slice(0, 20)}</td>}
                        <td>{item.Parent_customer.slice(0, 20)}</td>
                        <td>{item.Address_code}</td>
                        {city && <td>{item.City}</td>}
                        {melRef && <td>{item.Ref_id}</td>}
                        <td>{item.Telephone}</td>
                        <td>{item.Contact}</td>
                        {spIns && <td>{item.Spinst}</td>}
                        {region && <td>{item.State}</td>}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" style={{ color: "white" }}>
                        No data available
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <Box
            display="flex-wrap"
            justifyContent="center"
            marginTop={2}
            bottom={10}
          >
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
      </CCardBody>{" "}
    </CCard>
  );
}
