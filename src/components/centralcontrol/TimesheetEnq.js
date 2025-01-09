/**
 * Created By Nadeesh Perera
 * Discription : This component  is a Main component in Central control.
 *
 */

import React, { Component } from "react";
import clsx from "clsx";
import moment from "moment";
import RefreshIcon from "@mui/icons-material/Refresh";

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
import { CircularProgress, DialogTitle } from "@mui/material";
import BreakHistory from "./Tables_CC/BreakHistory";
import { OutlinedBox } from "src/generics/fields/Outlinedbox";
import { Button } from "@material-ui/core";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import LinearProgress from "@material-ui/core/LinearProgress";

// const API_URL = window.GlobalAppConfigs.API_URL;

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
  borderRadius:"15px"
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

class TimesheetEnq extends Component {
  state = {
    timesheet: [],
    startDate: moment().startOf("day").format("YYYY-MM-DD"),
    endDate: moment().endOf("day").format("YYYY-MM-DD"),
    // .set({ year: 2022, month: 0, date: 15 })
    open: false,
    drivers: [],
    driverCode: "",
    Name: "",
    latitude: "",
    longitude: "",
    driverName: "",
    openmodal: false,
    isLoading: true,
    li_locked: 0,
    li_att_id: 0,
    Status: "",

    field: "",
    DriverCode: "",
  };
  //login and clock in map modal
  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  //breakhistroy modal
  handleClosemodal = () => {
    this.setState({ openmodal: false });
  };

  handleOpenmodal = () => {
    this.setState({ openmodal: true });
  };
  componentDidMount = () => {
    // check today date
    //if(todaydate <=15){
    // start date: 1
    //}else{
    //startdate : 15
    //}
    this.fecthData();
    this.fecthDrivers();
  };

  fecthData = () => {
    this.setState({
      isLoading: true,
    });
    const url = `${API_URL}centralcontol/timesheet?fromDate=${this.state.startDate}&toDate=${this.state.endDate}&driverCode=${this.state.driverCode}`;
    this.setState({
      timesheet: [],
    });

    const callback = (da) => {
      this.setState({
        isLoading: false,
        timesheet: da.ResultSet,
      });
    };

    const error = (e) => {
      console.error(e);
    };

    apiGetCall(url, callback, error);
  };
  //drivers filter
  fecthDrivers = () => {
    const url = `${API_URL}enquiry/driverlist`;
    this.setState({
      drivers: [],
    });

    const callback = (da) => {
      this.setState({
        drivers: da.ResultSet,
      });
    };

    const error = (e) => {
      console.error(e);
    };

    apiGetCall(url, callback, error);
  };

  //foramt date in to localdate string
  // formatDate(dateValue) {
  //   dateValue = new Date(dateValue).toLocaleDateString("en-AU");

  //   return dateValue;
  // }
  formatDate(dateValue) {
    const date = new Date(dateValue);
    const options = {
      timeZone: "Australia/Sydney",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-AU", options);
    return formattedDate;
  }
  //api date format include time and time zone this fomat date in to local string AUS
  formatDateTime(dateValue) {
    if (dateValue == "null" || dateValue == "") {
      return " ";
    }
    dateValue = new Date(dateValue).toLocaleTimeString("en-US", {
      timeZone: "Australia/Melbourne",
    });

    return dateValue;
  }

  CalculateWorkHours = (TotalHours, BreakHours) => {
    let value = Number(TotalHours) - Number(BreakHours);
    if (value < 0) {
      return 0;
    } else if (value > 0) {
      return value.toFixed(2);
    }
  };
  //round calculation to 2points
  Formatvalue = (BreakHours) => {
    let value = Number(BreakHours);
    return value.toFixed(2);
  };

  handleMinus = () => {};

  handleLookup = (item) => {
    let data = this.state.drivers;
    let rst = data.find((x) => x.DriverCode == item);

    this.setState(
      {
        driverCode: item,
        driverName: rst.Name,
      },
      () => {
        //this.fecthData();
      }
    );
  };
  refreshPage() {
    window.location.reload(false);
  }

  handleDateChange = (date, name) => {
    const { startDate, endDate } = this.state;
    if (name === "startDate") {
      // this.setState({ startDate: date });
      if (date > new Date(endDate)) {
        alert("End date cannot be before start date");
        // this.setState({ endDate: date });
      } else {
        this.setState({ startDate: moment(date).format("YYYY-MM-DD") });
      }
    } else if (name === "toDate") {
      if (date < new Date(startDate)) {
        alert("End date cannot be before start date");
      } else {
        //this.setState({ endDate: date });
        this.setState({ endDate: moment(date).format("YYYY-MM-DD") });
      }
    }
  };

  // handleDateChange = (date, name) => {
  //   const { startDate, endDate } = this.state;
  //   if (name === "startDate") {
  //     if (date < endDate) {
  //       alert("start date cannot be before start date");
  //     } else {
  //       this.setState({ startDate: date });
  //     }

  //     if (date > endDate) {
  //       this.setState({ endDate: date });
  //     }
  //   } else if (name === "toDate") {
  //     if (date < new Date(startDate)) {
  //       alert("End date cannot be before start date");
  //     } else {
  //       this.setState({ endDate: date });
  //     }
  //   }
  // };

  render() {
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
                    value={this.state.startDate}
                    onChange={(event) => {
                      const date = event.target.value;
                      this.handleDateChange(new Date(date), "startDate");
                    }}
                    style={{ width: "100px" }}
                  />
                </CCol>

                <CCol md={2}>
                  <LabelInput
                    type="date"
                    name="toDate"
                    label="End Date"
                    minDate={new Date(this.state.startDate)}
                    value={this.state.endDate}
                    onChange={(event) => {
                      const date = event.target.value;

                      this.handleDateChange(new Date(date), "toDate");
                      // this.setState({ endDate: date }, () => {
                      //   // this.fecthData();
                      // });
                    }}
                  />
                </CCol>

                <CCol md={1.7}>
                  <CDropdown
                    style={{
                      marginTop: 45,
                    }}
                  >
                    <CDropdownToggle color="secondary">
                      Date Filter
                    </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem
                        onClick={() => {
                          const startDate = moment()
                            .startOf("day")
                            .format("YYYY-MM-DD");
                          const endDate = moment()
                            .endOf("day")
                            .format("YYYY-MM-DD");
                          this.setState({ endDate, startDate }, () => {
                            this.fecthData();
                          });
                        }}
                      >
                        Today
                      </CDropdownItem>
                      <CDropdownItem
                        onClick={() => {
                          const startDate = moment()
                            .startOf("week")
                            .format("YYYY-MM-DD");
                          const endDate = moment()
                            .endOf("week")
                            .format("YYYY-MM-DD");
                          this.setState({ endDate, startDate }, () => {
                            this.fecthData();
                          });
                        }}
                      >
                        Week
                      </CDropdownItem>
                      <CDropdownItem
                        onClick={() => {
                          const startDate = moment()
                            .startOf("month")
                            .format("YYYY-MM-DD");
                          const endDate = moment()
                            .endOf("month")
                            .format("YYYY-MM-DD");
                          this.setState({ endDate, startDate }, () => {
                            this.fecthData();
                          });
                        }}
                      >
                        Month
                      </CDropdownItem>
                      <CDropdownItem
                        onClick={() => {
                          const startDate = moment()
                            .startOf("year")
                            .format("YYYY-MM-DD");
                          const endDate = moment()
                            .endOf("year")
                            .format("YYYY-MM-DD");
                          this.setState({ endDate, startDate }, () => {
                            this.fecthData();
                          });
                        }}
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
                    data={this.state.drivers}
                    dataKey="ResultSet"
                    valueField={"DriverCode"}
                    value={this.state.driverCode}
                    shrink={true}
                    dataFormat={dataFormat}
                    onChange={(item) => {
                      this.handleLookup(item);
                    }}
                    style={{ width: "130px", marginLeft: 30 }}
                  />
                </CCol>
                <CCol md={2}>
                  <LabelInput
                    type="lookup"
                    name="driverName"
                    label=""
                    value={this.state.driverName}
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
                    onClick={() => {
                      if (this.state.startDate > this.state.endDate) {
                        alert("End date cannot be before start date");
                        this.setState({
                          endDate: moment().format("YYYY-MM-DD"),
                        });
                      } else {
                        this.fecthData();
                      }
                    }}
                    variant="contained"
                    color="primary"
                    title="excute"
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
            {!this.state.isLoading ? ( //circular progress animation -loading
              <PeerTable2
                name="TimesheetEnq"
                data={this.state.timesheet == null ? [] : this.state.timesheet}
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
                      this.state.Status = params.row.Status;
                      if (params.row.Status == 0) {
                        return "Locked";
                      } else if (params.row.Status == 1) {
                        return "Active";
                      } else return "Resolved";
                    },
                    cellClassName: (params) => {
                      if (params.value == "Locked") {
                        return "Tsheet_Locked";
                      } else if (params.value == "Resolved") {
                        return "Tsheet_Resolved";
                      } else if (params.value == "Active") {
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
                    valueGetter: (params) =>
                      this.formatDate(`${params.row.Date}`),
                  },
                  {
                    field: "LogIn",
                    headerName: "Log In Time",
                    width: 80,
                    sortable: false,
                    headerAlign: "center",
                    headerClassName: "super-app-theme--header",
                    valueGetter: (params) =>
                      this.formatDateTime(`${params.row.LogIn}`),
                  },
                  {
                    field: "LogOut",
                    headerName: "Log Off Time",
                    sortable: false,
                    width: 80,
                    headerAlign: "center",
                    headerClassName: "super-app-theme--header",
                    valueGetter: (params) =>
                      this.formatDateTime(`${params.row.ClockOut}`),
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
                          const LogInLatitude = params.row.LogInLatitude;
                          const LogInLongitude = params.row.LogInLongitude;
                          const DriverCode = params.row.DriverCode;
                          const field = this.formatDate(`${params.row.Date}`);

                          this.setState({
                            latitude: LogInLatitude,
                            longitude: LogInLongitude,
                            DriverCode: DriverCode,
                            field: field,
                          });
                          if (LogInLatitude == 0) {
                            window.alert("No location Data");
                            return;
                          }
                          Mapurl = `https://www.google.com/maps/?q=${LogInLatitude},${LogInLongitude}`;
                          // window.open(Mapurl);
                          this.handleOpen();
                        }}
                      >
                        view Map
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
                      this.formatDateTime(`${params.row.ClockIn}`),
                  },
                  {
                    field: "ClockOut",
                    headerName: "Clock Out Time",
                    sortable: false,
                    width: 120,
                    headerAlign: "center",
                    headerClassName: "super-app-theme--header",
                    valueGetter: (params) =>
                      this.formatDateTime(`${params.row.ClockOut}`),
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
                          const field = this.formatDate(`${params.row.Date}`);
                          this.setState({
                            latitude: ClockInLatitude,
                            longitude: ClockInLongitude,
                            DriverCode: DriverCode,
                            field: field,
                          });
                          if (ClockInLatitude == 0) {
                            window.alert("No location Data");
                            return;
                          }
                          Mapurl = `https://www.google.com/maps/?q=${ClockInLatitude},${ClockInLongitude}`;
                          this.handleOpen();
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
                          this.setState({
                            historytimesheetBreaks: timesheetBreaks,
                            historyDate: Date,
                            historyDCode: DriverCode,
                          });

                          this.handleOpenmodal();
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
                    valueGetter: (params) =>
                      this.Formatvalue(`${params.row.BreakHours}`),
                  },
                  {
                    field: "workingHours",
                    headerName: "working Hours",
                    sortable: false,
                    width: 110,
                    headerAlign: "center",
                    headerClassName: "super-app-theme--header",
                    valueGetter: (params) =>
                      this.CalculateWorkHours(
                        `${params.row.TotalHours}`,
                        `${params.row.BreakHours}`
                      ),
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
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                {/* <DialogTitle style={{ fontSize: "15px", fontStyle: "bold" }}>
                  Modal Title
                </DialogTitle> */}
                <TruckMap
                  latitude={this.state.latitude}
                  longitude={this.state.longitude}
                  field={this.state.field}
                  DriverCode={this.state.DriverCode}
                />
              </Box>
            </Modal>
            <Modal
              className=""
              open={this.state.openmodal}
              onClose={this.handleClosemodal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={styleBreakHistory}>
                <BreakHistory
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  driverCode={this.state.driverCode}
                  historytimesheetBreaks={this.state.historytimesheetBreaks}
                  historyDate={this.state.historyDate}
                  historyDCode={this.state.historyDCode}
                />
              </Box>
            </Modal>
          </CCardBody>
        </CCard>
      </React.Fragment>
    );
  }
}
export default TimesheetEnq;
