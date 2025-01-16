import React, { Component } from "react";
import PeerTable2 from "src/generics/table/PeerTable2";
import { apiGetCall } from "src/generics/APIFunctions";
import { API_URL } from "src/components/util/config";
import LinearProgress from "@material-ui/core/LinearProgress";

import { CCol, CRow } from "@coreui/react";

export default class TruckList extends Component {
  state = {
    truckList: [],
    columns: [],
    column: [],
    loading: true,
    pageSize: 20,
    truckCodeFilterValue: "",
  };

  componentDidMount = () => {
    this.fecthtruckData();
  };

  formatCellValue(params) {
    return `${params.row.value}`;
  }
  normalizeRow(array) {
    let maxCol = 0;
    for (let i of array) {
      if (i.TruckOrders) {
        if (i.TruckOrders.length > maxCol) {
          maxCol = i.TruckOrders.length;
        }
      }
    }
    this.generateColumns(maxCol);
    if (array) {
      const newArray = [];
      let occupiedRows = [];
      let availableRows = [];
      let otherRows = [];
      let truckGreen = [];
      let truckRed = [];

      const data = [];
      for (let i = 0; i < maxCol; i++) {
        const dateToDisplay = i;
        data.push(dateToDisplay);
      }

      for (let obj of array) {
        const row = {
          TruckCode: obj.TruckCode,
          TruckType: obj.TruckType,
          LoggedIn: obj.LoggedIn,
          LogIn: obj.LogIn,
          NextBreak: obj.NextBreak,
          BreakValue: obj.BreakValue,
          IsOccupied: obj.IsOccupied,
        };
        let arrayOfCheckListStatus = [];
        let TruckOrders = [];

        if (obj.TruckOrders) {
          for (let obj1 of obj.TruckOrders) {
            arrayOfCheckListStatus.push(obj1);
          }
        }
        for (let i = 0; i < data.length; i++) {
          let ARROBJ = arrayOfCheckListStatus.find(
            (item) => item.ID === data[i]
          );

          if (ARROBJ) {
            const JobNo = ARROBJ.JobNo;
            const status = ARROBJ.DocketStatus;
            const T_status = ARROBJ.TruckStatus;
            let backgroundColor = "";
            if (T_status !== " ") {
              backgroundColor =
                //|| "S" || "P" || "T" || "L"
                T_status === "A"
                  ? "yellow"
                  : T_status === "S"
                  ? "yellow"
                  : T_status === "P"
                  ? "yellow"
                  : T_status === "T"
                  ? "yellow"
                  : T_status === "L"
                  ? "yellow"
                  : T_status === "N"
                  ? "red"
                  : T_status === "D"
                  ? "green"
                  : "";
            } else if ((T_status === " ", status)) {
              backgroundColor =
                status === "D"
                  ? "green"
                  : status === "P"
                  ? "orange"
                  : status === "A"
                  ? "background"
                  : "";
            }

            row[data[i]] = {
              value: `${JobNo}`,
              style: {
                backgroundColor,
              },
            };
          } else {
            row[data[i]] = "";
          }
        }

        if (obj.IsOccupied) {
          occupiedRows.push(row);
        } else if (!obj.IsOccupied && obj.LoggedIn === 1) {
          availableRows.push(row);
        } else {
          otherRows.push(row);
        }
      }
      const sortedArray = occupiedRows.concat(availableRows, otherRows);
      this.setState({ truckList: sortedArray, loading: false });
    }
  }
  setPageSize = (newPageSize) => {
    this.setState({
      pageSize: newPageSize,
    });
  };
  generateColumns(ColCount) {
    let columns = [
      {
        field: "TruckCode",
        headerName: "Truck Code",
        sortable: true,
        headerAlign: "center",
        headerClassName: "super-app-theme--header",
        cellClassName: (params) => {
          if (params.row.LoggedIn === 1) {
            return "trucklistcolorGreen";
          } else if (params.row.LoggedIn === 0) {
            return "trucklistcolorRed";
          }
        },
      },
      {
        field: "TruckType",
        headerName: "Truck Type",
        sortable: true,
        headerAlign: "center",
        headerClassName: "super-app-theme--header",
        cellClassName: "trucksummary_cust",
      },
      {
        field: "LoggedIn",
        headerName: "Status",
        sortable: true,
        headerAlign: "center",
        headerClassName: "super-app-theme--header",

        valueGetter: (params) => {
          if (params.row.IsOccupied === 1) {
            return "Occupied";
          }
          if (params.row.LoggedIn === 1) {
            return "Available";
          }

          if (params.row.IsOccupied === 0 && params.row.LoggedIn === 0) {
            return "";
          }
        },

        cellClassName: (params) => {
          if (params.value === "Occupied") {
            return "Occupied";
          } else if (params.value === "Available") {
            return "Available";
          }
        },
      },
      {
        field: "LogIn",
        headerName: "Log In",
        sortable: true,
        headerAlign: "center",
        headerClassName: "super-app-theme--header",
        valueGetter: (params) => this.formatTime(`${params.row.LogIn}`),
      },
      {
        field: "NextBreak",
        headerName: "Next Break",
        sortable: true,
        headerAlign: "center",
        headerClassName: "super-app-theme--header",
        valueGetter: (params) => this.formatTime(`${params.row.NextBreak}`),
      },
      {
        field: "BreakValue",
        headerName: "Total Break",
        sortable: true,
        headerAlign: "center",
        headerClassName: "super-app-theme--header",
        align: "right",
        valueGetter: (params) =>
          this.formatValueDecimal(`${params.row.BreakValue}`),
      },
    ];

    for (let i = 0; i < ColCount; i++) {
      const dateColumnHeader = {
        field: i,
        headerName: "Order",
        width: 70,
        sortable: false,
        headerAlign: "center",
        headerClassName: "super-app-theme--header",
        valueGetter: (params) => {
          return params.row[i].value;
        },
        cellClassName: (params) =>
          params.row[i].style?.backgroundColor === "green"
            ? "green-cell"
            : params.row[i].style?.backgroundColor === "orange"
            ? "orange-cell"
            : params.row[i].style?.backgroundColor === "background"
            ? "background-cell"
            : params.row[i].style?.backgroundColor === "red"
            ? "red-cell"
            : params.row[i].style?.backgroundColor === "yellow"
            ? "yellow-cell"
            : "",
      };

      columns.push(dateColumnHeader);
    }
    this.setState({
      columns: columns,
    });
  }

  fecthtruckData = () => {
    const url = `${API_URL}centralcontol/truckList`;
    this.setState({
      truckList: [],
      loading: true,
    });
    const callback = (truck) => {
      this.normalizeRow(truck.ResultSet);
    };
    const error = (e) => {
      console.error(e);
    };
    apiGetCall(url, callback, error);
  };

  formatTime(dateValue) {
    if (
      dateValue === "null" ||
      dateValue ==="0001-01-01T00:00:00" ||
      dateValue === ""
    ) {
      return "";
    }
    const date = new Date(dateValue);
    const timeOptions = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
      timeZone: "Australia/Sydney",
    };
    const timeValue = date.toLocaleString("en-US", timeOptions);
    return timeValue;
  }

  formatValueDecimal = (e) => {
    let value = Number(e);
    return value.toFixed(2);
  };
  handleTruckCodeFilterChange = (event) => {
    this.setState({
      truckCodeFilterValue: event.target.value.toUpperCase(),
    });
  };

  render() {
    const { truckList, truckCodeFilterValue } = this.state;
    const filteredData = truckList
      ? truckList.filter((row) => {
          const truckCodeMatch = row.TruckCode.toUpperCase().includes(
            truckCodeFilterValue.toUpperCase()
          );
          return truckCodeMatch;
        })
      : [];
    return (
      <div>
        {this.state.loading && <LinearProgress />}
        <div
          style={{
            marginBottom: "5px",
            position: "foxed",
            float: "left",
            left: 0,
          }}
        >
          <input
            type="text"
            placeholder="Truck Code"
            value={truckCodeFilterValue}
            onChange={this.handleTruckCodeFilterChange}
            style={{ width: "90px", fontSize: "11px" }}
          />
        </div>
        <div className="peerTableContainer">
          <PeerTable2
            name="truck List"
            data={filteredData}
            pageSize={this.state.pageSize}
            onPageSizeChange={this.setPageSize}
            rowsPerPageOptions={[10, 20, 50, 75, 100]}
            style={{ fontSize: "12px", width: "100%" }}
            rowHeight={23}
            headerHeight={32}
            fontsize={12}
            componentsProps={{
              pagination: {
                sx: {
                 
                  "& .MuiSelect-select": {
                  
                    transform: "translateY(20%)",
                  },
                  
                },
              },
            }}
            columns={this.state.columns}
            headerClassName="peerTableHeader"
          />
          <CRow
            className="mb-0"
            style={{
              bottom: 0,
              left: 100,
              float: "bottom",
              marginTop: "-45px",
              width: "60%",
              marginLeft: "80px",
            }}
          >
            <CCol xs={3} className="p-0">
              <div className="d-flex align-items-center justify-content-center">
                <div className="box1 m-0" />
                <h7 className="boxtext2 m-0 ml-1">Scheduled</h7>
              </div>
            </CCol>
            <CCol xs={3} className="p-0">
              <div className="d-flex align-items-center justify-content-center">
                <div className="box2 m-0" />
                <h7 className="boxtext2 m-0 ml-1">Scheduled(Send toTruck)</h7>
              </div>
            </CCol>
            <CCol xs={3} className="p-0">
              <div className="d-flex align-items-center justify-content-center">
                <div className="box3 m-0" />
                <h7 className="boxtext2 m-0 ml-1">In Progress</h7>
              </div>
            </CCol>
            <CCol xs={2} className="p-0">
              <div className="d-flex align-items-center justify-content-center">
                <div className="box4 m-0" />
                <h7 className="boxtext2 m-0 ml-1">Finished</h7>
              </div>
            </CCol>
          </CRow>
        </div>{" "}
        <br></br>
      </div>
    );
  }
}

//-----------------------------------------------------------------------------------------------------
