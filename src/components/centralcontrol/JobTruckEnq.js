import React, { useState, useEffect } from "react";
import { apiGetCall } from "src/generics/APIFunctions";
import PeerTable2 from "src/generics/table/PeerTable2";
import TruckList from "./Tables_CC/TruckList";
import Trucksummary from "./Tables_CC/Trucksummary";
import { API_URL } from "../util/config";
import JobtruckEnquryMap from "../map/JobtruckEnquryMap";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { CCard,CButton, CCardBody, CCardHeader, CCardTitle, CCol, CNav, CNavItem, CNavLink, CRow, CTabContent, CTabPane, CTabs } from "@coreui/react";
import { Card } from "@material-ui/core";
import QueueIcon from '@mui/icons-material/Queue';
import WorkIcon from '@mui/icons-material/Work';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';


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

const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "eqtruckapp-b99f2.firebaseio.com",
  databaseURL: "https://eqtruckapp-b99f2-default-rtdb.firebaseio.com",
  projectId: "eqtruckapp-b99f2",
  storageBucket: "eqtruckapp-b99f2.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
  measurementId: "G-MEASUREMENT_ID",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const JobTruckEnq = () => {
  const [activeKey, setActiveKey] = useState(1);
  const [onfieldtruck, setOnfieldtruck] = useState([]);
  const [stats, setStats] = useState([]);
  const [Queued, setQueued] = useState(0);
  const [OnFeild, setOnFeild] = useState(0);
  const [Finished, setFinished] = useState(0);
  const [TotLoad, setTotLoad] = useState(0);
  const [docketNo, setDocketNo] = useState("");
  const [locations, setLocations] = useState([]);
  const [truckLastLatitude, setTruckLastLatitude] = useState("");
  const [truckLastLongitude, setTruckLastLongitude] = useState("");
  const [destinationLongitude, setDestinationLongitude] = useState("");
  const [destinationLatitude, setDestinationLatitude] = useState("");
  const [distTime, setDistTime] = useState([]);
  const [prevSumArriveStatus, setPrevSumArriveStatus] = useState([]);
  const [polylinePath, setPolylinePath] = useState("");
  const [openmodal, setOpenmodal] = useState(false);
  const [StatusDesc, setStatusDesc] = useState("");
  const [Truckcode, setTruckcode] = useState("");
  const [customer, setCustomer] = useState("");
  const [MarkerText, setMarkerText] = useState("");

  const [latitudeA, setLatitudeA] = useState(0); // Initialized to 0
  const [longitudeA, setLongitudeA] = useState(0); // Initialized to 0
  const [latitudeB, setLatitudeB] = useState(0); // Initialized to 0
  const [longitudeB, setLongitudeB] = useState(0);
  

  useEffect(() => {
    fetchTruckData();
    fecthDrivers();

    const dbRef = ref(database, "location/trucks");
    const firebaseListener = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      let sumArriveStatus = 0;

      for (let key in data) {
        const isComplete = data[key].iscomplete;
        if (isComplete === "no") {
          const arriveStatus = data[key].status;
          sumArriveStatus += arriveStatus;
        }
      }

      if (sumArriveStatus !== prevSumArriveStatus) {
        setPrevSumArriveStatus(sumArriveStatus);
        fetchTruckData();
      }
    });

    return () => {
      if (firebaseListener) firebaseListener(); // Detach Firebase listener
    };
  }, [prevSumArriveStatus]);

  const fecthDrivers = () => {
    const url = `${API_URL}centralcontol/truckTodayStat`;

    const callback = (data) => {
      setStats(data.ResultSet);
      setQueued(data.ResultSet[0].Queued);
      setOnFeild(data.ResultSet[0].OnFeild);
      setFinished(data.ResultSet[0].Finished);
      setTotLoad(data.ResultSet[0].TotLoad);
    };

    const error = (e) => console.error(e);

    apiGetCall(url, callback, error);
  };

  const fetchTruckData = () => {
    const url = `${API_URL}centralcontol/onfieldtruck`;

    const callback = (truck) => {
      setOnfieldtruck(truck.ResultSet);
    };

    const error = (e) => console.error(e);

    apiGetCall(url, callback, error);
  };

  const TruckLastLocation = async (CDocketNo) => {
    const url = `${API_URL}centralcontol/trucklastlocation?docketNo=${CDocketNo}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.ResultSet[0]) {
        const firstLocation = data.ResultSet[0];
        setLocations(data.ResultSet);
        setTruckLastLatitude(firstLocation.truckLastLatitude);
        setTruckLastLongitude(firstLocation.truckLastLongitude);
      } else {
        console.log("null array");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const GetApproxDistTime = async (
    id,
    destinationLongitude,
    destinationLatitude
  ) => {
    const url = `${API_URL}centralcontol/getAproxDistTime?orgin=${truckLastLatitude},${truckLastLongitude}&distination=${destinationLatitude},${destinationLongitude}`;

    const callback = (lc) => {
      setDistTime(lc.ResultSet);
      addApproxDist(id, lc.ResultSet);
    };

    const error = (e) => console.error(e);

    await apiGetCall(url, callback, error);
  };

  const addApproxDist = (id, data) => {
    const dataset = [...onfieldtruck];
    const dataString = data[0];
    const approxDist = dataString.split(",")[0];
    const approxTime = dataString.split(",")[1];

    dataset[id] = { ...dataset[id], ApproxDist: approxDist, ApproxTime: approxTime };
    setOnfieldtruck(dataset);
  };

  const getpolyline = () => {
    const url = `${API_URL}centralcontol/getplloyline?orgin=${truckLastLatitude},${truckLastLongitude}&distination=${destinationLatitude},${destinationLongitude}`;

    const callback = (data) => {
      setPolylinePath(data.ResultSet[0]);
    };

    const error = (e) => console.error(e);

    apiGetCall(url, callback, error);
  };

  const handleOpenmodal = () => setOpenmodal(true);
  const handleClosemodal = () => {
    setOpenmodal(false);
    setDocketNo("");
    setTruckLastLatitude("");
    setTruckLastLongitude("");
    setDestinationLongitude("");
  };
 
  const formatValueDecimal = (e) => {
    let value = Number(e);
    return value.toFixed(2);
  };
   

//  const  getpolyline = () => {
//     const url = `${API_URL}centralcontol/getplloyline?orgin=${latitudeA},${longitudeA}&distination=${latitudeB},${longitudeB}`;
//     const callback = (data) => {
//       this.setState({
//         polylinePath: data.ResultSet[0],
//       });
//     };
//     const error = (e) => {
//       console.error(e);
//     };
//     apiGetCall(url, callback, error);
//   };

const states = [
  { color: "danger", label: "Queued", value: Queued, icon: <QueueIcon  fontSize="large" /> },  // Replace cilHome with Material UI icon
  { color: "warning", label: "OnField", value: OnFeild, icon: <WorkIcon  fontSize="large" /> },  // Replace cilTruck
  { color: "success", label: "Finished", value: Finished, icon: <CheckCircleIcon  fontSize="large" /> },  // Replace cilCheckCircle
  { color: "info", label: "T Load", value: TotLoad, icon: <LocalShippingIcon  fontSize="large" /> }  // Replace cilList
];

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
                     {/* <CRow>
  <CCol sm="12" className="slideInLeft">
    <CCardTitle style={{ marginTop: "10px", fontWeight: "700" }}>
      TODAY&apos;S STATS
    </CCardTitle>
  </CCol>
</CRow>

<CRow>
  {states.map((stat, index) => (
    <CCol sm="6" lg="3" className="slideIn" key={index}>
      <Card
       // className="todaystatcards"
      // className="border border-blue-gray-100 shadow-sm animate-slideInLeft"
        style={{
          backgroundColor: `var(--${stat.color})`,
          padding: '20px',
          height: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <CCardBody
  className="p-4 text-right"
  style={{
    display: 'flex',            // Set the layout to flex
    justifyContent: 'space-between',  // Align items horizontally (left for icon, right for label/value)
    alignItems: 'center',       // Align items vertically (center them in the middle)
  }}
>
  <Box
  sx={{
   // backgroundColor: "lightblue", // Icon background color
    borderRadius: "50%", // Circle shape
    display: "flex", // Use flexbox to center content
    alignItems: "center", // Vertically center the icon
    justifyContent: "center", // Horizontally center the icon
    width: "50px", // Circle container width
    height: "50px", // Circle container height
    marginRight: "60px", // Spacing between icon and text
  }}
  >
  
  <div style={{ fontSize: '500px', color: 'white', display: "flex"   }}>
    
    {stat.icon}  
  </div>
  </Box>
  
  <div style={{ textAlign: 'right' }}>
    <h5 style={{ color: '#fff', fontWeight: 'bold' }}>
      {stat.label} <span>{stat.value}</span>
    </h5>
  </div>
</CCardBody>
      </Card>
    </CCol>
  ))}
</CRow> */}

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
                            Queued {Queued}
                          </CButton>
                        </CCol>
                        <CCol sm="6" lg="2" className="slideIn">
                          <CButton color="warning" className="todaystatcards">
                            OnField {OnFeild}
                          </CButton>
                        </CCol>
                        <CCol sm="6" lg="2" className="slideIn">
                          <CButton color="success" className="todaystatcards">
                            Finished {Finished}
                          </CButton>
                        </CCol>
                        <CCol sm="6" lg="2" className="slideIn">
                          <CButton color="info" className="todaystatcards">
                            T Load {TotLoad}
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
                     open={openmodal}
                     onClose={handleClosemodal}
                     aria-labelledby="modal-modal-title"
                     aria-describedby="modal-modal-description"
                   >
                     <Box sx={styleBreakHistory}>
                       <JobtruckEnquryMap
                         destinationLongitude={destinationLongitude}
                         destinationLatitude={destinationLatitude}
                         truckLastLatitude={truckLastLatitude}
                         truckLastLongitude={truckLastLongitude}
                         StatusDesc={StatusDesc}
                         Truckcode={Truckcode}
                         customer={customer}
                         MarkerText={MarkerText}
                         polylinePath={polylinePath}
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
                                 active={activeKey === 1}
                                 onClick={() => setActiveKey(1)}
                               >
                                 On Field Truck
                               </CNavLink>
                             </CNavItem>
                             <CNavItem>
                               <CNavLink
                                 data-tab="trucksummary"
                                 active={activeKey === 2}
                                 onClick={() => setActiveKey(2)}
                               >
                                 Truck Summary
                               </CNavLink>
                             </CNavItem>
                             <CNavItem>
                               <CNavLink
                                 data-tab="TruckList"
                                 active={activeKey === 3}
                                 onClick={() => setActiveKey(3)}
                               >
                                 Truck List
                               </CNavLink>
                             </CNavItem>
                           </CNav>
                           <CTabContent>
                             <CTabPane
                             className="slideInBottom"
                               data-tab="onfieldtruck"
                               visible={activeKey === 3}
                             >
                               <br></br>
                               <div>
                                 <br></br>
                                 <div style={{ flexGrow: 1, width: "100%", overflowX: "auto"}}>
                                   <PeerTable2
                                     name="On field Truck"
                                     style={{
                                       fontSize: "12px",
                                       width: "100%",
                                       
                                     }}
                                     data={
                                       onfieldtruck == null
                                         ? []
                                         : onfieldtruck
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
 
                                       setDocketNo(e.row.DocketNo);
                                       setStatusDesc(StatusDesc);
                                       setTruckcode(Truckcode);
                                       setCustomer(customer);
                                       await TruckLastLocation(CDocketNo);
                                       //change this to "S"
                                       //I for testing
                                       let destinationLongitude = "";
                                       let destinationLatitude = "";
                                      // let MarkerText = "";
 
                                       if (Mstatus === "S") {
                                         destinationLongitude =  Sup_site_longitude;
                                         destinationLatitude =Sup_site_latitude;
                                         setDestinationLongitude(Sup_site_longitude);
                                         setDestinationLatitude(Sup_site_latitude);
                                         //before T
                                       } else if (Mstatus === "I") {
                                         destinationLongitude =
                                           Cust_site_longitude;
                                         destinationLatitude =
                                           Cust_site_latitude;
                                           setDestinationLongitude(Cust_site_longitude);
                                           setDestinationLatitude(Cust_site_latitude);
                                       } else {
                                        setDestinationLongitude("");
                                        setDestinationLatitude("");
                                       }
 
                                       setLatitudeA(truckLastLatitude);
                                       setLongitudeA(truckLastLongitude);
                                       setLatitudeB(destinationLatitude);
                                       setLongitudeB(destinationLongitude);
                                       
                                       // Call getpolyline directly after updating the state.
                                       getpolyline();
 
                                       await GetApproxDistTime(
                                         e.row.id,
                                         destinationLongitude,
                                         destinationLatitude
                                       );
 
                                       handleOpenmodal();
                                     }}
                                     columns={[
                                      {
                                        field: "TruckCode",
                                        headerName: "Truck Code",
                                        sortable: true,
                                        headerAlign: "center",
                                        headerClassName: "super-app-theme--header",
                                        cellClassName: "peertableOnfield",
                                        flex: 1, // Dynamically allocate width
                                      },
                                      {
                                        field: "Status",
                                        headerName: "Status",
                                        sortable: true,
                                        headerAlign: "center",
                                        headerTooltip: "double click to view map",
                                        headerClassName: "super-app-theme--header",
                                        cellClassName: "peertableOnfield",
                                        flex: 1.5, // Wider column compared to Truck Code
                                        valueGetter: (params) => {
                                          switch (params.row.Status) {
                                            case "L":
                                              return "LOADING";
                                            case "S":
                                              return "DRIVER ACCEPTED";
                                            case "P":
                                              return "ARRIVED AT QUARY";
                                            case "T":
                                              return "TRAVELLING";
                                            case "A":
                                              return "ARRIVED";
                                            default:
                                              return params.row.Status;
                                          }
                                        },
                                        cellClassName: (params) => {
                                          switch (params.value) {
                                            case "LOADING":
                                              return "Loading";
                                            case "DRIVER ACCEPTED":
                                              return "Accepted";
                                            case "ARRIVED AT QUARY":
                                              return "Arrived_at_Quary";
                                            case "TRAVELLING":
                                              return "Travelling";
                                            case "ARRIVED":
                                              return "Arrived";
                                            default:
                                              return "";
                                          }
                                        },
                                      },
                                      {
                                        field: "CustomerCode",
                                        headerName: "Customer",
                                        sortable: true,
                                        headerAlign: "center",
                                        headerClassName: "super-app-theme--header",
                                        cellClassName: "trucksummary_cust peertableOnfield trucksummary_customer",
                                        flex: 1,
                                      },
                                      {
                                        field: "Region",
                                        headerName: "Region",
                                        sortable: true,
                                        headerAlign: "center",
                                        headerClassName: "super-app-theme--header",
                                        cellClassName: "peertableOnfield",
                                        flex: 1,
                                      },
                                      {
                                        field: "CustomerSite",
                                        headerName: "Customer Site",
                                        sortable: true,
                                        headerAlign: "center",
                                        headerClassName: "super-app-theme--header",
                                        cellClassName: "peertableOnfield",
                                        flex: 2, // This column will take up more space
                                      },
                                      {
                                        field: "OrderNo",
                                        headerName: "Order No",
                                        sortable: true,
                                        headerAlign: "center",
                                        headerClassName: "super-app-theme--header",
                                        cellClassName: "peertableOnfield",
                                        flex: 1,
                                      },
                                      {
                                        field: "Material",
                                        headerName: "Material",
                                        sortable: true,
                                        headerAlign: "center",
                                        headerClassName: "super-app-theme--header",
                                        cellClassName: "peertableOnfield",
                                        flex: 1,
                                        align: "right",
                                      },
                                      {
                                        field: "PickedQty",
                                        headerName: "Picked Qty",
                                        sortable: true,
                                        headerAlign: "center",
                                        headerClassName: "super-app-theme--header",
                                        cellClassName: "peertableOnfield",
                                        flex: 1,
                                        align: "right",
                                        valueGetter: (params) => formatValueDecimal(`${params.row.PickedQty}`),
                                      },
                                      {
                                        field: "AssignQty",
                                        headerName: "Assign Qty",
                                        sortable: true,
                                        headerAlign: "center",
                                        headerClassName: "super-app-theme--header",
                                        cellClassName: "peertableOnfield",
                                        flex: 1,
                                        valueGetter: (params) => formatValueDecimal(`${params.row.AssignQty}`),
                                        align: "right",
                                      },
                                      {
                                        field: "ArriveTime",
                                        headerName: "Arrive Time",
                                        sortable: true,
                                        headerAlign: "center",
                                        headerClassName: "super-app-theme--header",
                                        cellClassName: "peertableOnfieldATime",
                                        flex: 1,
                                        align: "right",
                                      },
                                      {
                                        field: "ApproxDist",
                                        headerName: "Approx Dist",
                                        sortable: true,
                                        headerAlign: "center",
                                        headerClassName: "super-app-theme--header",
                                        cellClassName: "trucksummary_customer peertableOnfield",
                                        flex: 1,
                                      },
                                      {
                                        field: "ApproxTime",
                                        headerName: "Approx Time",
                                        sortable: true,
                                        headerAlign: "center",
                                        headerClassName: "super-app-theme--header",
                                        cellClassName: "trucksummary_customer peertableOnfield",
                                        flex: 1,
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
                               visible={activeKey === 2}
                             >
                               <br></br>
                               <Trucksummary />{" "}
                             </CTabPane>
                             <CTabPane
                               className="slideInBottom"
                               data-tab="TruckList"
                               visible={activeKey === 2}
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
 export default JobTruckEnq;
 