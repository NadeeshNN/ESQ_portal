import React, { Component } from "react";
import PeerTable2 from "src/generics/table/PeerTable2";
import { apiGetCall } from "src/generics/APIFunctions";
import { CCard, CCardBody, CCardHeader, CRow, CCol } from "@coreui/react";
import BreakHistroyMap from "src/components/map/BreakHistroyMap";
import { API_URL } from "src/components/util/config";

const columns = [
  "BreakEnd",
  "BreakEndLatitude",
  "BreakEndLatitude",
  "BreakEndLongitude",
  "BreakStartLatitude",
  "BreakStart",
];

export default class BreakHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: 1,
      endDate: [[this.props.endDate]],
      startDate: [[this.props.startDate]],
      driverCode: [[this.props.driverCode]],
      timesheet: [],
      historytimesheetBreaks: [this.props.historytimesheetBreaks],
      historyDate: [this.props.historyDate],
      historyDCode: [this.props.historyDCode],
      refresh: false,

      latitudeA: 0,
      longitudeA: 0,
      latitudeB: 0,
      longitudeB: 0,
      polylinePath: "",
    };
  }

  formatDate(dateValue) {
    dateValue = new Date(dateValue).toLocaleDateString("en-AU");

    return dateValue;
  }

  formatDateTime(dateValue) {
    if (dateValue == "null" || dateValue == "") {
      return "N/A";
    }
    dateValue = new Date(dateValue).toLocaleTimeString("en-US", {
      timeZone: "Australia/Melbourne",
    }); // this format data in to localdate sting api date content time and zone

    return dateValue;
  }

  getpolyline = () => {
    const url = `${API_URL}centralcontol/getplloyline?orgin=${this.state.latitudeA},${this.state.longitudeA}&distination=${this.state.latitudeB},${this.state.longitudeB}`;
    const callback = (data) => {
      this.setState({
        polylinePath: data.ResultSet[0],
      });
    };
    const error = (e) => {
      console.error(e);
    };
    apiGetCall(url, callback, error);
  };

  render() {
    return (
      <div>
        <div>
          <CCard>
            <CCardHeader className="headerEQModal">
              Break History - Driver Code: {this.state.historyDCode} | Date :
              {this.formatDate(this.state.historyDate)}
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol sm={5}>
                  <CCard>
                    <CCardBody>
                      <PeerTable2
                        name="CheckList Details"
                        data={this.props.historytimesheetBreaks}
                        rowHeight={38}
                        headerHeight={39}
                        columns={[
                          {
                            field: "BreakStart",
                            headerName: "BreakStart",
                            sortable: true,
                            width: 120,
                            overflow: "auto",
                            headerAlign: "center",
                            headerAlign: "center",
                            headerClassName: "super-app-theme--header",
                            valueGetter: (params) =>
                              this.formatDateTime(`${params.row.BreakStart}`),
                          },
                          {
                            field: "BreakEnd",
                            headerName: "BreakEnd",
                            sortable: true,
                            width: 120,
                            headerAlign: "center",
                            headerAlign: "center",
                            headerClassName: "super-app-theme--header",
                            valueGetter: (params) =>
                              this.formatDateTime(`${params.row.BreakEnd}`),
                          },
                          {
                            field: "Map",
                            headerName: "Map",
                            sortable: true,
                            width: 110,
                            headerAlign: "center",
                            headerAlign: "center",
                            headerClassName: "super-app-theme--header",
                            renderCell: (params) => (
                              <button
                                className="breakInB"
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={() => {
                                  const BreakEndLatitude =
                                    params.row.BreakEndLatitude;
                                  const BreakEndLongitude =
                                    params.row.BreakEndLongitude;
                                  const BreakStartLatitude =
                                    params.row.BreakStartLatitude;
                                  const BreakStartLongitude =
                                    params.row.BreakStartLongitude;

                                  this.setState(
                                    {
                                      latitudeA: BreakEndLatitude,
                                      longitudeA: BreakEndLongitude,
                                      latitudeB: BreakStartLatitude,
                                      longitudeB: BreakStartLongitude,
                                    },
                                    () => {
                                      this.getpolyline();
                                    }
                                  );

                                  if (BreakEndLatitude == 0) {
                                    window.alert("No location Data");
                                    return;
                                  }
                                }}
                              >
                                view Map
                              </button>
                            ),
                          },
                        ]}
                      />
                    </CCardBody>
                  </CCard>
                </CCol>

                <CCol sm={7}>
                  <CCard>
                    <CCardBody>
                      <BreakHistroyMap
                        latitudeA={this.state.latitudeA}
                        longitudeA={this.state.longitudeA}
                        latitudeB={this.state.latitudeB}
                        longitudeB={this.state.longitudeB}
                        polylinePath={this.state.polylinePath}
                      />
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </div>
      </div>
    );
  }
}
