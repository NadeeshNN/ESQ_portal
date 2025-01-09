import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormGroup,
  CInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSelect,
} from "@coreui/react";
import moment from "moment";

import { API_URL } from "src/components/util/config";
import LinearProgress from "@material-ui/core/LinearProgress";

import {
  Box,
  Pagination,
} from "@mui/material";

export default function QuotationNo(props) {
  const sixMonthsFromToday = moment().add(6, "months").format("YYYY-MM-DD");
  //setToDate();
  const [tableData, setTableData] = useState([]);
  // const [setFilteredData, filteredData] = useState([]);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState(sixMonthsFromToday);
  const [region, setRegion] = useState([]);
 
  const [regionOptions, setRegionOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [rfid, setRfid] = useState(0);
  const [deletePermisson, setDeletePermisson] = useState(false);
  const [statusOptions, setStatusOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDoubleClicked, setisDoubleClicked] = useState(false);
  const [clickedRowIndex, setClickedRowIndex] = useState(null);
  const [allChecked, setAllChecked] = useState(true);
  const [eastRegion, setEastRegion] = useState(true);
  const [westRegion, setWestRegion] = useState(true);
  const [southRegion, setSouthRegion] = useState(true);
  const [northRegion, setNorthRegion] = useState(true);
  const [noRegion, setNoRegion] = useState(true);
  const [allRegion, setAllRegion] = useState(true);
  const [allcheckboxregions, setallcheckboxregions] = useState([]);
  const [selectedstatusOption, setSelectedstatusOption] = useState("");
  const [selectedOptionDescription, setSelectedOptionDescription] =
    useState("");
  const [selectedRegionDescription, setselectedRegionDescription] =
    useState("");
  const [selectedQuotes, setSelectedQuotes] = useState([]);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(30);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(30);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  

  const [filters, setFilters] = useState({
    Quote_no: props.Qouteno || "",
    Catlog_code: "",
    Status: "",
    Rejected_reason: "",
    State: "",
    Sales_person: "",
    Site_name: "",
    Quote_type: "",
    Cust_code: props.CustCode || "",
    Address: "",
    City: "",
    Map_ref: "",
    Product_sell: "",
    Product_profit: "",
    Cust_name: "",
    Truck_type: "",
    Supplier_store: "",
    //Distance_meters: "",
    // Add more filter state variables for other columns as needed
  });
  const [newfilters, setNewFilters] = useState({
    Distance_meters: "",
    // Add more filter state variables for other columns as needed
  });

  const handleFilterChange = (column, value) => {
    let newValue = value;

    // Check if the value is a number
    // if (!isNaN(value)) {
    //   // If it's a number, parse it and keep it as a number
    //   newValue = parseFloat(value);
    // } else {
    // If it's not a number, convert it to uppercase
    newValue = value.toUpperCase();
    // }
    setFilters({
      ...filters,
      [column]: newValue,
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 30));
    setPageNumber(0);
  };
  const handleFilternewChange = (column, value) => {
    let newValue = value;

    // Check if the value is a number
    // if (!isNaN(value)) {
    //   // If it's a number, parse it and keep it as a number
    //   newValue = parseFloat(value);
    // } else {
    // If it's not a number, convert it to uppercase
    newValue = value;
    // }
    setNewFilters({
      ...newfilters,
      [column]: newValue,
    });
  };

  const filteredData = tableData
    ? tableData.filter((row) => {
        const quoteNoMatch = row.Quote_no.toString().includes(filters.Quote_no);
        const Product_sellMatch = row.Product_sell.toString().includes(
          filters.Product_sell
        );
        //const quoteTypeMatch = row.Quote_type.includes(filters.quoteTypeFilter);
        const Catlog_codeMatch = row.Catlog_code.toUpperCase().includes(
          filters.Catlog_code
        );
        const StatusMatch = row.Status.toUpperCase().includes(filters.Status);
        const Rejected_reasonMatch = row.Rejected_reason.toUpperCase().includes(
          filters.Rejected_reason
        );
        const StateMatch = row.State.toUpperCase().includes(filters.State);
        const Sales_personMatch = row.Sales_person.toUpperCase().includes(
          filters.Sales_person
        );
        const Site_nameMatch = row.Site_name.toUpperCase().includes(
          filters.Site_name
        );
        const Quote_typeMatch = row.Quote_type.toUpperCase().includes(
          filters.Quote_type
        );
        const Cust_codeMatch = row.Cust_code.toUpperCase().includes(
          filters.Cust_code
        );
        const AddressMatch = row.Address.toUpperCase().includes(
          filters.Address
        );
        const CityMatch = row.City.toUpperCase().includes(filters.City);
        const Map_refMatch = row.Map_ref.toUpperCase().includes(
          filters.Map_ref
        );
        const Cust_nameMatch = row.Cust_name.toUpperCase().includes(
          filters.Cust_name
        );

        const Product_profitMatch = row.Product_profit.toString().includes(
          filters.Product_profit
        );
        const Supplier_storeMatch = row.Supplier_store.toString().includes(
          filters.Supplier_store
        );
        const DistanceMatch = row.Distance_meters.toString().includes(
          newfilters.Distance_meters
        );

        return (
          quoteNoMatch &&
          StatusMatch &&
          Catlog_codeMatch &&
          Rejected_reasonMatch &&
          StateMatch &&
          Sales_personMatch &&
          Site_nameMatch &&
          Quote_typeMatch &&
          Cust_codeMatch &&
          AddressMatch &&
          CityMatch &&
          Map_refMatch &&
          Product_profitMatch &&
          Cust_nameMatch &&
          Supplier_storeMatch &&
          DistanceMatch
        );
      })
    : [];

  const handleChangePage = (event, page) => {
    getTableData(page);
    setPageNumber(page);
    // getTableData(newPage, rowsPerPage);
  };

  const getTableData = (pageNumber) => {
    setLoading(true);
    let urlregionvalue;
    if (allcheckboxregions !== "") {
      urlregionvalue = allcheckboxregions;
    } else {
      urlregionvalue = region;
    }

    fetch(
      `${API_URL}quotation/quotationfind?company=ESQ&from=${fromDate}&to=${toDate}&status=${selectedstatusOption}&region=${urlregionvalue}&Quote_no=${filters.Quote_no}&Catlog_code=${filters.Catlog_code}&Status=${filters.Status}&Rejected_reason=${filters.Rejected_reason}&State${filters.State}&Sales_person=${filters.Sales_person}&Site_name=${filters.Site_name}&Quote_type=${filters.Quote_type}&Cust_code=${filters.Cust_code}&Address=${filters.Address}&City=${filters.City}&Map_ref=${filters.Map_ref}&Product_sell=${filters.Product_sell}&Product_profit=${filters.Product_profit}&Cust_name=${filters.Cust_name}&Truck_type=${filters.Truck_type}&PageSize=30&PageNumber=${pageNumber}`,
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
        const updatedData = data.ResultSet.map((row) => {
          // Update Quote_type values
          if (row.Quote_type) {
            switch (row.Quote_type.toUpperCase()) {
              case "G":
                return { ...row, Quote_type: "GARDEN" };
              case "C":
                return { ...row, Quote_type: "CONCRETE" };
              case "Q":
                return { ...row, Quote_type: "QUARRY" };
              case "A":
                return { ...row, Quote_type: "ASPHALT" };
              default:
                return row;
            }
          }
          return row;
        });
        setTableData(updatedData);
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

        //setTableData(datar);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  };
  const deleteTableData = async () => {
    try {
      const response = await fetch(
        `${API_URL}quotation/deletequote?uid=10&refid=${rfid}&permision=${deletePermisson}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedQuotes),
        }
      );

      const data = await response.json();

      if (data.ReturnStatus === true) {
        if (data.ReturnMessage[0] === "requstpermission") {
          const newRfid = data.ReturnValue;
          setRfid(newRfid);
          const newDeletePermisson = true;
          const confirmed = window.confirm(
            "There are orders related to selected quotes. Save the quotes as ''Expired'' will mark those orders as un-quoted. Do you wish to continue?"
          );
          if (!confirmed) {
            setRfid(0);
            setSelectedQuotes([]);

            // User cancelled, no need to continue
            return;
          }
          setAlertType("success");
          setAlertMessage("Quotes have been deleted successfully");
          setShowAlert(true);
          //("Quotes have been deleted successfully.");
          // Make the URL call here after state updates
          const url = `${API_URL}quotation/deletequote?uid=10&refid=${newRfid}&permision=${newDeletePermisson}`;
          const response = await fetch(url, {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(selectedQuotes),
          });
          getTableData();
          setSelectedQuotes([]);
          // Handle the response as needed
        } else if (data.ReturnMessage[0] === "deleted") {
          setRfid(0);
          setSelectedQuotes([]);
          setAlertType("info");
          setAlertMessage("Quotes have been deleted successfully");
          setShowAlert(true);
          // window.alert("Quotes have been deleted successfully");
          getTableData();
        }
      } else {
        // Handle API response when ReturnStatus is false
        console.error("API response indicates failure:", data.ReturnMessage);
        setRfid(0);
        setSelectedQuotes([]);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
  useEffect(() => {
    // Fetch data from the API
    fetch(`${API_URL}quotation/lookup?tableID=QOST`)
      .then((response) => response.json())
      .then((data) => {
        //const statusoption = data.ResultSet;
        const statusoption = data.ResultSet.filter(
          (option) => option.Code !== "."
        );
        statusoption.unshift({ Code: "", Description: "" });
        // Assuming data is an array of objects like you provided
        setStatusOptions(statusoption);
      })
      .catch((error) => {
        console.error("Error fetching data from the API:", error);
      });
    fetch(`${API_URL}quotation/lookup?tableID=REGN`)
      .then((response) => response.json())
      .then((data) => {
        const regionOptions = data.ResultSet.filter(
          (option) => option.Code !== "."
        );
        regionOptions.unshift(
          {
            Code: "",
            Description: "All-Region",
          },
          {
            Code: " ",
            Description: "No-Region",
          }
        );
        // Assuming data is an array of objects like you provided
        setRegionOptions(regionOptions);
      })
      .catch((error) => {
        console.error("Error fetching data from the API:", error);
      });
    if (props.CustCode) {
      getTableData();
    }
  }, []);

  const decreaseMonth = (date, setDateFunction) => {
    if (date === "") {
      const todayDate = moment().format("YYYY-MM-DD");
      setFromDate(todayDate);
    }

    const currentDate = moment(date).subtract(1, "months").format("YYYY-MM-DD");
    setDateFunction(currentDate);
  };

  // Function to increase the date by one month
  const increaseMonth = (date, setDateFunction) => {
    if (date === "") {
      const todayDate = moment().format("YYYY-MM-DD");
      setFromDate(todayDate);
    }
    const currentDate = moment(date).add(1, "months").format("YYYY-MM-DD");
    setDateFunction(currentDate);
  };

  const handlStatusOptionChange = (e) => {
    const selectedOption = e.target.value;
    setSelectedstatusOption(selectedOption);
  };

  const handleRegionChange = (e) => {
    const selectedValue = e.target.value;
    const optionStateMap = {
      E: setEastRegion,
      W: setWestRegion,
      S: setSouthRegion,
      N: setNorthRegion,
      " ": setAllRegion,
      "": setNoRegion,
    };

    // Set the selected option to true and all others to false
    for (const option in optionStateMap) {
      optionStateMap[option](option === selectedValue);
    }

    const valueMapping = {
      E: "'E'",
      N: "'N'",
      S: "'S'",
      W: "'W'",
      ".": "", // Add a mapping for "."
      // Add other mappings as needed
    };

    const selectedRegion = valueMapping[selectedValue] || selectedValue;

    const selectedOptionData = regionOptions.find(
      (option) => option.Code === selectedValue
    );
    const selectedRegionDescription = selectedOptionData
      ? selectedOptionData.Description
      : "";
    setRegion(selectedRegion);
    setselectedRegionDescription(selectedRegionDescription);
    getTableData();
  };

  const getQuoteType = (Quote_type) => {
    switch (Quote_type) {
      case "Q":
        return "QUARRY";
      case "G":
        return "GARDEN";
      case "C":
        return "CONCRETE";
      case "A":
        return "ASPHALT";
      case "S":
        return "SERVICE";
      default:
        return Quote_type;
    }
  };

  const getStatusDescription = (status) => {
    switch (status) {
      case "S":
        return "SUCCESSFUL";
      case "E":
        return "EXPIRED";
      case "C":
        return "CANCELED";
      case "N":
        return "NEW";
      case "P":
        return "PENDING";
      case "U":
        return "UNSUCCESSFUL";
      default:
        return status;
    }
  };
  const handleRowClick = (quoteNo, rowIndex) => {
    // Store the selected "Quote No" in session storage
    sessionStorage.setItem("selectedQuoteNo", quoteNo);
    localStorage.setItem("selectedQuoteNo", quoteNo);

    if (props.onClose) {
      props.onClose();
      // if (props.clearfunction) {
      //   props.clearfunction();
      //   props.refresh();
      // }
    }
  };
  // Function to handle "Check All" checkbox
  const handleCheckAll = (event) => {
    const isChecked = event.target.checked;
    setAllChecked(isChecked);

    if (isChecked) {
      setEastRegion(true);
      setWestRegion(true);
      setSouthRegion(true);
      setNorthRegion(true);
      setNoRegion(true);
    } else {
      setAllRegion(false);
    }
  };

  // Function to handle individual region checkboxes
  const handleRegionCheckbox = (region) => {
    switch (region) {
      case "east":
        setEastRegion(!eastRegion);
        break;
      case "west":
        setWestRegion(!westRegion);
        break;
      case "south":
        setSouthRegion(!southRegion);
        break;
      case "north":
        setNorthRegion(!northRegion);
        break;
      case "no":
        setNoRegion(!noRegion);
        break;
      default:
        break;
    }

    // Check if all individual region checkboxes are checked and update "All Region" accordingly
    if (eastRegion && westRegion && southRegion && northRegion && noRegion) {
      setAllRegion(true);
    } else {
      setAllRegion(false);
    }
    getSelectedRegions();
  };

  // Function to get selected regions
  const getSelectedRegions = () => {
    const selectedRegions = [];
    if (allRegion) {
      selectedRegions.push("");
    } else {
      if (eastRegion) selectedRegions.push("'E'");
      if (westRegion) selectedRegions.push("'W'");
      if (southRegion) selectedRegions.push("'S'");
      if (northRegion) selectedRegions.push("'N'");
      if (noRegion) selectedRegions.push("''");
    }
    const checkboxregions = selectedRegions.join(",");
    setallcheckboxregions(checkboxregions);
  };

  const handleRowCheckboxClick = (quoteNo) => {
    // Check if the quoteNo is already in the selectedQuotes array
    if (selectedQuotes.includes(quoteNo)) {
      // If it's already selected, remove it
      setSelectedQuotes(selectedQuotes.filter((q) => q !== quoteNo));
    } else {
      // If it's not selected, add it
      setSelectedQuotes([...selectedQuotes, quoteNo]);
    }
  };

  return (
    <CCard
      //className="routehistoryGlass"
      style={{ width: "160vh", height: "80vh", color: "white" }}
    >
      <CCardHeader className="headerEQModal "> Quotation Browse</CCardHeader>
      <CCardBody>
        <div class="row ">
          <CCol md={2}>
            <CInputGroup style={{ marginBottom: "6%" }}>
              <CInputGroupText className="small-input-text">
                Company:
              </CInputGroupText>
              <CSelect size="sm">
                {/* Options for the dropdown */}
                <option value="option1">ESSENDON QUIRRIES </option>
                {/* <option value="option2">Option 2</option>
              <option value="option3">Option 3</option> */}
              </CSelect>
            </CInputGroup>

            <CInputGroup style={{}}>
              <CInputGroupText className="small-input-text">
                Quotation Status :
              </CInputGroupText>
              <CSelect
                size="sm"
                key={selectedOption}
                onChange={handlStatusOptionChange}
              >
                {/* <option> {selectedOptionDescription}</option> */}
                {statusOptions.map((option) => (
                  <option value={option.Code} key={option.Description}>
                    {option.Description}
                  </option>
                ))}
              </CSelect>
            </CInputGroup>
          </CCol>
          <CCol md={4}>
            <CFormGroup>
              <CInputGroup>
                <CInputGroupText
                  className="small-input-text"
                  style={{ padding: "3px" }}
                >
                  Quotation From:
                </CInputGroupText>
                <button
                  className="inputdivbutton"
                  style={{
                    marginLeft: "10px",
                    marginTop: "0px",
                    width: "43px",
                  }}
                  onClick={() => decreaseMonth(fromDate, setFromDate)}
                >
                  {" "}
                  &lt;&lt;
                </button>

                <CInput
                  type="date"
                  size="sm"
                  className="inputQuote"
                  style={{ marginLeft: "20px", marginRight: "20px" }}
                  onChange={(e) => setFromDate(e.target.value)}
                  value={fromDate}
                />

                <button
                  className="inputdivbutton"
                  style={{
                    marginLeft: "10px",
                    marginTop: "0px",
                    width: "43px",
                  }}
                  onClick={() => increaseMonth(fromDate, setFromDate)}
                >
                  &gt;&gt;
                </button>

                {/* <i className="fa fa-search" aria-hidden="true"> */}

                {/* </i> */}
              </CInputGroup>
            </CFormGroup>
            <CFormGroup>
              <CInputGroup>
                <CInputGroupText
                  className="small-input-text "
                  style={{ width: "95px", padding: "3px" }}
                >
                  Quotation To{"    "}:
                </CInputGroupText>
                <button
                  className="inputdivbutton"
                  style={{
                    marginLeft: "10px",
                    marginTop: "0px",
                    width: "43px",
                  }}
                  onClick={() => decreaseMonth(toDate, setToDate)}
                >
                  &lt;&lt;
                </button>

                <CInput
                  type="date"
                  size="sm"
                  className="inputQuote"
                  style={{ marginLeft: "20px", marginRight: "20px" }}
                  onChange={(e) => setToDate(e.target.value)}
                  value={toDate}
                />
                <button
                  className="inputdivbutton"
                  style={{
                    marginLeft: "10px",
                    marginTop: "0px",
                    width: "43px",
                  }}
                  onClick={() => increaseMonth(toDate, setToDate)}
                >
                  &gt;&gt;
                </button>
                {/* <i className="fa fa-search" aria-hidden="true"> */}

                {/* </i> */}
              </CInputGroup>
            </CFormGroup>
          </CCol>
          <CCol md={4}>
            <div class="container" style={{ font: "11px" }}>
              <div class="row">
                <div class="col-md-3">
                  <div class="form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="checkbox1"
                      style={{ color: "black !important" }}
                      // checked={checkEast}
                      // onChange={() => setcheckEast(!checkEast)}
                      checked={eastRegion}
                      onChange={() => handleRegionCheckbox("east")}

                      //value={EAST}
                      // onClick={setRegion("EAST")}
                    />
                    <label class="form-check-label" for="checkbox1">
                      EAST
                    </label>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="checkbox2"
                      // checked={checkWest}
                      // onChange={() =>
                      //   handleRegionCheckbox(setcheckWest, checkWest)
                      // }
                      checked={westRegion}
                      onChange={() => handleRegionCheckbox("west")}
                      // onChange={() => setcheckWest(!checkWest)}
                      //onClick={handleClick}
                    />
                    <label class="form-check-label" for="checkbox2">
                      WEST
                    </label>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="checkbox3"
                      // checked={checkAll}
                      // // onChange={handleCheckAll}
                      // onChange={() =>
                      //   handleRegionCheckbox(setcheckAllRegion, checkAllRegion)
                      // }
                      // onClick={setRegion("ALL")}
                      checked={allChecked}
                      onChange={handleCheckAll}
                    />
                    <label class="form-check-label" for="checkbox3">
                      All Region
                    </label>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-3">
                  <div class="form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="checkbox4"
                      // checked={checkSouth}
                      // // onChange={() => setcheckSouth(!checkSouth)}
                      // onChange={() =>
                      //   handleRegionCheckbox(setcheckSouth, checkSouth)
                      // }
                      checked={southRegion}
                      onChange={() => handleRegionCheckbox("south")}
                      // onClick={setRegion("SOUTH")}
                    />
                    <label class="form-check-label" for="checkbox4">
                      SOUTH
                    </label>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="checkbox5"
                      // checked={checkNorth}
                      // // onChange={() => setcheckNorth(!checkNorth)}
                      // onChange={() =>
                      //   handleRegionCheckbox(setcheckNorth, checkNorth)
                      // }
                      checked={northRegion}
                      onChange={() => handleRegionCheckbox("north")}
                      // onClick={setRegion("NORTH")}
                    />
                    <label class="form-check-label" for="checkbox5">
                      NORTH
                    </label>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="checkbox6"
                      // checked={checknoregion}
                      // onChange={() =>
                      //   handleRegionCheckbox(setNoRegionAll, checknoregion)
                      // }
                      checked={noRegion}
                      onChange={() => handleRegionCheckbox("no")}
                      // onChange={() => setNoRegionAll(!checknoregion)}
                      // onClick={handleCheckNoRegion}

                      // onClick={setRegion("")}
                    />
                    <label class="form-check-label" for="checkbox6">
                      No Region
                    </label>
                  </div>
                </div>
              </div>

              <CInputGroup
                style={{ marginTop: "1%", marginLeft: "-15px" }}
                class="col-md-8"
              >
                {/* regionOptions */}
                <CSelect
                  size="sm"
                  onChange={handleRegionChange}
                  // key={selectedOption}
                  value={region}
                >
                  {/* Options for the dropdown */}
                  <option>{selectedRegionDescription}</option>
                  {regionOptions.map((option) => (
                    <option value={option.Code}>{option.Description}</option>
                  ))}
                  {/* <option value="'E'"> EAST</option>
                  <option value="'W'">WEST</option>
                  <option value="'S'">SOUTH</option>
                  <option value="'N'">NORTH</option>
                  <option value="">All-Region</option>
                  <option value="''">No-Region</option> */}
                </CSelect>
              </CInputGroup>
            </div>
          </CCol>
          <CCol md={2}>
            <CRow>
              <div style={{ display: "inline-block" }}>
                {" "}
                <button
                  id="goButton" // Provide a valid id for the button
                  className="inputdivbutton"
                  style={{
                    marginTop: "0px",
                    width: "65px",
                  }}
                  onClick={(e) => getTableData(pageNumber)}
                  // onKeyDown={handleEnterKeyPress} // Listen for "Enter" key press
                  // tabIndex="0" // Add a tabindex to make the button focusable
                >
                  Go
                </button>
                <button
                  // className="inputdivbutton"
                  className={`inputdivbutton ${
                    selectedQuotes.length !== 0 ? "delete-quote" : ""
                  }`}
                  style={{
                    marginLeft: "10px",
                    marginTop: "0px",
                    width: "60px",
                  }}
                  disabled={selectedQuotes.length === 0}
                  onClick={deleteTableData}
                >
                  Delete
                </button>
              </div>
            </CRow>
            <CRow
              className=""
              style={{
                // float: "bottom",
                marginTop: "25px",
                // width: "60%",
                marginLeft: "-200px",
              }}
            >
              <CCol className="p-0">
                <div className="d-flex align-items-center justify-content-center">
                  <div className="box1quote m-0" />
                  <h7 className="boxtext2 m-0 ml-1" style={{ color: "black" }}>
                    Expired
                  </h7>
                </div>
              </CCol>
              <CCol className="" style={{ marginLeft: "-200px" }}>
                <div className="d-flex align-items-center justify-content-center">
                  <div className="box2quote m-0" />
                  <h7 className="boxtext2 m-0 ml-1" style={{ color: "black" }}>
                    &lt;= 1 Week
                  </h7>
                </div>
              </CCol>
            </CRow>
          </CCol>
        </div>
        <div>
          {" "}
          <div>
            <div style={{ display: "flex", maxWidth: "100%" }}></div>
            <div
              className="QuotationNoTable"
              // style={{ overflowY: "auto", height: "600px", maxWidth: "100%" }}
            >
              <table class="tableQuotationNo">
                <thead
                  class="tableQuotationNo-grey-header "
                  style={{
                    height: "3px",
                    position: "sticky",
                    top: "0",
                    fontSize: "11px",
                    color:"black"
                  }}
                >
                  {/* Second row of the table header with input fields for filtering */}
                  <tr   >
                    <th>
                      <input
                        type="number"
                        placeholder=""
                        value={filters.Quote_no}
                        onChange={(e) =>
                          handleFilterChange("Quote_no", e.target.value)
                        }
                        style={{ width: "100px", color:"black" }}
                      />
                    </th>
                    <th>
                      <input
                        type="text"
                        placeholder=""
                        value={
                          filters.Quote_type
                            ? filters.Quote_type.toUpperCase()
                            : ""
                        }
                        onChange={(e) =>
                          handleFilterChange("Quote_type", e.target.value)
                        }
                        style={{ width: "90px" }}
                      />
                    </th>
                    <th>
                      <input
                        type="text"
                        placeholder=""
                        value={
                          filters.Cust_code
                            ? filters.Cust_code.toUpperCase()
                            : ""
                        }
                        onChange={(e) =>
                          handleFilterChange("Cust_code", e.target.value)
                        }
                        style={{ width: "90px" }}
                      />
                    </th>
                    <th>
                      <input
                        type="text"
                        placeholder=""
                        value={
                          filters.Cust_name
                            ? filters.Cust_name.toUpperCase()
                            : ""
                        }
                        onChange={
                          (e) => handleFilterChange("Cust_name", e.target.value) // havent implemtned
                        }
                        style={{ width: "130px" }}
                      />
                    </th>
                    <th>
                      {" "}
                      <input
                        type="text"
                        placeholder=""
                        value={
                          filters.Site_name
                            ? filters.Site_name.toUpperCase()
                            : ""
                        }
                        onChange={(e) =>
                          handleFilterChange("Site_name", e.target.value)
                        }
                        style={{ width: "120px" }}
                      />
                    </th>
                    <th>
                      {" "}
                      <input
                        type="text"
                        placeholder=""
                        value={
                          filters.Address ? filters.Address.toUpperCase() : ""
                        }
                        onChange={(e) =>
                          handleFilterChange("Address", e.target.value)
                        }
                        style={{ width: "130px" }}
                      />
                    </th>
                    <th>
                      <input
                        type="text"
                        placeholder=""
                        value={filters.City ? filters.City.toUpperCase() : ""}
                        onChange={(e) =>
                          handleFilterChange("City", e.target.value)
                        }
                        style={{ width: "90px" }}
                      />
                    </th>
                    <th>
                      <input
                        type="text"
                        placeholder=""
                        value={
                          filters.Map_ref ? filters.Map_ref.toUpperCase() : ""
                        }
                        onChange={(e) =>
                          handleFilterChange("Map_ref", e.target.value)
                        }
                        style={{ width: "70px" }}
                      />
                    </th>
                    <th>
                      {" "}
                      <input
                        type="text"
                        placeholder=""
                        value={
                          filters.Catlog_code
                            ? filters.Catlog_code.toUpperCase()
                            : ""
                        }
                        onChange={
                          (e) =>
                            handleFilterChange("Catlog_code", e.target.value) // not implimented
                        }
                        style={{ width: "100px" }}
                      />
                    </th>
                    <th>
                      <input
                        type="text"
                        placeholder="0.0"
                        value={newfilters.Distance_meters} // not implimented
                        onChange={(e) =>
                          handleFilternewChange(
                            "Distance_meters",
                            e.target.value
                          )
                        }
                        style={{ width: "70px", fontSize: "11px" }}
                      />
                    </th>
                    <th>
                      {" "}
                      <input
                        type="text"
                        placeholder="0.0"
                        value={filters.Product_sell}
                        onChange={
                          (e) =>
                            handleFilterChange("Product_sell", e.target.value) // not implimented
                        }
                        style={{ width: "60px", fontSize: "11px" }}
                      />
                    </th>
                    <th>
                      {" "}
                      <input
                        type="text"
                        placeholder="0.0"
                        value={filters.Product_profit}
                        onChange={(e) =>
                          handleFilterChange("Product_profit", e.target.value)
                        }
                        style={{ width: "60px", fontSize: "11px" }}
                      />
                    </th>
                    <th>
                      {" "}
                      <input
                        type="text"
                        placeholder=""
                        value={
                          filters.Supplier_store
                            ? filters.Supplier_store.toUpperCase()
                            : ""
                        }
                        onChange={
                          (e) =>
                            handleFilterChange("Supplier_store", e.target.value) //// not implimented
                        }
                        style={{ width: "60px", fontSize: "11px" }}
                      />
                    </th>
                    <th>
                      {" "}
                      <input
                        type="text"
                        placeholder=""
                        value={
                          filters.Truck_type
                            ? filters.Truck_type.toUpperCase()
                            : ""
                        }
                        onChange={
                          (e) =>
                            handleFilterChange("Truck_type", e.target.value) // not implimented
                        }
                        style={{ width: "90px" }}
                      />
                    </th>
                    <th>
                      {" "}
                      <input
                        type="text"
                        placeholder=""
                        value={filters.State ? filters.State.toUpperCase() : ""}
                        onChange={(e) =>
                          handleFilterChange("State", e.target.value)
                        }
                        style={{ width: "60px", fontSize: "11px" }}
                      />
                    </th>
                    <th>
                      {" "}
                      <input
                        type="text"
                        placeholder=""
                        value={
                          filters.Sales_person
                            ? filters.Sales_person.toUpperCase()
                            : ""
                        }
                        onChange={(e) =>
                          handleFilterChange("Sales_person", e.target.value)
                        }
                        style={{ width: "90px" }}
                      />
                    </th>
                    <th>
                      {" "}
                      <input
                        type="text"
                        placeholder=""
                        value={
                          filters.Status ? filters.Status.toUpperCase() : ""
                        }
                        onChange={(e) =>
                          handleFilterChange("Status", e.target.value)
                        }
                        style={{ width: "70px", fontSize: "11px" }}
                      />
                    </th>
                    <th>
                      <input
                        type="text"
                        placeholder=""
                        value={
                          filters.Rejected_reason
                            ? filters.Rejected_reason.toUpperCase()
                            : ""
                        }
                        onChange={(e) =>
                          handleFilterChange("Rejected_reason", e.target.value)
                        }
                        style={{ width: "120px", fontSize: "11px" }}
                      />
                    </th>
                    <th>
                      <input
                        type="text"
                        placeholder=""
                        disabled
                        style={{ width: "60px", fontSize: "11px" }}
                      />
                    </th>
                  </tr>
                  <tr style={{ maxHeight: "12px" }}>
                    <th style={{ width: "100px" }}>Quote No</th>
                    <th style={{ width: "90px" }}>Quote Type</th>
                    <th style={{ width: "90px" }}>Cust Code</th>
                    <th style={{ width: "130px" }}>Cust Name</th>
                    <th style={{ width: "120px" }}>Site Name</th>
                    <th style={{ width: "130px" }}>Site Address</th>
                    <th style={{ width: "90px" }}>Site City</th>
                    <th style={{ width: "70px" }}>Map Ref</th>
                    <th style={{ width: "100px" }}>Product Code</th>
                    <th style={{ width: "70px" }}>Distance</th>
                    <th style={{ width: "60px" }}>Price</th>
                    <th style={{ width: "60px" }}>Margin</th>
                    <th style={{ width: "60px" }}>Plant</th>
                    <th style={{ width: "90px" }}>Truck Type</th>
                    <th style={{ width: "60px" }}>State</th>
                    <th style={{ width: "90px" }}>Sales Person</th>
                    <th style={{ width: "70px" }}>Status</th>
                    <th style={{ width: "120px" }}>Lost Reason</th>
                    <th style={{ width: "60px" }}>Select</th>
                  </tr>
                </thead>
                {/* {loading ? ( // Check if loading is true
                  <LinearProgress /> // Display LinearProgress while loading
                ) : ( */}
                <tbody>
                  {loading && (
                    <tr>
                      <td colSpan="19">
                        <LinearProgress style={{ width: "100%" }} />
                      </td>
                    </tr>
                  )}
                  {!loading &&
                    (tableData?.length > 0 ? (
                      filteredData.map((item, index) => {
                        const quoteDate = new Date(item.Quote_date);
                        const quoteValidity = item.Quote_validity;
                        const currentDate = new Date();
                        const subvali = Math.floor(
                          (currentDate - quoteDate) / (1000 * 60 * 60 * 24)
                        );

                        // Determine the row color class
                        let rowColorClass = "";
                        if (subvali > quoteValidity) {
                          rowColorClass = "red-row";
                        } else if (quoteValidity - subvali <= 7) {
                          rowColorClass = "yellow-row";
                        } else {
                          rowColorClass = "grey-row";
                        }

                        return (
                          <tr
                            key={index}
                            // className={`row2hover-effect ${rowColorClass}`}
                            className={`row2hover-effect ${
                              selectedQuotes.includes(item.Quote_no)
                                ? "selected-row"
                                : rowColorClass
                            }${
                              isDoubleClicked && clickedRowIndex === index
                                ? "popup-animation"
                                : ""
                            }`}
                            style={{
                              fontSize: "9px",
                              height: "5px",
                              marginBottom: "0px",
                              padding: "0px",
                              marginTop: "0px",
                            }}
                            onDoubleClick={() =>
                              handleRowClick(item.Quote_no, index)
                            }
                          >
                            <td style={{}}>{item.Quote_no}</td>
                            <td style={{}}>{getQuoteType(item.Quote_type)}</td>
                            <td style={{}}>{item.Cust_code}</td>
                            <td
                              style={{
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {item.Cust_name.slice(0, 16)}
                            </td>
                            <td
                              style={{
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {item.Site_name.slice(0, 17)}
                            </td>
                            <td
                              style={{
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {item.Address.slice(0, 17)}
                            </td>
                            <td>{item.City.slice(0, 12)}</td>
                            <td>{item.Map_ref}</td>
                            <td>{item.Catlog_code}</td>
                            <td>{item.Distance_meters}</td>
                            <td>{item.Product_sell}</td>
                            <td>{item.Product_profit}</td>
                            <td>{item.Supplier_store}</td>
                            <td>{item.Truck_type}</td>
                            <td>{item.State}</td>
                            <td>{item.Sales_person}</td>
                            <td>{getStatusDescription(item.Status)}</td>
                            <td>{item.Rejected_reason}</td>
                            <td style={{ textAlign: "center" }}>
                              {" "}
                              <input
                                // type="checkbox"
                                // id="selectAll"
                                // style={{ justifyContent: "center" }}

                                type="checkbox"
                                id={`rowCheckbox${index}`}
                                checked={selectedQuotes.includes(item.Quote_no)}
                                onChange={() =>
                                  handleRowCheckboxClick(item.Quote_no)
                                }
                              />
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="19">No data available</td>
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
