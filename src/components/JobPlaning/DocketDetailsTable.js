import { object } from "prop-types";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from '@mui/icons-material/Save';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

import {
  createTheme,
  ThemeProvider,
  TextField,
  Box,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import FindInPageIcon from "@mui/icons-material/FindInPage";

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            height: "24px", // Smaller height for the input field
            fontSize: "12px", // Smaller font size
          },
          "& .MuiOutlinedInput-input": {
            padding: "4px 8px", // Adjust padding for input
          },
          "& .MuiInputLabel-root": {
            fontSize: "10px", // Smaller font size for labels
            transform: "translate(12px, 6px) scale(1)", // Center the label at the top
          },
          "& .MuiInputLabel-shrink": {
            transform: "translate(12px, -6px) scale(0.85)", // Shift label to the right and top when shrunk
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "black", // Default border color
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "black", // Black on hover
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "black", // Black when focused
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "black", // Black color for the shrunk label
          },
          fontSize: "8px", // Smaller helper text font size
        },
      },
    },
  },
});
const DocketTable = (props) => {
  const { dockectDetailTableData = [] } = props;
  const { selectedRowJobdata } = props;
  const [ docketdata, setDocketData]= useState([])


  const headers = [
    "Select",
    "Docket Status",
    "Truck Status",
    "Docket",
    "Manual Docket",
    "Quarry Docket No",
    "Quarry",
    "Carter Type",
    "New Truck Type",
    "Short Fee",
    "Driver Short Fee",
    "Carter",
    "Material Code",
    "Alloc Qty", // This header will be styled in red
    "Pickup Qty",
    "Delivered Qty",
    "Waiting Time",
    "Cust Order No",
    "Cartage Cost",
    "Distance",
    "Notes and Approx Time",
    "Send to Truck", // Hidden in UI, but still renders data
    "Send SMS", // Hidden in UI, but still renders data
    "SMS Count",
    "Additional Charge", // Displays button with label "Add"
    "Notify Customer",
    "Picked up Complete",
    "Delivery Docket Completion",
    "Remove Driver Short Fee",
    "Remove Short Fee",
    "Charge Return Fee",
  ];

  const checkboxColumns = [
    25, // Notify Customer
    26, // Picked up Complete
    27, // Delivery Docket Completion
    28, // Remove Driver Short Fee
    29, // Remove Short Fee
    30, // Charge Return Fee
    31,
  ];

  

  const getDocketStatusText = (docketstatus) => {
    switch (docketstatus) {
      case "N":
        return "New"; // Pale Red
      case "A":
        return "Assigned"; // Pale Orange
      case "P":
        return "Quarry"; // Light Yellow
      case "D":
        return "Completed"; // Pale Purple
      default:
        return "N/A"; // Default color if truck_status doesn't match
    }
  };
  const getTruckStatusText = (docketstatus) => {
    switch (docketstatus) {
      case "N":
        return "ALLOCATED"; // Pale Red
      case "S":
        return "DRIVER ACCEPTED"; // Pale Orange
      case "P":
        return "ARRIVE AT QUARRY"; // Light Yellow
      case "L":
        return "LOADING"; // Pale Purple
      case "T":
        return "TRAVELING"; // Pale Purple
      case "A":
        return "ARRIVED"; // Pale Purple
      case "D":
        return "FINISH"; // Pale Purple
      default:
        return "N/A"; // Default color if truck_status doesn't match
    }
  };

  
  const transformToSampleData = (apiData) => {
    if (!apiData) {

      // Assume you have a fixed number of columns you want to display
      return [[], []];
    }
    // Check if the input is an array, if not, wrap it in an array
    if (!Array.isArray(apiData)) {
      if (typeof apiData === "object") {
        apiData = [apiData]; // Wrap the object in an array
      } else {
        console.error(
          "transformToSampleData: Expected an array or an object, but received:",
          apiData
        );
        return [[]]; // Return an empty array if data is invalid
      }
    }

    // Now process the data assuming it's an array
    return apiData.map((item) => [
      item.Sel, // Placeholder for first column
      getDocketStatusText(item.DocketStatus) || "", // DocketStatus
      getTruckStatusText(item.TruckStatus), // Hardcoded example, adjust if necessary
      item.DocketNo || "", // DocketNo
      item.ManualDocketNo || "", // ManualDocketNo
      item.QuarryDocketNo || "", // QuarryDocketNo
      item.SupplierStore || "", // Quarry
      item.TruckType || "", // CarterType
      item.NewTruckType || "", // NewTruckType
      `$${item.ShortFee || 0}`, // Price
      `$${item.DriverShortFee?.toFixed(2) || 0}`, // ShortFee
      item.EquipCode || "", // Carter
      item.CatlogCode || "", // MaterialCode
      item.AllocQty || 0, // AllocQty
      item.PickedQty || 0, // PickUpQty
      item.DeliveredQty || 0, // DeliveredQty
      item.WaitingTime || 0, // WaitingTime
      // '2 hours', // Placeholder for waiting duration
      item.CustOrderNo || "", // CustOrderNo
      `$${item.CartageCost || 0} `, // CartageCost
      `${item.DistanceMeters || 0} km`, // distance
      item.Notes || "", // Notes
      item.NotifyCustomer ? "Yes" : "No", // NotifyCustomer
      ".", // Placeholder
      ".", // Placeholder
      item.SmsCount || 0, // SmsCount
      item.NotifyCustomer ? "Yes" : "No", // Placeholder
      item.PickUpCompletion ? "Yes" : "No", // PickUpCompletion
      item.DeliveryDocketCompletion ? "Yes" : "No", // DeliveryDocketCompletion
      item.RemoveDriverShortFee ? "Yes" : "No", // RemoveDriverShortFee
      item.RemoveShortFee ? "Yes" : "No", // RemoveShortFee
      "No", // Placeholder
      "No", // Placeholder
      `$${item.AdditionalCharge || 0}`, // AdditionalCharge
      item.BgColor || "trasparent",
    ]);
  };

  const sampleData = [[]];


  const tranformedData =
    dockectDetailTableData && dockectDetailTableData.length === 0
      ? sampleData
      : transformToSampleData(dockectDetailTableData);


      
  
  const getHighlightColor = (truckStatus, rowIndex, headerIndex) => {
    // Default to "transparent" if the rowIndex doesn't fall into the target range
    if (headerIndex < 1 || headerIndex > 19) {
      return "transparent";
    }

    // Define colors based on truck_status
    switch (truckStatus) {
      case "ALLOCATED":
        return "#FFCCCC"; // Pale Red
      case "DRIVER ACCEPTED":
      case "ARRIVE AT QUARRY":
        return "#FFD9B3"; // Pale Orange
      case "LOADING":
        return "#FFFFCC"; // Light Yellow
      case "TRAVELING":
        return "#E6CCFF"; // Pale Purple
      case "ARRIVED":
        return "#D9F2D9"; // Pale Green
      case "FINISH":
        return "#9cf39c"; // Light Green
      default:
        return "transparent"; // Default color if truck_status doesn't match
      //if p then arrive at quarry
    }
  };

  

  const handleDivert = () => {
    props?.handleDivertClick();
  };
  const handleSave = () => {
    props.handleSaveDockect();
  };
  const handleDelete = () => {
    props.handleDeleteAssignedDockect(docketdata);
  };

  const handlelookupclick=(component)=>{
    props.handleButtonClick(component)
  }
  const handleCheckboxChange = (rowIndex, isChecked) => {
    console.log("owIndex, isChecked",rowIndex, isChecked)
    
    const updatedData = [...tranformedData];
    updatedData[rowIndex][0] = isChecked;
    console.log("updatedData",updatedData)


    const saveobject = [...dockectDetailTableData]
    saveobject[rowIndex].Sel = isChecked

      props.setdocketTableData(saveobject)

  };



  return (
    <div className="p-1 dividercards mr-10">
      <div
        className="custom-data-table-container"
        style={{
          width: "100%",
          overflowX: "auto",
          maxWidth: "100%",
          marginRight: "10px",
        }}
      >
        <table className="custom-data-table">
          <tbody className="custom-data-tbody">
            {headers.map((header, headerIndex) => (
              <tr key={headerIndex}>
                <td
                  className="custom-data-header"
                  style={{
                    width: "120px",
                    fontWeight: "semi-bold",
                    textAlign: "left",
                    height: "18px",
                    minWidth: "120px",
                    //position:"absolute",
                    position: "sticky",
                    left: 0,
                    zIndex: 1,
                    //backgroundColor: headerIndex === 21 || headerIndex === 22 ? 'rgb(117, 117, 117)' : 'rgb(117, 117, 117)',
                    // visibility: headerIndex === 21 || headerIndex === 22 ? 'visible' : 'visible'
                  }}
                >
                  {header}
                  {/* {headerIndex === 21 || headerIndex === 22 ? '' : header}  */}
                </td>

                {tranformedData?.map((rowData, rowIndex) => (
                  <td
                    key={rowIndex}
                    className="custom-data-cell px-1"
                    style={{
                      backgroundColor: getHighlightColor(
                        rowData[2],
                        rowIndex,
                        headerIndex
                      ),

                      // rowIndex >= 1 && rowIndex <= 19 && rowData.BgColor === "GREEN"
                      //     ? "rgb(110, 223, 135)"
                      //     : rowIndex >= 1 && rowIndex <= 19 && rowData.BgColor === "BLUE"
                      //     ? ""
                      //     : "transparent", // Default color
                    }}
                  >
                    {headerIndex === 0 ? (
                      <input
                        type="checkbox"
                        style={{ textAlign: "left", margin: "5px" }}
                        checked={rowData[0]}
                        onChange={(e) => handleCheckboxChange(rowIndex, e.target.checked)}
                      />
                    ) : checkboxColumns.includes(headerIndex) ? (
                      <>
    {/* Display "Yes" or "No" based on rowData[headerIndex] */}
    <span>{rowData[headerIndex] === "Yes" ? "Yes" : "No"}</span>
    <input
      className=""
      type="checkbox"
      // Checkbox checked state is based on rowData[headerIndex]
      checked={rowData[headerIndex] === "Yes"}
      style={{ marginLeft: "5px" }}
      readOnly
    />
  </>
                    ) : headerIndex === 6 ? (
                      <>
    {rowData[6]}
    <FindInPageIcon
      className="lookupIconQuotation"
      style={{ fontSize: "18px" }} 
      onClick={() => handlelookupclick("QuarrySelction")}
    />
  </>
                    ) : headerIndex === 8 ? (
                      <>
                      {rowData[8]}
                      <FindInPageIcon
                        className="lookupIconQuotation "
                        style={{ fontSize: "18px" }} 
                         onClick={() => handlelookupclick("TruckTypeSelection")}
                      />
                    </>
                    ) : headerIndex === 11 ? (
                      <>
                      {rowData[11]}
                      <FindInPageIcon
                        className="lookupIconQuotation"
                    
                        style={{ fontSize: "18px" }} 
                         onClick={() => handlelookupclick("CarterSelection")}
                      />
                    </>
                    ) : headerIndex === 20 ? (
                      <button
                        className="bg-blue-500 text-white  border-none px-1 rounded-lg shadow-lg transition duration-300 ease-in-out hover:bg-blue-600 hover:shadow-xl"
                        style={{ margin: "0px" }}
                      >
                        View{" "}
                      </button>
                    ) : headerIndex === 21 ? (
                      <button
                        className="bg-blue-500 text-white  border-none px-1 rounded-lg shadow-lg transition duration-300 ease-in-out hover:bg-blue-600 hover:shadow-xl"
                        style={{ margin: "0px" }}
                      >
                        Send to Truck
                      </button>
                    ) : headerIndex === 22 ? (
                      <button
                        className=" text-black px-1  border-none rounded-lg shadow-lg transition duration-300 ease-in-out hover:bg-blue-600 hover:shadow-xl"
                        style={{
                          margin: "0px",
                          backgroundColor: "rgb(185, 216, 180)",
                        }}
                      >
                        Send SMS
                      </button>
                    ) : headerIndex === 24 ? (
                      <button
                        className="bg-blue-500 text-white border-none px-3 rounded-lg shadow-lg transition duration-300 ease-in-out hover:bg-blue-600 hover:shadow-xl"
                        style={{ margin: "0px" }}
                      >
                        Add
                      </button>
                    ) : (
                      rowData[headerIndex] // Render normal data for other columns
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            marginTop: "4px",
            borderRadius: "10px",
            margin: "5px",
            padding: "5px",
            backgroundColor: "#f9f9f9", // Optional background

            border: "1px solid #ddd",
          }}
        >
          {/* Title */}
          <Typography
            variant="h6"
            fontWeight="600"
            fontSize="12px"
            sx={{ marginBottom: "7px" }}
          >
            Delivery Details
          </Typography>

          {/* Form Inputs */}
          <Grid container spacing={1}>
            {/* Address */}
            <Grid item xs={12}>
              <TextField
                label="Address"
                variant="outlined"
                size="small"
                fullWidth
                InputLabelProps={{ style: { fontSize: "12px" } }} // Smaller label size
                inputProps={{ style: { fontSize: "12px", textAlign: "right" } }} // Smaller input text size
                value={selectedRowJobdata?.AddressTemp}
              />
            </Grid>

            {/* City and State */}
            <Grid item xs={6}>
              <TextField
                label="City"
                variant="outlined"
                size="small"
                fullWidth
                InputLabelProps={{ style: { fontSize: "12px" } }}
                inputProps={{ style: { fontSize: "12px", textAlign: "right" } }}
                value={selectedRowJobdata?.City}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="State"
                variant="outlined"
                size="small"
                fullWidth
                InputLabelProps={{ style: { fontSize: "12px" } }}
                inputProps={{ style: { fontSize: "12px", textAlign: "right" } }}
                value={selectedRowJobdata?.State}
              />
            </Grid>

            {/* Contact and Phone */}
            <Grid item xs={6}>
              <TextField
                label="Contact"
                variant="outlined"
                size="small"
                fullWidth
                InputLabelProps={{ style: { fontSize: "12px" } }}
                inputProps={{ style: { fontSize: "12px", textAlign: "right" } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Phone"
                variant="outlined"
                size="small"
                fullWidth
                InputLabelProps={{ style: { fontSize: "12px" } }}
                inputProps={{ style: { fontSize: "12px", textAlign: "right" } }}
              />
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center" gap={1}>
                <Button
                  variant="contained"
                  size="small"
                  disabled ={dockectDetailTableData.length===0}
                  startIcon={<DoubleArrowIcon  />}
                  sx={{
                    backgroundColor: "#b0bec5", // Dull grayish-blue
                    color: "#37474f", // Dark text
                    fontSize: "10px",
                    padding: "2px 6px",
                    minWidth: "50px",
                    "&:hover": { backgroundColor: "#90a4ae" }, // Slightly darker on hover
                  }}
                  onClick={() => handleDivert()}
                >
                  Divert
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<SaveIcon  />}
                  sx={{
                    backgroundColor: "#c8e6c9", // Dull green
                    color: "#2e7d32",
                    fontSize: "10px",
                    padding: "2px 6px",
                    minWidth: "50px",
                    "&:hover": { backgroundColor: "#a5d6a7" }, // Slightly darker on hover
                  }}
                  onClick={()=>handleSave()}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  startIcon={<DeleteIcon  />}
                  size="small"
                  sx={{
                    backgroundColor: "#ffcdd2", // Dull red
                    color: "#c62828",
                    fontSize: "10px",
                    padding: "2px 6px",
                    minWidth: "50px",
                    "&:hover": { backgroundColor: "#ef9a9a" }, // Slightly darker on hover
                  }}
                  onClick={()=>handleDelete()}
                  
                >
                  Delete
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default DocketTable;
