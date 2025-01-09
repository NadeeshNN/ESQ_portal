/**
 * Created By Nadeesh Perera
 * Discription : This component  is a Main component in Central control.
 * This component includes ( code for onfield truck and the map , today stat, ) added  truck summary component
 *
 */

import React, { Component } from "react";
import { apiGetCall } from "src/generics/APIFunctions";
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CButton,
  CCardTitle,
  CNavItem,
  CCardHeader,
  CNavLink,
  CNav,
  CTabContent,
  CTabPane,
  CTabs,
} from "@coreui/react";
import TruckMap from "../map/TruckLocationMap";
import PeerTable2 from "src/generics/table/PeerTable2";
import TruckList from "./Tables_CC/TruckList";
import Trucksummary from "./Tables_CC/Trucksummary";
import { API_URL } from "../util/config";
import JobtruckEnquryMap from "../map/JobtruckEnquryMap";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

// const [activeKey, setActiveKey] = useState(1)
//import MyComponent from 'src/layout/Map'
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
  openmodal: false,
};

//Firebase configuyration for the live Apllication
// var firebaseConfig = {
//   apiKey: "AIzaSyDPYQiGcw5NsuBsf3LPgMapPtIYJXta-Fk",
//   authDomain: "eqtruckapp.firebaseio.com",
//   // The value of `databaseURL` depaends on the location of the database
//   databaseURL: "https://eqtruckapp.firebaseio.com",
//   projectId: "eqtruckapp",
//   storageBucket: "eqtruckapp.appspot.com",
//   messagingSenderId: "SENDER_ID",
//   appId: "APP_ID",
//   // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
//   measurementId: "G-MEASUREMENT_ID",
// };

// Firebase con figuration for the test application
var firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "eqtruckapp-b99f2.firebaseio.com",
  // The value of `databaseURL` depends on the location of the database
  databaseURL: "https://eqtruckapp-b99f2-default-rtdb.firebaseio.com",
  projectId: "eqtruckapp-b99f2",
  storageBucket: "eqtruckapp-b99f2.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
  // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
  measurementId: "G-MEASUREMENT_ID",
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

class JobTruckEnq extends Component {
  state = {
    activeKey: 1,
    onfieldtruck: [],
    stats: [],
    Queued: 0,
    OnFeild: 0,
    Finished: 0,
    TotLoad: 0,
    DocketNo: "",
    locations: [],
    TruckLastLatitude: "",
    TruckLastLongitude: "",
    destination_longitude: "",
    destination_latitude: "",
    distTime: [],
    newarray: [],
    StatusDesc: "",
    Truckcode: "",
    customer: "",
    MarkerText: "",
    latitudeA: 0,
    longitudeA: 0,
    latitudeB: 0,
    longitudeB: 0,
    polylinePath: "",
    prevSumArriveStatus: [],
  };

  // fetch url begin

  componentDidMount = () => {
    this.fecthtruckData();
    this.fecthDrivers();

    // firebase;
    const dbRef = ref(database, "location/trucks");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();

      let sumArriveSttus = 0;
      for (let key in data) {
        const iscomplete = data[key].iscomplete;
        if (iscomplete == "no") {
          const arriveStatus = data[key].status;
          sumArriveSttus += arriveStatus;

          // if (arriveStatus !== this.state.prevArriveStatus) {
          //   this.setState({ prevArriveStatus: arriveStatus });
          // }
        }
      }
      if (sumArriveSttus !== this.state.prevSumArriveStatus) {
        this.setState({ prevSumArriveStatus: sumArriveSttus }, () => {
          this.fecthtruckData();
        });
      }
    });
  };

  componentWillUnmount() {
    if (this.firebaseListener) {
      this.firebaseListener(); // Call the listener to detach it
    }
  }

  //fetch today stat count
  fecthDrivers = () => {
    const url = `${API_URL}centralcontol/truckTodayStat`;
    this.setState({
      stats: [],
    });

    const callback = (da) => {
      this.setState({
        stats: da.ResultSet,
        Queued: da.ResultSet[0].Queued,
        OnFeild: da.ResultSet[0].OnFeild,
        Finished: da.ResultSet[0].Finished,
        TotLoad: da.ResultSet[0].TotLoad,
      });
    };

    const error = (e) => {
      console.error(e);
    };

    apiGetCall(url, callback, error);
  };
  fecthtruckData = async () => {
    const url = `${API_URL}centralcontol/onfieldtruck`;
    this.setState({
      onfieldtruck: [],
    });

    const callback = (truck) => {
      this.setState({
        onfieldtruck: truck.ResultSet,
      });
    };

    const error = (e) => {
      console.error(e);
    };

    apiGetCall(url, callback, error);
  };

  TruckLastLocation = async (CDocketNo) => {
    const url = `${API_URL}centralcontol/trucklastlocation?docketNo=${CDocketNo}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.ResultSet[0] !== null) {
        const firstLocation = data.ResultSet[0];
        this.setState({
          locations: data.ResultSet,
          TruckLastLatitude: firstLocation.TruckLastLatitude,
          TruckLastLongitude: firstLocation.TruckLastLongitude,
        });
      } else {
        console.log("null array");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // get approx dist and time  : this will get approx time to get truck to the destination
  GetApproxDistTime = async (
    id,
    destination_longitude,
    destination_latitude
  ) => {
    const url = `${API_URL}centralcontol/getAproxDistTime?orgin=${this.state.TruckLastLatitude},${this.state.TruckLastLongitude}&distination=${destination_latitude},${destination_longitude}`;
    this.setState({
      distTime: [],
    });
    const callback = (lc) => {
      this.setState({
        distTime: lc.ResultSet,
      });
      this.AddApproxDist(id, lc.ResultSet);
    };

    const error = (e) => {
      console.error(e);
    };

    await apiGetCall(url, callback, error);
  };

  // : split the time and dist
  AddApproxDist = async (id, data) => {
    let dataset = this.state.onfieldtruck;

    let dataString = data[0];
    let approxDist = dataString.split(",")[0];
    let approxTime = dataString.split(",")[1];
    // dataset[id];
    dataset[id].ApproxDist = approxDist;
    dataset[id].ApproxTime = approxTime;
    this.setState({
      onfieldtruck: dataset,
    });
  };

  handleOpenmodal = () => {
    this.setState({ openmodal: true });
  };
  handleClosemodal = () => {
    this.setState({
      DocketNo: "",
      TruckLastLatitude: "",
      TruckLastLongitude: "",
      destination_longitude: "",
      openmodal: false,
    });
  };

  formatValueDecimal = (e) => {
    let value = Number(e);
    return value.toFixed(2);
  };

  //for polyline : Polyline is used for draw a path between destination and the origin
  // we get that seperately beacause if we use Google direction render service it will send api request continuesly and cost more
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
      <React.Fragment>
        <CCard>
          <CCardHeader className="headerEQ">Job Truck Enquiry</CCardHeader>
          <br></br>
          <CCardBody>
            <div>
              <CRow>
                <CCol>
                  <CCard
                    className="text-center"
                    style={{ marginLeft: "17px", marginRight: "17px" }}
                  >
                    <CCardBody>
                      <CRow>
                        <CCol sm="6" lg="3" className="slideInLeft">
                          <CCardTitle
                            style={{ marginTop: "10px", fontWeight: "700" }}
                          >
                            TODAY&apos;S STATS
                          </CCardTitle>
                        </CCol>
                        <CCol sm="6" lg="2" className="slideIn">
                          <CButton color="danger" className="todaystatcards">
                            Queued {this.state.Queued}
                          </CButton>
                        </CCol>
                        <CCol sm="6" lg="2" className="slideIn">
                          <CButton color="warning" className="todaystatcards">
                            OnField {this.state.OnFeild}
                          </CButton>
                        </CCol>
                        <CCol sm="6" lg="2" className="slideIn">
                          <CButton color="success" className="todaystatcards">
                            Finished {this.state.Finished}
                          </CButton>
                        </CCol>
                        <CCol sm="6" lg="2" className="slideIn">
                          <CButton color="info" className="todaystatcards">
                            T Load {this.state.TotLoad}
                          </CButton>
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCard>

                  {/* <MyComponent /> */}
                  {/* <TruckMap
                        latitude={-32.94465}
                        longitude={141.7872}
                        defaultZoom={10}
                      /> */}
                  <Modal
                    className=""
                    open={this.state.openmodal}
                    onClose={this.handleClosemodal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={styleBreakHistory}>
                      <JobtruckEnquryMap
                        destination_longitude={this.state.destination_longitude}
                        destination_latitude={this.state.destination_latitude}
                        TruckLastLatitude={this.state.TruckLastLatitude}
                        TruckLastLongitude={this.state.TruckLastLongitude}
                        StatusDesc={this.state.StatusDesc}
                        Truckcode={this.state.Truckcode}
                        customer={this.state.customer}
                        MarkerText={this.state.MarkerText}
                        polylinePath={this.state.polylinePath}
                        style={{ marginTop: "10px" }}
                      />
                    </Box>
                  </Modal>
                  <CCol>
                    <CCard className="text-center slideInLeft">
                      <CCardBody>
                        <CTabs activeTab="onfieldtruck">
                          <CNav variant="tabs">
                            <CNavItem>
                              <CNavLink
                                data-tab="onfieldtruck"
                                active={this.state.activeKey === 1}
                                onClick={() => this.setState({ activeKey: 1 })}
                              >
                                On Field Truck
                              </CNavLink>
                            </CNavItem>
                            <CNavItem>
                              <CNavLink
                                data-tab="trucksummary"
                                active={this.state.activeKey === 2}
                                onClick={() => this.setState({ activeKey: 2 })}
                              >
                                Truck Summary
                              </CNavLink>
                            </CNavItem>
                            <CNavItem>
                              <CNavLink
                                data-tab="TruckList"
                                active={this.state.activeKey === 3}
                                onClick={() => this.setState({ activeKey: 3 })}
                              >
                                Truck List
                              </CNavLink>
                            </CNavItem>
                          </CNav>
                          <CTabContent>
                            <CTabPane
                            className="slideInBottom"
                              data-tab="onfieldtruck"
                              visible={this.state.activeKey == 3}
                            >
                              <br></br>
                              <div>
                                <br></br>
                                <div>
                                  <PeerTable2
                                    name="On field Truck"
                                    style={{
                                      fontSize: "12px",
                                      width: "100%",
                                    }}
                                    data={
                                      this.state.onfieldtruck == null
                                        ? []
                                        : this.state.onfieldtruck
                                    }
                                    pageSize={20}
                                    rowHeight={30}
                                    headerHeight={30}
                                    className="peertableOnfield"
                                    rowClassName="my-row-class"
                                    onRowDoubleClick={async (e) => {
                                      const Cust_site_longitude =
                                        e.row.Cust_site_longitude;
                                      const Cust_site_latitude =
                                        e.row.Cust_site_latitude;
                                      const Sup_site_longitude =
                                        e.row.Sup_site_longitude;
                                      const Sup_site_latitude =
                                        e.row.Sup_site_latitude;
                                      const CDocketNo = e.row.DocketNo;
                                      const Mstatus = e.row.Mstatus;
                                      const StatusDesc = e.row.StatusDesc;
                                      const Truckcode = e.row.TruckCode;
                                      const customer = e.row.CustomerCode;

                                      this.setState({
                                        DocketNo: e.row.DocketNo,
                                        StatusDesc: StatusDesc,
                                        Truckcode: Truckcode,
                                        customer: customer,
                                      });
                                      await this.TruckLastLocation(CDocketNo);
                                      //change this to "S"
                                      //I for testing
                                      let destination_longitude = "";
                                      let destination_latitude = "";
                                      let MarkerText = "";

                                      if (Mstatus == "S") {
                                        destination_longitude =
                                          Sup_site_longitude;
                                        destination_latitude =
                                          Sup_site_latitude;
                                        this.setState({
                                          destination_longitude:
                                            Sup_site_longitude,
                                          destination_latitude:
                                            Sup_site_latitude,
                                          MarkerText: "S",
                                        });
                                        //before T
                                      } else if (Mstatus == "I") {
                                        destination_longitude =
                                          Cust_site_longitude;
                                        destination_latitude =
                                          Cust_site_latitude;
                                        this.setState({
                                          destination_longitude:
                                            Cust_site_longitude,
                                          destination_latitude:
                                            Cust_site_latitude,
                                          MarkerText: "C",
                                        });
                                      } else {
                                        this.setState({
                                          destination_longitude: "",
                                          destination_latitude: "",
                                        });
                                      }

                                      this.setState(
                                        {
                                          latitudeA:
                                            this.state.TruckLastLatitude,
                                          longitudeA:
                                            this.state.TruckLastLongitude,
                                          latitudeB:
                                            this.state.destination_latitude,
                                          longitudeB:
                                            this.state.destination_longitude,
                                        },
                                        () => {
                                          this.getpolyline();
                                        }
                                      );

                                      await this.GetApproxDistTime(
                                        e.row.id,
                                        destination_longitude,
                                        destination_latitude
                                      );

                                      this.handleOpenmodal();
                                    }}
                                    columns={[
                                      {
                                        field: "TruckCode",
                                        headerName: "Truck Code",
                                        sortable: true,
                                        headerAlign: "center",
                                        width: 90,
                                        headerClassName:
                                          "super-app-theme--header",
                                        cellClassName: "peertableOnfield",
                                      },
                                      {
                                        field: "Status",
                                        headerName: "Status",
                                        width: 150,
                                        sortable: true,
                                        headerAlign: "center",
                                        dataTooltip: "double click to view Map",
                                        headerTooltip:
                                          "double click to view map",
                                        headerClassName:
                                          "super-app-theme--header",
                                        cellClassName: "peertableOnfield",
                                        valueGetter: (params) => {
                                          this.state.Status = params.row.Status;
                                          if (params.row.Status == "L") {
                                            return "LOADING";
                                          } else if (params.row.Status == "S") {
                                            return "DRIVER ACCEPTED";
                                          } else if (params.row.Status == "P") {
                                            return "ARRIVED AT QUARY";
                                          } else if (params.row.Status == "T") {
                                            return "TRAVELLING";
                                          } else if (params.row.Status == "A") {
                                            return "ARRIVED";
                                          } else if (params.row.Status == "N") {
                                            return "N";
                                          }
                                        },
                                        cellClassName: (params) => {
                                          if (params.value == "LOADING") {
                                            return "Loading";
                                          } else if (
                                            params.value == "DRIVER ACCEPTED"
                                          ) {
                                            return "Accepted";
                                          } else if (
                                            params.value == "ARRIVED AT QUARY"
                                          ) {
                                            return "Arrived_at_Quary";
                                          } else if (
                                            params.value == "TRAVELLING"
                                          ) {
                                            return "Travelling";
                                          } else if (
                                            params.value == "ARRIVED"
                                          ) {
                                            return "Arrived";
                                          }
                                        },
                                      },
                                      {
                                        field: "CustomerCode",
                                        headerName: "Customer",
                                        sortable: true,
                                        width: 80,
                                        headerAlign: "center",
                                        headerClassName:
                                          "super-app-theme--header",
                                        cellClassName:
                                          "trucksummary_cust peertableOnfield trucksummary_customer",
                                      },
                                      {
                                        field: "Region",
                                        headerName: "Region",
                                        sortable: true,
                                        width: 80,
                                        headerAlign: "center",
                                        headerClassName:
                                          "super-app-theme--header",
                                        cellClassName: "peertableOnfield",
                                      },
                                      {
                                        field: "CustomerSite",
                                        headerName: "Customer Site",
                                        sortable: true,
                                        width: 130,
                                        width: 230,
                                        headerAlign: "center",
                                        headerClassName:
                                          "super-app-theme--header",
                                        cellClassName: "peertableOnfield",
                                      },
                                      {
                                        field: "OrderNo",
                                        headerName: "Order No",
                                        sortable: true,
                                        width: 90,
                                        headerAlign: "center",
                                        headerClassName:
                                          "super-app-theme--header",
                                        cellClassName: "peertableOnfield",
                                      },
                                      {
                                        field: "Material",
                                        headerName: "Material",
                                        sortable: true,
                                        width: 80,
                                        headerAlign: "center",
                                        headerClassName:
                                          "super-app-theme--header",
                                        cellClassName: "peertableOnfield ",
                                        align: "right",
                                      },
                                      {
                                        field: "PickedQty",
                                        headerName: "Picked Qty",
                                        width: 90,
                                        sortable: true,
                                        headerAlign: "center",

                                        headerClassName:
                                          "super-app-theme--header",
                                        cellClassName: "peertableOnfield ",
                                        align: "right",
                                        valueGetter: (params) =>
                                          this.formatValueDecimal(
                                            `${params.row.PickedQty}`
                                          ),
                                      },
                                      {
                                        field: "AssignQty",
                                        headerName: "Assign Qty",
                                        sortable: true,
                                        width: 90,
                                        headerAlign: "center",
                                        headerClassName:
                                          "super-app-theme--header",
                                        cellClassName: "peertableOnfield ",
                                        valueGetter: (params) =>
                                          this.formatValueDecimal(
                                            `${params.row.AssignQty}`
                                          ),

                                        align: "right",
                                      },
                                      {
                                        field: "ArriveTime",
                                        headerName: "Arrive Time",
                                        sortable: true,
                                        width: 120,
                                        headerAlign: "center",
                                        headerClassName:
                                          "super-app-theme--header",
                                        cellClassName: "peertableOnfieldATime ",
                                        align: "right",
                                      },
                                      {
                                        field: "ApproxDist",
                                        headerName: "Approx Dist",
                                        sortable: true,
                                        width: 90,
                                        headerAlign: "center",
                                        headerClassName:
                                          "super-app-theme--header",
                                        cellClassName:
                                          "trucksummary_customer peertableOnfield",
                                      },
                                      {
                                        field: "ApproxTime",
                                        headerName: "Approx Time",
                                        width: 90,
                                        sortable: true,
                                        headerAlign: "center",
                                        headerClassName:
                                          "super-app-theme--header",
                                        cellClassName:
                                          "trucksummary_customer peertableOnfield",
                                      },
                                    ]}
                                  />{" "}
                                  ;
                                </div>
                              </div>
                              <br></br>
                            </CTabPane>
                            <CTabPane
                              className="slideInBottom"
                              data-tab="trucksummary"
                              visible={this.state.activeKey === 2}
                            >
                              <br></br>
                              <Trucksummary />{" "}
                            </CTabPane>
                            <CTabPane
                              className="slideInBottom"
                              data-tab="TruckList"
                              visible={this.state.activeKey === 2}
                            >
                              <br></br>
                              <TruckList />{" "}
                            </CTabPane>
                          </CTabContent>
                        </CTabs>
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CCol>
              </CRow>
            </div>
          </CCardBody>
        </CCard>
      </React.Fragment>
    );
  }
}
export default JobTruckEnq;
