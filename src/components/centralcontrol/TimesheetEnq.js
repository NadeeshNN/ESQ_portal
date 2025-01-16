import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import {
  CCard,
  CRow,
  CContainer,
  CCardBody,
  CCardHeader,
  CCol,
  CDropdown,
  CDropdownToggle,
  CDropdownItem,
  CDropdownMenu,
} from "@coreui/react";
import { API_URL } from "../util/config";
import LabelInput from "src/generics/fields/LabelInput";
import PeerTable2 from "src/generics/table/PeerTable2";
import { apiGetCall } from "src/generics/APIFunctions";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TruckMap from "../map/TruckLocationMap";
import BreakHistory from "./Tables_CC/BreakHistory";
import { Button } from "@material-ui/core";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import LinearProgress from "@material-ui/core/LinearProgress";


const dataFormat = [
  {
    field: "DriverCode",
    headerName: "Driver Code",
  },
  {
    field: "Name",
    headerName: "Name",
    width: "100%",
  },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: "15px",
};

const styleBreakHistory = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1100,
  height: "80",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};
export default function TimesheetEnq  ()  {
  const [timesheet, setTimesheet] = useState([]);
  const [startDate, setStartDate] = useState(moment().startOf("day").format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(moment().endOf("day").format("YYYY-MM-DD"));
  const [selectedStartDate, setSelectedStartDate] = useState(startDate);
  const [selectedEndDate, setSelectedEndDate] = useState(endDate);
  
  const [open, setOpen] = useState(false);
  const [drivers, setDrivers] = useState([]);
  //const [DriverCode, setDriverCode] = useState("");
  const [driverCode, setdriverCode] = useState("");
  const [DriverCode, setDriverCode] = useState("");
  
  const [driverName, setDriverName] = useState("");
  const [selectedDriverCode, setSelectedDriverCode] = useState(""); // Temporarily selected driver code
  const [selectedDriverName, setSelectedDriverName] = useState(""); // Temporarily selected driver name

  //const [isGoClicked, setIsGoClicked] = useState(false);
  // const [selectedDriverCode, setSelectedDriverCode] = useState(DriverCode);
  // const [selectedDriverName, setSelectedDriverName] = useState(driverName);
  

  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [field, setField] = useState("");
 

  const [historytimesheetBreaks, setHistoryTimesheetBreaks] = useState([]);
const [historyDate, setHistoryDate] = useState(null);
const [historyDCode, setHistoryDCode] = useState("");
  //const [openModal, setOpenModal] = useState(false);

  


  const fetchData = useCallback(() => {
    setIsLoading(true);
    const url = `${API_URL}centralcontol/timesheet?fromDate=${startDate}&toDate=${endDate}&DriverCode=${DriverCode}`;
    setTimesheet([]); // Clear the timesheet data before fetching new data

    const callback = (data) => {
      setIsLoading(false);
      setTimesheet(data.ResultSet); // Update timesheet with the fetched data
    };

    const error = (e) => {
      console.error(e);
      setIsLoading(false); // Stop loading on error
    };

    apiGetCall(url, callback, error);
  }, [startDate, endDate, DriverCode]);



  const fetchDrivers = useCallback(() => {
    const url = `${API_URL}enquiry/driverlist`;
    apiGetCall(
      url,
      (data) => setDrivers(data.ResultSet),
      (error) => console.error(error)
    );
  }, []);

  useEffect(() => {
    fetchData();
    fetchDrivers();
  }, [fetchData, fetchDrivers]);

  


  
  const formatDate = (dateValue) => {
    const date = new Date(dateValue);
    const options = {
      timeZone: "Australia/Sydney",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    return date.toLocaleDateString("en-AU", options);
  };

  //api date format include time and time zone this fomat date in to local string AUS
  const formatDateTime = (dateValue) => {
    if (!dateValue || dateValue === "null") {
      return " ";
    }
    return new Date(dateValue).toLocaleTimeString("en-US", {
      timeZone: "Australia/Melbourne",
    });
  };
  

  const calculateWorkHours = (totalHours, breakHours) => {
    const value = Number(totalHours) - Number(breakHours);
    return value < 0 ? 0 : value.toFixed(2);
  };

  //round calculation to 2points
 const formatValue = (breakHours) => {
  const value = Number(breakHours);
  return value.toFixed(2);
}

const handleMinus = () => {
  // Implement functionality here
};





  

  const handleLookup = (item) => {
    const rst = drivers.find((x) => x.DriverCode === item);
  //  setDriverCode(item);
  //  setDriverName(rst?.Name || "");
  setSelectedDriverCode(item); // Temporarily store selected driver code
  setSelectedDriverName(rst?.Name || "");
  
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleOpen = () => {
    // setLatitude(latitude);
    // setLongitude(longitude);
    // setField(field);
    // setDriverCode(DriverCode);
    setOpen(true);
  };
  

  //breakhistroy modal
  const handleCloseModal = () => {
    setOpenModal(false); // Set openModal state to false to close the modal
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };


  

  // const refreshPage = () => {
  //   window.location.reload(false);
  // };


  const handleDateChange = (date, name) => {
    if (name === "startDate") {
      if (date > new Date(selectedEndDate)) {
        alert("End date cannot be before start date");
      } else {
        setSelectedStartDate(moment(date).format("YYYY-MM-DD"));
      }
    } else if (name === "toDate") {
      if (date < new Date(selectedStartDate)) {
        alert("End date cannot be before start date");
      } else {
        setSelectedEndDate(moment(date).format("YYYY-MM-DD"));
      }
    }
  };
  

  const handleGoClick = () => {
    if (selectedStartDate > selectedEndDate) {
      alert("End date cannot be before start date");
    } else {
      setStartDate(selectedStartDate);
      setEndDate(selectedEndDate);
      setDriverCode(selectedDriverCode); // Update displayed driver code
      setDriverName(selectedDriverName);
  //    setDriverCode(DriverCode);
  //  setDriverName(driverName);
  
  
      fetchData(); // Ensure fetchData is correctly implemented
     // setIsGoClicked(true);
    }
  };
  

  const handleDateChangeFilter = (newStartDate, newEndDate) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    fetchData();
  };

  // const formatDate = (dateValue) => {
  //   const date = new Date(dateValue);
  //   return date.toLocaleDateString("en-AU", {
  //     timeZone: "Australia/Sydney",
  //     year: "numeric",
  //     month: "numeric",
  //     day: "numeric",
  //   });
  // };

  // const formatDateTime = (dateValue) => {
  //   if (!dateValue) return " ";
  //   const date = new Date(dateValue);
  //   return date.toLocaleTimeString("en-US", {
  //     timeZone: "Australia/Melbourne",
  //   });
  // };

  return (
    <React.Fragment>
    <CCard>
      <CCardHeader className="headerEQ">TimeSheet Enquiry</CCardHeader>
      <CCardBody>
        <br></br>
        <CContainer>
          <CRow>
            <CCol md={2}>
              <LabelInput
                type="date"
                name="startdate"
                label="Start Date"
                value={selectedStartDate}
                //onChange={(event) => handleDateChange(event.target.value, "startDate")}
                onChange={(event) => {
                  const date = event.target.value;
                  handleDateChange(new Date(date), "startDate");
                }}
                style={{ width: "100px" }}
              />
            </CCol>

            <CCol md={2}>
              <LabelInput
                type="date"
                name="toDate"
                label="End Date"
                minDate={startDate}
                value={selectedEndDate}
               // onChange={(event) => handleDateChange(event.target.value, "endDate")}
               onChange={(event) => {
                const date = event.target.value;
                console.log("Selected Start Date:", date); // Debugging log
                handleDateChange(new Date(date), "toDate");
              }}
              />
            </CCol>

            <CCol md={1.7}>
      <CDropdown style={{ marginTop: 45 }}>
        <CDropdownToggle color="secondary">Date Filter</CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem
            onClick={() =>
              handleDateChangeFilter(
                moment().startOf("day").format("YYYY-MM-DD"),
                moment().endOf("day").format("YYYY-MM-DD")
              )
            }
          >
            Today
          </CDropdownItem>
          <CDropdownItem
            onClick={() =>
              handleDateChangeFilter(
                moment().startOf("week").format("YYYY-MM-DD"),
                moment().endOf("week").format("YYYY-MM-DD")
              )
            }
          >
            Week
          </CDropdownItem>
          <CDropdownItem
            onClick={() =>
              handleDateChangeFilter(
                moment().startOf("month").format("YYYY-MM-DD"),
                moment().endOf("month").format("YYYY-MM-DD")
              )
            }
          >
            Month
          </CDropdownItem>
          <CDropdownItem
            onClick={() =>
              handleDateChangeFilter(
                moment().startOf("year").format("YYYY-MM-DD"),
                moment().endOf("year").format("YYYY-MM-DD")
              )
            }
          >
            Year
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </CCol>

            <CCol md={3}>
              <LabelInput
                type="lookup"
                name="PlantCode"
                label="Driver Code"
                data={drivers}
                dataKey="ResultSet"
                valueField={"DriverCode"}
                value={selectedDriverCode}
                shrink={true}
                dataFormat={dataFormat}
                onChange={handleLookup}
                style={{ width: "130px", marginLeft: 30 }}
              />
            </CCol>
            <CCol md={2}>
              <LabelInput
                type="lookup"
                name="driverName"
                label=""
                value={selectedDriverName}
                dissabled={true}
                hideIcon={true}
                style={{ marginLeft: -50 }}
              />
            </CCol>

           

<CCol sm="auto">
  <Button
    style={{
      marginTop: 45,
      marginLeft: 50,
      backgroundColor: "black",
    }}
    onClick={ handleGoClick}
    variant="contained"
    color="primary"
    title="Execute"
  >
    GO
    <PlayCircleFilledIcon style={{ marginLeft: 10 }} />
  </Button>
</CCol>

          </CRow>
        </CContainer>

        <br />
        <br />
        <br />
        <></>
        {!isLoading ? ( //circular progress animation -loading
          <PeerTable2
            name="TimesheetEnq"
            data={timesheet == null ? [] : timesheet}
            rowHeight={33}
            pageSize={20}
            headerHeight={40}
            style={{ fontSize: "10px", width: "100%" }}
            columnGroupingModel={[
              // top Main Groups
              {
                headerClassName: "loginH",
                groupId: "LOG - IN/OUT",
                description: "",
                children: [
                  { field: "LogIn" },
                  { field: "LogOut" },
                  { field: "l1" },
                ],
              },
              {
                headerClassName: "clockInH",
                groupId: "CLOCK - IN/OUT",
                description: "",
                children: [
                  { field: "ClockIn" },
                  { field: "ClockOut" },
                  { field: "l2" },
                ],
              },
              {
                headerClassName: "breakInH",
                groupId: "BREAK TIME",
                description: "",
                children: [
                  { field: "Breakhistory" },
                  { field: "BreakHours" },
                ],
              },
            ]}
            columns={[
              {
                field: "DriverCode",
                headerName: "Driver Code",
                sortable: true,
                headerAlign: "center",
                headerClassName: "super-app-theme--header",
              },
              {
                field: "Status",
                headerName: "Status",
                sortable: true,
                width: 80,
                headerAlign: "center",
                headerClassName: "super-app-theme--header",
                valueGetter: (params) => {
                  if (params.row.Status === 0) {
                    return "Locked";
                  } else if (params.row.Status === 1) {
                    return "Active";
                  } else {
                    return "Resolved";
                  }
                },
                cellClassName: (params) => {
                  if (params.value === "Locked") {
                    return "Tsheet_Locked";
                  } else if (params.value === "Resolved") {
                    return "Tsheet_Resolved";
                  } else if (params.value === "Active") {
                    return "Tsheet_Active";
                  }
                },
              },
              {
                field: "EquipCode",
                headerName: "Truck Code",
                sortable: true,
                type: "button",
                width: 85,
                headerAlign: "center",
                headerClassName: "super-app-theme--header",
              },
              {
                field: "Date",
                headerName: "Date",
                width: 90,
                sortable: true,
                type: "button",
                headerAlign: "center",
                headerClassName: "super-app-theme--header",
                valueGetter: (params) => formatDate(params.row.Date),
              },
              {
                field: "LogIn",
                headerName: "Log In Time",
                width: 80,
                sortable: false,
                headerAlign: "center",
                headerClassName: "super-app-theme--header",
                valueGetter: (params) => formatDateTime(params.row.LogIn),
              },
              {
                field: "LogOut",
                headerName: "Log Off Time",
                sortable: false,
                width: 80,
                headerAlign: "center",
                headerClassName: "super-app-theme--header",
                valueGetter: (params) => formatDateTime(params.row.ClockOut),
              },
              {
                field: "l1",
                headerName: "Map",
                sortable: false,
                width: 86,
                headerAlign: "center",
                headerClassName: "super-app-theme--header",
                renderCell: (params) => (
                  <button
                    className="loginB"
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => {
                      let Mapurl = "";
                      const logInLatitude = params.row.LogInLatitude;
                      const logInLongitude = params.row.LogInLongitude;
                      const DriverCode = params.row.DriverCode;
                      const field = formatDate(params.row.Date);
              
                      // Update modal-related state using hooks
                       setLatitude(logInLatitude);
                       setLongitude(logInLongitude);
                       setdriverCode(DriverCode);
                       setField(field);
              
                      if (logInLatitude === 0) {
                        window.alert("No location data");
                        return;
                      }
              
                      Mapurl = `https://www.google.com/maps/?q=${logInLatitude},${logInLongitude}`;
              
                     
                      handleOpen();
                    }}
                  >
                    View Map
                  </button>
                ),
              },
              {
                field: "ClockIn",
                headerName: "Clock In Time",
                sortable: false,
                width: 86,
                headerAlign: "center",
                headerClassName: "super-app-theme--header",
                valueGetter: (params) =>
                  formatDateTime(params.row.ClockIn),
              },
              {
                field: "ClockOut",
                headerName: "Clock Out Time",
                sortable: false,
                width: 120,
                headerAlign: "center",
                headerClassName: "super-app-theme--header",
                valueGetter: (params) =>
                  formatDateTime(params.row.ClockOut),
              },
              {
                field: "l2",
                headerName: "Map",
                sortable: false,
                headerAlign: "center",
                width: 86,
                headerClassName: "super-app-theme--header",
                renderCell: (params) => (
                  <button
                    className="clockInB"
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => {
                      let Mapurl = "";

                      const ClockInLatitude = params.row.ClockInLatitude;
                      const ClockInLongitude = params.row.ClockInLongitude;
                      const DriverCode = params.row.DriverCode;
                      const field  = formatDate(`${params.row.Date}`);

                      setLatitude(ClockInLatitude);
                      setLongitude(ClockInLongitude);
                      setdriverCode(DriverCode);
                      setField(field );
          
                      if (ClockInLatitude === 0) {
                        window.alert("No location Data");
                        return;
                      }
                      Mapurl = `https://www.google.com/maps/?q=${ClockInLatitude},${ClockInLongitude}`;
                      handleOpen();
                    }}
                  >
                    view Map
                  </button>
                ),
              },

              {
                field: "Breakhistory",
                headerName: "Break History",
                sortable: false,
                width: 110,
                headerAlign: "center",
                headerClassName: "super-app-theme--header",
                renderCell: (params) => (
                  <button
                    className="breakInB"
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => {
                      const DriverCode = params.row.DriverCode;
                      const Date = params.row.Date;
                      const timesheetBreaks = params.row.timesheetBreaks;
                      setHistoryTimesheetBreaks(timesheetBreaks);
                      setHistoryDate(Date);
                      setHistoryDCode(DriverCode);
                  
                      handleOpenModal();
                    }}
                  >
                    view History
                  </button>
                ),
              },

              {
                field: "BreakHours",
                headerName: "Breaking Hours",
                sortable: false,
                width: 120,
                headerAlign: "center",
                headerClassName: "super-app-theme--header",
                valueGetter: (params) => formatValue(`${params.row.BreakHours}`),
              },
              {
                field: "workingHours",
                headerName: "working Hours",
                sortable: false,
                width: 110,
                headerAlign: "center",
                headerClassName: "super-app-theme--header",
                valueGetter: (params) =>
        calculateWorkHours(`${params.row.TotalHours}`, `${params.row.BreakHours}`),
              },
              {
                field: "TotalHours",
                headerName: "Total Hours",
                sortable: false,
                width: 100,
                headerAlign: "center",
                headerClassName: "super-app-theme--header",
              },
            ]}
          />
        ) : (
          <LinearProgress />
          // <CircularProgress />
        )}
        <Modal
          className="modalsize"
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {/* <DialogTitle style={{ fontSize: "15px", fontStyle: "bold" }}>
              Modal Title
            </DialogTitle> */}
            <TruckMap
              latitude={latitude}
              longitude={longitude}
              field={field}
              DriverCode={driverCode}
            />
          </Box>
        </Modal>
        <Modal
          className=""
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleBreakHistory}>
            <BreakHistory
              startDate={startDate}
              endDate={endDate}
              DriverCode={DriverCode}
              historytimesheetBreaks={historytimesheetBreaks}
              historyDate={historyDate}
              historyDCode={historyDCode}
            />
          </Box>
        </Modal>
      </CCardBody>
    </CCard>
  </React.Fragment>

  );
};

//export default TimesheetEnq;
