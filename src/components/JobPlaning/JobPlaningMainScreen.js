import {
  CCardBody,
  CCol,
  CInput,
  CInputGroup,
  CInputGroupText,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CSelect,
  CTabContent,
  CTabPane,
  CTabs,
} from "@coreui/react";
import React, { useState ,useEffect} from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AssignmentReturnedIcon from "@mui/icons-material/AssignmentReturned";
import CancelIcon from "@mui/icons-material/Cancel";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { useTheme } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import Nexgen_Alert from "../ReusableComponents_ESQ/Nexgen_Alert";
import dockectbtnIcon from "./../../assets/icons/dockect.png";
import quotationbtnIcon from "./../../assets/icons/qoutation.png";
import altsummaryIcon from "./../../assets/icons/quotaionbtns/summary.png";
import truckIcon from "./../../assets/icons/truckIcon.png";
import BulkAllocation from "./BulkAllocation";
import Carter_details from "./Carter_details";
import DocketTable from "./DocketDetailsTable";
import JobPlaningMainTable from "./JobPlaningMainTable";
import { API_URL } from "src/components/util/config";
import TestTable from "./Test";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Box, Tooltip, Typography } from "@mui/material";
import moment from "moment/moment";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FastForwardIcon from '@mui/icons-material/FastForward';
import SaveIcon from '@mui/icons-material/Save';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Delivery On",
  "Order Date",
  "Order Number",
  "PRNT(Y/N)",
  "Quoted(Y/T)",
];
const regions = ["EAST", "WEST", "SOUTH", "NORTH", "ALL REGION", "NO REGION"];
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0, 0, 0, 0.7)",
  backdropFilter: "blur(5px)", // Adjust the blur radius as needed
  WebkitBackdropFilter: "blur(5px)", // For Safari
  zIndex: 9999999,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
export default function JobPlaningMainScreen() {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [columnsize, setColumnsize] = useState(9);
  const [docketcolumnsize, setdocketColumnsize] = useState(3);
  const [rowVisibility, setRowVisibility] = useState([true]);
  const [activeTabside, setActiveTabSide] = useState(0);
  const [rowIcons, setRowIcons] = useState([
    <ExpandLessIcon style={{ transform: "rotate(90deg)" }} />,
  ]);
  const [personName, setPersonName] = React.useState([]);
  const [regionname, setRegionName] = React.useState(["ALL REGION"]);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [JobplanData, setJobplanData] = useState([]);
  const [dockectDetailTableData, setdocketTableData] = useState([]);
  const [selectedRowEquipedCode, setSelectedRowEquipedCode] = useState([]);
  const [selectedRowJobdata, setSelectedRowJobdata] = useState([]);
  const [jobstatus, setJobStatus]  = useState("1");
  const [regionFilters, setRegionFilters] = useState({
    AllRegion: true,
    NoRegion: false,
    EastRegion: false,
    WestRegion: false,
    SouthRegion: false,
    NorthRegion: false,
  });
  const today = moment().format("DD-MM-YYYY");
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
    dateFrom: today,
    dateTo: today,
    completedJobToggle: 1,  // if 1 , 2 all, 
    HideCompletedJob: false,
  });
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };


  useEffect(() => {
    GetgetJobplanDetail();
  }, [filters.completedJobToggle]);



  // const handleDateChange = (e) => {
  //   const { name, value } = e.target;

  //   setFilters((prevFilters) => ({
  //     ...prevFilters,
  //     [name]: value, // Update the corresponding date field (dateFrom or dateTo)
  //   }));
  // };
  const handleDateChange = (name, newValue) => {
    // Format the date to "DD-MM-YYYY"
    const formattedDate = moment(newValue).format("DD-MM-YYYY");
  
    setFilters((prevFilters) => {
      const updatedFilters = {
        ...prevFilters,
        [name]: formattedDate, // Update the corresponding date field
      };
  
      // Auto-update dateTo if dateFrom changes and is later than dateTo
      if (name === "dateFrom" 
        // && moment(formattedDate).isAfter(moment(prevFilters.dateTo))
      ) {
        updatedFilters.dateTo = formattedDate; // Set dateTo to the same value as dateFrom
      }
  
      return updatedFilters;
    });
  };
  
  const GetgetJobplanDetail = () => {
    setJobplanData([])
    setLoading(true);
    fetch(`${API_URL}jobplan/getJobplanDetail`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filters),
    })
      .then((res) => res.json())
      .then((data) => {
        const Data = data.ResultSet[0];
        const jobplanData = Data?.JobPlanDetailList;
        console.log("array", jobplanData);
        setJobplanData(jobplanData);

        //setProductTabledata(productTableData);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  };
  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed); // Toggle collapse state
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggle = (value) => {
    const currentIndex = personName.indexOf(value);
    const newPersonName = [...personName];

    if (currentIndex === -1) {
      newPersonName.push(value);
    } else {
      newPersonName.splice(currentIndex, 1);
    }

    setPersonName(newPersonName);
  };

  const closePopup = () => {
    // triger when  lookup closed default
    setSelectedComponent(""); // Clear the selected component
    setPopupVisible(false); // Close the popup
  };
  const toggleTabSide = (index) => {
    if (activeTabside !== index) {
      setdocketColumnsize(3);
      setColumnsize(9);
      setActiveTabSide(index);
    }
  };

  const userselectedrowinjobplaintable = () => {
    setIsOpen(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 2000);
  };
  const actions = [
    // { icon: <FileCopyIcon />, name: 'Copy', floatbtnAction: () => {} },
    // { icon: <SaveIcon />, name: 'Save', floatbtnAction: () => {} },
    // { icon: <PrintIcon />, name: 'Print Active Jobs', floatbtnAction: () => {} },
    {
      icon: <AssignmentReturnedIcon />,
      name: "Bulk Allocation",
      floatbtnAction: () =>
        //toggleTabSide(1)
        handleButtonClick(BulkAllocation),
    },
    {
      icon: <PublishedWithChangesIcon />,
      name: "Force Complete",
      floatbtnAction: () => {},
    },
    { icon: <CancelIcon />, name: "Cancel Job", floatbtnAction: () => {} },
  ];



  
  const handleChangeRegion = (event) => {
    const {
      target: { value },
    } = event;
  
    const selectedRegions =
      typeof value === "string" ? value.split(",") : value;
  
    console.log("selectedRegions:", selectedRegions);
  
    let updatedRegions = [...selectedRegions];
  
    const specificRegions = ["EAST", "WEST", "SOUTH", "NORTH"];
    const lastSelected = updatedRegions[updatedRegions.length - 1];
  
    // 1. Prioritize "ALL REGION" or "NO REGION" if selected last
    if (lastSelected === "ALL REGION" || lastSelected === "NO REGION") {
      updatedRegions = [lastSelected];
    } else {
      // 2. Remove "ALL REGION" or "NO REGION" if specific regions are selected
      updatedRegions = updatedRegions.filter(
        (region) => region !== "ALL REGION" && region !== "NO REGION"
      );
    }
  
    // 3. If all specific regions are selected, replace with "ALL REGION"
    if (specificRegions.every((region) => updatedRegions.includes(region))) {
      updatedRegions = ["ALL REGION"];
    }
  
    // 4. If no regions are selected, default to "NO REGION"
    if (updatedRegions.length === 0) {
      updatedRegions = ["NO REGION"];
    }
  
    // Update state
    setRegionName(updatedRegions);
  
    const newRegionFilters = {
      AllRegion: updatedRegions.includes("ALL REGION"),
      NoRegion: updatedRegions.includes("NO REGION"),
      EastRegion: updatedRegions.includes("EAST"),
      WestRegion: updatedRegions.includes("WEST"),
      SouthRegion: updatedRegions.includes("SOUTH"),
      NorthRegion: updatedRegions.includes("NORTH"),
    };
  
    setRegionFilters(newRegionFilters);
  
    console.log("Updated Regions:", updatedRegions);
  };
  

  const toggleTab = (index) => {
    if (activeTab !== index) {
      setActiveTab(index);
    }
  };

  const handleOpenDocDetails = () => {
    setdocketColumnsize(3);
    setColumnsize(9);
  };

  const toggleRowVisibility = (index) => {
    const newRowVisibility = [...rowVisibility];
    newRowVisibility[index] = !newRowVisibility[index];
    setRowVisibility(newRowVisibility);

    const newRowIcons = [...rowIcons];
    if (newRowVisibility[index]) {
      newRowIcons[index] = (
        <ExpandLessIcon style={{ transform: "rotate(90deg)" }} />
      );
      setdocketColumnsize(3);
      setColumnsize(9);
    } else {
      newRowIcons[index] = (
        <ExpandMoreIcon style={{ transform: "rotate(90deg)" }} />
      );
      setdocketColumnsize(1);
      setColumnsize(12);
    }
    setRowIcons(newRowIcons);
  };

  const handleButtonClick = (component) => {
    setSelectedComponent(() => component); // Set the selected component
    setPopupVisible(true);
    // Show the popup
  };
  const handlejobplaningtableDoubleclick = (sorderno, item) => {
    console.log("sorderno", sorderno, item);
    setSelectedRowJobdata(item)
    GetDocketDetailTableData(sorderno, item);    
    setActiveTabSide(1); // change the view after double click on the row
  };
  const GetDocketDetailTableData = (sorderno, item) => {
    setLoading(true);
    //154417

    fetch(
      `${API_URL}jobplan/getDocketDetail?pageIndex=1&sorderNoReq=${sorderno}&supplierStoreReq=${item.SupplierStore}&truckTypeReq=${item.TruckType}&catlogCodeReq=${item.CatlogCode}&custOrderNoReq=${item.CustOrderNo}&uomReq=${item.Uom}&orderQtyReq=${item.OrderQty}
   `,
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
        const Data = data.ResultSet;
        //const docketDetails = Data?.JobPlanDetailList;
        console.log(Data);
        setdocketTableData(Data);

        const equipCodes = Data.map((item) => item.EquipCode); // Adjust the key to match your data structure
        // Set EquipCode in the selected row state
        setSelectedRowEquipedCode(equipCodes);
        //setProductTabledata(productTableData);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
        
      });
  };

  return (
    <div className="jobPlaningcard">
      {showAlert && (
        <Nexgen_Alert
          AlertTitle={alertTitle}
          severity={alertType}
          AlertMessage={alertMessage}
          onClose={() => setShowAlert(false)}
        />
      )}

      {/* <CCard style={{ width: "auto", height: "auto" }}> */}
      {/* //mb-3 pl-6 pt-2 pb-2 -mt-8 rounded-lg */}
      {/* <CCardHeader className="headerEQModal mb-3 pl-6 pt-2 pb-2 " >
      
      </CCardHeader> */}
      <CCardBody className="slideIn jobplaning">
        <IconButton
          onClick={handleToggleCollapse}
          sx={{
            marginBottom: "10px",
            marginTop: "-30px",
            outline: "none", // Removes the outline
            background: "none", // Removes any background
            border: "none", // Removes any border
            boxShadow: "none", // Removes any box shadow
            "&:focus": {
              // Removes focus outline
              outline: "none",
            },
            "&:hover": {
              ///background: 'none',   // Ensures no background on hover
            },
          }}
        >
          {isCollapsed ? <ExpandMore /> : <ExpandLess />}{" "}
          {/* Show appropriate icon */}
        </IconButton>

        {/* Conditionally render the row content */}
        {!isCollapsed && (
          <div className="quotationcard">
            <div
              className="menu-bar dividercards slideInLeft"
              // style={{marginTop:"100px"}}
            >
              {/* <div className="menu-button " >
      <IconButton onClick={handleClick}
      className="menu-icon"
      sx={{
       
    outline: 'none',       // Removes the outline
    background: 'none',     // Removes any background
    border: 'none',         // Removes any border
    boxShadow: 'none',      // Removes any box shadow
    '&:focus': {            // Removes focus outline
      outline: 'none',
    },
    '&:hover': {
      ///background: 'none',   // Ensures no background on hover
    },
  }}>
        <ChecklistRtlIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuProps={{
          PaperProps: {
            sx: {
              maxHeight: 200, // Adjust height if necessary
              maxWidth: 150,  // Set the maxWidth of the menu box
            },
          },
        }}
      >
        {names.map((name) => (
          <MenuItem
            key={name}
            onClick={() => {
              handleToggle(name);
              handleClose(); // Close the menu after selection
            }}
            sx={{
              padding: '2px 6px',
              minHeight: '20px',
              width: '150px', // Reduce the width of each MenuItem
              fontSize: '10px', // Adjust font size for each item
              '& .css-10hburv-MuiTypography-root': { // Ensuring the font size for ListItemText
                fontSize: '13px !important', // Force the font size with !important
              },
            }}
          >
            <Checkbox
              checked={personName.includes(name)}
              sx={{ 
                padding: '2px',
                 margin: '0 2px',
                 // width: '16px', 
                  //height: '16px',
                  '& .css-is6013-MuiButtonBase-root-MuiCheckbox-root': { // Ensuring the font size for ListItemText
                   fontSize: '10px !important', // Force the font size with !important
                   width: '10px', 
                   height: '10px',

              },
                  
                 }}
            />
            <ListItemText primary={name} sx={{ fontSize: '10px' }} />
          </MenuItem>
        ))}
      </Menu>
    </div> */}

              <NavLink
                to="/JobOrder/JobOrderScreen"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <button
                  className="menu-button "
                  // onClick={() => !copyClicked && handleCopy()}
                >
                  <img
                    src={quotationbtnIcon}
                    alt="Icon"
                    className="menu-icon"
                  />
                  Job Order
                </button>
              </NavLink>

              <NavLink
                to="/Quotation/QuotationScreen"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <button
                  className="menu-button"
                  // onClick={() => handleButtonClick(QuotationMapRef)}
                >
                  <img
                    src={quotationbtnIcon}
                    alt="Icon"
                    className="menu-icon"
                  />
                  Quotation
                </button>
              </NavLink>

              <button
                className="menu-button"
                // onClick={() => handleButtonClick(QuotationSuplier)}
              >
                <img src={dockectbtnIcon} alt="Icon" className="menu-icon" />
                Docket Details
              </button>
              {/* <button className="menu-button">
              <img src={truckIcon} alt="Icon" className="menu-icon" />
              Assign Truck
            </button> */}
              <button className="menu-button">
                <img src={truckIcon} alt="Icon" className="menu-icon" />
                Select Truck
              </button>
              <button className="menu-button">
                <img src={altsummaryIcon} alt="Icon" className="menu-icon" />
                ALT Summary
              </button>
            </div>
          </div>
        )}

        {popupVisible && selectedComponent && (
          <div style={overlayStyle} onClick={() => closePopup()}>
            <div onClick={(e) => e.stopPropagation()}>
              {/* Render the selected component */}
              {selectedComponent === BulkAllocation && (
                <BulkAllocation onClose={closePopup} />
              )}
            </div>
          </div>
        )}
        <div className="dividercards">
          <CTabs activeTab={activeTab} onActiveTabChange={toggleTab}>
            <CNav variant="tabs" className="flex  border-b-2 border-gray-700">
              <CNavItem className="small-tab-item">
                <CNavLink
                  className={`small-tab-link px-2 py-1 text-xs font-medium text-gray-900  hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-200 ease-in-out ${
                    activeTab === 0 ? "bg-gray-700 text-white" : ""
                  }`}
                >
                  Quarray | Asphalt |Service
                </CNavLink>
              </CNavItem>
              <CNavItem className="small-tab-item">
                <CNavLink
                  className={`small-tab-link px-2 py-1  text-xs font-medium text-gray-900   hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-200 ease-in-out ${
                    activeTab === 1 ? "bg-gray-700 text-white" : ""
                  }`}
                >
                  Concrete | Garden
                </CNavLink>
              </CNavItem>
            </CNav>

            <CTabContent>
              <CTabPane visible={activeTab === 0}>
                <div className="row no-gutters ml-3 mt-1">
            
                    <div className=" d-flex align-items-center p-0 ">
                      {/* <button className="jobinputdivbutton   whitespace-nowrap text-center "  style={{ width: "auto", height: "32px" }}>
                      Save As Default
                      </button> */}
<Tooltip title="save as default">
                      <div
        className="flex items-center justify-center bg-black text-white p-2 rounded-md cursor-pointer  w-16 h-8 transition-all duration-300 ease-in-out transform hover:bg-gray-700 shadow-lg hover:shadow-xl"
        style={{ width: "54px", }} // Rectangle shape
       // onClick={() => GetDatafromCustomerCode()}
      >
        <SaveIcon />
      </div></Tooltip>
                    
                    </div>
                    <div className="col-lg-2 d-flex align-items-center p-0 ml-4">
                      {/* <CInputGroup>
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
                      </CInputGroup> */}
                       <LocalizationProvider dateAdapter={AdapterMoment}>
     
      

        {/* Material UI DatePicker for Date From */}
        <DatePicker
          label="Job start"
          value={moment(filters.dateFrom, "DD-MM-YYYY").toDate()} // Convert "DD-MM-YYYY" to Date
          onChange={(newValue) => handleDateChange("dateFrom", newValue)} // Handle change
          renderInput={(params) => <TextField {...params} size="small" className="inputtextdark" />}
        />

        <span>-</span>

        {/* Material UI DatePicker for Date To */}
        <DatePicker
          label="Job end"
          value={moment(filters.dateTo, "DD-MM-YYYY").toDate()} // Convert "DD-MM-YYYY" to Date
          onChange={(newValue) => handleDateChange("dateTo", newValue)} // Handle change
          renderInput={(params) => <TextField {...params} size="small" className="inputtextdark" />}
        />
    
    </LocalizationProvider>
                    </div>
                    <div className="col-lg-1 d-flex align-items-center justify-content-around p-0 ml-3">
                   {/* Left Arrow Button */}
      <div
        className="flex items-center justify-center bg-black text-white p-2 rounded-md cursor-pointer mr-2 w-16 h-8 transition-all duration-300 ease-in-out transform hover:bg-gray-700 shadow-lg hover:shadow-xl"
        style={{ width: "64px", height: "32px" }} // Rectangle shape
      >
        <ArrowBackIcon />
      </div>

      {/* Right Arrow Button */}
      <div
        className="flex items-center justify-center bg-black text-white p-2 rounded-md cursor-pointer ml-2 w-16 h-8 transition-all duration-300 ease-in-out transform hover:bg-gray-700 shadow-lg hover:shadow-xl"
        style={{ width: "64px", height: "32px" }} // Rectangle shape
      >
        <ArrowForwardIcon />
      </div>
                    </div>
                    <div className="col-lg-1 d-flex align-items-center p-0 marginR5 ml-3">
                      {/* <CInputGroup>
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
                      </CInputGroup> */}
                      <FormControl fullWidth size="small" variant="outlined"
                       sx={{ m: 0.5, width: 250, height: 40, marginTop: 2 }}>
        <InputLabel  sx={{
                              fontSize: "12px",
                              lineHeight: "1.5",
                              marginTop: "-6px",
                            }}
                            id="job-select-label">Select Date Range</InputLabel>
        <Select
        sx={{
          fontSize: "12px",
          lineHeight: "1.5",
          marginTop: "-6px",
        }}
          labelId="job-select-label"
          id="job-select"
          value={selectedValue}
          onChange={handleChange}
          label="Select Job Status"
          className="inputtextdark"
        >
          <MenuItem value="1">Today</MenuItem>
          <MenuItem value="2">Week</MenuItem>
          <MenuItem value="3">Month</MenuItem>
        </Select>
      </FormControl>
                    </div>
                    <div className="col-lg-1 d-flex align-items-center p-0 ml-3">
                      {/* <CInputGroup>
                        <CSelect
                          type="text"
                          size="sm"
                          className="inputtextdark"
                        >
                          <option value="1">show All</option>
                          <option value="2">show active jobs </option>
                          <option value="2">show completed jobs </option>
                        </CSelect>
                      </CInputGroup> */}
                      <FormControl fullWidth size="small" variant="outlined"
                       sx={{ m: 0.5, width: 250, height: 40, marginTop: 2 }}>
        <InputLabel  sx={{
                              fontSize: "12px",
                              lineHeight: "1.5",
                              marginTop: "-6px",
                            }}
                            id="job-select-label">Select Job Status</InputLabel>
        <Select
        sx={{
          fontSize: "12px",
          lineHeight: "1.5",
          marginTop: "-6px",
        }}
          labelId="job-select-label"
          id="job-select"
          value={filters.completedJobToggle}
          // onChange={handleChangeJobStatus}
          onChange={(e) => {
            const value = e.target.value;
            console.log("Selected value:", value);  // Check if it's being updated
            setFilters((prevFilters) => ({
                  ...prevFilters,
                  completedJobToggle: value, // Update the corresponding date field (dateFrom or dateTo)
                }));
            // setJobStatus(value);
          }}
          label="Select Job Status"
          className="inputtextdark"
        >
          <MenuItem value={1}>Show All</MenuItem>
          <MenuItem value={2}>Show Active Jobs</MenuItem>
          <MenuItem value={3}>Show Completed Jobs</MenuItem>
        </Select>
      </FormControl>
                    </div>
                    <div className="col-lg-2 d-flex align-items-center p-0 ml-3">
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
                      <div className="col-lg-2 d-flex align-items-center p-0 ml-4">
                        {/* <button
                          className="jobinputdivbutton w-90"
                          onClick={() => GetDatafromCustomerCode()}
                        >
                          go
                        </button> */}
                                              <div
        className="flex items-center justify-center bg-black text-white p-2 rounded-md cursor-pointer mr-2 w-16 h-8 transition-all duration-300 ease-in-out transform hover:bg-gray-700 shadow-lg hover:shadow-xl"
        style={{ width: "64px", height: "32px" }} // Rectangle shape
        onClick={() => GetgetJobplanDetail()}
      >
        <FastForwardIcon />
      </div>
                      </div>


                    </div>
              

                  {activeTabside === 1 && (
                    <div className="col-lg-3 ml-28 -mb-3 mt-2">
                      <div className="row" style={{ margin: 0 }}>
                        <div className="col-5 col-lg-5 d-flex align-items-center">
                          <div
                            className="legend-color-box"
                            style={{
                              width: "35px",
                              height: "15px",
                              backgroundColor: "rgb(225, 123, 123)",
                              marginRight: "0.5rem",
                              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add shadow
                              borderRadius: "3px", // Rounded corners
                            }}
                          ></div>
                          <span style={{ fontSize: "0.7rem", color: "black" }}>
                            ASSIGNED
                          </span>
                        </div>
                        <div className="col-5 col-lg-6 d-flex align-items-center">
                          <div
                            className="legend-color-box"
                            style={{
                              width: "35px",
                              height: "15px",
                              backgroundColor: "rgb(204, 104, 62)",
                              marginRight: "0.5rem",
                              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add shadow
                              borderRadius: "3px", // Rounded corners
                            }}
                          ></div>
                          <span style={{ fontSize: "0.7rem", color: "black" }}>
                            DRIVER ACCEPTED
                          </span>
                        </div>
                      </div>
                      <div className="row" style={{ margin: 0 }}>
                        {" "}
                        {/* Remove margin */}
                        <div className="col-5 col-lg-5 d-flex align-items-center">
                          <div
                            className="legend-color-box"
                            style={{
                              width: "35px",
                              height: "15px",
                              backgroundColor: "rgb(228, 186, 70)",
                              marginRight: "0.5rem",
                              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add shadow
                              borderRadius: "3px", // Rounded corners
                            }}
                          ></div>
                          <span style={{ fontSize: "0.7rem", color: "black" }}>
                            LOADING
                          </span>
                        </div>
                        <div className="col-5 col-lg-5 d-flex align-items-center ">
                          <div
                            className="legend-color-box"
                            style={{
                              width: "35px",
                              height: "15px",
                              backgroundColor: "rgb(197, 125, 208)",
                              marginRight: "0.5rem",
                              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add shadow
                              borderRadius: "3px", // Rounded corners
                            }}
                          ></div>
                          <span style={{ fontSize: "0.7rem", color: "black" }}>
                            TRAVELLING
                          </span>
                        </div>
                      </div>
                      <div className="row" style={{ margin: 0 }}>
                        {" "}
                        {/* Remove margin */}
                        <div className="col-5 col-lg-5 d-flex align-items-center ">
                          <div
                            className="legend-color-box"
                            style={{
                              width: "35px",
                              height: "15px",
                              backgroundColor: "rgb(185, 216, 180)",
                              marginRight: "0.5rem",
                              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add shadow
                              borderRadius: "3px", // Rounded corners
                            }}
                          ></div>
                          <span style={{ fontSize: "0.7rem", color: "black" }}>
                            ARRIVED
                          </span>
                        </div>
                        <div className="col-6 col-lg-6 d-flex align-items-center ">
                          <div
                            className="legend-color-box"
                            style={{
                              width: "35px",
                              height: "15px",
                              backgroundColor: "#9cf39c",
                              marginRight: "0.5rem",
                              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add shadow
                              borderRadius: "3px", // Rounded corners
                            }}
                          ></div>
                          <span style={{ fontSize: "0.7rem", color: "black" }}>
                            FINISHED
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <CRow style={{ marginTop: "10px" }}>
                  <CCol md={columnsize} className="slideIn">
                    {loading && <LinearProgress style={{ width: "100%" }} />}
                    <JobPlaningMainTable
                      ActiveColumns={personName}
                      regionFilters={regionFilters}
                      handlejobplaningtableDoubleclick={
                        handlejobplaningtableDoubleclick
                      }
                      userselectedrowinjobplaintable={
                        userselectedrowinjobplaintable
                      }
                      JobplanData={JobplanData}
                    />
                    {/* <TestTable  rowData={JobplanData}
                   handlejobplaningtableDoubleclick={handlejobplaningtableDoubleclick}/> */}
                  </CCol>
                  <CCol md={docketcolumnsize}>
                    {/* <button onClick={handleOpenDocDetails}> */}

                    {/* <Tooltip
                    title={rowVisibility[0] ? "Collapse" : "Expand"}
                    placement="right"
                  >
                    <button
                      className="collapse-button"
                      onClick={() => toggleRowVisibility(0)}
                    >
                      {rowIcons[0]}
                    </button>
                  </Tooltip> */}

                    {/* <div style={{ marginTop: "-26px" }}>
                    {docketcolumnsize === 4  &&
                    //  <Carter_details />
                      <DocketTable />
                     }
                  </div> */}

                    {/* </button> */}
                    <CTabs
                      activeTab={activeTabside}
                      onActiveTabChange={toggleTabSide}
                    >
                      <div
                        style={{
                          //         transform: 'rotate(90deg)',
                          // right: "0",
                          // marginTop: "25%",
                          // position: "absolute",
                          // marginRight: "-35%"
                          transform: "rotate(90deg)",
                          right: "0",
                          marginTop: "3%",
                          position: "fixed",
                          marginRight: "-72px",
                        }}
                      >
                        <CNav
                          variant="tabs"
                          className="small-tabs top-0 left-0"
                        >
                          <CNavItem className="small-tab-item">
                            <CNavLink
                              className={`small-tab-link px-2 py-1 text-xs font-medium text-gray-900  hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-200 ease-in-out ${
                                activeTabside === 0
                                  ? "bg-gray-700 text-white"
                                  : ""
                              }`}
                            >
                              Carter Table
                            </CNavLink>
                          </CNavItem>
                          <CNavItem className="small-tab-item">
                            <CNavLink
                              className={`small-tab-link px-2 py-1 text-xs font-medium text-gray-900  hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-200 ease-in-out ${
                                activeTabside === 1
                                  ? "bg-gray-700 text-white"
                                  : ""
                              }`}
                            >
                              Docket Details Table
                            </CNavLink>
                          </CNavItem>
                        </CNav>
                      </div>
                      <CTabContent style={{ marginTop: "2%" }}>
                        <CTabPane
                          visible={activeTabside === 0}
                          className="slideIn"
                        >
                          {docketcolumnsize === 3 && (
                            <Carter_details
                            JobplanData={JobplanData}
                            selectedRowEquipedCode={selectedRowEquipedCode}
                            selectedRowJobdata={selectedRowJobdata}
                            />
                          )}
                        </CTabPane>

                        <CTabPane
                          visible={activeTabside === 1}
                          className="slideIn"
                        >
                          {docketcolumnsize === 3 && (
                            <DocketTable
                              dockectDetailTableData={
                                dockectDetailTableData || []
                              }
                            />
                          )}
                        </CTabPane>
                      </CTabContent>
                    </CTabs>
                  </CCol>
                </CRow>
              </CTabPane>
              <CTabPane visible={activeTab === 1}>
                {/* <div className="row no-gutters ">
                  <div className="col-lg-1 d-flex align-items-center p-0 marginL20">
                    <button className="jobinputdivbutton w-90">
                      Save As Default
                    </button>
                  </div>
                  <div className="col-lg-2 d-flex align-items-center p-0">
                    <CInputGroup>
                      <CInputGroupText className="small-input-text">
                        Job start:
                      </CInputGroupText>
                      <CInput type="date" size="sm" className="inputtextdark" />
                      <span>-</span>
                      <CInput type="date" size="sm" className="inputtextdark" />
                    </CInputGroup>
                  </div>
                  <div className="dx-field-value">
      
                  </div>
                  <div className="col-lg-1 d-flex align-items-center justify-content-around p-0">
                    <ArrowBackIcon style={{ color: "black" }} />
                    <ArrowForwardIcon style={{ color: "black" }} />
                  </div>
                  <div className="col-lg-1 d-flex align-items-center p-0 marginR5">
                    <CInputGroup>
                      <CSelect type="text" size="sm" className="inputtextdark">
                        <option value="1">Today</option>
                        <option value="2">week</option>
                        <option value="1">Month</option>
                        <option value="2">Year</option>
                      </CSelect>
                    </CInputGroup>
                  </div>
                  <div className="col-lg-1 d-flex align-items-center p-0 marginR5">
                    <CInputGroup>
                      <CSelect type="text" size="sm" className="inputtextdark">
                        <option value="1">Select All</option>
                        <option value="2">Open</option>
                      </CSelect>
                    </CInputGroup>
                  </div>
                  <div className="col-lg-2 d-flex align-items-center p-0 ">
                    <div>
                      <FormControl sx={{ m: 0.5, width: 250, height: 40 }}>
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
                              style={getStyles(name, regionname, theme)}
                              sx={{ fontSize: "10px", padding: "2px 4px" }}
                            >
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>

                  {activeTabside === 1 && (
                    <div className="col-lg-3 ml-32 -mb-3">
                      <div className="row" style={{ margin: 0 }}>
                        <div className="col-5 col-lg-5 d-flex align-items-center">
                          <div
                            className="legend-color-box"
                            style={{
                              width: "35px",
                              height: "15px",
                              backgroundColor: "rgb(225, 123, 123)",
                              marginRight: "0.5rem",
                              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add shadow
                              borderRadius: "3px", // Rounded corners
                            }}
                          ></div>
                          <span style={{ fontSize: "0.8rem", color: "black" }}>
                            ASSIGNED
                          </span>
                        </div>
                        <div className="col-5 col-lg-6 d-flex align-items-center">
                          <div
                            className="legend-color-box"
                            style={{
                              width: "35px",
                              height: "15px",
                              backgroundColor: "rgb(204, 104, 62)",
                              marginRight: "0.5rem",
                              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add shadow
                              borderRadius: "3px", // Rounded corners
                            }}
                          ></div>
                          <span style={{ fontSize: "0.8rem", color: "black" }}>
                            DRIVER ACCEPTED
                          </span>
                        </div>
                      </div>
                      <div className="row" style={{ margin: 0 }}>
                        
                       
                        <div className="col-5 col-lg-5 d-flex align-items-center">
                          <div
                            className="legend-color-box"
                            style={{
                              width: "35px",
                              height: "15px",
                              backgroundColor: "rgb(228, 186, 70)",
                              marginRight: "0.5rem",
                              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add shadow
                              borderRadius: "3px", // Rounded corners
                            }}
                          ></div>
                          <span style={{ fontSize: "0.8rem", color: "black" }}>
                            LOADING
                          </span>
                        </div>
                        <div className="col-5 col-lg-5 d-flex align-items-center ">
                          <div
                            className="legend-color-box"
                            style={{
                              width: "35px",
                              height: "15px",
                              backgroundColor: "rgb(197, 125, 208)",
                              marginRight: "0.5rem",
                              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add shadow
                              borderRadius: "3px", // Rounded corners
                            }}
                          ></div>
                          <span style={{ fontSize: "0.8rem", color: "black" }}>
                            TRAVELLING
                          </span>
                        </div>
                      </div>
                      <div className="row" style={{ margin: 0 }}>
                        {" "}
                      
                        <div className="col-5 col-lg-5 d-flex align-items-center ">
                          <div
                            className="legend-color-box"
                            style={{
                              width: "35px",
                              height: "15px",
                              backgroundColor: "rgb(185, 216, 180)",
                              marginRight: "0.5rem",
                              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add shadow
                              borderRadius: "3px", // Rounded corners
                            }}
                          ></div>
                          <span style={{ fontSize: "0.8rem", color: "black" }}>
                            ARRIVED
                          </span>
                        </div>
                        <div className="col-6 col-lg-6 d-flex align-items-center ">
                          <div
                            className="legend-color-box"
                            style={{
                              width: "35px",
                              height: "15px",
                              backgroundColor: "rgb(110, 223, 135)",
                              marginRight: "0.5rem",
                              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add shadow
                              borderRadius: "3px", // Rounded corners
                            }}
                          ></div>
                          <span style={{ fontSize: "0.8rem", color: "black" }}>
                            FINISHED
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div> */}
                <div className="row no-gutters ml-3 mt-1">
            
            <div className=" d-flex align-items-center p-0 ">
              {/* <button className="jobinputdivbutton   whitespace-nowrap text-center "  style={{ width: "auto", height: "32px" }}>
              Save As Default
              </button> */}
<Tooltip title="save as default">
              <div
className="flex items-center justify-center bg-black text-white p-2 rounded-md cursor-pointer  w-16 h-8 transition-all duration-300 ease-in-out transform hover:bg-gray-700 shadow-lg hover:shadow-xl"
style={{ width: "54px", }} // Rectangle shape
// onClick={() => GetDatafromCustomerCode()}
>
<SaveIcon />
</div></Tooltip>
            
            </div>
            <div className="col-lg-2 d-flex align-items-center p-0 ml-4">
              {/* <CInputGroup>
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
              </CInputGroup> */}
               <LocalizationProvider dateAdapter={AdapterMoment}>



{/* Material UI DatePicker for Date From */}
<DatePicker
  label="Job start"
  value={moment(filters.dateFrom, "DD-MM-YYYY").toDate()} // Convert "DD-MM-YYYY" to Date
  onChange={(newValue) => handleDateChange("dateFrom", newValue)} // Handle change
  renderInput={(params) => <TextField {...params} size="small" className="inputtextdark" />}
/>

<span>-</span>

{/* Material UI DatePicker for Date To */}
<DatePicker
  label="Job end"
  value={moment(filters.dateTo, "DD-MM-YYYY").toDate()} // Convert "DD-MM-YYYY" to Date
  onChange={(newValue) => handleDateChange("dateTo", newValue)} // Handle change
  renderInput={(params) => <TextField {...params} size="small" className="inputtextdark" />}
/>

</LocalizationProvider>
            </div>
            <div className="col-lg-1 d-flex align-items-center justify-content-around p-0 ml-3">
           {/* Left Arrow Button */}
<div
className="flex items-center justify-center bg-black text-white p-2 rounded-md cursor-pointer mr-2 w-16 h-8 transition-all duration-300 ease-in-out transform hover:bg-gray-700 shadow-lg hover:shadow-xl"
style={{ width: "64px", height: "32px" }} // Rectangle shape
>
<ArrowBackIcon />
</div>

{/* Right Arrow Button */}
<div
className="flex items-center justify-center bg-black text-white p-2 rounded-md cursor-pointer ml-2 w-16 h-8 transition-all duration-300 ease-in-out transform hover:bg-gray-700 shadow-lg hover:shadow-xl"
style={{ width: "64px", height: "32px" }} // Rectangle shape
>
<ArrowForwardIcon />
</div>
            </div>
            <div className="col-lg-1 d-flex align-items-center p-0 marginR5 ml-3">
              {/* <CInputGroup>
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
              </CInputGroup> */}
              <FormControl fullWidth size="small" variant="outlined"
               sx={{ m: 0.5, width: 250, height: 40, marginTop: 2 }}>
<InputLabel  sx={{
                      fontSize: "12px",
                      lineHeight: "1.5",
                      marginTop: "-6px",
                    }}
                    id="job-select-label">Select Date Range</InputLabel>
<Select
sx={{
  fontSize: "12px",
  lineHeight: "1.5",
  marginTop: "-6px",
}}
  labelId="job-select-label"
  id="job-select"
  value={selectedValue}
  onChange={handleChange}
  label="Select Job Status"
  className="inputtextdark"
>
  <MenuItem value="1">Today</MenuItem>
  <MenuItem value="2">Week</MenuItem>
  <MenuItem value="3">Month</MenuItem>
</Select>
</FormControl>
            </div>
            <div className="col-lg-1 d-flex align-items-center p-0 ml-3">
              {/* <CInputGroup>
                <CSelect
                  type="text"
                  size="sm"
                  className="inputtextdark"
                >
                  <option value="1">show All</option>
                  <option value="2">show active jobs </option>
                  <option value="2">show completed jobs </option>
                </CSelect>
              </CInputGroup> */}
              <FormControl fullWidth size="small" variant="outlined"
               sx={{ m: 0.5, width: 250, height: 40, marginTop: 2 }}>
<InputLabel  sx={{
                      fontSize: "12px",
                      lineHeight: "1.5",
                      marginTop: "-6px",
                    }}
                    id="job-select-label">Select Job Status</InputLabel>
<Select
sx={{
  fontSize: "12px",
  lineHeight: "1.5",
  marginTop: "-6px",
}}
  labelId="job-select-label"
  id="job-select"
  value={filters.completedJobToggle}
  // onChange={handleChangeJobStatus}
  onChange={(e) => {
    const value = e.target.value;
    console.log("Selected value:", value);  // Check if it's being updated
    setFilters((prevFilters) => ({
          ...prevFilters,
          completedJobToggle: value, // Update the corresponding date field (dateFrom or dateTo)
        }));
    // setJobStatus(value);
  }}
  label="Select Job Status"
  className="inputtextdark"
>
  <MenuItem value={1}>Show All</MenuItem>
  <MenuItem value={2}>Show Active Jobs</MenuItem>
  <MenuItem value={3}>Show Completed Jobs</MenuItem>
</Select>
</FormControl>
            </div>
            <div className="col-lg-2 d-flex align-items-center p-0 ml-3">
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
              <div className="col-lg-2 d-flex align-items-center p-0 ml-4">
                {/* <button
                  className="jobinputdivbutton w-90"
                  onClick={() => GetDatafromCustomerCode()}
                >
                  go
                </button> */}
                                      <div
className="flex items-center justify-center bg-black text-white p-2 rounded-md cursor-pointer mr-2 w-16 h-8 transition-all duration-300 ease-in-out transform hover:bg-gray-700 shadow-lg hover:shadow-xl"
style={{ width: "64px", height: "32px" }} // Rectangle shape
onClick={() => GetgetJobplanDetail()}
>
<FastForwardIcon />
</div>
              </div>


            </div>
      

          {activeTabside === 1 && (
            <div className="col-lg-3 ml-28 -mb-3 mt-2">
              <div className="row" style={{ margin: 0 }}>
                <div className="col-5 col-lg-5 d-flex align-items-center">
                  <div
                    className="legend-color-box"
                    style={{
                      width: "35px",
                      height: "15px",
                      backgroundColor: "rgb(225, 123, 123)",
                      marginRight: "0.5rem",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add shadow
                      borderRadius: "3px", // Rounded corners
                    }}
                  ></div>
                  <span style={{ fontSize: "0.7rem", color: "black" }}>
                    ASSIGNED
                  </span>
                </div>
                <div className="col-5 col-lg-6 d-flex align-items-center">
                  <div
                    className="legend-color-box"
                    style={{
                      width: "35px",
                      height: "15px",
                      backgroundColor: "rgb(204, 104, 62)",
                      marginRight: "0.5rem",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add shadow
                      borderRadius: "3px", // Rounded corners
                    }}
                  ></div>
                  <span style={{ fontSize: "0.7rem", color: "black" }}>
                    DRIVER ACCEPTED
                  </span>
                </div>
              </div>
              <div className="row" style={{ margin: 0 }}>
                {" "}
                {/* Remove margin */}
                <div className="col-5 col-lg-5 d-flex align-items-center">
                  <div
                    className="legend-color-box"
                    style={{
                      width: "35px",
                      height: "15px",
                      backgroundColor: "rgb(228, 186, 70)",
                      marginRight: "0.5rem",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add shadow
                      borderRadius: "3px", // Rounded corners
                    }}
                  ></div>
                  <span style={{ fontSize: "0.7rem", color: "black" }}>
                    LOADING
                  </span>
                </div>
                <div className="col-5 col-lg-5 d-flex align-items-center ">
                  <div
                    className="legend-color-box"
                    style={{
                      width: "35px",
                      height: "15px",
                      backgroundColor: "rgb(197, 125, 208)",
                      marginRight: "0.5rem",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add shadow
                      borderRadius: "3px", // Rounded corners
                    }}
                  ></div>
                  <span style={{ fontSize: "0.7rem", color: "black" }}>
                    TRAVELLING
                  </span>
                </div>
              </div>
              <div className="row" style={{ margin: 0 }}>
                {" "}
                {/* Remove margin */}
                <div className="col-5 col-lg-5 d-flex align-items-center ">
                  <div
                    className="legend-color-box"
                    style={{
                      width: "35px",
                      height: "15px",
                      backgroundColor: "rgb(185, 216, 180)",
                      marginRight: "0.5rem",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add shadow
                      borderRadius: "3px", // Rounded corners
                    }}
                  ></div>
                  <span style={{ fontSize: "0.7rem", color: "black" }}>
                    ARRIVED
                  </span>
                </div>
                <div className="col-6 col-lg-6 d-flex align-items-center ">
                  <div
                    className="legend-color-box"
                    style={{
                      width: "35px",
                      height: "15px",
                      backgroundColor: "#9cf39c",
                      marginRight: "0.5rem",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add shadow
                      borderRadius: "3px", // Rounded corners
                    }}
                  ></div>
                  <span style={{ fontSize: "0.7rem", color: "black" }}>
                    FINISHED
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

                <CRow style={{ marginTop: "10px" }}>
                  <CCol md={columnsize}>
                    <JobPlaningMainTable
                    //  ActiveColumns={personName}
                    //  regionFilters={regionFilters}
                    //  handlejobplaningtableDoubleclick={handlejobplaningtableDoubleclick}
                    />
                  </CCol>
                  <CCol md={docketcolumnsize}>
                    {/* <button onClick={handleOpenDocDetails}> */}

                    {/* <Tooltip
                    title={rowVisibility[0] ? "Collapse" : "Expand"}
                    placement="right"
                  >
                    <button
                      className="collapse-button"
                      onClick={() => toggleRowVisibility(0)}
                    >
                      {rowIcons[0]}
                    </button>
                  </Tooltip> */}

                    {/* <div style={{ marginTop: "-26px" }}>
                    {docketcolumnsize === 4  &&
                    //  <Carter_details />
                      <DocketTable />
                     }
                  </div> */}

                    {/* </button> */}
                    <CTabs
                      activeTab={activeTabside}
                      onActiveTabChange={toggleTabSide}
                    >
                      <div
                        style={{
                          //         transform: 'rotate(90deg)',
                          // right: "0",
                          // marginTop: "25%",
                          // position: "absolute",
                          // marginRight: "-35%"
                          transform: "rotate(90deg)",
                          right: "0",
                          marginTop: "3%",
                          position: "fixed",
                          marginRight: "-72px",
                        }}
                      >
                        <CNav
                          variant="tabs"
                          className="small-tabs top-0 left-0"
                        >
                          <CNavItem className="small-tab-item">
                            <CNavLink className="small-tab-link">
                              Carter Table
                            </CNavLink>
                          </CNavItem>
                          <CNavItem className="small-tab-item">
                            <CNavLink className="small-tab-link">
                              Docket Details Table
                            </CNavLink>
                          </CNavItem>
                        </CNav>
                      </div>
                      <CTabContent style={{ marginTop: "2%" }}>
                        <CTabPane visible={activeTabside === 0}>
                          {docketcolumnsize === 3 && <Carter_details />}
                        </CTabPane>

                        <CTabPane visible={activeTabside === 1}>
                          {docketcolumnsize === 3 && <DocketTable />}
                        </CTabPane>
                      </CTabContent>
                    </CTabs>
                  </CCol>
                </CRow>
              </CTabPane>
            </CTabContent>
          </CTabs>
        </div>
        <div style={{ position: "fixed", bottom: 120, right: 5, zIndex: 1000 }}>
          <Box sx={{ transform: "translateZ(0px)", flexGrow: 1 }}>
            <SpeedDial
              open={isOpen} // Control open state
              onOpen={() => setIsOpen(true)} // Optional: Handle manual opening
              onClose={() => setIsOpen(false)} // Optional: Handle manual closing
              ariaLabel="SpeedDial basic example"
              // sx={{ position: 'absolute', bottom: -10, right: -3 }}
              icon={<SpeedDialIcon />}
              FabProps={{
                sx: {
                  backgroundColor: "black",
                  boxShadow: isOpen
                    ? "0 0 10px 5px rgba(255, 165, 38, 0.7)"
                    : "",
                  animation: isOpen ? "blink 1.5s infinite" : "",
                  "&:hover": {
                    backgroundColor: "darkgray", // Optional: Change color on hover
                  },
                },
              }}
            >
              {actions.map((action) => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  onClick={action.floatbtnAction}
                />
              ))}
            </SpeedDial>
          </Box>
        </div>

        {/* <div className="dividercards">
          {" "}
         
        </div> */}
      </CCardBody>
    </div>
    //  </CCard>
  );
}
