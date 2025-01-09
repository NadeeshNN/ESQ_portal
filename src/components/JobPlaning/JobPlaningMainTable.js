import { API_URL } from "src/components/util/config";
import React, { useEffect, useState } from "react";
import Nexgen_Alert from "../ReusableComponents_ESQ/Nexgen_Alert";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import Switch from "@mui/material/Switch"; // Import Material-UI Switch
import { LinearProgress, Tooltip } from "@mui/material";
import Draggable from "react-draggable";


// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import Select from "@mui/material/Select";
// import { Box, Typography } from "@mui/material";
// import Checkbox from "@mui/material/Checkbox";
// import Chip from "@mui/material/Chip";
import {
  //CCardBody,
  CCol,
  // CInput,
  // CInputGroup,
  // CInputGroupText,
  // CNav,
  // CNavItem,
  // CNavLink,
  CRow,
  // CSelect,
  // CTabContent,
  // CTabPane,
  // CTabs,
} from "@coreui/react";
// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };
// const regions = ["EAST", "WEST", "SOUTH", "NORTH", "ALL REGION", "NO REGION"];
export default function JobPlaningMainTable(props) {
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedColumn, setSortedColumn] = useState(null);
  const [isSortIconVisible, setSortIconVisibility] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowsData, setSelectedRowsData] = useState([]);
  // const [JobplanData, setJobplanData] = useState([]);
  const [doubleClickedRow, setDoubleClickedRow] = useState(null);
  const [ActiveColumns, setActiveColumns] = useState([
   // "Sel"
    // "Delivery On",
    "Order No",
    // "PRNT(Y/N)",  // hidden in intial loading
    "Customer Details",
    "Time Required",
    "Loading Time",
    "Delivery Address",
    "Suburb",
    "UOM",
    "Order Qty",
    "Del Qty",
    "Bal Qty",
    "Material",
    "Quarry",
    "Truck Description",
    "Job Status",
    "Truck Type",
    "Truck Allocation",
    "Customer Order No",
    // "W/T",
    //"Order Date",
  ]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { regionFilters } = props;
  const { JobplanData } = props;
  const { handlejobplaningtableDoubleclick } = props;
  const { userselectedrowinjobplaintable } = props;
  const [filters, setFilters] = useState({
    jobPlanFilter: {
      SorderNo: 0,
      JobName: "",
      CustName: "",
      CustOrderNo: "",
      CustDetails: "",
      DateRequired: "",
      DeliveryTime: "",
      DeliveryEndTime: "",
      CatlogCode: "",
      SupplierStore: "",
      DeliveryAddress: "",
      Suburb: "",
      TruckTypeDisplay: "",
      QuoteFlg: false,
    },
    regionFilter: regionFilters,
    dateFrom: "2023-01-08",
    dateTo: "2023-01-08",
    completedJobToggle: 1,
    HideCompletedJob: false,
  });
 
  const [columns, setColumns] = useState([
    { id: "sel", label: "Sel", width: "100px" },
    { id: "deliveryOn", label: "Delivery Date", width: "100px" },
    { id: "orderNo", label: "Order No", width: "100px" },
    { id: "prnt", label: "PRNT(Y/N)", width: "100px" },
    { id: "customerDetails", label: "Customer Details", width: "330px" },
    { id: "timeRequired", label: "Time Required", width: "200px" },
    { id: "loadingTime", label: "Loading Time", width: "200px" },
    { id: "deliveryAddress", label: "Delivery Address", width: "410px" },
    { id: "suburb", label: "Suburb", width: "80px" },
    { id: "uom", label: "UOM", width: "80px" },
    { id: "orderQty", label: "Order Qty", width: "100px" },
    { id: "delQty", label: "Del Qty", width: "100px" },
    { id: "balQty", label: "Bal Qty", width: "80px" },
    { id: "material", label: "Material", width: "100px" },
    { id: "quarry", label: "Quarry", width: "80px" },
    { id: "truckDescription", label: "Truck Description", width: "300px" },
    { id: "jobStatus", label: "Job Status", width: "100px" },
    { id: "truckType", label: "Truck Type", width: "100px" },
    { id: "truckAllocation", label: "Truck Allocation", width: "100px" },
    { id: "customerOrderNo", label: "Customer Order No", width: "200px" },
    { id: "wt", label: "W/T", width: "100px" },
    { id: "orderDate", label: "Order Date", width: "250px" }
  ]);



  const [columnOrder, setColumnOrder] = useState(columns.map(col => col.id));


  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
    // setTimeout(() => {
    //   setDropdownOpen((prev) => !prev);
    // }, 3000);
  };

  const handleToggleColumn = (column) => {
    setActiveColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  const handleforceCompleteAndComplete =(val)=>{
   if(!selectedRows.length > 0){
    handleToggleColumn(val)
   }
 

   if (selectedRows.length > 0) {
    console.log("selectedRows", selectedRows);
    ForceCompletejob(selectedRowsData);
  } else {
    console.log("No rows selected");
  }
   
  }
  const handleCanceljob =(val)=>{
    if(!selectedRows.length > 0){
     handleToggleColumn(val)
    }
  
 
    if (selectedRows.length > 0) {
     console.log("selectedRows", selectedRows);
    // ForceCompletejob(selectedRowsData);
   } else {
     console.log("No rows selected");
   }
    
   }

  // const { ActiveColumns } = props;
  // const handleDrag = (e, data, index) => {
  //   const newColumns = [...columns];
  //   const draggedColumn = newColumns.splice(index, 1)[0];
  //   newColumns.splice(data.x, 0, draggedColumn); // Adjust the column's position
  //   setColumns(newColumns);
  // };

  useEffect(() => {
    console.log("hi", ActiveColumns);
    // GetDatafromCustomerCode();
  }, []);

  const handleCheckboxClick = (index,item) => {
    userselectedrowinjobplaintable();
    if (selectedRows.includes(index)) {
      // Remove the row from the selected array if it's already selected
      setSelectedRows(selectedRows.filter((i) => i !== index));
      setSelectedRowsData((prevData) =>
        prevData.filter((dataItem) => dataItem.id !== item.id) // Assuming `id` is the unique key
      );
    } else {
      // Add the row to the selected array
      setSelectedRows([...selectedRows, index]); // alow user to select multiple rows at a time
      setSelectedRowsData((prevData) => [...prevData, 
    { ...item, Check: true }
      ]);

     //setSelectedRows([index]);

    }
    // setSelectedRows([index]);
  };

  const handleSort = (columnName) => {
    // sorting function
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    setSortedColumn(columnName);
  };

  const getHighlightColor = (highlightColor) => {
    console.log(highlightColor)
    switch (highlightColor) {
      case "S":
        return "#A3DDF5"; // CSS color for PALE_GREEN
      case "N":
        return "yellow";
      case "I":
        return "lightcoral"; // CSS color for YELLOW
      case "I":
        return "lightcoral";
      // Add more cases as needed
      default:
        return "transparent"; // Default color if no match
    }
  };

  const handleRowDoubleClick = (val, val2, val3) => {
    handlejobplaningtableDoubleclick(val, val2);
    setDoubleClickedRow(val3); // Update the state with the double-clicked row ID
  };

  const ForceCompletejob = (rows) => {
    setLoading(true);
    fetch(`${API_URL}jobplan/forcecompleteBtn?curPageIndex=1`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rows),
    })
      .then((res) => res.json())
      .then((data) => {
console.log("data",data)
        if(data.ReturnStatus){
          setAlertType("success");
          setAlertMessage(data?.ReturnMessage);
          setShowAlert(true);
        }
      

        //setProductTabledata(productTableData);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        // setLoading(false);
        setAlertType("error");
        setAlertMessage(err.message);
        setShowAlert(true);
        setLoading(false);
      });
  };

  
  const handleDragStop = (e, data, columnId) => {
    const newOrder = [...columnOrder];
    const draggedIndex = columnOrder.indexOf(columnId);
    const targetIndex = Math.round(data.x / 100); // Calculate where to drop

    // Ensure dragged column stays within bounds
    if (targetIndex >= 0 && targetIndex < columnOrder.length) {
      // Swap columns based on index
      newOrder.splice(draggedIndex, 1);
      newOrder.splice(targetIndex, 0, columnId);
      setColumnOrder(newOrder);
    }
  };

  // const columnDefinitions = [
  //   { id: "Sel", label: "Select", accessor: "checkbox" },
  //   { id: "Delivery On", label: "Delivery On", accessor: (item) => item?.DateRequired?.split("T")[0] || "" },
  //   { id: "Order No", label: "Order No", accessor: (item) => item?.SorderNo || "" },
  //   { id: "PRNT(Y/N)", label: "PRNT(Y/N)", accessor: () => "" },
  //   { id: "Customer Details", label: "Customer Details", accessor: (item) => item?.CustName || "" },
  //   { id: "Time Required", label: "Time Required", accessor: (item) => item?.DeliveryTime || "" },
  //   { id: "Loading Time", label: "Loading Time", accessor: (item) => item?.EndLoadingTime?.split("T")[1]?.split("+")[0] || "" },
  //   { id: "Delivery Address", label: "Delivery Address", accessor: (item) => item?.DeliveryAddress || "" },
  //   { id: "Suburb", label: "Suburb", accessor: (item) => item?.City || "" },
  //   { id: "UOM", label: "UOM", accessor: (item) => item?.Uom || "" },
  //   { id: "Order Qty", label: "Order Qty", accessor: (item) => item?.OrderQty || "" },
  //   { id: "Del Qty", label: "Del Qty", accessor: (item) => item?.DelQty || "" },
  //   { id: "Bal Qty", label: "Bal Qty", accessor: (item) => item?.BoQty || "" },
  //   { id: "Material", label: "Material", accessor: (item) => item?.CatlogCode || "" },
  //   { id: "Quarry", label: "Quarry", accessor: (item) => item?.SupplierStore || "" },
  //   { id: "Truck Description", label: "Truck Description", accessor: (item) => item?.TruckTypeDisplay || "" },
  //   { id: "Job Status", label: "Job Status", accessor: (item) => item?.Status || "" },
  //   { id: "Truck Type", label: "Truck Type", accessor: (item) => item?.TruckType || "" },
  //   { id: "Truck Allocation", label: "Truck Allocation", accessor: (item) => item?.TruckAlloc || "" },
  //   { id: "Customer Order No", label: "Customer Order No", accessor: (item) => item?.CustOrderNo || "" },
  //   { id: "W/T", label: "W/T", accessor: (item) => item?.WaitingFlg || "" },
  //   { id: "Order Date", label: "Order Date", accessor: (item) => item?.OrderDate?.split("T")[0] || "" },
  // ];
  // const visibleColumns = columnDefinitions.filter((col) =>
  //   ActiveColumns?.includes(col.id)
  // );
  return (
    <div className="dividercards" style={{}}>
        
     
      {showAlert && (
        <Nexgen_Alert
          AlertTitle={alertTitle}
          severity={alertType}
          AlertMessage={alertMessage}
          onClose={() => setShowAlert(false)}
        />
      )}
       {/* <div className="relative flex w-auto">
         <div>
                    <div className="col-lg-1 d-flex align-items-center p-0 marginL20">
                      <button className="jobinputdivbutton   whitespace-nowrap text-center">
                        Save As Default
                      </button>
                    </div>
                    <div className="col-lg-2 d-flex align-items-center p-0 ml-4">
                      <CInputGroup>
                        <CInputGroupText className="small-input-text">
                          Job start:
                        </CInputGroupText>
                        <CInput
                          type="date"
                          size="sm"
                          className="inputtextdark"
                          name="dateFrom" // Assign name to the input field for differentiation
                          value={filters.dateFrom} // Bind the state value for dateFrom
                          onChange={handleDateChange} // Handle onChange to update dateFrom
                        />
                        <span>-</span>
                        <CInput
                          type="date"
                          size="sm"
                          className="inputtextdark"
                          name="dateTo" // Assign name to the input field for differentiation
                          value={filters.dateTo} // Bind the state value for dateTo
                          onChange={handleDateChange} // Handle onChange to update dateTo
                        />
                      </CInputGroup>
                    </div>
                    <div className="col-lg-1 d-flex align-items-center justify-content-around p-0">
                      <ArrowBackIcon style={{ color: "black" }} />
                      <ArrowForwardIcon style={{ color: "black" }} />
                    </div>
                    <div className="col-lg-1 d-flex align-items-center p-0 marginR5">
                      <CInputGroup>
                        <CSelect
                          type="text"
                          size="sm"
                          className="inputtextdark"
                        >
                          <option value="1">Today</option>
                          <option value="2">Week</option>
                          <option value="1">Month</option>
                          <option value="2">Year</option>
                        </CSelect>
                      </CInputGroup>
                    </div>
                    <div className="col-lg-1 d-flex align-items-center p-0 marginR5">
                      <CInputGroup>
                        <CSelect
                          type="text"
                          size="sm"
                          className="inputtextdark"
                        >
                          <option value="1">show All</option>
                          <option value="2">show active jobs </option>
                          <option value="2">show completed jobs </option>
                        </CSelect>
                      </CInputGroup>
                    </div>
                    <div className="col-lg-2 d-flex align-items-center p-0 ">
                      <div>
                        <FormControl
                          sx={{ m: 0.5, width: 250, height: 40, marginTop: 2 }}
                        >
                          <InputLabel
                            id="demo-multiple-chip-label"
                            sx={{
                              fontSize: "12px",
                              lineHeight: "1.5",
                              marginTop: "-6px",
                            }}
                          >
                            Regions
                          </InputLabel>
                          <Select
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            multiple
                            value={regionname}
                            onChange={handleChangeRegion}
                            input={
                              <OutlinedInput
                                id="select-multiple-chip"
                                label="Chip"
                                sx={{
                                  padding: "0 4px",
                                  fontSize: "10px",
                                  height: "30px",
                                }}
                              />
                            }
                            renderValue={(selected) => (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 0.2,
                                }}
                              >
                                {selected.map((value) => (
                                  <Chip
                                    key={value}
                                    label={value}
                                    sx={{
                                      height: 19,
                                      fontSize: "8px",
                                      backgroundColor: "gray-300",
                                      color: "black",
                                      fontStyle: "semi-bold",
                                      fontWeight: "800",
                                    }}
                                  />
                                ))}
                              </Box>
                            )}
                            MenuProps={MenuProps}
                            sx={{
                              height: "30px",
                              fontSize: "10px",
                              padding: "0 4px",
                            }}
                          >
                            {regions.map((name) => (
                              <MenuItem
                                key={name}
                                value={name}
                                sx={{ fontSize: "10px", padding: "2px 4px" }}
                              >
                                <Checkbox
                                  checked={regionname.includes(name)}
                                  sx={{ padding: "0 4px", fontSize: "10px" }}
                                />
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                      <div className="col-lg-2 d-flex align-items-center p-0 ">
                        <button
                          className="jobinputdivbutton w-90"
                          onClick={() => GetDatafromCustomerCode()}
                        >
                          go
                        </button>
                      </div>
                    </div>
                  </div> 
         </div> */}
      <div className="relative">
      {loading && (
             
                
                  <LinearProgress style={{ width: "100%" }} />
               
             
            )}
        {/* Button to toggle dropdown */}
        <Tooltip title="column options">
          <ViewWeekIcon
            onClick={toggleDropdown}
            className="cursor-pointer hover:text-gray-400 !important"
          />
        </Tooltip>
        <Tooltip title="Force Complete">
          <AssignmentTurnedInIcon
            className={`cursor-pointer ml-2 ${
              selectedRows.length > 0
                ? "hover:text-green-500 !important"
                : "text-gray-400"
            }`}
            sx={{
              //boxShadow: selectedRows.length > 0 ? "0 0 10px 5px rgba(255, 165, 38, 0.7)" : "",
              animation: selectedRows.length > 0 ? "pulse 1.5s infinite" : "",
            }}
            onClick={()=>{handleforceCompleteAndComplete("Sel")}}
          />
        </Tooltip>

        <Tooltip title="Cancel Job">
          <RestoreFromTrashIcon
            className={`cursor-pointer ml-2 ${
              selectedRows.length > 0
                ? "hover:text-red-500 !important"
                : "text-gray-400"
            }`}
            sx={{
              //boxShadow: selectedRows.length > 0 ? "0 0 10px 5px rgba(255, 165, 38, 0.7)" : "",
              animation: selectedRows.length > 0 ? "pulse 1.5s infinite" : "",
            }}
            onClick={()=>{handleCanceljob("Sel")}}
          />
        </Tooltip>

      
        {/* Dropdown content */}
        {dropdownOpen && (
          <Draggable>
            <div className="absolute border rounded shadow-md p-2 mt-1 w-56 z-50 bg-white "
            // tabIndex={-1}
            // onBlur={() => setDropdownOpen(false)} 
            >
              {/* Header */}
              <h4 className="text-lg font-semibold mb-4">Table Options</h4>
              <DisabledByDefaultIcon onClick={()=>setDropdownOpen(false)} 
              className="absolute top-0 right-0 text-gray-500 hover:text-red-700 cursor-pointer rounded-full" />
              {/* Column Selection */}
              <div className="mb-6">
                <strong className="block mb-2">Columns:</strong>
                <div className="max-h-96 overflow-y-auto border rounded-md p-2">
                  {[
                    "Sel",
                    "Delivery On",
                    "Order No",
                    "PRNT(Y/N)",
                    "Customer Details",
                    "Time Required",
                    "Loading Time",
                    "Delivery Address",
                    "Suburb",
                    "UOM",
                    "Order Qty",
                    "Del Qty",
                    "Bal Qty",
                    "Material",
                    "Quarry",
                    "Truck Description",
                    "Job Status",
                    "Truck Type",
                    "Truck Allocation",
                    "Customer Order No",
                    "W/T",
                    "Order Date",
                  ].map((column) => (
                    <label
                      key={column}
                      className="block text-sm mb-2 cursor-pointer"
                    >
                      <Switch
                        checked={ActiveColumns.includes(column)}
                        onChange={() => handleToggleColumn(column)} 
                        size="small" // Optional: Adjust size
                        color="primary" // Optional: Set color
                      />
                      {column}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </Draggable>
        )}

        {/* Table Density Options Icon */}
      </div>
      <div
        // className="QuotationNoTable"
        className="JObPlaningTables"
        // style={{ overflowY: "auto", maxWidth: "100%", marginTop: "0%" }}
        style={{
          overflowY: "auto", // Enables vertical scrolling
          overflowX: "auto", // Enables horizontal scrolling
          maxWidth: "100%", // Ensures the content doesn't overflow the parent container width
          marginTop: "0%", // Keeps the existing margin
          // Optional: Limit height to make vertical scrolling visible
          border: "1px solid #ccc", // Optional: Add a border to better visualize the scrollable area
        }}
      >
        <h6
          style={{
            justifyContent: "center",
            width: "100%",
            textAlign: "center",
          }}
        ></h6>

        <table class="tableQt-ProductTable">
          <thead
            class="tableQt-ProductTable-grey-header"
            style={{
              height: "25px",
              position: "sticky",
              top: "0",
              fontSize: "11px",
            }}
          >
            <tr>
            <th style={{ width: "90px" }}>
                <input
                  type="text"
                  placeholder=""
                  // value={filters.Code}
                  //onChange={(e) => handleFilterChange("Code", e.target.value)}
                  style={{ width: "100%" }}
                />
              </th>
              <th style={{ width: "90px" }}>
                <input
                  type="text"
                  placeholder=""
                  // value={filters.Code}
                  //onChange={(e) => handleFilterChange("Code", e.target.value)}
                  style={{ width: "100%" }}
                />
              </th>
              <th style={{ width: "100px" }}>
                <input
                  type="text"
                  placeholder=""
                  // value={filters.Code}
                  //onChange={(e) => handleFilterChange("Code", e.target.value)}
                  style={{ width: "100%" }}
                />
              </th>
              <th style={{ width: "80px" }}>
                <input
                  type="text"
                  placeholder=""
                  // value={filters.Code}
                  //onChange={(e) => handleFilterChange("Code", e.target.value)}
                  style={{ width: "100%" }}
                />
              </th>
              <th style={{ width: "0px" }}>
                <input
                  type="text"
                  placeholder=""
                  // value={filters.Code}
                  //onChange={(e) => handleFilterChange("Code", e.target.value)}
                  style={{ width: "100%" }}
                />
              </th>
              <th style={{ width: "0px" }}>
                <input
                  type="text"
                  placeholder=""
                  // value={filters.Code}
                  //onChange={(e) => handleFilterChange("Code", e.target.value)}
                  style={{ width: "100%" }}
                />
              </th>
              <th
                colSpan="4"
                style={{
                 
                  backgroundColor: "rgba(247, 247, 247, 0.923)",
                  //border: "2px solid white",
                }}
              ></th>
              <th style={{ width: "100px" }}>
                <input
                  type="text"
                  placeholder=""
                  // value={filters.Code}
                  //onChange={(e) => handleFilterChange("Code", e.target.value)}
                  style={{ width: "100%" }}
                />
              </th>
              <th style={{ width: "100px" }}>
                <input
                  type="text"
                  placeholder=""
                  // value={filters.Code}
                  //onChange={(e) => handleFilterChange("Code", e.target.value)}
                  style={{ width: "100%" }}
                />
              </th>
              <th style={{ width: "100px" }}>
                <input
                  type="text"
                  placeholder=""
                  // value={filters.Code}
                  //onChange={(e) => handleFilterChange("Code", e.target.value)}
                  style={{ width: "100%" }}
                />
              </th>
              <th
                colSpan="3"
                style={{
                  
                  backgroundColor: "rgba(247, 247, 247, 0.923)",
                  //border: "2px solid white",
                }}
              ></th>
              <th style={{ width: "100px" }}>
                <input
                  type="text"
                  placeholder=""
                  // value={filters.Code}
                  //onChange={(e) => handleFilterChange("Code", e.target.value)}
                  style={{ width: "100%" }}
                />
              </th>

              <th
                colSpan="5"
                style={{
                 
                  backgroundColor: "rgba(247, 247, 247, 0.923)",
                  //border: "2px solid white",
                }}
              ></th>
            </tr>
           
            <tr className="-top-2" style={{ top: "-2px" }}>
              
              {ActiveColumns?.includes("Sel") &&
              
               (
               
              <th style={{ width: "100px" }}> Sel </th>
           )}
              {ActiveColumns?.includes("Delivery On") && (
                <th style={{ width: "100px" }}>Delivery Date</th>
              )}
              {ActiveColumns?.includes("Order No") && (
                <th style={{ width: "100px" }}>Order No </th>

              )}
              {ActiveColumns?.includes("PRNT(Y/N)") && (
                <th style={{ width: "100px" }}>PRNT(Y/N)</th>
                
              )}
              {ActiveColumns?.includes("Customer Details") && (
                <th
                  style={{ width: "330px" }}
                  onClick={() => handleSort("Name")}
                  onMouseEnter={() => setSortIconVisibility(true)}
                  onMouseLeave={() => setSortIconVisibility(false)}
                >
                  Customer Details{" "}
                  {isSortIconVisible &&
                    sortedColumn === "Name" && ( // sorting icon
                      <span className="sortIcon">
                        {sortOrder === "asc" ? " 🔼" : " 🔽"}
                      </span>
                    )}
                </th>
              )}
              {ActiveColumns?.includes("Time Required") && (
                <th
                  style={{ width: "200px" }}
                  onClick={() => handleSort("Catlog_desc")}
                  onMouseEnter={() => setSortIconVisibility(true)}
                  onMouseLeave={() => setSortIconVisibility(false)}
                >
                  Time Required{" "}
                  {isSortIconVisible &&
                    sortedColumn === "Catlog_desc" && ( // sorting icon
                      <span className="sortIcon">
                        {sortOrder === "asc" ? " 🔼" : " 🔽"}
                      </span>
                    )}
                </th>
              )}
              {ActiveColumns?.includes("Loading Time") && (
                <th
                  style={{ width: "200px" }}
                  onClick={() => handleSort("Catlog_desc")}
                  onMouseEnter={() => setSortIconVisibility(true)}
                  onMouseLeave={() => setSortIconVisibility(false)}
                >
                  Loading Time{" "}
                  {isSortIconVisible &&
                    sortedColumn === "Catlog_desc" && ( // sorting icon
                      <span className="sortIcon">
                        {sortOrder === "asc" ? " 🔼" : " 🔽"}
                      </span>
                    )}
                </th>
              )}
              {ActiveColumns?.includes("Delivery Address") && (
                <th
                  style={{ width: "410px" }}
                  onClick={() => handleSort("Product_cost")}
                  onMouseEnter={() => setSortIconVisibility(true)}
                  onMouseLeave={() => setSortIconVisibility(false)}
                >
                  Delevery Address
                  {isSortIconVisible &&
                    sortedColumn === "Product_cost" && ( // sorting icon
                      <span className="sortIcon">
                        {sortOrder === "asc" ? " 🔼" : " 🔽"}
                      </span>
                    )}
                </th>
              )}
              {ActiveColumns?.includes("Suburb") && (
                <th
                  style={{ width: "80px" }}
                  onClick={() => handleSort("Distance_meters")}
                  onMouseEnter={() => setSortIconVisibility(true)}
                  onMouseLeave={() => setSortIconVisibility(false)}
                >
                  Suburb
                  {isSortIconVisible &&
                    sortedColumn === "Distance_meters" && ( // sorting icon
                      <span className="sortIcon">
                        {sortOrder === "asc" ? " 🔼" : " 🔽"}
                      </span>
                    )}
                </th>
              )}

              {ActiveColumns?.includes("UOM") && (
                <th
                  style={{ width: "80px" }}
                  onClick={() => handleSort("Cartage_cost")}
                  onMouseEnter={() => setSortIconVisibility(true)}
                  onMouseLeave={() => setSortIconVisibility(false)}
                >
                  UOM
                  {isSortIconVisible &&
                    sortedColumn === "Cartage_cost" && ( // sorting icon
                      <span className="sortIcon">
                        {sortOrder === "asc" ? " 🔼" : " 🔽"}
                      </span>
                    )}
                </th>
              )}

              {ActiveColumns?.includes("Order Qty") && (
                <th
                  style={{ width: "100px" }}
                  onClick={() => handleSort("Product_tot")}
                  onMouseEnter={() => setSortIconVisibility(true)}
                  onMouseLeave={() => setSortIconVisibility(false)}
                >
                  Order Qty
                  {isSortIconVisible &&
                    sortedColumn === "Product_tot" && ( // sorting icon
                      <span className="sortIcon">
                        {sortOrder === "asc" ? " 🔼" : " 🔽"}
                      </span>
                    )}
                </th>
              )}

              {ActiveColumns?.includes("Del Qty") && (
                <th style={{ width: "100px" }}>Del Qty</th>
              )}

              {ActiveColumns?.includes("Bal Qty") && (
                <th style={{ width: "80px" }}>Bal Qty</th>
              )}

              {ActiveColumns?.includes("Material") && (
                <th style={{ width: "100px" }}>Material</th>
              )}

              {ActiveColumns?.includes("Quarry") && (
                <th style={{ width: "80px" }}>Quarry</th>
              )}

              {ActiveColumns?.includes("Truck Description") && (
                <th style={{ width: "300px" }}>Truck Description</th>
              )}

              {ActiveColumns?.includes("Job Status") && (
                <th style={{ width: "100px" }}>Job Status</th>
              )}

              {ActiveColumns?.includes("Truck Type") && (
                <th style={{ width: "100px" }}>Truck Type</th>
              )}

              {ActiveColumns?.includes("Truck Allocation") && (
                <th style={{ width: "100px" }}>Truck Allocation</th>
              )}

              {ActiveColumns?.includes("Customer Order No") && (
                <th style={{ width: "200px" }}>Customer Order No</th>
              )}

              {ActiveColumns?.includes("W/T") && (
                <th style={{ width: "100px" }}>W/T</th>
              )}

              {ActiveColumns?.includes("Order Date") && (
                <th style={{ width: "250px" }}>Order Date</th>
              )}
            </tr>
          </thead>
          <tbody>
            {/* {loading && (
              <tr>
                <td colSpan="19">
                  <LinearProgress style={{ width: "100%" }} />
                </td>
              </tr>
            )} */}

            {
            //!loading &&
              (JobplanData?.length > 0 ? (
                // sortByColumn(
                //   selectedProducttableData,
                //   sortedColumn,
                //   sortOrder
                // )
                JobplanData.map((item, index) => {
                  return (
                    <tr
                      key={index}                    
                      className={`siteThover-effect ${
                        selectedRows.includes(index)
                          ? "userselectedrows_job"
                          : ""
                      } ${
                        doubleClickedRow === index ? "double-clicked-row" : ""
                      }`}
                      style={{
                        fontSize: "9px",
                        fontWeight: "",
                        // fontFamily:"Open Sans",
                        height: "5px",
                        textAlign: "left",
                        marginBottom: "0px",
                        padding: "0px",
                        marginTop: "0px",
                        backgroundColor:
                          doubleClickedRow === index &&
                          selectedRows.includes(index)
                            ? "#272829" // Combined condition for double-clicked and selected
                            : doubleClickedRow === index
                            ? "#ffa726" // Background for double-clicked row
                            : selectedRows.includes(index)
                            ? "rgb(42, 77, 95)" // Background for selected rows
                            : getHighlightColor(item.Status) || "transparent", // Default highlight color or fallback
                      }}
                      // onClick={() => handleCheckboxClick(index)}
                      // onDoubleClick={() =>
                      //   handleRowDoubleClick(item.SorderNo, item, index)
                      // }
                      onClick={() =>
                        handleRowDoubleClick(item.SorderNo, item, index)
                      }
                    >
                      {ActiveColumns?.includes("Sel") && (
                        <td
                        style={{
                          padding: "2px",
                          textAlign: "left",
                          borderRight: "1px solid grey",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(index)} // Sync checkbox state
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent row click event when clicking the checkbox
                            handleCheckboxClick(index,item); // Trigger checkbox logic
                          }}
                        />
                      </td>
                      )}
                     
                      {ActiveColumns?.includes("Delivery On") && (
                        <td style={{ borderRight: "1px solid grey" }}>
                          
                          {item && item.DateRequired ? item.DateRequired.split("T")[0] : ""}</td>
                      )}
                      {ActiveColumns?.includes("Order No") && (
                        <td
                          style={{
                            borderRight: "1px solid grey",
                            padding: "2px",
                          }}
                        >
                          {/* {item && item.SorderNo ? item.SorderNo : ""} */}
                          {item && item.SorderNo ? (
                            <span className=" p-0.5  font-bold">
                              {item.SorderNo}
                            </span>
                          ) : (
                            ""
                          )}
                        </td>
                      )}
                      {ActiveColumns?.includes("PRNT(Y/N)") && (
                        <td style={{ borderRight: "1px solid grey" }}>{""}</td>
                      )}
                      {ActiveColumns?.includes("Customer Details") && (
                        <td style={{ borderRight: "1px solid grey" }}>
                          {item && item.CustName ? item.CustName : ""}
                        </td>
                      )}

                      {ActiveColumns?.includes("Time Required") && (
                        <td style={{ borderRight: "1px solid grey" }}>
                          {item && item.DeliveryTime ? item.DeliveryTime : ""}
                        </td>
                      )}
                      {ActiveColumns?.includes("Loading Time") && (
                        <td style={{ borderRight: "1px solid grey" }}>
                          {item && item.EndLoadingTime
                            ? item.EndLoadingTime.split("T")[1]?.split("+")[0]
                            : ""}
                        </td>
                      )}

                      {ActiveColumns?.includes("Delivery Address") && (
                        <td style={{ borderRight: "1px solid grey" }}>
                          {item && item.DeliveryAddress
                            ? item.DeliveryAddress
                            : ""}
                        </td>
                      )}

                      {ActiveColumns?.includes("Suburb") && (
                        <td style={{ borderRight: "1px solid grey" }}>
                          {item && item.City ? item.City : ""}
                        </td>
                      )}

                      {ActiveColumns?.includes("UOM") && (
                        <td style={{ borderRight: "1px solid grey" }}>
                          {item && item.Uom ? item.Uom : ""}
                        </td>
                      )}

                      {ActiveColumns?.includes("Order Qty") && (
                        <td style={{ borderRight: "1px solid grey" }}>
                          {item && item.OrderQty ? item.OrderQty : ""}
                        </td>
                      )}

                      {ActiveColumns?.includes("Del Qty") && (
                        <td style={{ borderRight: "1px solid grey" }}>
                          {item && item.DelQty ? item.DelQty : ""}
                        </td>
                      )}

                      {ActiveColumns?.includes("Bal Qty") && (
                        <td style={{ borderRight: "1px solid grey" }}>
                          {item && item.BoQty ? item.BoQty : ""}
                        </td>
                      )}

                      {ActiveColumns?.includes("Material") && (
                        <td style={{ borderRight: "1px solid grey" }}>
                          {item && item.CatlogCode ? item.CatlogCode : ""}
                        </td>
                      )}

                      {ActiveColumns?.includes("Quarry") && (
                        <td style={{ borderRight: "1px solid grey" }}>
                          {item && item.SupplierStore ? item.SupplierStore : ""}
                        </td>
                      )}

                      {ActiveColumns?.includes("Truck Description") && (
                        <td style={{ borderRight: "1px solid grey" }}>
                          {item && item.TruckTypeDisplay
                            ? item.TruckTypeDisplay
                            : ""}
                        </td>
                      )}

                      {ActiveColumns?.includes("Job Status") && (
                        <td style={{ borderRight: "1px solid grey" }}>
                          {item && item.Status ? item.Status : ""}
                        </td>
                      )}

                      {ActiveColumns?.includes("Truck Type") && (
                        <td style={{ borderRight: "1px solid grey" }}>
                          {item && item.TruckType ? item.TruckType : ""}
                        </td>
                      )}

                      {ActiveColumns?.includes("Truck Allocation") && (
                        <td style={{ borderRight: "1px solid grey" }}>
                          {item && item.TruckAlloc ? item.TruckAlloc : ""}
                        </td>
                      )}

                      {ActiveColumns?.includes("Customer Order No") && (
                        <td style={{ borderRight: "1px solid grey" }}>
                          {item && item.CustOrderNo ? item.CustOrderNo : ""}
                        </td>
                      )}

                      {ActiveColumns?.includes("W/T") && (
                        <td style={{ borderRight: "1px solid grey" }}>
                          {item && item.WaitingFlg ? item.WaitingFlg : ""}
                        </td>
                      )}

                      {ActiveColumns?.includes("Order Date") && (
                        <td style={{ borderRight: "1px solid grey" }}>
                          {item && item.OrderDate
                            ? item.OrderDate.split("T")[0]
                            : ""}
                        </td>
                      )}
                    </tr>
                  );
                })
                // JobplanData.map((item, index) => (
                //   <tr
               
                //         key={index}                    
                //         className={`siteThover-effect ${
                //           selectedRows.includes(index)
                //             ? "userselectedrows_job"
                //             : ""
                //         } ${
                //           doubleClickedRow === index ? "double-clicked-row" : ""
                //         }`}
                //         style={{
                //           fontSize: "9px",
                //           fontWeight: "",
                //           // fontFamily:"Open Sans",
                //           height: "5px",
                //           textAlign: "left",
                //           marginBottom: "0px",
                //           padding: "0px",
                //           marginTop: "0px",
                //           backgroundColor:
                //             doubleClickedRow === index &&
                //             selectedRows.includes(index)
                //               ? "#272829" // Combined condition for double-clicked and selected
                //               : doubleClickedRow === index
                //               ? "#ffa726" // Background for double-clicked row
                //               : selectedRows.includes(index)
                //               ? "rgb(42, 77, 95)" // Background for selected rows
                //               : getHighlightColor(item.Status) || "transparent", // Default highlight color or fallback
                //         }}
                //         // onClick={() => handleCheckboxClick(index)}
                //         // onDoubleClick={() =>
                //         //   handleRowDoubleClick(item.SorderNo, item, index)
                //         // }
                //         onClick={() =>
                //           handleRowDoubleClick(item.SorderNo, item, index)
                //         }
                //   >
                //     {visibleColumns.map(
                //       (col) =>
                //         ActiveColumns?.includes(col.id) && (
                //           <td key={col.id} className="table-cell">
                //             {col.accessor(item, index)}
                //           </td>
                //         )
                //     )}
                //   </tr>
                // ))
              ) : (
                <tr>
                  <td colSpan="19">No data available</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <CRow
        className="mb-0 mt-4 w-3/4"
        style={
          {
            // width: "60%",
          }
        }
      >
        <CCol xs={2} className="p-0">
          <div className="d-flex align-items-center justify-content-center">
            <div
              className="legend-color-box"
              style={{
                width: "35px",
                cursor: "pointer",
                height: "15px",
                backgroundColor: "#A8E6A1",
                marginRight: "0.5rem",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add shadow
                borderRadius: "3px", // Rounded corners
              }}
            ></div>
            <h7 className="boxtext2 m-0 ml-1">NEW</h7>
          </div>
        </CCol>
        <CCol xs={2} className="p-0">
          <div className="d-flex align-items-center justify-content-center">
            <div
              className="legend-color-box"
              style={{
                width: "35px",
                cursor: "pointer",
                height: "15px",
                backgroundColor: "#F9E79F",
                marginRight: "0.5rem",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add shadow
                borderRadius: "3px", // Rounded corners
              }}
            ></div>
            <h7 className="boxtext2 m-0 ml-1">IN PROGRESS</h7>
          </div>
        </CCol>
        <CCol xs={2} className="p-0">
          <div className="d-flex align-items-center justify-content-center">
            <div
              className="legend-color-box"
              style={{
                width: "35px",
                height: "15px",
                cursor: "pointer",
                backgroundColor: "#A3DDF5",
                marginRight: "0.5rem",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add shadow
                borderRadius: "3px", // Rounded corners
              }}
            ></div>
            <h7 className="boxtext2 m-0 ml-1">FINISHED</h7>
          </div>
        </CCol>

        <CCol xs={2} className="p-0">
          <div className="d-flex align-items-center justify-content-center">
            <div
              className="legend-color-box"
              style={{
                width: "35px",
                height: "15px",
                cursor: "pointer",
                backgroundColor: "#2E5EAA",
                marginRight: "0.5rem",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add shadow
                borderRadius: "3px", // Rounded corners
              }}
            ></div>
            <h7 className="boxtext2 m-0 ml-1">URGENT</h7>
          </div>
        </CCol>
        <CCol xs={2} className="p-0">
          <div className="d-flex align-items-center justify-content-center">
            <div
              className="legend-color-box"
              style={{
                width: "35px",
                height: "15px",
                cursor: "pointer",
                backgroundColor: "#FBEAEA",
                marginRight: "0.5rem",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add shadow
                borderRadius: "3px", // Rounded corners
              }}
            ></div>
            <h7 className="boxtext2 m-0 ml-1">TBC</h7>
          </div>
        </CCol>
        <CCol xs={2} className="p-0">
          <div className="d-flex align-items-center justify-content-center">
            <div
              className="legend-color-box"
              style={{
                width: "35px",
                height: "15px",
                backgroundColor: "#F5B7B1",
                cursor: "pointer",
                marginRight: "0.5rem",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add shadow
                borderRadius: "3px", // Rounded corners
              }}
            ></div>
            <h7 className="boxtext2 m-0 ml-1">ON HOLD</h7>
          </div>
        </CCol>
      </CRow>
    </div>
  );
}
