
import React from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
} from "@coreui/react";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import { Button, TextField } from '@mui/material';
import { Switch, FormControlLabel } from "@mui/material";
import CarterSelection from './popupScreens/CarterSelection';
import QuarrySelction from './popupScreens/QuarrySelction';
import TruckTypeSelection from './popupScreens/TruckTypeSelection';
import Draggable from 'react-draggable';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from "@mui/icons-material/Delete";
const BulkAllocation = (props) => {

  const {bulkAllocationData}= props;

  console.log(bulkAllocationData)
  const headers = [

    'Quarry',
    'Carter Type',
    'New Truck Type',
    'Short Fee',
    'Driver Short Fee',
    'Carter',
    'Material Code',
    'Alloc Qty', // This header will be styled in red
    'Pickup Qty',
    'Delivered Qty',
    'Waiting Time',
    'Cust Order No',
    'Cartage Cost',
    'Distance',
    'Notify Customer',
    'Remove Short Fee',
    'Remove Driver Short Fee',
    'Charge Return Fee'
  ];

  
  const checkboxColumns = [
    14,
    15,
    16, 
    17,
   
  ];

  // Sample data - replace with actual data as needed

   
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
      item.CustOrderNo || "", // CustOrderNo
      `$${item.CartageCost || 0} `, // CartageCost
      `${item.DistanceMeters || 0} km`, // distance
      item.NotifyCustomer ? "Yes" : "No", // Placeholder
      item.RemoveShortFee ? "Yes" : "No", // RemoveShortFee
      item.RemoveDriverShortFee ? "Yes" : "No", // RemoveDriverShortFee
      item.RemoveDriverShortFee ? "Yes" : "No", // RemoveDriverShortFee

    ]);
  };

  const sampleData = [[]];


  const tranformedData =
  bulkAllocationData && bulkAllocationData.length === 0
      ? sampleData
      : transformToSampleData(bulkAllocationData?.DocketTemplate);

  const handlelookupclick=(component)=>{
    props.handleButtonClick(component)
  }



  return (
    <CCard
      //className="routehistoryGlass"
      style={{   }}
    >
      <CCardHeader className="headerEQModal"> Bulk Allocation </CCardHeader>
      <CCardBody>

      {/* {popupVisible && selectedComponent && (
          <div style={overlayStyle} onClick={() => closePopup()}>
             <Draggable>
            <div onClick={(e) => e.stopPropagation()}>
            
              
              {selectedComponent === "CarterSelection" && (
                <CarterSelection onClose={closePopup} />
              )}
              {selectedComponent === "QuarrySelction" && (
                <QuarrySelction onClose={closePopup} />
              )}
              {selectedComponent === "TruckTypeSelection" && (
                <TruckTypeSelection onClose={closePopup} />
              )}             
            </div>
            </Draggable>
     
          </div>
        )} */}



    <div className="row "  style={{ margin: 0, maxWidth:"800px", minWidth:"700px", height:"60vh"  }}>
              <div className="col-8 col-lg-8 mt-10 ">
    <div className="p-1  JobPlanningTables bg-white">
    <div className="custom-data-table-container"  style={{ width: "100%", overflowX: "auto" , maxWidth:"330px"}}>
      <table className="custom-data-table">
        <tbody className="custom-data-tbody" >
          {headers.map((header, headerIndex) => (
            <tr key={headerIndex}>
              <td className="custom-data-header"
               style={{ width:"120px",
               fontWeight: 'semi-bold', 
               textAlign: 'right', 
               height:"26px",
               minWidth:"140px" ,
            
              
               
               }}>
              {header}
                
              
              </td>
              
              {tranformedData.map((rowData, rowIndex) => (
                  <td key={rowIndex} className="custom-data-cell border">
            

            {     headerIndex === 0 ? (
                      <>
    {rowData[0]}
    <FindInPageIcon
      className="lookupIconQuotation"
      style={{ fontSize: "18px" }} 
      onClick={() => handlelookupclick("QuarrySelction")}
    />
  </>
                    ) : headerIndex === 2 ? (
                      <>
                      {rowData[2]}
                      <FindInPageIcon
                        className="lookupIconQuotation "
                        style={{ fontSize: "18px" }} 
                         onClick={() => handlelookupclick("TruckTypeSelection")}
                      />
                    </>
                    ) : headerIndex === 5 ? (
                      <>
                      {rowData[5]}
                      <FindInPageIcon
                        className="lookupIconQuotation"
                    
                        style={{ fontSize: "18px" }} 
                         onClick={() => handlelookupclick("CarterSelection")}
                      />
                    </>
                    ) : 
                     checkboxColumns.includes(headerIndex) ? (
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
                    ) :    (rowData[headerIndex])   
                       }
              
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  </div>
  </div>
  <div className="col-3 col-lg-4 mt-20  -ml-10">
  <TextField
  label="Number of Dockets"
  variant="outlined"
  size="small"
  fullWidth
  InputLabelProps={{ style: { fontSize: "12px" },    shrink: true, }} // Smaller label size
  inputProps={{
    style: { fontSize: "12px", textAlign: "center" }, // Smaller input text size
    min: 0, // Optional: Minimum value
    max: 1000, // Optional: Maximum value
    step: 1, // Optional: Step for increment/decrement buttons
  }}
  type="number"
  value={bulkAllocationData?.NumOfDocket}
 // onChange={(e) => handleAddressChange(e.target.value)} // Update your logic here
/>


                <div className="mt-2 -ml-3 ">
      <FormControlLabel
        control={
          <Switch
            //checked={isChecked}
            //onChange={handleChange}
            color="primary" // Change color as needed (e.g., secondary, default)
          />
        }
        label="Send to Truck?"
        labelPlacement="start" // Position label on the left
      />
    </div>
    <Button
className="mt-10"
startIcon={<SaveIcon  />}
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: "#c8e6c9", // Dull green
                    color: "#2e7d32",
                    fontSize: "10px",
                    padding: "2px 6px",
                    minWidth: "50px",
                    marginTop:"10px",
                    "&:hover": { backgroundColor: "#a5d6a7" }, // Slightly darker on hover
                  }}
                  //onClick={()=>handleSave()}
                >
                  Save
                </Button>

  </div>
  </div>
  </CCardBody>{" "}
  </CCard>
  );
};

export default BulkAllocation;

