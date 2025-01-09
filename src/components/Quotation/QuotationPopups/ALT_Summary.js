import React, { useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CInput,
  CInputGroup,
  CInputGroupText,
  CSelect,
} from "@coreui/react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useState } from "react";
import { API_URL } from "src/generics/Config";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip } from "@material-ui/core";
const moment = require("moment");

export default function ALT_Summary() {
  const [loading, setLoading] = useState(false);
  const [AltDetails, setAltDetails] = useState(false);
  const [jobFromDate, setJobFromDate] = useState("");
  const [jobToDate, setJobToDate] = useState("");
  const [TruckType, setTruckType] = useState("");
  const [region, setRegion] = useState("");
  const [checkedArray, setCheckedArray] = useState([]);
  const [selectedIndex, setselectedIndex] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  //const today = moment.format("YYYY-MM-DD");
  const [OrderDate, setOrderDate] = useState(moment().format("YYYY-MM-DD"));

  const handleRowClick = (item) => {
    const Fromtime = item.DatetimeFrom.split("T")[1];
    const toTime = item.DatetimeTo.split("T")[1];
    console.log(item);
    setJobFromDate(Fromtime.split(":")[0]);
    setJobToDate(toTime.split(":")[0]);
    setTruckType(item.TruckType);
    setRegion(item.Region);

    const timestamp = item.DatetimeFrom;
    const date = new Date(timestamp);
    // Get the local time
    const localTime = date.toLocaleTimeString();
    console.log("Local Time:", Fromtime.split(":")[0]);
    // Store the selected "Quote No" in session storage
    // sessionStorage.setItem("selectedContact", contact);
    // sessionStorage.setItem("selectedTelephone", telephone);
    // if (props.onClose) {
    //   props.onClose();
    // }
  };

  useEffect(() => {
    const todayDate = moment().format("YYYY-MM-DD");
    getALT_summary_Details(todayDate);
  }, [OrderDate]);

  const Remove_ALT_summary_Details = (item) => {
    console.log("item", item);
    const body = [
      {
        Region: item.Region,
        TruckType: item.TruckType,
        DatetimeFrom: item.DatetimeFrom.split("T")[0],
        DatetimeTo: item.DatetimeTo.split("T")[0],
        IsSelect: item.IsSelect,
        IsColor: item.IsColor,
      },
    ];

    //setLoading(true);
    //  const todayDate = moment.format("YYYY-MM-DD");
    //localhost:8322/api/altsummary/loadaltbydate?date=2024-02-16
    //const quoteno = JSON.parse(sessionStorage.getItem("selectedQuoteNo"));
    fetch(`${API_URL}altsummary/altremove?date=${OrderDate}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        const datar = data.ResultSet;
        const msg = data.ReturnMessage;

        setAltDetails(datar);
        setAlertType("info");
        setAlertMessage(msg);
        setShowAlert(true);
        //window.alert(msg);
        //  setLoading(false);
        getALT_summary_Details();
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  };

  const update_ALT_summary_Details = () => {
    const body = [
      {
        Region: region,
        TruckType: TruckType,
        DatetimeFrom: OrderDate + "T" + jobFromDate,
        DatetimeTo: OrderDate + "T" + jobToDate,
        IsSelect: true,
      },
    ];
    setLoading(true);
    //  const todayDate = moment.format("YYYY-MM-DD");
    //localhost:8322/api/altsummary/loadaltbydate?date=2024-02-16
    //const quoteno = JSON.parse(sessionStorage.getItem("selectedQuoteNo"));
    fetch(`${API_URL}altsummary/altinput?date=${OrderDate}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        const datar = data.ResultSet;
        setAltDetails(datar);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  };
  const Book_ALT_summary_Details = () => {
    console.log("checkedArray", checkedArray);
    const body = {
      Region: region,
      TruckType: TruckType,
      DatetimeFrom: OrderDate + "T" + jobFromDate,
      DatetimeTo: OrderDate + "T" + jobToDate,
      IsSelect: true,
    };

    // setLoading(true);
    //  const todayDate = moment.format("YYYY-MM-DD");
    //localhost:8322/api/altsummary/loadaltbydate?date=2024-02-16
    //const quoteno = JSON.parse(sessionStorage.getItem("selectedQuoteNo"));
    fetch(`${API_URL}altsummary/altnabook?date=${OrderDate}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkedArray),
    })
      .then((res) => res.json())
      .then((data) => {
        const datar = data.ResultSet;
        setAltDetails(datar);
        getALT_summary_Details();
        // setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  };

  const getALT_summary_Details = () => {
    setLoading(true);
    //  const todayDate = moment.format("YYYY-MM-DD");
    //localhost:8322/api/altsummary/loadaltbydate?date=2024-02-16
    //const quoteno = JSON.parse(sessionStorage.getItem("selectedQuoteNo"));
    fetch(`${API_URL}altsummary/loadaltbydate?date=${OrderDate}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(filters),
    })
      .then((res) => res.json())
      .then((data) => {
        const datar = data.ResultSet;
        setAltDetails(datar);
        setCheckedArray([]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  };

  const insertdefault_summary_Details = (OrderDate) => {
    //localhost:8322/api/altsummary/loadaltbydate?date=2024-02-16
    //const quoteno = JSON.parse(sessionStorage.getItem("selectedQuoteNo"));
    fetch(`${API_URL}altsummary/insertdefault?date=${OrderDate}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(filters),
    })
      .then((res) => res.json())
      .then((data) => {
        const datar = data.ResultSet;
        //setAltDetails(datar);
        getALT_summary_Details();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const regionOptions = [
    <option key="emptyRegion" value=""></option>,
    "East",
    "West",
    "South",
    "North",
  ].map((region, index) => (
    <option key={index} value={region}>
      {region}
    </option>
  ));
  const TruckTypeOptions = [
    <option key="emptyRegion" value=""></option>,
    "T",
    "T/T",
    "TWR",
  ].map((region, index) => (
    <option key={index} value={region}>
      {region}
    </option>
  ));
  const handleCheckboxChange = (index, item) => {
    // setCheckedArray(item);
    //console.log("test", item);
    const isChecked = checkedArray.includes(item);

    // If the item is checked, remove it from the checked array
    if (isChecked) {
      const updatedCheckedArray = checkedArray.filter(
        (checkedItem) => checkedItem !== item
      );
      console.log("isChecked", isChecked);
      setCheckedArray(updatedCheckedArray);
    } else {
      // If the item is not checked, add it to the checked array
      setCheckedArray([...checkedArray, item]);
    }

    const updatedArray = [...AltDetails];
    updatedArray[index].IsSelect = !updatedArray[index].IsSelect;
    setAltDetails(updatedArray);
    console.log("updatedArray", updatedArray);
  };
  const handleNotAvailablebtn = (index) => {
    console.log("test", index);
    // Clone the array to avoid directly modifying the state
    const updatedArray = [...AltDetails];
    // Invert the RecSelected value at the specified index
    updatedArray[index].IsSelect = !updatedArray[index].IsSelect;
    setAltDetails(updatedArray);
    console.log("updatedArray", updatedArray);
    // Update the state with the modified array
    // setSelectedProducttableData(updatedArray);
  };
  return (
    <CCard
      //  className="routehistoryGlass"
      style={{ width: "90vh", height: "70vh", color: "white" }}
    >
      <CCardHeader className="headerEQModal"> ALT Summary</CCardHeader>
      <CCardBody>
        <div>
          <div className="inputdiv">
            <CInputGroup style={{ marginRight: "5px" }}>
              <CInputGroupText className="small-input-text">
                Order Date:
              </CInputGroupText>
              <CInput
                type="date"
                size="sm"
                className=" inputtextdark"
                onChange={(e) => setOrderDate(e.target.value)}
                value={OrderDate}
                // value={
                //   productTabledata.SorderHead
                //     ? productTabledata.SorderHead.Order_date.split("T")[0]
                //     : jobOrderDate
                // }
              />
            </CInputGroup>
            <CInputGroup>
              <button
                className="jobinputdivbutton"
                onClick={() => insertdefault_summary_Details(OrderDate)}
                // onClick={}
              >
                Default Update{" "}
              </button>
            </CInputGroup>
          </div>
          <div className="inputdiv">
            <CInputGroup style={{ marginRight: "5px" }}>
              <CInputGroupText className="small-input-text">
                Region:
              </CInputGroupText>
              <CSelect
                type="text"
                size="sm"
                className=" inputtextdark"
                onChange={(e) => setRegion(e.target.value)}
                value={region}
                // value={
                //   productTabledata.SorderHead
                //     ? productTabledata.SorderHead.Order_date.split("T")[0]
                //     : jobOrderDate
                // }
              >
                <option value=""></option>
                <option value="EAST">EAST</option>
                <option value="WEST">WEST</option>
                <option value="SOUTH">SOUTH</option>
                <option value="NORTH">NORTH</option>
              </CSelect>
            </CInputGroup>
            <CInputGroup style={{ marginRight: "5px" }}>
              <CInputGroupText className="small-input-text">
                Truck Type:
              </CInputGroupText>
              <CSelect
                type="text"
                size="sm"
                className=" inputtextdark"
                onChange={(e) => setTruckType(e.target.value)}
                value={TruckType}
                // value={
                //   productTabledata.SorderHead
                //     ? productTabledata.SorderHead.Order_date.split("T")[0]
                //     : jobOrderDate
                // }
              >
                <option value=""></option>
                <option value="T">T</option>
                <option value="T/T">T/T</option>
                <option value="TWS">TWS</option>
              </CSelect>
            </CInputGroup>
            <CInputGroup>
              <button
                className="jobinputdivbutton"
                onClick={(e) => update_ALT_summary_Details()}
              >
                Update ALT
              </button>
            </CInputGroup>
          </div>
          <div className="inputdiv">
            <CInputGroup style={{ marginRight: "5px" }}>
              <CInputGroupText className="small-input-text">
                From:
              </CInputGroupText>
              <CSelect
                type="text"
                size="sm"
                className=" inputtextdark"
                onChange={(e) => setJobFromDate(e.target.value)}
                value={jobFromDate}

                // value={
                //   productTabledata.SorderHead
                //     ? productTabledata.SorderHead.Order_date.split("T")[0]
                //     : jobOrderDate
                // }
              >
                <option value=""></option>
                <option value="06">06 am</option>
                <option value="07">07 am</option>
                <option value="08">08 am</option>
                <option value="09">09 am</option>
                <option value="10">10 am</option>
                <option value="11">11 am</option>
                <option value="12">12 pm</option>
                <option value="13">01 pm</option>
                <option value="14">02 pm</option>
                <option value="15">03 pm</option>
                <option value="16">04 pm</option>
                <option value="17">05 pm</option>
                <option value="05">06 pm</option>
              </CSelect>
            </CInputGroup>
            <CInputGroup style={{ marginRight: "5px" }}>
              <CInputGroupText className="small-input-text">
                To:
              </CInputGroupText>
              <CSelect
                type="text"
                size="sm"
                className=" inputtextdark"
                onChange={(e) => setJobToDate(e.target.value)}
                value={jobToDate}
                // value={
                //   productTabledata.SorderHead
                //     ? productTabledata.SorderHead.Order_date.split("T")[0]
                //     : jobOrderDate
                // }
              >
                <option value=""></option>

                <option value="06">06 am</option>
                <option value="07">07 am</option>
                <option value="08">08 am</option>
                <option value="09">09 am</option>
                <option value="10">10 am</option>
                <option value="11">11 am</option>
                <option value="12">12 pm</option>
                <option value="13">01 pm</option>
                <option value="14">02 pm</option>
                <option value="15">03 pm</option>
                <option value="16">04 pm</option>
                <option value="17">05 pm</option>
                <option value="05">06 pm</option>
              </CSelect>
            </CInputGroup>
            <CInputGroup>
              <button
                className="jobinputdivbutton"
                onClick={(e) => Book_ALT_summary_Details()}
              >
                N/A{" "}
              </button>
            </CInputGroup>
          </div>
          <div className="Qt-ContactTable">
            <table
              class="tableQt-SiteTable"
              style={{ marginTop: "10px", width: "100%" }}
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
                  <th style={{}}>Region</th>
                  <th style={{}}>Truck Type</th>
                  <th style={{}}>From</th>
                  <th style={{}}>To</th>
                  <th style={{}}>Select</th>
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
                  (AltDetails?.length > 0 ? (
                    AltDetails.map((item, index) => {
                      return (
                        <tr
                          key={index}
                          className="productThover-effect"
                          style={{
                            fontSize: "9px",
                            height: "5px",
                            marginBottom: "0px",
                            padding: "0px",
                            marginTop: "0px",
                            backgroundColor: item.IsColor
                              ? "rgb(228, 130, 130)"
                              : "rgb(102, 152, 175)",
                          }}
                          onClick={() => handleRowClick(item)}
                        >
                          <td style={{}}>{item.Region}</td>
                          <td style={{}}>{item.TruckType}</td>
                          <td style={{}}>{item.DatetimeFromstring}</td>
                          <td style={{}}>{item.DatetimeTostring}</td>
                          <td>
                            <input
                              type="checkbox"
                              // id={`rowCheckbox${index}`}
                              checked={item.RecSelected}
                              onChange={() => handleCheckboxChange(index, item)}
                            />
                            {/* {item && item.Supplier_name && ( */}
                            <Tooltip title="Remove">
                              <DeleteIcon
                                className="deletebtn "
                                style={{
                                  backgroundColor: "transparent",
                                  border: "none",
                                  cursor: "pointer", // Add cursor style to make it look clickable
                                  padding: "0", // Remove padding
                                  outline: "none", // Remove outline
                                  // width: "30px",
                                  height: "15px",
                                  marginLeft: "20px",
                                  marginTop: "-5px",
                                }}
                                onClick={(e) =>
                                  Remove_ALT_summary_Details(AltDetails[index])
                                }
                              />
                            </Tooltip>
                            {/* )} */}
                          </td>

                          {/* 
                         
                          <td>{item.Total_price}</td> */}
                        </tr>
                        //if item.ColorBoldCol == ture then i need to make that row Total_cost,Total_price,Price need to color in oragne bold
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="19">No data available</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {/* <div
              style={{
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              {" "}
              <button
                id="goButton" // Provide a valid id for the button
                className="inputdivbutton"
                style={{
                  marginTop: "0px",
                  width: "75px",
                  marginLeft: "20px",
                }}
                //onClick={getSiteDetails}
              >
                Save
              </button>
              <button
                id="goButton" // Provide a valid id for the button
                className="inputdivbutton"
                style={{
                  marginTop: "0px",
                  width: "75px",
                  marginLeft: "20px",
                }}
                //onClick={getSiteDetails}
              >
                Select
              </button>
            </div>{" "} */}
          </div>
        </div>
      </CCardBody>
    </CCard>
  );
}
