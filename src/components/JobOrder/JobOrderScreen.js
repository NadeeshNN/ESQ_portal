// import React from "react";

// export default function jobOrderScreen() {
//   return <div>jobOrderScreen</div>;
// }
// new view redesign - 2023 oct 11

/**
 * Created By Nadeesh Perera | 28th - June - 2023
 * Discription : This component  is a Main component in Quotation screen.
 * Style css - _custom.scss search by comment {quotation screen scss-- Nadeesh Perera 28th June 2023}
 */
import React, { useEffect, useState } from "react";
import {
  CCol,
  CRow,
  CTabs,
  CTabPane,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CInput,
  CSelect,
  CInputGroup,
  CInputGroupText,
} from "@coreui/react";

import plusIcon from "./../../assets/icons/quotaionbtns/plusIcon.png";
import copyIcon from "./../../assets/icons/quotaionbtns/copyIcon.png";
import printIcon from "./../../assets/icons/quotaionbtns/print.png";
import saveIcon from "./../../assets/icons/quotaionbtns/save.png";
import newDocIcon from "./../../assets/icons/quotaionbtns/new.png";
import googlemapIcon from "./../../assets/icons/quotaionbtns/googlemap.png";
import maprefIcon from "./../../assets/icons/quotaionbtns/mapref.png";
import distanceMasterIcon from "./../../assets/icons/quotaionbtns/distanceMaster.png";
import supplierIcon from "./../../assets/icons/quotaionbtns/supplier.png";
import auditlogIcon from "./../../assets/icons/quotaionbtns/audit.png";
import altsummaryIcon from "./../../assets/icons/quotaionbtns/summary.png";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import {
  Tooltip,
} from "@material-ui/core";
import QuotationPrint from "../Quotation/QuotationPopups/QuotationPrint";
import QuotationCust from "../Master/QuotationCust";
import QuotationNo from "../Quotation/QuotationPopups/QuotationNo";
import QuotationCustCode from "../Quotation/QuotationPopups/Qt_CustCode";
import QuotationSuplier from "../Master/QuotationSuplier";
import QuotationDistanceMaster from "../Quotation/QuotationPopups/QuotationDistanceMaster";
import QuotationMapRef from "../Quotation/QuotationPopups/QuotationMapRef";

import Qt_sites from "../Quotation/QuotationPopups/Qt_sites";
import Qt_contacts from "../Quotation/QuotationPopups/Qt_contacts";
import Qt_Mapref from "../Quotation/QuotationPopups/Qt_Mapref";
import Qt_CustCode from "../Quotation/QuotationPopups/Qt_CustCode";
import { API_URL } from "src/components/util/config";
import LinearProgress from "@material-ui/core/LinearProgress";
import Job_ProductTable from "./MainPage/Job_ProductTable";
import Job_meterialDetails from "./MainPage/Job_meterialDetails";
import JobOrderBrowse from "./JobOderpopups/JobOrderBrowse";
import { NavLink } from "react-router-dom";
import Job_payment from "./MainPage/Job_payment";
import SalesPerson from "./JobOderpopups/SalesPerson";
import ALT_Summary from "../Quotation/QuotationPopups/ALT_Summary";
import Nexgen_Alert from "../ReusableComponents_ESQ/Nexgen_Alert";
import Draggable from 'react-draggable';
const moment = require("moment");

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0, 0, 0, 0.7)",
  //backdropFilter: "blur(5px)", // Adjust the blur radius as needed
  WebkitBackdropFilter: "blur(5px)", // For Safari
  zIndex: 9999999,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius:"8px"
};

export default function JobOrderScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedOption, setSelectedOption] = useState("Q");
  const [selectedPltValue, setSelectedPltValue] = useState("");
  const [selectedReadyFromTime, setSelectedReadyFromTime] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [deleted, setDeleted] = useState("");
  const [cleared, setcleared] = useState(false);
  const [twinsteerNote, setTwinsteerNote] = useState("");
  const [readyFromNote, setReadyFromNote] = useState("");
  const [selectedComponent, setSelectedComponent] = useState(null); // Store selected component
  const [rowVisibility, setRowVisibility] = useState([true]);
  // const rowVisibility = true;
  const [productTabledata, setProductTabledata] = useState([]);
  const [supplierData, setSupplierData] = useState([]);
  const [supplierList, setSupplierList] = useState([]);
  const [twinsteerOK, setTwinsteerOK] = useState(false);
  const [ReadyFromOK, setReadyFrom] = useState(false);
  const [contactList, setContactList] = useState([]);
  const [CostomerFieldData, setCostomerFieldData] = useState([]);
  const [quoteDate, setQuoteDate] = useState("");
  const [expDate, setExpDate] = useState("");
  const [soderNo, setSorderNo] = useState(0);
  const [jobOrderDate, setJobOrderDate] = useState("");
  const [jobOrderTime, setJobOrderTime] = useState("");
  const [jobStartDate, setJobStartDate] = useState("");
  const [jobCustcode, setJobcustcode] = useState("");
  const [jobEndDate, setJobEndDate] = useState("");

  const [LoadingTimeStart, setLoadingStart] = useState("");
  const [LoadingTimeEnd, setLoadingTimeEnd] = useState("");
  const [TimeRequired, setTimeRequired] = useState("");
  const [loading, setLoading] = useState(false);
  const [isQouteclicked, setisQouteclicked] = useState(false);
  const [isNewJob, setisNewJob] = useState(false);
  const [CostomerlookUpData, setCustomerData] = useState([]);
  const [isRefreshed, setrefresh] = useState(false);

  // defined arrays to populate data from QoutationNo lookup
  const [MaterialListQTNo, setMaterialListQTNo] = useState([]);
  const [paymentDetailsQTNo, setPaymentDetailsQTNo] = useState([]);

  // // defined arrays to populate data from QoutationNo lookup
  const [MaterialListJobOrderLink, setMaterialListJobOrderLink] = useState([]);
  const [paymentDetailsJobOrderLink, setPaymentDetailsJobOrderLink] = useState(
    []
  );
  const [copyClicked, setCopyClicked] = useState(false);
  const [QuoteNo, setQuoteNo] = useState("");
  const [joborderfetch, setjoborderfetchHandle] = useState(
    localStorage.getItem("createjobclicked")
  );
  // value={
  //   productTabledata.Quote_date
  //     ? new Date(productTabledata.Quote_date)
  //         .addDays(productTabledata.Quote_validity) // Assuming you have a function to add days
  //         .toISOString()
  //         .split("T")[0]
  //     : ""
  // }

  const [quoteValidity, setQuoteValidity] = useState("");

  // const selectedSupProductDetails = sessionStorage.getItem(
  //   "selectedSupplierProduct"
  // );
  const [selectedSupProductDetailsArry, setSelectedSupProductDetailsArry] =
    useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [MaterialListfromSorderNO, setMaterialListfromSorderNO] = useState([]);
  const toggleTab = (index) => {
    if (activeTab !== index) {
      setActiveTab(index);
    }
  };

  //if user clicked Createjob button from the qoutation screen , then it will open job order and fetch data
  useEffect(() => {
    const Qouteno = localStorage.getItem("joborderFromQt_No");
    const isclickedJob = localStorage.getItem("createjobclicked");
    if (isclickedJob === "true") {
      console.log("isclickedJob", isclickedJob, Qouteno);
      setProductTabledata("");
      GetJobOrderFromQouteData(Qouteno); //get JOB ORDER FROM Qouatation BTTON CLICK
    }
  }, [joborderfetch]);

  useEffect(() => {
    const Order_date = moment().format("YYYY-MM-DD");
    setJobOrderDate(Order_date);
    const Order_time = moment().format("HH:mm").toString();

    setJobOrderTime(Order_time);
    handleNewQuotation();
    fetch(
      `${API_URL}customer/customerlookup/?company=ESQ&custcode=&name=&available=true`
    )
      .then((response) => response.json())
      .then((data) => {
        //const data = data.ResultSet[0];
        console.log("customerData", data);
        setCustomerData(data.ResultSet);
      })
      .catch((error) => {
        console.error("Error fetching data from the API:", error);
      });
  }, []);

  const handleButtonClick = (component) => {
    setSelectedComponent(() => component);
    setPopupVisible(true);
  };
  const handleButtonClickCustCode = (component) => {
    if (Array.isArray(CostomerlookUpData)) {
      const custCode = productTabledata.SorderHead?.Cust_code || ""; // Use optional chaining and set to empty string if undefined or null
      const isCustCodeIncluded = CostomerlookUpData.some(
        (item) => item.Code === custCode
      );

      console.log("isCustCodeIncluded", isCustCodeIncluded, custCode);

      if (isCustCodeIncluded) {
        setSelectedComponent(() => Qt_sites);
        setPopupVisible(true);
      } else {
        setSelectedComponent(() => component);
        setPopupVisible(true);
      }
    } else {
      console.error("CostomerFieldData is not an array");
      setSelectedComponent(() => component);
      setPopupVisible(true);
    }
  };

  // const handleButtonClickCustCode = (component) => {
  //   if (Array.isArray(CostomerlookUpData)) {
  //     const isCustCodeIncluded = CostomerlookUpData.some(
  //       (item) => item.Code === productTabledata.SorderHead.Cust_code
  //     );
  //     // setIsCustcodeIncluded(isCustCodeIncluded);
  //     console.log(
  //       "isCustCodeIncluded",
  //       isCustCodeIncluded,
  //       productTabledata.SorderHead.Cust_code
  //     );
  //     if (isCustCodeIncluded) {
  //       setSelectedComponent(() => Qt_sites);
  //       setPopupVisible(true);
  //     } else {
  //       setSelectedComponent(() => component);
  //       setPopupVisible(true);
  //     }
  //   } else {
  //     console.error("CostomerFieldData is not an array");
  //     setSelectedComponent(() => component);
  //     setPopupVisible(true);
  //   }

  //   // Show the popup
  // };

  const closePopupSalesPerson = () => {
    const salesPerson = sessionStorage.getItem("salesPerson");
    setProductTabledata((prevProductTabledata) => ({
      ...prevProductTabledata,
      SorderHead: {
        ...prevProductTabledata.SorderHead,
        Salesperson: salesPerson,
      },
    }));
    setSelectedComponent("");
    setPopupVisible(false);
  };

  const closePopupJobOrderBrowse = () => {
    const sorderno = JSON.parse(sessionStorage.getItem("selectedSorderNo"));
    setSorderNo(sorderno);
    setSelectedComponent("");
    setPopupVisible(false);
    setProductTabledata(""); //newly added
    GetproductTableData(sorderno);
  };
  const closePopup = () => {
    setSelectedComponent("");
    setPopupVisible(false);
  };
  const closeCustSitePopup = () => {
    const custSiteData = JSON.parse(
      sessionStorage.getItem("selectedCutSiteDetails")
    );
    const custCode = custSiteData.Parent_code;
    //const refid = sessionStorage.getItem("Job_refid");
    console.log("custSiteData", custSiteData);
    setSelectedComponent("");
    setPopupVisible(false);
    if (custCode) {
      GetDatafromCustomerCode(custCode, custSiteData);
    }

    // setProductTabledata((prevProductTabledata) => ({
    //   ...prevProductTabledata,
    //   SiteDetail: {
    //     ...prevProductTabledata.SiteDetail,
    //     City: custSiteData.City,
    //     Postcode: custSiteData.Postcode,
    //     State: custSiteData.State,
    //     Map_ref: custSiteData.Area_code,
    //     Cust_site_radius: custSiteData.Cust_site_radius,
    //     Latitude: custSiteData.Latitude,
    //     Longitude: custSiteData.Longitude,
    //     Ref_id: custSiteData.Ref_id,
    //   },
    //   SorderHead: {
    //     ...prevProductTabledata.SorderHead,
    //     Cust_code: custSiteData.Parent_code,
    //     Assignee_no: custSiteData.Assignee_no,
    //   },
    //   Otstk: {
    //     ...prevProductTabledata.Otstk,
    //     Name: custSiteData.Name,
    //     SiteAddress1: custSiteData.Site_address1,
    //     SiteAddress2: custSiteData.Address2,
    //     Contact: custSiteData.Contact,
    //     Telephone: custSiteData.Telephone,
    //     AssigneeNo: custSiteData.Assignee_no,
    //     JobName: "",
    //     JobDescription: "",
    //     OrderedWith: "",
    //     TimeOrdered: "",
    //     Delivery_time: "",
    //     CustOrderedBy: "",
    //     DeliveryTimeFrom: "",
    //     DeliveryTimeTo: "",
    //     City: custSiteData.City, //productTabledata.Otstk?.Contact ?? "",
    //     State: custSiteData.State,
    //     Postcode: custSiteData.Postcode,
    //     MapRef: custSiteData.Area_code,
    //     RefId: custSiteData.Ref_id,
    //     Latitude: custSiteData.Latitude,
    //     Longitude: custSiteData.Longitude,
    //     CustSiteRadius: custSiteData.Cust_site_radius,
    //   },
    //   DetailTpg: {
    //     ...prevProductTabledata.DetailTpg,
    //     Name: custSiteData.Parent_customer,
    //   },
    // }));
  };
  const closePopupContact = () => {
    const contact = sessionStorage.getItem("selectedContact");
    const telephone = sessionStorage.getItem("selectedTelephone");

    setProductTabledata((prevProductTabledata) => ({
      ...prevProductTabledata,
      SiteDetail: {
        ...prevProductTabledata.SiteDetail,
        Contact: contact,
        Telephone: telephone,
      },
    }));
    setProductTabledata((prevProductTabledata) => ({
      ...prevProductTabledata,
      Otstk: {
        ...prevProductTabledata.Otstk,
        Contact: contact,
        Telephone: telephone,
      },
    }));
    setSelectedComponent(""); // Clear the selected component
    setPopupVisible(false); // Close the popup
  };
  const closePopupQuoteNo = () => {
    setisQouteclicked(true);
    const Qouteno = sessionStorage.getItem("selectedQuoteNo");

    setSelectedComponent("");
    setPopupVisible(false);
    //GetproductTableData();
    GetJobOrderFromJobOrder(Qouteno);
    setQuoteDate(productTabledata.Quote_date);
    setExpDate(productTabledata.Follup_date);
  };
  const closePopupCustNo = () => {
    const custCode = sessionStorage.getItem("selectedCustCode");
    setProductTabledata((prevProductTabledata) => ({
      ...prevProductTabledata,
      SorderHead: {
        ...prevProductTabledata.SorderHead,
        Cust_code: custCode,
      },
    }));
    setSelectedComponent(""); // Clear the selected
    setPopupVisible(false);
    setTimeout(() => {
      setSelectedComponent(() => Qt_sites);
      setPopupVisible(true);
    }, 1000);
    // Close the popup
    //GetCustomerCodeData(); // Close the popup
  };
  const closePopupMapRef = () => {
    setSelectedComponent("");
    setPopupVisible(false);
    GetMapRefId();
  };
  const closeProductTableFunctions = () => {
    const selectedSupProductDetails = sessionStorage.getItem(
      "selectedSupplierProduct"
    );
    if (selectedSupProductDetails) {
      const rowDetails = JSON.parse(selectedSupProductDetails);
      setSelectedSupProductDetailsArry(rowDetails);
    }
  };
  const GetDatafromCustomerCode = (custCode, Body) => {
    // if (!Body) {
    //   window.alert("Please Enter a orderNo!! ");
    //   return;
    // }
    setLoading(true);

    fetch(
      `${API_URL}joborder/newjoborder?custcode=${custCode}&originator=peercore&company=ESQ`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Body),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const productTableData = data.ResultSet[0];
        setProductTabledata(productTableData);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  };
  const GetproductTableData = (sorderno) => {
    // if (!soderNo) {
    // const sorderno = JSON.parse(sessionStorage.getItem("selectedSorderNo"));

    //}

    //joborder browse api
    fetch(
      `${API_URL}joborder/getjoborder?sorderno=${sorderno}&invoiceflg=false`
    )
      .then((response) => response.json())
      .then((data) => {
        if (!data.ResultSet[0]) {
          handleButtonClick(JobOrderBrowse);
          handleNewQuotation();
          return;
        }
        const productTableData = data.ResultSet[0];
        const supplierData = productTableData.Supplier_list;
        const twinsteerchecked = productTableData.Twsok_toggle;
        const ReadyFromchecked = productTableData.ReadyFrom_toggle;
        const ContactList = productTableData.SecondContactlist;
        const quoteNo = data.ResultSet[0].Quote_stk_quote_no;
        const status1 = data.ResultSet[0].Job_order_ptype;
        const materialListTable = productTableData.MaterialList;
        setMaterialListfromSorderNO(materialListTable)
        setisNewJob(false);
        setSupplierList(supplierData);
        setTwinsteerOK(twinsteerchecked);
        setReadyFrom(ReadyFromchecked);
        setContactList(ContactList);
        setProductTabledata(productTableData);
        setQuoteNo(quoteNo);
        setSelectedOption(status1);
        setSelectedReadyFromTime(data.ResultSet[0].ReadyFrom);
        const orderDate = moment(productTableData.SorderHead.Order_date).format(
          "YYYY-MM-DD"
        );

        const jobstartDate = moment(productTableData.Jobstart_ent).format(
          "YYYY-MM-DD"
        );
        const jobendDate = moment(productTableData.Jobend_ent).format(
          "YYYY-MM-DD"
        );
        const Order_time = data.ResultSet[0].SorderHead.Order_time;
        const loadingStart = data.ResultSet[0].Jobend_time_ent;
        const loadingEnd = data.ResultSet[0].End_loading_time_ent;
        setJobOrderDate(orderDate);
        setJobEndDate(jobendDate);
        setLoadingStart(loadingStart);
        setLoadingTimeEnd(loadingEnd);
        setTimeRequired();
        setJobOrderTime(Order_time);
        setJobStartDate(jobstartDate);

        if (twinsteerchecked) {
          setTwinsteerNote("TWS OK");
        }
        if (!twinsteerchecked) {
          setTwinsteerNote("");
        }

        if (ReadyFromchecked) {
          setReadyFromNote(
            data.ResultSet[0].SorderHead.Internal_inst.split("K")[1]
          );
        }
        if (!ReadyFromchecked) {
          setReadyFromNote("");
        }

        setQuoteDate(productTableData.Quote_date);
      })
      .catch((error) => {
        console.error("Error fetching data from the API:", error);
      });
  };
  const GetJobOrderFromQouteData = (Qouteno) => {
   
    //http://localhost:8322/api/joborder/getjoborderfromquote?quoteno=71112&fromquote=false&originator=peercore
    // setCustCode(custCode);
    //job order loading from Qoutation
    fetch(
      `${API_URL}joborder/getjoborderfromquote?quoteno=${Qouteno}&fromquote=true&originator=peercore`
    )
      .then((response) => response.json())
      .then((data) => {
        const Order_date = moment().format("YYYY-MM-DD");
        setJobOrderDate(Order_date);
        setisNewJob(true);
        localStorage.setItem("createjobclicked", false);
        //const Order_time = moment().format("HH:mm");
        const productTableData = data.ResultSet[0];
        const MaterialList = data.ResultSet[0].MaterialList;
        const JobCostDetail = data.ResultSet[0].JobCostDetail;
        const supplierData = productTableData.Supplier_list;
        const twinsteerchecked = productTableData.Twsok_toggle;
        const ReadyFromchecked = productTableData.ReadyFrom_toggle;
        const ContactList = productTableData.SecondContactlist;     
        const quoteNo = data.ResultSet[0].Quote_stk_quote_no;
        const status1 = data.ResultSet[0].Job_order_ptype;    
        setSelectedOption(status1);
        // setSorderNo(0);
        setSupplierList(supplierData);
        setTwinsteerOK(twinsteerchecked);
        setReadyFrom(ReadyFromchecked);
        setContactList(ContactList);
        setProductTabledata(productTableData);
        sessionStorage.setItem(
          "savemodelMaterialList_JobOrder",
          JSON.stringify(MaterialList)
        );
        //nadeesh 2024/04/03
        const selectedData = localStorage.getItem(
          "savemodelSelectedProducts_N"
        );
        if (selectedData) {
          // Parse the selectedData string into an array of objects
          const selectedRows = JSON.parse(selectedData);
          console.log("selectedRows", selectedRows);
          // Filter selectedRows to include only rows where RecSelected is true
          const filteredObject2 = selectedRows.filter((row) => row.RecSelected);
          filteredObject2.forEach((row) => {
            if (row.Is_available) {
              row.Order_qty = 1;
            }
          });
          const newMaterialList = MaterialList.filter((row) =>
            filteredObject2.some(
              (filteredRow) =>
                filteredRow.Catlog_code === row.Catalog_code &&
                filteredRow.Truck_type === row.Truck_type
            )
          );
          console.log("filteredObject2", filteredObject2);
          console.log("filteredObject2", newMaterialList);
          setMaterialListJobOrderLink(newMaterialList);
        }
        // setMaterialListJobOrderLink(MaterialList);
        setPaymentDetailsJobOrderLink(JobCostDetail);
        setQuoteNo(quoteNo);
        const Order_time = data.ResultSet[0].SorderHead.Order_time;

        setJobOrderTime(Order_time);
        const custcode = productTabledata.SorderHead.Cust_code;
        setJobcustcode(custcode);
        setProductTabledata((prevProductTabledata) => ({
          ...prevProductTabledata,
          SorderHead: {
            ...prevProductTabledata.SorderHead,
            Order_time: Order_time,
            Cust_code: custcode,
          },
        }));
        console.log("JobCostDetail", JobCostDetail);

        setSelectedReadyFromTime(data.ResultSet[0].ReadyFrom);

        if (twinsteerchecked) {
          setTwinsteerNote("TWS OK");
        }
        if (!twinsteerchecked) {
          setTwinsteerNote("");
        }
        if (ReadyFromchecked) {
          setReadyFromNote(
            data.ResultSet[0].SorderHead.Internal_inst.split("K")[1]
          );
        }
        if (!ReadyFromchecked) {
          setReadyFromNote("");
        }
        setQuoteDate(productTableData.Quote_date);
        setQuoteValidity(data.ResultSet[0].Quote_validity);
      })
      .catch((error) => {
        console.error("Error fetching data from the API:", error);
      });
  };
  const GetJobOrderFromJobOrder = (Qouteno) => {
    const custCode = sessionStorage.getItem("selectedCustCode");
    // setCustCode(custCode);
    fetch(
      `${API_URL}joborder/getjoborderfromquote?quoteno=${Qouteno}&fromquote=false&originator=peercore`
    )
      .then((response) => response.json())
      .then((data) => {
        if (!data.ResultSet[0]) {
          handleButtonClick(QuotationNo);
          return;
        }
        const Order_date = moment().format("YYYY-MM-DD");
        setJobOrderDate(Order_date);
        setisNewJob(true);
        //const Order_time = moment().format("HH:mm");
        const productTableData = data.ResultSet[0];
        const MaterialList = data.ResultSet[0].MaterialList;
        const JobCostDetail = data.ResultSet[0].JobCostDetail;
        const supplierData = productTableData.Supplier_list;
        const twinsteerchecked = productTableData.Twsok_toggle;
        const ReadyFromchecked = productTableData.ReadyFrom_toggle;
        const ContactList = productTableData.SecondContactlist;
        const SorderHead = productTabledata.SorderHead;
        const quoteNo = data.ResultSet[0].Quote_stk_quote_no;
        const status1 = data.ResultSet[0].Job_order_ptype;
        const status2 = data.ResultSet[0].SorderHead.Order_type;
        sessionStorage.setItem(
          "savemodelMaterialList_JobOrder",
          JSON.stringify(MaterialList)
        );
        setSorderNo(0);
        setSupplierList(supplierData);
        setTwinsteerOK(twinsteerchecked);
        setReadyFrom(ReadyFromchecked);
        setContactList(ContactList);
        setProductTabledata(productTableData);
        setQuoteNo(quoteNo);
        setMaterialListQTNo(MaterialList); //newly added
        setPaymentDetailsQTNo(JobCostDetail); //newly added
        const custcode = productTabledata.SorderHead.Cust_code;
        setSelectedOption(status1);
        setJobcustcode(custcode);
        const Order_time = data.ResultSet[0].SorderHead.Order_time;

        setJobOrderTime(Order_time);
        setProductTabledata((prevProductTabledata) => ({
          ...prevProductTabledata,
          SorderHead: {
            ...prevProductTabledata.SorderHead,
            Order_time: Order_time,
            Cust_code: custcode,
          },
        }));
        console.log("JobCostDetail", JobCostDetail);

        setSelectedReadyFromTime(data.ResultSet[0].ReadyFrom);

        if (twinsteerchecked) {
          setTwinsteerNote("TWS OK");
        }
        if (!twinsteerchecked) {
          setTwinsteerNote("");
        }
        if (ReadyFromchecked) {
          setReadyFromNote(
            data.ResultSet[0].SorderHead.Internal_inst.split("K")[1]
          );
        }
        if (!ReadyFromchecked) {
          setReadyFromNote("");
        }
        setisQouteclicked(false);
        setQuoteDate(productTableData.Quote_date);
        setQuoteValidity(data.ResultSet[0].Quote_validity);
        // if (copyClicked) {
        //   const Order_date = moment().format("YYYY-MM-DD");
        //   setJobOrderDate(Order_date);
        //   setTwinsteerNote("");
        //   setReadyFromNote("");
        //   setTwinsteerOK(false);
        //   setReadyFrom(false);
        //   setQuoteNo(0);
        //   setJobStartDate("");
        //   setJobOrderTime("");
        //   //setExpDate(expDate);
        //   //setQuoteValidity(30);
        //   //setstatus("N");
        //   // setQuoteDate(Quote_date);
        //   setProductTabledata((prevProductTabledata) => ({
        //     ...prevProductTabledata,
        //     // Quote_no: 0,
        //     // Quote_date: Quote_date,
        //     // Status: "N",
        //     // AddressModel: {
        //     //   Contact: contact,
        //     // },
        //   }));
        //   setCopyClicked(false);
        // }
      })
      .catch((error) => {
        console.error("Error fetching data from the API:", error);
      });
  };
  const GetMapRefId = () => {
    const mapRefCode1 = sessionStorage.getItem("selectedMaprefCode");
    const address1 = sessionStorage.getItem("selectedMaprefAddress");
    const custcode = productTabledata.Cust_code
      ? productTabledata.Cust_code
      : CostomerFieldData.CustomerCode;

    // setCustCode(custCode);
    fetch(
      `${API_URL}quotation/checkquote?custcode=${custcode}&mapref=${mapRefCode1}&address=${address1}`
    )
      .then((response) => response.json())
      .then((data) => {
        //73D3
        const newRefid = data.ReturnValue;
        const returnMsg = data.ReturnMessage[0];
        sessionStorage.setItem("refid", newRefid);
        // this will replace the previous fetched ProductTabledata.Ref_id with new one
        // setProductTabledata((prevProductTabledata) => ({
        //   ...prevProductTabledata,
        //   Ref_id: newRefid,
        //   Map_ref: mapRefCode1,
        //   Site_address1: address1,
        // }));
        if (returnMsg === "" || returnMsg === undefined) {
          setProductTabledata((prevProductTabledata) => ({
            ...prevProductTabledata,
            Ref_id: newRefid,
            Map_ref: mapRefCode1,
            Site_address1: address1,
          }));
        } else if (returnMsg !== "") {
          console.log("returnMsg availble", returnMsg);
          // Display a confirmation dialog to the user
          const userConfirmed = window.confirm(returnMsg);

          if (userConfirmed) {
            // User clicked "OK," so update ProductTabledata
            setProductTabledata((prevProductTabledata) => ({
              ...prevProductTabledata,
              Ref_id: newRefid,
              Map_ref: mapRefCode1,
              Site_address1: address1,
            }));
          } else {
            setProductTabledata((prevProductTabledata) => ({
              ...prevProductTabledata,
              Ref_id: "",
              Map_ref: "",
              Site_address1: "",
            }));
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching data from the API:", error);
      });
  };
  const GetSupplierData = (Supcode) => {
    if (Supcode === "") {
      setSupplierData({
        SupplierCode: "",
        Address1: "",
        Address2: "",
        Name: "",
        City: "",
        State: "",
        Postcode: "",
        Telephone1: "",
        Telephone2: "",
      });
      return;
    }
    fetch(`${API_URL}joborder/getsupplierbyid?suppliercode=${Supcode}`)
      .then((response) => response.json())
      .then((data) => {
        const SupcodeData = data.ResultSet[0];
        setSupplierData(SupcodeData);

        // Assuming data is an array of objects like you provided
      })
      .catch((error) => {
        console.error("Error fetching data from the API:", error);
      });
  };


  const handleNewQuotation = () => {
    setcleared(true);
    setisNewJob(true);
    setQuoteNo("");
    setSupplierData({
      SupplierCode: "",
      Address1: "",
      Address2: "",
      Name: "",
      City: "",
      State: "",
      Postcode: "",
      Telephone1: "",
      Telephone2: "",
    });
    const cleared_data = {
      ReadyFrom_toggle: "",
      Twsok_toggle: "",
      Jobstart_ent: "", // marked
      Jobend_ent: "", // marked
      Jobstart_time_ent: "",
      Jobend_time_ent: "",
      End_loading_time_ent: "",
      DocDate_ent: "", // marked
      Avmonhrs_opt: "",
      Minhrs_tgl: "",
      Quote_stk_quote_no: QuoteNo, // marked
      Fuel_supplied: "", // marked
      GstOverideCustomer: "",
      Job_order_status: "N",
      Job_order_ptype: selectedOption,
      SecondContactlist: [],
      Supplier_list: [],
      JobCostDetail: {},
      Otstk: {
        AssigneeNo: 0,
        Name: "",
        SiteAddress2: "",
        JobName: "",
        JobDescription: "",
        OrderedWith: "",
        TimeOrdered: "",
        Delivery_time: "",
        CustOrderedBy: "",
        DeliveryTimeFrom: "",
        DeliveryTimeTo: "",
        SiteAddress1: "",
        Contact: "",
        City: "", //productTabledata.Otstk?.Contact ?? "",
        State: "",
        Postcode: "",
        Telephone: "",
        MapRef: "",
        RefId: 0,
        Latitude: 0,
        Longitude: 0,
        CustSiteRadius: 0,
      },
      SorderHead: {
        Cust_code: "",
        Order_date: "",
        Order_time: jobOrderTime, // this need to be change to const
        Cust_order_no: "",
        Salesperson: "",
        Source_code: "",
        Rep_code: "",
        Status: "",
        Assignee_no: 0,
        version: "",
        Order_type: selectedOption,
        Order_tot_payable_amount: "",
        Special_inst: "",
        Company_code: "ESQ",
        Tentative_flag: 0,
        Bill_freq: "",
        Order_product_type: "",
        Internal_inst: "",
        Sorder_no: 0,
        Contract_number: "",
      },
      SiteDetail: {
        Contact: "",
        Telephone: "",
        Assignee_no: "",
        Address1: "",
        City: "",
        State: "",
        Postcode: "",
        Area_code: "",
        Ref_id: "",
        Map_ref: "",
        Spinst: "",
        Cust_site_radius: "",
        Latitude: "",
        Longitude: "",
      },
      MaterialList: [],
      DetailTpg: {
        Name: "",
        Address1: "",
        Address2: "",
        City: "",
        Contact: "",
        Fax: "",
        Telephone: "",
        Repcode: "",
        CreditStatus: "",
      },
      Message_list: [],
    };

    setProductTabledata([]);
    setCostomerFieldData(cleared_data);
    setSupplierList([]);
    setTwinsteerOK(false);
    setTwinsteerNote("");
    setReadyFromNote("");
    setReadyFrom(false);
    setContactList([]);
    const Order_date = moment().format("YYYY-MM-DD");
    setJobOrderDate(Order_date);
    const Order_time = moment().format("HH:mm").toString();
    setJobOrderTime(Order_time);
    setJobStartDate("");
    setJobEndDate("");
    setLoadingStart("");
    setLoadingTimeEnd("");
    setTimeRequired("");
    setSelectedOption("Q");
    sessionStorage.setItem("selectedJobMaprefCode", "");
    sessionStorage.setItem("selectedJobQuoteNo", "");
    sessionStorage.setItem("selectedJobMaprefAddress", "");
    sessionStorage.setItem("selectedJobSupplierProduct", "");
    sessionStorage.setItem("selectedJobCustCode", "");
    sessionStorage.setItem("savemodelSelectedJobProducts", "");
    localStorage.setItem("createjobclicked", "");
    sessionStorage.setItem("JobCostDetails", "");
    localStorage.setItem("createjobclicked", false);
    sessionStorage.setItem("savemodelMaterialList_JobOrder", "");
    sessionStorage.setItem("selectedQuoteNo", "");
    localStorage.setItem("QouteNofromJob", "");
    setCopyClicked(false);
    setSorderNo(0);
    setTimeout(() => {
      setcleared(false);
    }, 200);
    // sessionStorage.setItem("Job_refid", "");
    // sessionStorage.setItem("selectedSupplierProduct", "");
  };
  // Update the Postcode value in the state when the input changes
  
  const handleFieldChangesite = (fieldName, value, submodel, fontType) => {
    let newvalue = value.toUpperCase(); // Initialize newvalue outside of the if statement

    if (fontType === "uppercase") {
      newvalue = value.toUpperCase();
    }
    if (submodel === "") {
      setProductTabledata({
        ...productTabledata,
        [fieldName]: newvalue,
      });
    }
    if (productTabledata[submodel]) {
      const updatedAddressModel = { ...productTabledata[submodel] };
      // Update the specific field
      updatedAddressModel[fieldName] = newvalue;
      setProductTabledata({
        ...productTabledata,
        [submodel]: updatedAddressModel,
      });
    } else {
      setProductTabledata({
        ...productTabledata,
        [submodel]: {
          [fieldName]: newvalue,
        },
      });
    }
  };
  const handleKeyPressCust = (e, value) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleButtonClickCustCode(QuotationCustCode);
      // GetCustomerCodeData(value);
    }
  };
  // const GetCustomerCodeData = (custCode) => {
  //   //const custCode = sessionStorage.getItem("selectedCustCode");
  //   // setCustCode(custCode);
  //   fetch(`${API_URL}customer/getcustomerbyid?custcode=${custCode}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const customerFieldData = data.ResultSet[0];
  //       // if (customerFieldData === null) {
  //       // IF CUST CODE is not availble or wrong then need to open cust lookup
  //       handleButtonClickCustCode(QuotationCustCode);
  //       //handleNewQuotation("N");
  //       //   return;
  //       // }
  //       // setCostomerFieldData(customerFieldData);
  //       const Custcode = customerFieldData.CustomerCode;
  //       setProductTabledata((prevProductTabledata) => ({
  //         ...prevProductTabledata,
  //         SorderHead: {
  //           ...prevProductTabledata.SorderHead,
  //           Cust_code: Custcode,
  //         },
  //       }));
  //       console.log("custcode", productTabledata.SorderHead.Cust_code);
  //       setTimeout(() => {
  //         // setSelectedComponent(Qt_sites);
  //         setPopupVisible(true);
  //         //setfetchSelectedProducts(false);
  //       }, 2000);

  //       // Assuming data is an array of objects like you provided
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data from the API:", error);
  //     });
  // };
  const handleFieldChangeSupplierData = (fieldName, value) => {
    setSupplierData({
      ...supplierData,
      [fieldName]: value,
    });
  };
  Date.prototype.addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };
  const saveJobOrder = () => {
    setLoading(true);

    // if (!quoteDate) {
    //   window.alert("please select a Date ");
    //   setLoading(false);
    //   return;
    // }
    const savemodelMaterialListJobRaw = sessionStorage.getItem(
      "savemodelMaterialList_JobOrder"
    );
    const saveJobCostDetailsRaw = sessionStorage.getItem("JobCostDetails");

    let savemodelMaterialListJob;
    let saveJobCostDetails;

    try {
      savemodelMaterialListJob = savemodelMaterialListJobRaw
        ? JSON.parse(savemodelMaterialListJobRaw)
        : null;
    } catch (error) {
      console.error("Error parsing savemodelMaterialListJob:", error);
    }

    try {
      saveJobCostDetails = saveJobCostDetailsRaw
        ? JSON.parse(saveJobCostDetailsRaw)
        : null;
    } catch (error) {
      console.error("Error parsing saveJobCostDetails:", error);
    }
    // if (saveJobCostDetailsRaw) {
    //   console.log("saveJobCostDetails", saveJobCostDetails);
    //   // Check if saving the order will exceed the credit limit
    //   if (
    //     saveJobCostDetails.Order_total + saveJobCostDetails.Current_debt >
    //     (saveJobCostDetails.Credit_limit &&
    //       saveJobCostDetails.Credit_limit !== 0)
    //   ) {
    //     // Show confirmation dialog to the user
    //     const confirmed = window.confirm(
    //       "Saving this order will put this customer over the credit limit. Are you sure?"
    //     );
    //     // If user confirms, continue with saving the order
    //     if (!confirmed) {
    //       window.alert("Credit Limit is not enough. Cannot Save");
    //       setLoading(false);
    //       return;
    //     }
    //   }
    // }
    const modelObject = {};

    const saveQuoteBody = {
      ReadyFrom_toggle: ReadyFromOK,
      Twsok_toggle: twinsteerOK,
      Jobstart_ent: jobStartDate ?? "", // marked
      Jobend_ent: jobEndDate ?? "", // marked
      Jobstart_time_ent: productTabledata.Jobstart_time_ent ?? "",
      Jobend_time_ent: LoadingTimeStart ?? "",
      End_loading_time_ent: LoadingTimeEnd ?? "",
      DocDate_ent: jobOrderDate ?? "", // marked
      Avmonhrs_opt: productTabledata.Avmonhrs_opt ?? "",
      Minhrs_tgl: productTabledata.Minhrs_tgl ?? "",
      Quote_stk_quote_no: QuoteNo ?? 0, // marked
      Fuel_supplied: productTabledata.Fuel_supplied ?? "", // marked
      GstOverideCustomer: productTabledata.GstOverideCustomer ?? "",
      Job_order_status: "N",
      Job_order_ptype: selectedOption ?? "",
      SecondContactlist: contactList ?? [],
      Supplier_list: supplierList ?? [],
      JobCostDetail: saveJobCostDetails ?? {},

      //   "Otstk": {
      //     "AssigneeNo": 540,
      //     "CustOrderedBy": "",
      //     "JobName": "DUTTON",
      //     "JobDescription": "",
      //     "OrderedWith": "",
      //     "TimeOrdered": "",
      //     "Delivery_time": "-",
      //     "DeliveryTimeFrom": "",
      //     "DeliveryTimeTo": "",
      //     "Name": "DUTTON",
      //     "SiteAddress1": "13 CHIFLEY DR",
      //     "SiteAddress2": "",
      //     "City": "MOORABBIN AIRPORT",
      //     "State": "",
      //     "Postcode": "3175",
      //     "Contact": "MARTY",
      //     "Telephone": "0418312369",
      //     "MapRef": "87K3",
      //     "RefId": 381317,
      //     "Latitude": 0.00000000,
      //     "Longitude": 0.00000000,
      //     "CustSiteRadius": 0.0
      // },

      Otstk: {
        AssigneeNo: productTabledata.Otstk?.AssigneeNo ?? 0,
        Name: productTabledata.Otstk?.Name ?? "",
        SiteAddress2: productTabledata.Otstk?.Site_address2 ?? "",
        JobName: productTabledata.Otstk?.JobName ?? "",
        JobDescription: productTabledata.Otstk?.JobDescription ?? "",
        OrderedWith: productTabledata.Otstk?.OrderedWith ?? "",
        TimeOrdered: productTabledata.Otstk?.TimeOrdered ?? "",
        Delivery_time: productTabledata.Otstk?.Delivery_time ?? "",
        CustOrderedBy: productTabledata.Otstk?.CustOrderedBy ?? "",
        DeliveryTimeFrom: productTabledata.Otstk?.DeliveryTimeFrom ?? "",
        DeliveryTimeTo: productTabledata.Otstk?.DeliveryTimeTo ?? "",
        SiteAddress1: productTabledata.Otstk?.SiteAddress1 ?? "",

        City: productTabledata.Otstk?.City ?? "", //productTabledata.Otstk?.Contact ?? "",
        State: productTabledata.Otstk?.State ?? "",
        Postcode: productTabledata.Otstk?.Postcode ?? "",
        Telephone: productTabledata.Otstk?.Telephone ?? "",
        Contact: productTabledata.Otstk?.Contact ?? "",
        MapRef: productTabledata.Otstk?.MapRef ?? "",
        RefId: productTabledata.Otstk?.RefId ?? 0,
        Latitude: productTabledata.Otstk?.Latitude ?? 0,
        Longitude: productTabledata.Otstk?.Longitude ?? 0,
        CustSiteRadius: productTabledata.Otstk?.CustSiteRadius ?? 0,

        //productTabledata.Otstk?.Telephone ?? "",
      },

      SorderHead: {
        Cust_code: productTabledata.SorderHead?.Cust_code ?? "",
        Order_date: jobOrderDate,
        Order_time: jobOrderTime ?? "",
        Cust_order_no: productTabledata.SorderHead?.Cust_order_no ?? "",
        Salesperson: productTabledata.SorderHead?.Salesperson ?? "",
        Source_code: productTabledata.SorderHead?.Source_code ?? "",
        Rep_code: productTabledata.SorderHead?.Rep_code ?? "",
        Status: productTabledata.SorderHead?.Status ?? "",
        Assignee_no: productTabledata.SorderHead?.Assignee_no ?? 0,
        version: productTabledata.SorderHead?.version ?? "",
        Order_type: productTabledata.SorderHead?.Order_type ?? "",
        Order_tot_payable_amount:
          productTabledata.SorderHead?.Order_tot_payable_amount ?? "",
        Special_inst: productTabledata.SorderHead?.Special_inst ?? "",
        Company_code: "ESQ",
        Tentative_flag: productTabledata.SorderHead?.Tentative_flag ?? 0,
        Bill_freq: productTabledata.SorderHead?.Bill_freq ?? "",
        Order_product_type:
          productTabledata.SorderHead?.Order_product_type ?? "",
        Internal_inst: twinsteerNote + " " + readyFromNote,
        Sorder_no: soderNo,
        Contract_number: productTabledata.SorderHead?.Contract_number ?? "",
      },

      SiteDetail: {
        Contact: productTabledata.SiteDetail?.Contact ?? "",
        Telephone: productTabledata.SiteDetail?.Telephone ?? "",
        Assignee_no: productTabledata.SiteDetail?.Assignee_no ?? "",
        Address1: productTabledata.SiteDetail?.Address1 ?? "",
        City: productTabledata.SiteDetail?.City ?? "",
        State: productTabledata.SiteDetail?.State ?? "",
        Postcode: productTabledata.SiteDetail?.Postcode ?? "",
        Area_code: productTabledata.SiteDetail?.Area_code ?? "",
        Ref_id: productTabledata.SiteDetail?.Ref_id ?? "",
        Map_ref: productTabledata.SiteDetail?.Map_ref ?? "",
        Spinst: productTabledata.SiteDetail?.Spinst ?? "",
        Cust_site_radius: productTabledata.SiteDetail?.Cust_site_radius ?? "",
        Latitude: productTabledata.SiteDetail?.Latitude ?? "",
        Longitude: productTabledata.SiteDetail?.Longitude ?? "",
      },

      MaterialList: savemodelMaterialListJob,
      DetailTpg: {
        Name: productTabledata.DetailTpg?.Name ?? "",
        Address1: productTabledata.DetailTpg?.Address1 ?? "",
        Address2: productTabledata.DetailTpg?.Address2 ?? "",
        City: productTabledata.DetailTpg?.City ?? "",
        Contact: productTabledata.DetailTpg?.Contact ?? "",
        Fax: productTabledata.DetailTpg?.Fax ?? "",
        Telephone: productTabledata.DetailTpg?.Telephone ?? "",
        Repcode: productTabledata.DetailTpg?.Repcode ?? "",
        CreditStatus: productTabledata.DetailTpg?.CreditStatus ?? "",
      },

      OtherDetail: [],
      Message_list: [],
    };
    // if (productTabledata.Ref_id != "") {
    //   var refid = productTabledata.Ref_id;
    // } else {
    //   var refid = sessionStorage.getItem("refid");
    // }
    let sorderNmber;
    if (soderNo === null || (soderNo === undefined) | (soderNo === "")) {
      sorderNmber = 0;
    } else {
      sorderNmber = soderNo;
    }
    fetch(
      `${API_URL}joborder/savejoborder?sorderno=${sorderNmber}&invoiceflg=false&originator=peercore`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saveQuoteBody),
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        const msg = data.ReturnMessage[0];
        const returnValue = data.ReturnValue;

        //setAlertTitle("Notify");
        setAlertType("info");
        setAlertMessage(msg + " " + "Job Order No :" + returnValue);
        setShowAlert(true);
        //window.alert(msg + " " + "Job Order No :" + returnValue);

        // setMaterialListQTNo([]);
        // sessionStorage.setItem("savemodelMaterialList_JobOrder", "");
        // setProductTabledata("");
        setSorderNo(returnValue);
        // handleRefresh(returnValue);-- nadeesh 3/18
        // GetproductTableData(returnValue); // to refresh the data after saving
        setLoading(false);
        // setExpDate;
      })
      .catch((err) => {
        console.log(err.message);
        console.error("Error during saveQuotation:", err);
        setLoading(false);
      });
  };
  const handlPLTOptionChange = (e) => {
    if (e.target.value === "") {
      console.log("value", e.target.value);
      setSupplierData({
        SupplierCode: "",
        Address1: "",
        Address2: "",
        Name: "",
        City: "",
        State: "",
        Postcode: "",
        Telephone1: "",
        Telephone2: "",
      });
      console.log("supplierData", supplierData);
    }
    GetSupplierData(e.target.value);
    setSelectedPltValue(e.target.value);
  };
  const TwinsteerHandle = () => {
    setTwinsteerOK(!twinsteerOK);
    if (!twinsteerOK) {
      setTwinsteerNote("TWS OK");
    } else if (twinsteerOK) {
      setTwinsteerNote("");
    }
  };
  const ReadyFromHandleTime = (type, value, date) => {
    console.log("type2", type, value, date);
    let formattedDate = "";
    let formattedTime = "";
    if (date) {
      const [year, month, day] = date.split("-");
      formattedDate = `${day}/${month}/${year.slice(-2)}`;
    }
    if (value) {
      const [hours, minutes] = value.split(":");
      const formattedHours = hours % 12 || 12;
      const ampm = hours < 12 ? "am" : "pm";
      // Display the result
      formattedTime = `${formattedHours} ${ampm}`;
    }

    // Display the result
    if (type === "R") {
      setReadyFrom(!ReadyFromOK);
    }
    if (!ReadyFromOK) {
      setReadyFromNote("");
    }
    console.log("type", type);
    if (type === "D") {
      console.log("type2", type);
      //setReadyFrom(!ReadyFromOK);
      setSelectedReadyFromTime(value);
      console.log("ReadyFromOK", ReadyFromOK);
      if (ReadyFromOK) {
        setReadyFromNote("Ready From: " + formattedTime + " " + formattedDate);
      } else if (!ReadyFromOK) {
        setReadyFromNote("");
      }
    }
  };
  const HandleDeleteboolian = (val) => {
    setDeleted(val);
  };
  const HandleNewQuote = () => {
    setcleared(true);
    setTimeout(() => {
      setcleared(false);
    }, 300);
  };
  const HandleRefreshMaterial = () => {
    setrefresh(true);
    setTimeout(() => {
      setrefresh(false);
    }, 300);
  };
  const colorJob_order_status = (text) => {
    if (text === "Order Finished") {
      return "colorRed";
    } else if (text === "Cancelled") {
      return "colorOrrange";
    } else if (text === "New") {
      return "colorBlue";
    } else if (text === "In Progress") {
      return "colorGreen";
    } else if (text === "Quote/Order") {
      return "colorRed";
    }
  };
  const handleCopy = () => {
    setCopyClicked(true);
    // if (copyClicked) {
    const Order_date = moment().format("YYYY-MM-DD");
    setJobOrderDate(Order_date);
    const Order_time = moment().format("HH:mm").toString();
    setJobOrderTime(Order_time);
    setTwinsteerNote("");
    setReadyFromNote("");

    setTwinsteerOK(false);
    setReadyFrom(false);
    //setQuoteNo(0);
    setSorderNo(0);
    setJobEndDate("");
    setJobStartDate("");
    setJobOrderTime("");
    setLoadingStart("");
    setLoadingTimeEnd("");
    //setExpDate(expDate);
    //setQuoteValidity(30);
    //setstatus("N");
    // setQuoteDate(Quote_date);
    setProductTabledata((prevProductTabledata) => ({
      ...prevProductTabledata,
      SorderHead: {
        ...prevProductTabledata.SorderHead,
        Special_inst: "",
      },
      // Quote_no: 0,
      // Quote_date: Quote_date,
      // Status: "N",
      // AddressModel: {
      //   Contact: contact,
      // },
    }));
    // setCopyClicked(false);
    // }
  };
  const handleSelectProductGroup = (value) => {
    setSelectedOption(value);

    // setSelectedOptionFULL(fulltype)
  };
  const handlejobstartDate = (value) => {
    setJobStartDate(value);
    setJobEndDate(value);
  };

  const handleChangeloadingStart = (value) => {
    setLoadingStart(value);
  };
  const handleChangeloadingEnd = (value) => {
    if (LoadingTimeStart && value < LoadingTimeStart) {
      //setAlertTitle("Notify");
      setAlertType("warning");
      setAlertMessage("End time cannot be before start time");
      setShowAlert(true);
      //window.alert("End time cannot be before start time");
      setLoadingTimeEnd("");
    } else if (TimeRequired && value > TimeRequired) {
      //setAlertTitle("Notify");
      setAlertType("warning");
      setAlertMessage("End time cannot be after the specified time");
      setShowAlert(true);
      //window.alert("End time cannot be after the specified time");
      setLoadingTimeEnd("");
    } else {
      setLoadingTimeEnd(value);
    }
  };

  const handleChangeTimeRequired = (value) => {
    setTimeRequired(value);
  };
  const handlejobOrderBrowse = (value) => {
    setSorderNo(value);
  };
  const handleKeyPressJobOrder = (e, value) => {
    setSorderNo(value);
    sessionStorage.setItem("selectedSorderNo", value);
    if (e.key === "Enter") {
      e.preventDefault();
      setcleared(true); // to clear the data already loaded on tables ( product tables)
      setMaterialListQTNo([]);
      setSupplierData({
        SupplierCode: "",
        Address1: "",
        Address2: "",
        Name: "",
        City: "",
        State: "",
        Postcode: "",
        Telephone1: "",
        Telephone2: "",
      });
      setSelectedPltValue("");
      sessionStorage.setItem("savemodelMaterialList_JobOrder", "");
      setProductTabledata("");

      GetproductTableData(value);

      setTimeout(() => {
        setcleared(false);
      }, 200);
    }
  };
  const handleRefresh = (value) => {
    setSorderNo(value);
    sessionStorage.setItem("selectedSorderNo", value);
    setMaterialListQTNo([]);
    sessionStorage.setItem("savemodelMaterialList_JobOrder", "");
    setProductTabledata("");
    GetproductTableData(value);
    //api call
  };

  const handleKeyPressQuote = (e, value) => {
    //setSorderNo(value);
    if (e.key === "Enter") {
      e.preventDefault();
      sessionStorage.setItem("savemodelMaterialList_JobOrder", "");
      setSorderNo("");
      setMaterialListQTNo([]);
      setSupplierData({
        SupplierCode: "",
        Address1: "",
        Address2: "",
        Name: "",
        City: "",
        State: "",
        Postcode: "",
        Telephone1: "",
        Telephone2: "",
      });
      setSelectedPltValue("");
      //setisQouteclicked(true);
      const Qouteno = sessionStorage.getItem("selectedQuoteNo");
      //setSelectedComponent("");
      setProductTabledata("");
      //GetproductTableData();
      GetJobOrderFromJobOrder(value);
      //api call
    }
  };

  const handleALTfill = () => {
    const Today_date = moment().format("YYYY-MM-DD");
    //
    if (jobStartDate !== "" && jobStartDate > Today_date) {
      // console.log(transformedArray);
      const savemodelMaterialListJobRaw = sessionStorage.getItem(
        "savemodelMaterialList_JobOrder"
      );
      let savemodelMaterialListJob;
      try {
        savemodelMaterialListJob = savemodelMaterialListJobRaw
          ? JSON.parse(savemodelMaterialListJobRaw)
          : null;
      } catch (error) {
        console.error("Error parsing savemodelMaterialListJob:", error);
      }
      if (!savemodelMaterialListJob) {
        setAlertType("info");
        setAlertMessage("please add products");
        setShowAlert(true);
        //window.alert("please add products");
      }

      if (savemodelMaterialListJob) {
        const transformedArray = savemodelMaterialListJob.map((item) => {
          return {
            Supplier_store: item.Supplier_store, // Ensure leading zeros
            Truck_type: item.Truck_type,
          };
        });
        getALT_fillDetails(jobStartDate, transformedArray);
      } else {
        console.error("savemodelMaterialListJob is null");
      }
    } else {
      if (
        window.confirm(
          "Loading Time will be filled with TODAY info. Do you agree?"
        )
      ) {
        const Today_date = moment().format("YYYY-MM-DD");
        setJobStartDate(Today_date);
        setJobEndDate(Today_date);
        const savemodelMaterialListJobRaw = sessionStorage.getItem(
          "savemodelMaterialList_JobOrder"
        );

        let savemodelMaterialListJob;
        try {
          savemodelMaterialListJob = savemodelMaterialListJobRaw
            ? JSON.parse(savemodelMaterialListJobRaw)
            : null;
        } catch (error) {
          console.error("Error parsing savemodelMaterialListJob:", error);
        }
        if (!savemodelMaterialListJob) {
          setAlertType("info");
          setAlertMessage("please add products");
          setShowAlert(true);
          // window.alert("please add products");
        }
        if (savemodelMaterialListJob) {
          const transformedArray = savemodelMaterialListJob.map((item) => {
            return {
              Supplier_store: item.Supplier_store, // Ensure leading zeros
              Truck_type: item.Truck_type,
            };
          });
          getALT_fillDetails(Today_date, transformedArray);
        } else {
          console.error("savemodelMaterialListJob is null");
        }
      }
    }
  };

  const getALT_fillDetails = (altdate, Body) => {
    // if (!filters.SorderNo) {
    //   window.alert("Please Enter a orderNo!! ");
    //   return;
    // }
    setLoading(true);
    fetch(
      `${API_URL}joborder/getalttime?altDate=${altdate}&prodgroup=${selectedOption}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Body),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const datar = data.ResultSet[0];
        console.log("alt data", datar);
        if (datar.Message) {
          setAlertType("info");
          setAlertMessage(datar.Message);
          setShowAlert(true);
          //window.alert(datar.Message);
        } else {
          const Jobstart_ent = datar.Jobstart_ent;
          const Jobend_ent = datar.Jobend_ent;
          const Jobend_time_ent = datar.Jobend_time_ent;
          const End_loading_time_ent = datar.End_loading_time_ent;
          setLoadingStart(Jobend_time_ent);
          setLoadingTimeEnd(End_loading_time_ent);
          setJobStartDate(Jobstart_ent);
          setJobEndDate(Jobend_ent);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  };

  const handleOpenQuotation = async (e) => {
    if (QuoteNo) {
      localStorage.setItem("QouteNofromJob", QuoteNo);
    } else {
      e.preventDefault();
      return;
    }
  };
  return (
    <div className="quotationcard">
      {showAlert && (
        <Nexgen_Alert
          AlertTitle={alertTitle}
          severity={alertType}
          AlertMessage={alertMessage}
          onClose={() => setShowAlert(false)}
        />
      )}
      {/* <CCard> */}
      {/* <CCardHeader className="headerEQ">Quotation</CCardHeader> */}
      {/* <CCardBody> */}
      {/* MenuBar starts*/}
      <div className="menu-bar dividercards slideInLeft">
        <Tooltip title="New Order">
          <button className="menu-button">
            <img
              src={newDocIcon}
              alt="Icon"
              className="menu-icon"
              onClick={() => handleNewQuotation()}
              ex
            />
          </button>
        </Tooltip>
        <Tooltip title="Copy Order">
          <button
            className={`menu-button ${copyClicked ? "disabled" : ""}`}
            onClick={() => !copyClicked && handleCopy()}
          >
            <img
              src={copyIcon}
              alt="Icon"
              className={`menu-icon ${copyClicked ? "disabled-icon" : ""}`}
            />
          </button>
        </Tooltip>
        <Tooltip title="++">
          <button
            className="menu-button"
            onClick={() => handleButtonClick(QuotationPrint)}
          >
            <img src={plusIcon} alt="Icon" className="menu-icon" />
          </button>
        </Tooltip>
        <Tooltip title="Save Order">
          <button className="menu-button" onClick={() => saveJobOrder()}>
            <img src={saveIcon} alt="Icon" className="menu-icon" />
          </button>
        </Tooltip>

        <button
          className="menu-button"
          onClick={() => handleButtonClick(QuotationDistanceMaster)}
        >
          <img src={distanceMasterIcon} alt="Icon" className="menu-icon" />
          Distance Master
        </button>
        <button
          className="menu-button"
          onClick={() => handleButtonClick(QuotationMapRef)}
        >
          <img src={maprefIcon} alt="Icon" className="menu-icon" />
          Map Reference
        </button>
        <button className="menu-button">
          <img src={googlemapIcon} alt="Icon" className="menu-icon" />
          G-Map Distance
        </button>
        <button
          className="menu-button"
          onClick={() => handleButtonClick(QuotationSuplier)}
        >
          <img src={supplierIcon} alt="Icon" className="menu-icon" />
          Supplier Master
        </button>
        <button className="menu-button">
          <img src={auditlogIcon} alt="Icon" className="menu-icon" />
          Audit Log
        </button>
        <Tooltip title="Print Job Order">
          <button
            className="menu-button"
            onClick={() => handleButtonClick(QuotationPrint)}
          >
            <img src={printIcon} alt="Icon" className="menu-icon" />
          </button>
        </Tooltip>

        <button
          className="menu-button"
          onClick={() => handleButtonClick(ALT_Summary)}
        >
          <img src={altsummaryIcon} alt="Icon" className="menu-icon" />
          ALT Summary
        </button>

        {/* Add more buttons as needed */}
      </div>

      {/* <div>
        <button className="togglebtnside">Menu</button>
      </div> */}
      {/* Popup */}
      {popupVisible && selectedComponent && (
        <div style={overlayStyle} onClick={() => closePopup()}>
          <Draggable>
          <div onClick={(e) => e.stopPropagation()}>
            {/* Render the selected component */}
            {selectedComponent === QuotationPrint && (
              <QuotationPrint onClose={closePopup} />
            )}
            {selectedComponent === QuotationCust && (
              <QuotationCust onClose={closePopup} />
            )}
            {selectedComponent === QuotationNo && (
              <QuotationNo
                onClose={closePopupQuoteNo}
                clearfunction={HandleNewQuote}
                refresh={HandleRefreshMaterial}
              />
            )}
            {selectedComponent === QuotationCustCode && (
              <Qt_CustCode
                onClose={closePopupCustNo}
                customerCode={
                  productTabledata.SorderHead
                    ? productTabledata.SorderHead.Cust_code
                    : ""
                }
              />
            )}
            {selectedComponent === QuotationSuplier && (
              <QuotationSuplier onClose={closePopup} />
            )}
            {selectedComponent === QuotationDistanceMaster && (
              <QuotationDistanceMaster onClose={closePopup} />
            )}
            {selectedComponent === QuotationMapRef && (
              <QuotationMapRef onClose={closePopup} />
            )}
            {selectedComponent === Qt_sites && (
              <Qt_sites
                onClose={closeCustSitePopup}
                custCode={
                  productTabledata.SorderHead
                    ? productTabledata.SorderHead.Cust_code
                    : ""
                }
                clearfunction={HandleNewQuote}
              />
            )}
            {selectedComponent === Qt_contacts && (
              <Qt_contacts
                onClose={closePopupContact}
                siteContact={productTabledata.SecondContactlist}
              />
            )}
            {selectedComponent === Qt_Mapref && (
              <Qt_Mapref
                onClose={closePopupMapRef}
                mapRef={productTabledata.Map_ref}
              />
            )}
            {selectedComponent === JobOrderBrowse && (
              <JobOrderBrowse
                onClose={closePopupJobOrderBrowse}
                soderNo={soderNo}
                clearfunction={HandleNewQuote}
              />
            )}
            {selectedComponent === SalesPerson && (
              <SalesPerson onClose={closePopupSalesPerson} />
            )}
            {selectedComponent === ALT_Summary && (
              <ALT_Summary onClose={closePopup} />
            )}
          </div>
          </Draggable>
        </div>
      )}
      {/* <hr className="divider1" /> */}
      {/* MenuBar end*/}
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
      {loading && (
        <LinearProgress
          style={{
            width: "100%",
            height: "5px",
            backgroundColor: "rgb(116, 160, 182)",
          }}
        />
      )}
      <CRow className="slideIn">
        {/* <div className="dividercards" style={{ marginTop: "5px" }}> */}
        <CCol md={12}>
          <div className="dividercards" style={{ marginTop: "5px" }}>
            {/* Sub-row 1 */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <CInputGroup style={{ marginRight: "5px" }}>
                <CInputGroupText className="small-input-text">
                  Company:
                </CInputGroupText>
                <CSelect size="sm" className=" inputtextdark">
                  {/* Options for the dropdown */}
                  <option value="option1">ESSENDON QUIRRIES </option>
                </CSelect>
              </CInputGroup>
              <CInputGroup style={{ marginLeft: "15px", width: "40%" }}>
                <h5
                  className={colorJob_order_status(
                    productTabledata.Job_order_status
                      ? productTabledata.Job_order_status
                      : ""
                  )}
                >
                  {productTabledata.Job_order_status
                    ? productTabledata.Job_order_status
                    : ""}
                </h5>
              </CInputGroup>
              <div
                className="radio-group tabs slide-left-to-right"
                style={{
                  justifyContent: "center",
                  width: "100%",

                  // marginLeft: "5%",
                }}
              >
                <label
                  className="radiolabel tab"
                  style={{ marginLeft: "-14px" }}
                >
                  <input
                    className="productradiobtn"
                    type="radio"
                    value="S"
                    checked={selectedOption === "S"}
                    onChange={(e) => handleSelectProductGroup("S")}
                  />
                  SERVICE
                </label>

                <label className="radiolabel tab">
                  <input
                    className="productradiobtn"
                    type="radio"
                    value="Q"
                    checked={selectedOption === "Q"}
                    onChange={(e) => handleSelectProductGroup("Q")}
                  />
                  QUARRY
                </label>

                <label className="radiolabel tab">
                  <input
                    className="productradiobtn"
                    type="radio"
                    value="C"
                    checked={selectedOption === "C"}
                    onChange={(e) => handleSelectProductGroup("C")}
                  />
                  CONCRETE
                </label>

                <label className="radiolabel tab">
                  <input
                    className="productradiobtn"
                    type="radio"
                    value="G"
                    checked={selectedOption === "G"}
                    onChange={(e) => handleSelectProductGroup("G")}
                  />
                  GARDEN
                </label>

                <label className="radiolabel tab">
                  <input
                    className="productradiobtn"
                    type="radio"
                    value="A"
                    checked={selectedOption === "A"}
                    onChange={(e) => handleSelectProductGroup("A")}
                  />
                  ASPHALT
                </label>
              </div>
            </div>
            {/* <div className="inputdiv"></div> */}
          </div>
        </CCol>
        {/* <CCol md={6}>
          <div className="dividercards" style={{ marginTop: "5px" }}>
         
          </div>
        </CCol> */}
      </CRow>

      {rowVisibility[0] && (
        <CRow
          style={{ height: "350px" }}
          className={`Quotation_row ${rowVisibility[0] ? "" : "collapsed"}`}
        >
          <CCol md={6} className="slideIn">
            <div className="dividercards " style={{ marginTop: "5px" }}>
              <div>
                <div className="inputdiv">
                  <CInputGroup style={{ marginRight: "5px" }}>
                    <CInputGroupText className="small-input-text ">
                      Order No:
                    </CInputGroupText>
                    <CInput
                      type="text"
                      size="sm"
                      className="inputQuote inputtextdark"
                      value={soderNo}
                      onChange={(e) => setSorderNo(e.target.value)}
                      onKeyDown={(e) =>
                        handleKeyPressJobOrder(e, e.target.value)
                      }
                    />
                    <FindInPageIcon
                      className="lookupIconQuotation"
                      onClick={() => handleButtonClick(JobOrderBrowse)}
                    />
                  </CInputGroup>
                  <CInputGroup style={{ marginRight: "5px" }}>
                    <CInputGroupText className="small-input-text ">
                      Quote No:
                    </CInputGroupText>
                    <CInput
                      type="text"
                      size="sm"
                      className="inputQuote inputtextdark"
                      value={QuoteNo}
                      onChange={(e) => setQuoteNo(e.target.value)}
                      onKeyDown={(e) => handleKeyPressQuote(e, e.target.value)}
                    />
                    <FindInPageIcon
                      className="lookupIconQuotation"
                      onClick={() => handleButtonClick(QuotationNo)}
                    />
                  </CInputGroup>
                  {/* <TextField
                    style={{ marginRight: "5px" }}
                    variant="outlined"
                    size="small"
                    className="inputQuote inputtextdark"
                    label="Order No:"
                    value={soderNo}
                    onChange={(e) => setSorderNo(e.target.value)}
                    onKeyDown={(e) => handleKeyPressJobOrder(e, e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => handleButtonClick(JobOrderBrowse)}
                          >
                            <FindInPageIcon className="lookupIconQuotation" />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    style={{ marginRight: "5px" }}
                    variant="outlined"
                    size="small"
                    className="inputQuote inputtextdark"
                    label="Quote No:"
                    value={QuoteNo}
                    onChange={(e) => setQuoteNo(e.target.value)}
                    onKeyDown={(e) => handleKeyPressQuote(e, e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => handleButtonClick(QuotationNo)}
                          >
                            <FindInPageIcon className="lookupIconQuotation" />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  /> */}

                  <CInputGroup style={{ marginLeft: "15px" }}>
                    <NavLink
                      to="/Quotation/QuotationScreen"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button
                        className="jobinputdivbutton"
                        to="/Quotation/QuotationScreen"
                        onClick={handleOpenQuotation}
                      >
                        Open Quotation
                      </button>
                    </NavLink>
                  </CInputGroup>
                </div>
                <div className="inputdiv">
                  <CInputGroup style={{ marginRight: "5px" }}>
                    <CInputGroupText className="small-input-text">
                      Order Date:
                    </CInputGroupText>
                    <CInput
                      type="date"
                      size="sm"
                      className=" inputtextdark"
                      onChange={(e) => setJobOrderDate(e.target.value)}
                      value={jobOrderDate}
                      // value={
                      //   productTabledata.SorderHead
                      //     ? productTabledata.SorderHead.Order_date.split("T")[0]
                      //     : jobOrderDate
                      // }
                    />
                  </CInputGroup>
                  <CInputGroup style={{ marginRight: "5px" }}>
                    <CInputGroupText className="small-input-text">
                      Order Time:
                    </CInputGroupText>

                    <CInput
                      type="text"
                      placeholder="HH:mm"
                      size="sm"
                      className=" inputtextdark"
                      onChange={(e) => setJobOrderTime(e.target.value)}
                      value={jobOrderTime}
                      // productTabledata.SorderHead
                      //   ? productTabledata.SorderHead.Order_time
                      //   : ""
                      // onChange={(e) => {
                      //   const inputValue = e.target.value;
                      //   let formattedValue = inputValue;

                      //   // Replace dot with colon
                      //   formattedValue = formattedValue.replace(".", ":");

                      //   // Automatically add a colon after the user types two numbers
                      //   if (
                      //     formattedValue.length === 2 &&
                      //     formattedValue.indexOf(":") === -1
                      //   ) {
                      //     formattedValue = formattedValue + ":";
                      //   }
                      //   handleFieldChangesite(
                      //     "Order_time",
                      //     formattedValue,
                      //     "SorderHead",
                      //     ""
                      //   );
                      //   setJobOrderTime(formattedValue)
                      // }}
                    />
                  </CInputGroup>

                  <CInputGroup style={{ marginRight: "5px" }}>
                    <CInputGroupText className="small-input-text ">
                      Cust Order No:
                    </CInputGroupText>

                    <CInput
                      type="text"
                      size="sm"
                      className="inputQuote inputtextdark"
                      value={
                        productTabledata.SorderHead
                          ? productTabledata.SorderHead.Cust_order_no
                          : ""
                      }
                    />

                    {/* <i className="fa fa-search" aria-hidden="true"> */}

                    {/* </i> */}
                  </CInputGroup>
                </div>
                <div className="inputdiv">
                  <CInputGroup style={{ marginRight: "5px" }}>
                    <CInputGroupText className="small-input-text ">
                      Customer Code:
                    </CInputGroupText>

                    <CInput
                      type="text"
                      size="sm"
                      className="inputQuote inputtextdark"
                      value={
                        productTabledata.SorderHead
                          ? productTabledata.SorderHead.Cust_code
                          : ""
                      }
                      onKeyDown={(e) => handleKeyPressCust(e, e.target.value)}
                      onChange={(e) =>
                        handleFieldChangesite(
                          "Cust_code",
                          e.target.value,
                          "SorderHead",
                          "uppercase"
                        )
                      }
                    />
                    {isNewJob && (
                      <FindInPageIcon
                        className="lookupIconQuotation"
                        onClick={() => handleButtonClickCustCode(Qt_CustCode)}
                      />
                    )}

                    <div className="marginL10 marginT5 marginR10 weight600">
                      {productTabledata.JobCostDetail
                        ? productTabledata.JobCostDetail.Cust_credit_limit
                        : ""}
                    </div>
                  </CInputGroup>
                  <CInputGroup>
                    {" "}
                    <button className="jobinputdivbutton">
                      Update Customer Order{" "}
                    </button>
                  </CInputGroup>
                </div>
              </div>
              <div>
                <div className="inputdiv">
                  <CInputGroup style={{ marginRight: "10px" }}>
                    <CInputGroupText className="small-input-text">
                      Customer Name:
                    </CInputGroupText>
                    <CInput
                      type="text"
                      size="sm"
                      className=" inputtextdark "
                      value={
                        productTabledata.DetailTpg
                          ? productTabledata.DetailTpg.Name
                          : ""
                      }
                      onChange={(e) =>
                        handleFieldChangesite(
                          "Name",
                          e.target.value,
                          "DetailTpg",
                          "uppercase"
                        )
                      }
                    />
                  </CInputGroup>
                  <CInputGroup style={{ marginRight: "5px" }}>
                    <CInputGroupText className="small-input-text ">
                      Sales Person:
                    </CInputGroupText>

                    <CInput
                      type="text"
                      size="sm"
                      className="inputQuote inputtextdark"
                      value={
                        productTabledata.SorderHead
                          ? productTabledata.SorderHead.Salesperson
                          : ""
                      }
                      onChange={(e) =>
                        handleFieldChangesite(
                          "Salesperson",
                          e.target.value,
                          "SorderHead"
                        )
                      }
                    />
                    <FindInPageIcon
                      className="lookupIconQuotation"
                      onClick={() => handleButtonClick(SalesPerson)}
                    />

                    {/* <i className="fa fa-search" aria-hidden="true"> */}

                    {/* </i> */}
                  </CInputGroup>
                  <CInputGroup style={{ marginLeft: "25px", width: "240px" }}>
                    <button
                      className="jobinputdivbutton"
                      onClick={handleALTfill}
                    >
                      ALT Auto Fill
                    </button>
                  </CInputGroup>
                </div>

                {/* Sub-row 4 */}
                {/* <div className="sub-row-4"> */}
                <div className="inputdiv">
                  <CInputGroup>
                    <CInputGroupText className="small-input-text">
                      Job start:
                    </CInputGroupText>
                    <CInput
                      type="date"
                      size="sm"
                      className=" inputtextdark"
                      value={jobStartDate}
                      onChange={(e) => handlejobstartDate(e.target.value)}
                      // onChange={(e) =>
                      //   handleFieldChange("Site_city", e.target.value, "City")
                      // }
                    />
                  </CInputGroup>
                  <CInputGroup style={{ marginLeft: "5px" }}>
                    <CInputGroupText className="small-input-text">
                      Time Required:
                    </CInputGroupText>
                    {/* <input type="text" id="time" placeholder="Time" /> */}
                    <CInput
                      type="time"
                      size="sm"
                      placeholder="HH:mm"
                      className=" inputtextdark"
                      value={
                        //productTabledata.Jobstart_time_ent
                        TimeRequired
                      }
                      onChange={(e) =>
                        //handleFieldChange("Jobstart_time_ent", e.target.value)
                        handleChangeTimeRequired(e.target.value)
                      }
                    />
                  </CInputGroup>
                  {/* </div> */}
                  {/* <div className="inputdiv"></div> */}
                </div>
                <div className="inputdiv">
                  <CInputGroup>
                    <CInputGroupText className="small-input-text">
                      Job end:
                    </CInputGroupText>
                    <CInput
                      type="date"
                      size="sm"
                      className=" inputtextdark"
                      disabled
                      //onChange={(e) => setJobEndDate(e.target.value)}
                      value={jobEndDate}
                      // value={
                      //   productTabledata.Jobend_ent
                      //     ? productTabledata.Jobend_ent.split("T")[0]
                      //     : ""
                      // }
                      // onChange={(e) =>
                      //   handleFieldChange("State", e.target.value, "State")
                      // }
                    />
                  </CInputGroup>
                  <CInputGroup style={{ marginLeft: "5px" }}>
                    <CInputGroupText className="small-input-text">
                      Loading Time:
                    </CInputGroupText>
                    <CInput
                      type="time"
                      size="sm"
                      placeholder="HH:mm"
                      className=" inputtextdark"
                      // value={
                      //   productTabledata ? productTabledata.Jobend_time_ent : ""
                      // }
                      value={LoadingTimeStart}
                      onChange={(e) => handleChangeloadingStart(e.target.value)}
                    />
                    -{" "}
                    <CInput
                      type="time"
                      size="sm"
                      className=" inputtextdark"
                      placeholder="HH:mm"
                      disabled={!LoadingTimeStart}
                      // value={
                      //   productTabledata
                      //     ? productTabledata.End_loading_time_ent
                      //     : ""
                      // }
                      value={LoadingTimeEnd}
                      onChange={(e) => handleChangeloadingEnd(e.target.value)}
                    />
                  </CInputGroup>
                </div>
                <div
                  className="sub-row-7"
                  style={{ marginBottom: "8px", marginTop: "" }}
                >
                  <div className="inputdiv weight400">Driver Note</div>
                  <div className="inputdiv">
                    {/* Internal Note */}
                    <div className="column">
                      <label className="colorRed weight500">
                        <input
                          type="checkbox"
                          className=" marginL5 marginR5 "
                          checked={twinsteerOK}
                          onChange={TwinsteerHandle}
                          // onChange={(e) => HandleReadyFromAndTwinsteer("Twin")}
                        />
                        Twinsteer OK
                      </label>
                    </div>

                    <div class="column">
                      <label className="colorGreen weight500">
                        <input
                          type="checkbox"
                          className=" marginL20 marginR5 "
                          checked={ReadyFromOK}
                          //onChange={ReadyfromHandle}
                          onChange={() => ReadyFromHandleTime("R")}
                          // onChange={(e) => HandleReadyFromAndTwinsteer("Ready")}
                        />
                        ReadyFrom
                      </label>
                    </div>
                    {ReadyFromOK && (
                      <div className="column marginL20">
                        <CInputGroup>
                          <CSelect
                            size="sm"
                            value={selectedReadyFromTime}
                            onChange={(e) =>
                              ReadyFromHandleTime(
                                "D",
                                e.target.value,
                                // productTabledata.SorderHead &&
                                //   productTabledata.SorderHead.Order_date
                                //   ? productTabledata.SorderHead.Order_date.split(
                                //       "T"
                                //     )[0]
                                //   : ""
                                jobStartDate
                              )
                            }
                            // onChange={(e) =>
                            //   HandleReadyFromAndTwinsteer(
                            //     "ReadyDate",
                            //     e.target.value,
                            //     productTabledata.SorderHead
                            //       ? productTabledata.SorderHead.Order_date.split(
                            //           "T"
                            //         )[0]
                            //       : ""
                            //   )
                            // }
                          >
                            <option value=""></option>
                            <option value="05">05 am</option>
                            <option value="06">06 am</option>
                            <option value="07">07 am</option>
                            <option value="08">08 am</option>
                            <option value="09">09 am</option>
                            <option value="10">10 am</option>
                            <option value="11">11 am</option>
                            <option value="12">12 pm</option>
                            <option value="13">01 pm</option>
                            <option value="14">02 pm</option>
                            <option value="15">03 pm</option>
                            <option value="16">04 pm</option>
                            <option value="17">05 pm</option>
                          </CSelect>
                        </CInputGroup>
                      </div>
                    )}
                  </div>
                </div>
                {/* Sub-row 7 */}
                <div className="sub-row-7">
                  <div className="inputdiv">
                    <CInputGroup>
                      <textarea
                        className="form-control"
                        rows="4"
                        style={{ resize: "none" }}
                        value={
                          productTabledata.SorderHead
                            ? productTabledata.SorderHead.Special_inst
                            : ""
                        }
                        onChange={(e) =>
                          handleFieldChangesite(
                            "Special_inst",
                            e.target.value,
                            "SorderHead"
                          )
                        }
                      ></textarea>
                    </CInputGroup>
                  </div>
                  <div className="inputdiv">
                    <CInputGroup>
                      <textarea
                        className="form-control"
                        rows="4"
                        style={{ resize: "none" }}
                        value={
                          twinsteerNote +
                          (ReadyFromOK ? `\n${readyFromNote}` : "")
                        }
                      ></textarea>
                    </CInputGroup>
                  </div>
                </div>
              </div>
            </div>
          </CCol>
          <CCol md={6} style={{ marginTop: "5px" }} className="slideIn">
            <div className="dividercards">
              <CRow>
                <CCol>
                  <CTabs activeTab={activeTab} onActiveTabChange={toggleTab}>
                    <CNav variant="tabs" className="small-tabs">
                      <CNavItem className="small-tab-item">
                        <CNavLink className="small-tab-link">Order</CNavLink>
                      </CNavItem>
                      <CNavItem className="small-tab-item">
                        <CNavLink className="small-tab-link">PLT</CNavLink>
                      </CNavItem>
                      <CNavItem className="small-tab-item">
                        <CNavLink className="small-tab-link">Customer</CNavLink>
                      </CNavItem>
                    </CNav>

                    <CTabContent style={{ marginTop: "2%", height: "287px" }}>
                      <CTabPane visible={activeTab === 0}>
                        {/* Content for Site Details tab */}
                        <CRow>
                          <CCol md={6}>
                            <div>
                              <div
                                style={{
                                  //marginRight: "160px",
                                  //left: 30,
                                  // top: 85,
                                  fontStyle: "bold",
                                  fontWeight: "700",
                                  // position: "absolute",
                                  fontSize: "14px",
                                  width: "140px",
                                }}
                              >
                                <label>Order Contact</label>
                              </div>
                              {/* Sub-row 1 */}
                              <div className="inputdiv">
                                <CInputGroup>
                                  <CInputGroupText className="small-input-text">
                                    Ordered by:
                                  </CInputGroupText>
                                  <CInput
                                    type="text"
                                    size="sm"
                                    className=" inputtextdark"
                                    value={
                                      productTabledata.Otstk &&
                                      productTabledata.Otstk.CustOrderedBy
                                        ? productTabledata.Otstk.CustOrderedBy
                                        : ""
                                    }
                                    onChange={(e) =>
                                      handleFieldChangesite(
                                        "CustOrderedBy",
                                        e.target.value,
                                        "Otstk"
                                      )
                                    }
                                  />
                                </CInputGroup>
                              </div>
                              <div className="inputdiv">
                                <CInputGroup>
                                  <CInputGroupText className="small-input-text">
                                    Job Name:
                                  </CInputGroupText>
                                  <CInput
                                    type="text"
                                    size="sm"
                                    className=" inputtextdark"
                                    value={
                                      productTabledata.Otstk &&
                                      productTabledata.Otstk.JobName
                                        ? productTabledata.Otstk.JobName
                                        : ""
                                    }
                                    onChange={(e) =>
                                      handleFieldChangesite(
                                        "JobName",
                                        e.target.value,
                                        "Otstk",
                                        "uppercase"
                                      )
                                    }
                                  />
                                </CInputGroup>
                              </div>
                              {/* Sub-row 2 */}

                              {/* Sub-row 3 */}
                              <div className="inputdiv">
                                <CInputGroup>
                                  <CInputGroupText className="small-input-text">
                                    Job Description:
                                  </CInputGroupText>

                                  <textarea
                                    type="text"
                                    className="form-control"
                                    rows="2"
                                    style={{ resize: "none" }}
                                    value={
                                      productTabledata.Otstk &&
                                      productTabledata.Otstk.JobDescription
                                        ? productTabledata.Otstk.JobDescription
                                        : ""
                                    }
                                    onChange={(e) =>
                                      handleFieldChangesite(
                                        "JobDescription",
                                        e.target.value,
                                        "Otstk",
                                        "uppercase"
                                      )
                                    }
                                  />
                                </CInputGroup>
                              </div>

                              <div className="inputdiv">
                                <CInputGroup>
                                  <CInputGroupText className="small-input-text">
                                    Ordered with:
                                  </CInputGroupText>
                                  <CInput
                                    type="text"
                                    className=" inputtextdark"
                                    size="sm"
                                    value={
                                      productTabledata.Otstk &&
                                      productTabledata.Otstk.OrderedWith
                                        ? productTabledata.Otstk.OrderedWith
                                        : ""
                                    }
                                    onChange={(e) =>
                                      handleFieldChangesite(
                                        "OrderedWith",
                                        e.target.value,
                                        "Otstk",
                                        "uppercase"
                                      )
                                    }
                                  />
                                </CInputGroup>
                              </div>

                              {/* Sub-row 8 */}
                              <div className="inputdiv">
                                <CInputGroup>
                                  <CInputGroupText className="small-input-text">
                                    Time Ordered:
                                  </CInputGroupText>
                                  <CInput
                                    type="text"
                                    className=" inputtextdark"
                                    size="sm"
                                    value={
                                      productTabledata.Otstk &&
                                      productTabledata.Otstk.TimeOrdered
                                        ? productTabledata.Otstk.TimeOrdered
                                        : ""
                                    }
                                    onChange={(e) =>
                                      handleFieldChangesite(
                                        "TimeOrdered",
                                        e.target.value,
                                        "Otstk",
                                        "uppercase"
                                      )
                                    }
                                  />
                                </CInputGroup>
                              </div>
                              <div className="inputdiv">
                                <CInputGroup>
                                  <CInputGroupText className="small-input-text">
                                    Delivery Time:
                                  </CInputGroupText>
                                  <CInput
                                    type="text"
                                    size="sm"
                                    className=" inputtextdark"
                                    value={
                                      productTabledata.Otstk &&
                                      productTabledata.Otstk.DeliveryTimeFrom
                                        ? productTabledata.Otstk
                                            .DeliveryTimeFrom
                                        : ""
                                    }
                                    onChange={(e) =>
                                      handleFieldChangesite(
                                        "DeliveryTimeFrom",
                                        e.target.value,
                                        "Otstk",
                                        "uppercase"
                                      )
                                    }
                                  />
                                  -
                                  <CInput
                                    type="text"
                                    size="sm"
                                    className=" inputtextdark"
                                    // value={productTabledata.SiteAddress2}
                                    value={
                                      productTabledata.Otstk &&
                                      productTabledata.Otstk.DeliveryTimeTo
                                        ? productTabledata.Otstk.DeliveryTimeTo
                                        : ""
                                    }
                                    onChange={(e) =>
                                      handleFieldChangesite(
                                        "DeliveryTimeTo",
                                        e.target.value,
                                        "Otstk",
                                        "uppercase"
                                      )
                                    }
                                  />
                                </CInputGroup>
                              </div>
                            </div>
                          </CCol>
                          <CCol md={6}>
                            <div>
                              <div
                                style={{
                                  //marginRight: "160px",
                                  // left: 30,
                                  // top: 85,
                                  fontStyle: "bold",
                                  fontWeight: "700",
                                  // position: "absolute",
                                  fontSize: "14px",
                                  width: "140px",
                                }}
                              >
                                <label>Deliver To</label>
                              </div>
                              {/* Sub-row 1 */}

                              <div className="inputdiv">
                                <CInputGroup>
                                  <CInputGroupText className="small-input-text">
                                    Site Name:
                                  </CInputGroupText>
                                  <CInput
                                    type="text"
                                    size="sm"
                                    className=" inputtextdark"
                                    value={
                                      productTabledata.Otstk &&
                                      productTabledata.Otstk.Name
                                        ? productTabledata.Otstk.Name
                                        : ""
                                    }
                                    onChange={(e) =>
                                      handleFieldChangesite(
                                        "Name",
                                        e.target.value,
                                        "Otstk",
                                        "uppercase"
                                      )
                                    }
                                  />
                                </CInputGroup>
                              </div>
                              <div className="inputdiv">
                                <CInputGroup>
                                  <CInputGroupText className="small-input-text">
                                    Address:
                                  </CInputGroupText>
                                  <CInput
                                    type="text"
                                    size="sm"
                                    className=" inputtextdark"
                                    value={
                                      productTabledata.Otstk &&
                                      productTabledata.Otstk.SiteAddress1
                                        ? productTabledata.Otstk.SiteAddress1
                                        : ""
                                    }
                                    onChange={(e) =>
                                      handleFieldChangesite(
                                        "SiteAddress1",
                                        e.target.value,
                                        "Otstk",
                                        "uppercase"
                                      )
                                    }
                                  />
                                </CInputGroup>
                              </div>
                              <div className="inputdiv">
                                <CInputGroup>
                                  <CInputGroupText className="small-input-text">
                                    Enter via:
                                  </CInputGroupText>
                                  <CInput
                                    type="text"
                                    size="sm"
                                    className=" inputtextdark"
                                    value={
                                      productTabledata.Otstk &&
                                      productTabledata.Otstk.SiteAddress2
                                        ? productTabledata.Otstk.SiteAddress2
                                        : ""
                                    }
                                    onChange={(e) =>
                                      handleFieldChangesite(
                                        "SiteAddress2",
                                        e.target.value,
                                        "Otstk",
                                        "uppercase"
                                      )
                                    }
                                  />
                                </CInputGroup>
                              </div>
                              {/* Sub-row 4 */}

                              <div className="sub-row-4">
                                <div className="inputdiv">
                                  <CInputGroup>
                                    <CInputGroupText className="small-input-text">
                                      City
                                    </CInputGroupText>
                                    <CInput
                                      type="text"
                                      size="sm"
                                      className=" inputtextdark"
                                      value={
                                        productTabledata.Otstk &&
                                        productTabledata.Otstk.City
                                          ? productTabledata.Otstk.City
                                          : ""
                                      }
                                      onChange={(e) =>
                                        handleFieldChangesite(
                                          "City",
                                          e.target.value,
                                          "Otstk"
                                        )
                                      }
                                    />
                                  </CInputGroup>
                                </div>
                                <div className="inputdiv">
                                  <CInputGroup>
                                    <CInputGroupText className="small-input-text">
                                      State:
                                    </CInputGroupText>
                                    <CInput
                                      type="text"
                                      size="sm"
                                      className=" inputtextdark"
                                      value={
                                        productTabledata.Otstk &&
                                        productTabledata.Otstk.State
                                          ? productTabledata.Otstk.State
                                          : ""
                                      }
                                      onChange={(e) =>
                                        handleFieldChangesite(
                                          "State",
                                          e.target.value,
                                          "Otstk"
                                        )
                                      }
                                    />
                                  </CInputGroup>
                                </div>
                                <div className="inputdiv">
                                  <CInputGroup>
                                    <CInputGroupText className="small-input-text">
                                      Post Code:
                                    </CInputGroupText>
                                    <CInput
                                      type="text"
                                      size="sm"
                                      className=" inputtextdark"
                                      value={
                                        productTabledata.Otstk &&
                                        productTabledata.Otstk.Postcode
                                          ? productTabledata.Otstk.Postcode
                                          : ""
                                      }
                                      onChange={(e) =>
                                        handleFieldChangesite(
                                          "Postcode",
                                          e.target.value,
                                          "Otstk"
                                        )
                                      }
                                    />
                                  </CInputGroup>
                                </div>
                              </div>
                              {/* Sub-row 5 */}
                              <div className="sub-row-7">
                                <div className="inputdiv">
                                  <CInputGroup>
                                    <CInputGroupText className="small-input-text">
                                      Contact
                                    </CInputGroupText>
                                    <CInput
                                      type="text"
                                      size="sm"
                                      className=" inputtextdark"
                                      value={
                                        productTabledata.Otstk &&
                                        productTabledata.Otstk.Contact
                                          ? productTabledata.Otstk.Contact
                                          : ""
                                      }
                                      // value={
                                      //   productTabledata.DetailTpg &&
                                      //   productTabledata.DetailTpg.Contact
                                      //     ? productTabledata.DetailTpg.Contact
                                      //     : ""
                                      // }
                                      onChange={(e) =>
                                        handleFieldChangesite(
                                          "Contact",
                                          e.target.value,
                                          "Otstk",
                                          "uppercase"
                                        )
                                      }
                                      // onChange={(e) =>
                                      //   handleFieldChangesite(
                                      //     "Contact",
                                      //     e.target.value,
                                      //     "DetailTpg",
                                      //     "uppercase"
                                      //   )
                                      // }
                                    />
                                  </CInputGroup>
                                </div>
                                <div className="inputdiv">
                                  <CInputGroup>
                                    <CInputGroupText className="small-input-text">
                                      Mobile:
                                    </CInputGroupText>
                                    <CInput
                                      type="text"
                                      size="sm"
                                      className=" inputtextdark"
                                      value={
                                        productTabledata.Otstk &&
                                        productTabledata.Otstk.Telephone
                                          ? productTabledata.Otstk.Telephone
                                          : ""
                                      }
                                      onChange={(e) =>
                                        handleFieldChangesite(
                                          "Telephone",
                                          e.target.value,
                                          "Otstk"
                                        )
                                      }
                                      // value={
                                      //   productTabledata.DetailTpg &&
                                      //   productTabledata.DetailTpg.Telephone
                                      //     ? productTabledata.DetailTpg.Telephone
                                      //     : ""
                                      // }
                                      // onChange={(e) =>
                                      //   handleFieldChangesite(
                                      //     "Telephone",
                                      //     e.target.value,
                                      //     "DetailTpg",
                                      //     "uppercase"
                                      //   )
                                      // }
                                    />
                                  </CInputGroup>
                                </div>
                              </div>
                              {/* Sub-row 8 */}
                              <div className="sub-row-7">
                                <div className="inputdiv">
                                  <CInputGroup>
                                    <CInputGroupText className="small-input-text">
                                      Map Ref:
                                    </CInputGroupText>
                                    <CInput
                                      type="text"
                                      size="sm"
                                      className=" inputtextdark"
                                      value={
                                        productTabledata.Otstk &&
                                        productTabledata.Otstk.MapRef
                                          ? productTabledata.Otstk.MapRef
                                          : ""
                                      }
                                      onChange={(e) =>
                                        handleFieldChangesite(
                                          "MapRef",
                                          e.target.value,
                                          "Otstk"
                                        )
                                      }
                                    />
                                    {/* {productTabledata.Cust_code ||
                                    CostomerFieldData.CustomerCode ? (
                                      <FindInPageIcon
                                        className="lookupIconQuotation"
                                        onClick={() => {
                                          handleButtonClick(Qt_Mapref);
                                        }}
                                      />
                                    ) : null} */}
                                  </CInputGroup>
                                </div>

                                <div className="inputdiv">
                                  <CInputGroup>
                                    <CInputGroupText className="small-input-text">
                                      Geofence Radius (m):
                                    </CInputGroupText>
                                    <CInput
                                      type="text"
                                      size="sm"
                                      className=" inputtextdark"
                                      value={
                                        productTabledata.Otstk &&
                                        productTabledata.Otstk.CustSiteRadius
                                          ? productTabledata.Otstk
                                              .CustSiteRadius
                                          : ""
                                      }
                                      onChange={(e) =>
                                        handleFieldChangesite(
                                          "CustSiteRadius",
                                          e.target.value,
                                          "Otstk"
                                        )
                                      }
                                    />
                                  </CInputGroup>
                                </div>
                              </div>
                              <div className="inputdiv">
                                <CInputGroup>
                                  <CInputGroupText className="small-input-text">
                                    Coordinates:
                                  </CInputGroupText>
                                  <CInput
                                    type="text"
                                    size="sm"
                                    className=" inputtextdark"
                                    value={
                                      productTabledata.Otstk &&
                                      productTabledata.Otstk.Latitude
                                        ? productTabledata.Otstk.Latitude
                                        : ""
                                    }
                                    onChange={(e) =>
                                      handleFieldChangesite(
                                        "Latitude",
                                        e.target.value,
                                        "Otstk"
                                      )
                                    }
                                  />
                                  -
                                  <CInput
                                    type="text"
                                    size="sm"
                                    className=" inputtextdark"
                                    value={
                                      productTabledata.Otstk &&
                                      productTabledata.Otstk.Longitude
                                        ? productTabledata.Otstk.Longitude
                                        : ""
                                    }
                                    onChange={(e) =>
                                      handleFieldChangesite(
                                        "Longitude",
                                        e.target.value,
                                        "Otstk"
                                      )
                                    }
                                  />
                                </CInputGroup>
                              </div>
                              <div className="inputdiv"></div>
                              <div style={{ display: "flex" }}>
                                <button
                                  className="inputdivbutton"
                                  onClick={() => handleButtonClick(Qt_contacts)}
                                  style={{ marginLeft: "3px" }}
                                >
                                  Contact
                                </button>
                                {isNewJob && (
                                  <div>
                                    <button
                                      className="inputdivbutton marginL5"
                                      onClick={() =>
                                        handleButtonClick(Qt_sites)
                                      }
                                    >
                                      New Site
                                    </button>

                                    <button className="inputdivbutton marginL5">
                                      Sites
                                    </button>

                                    <button className="inputdivbutton marginL5">
                                      Save Site
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                            {/* <div>
                              <div className=""></div>
                              <button
                                className="inputdivbutton"
                                onClick={() => handleButtonClick(Qt_sites)}
                              >
                                Sites
                              </button>

                              <button className="inputdivbutton">
                                New Site
                              </button>

                              <button className="inputdivbutton">
                                Save Site
                              </button>

                              <button
                                className="inputdivbutton"
                                onClick={() => handleButtonClick(Qt_contacts)}
                              >
                                Contact
                              </button>

                              <button className="inputdivbutton">
                                ViewMap
                              </button>
                            </div> */}
                          </CCol>
                        </CRow>
                      </CTabPane>
                      <CTabPane visible={activeTab === 1}>
                        {/* Content for Notes tab */}
                        <div className="inputdiv">
                          <CInputGroup>
                            <CSelect
                              size="sm"
                              placeholder="Select Supplier"
                              value={selectedPltValue}
                              onChange={handlPLTOptionChange}
                            >
                              {supplierList.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </CSelect>
                          </CInputGroup>
                        </div>
                        <div className="inputdiv">
                          <CInputGroup>
                            <CInputGroupText className="small-input-text">
                              Supplier:
                            </CInputGroupText>
                            <CInput
                              type="text"
                              size="sm"
                              className=" inputtextdark"
                              value={supplierData.Name}
                              onChange={(e) =>
                                handleFieldChangeSupplierData(
                                  "Name",
                                  e.target.value
                                )
                              }
                            />
                          </CInputGroup>
                        </div>
                        <div className="inputdiv">
                          <CInputGroup>
                            <CInputGroupText className="small-input-text">
                              Address:
                            </CInputGroupText>
                            <CInput
                              type="text"
                              size="sm"
                              className=" inputtextdark"
                              value={supplierData.Address1}
                              onChange={(e) =>
                                handleFieldChangeSupplierData(
                                  "Address1",
                                  e.target.value
                                )
                              }
                            />
                            <CInput
                              type="text"
                              size="sm"
                              className=" inputtextdark"
                              value={supplierData.Address2}
                              onChange={(e) =>
                                handleFieldChangeSupplierData(
                                  "Address2",
                                  e.target.value
                                )
                              }
                            />
                          </CInputGroup>
                        </div>
                        <div className="sub-row-4">
                          <div className="inputdiv">
                            <CInputGroup>
                              <CInputGroupText className="small-input-text">
                                City
                              </CInputGroupText>
                              <CInput
                                type="text"
                                size="sm"
                                className=" inputtextdark"
                                value={supplierData.City}
                                onChange={(e) =>
                                  handleFieldChangeSupplierData(
                                    "City",
                                    e.target.value
                                  )
                                }
                              />
                            </CInputGroup>
                          </div>
                          <div className="inputdiv">
                            <CInputGroup>
                              <CInputGroupText className="small-input-text">
                                State:
                              </CInputGroupText>
                              <CInput
                                type="text"
                                size="sm"
                                className=" inputtextdark"
                                value={supplierData.State}
                                onChange={(e) =>
                                  handleFieldChangeSupplierData(
                                    "State",
                                    e.target.value
                                  )
                                }
                              />
                            </CInputGroup>
                          </div>
                          <div className="inputdiv">
                            <CInputGroup>
                              <CInputGroupText className="small-input-text">
                                Post Code:
                              </CInputGroupText>
                              <CInput
                                type="text"
                                size="sm"
                                className=" inputtextdark"
                                value={supplierData.Postcode}
                                onChange={(e) =>
                                  handleFieldChangeSupplierData(
                                    "Postcode",
                                    e.target.value
                                  )
                                }
                              />
                            </CInputGroup>
                          </div>
                        </div>
                        <div className="sub-row-7">
                          <div className="inputdiv">
                            <CInputGroup>
                              <CInputGroupText className="small-input-text">
                                Phone
                              </CInputGroupText>
                              <CInput
                                type="text"
                                size="sm"
                                className=" inputtextdark"
                                value={supplierData.Telephone1}
                                onChange={(e) =>
                                  handleFieldChangeSupplierData(
                                    "Telephone1",
                                    e.target.value
                                  )
                                }
                              />
                            </CInputGroup>
                          </div>
                          <div className="inputdiv">
                            <CInputGroup>
                              <CInputGroupText className="small-input-text">
                                Mobile:
                              </CInputGroupText>
                              <CInput
                                type="text"
                                size="sm"
                                className=" inputtextdark"
                                value={supplierData.Telephone2}
                                onChange={(e) =>
                                  handleFieldChangeSupplierData(
                                    "Telephone2",
                                    e.target.value
                                  )
                                }
                              />
                            </CInputGroup>
                          </div>
                        </div>

                        {/* Add your content here */}
                      </CTabPane>
                      <CTabPane visible={activeTab === 2}>
                        {/* Content for Details tab */}
                        <div className="inputdiv">
                          <CInputGroup>
                            <CInputGroupText className="small-input-text">
                              Contact:
                            </CInputGroupText>
                            <CInput
                              type="text"
                              size="sm"
                              className=" inputtextdark"
                              value={
                                productTabledata.DetailTpg &&
                                productTabledata.DetailTpg.Contact
                                  ? productTabledata.DetailTpg.Contact
                                  : ""
                              }
                              onChange={(e) =>
                                handleFieldChangesite(
                                  "Contact",
                                  e.target.value,
                                  "DetailTpg"
                                )
                              }
                            />
                          </CInputGroup>
                        </div>
                        <div className="inputdiv">
                          <CInputGroup>
                            <CInputGroupText className="small-input-text">
                              Address:
                            </CInputGroupText>
                            <CInput
                              type="text"
                              size="sm"
                              className=" inputtextdark"
                              value={
                                productTabledata.DetailTpg &&
                                productTabledata.DetailTpg.Address
                                  ? productTabledata.DetailTpg.Address
                                  : //   " , " +
                                    //   (productTabledata.DetailTpg.City
                                    //     ? productTabledata.DetailTpg.City
                                    //     : "")
                                    ""
                              }
                              onChange={(e) =>
                                handleFieldChangesite(
                                  "Address",
                                  e.target.value,
                                  "DetailTpg"
                                )
                              }
                            />
                          </CInputGroup>
                        </div>
                        {/* Sub-row 2 */}

                        {/* Sub-row 3 */}
                        <div className="inputdiv">
                          <CInputGroup>
                            <CInputGroupText className="small-input-text">
                              Email:
                            </CInputGroupText>
                            <CInput
                              type="text"
                              size="sm"
                              className=" inputtextdark"
                              value={
                                productTabledata.DetailTpg &&
                                productTabledata.DetailTpg.EmailAddress
                                  ? productTabledata.DetailTpg.EmailAddress
                                  : ""
                              }
                              onChange={(e) =>
                                handleFieldChangesite(
                                  "EmailAddress",
                                  e.target.value,
                                  "CitDetailTpgy",
                                  "uppercase"
                                )
                              }
                            />
                          </CInputGroup>
                          <CInputGroup>
                            <CInputGroupText className="small-input-text">
                              Cr Status:
                            </CInputGroupText>
                            <CInput
                              type="text"
                              size="sm"
                              className=" inputtextdark"
                              value={
                                productTabledata.DetailTpg &&
                                productTabledata.DetailTpg.CreditStatus
                                  ? productTabledata.DetailTpg.CreditStatus
                                  : ""
                              }
                              onChange={(e) =>
                                handleFieldChangesite(
                                  "EmailAddress",
                                  e.target.value,
                                  "CitDetailTpgy",
                                  "uppercase"
                                )
                              }
                            />
                          </CInputGroup>
                        </div>

                        <div className="sub-row-7">
                          <div className="inputdiv">
                            <CInputGroup>
                              <CInputGroupText className="small-input-text">
                                TelePhone
                              </CInputGroupText>
                              <CInput
                                type="text"
                                size="sm"
                                className=" inputtextdark"
                                value={
                                  productTabledata.DetailTpg &&
                                  productTabledata.DetailTpg.Telephone
                                    ? productTabledata.DetailTpg.Telephone
                                    : ""
                                }
                                onChange={(e) =>
                                  handleFieldChangesite(
                                    "Telephone",
                                    e.target.value,
                                    "DetailTpg",
                                    "uppercase"
                                  )
                                }
                              />
                            </CInputGroup>
                          </div>
                          <div className="inputdiv">
                            <CInputGroup>
                              <CInputGroupText className="small-input-text">
                                Fax:
                              </CInputGroupText>
                              <CInput
                                type="text"
                                size="sm"
                                className=" inputtextdark"
                                value={
                                  productTabledata.DetailTpg &&
                                  productTabledata.DetailTpg.Fax
                                    ? productTabledata.DetailTpg.Fax
                                    : ""
                                }
                                onChange={(e) =>
                                  handleFieldChangesite(
                                    "Fax",
                                    e.target.value,
                                    "DetailTpg"
                                  )
                                }
                              />
                            </CInputGroup>
                          </div>
                        </div>

                        {/* Add your content here */}
                      </CTabPane>
                    </CTabContent>
                  </CTabs>
                </CCol>
              </CRow>
            </div>
          </CCol>
        </CRow>
      )}
      <CRow style={{ height: "300px", marginTop: "30px" }} className="slideIn">
        <CCol md={9}>
          <Job_ProductTable
            rfid={productTabledata.Otstk ? productTabledata.Otstk.RefId : ""}
            productTabledata={productTabledata}
            Longitude={
              productTabledata.AddressModel &&
              productTabledata.AddressModel.Longitude
                ? productTabledata.AddressModel.Longitude
                : 0
            }
            Latitude={
              productTabledata.AddressModel &&
              productTabledata.AddressModel.Latitude
                ? productTabledata.AddressModel.Latitude
                : 0
            }
            onClose={closeProductTableFunctions}
            QuoteNew={cleared}
            custCode={
              productTabledata.SorderHead
                ? productTabledata.SorderHead.Cust_code
                : ""
            }
            clearfunction={HandleNewQuote}
            selectedOption={selectedOption}
          />
        </CCol>
        <CCol md={3} className="slide-left-to-right">
          <Job_payment
            PaymentDetails={productTabledata.JobCostDetail}
            SupProductDetails={selectedSupProductDetailsArry}
            QuoteNew={cleared}
            Isnew={isNewJob}
            deleted={deleted}
            clearfunction={HandleNewQuote}
          />
        </CCol>
      </CRow>

      <CRow style={{ height: "400px", marginTop: "70px" }} className="slideIn">
        <CCol>
          <Job_meterialDetails
            quoteno={productTabledata.Quote_stk_quote_no}
            SupProductData={productTabledata.MaterialList}
            SupProductDetails={selectedSupProductDetailsArry}
            uniquekey={
              selectedSupProductDetailsArry
                ? selectedSupProductDetailsArry.Agreement_no
                : ""
            }
            qouteclicked={isQouteclicked}
            QuoteNew={cleared}
            custCode={
              productTabledata.SorderHead
                ? productTabledata.SorderHead.Cust_code
                : jobCustcode
            }
            rowdeleted={HandleDeleteboolian}
            PaymentDetails={productTabledata.JobCostDetail}
            soderNo={soderNo}
            MaterialListQTNo={MaterialListQTNo}
            paymentDetailsQTNo={paymentDetailsQTNo}
            clearfunction={HandleNewQuote}
            joborderfetch={joborderfetch}
            MaterialListJobOrderLink={MaterialListJobOrderLink}
            paymentDetailsJobOrderLink={paymentDetailsJobOrderLink}
            selectedOption={selectedOption}
            MaterialListfromSorderNO={MaterialListfromSorderNO}
            setMaterialListfromSorderNO={setMaterialListfromSorderNO}
          />
        </CCol>
      </CRow>
    </div>
  );
}
