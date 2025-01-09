/**
 * Created By Nadeesh Perera
 * Discription : This component  is a Main component in Central control .
 *
 */

import React, { Component } from "react";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import LabelInput from "src/generics/fields/LabelInput";
import PeerTable2 from "src/generics/table/PeerTable2";
import { apiGetCall } from "src/generics/APIFunctions";
import moment from "moment";
import { API_URL } from "../util/config";
import { Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CheckListDetails from "./Tables_CC/CheckListDetails";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LinearProgress from "@material-ui/core/LinearProgress";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "73%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius:"8px"
};

export default class CheckList extends Component {
  state = {
    CheckList: [],
    startDate: moment().add(-15, "days").format("YYYY-MM-DD"),
    endDate: moment()
      .add(+1, "days")
      .format("YYYY-MM-DD"),
    columns: [],
    DriverCode: "",
    field: "",
    open: false,
    isLoading: true,
    pageSize: 20,
  };

  handleClose = (Mapurl) => {
    this.setState({ open: false });
  };

  handleOpen = (Mapurl) => {
    this.setState({ open: true });
  };

  onCellClick(e) {}

  async generateColumns() {
    const column = [
      {
        field: "DriverCode",
        headerName: "DriverCode",
        sortable: true,
        headerAlign: "center",
        headerClassName: "super-app-theme--header",
      },
    ];

    let endDate = "";
    for (let i = 1; i <= 15; i++) {
      const dateToDisplay = moment(this.state.startDate).add(i, "days");
      const dateColumnHeader = {
        field: dateToDisplay.format("YYYY-MM-DD"),
        type: "button",
        headerName: dateToDisplay.format("YYYY-MM-DD"),
        headerAlign: "center",
        headerClassName: "super-app-theme--header",
        width: 85,
      };

      column.push(dateColumnHeader);
      endDate = dateToDisplay.format("YYYY-MM-DD");
    }
    await this.setState({
      columns: column,
      //endDate: endDate,
    });
  }

  ReturnValue = (Value) => {
    return <div style={{ color: "red" }}>${Value}</div>;
  };

  normalizeRow(array) {
    this.generateColumns();
    if (array) {
      const newArray = [];

      // generata listing dates

      const dates = [];
      for (let i = 0; i <= 15; i++) {
        const dateToDisplay = moment(this.state.startDate).add(i, "days");
        dates.push(dateToDisplay.format("YYYY-MM-DD"));
      }

      //
      for (let obj of array) {
        const row = {
          DriverCode: obj.DriverCode,
          //Status: obj.CheckListStatus.Status,
          // DriverName:obj.DriverName
        };

        //   generating driver date to array
        let arrayOfCheckListStatus = [];
        const SCheckListStatus = [];
        const CheckListStatus = [];
        for (let obj1 of obj.CheckListStatus) {
          arrayOfCheckListStatus.push({
            //  date: moment(obj1.CheckListDate).format("YYYY-MM-DD"),
            date: obj1.CheckListDate.slice(0, 10),
            status: obj1.Status,
          });
        }

        for (let i = 0; i <= dates.length; i++) {
          let ARROBJ = arrayOfCheckListStatus.find(
            (item) => item.date === dates[i]
          );

          if (ARROBJ) {
            const status =
              ARROBJ.status === "P"
                ? "PASS"
                : ARROBJ.status === "F"
                ? "FAILED"
                : ARROBJ.status === "R"
                ? "RESOLVED"
                : "";
            row[dates[i]] = status;
          } else {
            row[dates[i]] = "";
          }
        }

        newArray.push(row);
      }
      this.setState({ CheckList: newArray });
    }
  }

  componentDidMount = () => {
    this.fecthData();
  };

  fecthData = () => {
    this.setState({
      isLoading: true,
    });

    const url = `${API_URL}centralcontol/checklistenquiry?fromDate=${this.state.startDate}&toDate=${this.state.endDate}`;
    this.setState({
      CheckList: [],
    });
    //https://test.esqtruckapi.com.au/

    const callback = (da) => {
      this.normalizeRow(da.ResultSet);

      this.setState({
        isLoading: false,
      });
    };

    const error = (e) => {
      console.error(e);
    };

    apiGetCall(url, callback, error);
  };
  setPageSize = (newPageSize) => {
    this.setState({
      pageSize: newPageSize,
    });
  };

  render() {
    return (
      <React.Fragment>
        <CCard>
          <CCardHeader className="headerEQ">Check List Enquiry</CCardHeader>
          <CCardBody>
            <div className="row">
              <div className="col-lg-2">
                <LabelInput
                  type="date"
                  name="startdate"
                  label="Start Date"
                  value={moment(this.state.startDate)
                    .add(+1, "days")
                    .format("YYYY-MM-DD")}
                  onChange={(startDate) => {
                    startDate = moment(startDate.target.value).format(
                      "YYYY-MM-DD"
                    );
                    this.setState({ startDate: startDate }, () => {
                      this.generateColumns();
                    });
                  }}
                />
              </div>
              <div className="col-lg-2">
                <LabelInput
                  type="date"
                  name="todate"
                  label="End Date"
                  disabled
                  value={moment(this.state.endDate)
                    .add(-1, "days")
                    .format("YYYY-MM-DD")}
                  onChange={(endDate) => {
                    endDate = moment(endDate.target.value).format("YYYY-MM-DD");
                    this.setState({ endDate: endDate }, () => {
                      // this.fecthData();
                    });
                  }}
                />
              </div>
              <div className="col-lg-2">
                <Button
                  style={{ marginTop: 45, backgroundColor: "black" }}
                  variant="contained"
                  title="excute"
                  onClick={() => {
                    this.fecthData();
                  }}
                >
                  GO <PlayCircleFilledIcon style={{ marginLeft: 9 }} />
                </Button>
              </div>
              <div className="col-lg-2">
                <Button
                  style={{ marginTop: 45, backgroundColor: "black" }}
                  variant="contained"
                  title="-14 days"
                  onClick={(startDate) => {
                    startDate = moment(this.state.startDate)
                      .add(-13, "days")
                      .format("YYYY-MM-DD");
                    let endDate = moment(this.state.endDate)
                      .add(-13, "days")
                      .format("YYYY-MM-DD");
                    this.setState(
                      { startDate: startDate, endDate: endDate },
                      () => {
                        this.generateColumns();
                        this.fecthData();
                      }
                    );
                  }}
                >
                  <ArrowBackIcon style={{ marginLeft: 9 }} />
                </Button>
                <Button
                  style={{
                    marginTop: 45,
                    marginLeft: 8,
                    backgroundColor: "black",
                  }}
                  variant="contained"
                  title="+14 days"
                  onClick={(startDate) => {
                    startDate = moment(this.state.startDate)
                      .add(+13, "days")
                      .format("YYYY-MM-DD");
                    let endDate = moment(this.state.endDate)
                      .add(+13, "days")
                      .format("YYYY-MM-DD");
                    this.setState(
                      { startDate: startDate, endDate: endDate },
                      async () => {
                        await this.generateColumns();
                        this.fecthData();
                      }
                    );
                  }}
                >
                  <ArrowForwardIcon style={{ marginLeft: 9 }} />
                </Button>
              </div>
              <div className="col-lg-2"></div>
            </div>
            <br />
            <br />
            {!this.state.isLoading ? (
              <PeerTable2
                name="CheckList"
                data={this.state.CheckList == null ? [] : this.state.CheckList}
                pageSize={this.state.pageSize}
                onPageSizeChange={this.setPageSize}
                rowsPerPageOptions={[10, 20, 50, 75, 100]}
                rowHeight={32}
                style={{ fontSize: "10px", width: "100%" }}
                headerHeight={40}
                columns={this.state.columns}
                onCellDoubleClick={(e) => {
                  const field = e.field;
                  const DriverCode = e.row.DriverCode;
                  this.setState({ field: field, DriverCode: DriverCode });
                  this.handleOpen();
                }}
                getCellClassName={(params) => {
                  if (params.value == "PASS") {
                    return "pass";
                  } else if (params.value == "FAILED") {
                    return "fail";
                  } else if (params.value == "RESOLVED") {
                    return "resolved";
                  }
                }}
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
                <CheckListDetails
                  field={this.state.field}
                  DriverCode={this.state.DriverCode}
                />
              </Box>
            </Modal>
          </CCardBody>
        </CCard>
      </React.Fragment>
    );
  }
}
