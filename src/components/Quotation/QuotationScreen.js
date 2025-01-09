// new view redesign - 2023 oct 11

/**
 * Created By Nadeesh Perera | 28th - June - 2023
 * Discription : This component  is a Main component in Quotation screen.
 * Style css - _custom.scss search by comment {quotation screen scss-- Nadeesh Perera 28th June 2023}
 */
import React, { useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTabs,
  CTabPane,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CFormGroup,
  CInput,
  CLabel,
  CSelect,
  CInputGroup,
  CInputGroupText,
} from "@coreui/react";

import printIcon from "./../../assets/icons/quotaionbtns/print.png";
import saveIcon from "./../../assets/icons/quotaionbtns/save.png";
import copyIcon from "./../../assets/icons/quotaionbtns/copyIcon.png";
import newDocIcon from "./../../assets/icons/quotaionbtns/new.png";
import customerIcon from "./../../assets/icons/quotaionbtns/customer.png";
import jobIcon from "./../../assets/icons/quotaionbtns/job.png";
import googlemapIcon from "./../../assets/icons/quotaionbtns/googlemap.png";
import maprefIcon from "./../../assets/icons/quotaionbtns/mapref.png";
import distanceMasterIcon from "./../../assets/icons/quotaionbtns/distanceMaster.png";
import supplierIcon from "./../../assets/icons/quotaionbtns/supplier.png";
import auditlogIcon from "./../../assets/icons/quotaionbtns/audit.png";
import attachdocIcon from "./../../assets/icons/quotaionbtns/attachdoc.png";
import altsummaryIcon from "./../../assets/icons/quotaionbtns/summary.png";
import fuellevyIcon from "./../../assets/icons/quotaionbtns/fuellvy.png";
import checkallIcon from "./../../assets/icons/quotaionbtns/checkall.png";
import uncheckallIcon from "./../../assets/icons/quotaionbtns/uncheckall.png";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import {
  Tooltip,
} from "@material-ui/core";
import QuotationPrint from "./QuotationPopups/QuotationPrint";
import QuotationCust from "../Master/QuotationCust";
import QuotationNo from "./QuotationPopups/QuotationNo";
import QuotationCustCode from "./QuotationPopups/Qt_CustCode";
import QuotationSuplier from "../Master/QuotationSuplier";
import QuotationDistanceMaster from "./QuotationPopups/QuotationDistanceMaster";
import QuotationMapRef from "./QuotationPopups/QuotationMapRef";
import Qt_ProductTable from "./MainPage/Qt_ProductTable";
import Qt_SelectedTable from "./MainPage/Qt_SelectedTable";
import Qt_sites from "./QuotationPopups/Qt_sites";
import Qt_contacts from "./QuotationPopups/Qt_contacts";
import Qt_Mapref from "./QuotationPopups/Qt_Mapref";
import Qt_CustCode from "./QuotationPopups/Qt_CustCode";
import { API_URL } from "src/components/util/config";
import LinearProgress from "@material-ui/core/LinearProgress";
import AlertPopup from "src/reusable/AlertPopup";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import SalesPerson from "../JobOrder/JobOderpopups/SalesPerson";
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
 // backdropFilter: "blur(5px)", // Adjust the blur radius as needed
  WebkitBackdropFilter: "blur(5px)", // For Safari
  zIndex: 9999999,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius:"8px"
};

export default function QuotationScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedOption, setSelectedOption] = useState("QUARRY");
  const [popupVisible, setPopupVisible] = useState(false);
  const [cleared, setcleared] = useState(false);
  const [fetchSelectedProducts, setfetchSelectedProducts] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null); // Store selected component
  const [rowVisibility, setRowVisibility] = useState([
    true, // First row's visibility
  ]);
  const [rowIcons, setRowIcons] = useState([<ExpandLessIcon />]);
  const [productTabledata, setProductTabledata] = useState([]);
  const [CostomerFieldData, setCostomerFieldData] = useState([]);
  const [CostomerlookUpData, setCustomerData] = useState([]);
  const [isCustcodeIncluded, setIsCustcodeIncluded] = useState(true);
  // const [expDate, setExpDate] = useState("");
  const [quoteno, setQuoteno] = useState("");
  const [custCode, setCustCode] = useState("");
  const mapRefCode = sessionStorage.getItem("selectedMaprefCode");
  const address = sessionStorage.getItem("selectedMaprefAddress");
  const [savebody, setSaveBody] = useState({});
  const [loading, setLoading] = useState(false);
  const [expDate, setExpDate] = useState("");
  const [status, setstatus] = useState("N");
  const [statusOptions, setStatusOptions] = useState([]);
  const [rejectedReason, setRejectedReason] = useState("");
  const [rejectedReasonDsc, setRejectedReasonDsc] = useState("");
  const [rejectedReasonOptions, setRejectedReasonOptions] = useState([]);
  const [selectedstatusOption, setSelectedstatusOption] = useState("");
  const [quoteDate, setQuoteDate] = useState("");
  const [hireStartDate, setHireStartDate] = useState("");
  const [quoteValidity, setQuoteValidity] = useState(0);
  const followUpDate = moment().format("YYYY-MM-DD");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertmsg, setAlertmsg] = useState("");

  const [copyClicked, setCopyClicked] = useState(false);
  const [createClicked, setCreateJobClicked] = useState(false);
  const tooltipContent = copyClicked ? "Quote Copied" : "Copy Quote";
  const [isSaveInProgress, setIsSaveInProgress] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [alertTitle, setAlertTitle] = useState("");

  // value={
  //   productTabledata.Quote_date
  //     ? new Date(productTabledata.Quote_date)
  //         .addDays(productTabledata.Quote_validity) // Assuming you have a function to add days
  //         .toISOString()
  //         .split("T")[0]
  //     : ""
  // }

  // const selectedSupProductDetails = sessionStorage.getItem(
  //   "selectedSupplierProduct"
  // );
  const [selectedSupProductDetailsArry, setSelectedSupProductDetailsArry] =
    useState([]);

  const toggleTab = (index) => {
    if (activeTab !== index) {
      setActiveTab(index);
    }
  };
  //radio button handle
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  // popup handle
  const handleButtonClick = (component) => {
    setSelectedComponent(() => component); // Set the selected component
    setPopupVisible(true);
    // Show the popup
  };

  const handleButtonClickCustCode = (component) => {
    if (Array.isArray(CostomerlookUpData)) {
      const isCustCodeIncluded = CostomerlookUpData.some(
        (item) => item.Code === productTabledata.Cust_code
      );
      // setIsCustcodeIncluded(isCustCodeIncluded);
      console.log(
        "isCustCodeIncluded",
        isCustCodeIncluded,
        productTabledata.Cust_code
      );
      if (isCustCodeIncluded) {
        setSelectedComponent(() => QuotationNo);
        setPopupVisible(true);
        setfetchSelectedProducts(false);
      } else {
        setSelectedComponent(() => component);
        setPopupVisible(true);
      }
    } else {
      console.error("CostomerFieldData is not an array");
      setSelectedComponent(() => component);
      setPopupVisible(true);
    }

    // Show the popup
  };
  const handleButtonClickQuoteNO = (component) => {
    if (
      productTabledata?.Quote_no === 0 &&
      productTabledata?.Cust_code === ""
    ) {
      setSelectedComponent(() => component); // Set the selected component
      setPopupVisible(true);
      setfetchSelectedProducts(false);
    } else {
      if (window.confirm("Clear screen without saving current Order?")) {
        setSelectedComponent(() => component); // Set the selected component
        setPopupVisible(true);
        handleNewQuotation("1");
        setfetchSelectedProducts(false);
      } else {
        return;
        // Optional: Log a message if the user cancels
      }
    }
    // Check if the user confirmed

    // Show the popup
  };

  const closePopup = () => {
    // triger when  lookup closed default
    setSelectedComponent(""); // Clear the selected component
    setPopupVisible(false); // Close the popup
  };

  const closePopupSalesPerson = () => {
    // triger when  lookup closed default
    const salesPerson = sessionStorage.getItem("salesPerson");

    setProductTabledata((prevProductTabledata) => ({
      ...prevProductTabledata,
      Sales_person: salesPerson,
    }));
    setSelectedComponent(""); // Clear the selected component
    setPopupVisible(false); // Close the popup
  };
  const closePopupContact = () => {
    // triger when  lookup closed default
    const contact = sessionStorage.getItem("selectedContact");
    const telephone = sessionStorage.getItem("selectedTelephone");

    setProductTabledata((prevProductTabledata) => ({
      ...prevProductTabledata,
      Site_mobile: telephone,
      AddressModel: {
        Contact: contact,
      },
    }));
    setSelectedComponent(""); // Clear the selected component
    setPopupVisible(false); // Close the popup
  };
  const closePopupQuoteNo = () => {
    const quoteno = JSON.parse(sessionStorage.getItem("selectedQuoteNo"));
    setQuoteno(quoteno);
    // triger when Qt_QuoteNo lookup closed
    setSelectedComponent(""); // Clear the selected
    setPopupVisible(false); // Close the popup
    GetproductTableData(quoteno);
    setfetchSelectedProducts(true);
    setQuoteDate(productTabledata.Quote_date);
    setExpDate(productTabledata.Follup_date);
  };
  const closePopupCustNo = () => {
    const custCode = sessionStorage.getItem("selectedCustCode");
    // setCustCode(custCode);
    // triger when Qt_custNo lookup closed
    setSelectedComponent(""); // Clear the selected
    setPopupVisible(false); // Close the popup
    GetCustomerCodeData(custCode); // Close the popup

    // console.log("productTabledata", productTabledata);
  };

  const closePopupMapRef = () => {
    // triger when Qt_mapRef lookup closed
    setSelectedComponent(""); // Clear the selected
    setPopupVisible(false); // Close the popup
    GetMapRefId(); // Close the popup
    // console.log("productTabledata", productTabledata);
  };
  const closeProductTableFunctions = () => {
    const selectedSupProductDetails = sessionStorage.getItem(
      "selectedSupplierProduct"
    );
    if (selectedSupProductDetails) {
      // Parse the JSON string back to an array
      const rowDetails = JSON.parse(selectedSupProductDetails);
      setSelectedSupProductDetailsArry(rowDetails);
      // Now, rowDetails contains the original array
    } // Close the popup
    // console.log("productTabledata", productTabledata);
  };

  const GetproductTableData = (quoteno) => {
    // const quoteno = JSON.parse(sessionStorage.getItem("selectedQuoteNo"));
    // setQuoteno(quoteno);
    fetch(`${API_URL}quotation/getquotation?quoteno=${quoteno}`)
      .then((response) => response.json())
      .then((data) => {
        const productTableData = data.ResultSet[0];
        if (productTableData === null) {
          setAlertType("error");
          setAlertMessage("invalid Quote Number !");
          setShowAlert(true);
          //window.alert("invalid Quote Number !");
          handleNewQuotation();
          return;
        }
        setProductTabledata(productTableData);
        setCopyClicked(false);
        setQuoteDate(productTableData.Quote_date);
        const formattedExpiryDate = moment(productTableData.Expiry_date).format(
          "YYYY-MM-DD"
        );

        setExpDate(formattedExpiryDate);
        const formattedHireStartDate = moment(
          productTableData.Expiry_date
        ).format("YYYY-MM-DD");
        setHireStartDate(formattedHireStartDate);

        setQuoteValidity(productTableData.Quote_validity);
        console.log("quoteValidity", quoteValidity);
        setstatus(productTableData.Status);
        setSelectedOption(productTableData.Quote_type);
        sessionStorage.setItem("QouteGroup", productTableData.Quote_type);
        setfetchSelectedProducts(false);
      })
      .catch((error) => {
        console.error("Error fetching data from the API:", error);
        setfetchSelectedProducts(false);
      });
  };

  const GetCustomerCodeData = (custCode) => {
    //const custCode = sessionStorage.getItem("selectedCustCode");
    const Token = localStorage.getItem("AccessToken");
    // setCustCode(custCode);
    fetch(`${API_URL}customer/getcustomerbyid?custcode=${custCode}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          localStorage.removeItem("AccessToken");
          window.location.reload(true);

          throw new Error("Unauthorized access - 401");
        }
        return response.json();
      })
      .then((data) => {
        const customerFieldData = data.ResultSet[0];
        if (customerFieldData === null) {
          // IF CUST CODE is not availble or wrong then need to open cust lookup
          handleButtonClickCustCode(QuotationCustCode);
          //handleNewQuotation("N");
          return;
        }
        setCostomerFieldData(customerFieldData);
        const Custcode = customerFieldData.CustomerCode;
        setProductTabledata((prevProductTabledata) => ({
          ...prevProductTabledata,
          Cust_code: Custcode,
        }));
        setTimeout(() => {
          setSelectedComponent(() => QuotationNo);
          setPopupVisible(true);
          setfetchSelectedProducts(false);
        }, 1000);

        // Assuming data is an array of objects like you provided
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
            AddressModel: {
              ...prevProductTabledata.AddressModel,
              Address1: address1,
            },
          }));
        } else if (returnMsg != "") {
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
              AddressModel: {
                ...prevProductTabledata.AddressModel,
                Address1: address1,
              },
            }));
          } else {
            setProductTabledata((prevProductTabledata) => ({
              ...prevProductTabledata,
              Ref_id: "",
              Map_ref: "",
              Site_address1: "",
              AddressModel: {
                ...prevProductTabledata.AddressModel,
                Address1: "",
              },
            }));
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching data from the API:", error);
      });
  };

  const toggleRowVisibility = (index) => {
    const newRowVisibility = [...rowVisibility];
    newRowVisibility[index] = !newRowVisibility[index];
    setRowVisibility(newRowVisibility);

    const newRowIcons = [...rowIcons];
    newRowIcons[index] = newRowVisibility[index] ? (
      <ExpandLessIcon />
    ) : (
      <ExpandMoreIcon />
    );
    setRowIcons(newRowIcons);
  };

  const handleNewQuotation = (value) => {
    if (productTabledata?.Cust_code != "" && !value) {
      const confirmed = window.confirm("Clear without saving Quotation ?");
      if (!confirmed) {
        return;
      }
    }
    sessionStorage.setItem("qoutenew", true);

    // const expDate = moment().add(30, "days").format("YYYY-MM-DD");
    // setExpDate(expDate);
    setQuoteValidity(30);
    setcleared(true);
    const cleared_data = {
      Quote_no: 0,
      Quote_date: "",
      Company: "",
      Cust_code: "",
      Cust_name: "",
      Address1: "",
      Address2: "",
      City: "",
      State: "",
      Contact_name: "",
      Email_Address: "",
      Assignee_no: "",
      Site_name: "",
      Site_address1: "",
      Site_address2: "",
      Site_city: "",
      Site_state: "",
      Project_name: "",
      Hire_type: "",
      Hire_start_date: "",
      Hire_period: "",
      Quote_validity: "",
      Special_inst: "",
      Site_requirements: "",
      Follup_date: "",
      Status: "N",
      Rejected_reason: "",
      Sales_person: "",
      Postcode: "",
      Quote_notes: "",
      Map_ref: "",
      Ref_id: "",
      Is_legacy: "",
      Cust_phone: "",
      Cust_mobile: "",
      Site_phone: "",
      Site_mobile: "",
      Site_email: "",
      Quote_type: "",
      Cust_order_no: "",
      Rejected_reason_code: "",
      OpenSiteSelection: false,
      Name: "", //  cutomeref
      EmailAddress: "", //cutomRef
      Contact: "", //cutomRef
      CustomerCode: "", //cutomRef
      PostCode: "", //cutomRef
      Telephone: "",
      AddressModel: {
        Address1: "",
        Address2: "",
        Address_code: null,
        Address_type: null,
        Area_code: "",
        Assign_to: null,
        Assignee_code: "",
        Assignee_no: "",
        Charge_markup: 0.0,
        City: "",
        Clientpaylunch: 0.0,
        Clientpaysmoko: 0.0,
        Clientpaytravelling: 0.0,
        Contact: "",
        Country: null,
        Crib_allow: null,
        Def_warehouse: null,
        Default_end_time: "",
        Default_start_time: "",
        Dest_area: null,
        Fax: null,
        Lunch_allow: null,
        Min_hours_mf_dry: 0.0,
        Min_hours_mf_lab: 0.0,
        Min_hours_mf_wet: 0.0,
        Min_hours_we_dry: 0.0,
        Min_hours_we_lab: 0.0,
        Min_hours_we_wet: 0.0,
        Modified_by: null,
        Modified_date: "",
        Name: "",
        Postcode: null,
        Service_allow: null,
        Smoko_allow: null,
        State: "",
        Status: null,
        Supp_cust_no: 0,
        Telephone: "",
        Toolbox_allow: null,
        Travel_allow: null,
        Weather_allow: null,
        Cust_site_radius: 0,
        Latitude: 0,
        Longitude: 0,
        Ref_id: 0,
        Spinst: "",
        Parent_customer: null,
        Credit_status: null,
        Parent_code: null,
        Mobile: null,
        Email_address: null,
      },
      SecondContactModel: [
        {
          Contact: "",
          Telephone: "",
        },
      ],
    };
    setProductTabledata(cleared_data);
    setCostomerFieldData(cleared_data);
    sessionStorage.setItem("selectedMaprefCode", "");
    sessionStorage.setItem("selectedQuoteNo", "");
    sessionStorage.setItem("selectedMaprefAddress", "");
    sessionStorage.setItem("selectedSupplierProduct", "");
    sessionStorage.setItem("selectedCustCode", "");
    sessionStorage.setItem("savemodelSelectedProducts", []);
    sessionStorage.setItem("refid", "");
    localStorage.setItem("QouteNofromJob", "");
    //
    setQuoteDate("");
    setQuoteno("");
    setHireStartDate("");
    setstatus("N");
    setCopyClicked(false);

    //setQuoteno(0);
    const Quote_date = moment().format("YYYY-MM-DD");
    const QuoteExp_date = moment(Quote_date)
      .add(30, "days")
      .format("YYYY-MM-DD");
    setQuoteDate(Quote_date);
    setExpDate(QuoteExp_date);
    setHireStartDate(Quote_date);
    setTimeout(() => {
      setcleared(false);
    }, 200);

    console.log("cleared", cleared);
  };

  // Update the Postcode value in the state when the input changes
  const handleFieldChange = (fieldName, value, fieldname2, fontType) => {
    if ((fontType = "uppercase")) {
      const newvalue = value.toUpperCase();
      setProductTabledata({
        ...productTabledata,
        [fieldName]: newvalue,
      });
      setCostomerFieldData({
        ...CostomerFieldData,
        [fieldname2]: newvalue,
      });
    } else {
      setProductTabledata({
        ...productTabledata,
        [fieldName]: value,
      });
      setCostomerFieldData({
        ...CostomerFieldData,
        [fieldname2]: value,
      });
    }
  };
  const handleFieldChangesite = (fieldName, value) => {
    if (productTabledata.AddressModel) {
      const updatedAddressModel = { ...productTabledata.AddressModel };
      // Update the specific field
      updatedAddressModel[fieldName] = value;
      setProductTabledata({
        ...productTabledata,
        AddressModel: updatedAddressModel,
      });
    } else {
      setProductTabledata({
        ...productTabledata,
        AddressModel: {
          [fieldName]: value,
        },
      });
    }
  };

  Date.prototype.addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  useEffect(() => {
    const QouteGroup = sessionStorage.getItem("QouteGroup");
    const QouteNofromjob = localStorage.getItem("QouteNofromJob");
    if (QouteNofromjob) {
      setProductTabledata([]);
      GetproductTableData(QouteNofromjob);
      setQuoteno(QouteNofromjob);
      setfetchSelectedProducts(true);
      //  GetproductTableData(QouteNofromjob);
      // return;
    }
    setSelectedOption(QouteGroup);
    // Fetch data from the API
    fetch(`${API_URL}quotation/lookup?tableID=QOST`)
      .then((response) => response.json())
      .then((data) => {
        //const statusoption = data.ResultSet;
        const statusoption = data.ResultSet.filter(
          (option) => option.Code !== "."
        );
        statusoption.unshift({ Code: "", Description: "" });
        // Assuming data is an array of objects like you provided
        setStatusOptions(statusoption);
      })
      .catch((error) => {
        console.error("Error fetching data from the API:", error);
      });

    fetch(`${API_URL}quotation/lookup?tableID=QORJ`)
      .then((response) => response.json())
      .then((data) => {
        //const statusoption = data.ResultSet;
        const rejectedR = data.ResultSet.filter(
          (option) => option.Code !== "."
        );
        rejectedR.unshift({ Code: "", Description: "select Rejected Reason" });
        // Assuming data is an array of objects like you provided
        setRejectedReasonOptions(rejectedR);
      })
      .catch((error) => {
        console.error("Error fetching data from the API:", error);
      });

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

    const Quote_date = moment().format("YYYY-MM-DD");
    const QuoteExp_date = moment(Quote_date)
      .add(30, "days")
      .format("YYYY-MM-DD");
    setQuoteDate(Quote_date);
    setExpDate(QuoteExp_date);
    handleNewQuotation("N");
    if (QouteNofromjob) {
      setProductTabledata([]);
      GetproductTableData(QouteNofromjob);
      setQuoteno(QouteNofromjob);
      setfetchSelectedProducts(true);
      //  GetproductTableData(QouteNofromjob);
      // return;
    }
  }, []);
  const handlStatusOptionChange = (e) => {
    const selectedOption = e.target.value;
    setstatus(selectedOption);
    //setSelectedstatusOption(selectedOption);
  };
  const handleRejectedReasonChange = (e) => {
    const selectedOption = e.target.value;
    const selectedOptionDesc = e.target.options[e.target.selectedIndex].label;
    setRejectedReason(selectedOption);
    console.log("e", selectedOptionDesc);
    setRejectedReasonDsc(selectedOptionDesc);
    //setSelectedstatusOption(selectedOption);
  };

  const saveQuotation = (svalue) => {
    setLoading(true);

    console.log(sessionStorage.getItem("QouteGroup"));

    if (!quoteDate) {
      setAlertType("warning");
      setAlertMessage("please select a Date ");
      setShowAlert(true);
      //window.alert("please select a Date ");
      setLoading(false);
      return;
    }
    if (!hireStartDate) {
      setAlertType("warning");
      setAlertMessage("please select a Delivery Date");
      setShowAlert(true);
      //window.alert("please select a Delivery Date");
      setLoading(false);
      return;
    }
    const savemodelSelectedProductsString = sessionStorage.getItem(
      "savemodelSelectedProducts"
    );

    let savemodelQoutation;

    if (savemodelSelectedProductsString) {
      // If sessionStorage.getItem("savemodelSelectedProducts") is not null or undefined
      savemodelQoutation = JSON.parse(savemodelSelectedProductsString);
    } else {
      // If sessionStorage.getItem("savemodelSelectedProducts") is null or undefined
      // Handle the null case here, for example, set savemodelQoutation to an empty object or an appropriate default value
      savemodelQoutation = {};
    }

    if (status === "U" && rejectedReason === "") {
      setAlertType("warning");
      setAlertMessage("Please select a rejected reason!!");
      setShowAlert(true);
      //window.alert("Please select a rejected reason!!");
      setLoading(false);
      return;
    }

    //setSelectedOption(sessionStorage.getItem("QouteGroup"));
    var QouteGroup = sessionStorage.getItem("QouteGroup");
    let Qoutetype = "Q";
    if (QouteGroup === "QUARRY") {
      Qoutetype = "Q";
    }
    if (QouteGroup === "ASPHALT") {
      Qoutetype = "A";
    }
    if (QouteGroup === "SERVICE") {
      Qoutetype = "S";
    }
    if (QouteGroup === "GARDEN") {
      Qoutetype = "G";
    }
    if (QouteGroup === "CONCRETE") {
      Qoutetype = "C";
    }
    console.log("Qoutetype", Qoutetype, QouteGroup);
    let quote_Permission = false;

    // Now you can use savemodelQoutation in the rest of your code

    // Your array of objects

    // // Model object with original field names
    // const modelObject = {
    //   Catlog_code: "",
    //   Catlog_desc: "",
    //   Demob_charge: 0,
    //   Mobi_charge: 0,
    //   Order_qty: 0,
    //   Quote_item_no: 0,
    //   Quote_no: 0,
    //   Quote_qty: 0,
    //   Rate: 0,
    //   Rate_Inc_Gst: 0,
    //   Special_inst: "",
    //   Uom: "",
    //   Mobi_uom: "",
    //   Mobi_min_hr: 0,
    //   Demob_uom: "",
    //   Demob_min_hr: 0,
    //   Base_hrs: "",
    //   Base_hrs_desc: "",
    //   Product_cost: 0,
    //   Product_tot: 0,
    //   Product_profit: 0,
    //   Product_sell: 0,
    //   Cartage_cost: 0,
    //   Cartage_tot: 0,
    //   Cartage_profit: 0,
    //   Cartage_sell: 0,
    //   Supplier_code: "",
    //   Supplier_store: "",
    //   Truck_type: "",
    //   Distance_meters: 0,
    //   Short_qty: 0,
    //   Short_fee: 0,
    //   Map_ref: "",
    //   Name: "",
    //   Gst_override: 0,
    //   Is_available: 0,
    //   IsDistacechange: false,
    //   IsProductcostchange: false,
    // };

    // Function to map values to the model object field names with custom changes
    // const mappingConfig = [
    //   { source: "Catalog_code", target: "Catlog_code" },
    //   { source: "Description", target: "Catlog_desc" },
    //   { source: "Supplier_name", target: "Name" },
    //   { source: "Distance", target: "Distance_meters" },
    //   { source: "Supplier_code", target: "Supplier_store" },
    //   { source: "Uom_order", target: "Uom" },
    //   { source: "Truck_type", target: "Truck_type" },
    //   { source: "Cartage_cost", target: "Cartage_cost" },
    //   { source: "Map_reference", target: "Map_ref" },
    //   { source: "Quote_qty", target: "Quote_qty" },
    //   { source: "Short_qty", target: "Short_qty" },
    //   { source: "Cartage_profit", target: "Cartage_profit" },
    //   // { source: "Cartage_sell", target: "Cartage_sell" },
    //   // { source: "Is_available", target: "Is_available" },
    //   // { source: "Is_available", target: "Is_available" },
    //   // { source: "Is_available", target: "Is_available" },
    //   // { source: "Is_available", target: "Is_available" },
    //   // { source: "Is_available", target: "Is_available" },
    //   // { source: "Is_available", target: "Is_available" },
    //   // Add more mappings as needed
    // ];

    // const mapValuesToModel = (obj) => {
    //   const newObj = {};

    //   // Check if "Supplier_name" is available in the row
    //   if (obj.hasOwnProperty("Supplier_name")) {
    //     mappingConfig.forEach((mapping) => {
    //       newObj[mapping.target] = obj.hasOwnProperty(mapping.source)
    //         ? obj[mapping.source]
    //         : modelObject[mapping.target];
    //     });
    //   } else {
    //     // If "Supplier_name" is not available, use default mapping for all fields
    //     for (const key in modelObject) {
    //       newObj[key] = obj.hasOwnProperty(key) ? obj[key] : modelObject[key];
    //     }
    //   }

    //   return newObj;
    // };

    // const newArray = savemodelQoutation.map(mapValuesToModel);
    // // array mamping
    // console.log(newArray);

    const saveQuoteBody = {
      Quote_no: productTabledata.Quote_no ? productTabledata.Quote_no : 0,
      Quote_date: quoteDate,
      Company: "ESQ",
      Cust_code: productTabledata.Cust_code
        ? productTabledata.Cust_code
        : CostomerFieldData.CustomerCode,
      Cust_name: productTabledata.Cust_name
        ? productTabledata.Cust_name
        : CostomerFieldData.Name,
      Address1: productTabledata.Address1,
      Address2: productTabledata.Address1,
      City: productTabledata.Site_city
        ? productTabledata.Site_city
        : CostomerFieldData.City,
      State: productTabledata.State
        ? productTabledata.State
        : CostomerFieldData.State,
      Contact_name: productTabledata.Contact_name
        ? productTabledata.Contact_name
        : CostomerFieldData.Name,
      Email_Address: productTabledata.Email_Address
        ? productTabledata.Email_Address
        : CostomerFieldData.EmailAddress,
      Assignee_no: productTabledata.Assignee_no
        ? productTabledata.Assignee_no
        : 0,
      Site_name: productTabledata.Site_name,
      Site_address1: productTabledata.Site_address1,
      Site_address2: "",
      Site_city: productTabledata.Site_city
        ? productTabledata.Site_city
        : CostomerFieldData.City,
      Site_state: "",
      Project_name: productTabledata.Project_name,
      Hire_type: "D",
      Hire_start_date: hireStartDate,
      Hire_period: 0,
      Quote_validity: quoteValidity,
      Special_inst: productTabledata.Special_inst,
      Site_requirements: productTabledata.Site_requirements,
      Follup_date: followUpDate,
      Status: status,
      Rejected_reason: rejectedReasonDsc,
      Sales_person: productTabledata.Sales_person,
      Postcode: productTabledata.Postcode
        ? productTabledata.Postcode
        : CostomerFieldData.PostCode,
      Quote_notes: productTabledata.Quote_notes,
      Map_ref: productTabledata.Map_ref,
      Ref_id: productTabledata.Ref_id,
      Is_legacy: 0,
      Cust_phone: productTabledata.Cust_phone
        ? productTabledata.Cust_phone
        : CostomerFieldData.Telephone,
      Cust_mobile: productTabledata.Cust_mobile
        ? productTabledata.Cust_mobile
        : CostomerFieldData.Contact,
      Site_phone: productTabledata.Sales_person,
      Site_mobile: productTabledata.Site_mobile,
      Site_email: productTabledata.Site_email,
      Quote_type: Qoutetype,
      Cust_order_no: "",
      Rejected_reason_code: rejectedReason,
      OpenSiteSelection: false,
      AddressModel: {
        Address1: productTabledata.Site_address1,
        Address2: "",
        Address_code: null,
        Address_type: null,
        Area_code: "",
        Assign_to: null,
        Assignee_code: "",
        Assignee_no: 0,
        Charge_markup: 0.0,
        City: "",
        Clientpaylunch: 0.0,
        Clientpaysmoko: 0.0,
        Clientpaytravelling: 0.0,
        Contact:
          productTabledata.AddressModel && productTabledata.AddressModel.Contact
            ? productTabledata.AddressModel.Contact
            : "",
        Country: null,
        Crib_allow: null,
        Def_warehouse: null,
        Default_end_time: "",
        Default_start_time: "",
        Dest_area: null,
        Fax: null,
        Lunch_allow: null,
        Min_hours_mf_dry: 0.0,
        Min_hours_mf_lab: 0.0,
        Min_hours_mf_wet: 0.0,
        Min_hours_we_dry: 0.0,
        Min_hours_we_lab: 0.0,
        Min_hours_we_wet: 0.0,
        Modified_by: null,
        Modified_date: "",
        Name: productTabledata.AddressModel.Name,
        Postcode: null,
        Service_allow: null,
        Smoko_allow: null,
        State: "",
        Status: null,
        Supp_cust_no: 0,
        Telephone: "",
        Toolbox_allow: null,
        Travel_allow: null,
        Weather_allow: null,
        Cust_site_radius: productTabledata.AddressModel.Cust_site_radius
          ? productTabledata.AddressModel.Cust_site_radius
          : 0,
        Latitude:
          productTabledata.AddressModel &&
          productTabledata.AddressModel.Latitude
            ? productTabledata.AddressModel.Latitude
            : 0,
        Longitude:
          productTabledata.AddressModel &&
          productTabledata.AddressModel.Longitude
            ? productTabledata.AddressModel.Longitude
            : 0,
        Ref_id: 0,
        Spinst: null,
        Parent_customer: null,
        Credit_status: null,
        Parent_code: null,
        Mobile: null,
        Email_address: null,
      },
      SecondContactModel: productTabledata.SecondContactModel,
      QuotationDetailModel: savemodelQoutation,
    };
    if (productTabledata.Ref_id != "") {
      var refid = productTabledata.Ref_id;
    } else {
      var refid = sessionStorage.getItem("refid");
    }
    if (hireStartDate === "") {
      setAlertType("warning");
      setAlertMessage("Hire start Date cannot be empty");
      setShowAlert(true);
      //indow.alert("Hire start Date cannot be empty");
      setLoading(false);
    } else {
      fetch(
        // nadeesh feb 9 2024 updated -->
        //http://localhost:8322/api/quotation/savequote?quoteno=0&refid=384774&permision=false&originator=peercore&sorderno=0&status=U
        // `${API_URL}quotation/savequote?refid=${refid}&permision=false&sorderno=0&status=${status}`,
        `${API_URL}quotation/savequote?quoteno=${productTabledata.Quote_no}&refid=${refid}&permision=${quote_Permission}&originator=peercore&sorderno=0&status=${status}`,

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
          const rtcount = data.ReturnCount;
          const msg = data.ReturnMessage[0];
          console.log(msg);
          if (rtcount != -1 && !svalue) {
            //window.alert(msg);
            setAlertType("success");
            setAlertMessage(msg);
            setShowAlert(true);
          }
          setLoading(false);

          if (
            rtcount === -1
            // "At least one product has zero distance. Do you want to proceed anyway?"
          ) {
            if (window.confirm(msg)) {
              setLoading(true);

              fetch(
                `${API_URL}quotation/savequote?quoteno=${productTabledata.Quote_no}&refid=${refid}&permision=true&originator=peercore&sorderno=0&status=${status}`,
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
                  const quoteno = data.ReturnValue;
                  setProductTabledata((prevProductTabledata) => ({
                    ...prevProductTabledata,
                    Quote_no: quoteno,
                  }));
                  if (!svalue) {
                    setAlertType("info");
                    setAlertMessage(msg);
                    setShowAlert(true);
                    //window.alert(msg);
                  }

                  setTimeout(() => {
                    if (quoteno) {
                      GetproductTableData(quoteno);
                    }
                    // Set loading to false once the task is completed
                  }, 2000);
                  setLoading(false);
                  return;
                });
            } else {
              return;
              // Handle the case where the user clicked cancel in the confirmation dialog
            }
          }

          const quoteno = data.ReturnValue;
          console.log("quoteno", quoteno);
          setProductTabledata((prevProductTabledata) => ({
            ...prevProductTabledata,
            Quote_no: quoteno,
          }));
          setTimeout(() => {
            if (quoteno) {
              GetproductTableData(quoteno);
            }
            // Set loading to false once the task is completed
          }, 2000);
          // GetproductTableData(quoteno);
          //
        })
        .catch((err) => {
          console.log(err.message);
          console.error("Error during saveQuotation:", err);
          setLoading(false);
        });
    }
  };

  const calculateExpirationDate = (quoteDate, quoteValidity) => {
    const parsedQuoteDate = moment(quoteDate);
    const expirationDate = parsedQuoteDate.add(quoteValidity, "days");
    setExpDate(expirationDate);
    // return expirationDate.toDate();
  };

  const dateValidity = (value) => {
    const expirationDate = moment(quoteDate)
      .add(value, "days")
      .format("YYYY-MM-DD");
    setExpDate(expirationDate);
    setQuoteValidity(value);
  };
  const setQuoteExpDate = (value) => {
    const parsedValue = moment(value, "YYYY.MM.DD");
    const parsedQuoteDate = moment(quoteDate, "YYYY.MM.DD");

    // Subtract parsedQuoteDate from parsedValue to get the date difference
    const dateGap = parsedValue.diff(parsedQuoteDate, "days");
    setQuoteValidity(dateGap);
    console.log("dategP", dateGap);
    setExpDate(value);
  };
  // const handleCopy = () => {
  //   setCopyClicked(true);
  //   const savedModelMaterialListObject = sessionStorage.getItem(
  //     "savemodelSelectedProducts"
  //   );

  //   const savedModelMaterialList = JSON.parse(savedModelMaterialListObject);

  //   const updatedMaterialList = savedModelMaterialList.map((item) => ({
  //     ...item,
  //     Quote_no: "0",
  //   }));

  //   sessionStorage.setItem(
  //     "savemodelSelectedProducts",
  //     JSON.stringify(updatedMaterialList)
  //   );

  //   const Quote_date = moment().format("YYYY-MM-DD");
  //   const expDate = moment().add(30, "days").format("YYYY-MM-DD");
  //   setExpDate(expDate);
  //   setQuoteValidity(30);
  //   setstatus("N");
  //   // setQuoteDate(Quote_date);
  //   setProductTabledata((prevProductTabledata) => ({
  //     ...prevProductTabledata,
  //     Quote_no: 0,
  //     Quote_date: Quote_date,
  //     Status: "N",
  //     // AddressModel: {
  //     //   Contact: contact,
  //     // },
  //   }));

  // };
  const handleCopy = () => {
    setCopyClicked(true);
    const savedModelMaterialListObject = sessionStorage.getItem(
      "savemodelSelectedProducts"
    );

    // Check if savedModelMaterialListObject is not null or undefined
    if (savedModelMaterialListObject) {
      const savedModelMaterialList = JSON.parse(savedModelMaterialListObject);

      const updatedMaterialList = savedModelMaterialList.map((item) => ({
        ...item,
        Quote_no: "0",
      }));

      sessionStorage.setItem(
        "savemodelSelectedProducts",
        JSON.stringify(updatedMaterialList)
      );

      const Quote_date = moment().format("YYYY-MM-DD");
      const expDate = moment().add(30, "days").format("YYYY-MM-DD");
      setHireStartDate(Quote_date);
      setQuoteDate(Quote_date);
      setExpDate(expDate);
      setQuoteValidity(30);
      setstatus("N");
      setProductTabledata((prevProductTabledata) => ({
        ...prevProductTabledata,
        Quote_no: 0,
        Quote_date: Quote_date,
        Status: "N",
      }));
    } else {
      console.error("No saved model found in session storage");
    }

    // Reset the CopyClicked flag
    // setCopyClicked(false);
  };

  const handleKeyPressQuote = (e, value) => {
    //setSorderNo(value);
    if (e.key === "Enter") {
      e.preventDefault();
      //  setisQouteclicked(true);
      //const Qouteno = sessionStorage.getItem("selectedQuoteNo");
      // setSelectedComponent("");
      setProductTabledata([]);
      GetproductTableData(value);
      setQuoteno(value);
      setfetchSelectedProducts(true);

      //   GetJobOrderFromJobOrder(value);
      //api call
    }
  };
  const handleKeyPressCust = (e, value) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // GetproductTableData(value);
      GetCustomerCodeData(value);
    }
  };
  const handleKeyPressMapref = (e, value) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // GetproductTableData(value);
      //GetCustomerCodeData(value);
    }
  };
  const handleSaveBeforecreatejob = (e) => {
    setstatus("S");
    const savemodelSelectedProductsString = sessionStorage.getItem(
      "savemodelSelectedProducts"
    );
    if (savemodelSelectedProductsString) {
      const selectedProducts = JSON.parse(savemodelSelectedProductsString);

      // Check if Recselected is false in all rows
      const allRecselectedFalse = selectedProducts.every(
        (row) => row.RecSelected === false
      );
      console.log("allRecselectedFalse", allRecselectedFalse);
      if (allRecselectedFalse) {
        setIsSaveInProgress(true);

        // window.alert("Atleast one product need to be select");
        e.preventDefault();
        // All rows have Recselected as false
        return; // Return immediately
      }
      // If not all rows have Recselected as false, the code will continue executing
    }
    saveQuotation("create_job");
  };

  const handleNavLinkClick = async (e) => {
    setstatus("S");
    if (productTabledata.Quote_no === 0 || !productTabledata.Quote_no) {
      e.preventDefault();
      return;
    }
    setIsSaveInProgress(true);
    handleSaveBeforecreatejob(e);

    // Handle error as needed

    setIsSaveInProgress(false);

    localStorage.setItem("createjobclicked", true);
    localStorage.setItem("joborderFromQt_No", productTabledata.Quote_no);
    localStorage.setItem("QouteGroup", selectedOption);
    // if (isSaveInProgress) {
    //   e.preventDefault(); // Prevent navigation
    // }
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
        <Tooltip title="New">
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
        <Tooltip title="Print">
          <button
            className="menu-button"
            onClick={() => handleButtonClick(QuotationPrint)}
          >
            <img src={printIcon} alt="Icon" className="menu-icon" />
          </button>
        </Tooltip>
        <Tooltip title="Save">
          <button className="menu-button" onClick={() => saveQuotation()}>
            <img src={saveIcon} alt="Icon" className="menu-icon" />
          </button>
        </Tooltip>
        <Tooltip title={tooltipContent}>
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
        <Tooltip title="Customer">
          <button
            className="menu-button"
            onClick={() => handleButtonClick(QuotationCust)}
          >
            <img src={customerIcon} alt="Icon" className="menu-icon" />
            Customer
          </button>
        </Tooltip>
        <NavLink
          to="/JobOrder/JobOrderScreen"
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={handleNavLinkClick}
          // onClick={(e) => {
          //   handleSaveBeforecreatejob();
          //   // if (productTabledata.Quote_no === 0 || !productTabledata.Quote_no) {
          //   e.preventDefault();
          // }
          // localStorage.setItem("createjobclicked", true);
          // localStorage.setItem(
          //   "joborderFromQt_No",
          //   productTabledata.Quote_no
          // );
          // localStorage.setItem("QouteGroup", selectedOption);
          // }}
          // target="_blank"
          // rel="noopener noreferrer"
        >
          <button
            className={`menu-button ${
              productTabledata?.Quote_no === 0 || !productTabledata?.Quote_no
                ? "disabled"
                : ""
            }`}
            //onClick={handleSaveBeforecreatejob}
          >
            {" "}
            <img
              src={jobIcon}
              alt="Icon"
              className={`menu-icon ${
                productTabledata?.Quote_no === 0 || !productTabledata?.Quote_no
                  ? "disabled-icon"
                  : ""
              }`}
            />
            Create Job
          </button>
        </NavLink>

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
        <button className="menu-button">
          <img src={attachdocIcon} alt="Icon" className="menu-icon" />
          Attach
        </button>
        <button className="menu-button">
          <img src={altsummaryIcon} alt="Icon" className="menu-icon" />
          ALT Summary
        </button>
        <button className="menu-button">
          <img src={fuellevyIcon} alt="Icon" className="menu-icon" />
          Fuel Levy
        </button>
        <Tooltip title="Uncheck All">
          <button className="menu-button">
            <img src={uncheckallIcon} alt="Icon" className="menu-icon" />
          </button>
        </Tooltip>
        <Tooltip title="Check All">
          <button className="menu-button">
            <img src={checkallIcon} alt="Icon" className="menu-icon" />
          </button>
        </Tooltip>

        {/* Add more buttons as needed */}
      </div>
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
                Qouteno={productTabledata.Quote_no}
                CustCode={productTabledata.Cust_code}
              />
            )}
            {selectedComponent === QuotationCustCode && (
              <Qt_CustCode
                onClose={closePopupCustNo}
                customerCode={productTabledata.Cust_code}
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
              <Qt_sites onClose={closePopup} />
            )}
            {selectedComponent === Qt_contacts && (
              <Qt_contacts
                onClose={closePopupContact}
                siteContact={productTabledata.SecondContactModel}
              />
            )}
            {selectedComponent === Qt_Mapref && (
              <Qt_Mapref
                onClose={closePopupMapRef}
                mapRef={productTabledata.Map_ref}
              />
            )}
            {selectedComponent === SalesPerson && (
              <SalesPerson onClose={closePopupSalesPerson} />
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
      {rowVisibility[0] && (
        <CRow
          style={{ height: "572px" }}
          className={`Quotation_row ${rowVisibility[0] ? "" : "collapsed"}`}
        >
          <CCol md={4} className="slideIn">
            <div className="dividercards" style={{ marginTop: "5px" }}>
              <div>
                {/* Sub-row 1 */}
                <div className="inputdiv">
                  <CInputGroup style={{ marginRight: "5px" }}>
                    <CInputGroupText className="small-input-text">
                      Company:
                    </CInputGroupText>
                    <CSelect size="sm" className=" inputtextdark">
                      {/* Options for the dropdown */}
                      <option value="option1">ESSENDON QUIRRIES </option>
                    </CSelect>
                  </CInputGroup>

                  <CInputGroup style={{ marginRight: "5px" }}>
                    <CInputGroupText className="small-input-text">
                      Quote No:
                    </CInputGroupText>

                    <CInput
                      type="text"
                      size="sm"
                      className="inputQuote inputtextdark"
                      value={productTabledata?.Quote_no}
                      onChange={(e) =>
                        handleFieldChange("Quote_no", e.target.value)
                      }
                      onKeyDown={(e) => handleKeyPressQuote(e, e.target.value)}
                    />
                    <FindInPageIcon
                      className="lookupIconQuotation"
                      onClick={() => handleButtonClickQuoteNO(QuotationNo)}
                    />

                    {/* <i className="fa fa-search" aria-hidden="true"> */}

                    {/* </i> */}
                  </CInputGroup>
                  <CInputGroup>
                    <CInputGroupText className="small-input-text">
                      Status:
                    </CInputGroupText>
                    <CSelect
                      size="sm"
                      //key={status}
                      value={status}
                      className=" inputtextdark"
                      onChange={handlStatusOptionChange}
                    >
                      {/* <option> {selectedOptionDescription}</option> */}
                      {statusOptions.map((option) => (
                        <option value={option.Code} key={option.Description}>
                          {option.Description}
                        </option>
                      ))}
                    </CSelect>
                  </CInputGroup>
                </div>
                {/* First column */}
                {/* Second column */}
                <div className="inputdiv">
                  <CInputGroup style={{ marginRight: "5px" }}>
                    <CInputGroupText className="small-input-text">
                      Quote Date:
                    </CInputGroupText>
                    <CInput
                      type="date"
                      size="sm"
                      className=" inputtextdark"
                      onChange={(e) => setQuoteDate(e.target.value)}
                      value={
                        productTabledata.Quote_date
                          ? productTabledata.Quote_date.split("T")[0]
                          : quoteDate
                      }
                    />
                  </CInputGroup>

                  <CInputGroup>
                    <CInputGroupText className="small-input-text">
                      Expiry Date:
                    </CInputGroupText>
                    <CInput
                      type="date"
                      size="sm"
                      className=" inputtextdark"
                      onChange={(e) => setQuoteExpDate(e.target.value)}
                      value={expDate}
                    />
                  </CInputGroup>
                </div>

                {/* Third column */}

                <CFormGroup></CFormGroup>
              </div>

              {/* Customer */}

              {/* bottom tab view */}
            </div>
            {/* <hr className="divider" /> */}
            <div className="dividercards">
              <div>
                {/* Sub-row 1 */}
                <div className="inputdiv">
                  <CInputGroup>
                    <CInputGroupText className="small-input-text">
                      Customer Code:
                    </CInputGroupText>
                    <CInput
                      type="text"
                      size="sm"
                      className=" inputtextdark"
                      value={
                        productTabledata.Cust_code
                          ? productTabledata.Cust_code
                          : CostomerFieldData.CustomerCode
                      }
                      onKeyDown={(e) => handleKeyPressCust(e, e.target.value)}
                      onChange={(e) =>
                        handleFieldChange(
                          "Cust_code",
                          e.target.value,
                          "CustomerCode",
                          "uppercase"
                        )
                      }
                    />
                    <FindInPageIcon
                      className="lookupIconQuotation"
                      onClick={() =>
                        handleButtonClickCustCode(QuotationCustCode)
                      }
                    />
                  </CInputGroup>

                  <CInputGroup>
                    <CInputGroupText className="small-input-text">
                      Customer Name:
                    </CInputGroupText>
                    <CInput
                      type="text"
                      size="sm"
                      className=" inputtextdark"
                      value={
                        productTabledata.Cust_name
                          ? productTabledata.Cust_name
                          : CostomerFieldData.Name
                      }
                      onChange={(e) =>
                        handleFieldChange(
                          "Cust_name",
                          e.target.value,
                          "Name",
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
                      Address:
                    </CInputGroupText>
                    <CInput
                      type="text"
                      size="sm"
                      className=" inputtextdark"
                      value={
                        productTabledata.Address1
                          ? productTabledata.Address1
                          : CostomerFieldData.Address1
                      }
                      onChange={(e) =>
                        handleFieldChange(
                          "Address1",
                          e.target.value,
                          "Address1"
                        )
                      }
                    />
                    <CInput
                      type="text"
                      size="sm"
                      className=" inputtextdark"
                      value={
                        productTabledata.Address2
                          ? productTabledata.Address2
                          : CostomerFieldData.Address2
                      }
                      onChange={(e) =>
                        handleFieldChange(
                          "Address2",
                          e.target.value,
                          "Address2"
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
                        Suburb:
                      </CInputGroupText>
                      <CInput
                        type="text"
                        size="sm"
                        className=" inputtextdark"
                        value={
                          productTabledata.City
                            ? productTabledata.City
                            : CostomerFieldData.City
                        }
                        onChange={(e) =>
                          handleFieldChange("City", e.target.value, "City")
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
                          productTabledata.State
                            ? productTabledata.State
                            : CostomerFieldData.State
                        }
                        onChange={(e) =>
                          handleFieldChange("State", e.target.value, "State")
                        }
                      />
                    </CInputGroup>
                  </div>
                  <div className="inputdiv">
                    <CInputGroup>
                      <CInputGroupText className="small-input-text">
                        Postcode:
                      </CInputGroupText>
                      <CInput
                        type="text"
                        size="sm"
                        className=" inputtextdark"
                        value={
                          productTabledata.Postcode
                            ? productTabledata.Postcode
                            : CostomerFieldData.PostCode
                        }
                        onChange={(e) =>
                          handleFieldChange(
                            "Postcode",
                            e.target.value,
                            "PostCode"
                          )
                        }
                      />
                    </CInputGroup>
                  </div>
                </div>
                <div className="inputdiv">
                  <CInputGroup style={{ marginRight: "5px" }}>
                    <CInputGroupText className="small-input-text">
                      Email Address:
                    </CInputGroupText>
                    <CInput
                      type="email"
                      size="sm"
                      className=" inputtextdark"
                      value={
                        productTabledata.Email_Address
                          ? productTabledata.Email_Address
                          : CostomerFieldData.EmailAddress
                      }
                      onChange={(e) =>
                        handleFieldChange(
                          "Email_Address",
                          e.target.value,
                          "EmailAddress"
                        )
                      }
                    />
                  </CInputGroup>

                  <CInputGroup>
                    <CInputGroupText className="small-input-text">
                      Contact Name:
                    </CInputGroupText>
                    <CInput
                      type="text"
                      size="sm"
                      className=" inputtextdark"
                      value={
                        productTabledata.Contact_name
                          ? productTabledata.Contact_name
                          : CostomerFieldData.Name
                      }
                      onChange={(e) =>
                        handleFieldChange(
                          "Contact_name",
                          e.target.value,
                          "Name"
                        )
                      }
                    />
                  </CInputGroup>
                </div>

                {/* Sub-row 7 */}
                <div className="sub-row-7">
                  <div className="inputdiv">
                    <CInputGroup>
                      <CInputGroupText className="small-input-text">
                        Telephone:
                      </CInputGroupText>
                      <CInput
                        type="text"
                        size="sm"
                        className=" inputtextdark"
                        value={
                          productTabledata.Cust_phone
                            ? productTabledata.Cust_phone
                            : CostomerFieldData.Telephone
                        }
                        onChange={(e) =>
                          handleFieldChange(
                            "Cust_phone",
                            e.target.value,
                            "Telephone"
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
                        value={
                          productTabledata.Cust_mobile
                            ? productTabledata.Cust_mobile
                            : CostomerFieldData.Contact
                        }
                        onChange={(e) =>
                          handleFieldChange(
                            "Cust_mobile",
                            e.target.value,
                            "Contact"
                          )
                        }
                      />
                    </CInputGroup>
                  </div>
                </div>
              </div>
            </div>
            {/* <hr className="divider" /> */}
            <div className="dividercards">
              <CRow className="slideIn">
                <CCol>
                  <CTabs activeTab={activeTab} onActiveTabChange={toggleTab}>
                    <CNav variant="tabs" className="small-tabs">
                      <CNavItem className="small-tab-item">
                        <CNavLink className="small-tab-link">
                          Site Details
                        </CNavLink>
                      </CNavItem>
                      <CNavItem className="small-tab-item">
                        <CNavLink className="small-tab-link">Notes</CNavLink>
                      </CNavItem>
                      <CNavItem className="small-tab-item">
                        <CNavLink className="small-tab-link">Details</CNavLink>
                      </CNavItem>
                      <CNavItem className="small-tab-item">
                        <CNavLink className="small-tab-link">
                          Contractors
                        </CNavLink>
                      </CNavItem>
                    </CNav>

                    <CTabContent style={{ marginTop: "2%" }}>
                      <CTabPane visible={activeTab === 0}>
                        {/* Content for Site Details tab */}
                        <CRow>
                          <CCol md={9}>
                            <div>
                              {/* Sub-row 1 */}
                              <div className="sub-row-7">
                                <CInputGroup>
                                  <CInputGroupText className="small-input-text">
                                    Customer Ref:
                                  </CInputGroupText>
                                  <CInput
                                    type="text"
                                    size="sm"
                                    className=" inputtextdark"
                                    // value={
                                    //   productTabledata.AddressModel &&
                                    //   productTabledata.AddressModel.Name
                                    //     ? productTabledata.AddressModel.Name
                                    //     : ""
                                    // }
                                    value={productTabledata.Cust_order_no}
                                    onChange={
                                      (e) =>
                                        handleFieldChange(
                                          "Cust_order_no",
                                          e.target.value
                                        )
                                      // handleFieldChangesite(
                                      //   "Name",
                                      //   e.target.value
                                      // )
                                    }
                                  />
                                </CInputGroup>
                                <div className="inputdiv">
                                  <CInputGroup>
                                    <CInputGroupText className="small-input-text">
                                      Site Name:
                                    </CInputGroupText>
                                    <CInput
                                      type="text"
                                      size="sm"
                                      className=" inputtextdark"
                                      value={productTabledata.Site_name}
                                      onChange={(e) =>
                                        handleFieldChange(
                                          "Site_name",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </CInputGroup>
                                </div>
                              </div>
                              {/* Sub-row 2 */}

                              {/* Sub-row 3 */}
                              <div className="inputdiv">
                                <CInputGroup>
                                  <CInputGroupText className="small-input-text">
                                    Street Address:
                                  </CInputGroupText>
                                  <CInput
                                    type="text"
                                    size="sm"
                                    className=" inputtextdark"
                                    //value={productTabledata.Site_address1}
                                    value={
                                      productTabledata.AddressModel &&
                                      productTabledata.AddressModel.Address1
                                        ? productTabledata.AddressModel.Address1
                                        : ""
                                    }
                                    onChange={(e) =>
                                      handleFieldChangesite(
                                        "Address1",
                                        e.target.value
                                      )
                                    }
                                    // onChange={(e) =>
                                    //   handleFieldChange(
                                    //     "Site_address1",
                                    //     e.target.value
                                    //   )
                                    // }
                                  />
                                  <CInput
                                    type="text"
                                    size="sm"
                                    className=" inputtextdark"
                                    // value={productTabledata.Site_address2}
                                    value={
                                      productTabledata.AddressModel &&
                                      productTabledata.AddressModel.Address2
                                        ? productTabledata.AddressModel.Address2
                                        : ""
                                    }
                                    onChange={(e) =>
                                      handleFieldChangesite(
                                        "Address2",
                                        e.target.value
                                      )
                                    }
                                    // onChange={(e) =>
                                    //   handleFieldChange(
                                    //     "Site_address2",
                                    //     e.target.value
                                    //   )
                                    // }
                                  />
                                </CInputGroup>
                              </div>
                              {/* Sub-row 4 */}
                              <div className="sub-row-7">
                                <div className="inputdiv">
                                  <CInputGroup>
                                    <CInputGroupText className="small-input-text">
                                      Suburb:
                                    </CInputGroupText>
                                    <CInput
                                      type="text"
                                      size="sm"
                                      className=" inputtextdark"
                                      value={productTabledata.Site_city}
                                      onChange={(e) =>
                                        handleFieldChange(
                                          "Site_city",
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
                                      value={productTabledata.Site_state}
                                      onChange={(e) =>
                                        handleFieldChange(
                                          "Site_state",
                                          e.target.value
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
                                      Map Ref:
                                    </CInputGroupText>
                                    <CInput
                                      type="text"
                                      size="sm"
                                      className=" inputtextdark"
                                      value={productTabledata.Map_ref}
                                      onKeyDown={(e) =>
                                        handleKeyPressMapref(e, e.target.value)
                                      }
                                      onChange={(e) =>
                                        handleFieldChange(
                                          "Map_ref",
                                          e.target.value
                                        )
                                      }
                                    />
                                    {productTabledata.Cust_code ||
                                    CostomerFieldData.CustomerCode ? (
                                      <FindInPageIcon
                                        className="lookupIconQuotation"
                                        onClick={() => {
                                          handleButtonClick(Qt_Mapref);
                                        }}
                                      />
                                    ) : null}
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
                                        productTabledata.AddressModel &&
                                        productTabledata.AddressModel
                                          .Cust_site_radius
                                          ? productTabledata.AddressModel
                                              .Cust_site_radius
                                          : 0
                                      }
                                      onChange={(e) =>
                                        handleFieldChangesite(
                                          "Cust_site_radius",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </CInputGroup>
                                </div>
                              </div>
                              {/* Sub-row 6 */}
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
                                      productTabledata.AddressModel &&
                                      productTabledata.AddressModel.Latitude
                                        ? productTabledata.AddressModel.Latitude
                                        : 0
                                    }
                                    onChange={(e) =>
                                      handleFieldChangesite(
                                        "Latitude",
                                        e.target.value
                                      )
                                    }
                                  />
                                  -
                                  <CInput
                                    type="text"
                                    size="sm"
                                    className=" inputtextdark"
                                    value={
                                      productTabledata.AddressModel &&
                                      productTabledata.AddressModel.Longitude
                                        ? productTabledata.AddressModel
                                            .Longitude
                                        : 0
                                    }
                                    onChange={(e) =>
                                      handleFieldChangesite(
                                        "Longitude",
                                        e.target.value
                                      )
                                    }
                                  />
                                </CInputGroup>
                              </div>
                              {/* Sub-row 7 */}
                              <div className="sub-row-7">
                                <div className="inputdiv">
                                  <CInputGroup>
                                    <CInputGroupText className="small-input-text">
                                      Contact:
                                    </CInputGroupText>
                                    <CInput
                                      type="text"
                                      className=" inputtextdark"
                                      size="sm"
                                      value={
                                        productTabledata.AddressModel &&
                                        productTabledata.AddressModel.Contact
                                          ? productTabledata.AddressModel
                                              .Contact
                                          : ""
                                      }
                                      onChange={(e) =>
                                        handleFieldChangesite(
                                          "Contact",
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
                                      className=" inputtextdark"
                                      size="sm"
                                      value={productTabledata.Site_mobile}
                                      onChange={(e) =>
                                        handleFieldChange(
                                          "Site_mobile",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </CInputGroup>
                                </div>
                              </div>
                              {/* Sub-row 8 */}
                              <div className="inputdiv">
                                <CInputGroup>
                                  <CInputGroupText className="small-input-text">
                                    Email Address:
                                  </CInputGroupText>
                                  <CInput
                                    type="text"
                                    className=" inputtextdark"
                                    size="sm"
                                    value={productTabledata.Site_email}
                                    onChange={(e) =>
                                      handleFieldChange(
                                        "Site_email",
                                        e.target.value
                                      )
                                    }
                                  />
                                </CInputGroup>
                                {status === "U" && (
                                  <CInputGroup>
                                    {/* <CInputGroupText className="small-input-text">
                                      Rejected Reason:
                                    </CInputGroupText> */}

                                    <CSelect
                                      size="sm"
                                      //key={status}
                                      value={rejectedReason}
                                      placeholder="Rejected Reason"
                                      className=" inputtextdark"
                                      onChange={handleRejectedReasonChange}
                                    >
                                      {rejectedReasonOptions.map((option) => (
                                        <option
                                          value={option.Code}
                                          // key={option.Description}
                                          label={option.Description}
                                        >
                                          {option.Description}
                                        </option>
                                      ))}
                                    </CSelect>
                                  </CInputGroup>
                                )}
                              </div>
                            </div>
                          </CCol>
                          <CCol md={3}>
                            <div>
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
                            </div>
                          </CCol>
                        </CRow>
                        {/* Add your content here */}
                      </CTabPane>
                      <CTabPane visible={activeTab === 1}>
                        {/* Content for Notes tab */}
                        <div className="inputdiv">
                          <CInputGroupText className="small-input-text">
                            Notes:
                          </CInputGroupText>
                          <textarea
                            value={productTabledata.Quote_notes}
                            className="form-control" // Add the necessary CoreUI class for styling
                            rows="6" // Define the number of rows for the textarea
                            style={{ resize: "none" }}
                            onChange={(e) =>
                              handleFieldChange("Quote_notes", e.target.value)
                            } // Prevent textarea from being resizable
                          ></textarea>
                        </div>
                        <button
                          className="inputdivbutton2"
                          onClick={() => {
                            const note =
                              "Due to the current Diesel fuel price, our cartage service charges will not be fixed in relation to any quotation or supply agreement, the current Fuel Levy Charge is 3.75 % of the total cartage component of the quotation. Any information given about cartage service charges and fuel levy charges are current at that time, the current fuel levy surcharge is applicable to all quotations and delivered products subject to change during a supply period. Please note:  ALL pricing within this quote is subject to availability of product";
                            setProductTabledata((prevProductTabledata) => ({
                              ...prevProductTabledata,
                              Quote_notes: note,
                            }));
                          }}
                        >
                          Add Fuel Levy Notes
                        </button>

                        {/* Add your content here */}
                      </CTabPane>
                      <CTabPane visible={activeTab === 2}>
                        {/* Content for Details tab */}
                        <div>
                          <div className="sub-row-7">
                            <div className="inputdiv">
                              <CInputGroup>
                                <CInputGroupText className="small-input-text">
                                  Project:
                                </CInputGroupText>
                                <CInput
                                  type="text"
                                  size="sm"
                                  className=" inputtextdark"
                                  value={productTabledata.Project_name}
                                  onChange={(e) =>
                                    handleFieldChange(
                                      "Site_mobile",
                                      e.target.value
                                    )
                                  }
                                />
                              </CInputGroup>
                            </div>

                            <div className="inputdiv">
                              <CInputGroup>
                                <CInputGroupText className="small-input-text">
                                  SalesPerson:
                                </CInputGroupText>
                                <CInput
                                  type="text"
                                  size="sm"
                                  className=" inputtextdark"
                                  value={productTabledata.Sales_person}
                                  onChange={(e) =>
                                    handleFieldChange(
                                      "Site_phone",
                                      e.target.value
                                    )
                                  }
                                />
                              </CInputGroup>
                              <FindInPageIcon
                                className="lookupIconQuotation"
                                onClick={() => handleButtonClick(SalesPerson)}
                              />
                            </div>
                          </div>
                          <div className="sub-row-4">
                            <div className="inputdiv">
                              <CInputGroup style={{ width: "200px" }}>
                                <CInputGroupText className="small-input-text">
                                  Delivery Date:
                                </CInputGroupText>
                                <CInput
                                  value={hireStartDate}
                                  type="date"
                                  size="sm"
                                  className=" inputtextdark"
                                  onChange={(e) =>
                                    setHireStartDate(e.target.value)
                                  }
                                />
                              </CInputGroup>
                            </div>
                            <div className="inputdiv">
                              <CInputGroup>
                                <CInputGroupText className="small-input-text">
                                  Time(24HRS)
                                </CInputGroupText>
                                <CInput
                                  //value={productTabledata}
                                  type="text"
                                  size="sm"
                                  className=" inputtextdark"
                                />
                              </CInputGroup>
                            </div>
                            <div className="inputdiv">
                              <CInputGroup>
                                <CInputGroupText className="small-input-text">
                                  Validity
                                </CInputGroupText>
                                <CSelect
                                  size="sm"
                                  className="inputtextdark"
                                  value={quoteValidity}
                                  onChange={(e) => dateValidity(e.target.value)}
                                >
                                  <option value="30">30</option>
                                  <option value="60">60</option>
                                  <option value="90">90</option>
                                  <option value="120">120</option>
                                  <option value="150">150</option>
                                  <option value="150">180</option>
                                  {/* <option value={quoteValidity}>
                                    {quoteValidity}
                                  </option> */}
                                  <option
                                    value={quoteValidity}
                                    style={{
                                      backgroundColor: "grey",
                                      color: "white",
                                    }}
                                  >
                                    {quoteValidity}
                                  </option>
                                </CSelect>
                                (in days)
                              </CInputGroup>
                            </div>
                          </div>
                          <div className="inputdiv">
                            <CInputGroupText className="small-input-text">
                              Special Instructions:
                            </CInputGroupText>
                            <textarea
                              className="form-control" // Add the necessary CoreUI class for styling
                              rows="2" // Define the number of rows for the textarea
                              style={{ resize: "none" }}
                              value={productTabledata.Special_inst}
                              onChange={(e) =>
                                handleFieldChange(
                                  "Special_inst",
                                  e.target.value
                                )
                              }
                            ></textarea>
                          </div>
                          <div className="inputdiv">
                            <CInputGroupText className="small-input-text">
                              Site specific Requirenment:
                            </CInputGroupText>
                            <textarea
                              className="form-control"
                              rows="2"
                              style={{ resize: "none" }}
                              value={productTabledata.Site_requirements}
                            ></textarea>
                          </div>
                          <div className="inputdiv">
                            <CInputGroupText className="small-input-text">
                              Notes:
                            </CInputGroupText>
                            <textarea
                              className="form-control" // Add the necessary CoreUI class for styling
                              rows="1" // Define the number of rows for the textarea
                              style={{ resize: "none" }}
                              //value={productTabledata.Quote_notes}
                              // onChange={(e) =>
                              //   handleFieldChange("Quote_notes", e.target.value)
                              // } // Prevent textarea from being resizable
                            ></textarea>
                          </div>
                        </div>

                        {/* Add your content here */}
                      </CTabPane>
                      <CTabPane visible={activeTab === 3}>
                        {/* Content for Contractors tab */}
                        <div>
                          <div className="inputdiv">
                            <CInputGroup>
                              <CInputGroupText className="small-input-text">
                                Name:
                              </CInputGroupText>
                              <CInput
                                type="text"
                                size="sm"
                                className=" inputtextdark"
                                // value={
                                //   productTabledata.AddressModel &&
                                //   productTabledata.AddressModel.Name
                                //     ? productTabledata.AddressModel.Name
                                //     : ""
                                // }
                                // onChange={(e) =>
                                //   handleFieldChangesite("Name", e.target.value)
                                // }
                              />
                            </CInputGroup>
                          </div>
                          <div className="inputdiv">
                            <CInputGroup>
                              <CInputGroupText className="small-input-text">
                                Contact Number :
                              </CInputGroupText>
                              <CInput
                                //value={productTabledata.Name}
                                type="text"
                                size="sm"
                                className=" inputtextdark"
                              />
                            </CInputGroup>
                          </div>
                          <div className="inputdiv">
                            <CInputGroup>
                              <CInputGroupText className="small-input-text">
                                Email:
                              </CInputGroupText>
                              <CInput
                                type="text"
                                size="sm"
                                className=" inputtextdark"
                              />
                            </CInputGroup>
                          </div>
                          <CInputGroup>
                            <CInputGroupText className="small-input-text">
                              Contractor Type:
                            </CInputGroupText>
                            <CSelect size="sm" className=" inputtextdark">
                              {/* Options for the dropdown */}

                              {/* <option value="option1">Cancelled</option>
                              <option value="option2">Expired</option>
                              <option value="option3">New</option> */}
                            </CSelect>
                          </CInputGroup>
                          <div className="inputdiv">
                            <CInputGroupText className="small-input-text">
                              Notes:
                            </CInputGroupText>
                            <textarea
                              className="form-control" // Add the necessary CoreUI class for styling
                              rows="2" // Define the number of rows for the textarea
                              style={{ resize: "none" }} // Prevent textarea from being resizable
                            ></textarea>
                          </div>
                          <div className="ContractorBtns">
                            <button className="inputdivbutton3">Save</button>
                            <button className="inputdivbutton3">Remove</button>
                            <button className="inputdivbutton3">
                              Contractor
                            </button>
                            <button className="inputdivbutton3">Clear</button>
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
          {/* <CCol md={4} style={{ marginTop: "-33px" }}>
            {" "}
          
          </CCol> */}
          <CCol md={8} style={{ marginTop: "" }} className="slideIn">
            <CRow>
              <CCol>
                <Qt_ProductTable
                  rfid={productTabledata.Ref_id}
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
                    productTabledata.Cust_code
                      ? productTabledata.Cust_code
                      : CostomerFieldData.CustomerCode
                  }
                  address={productTabledata.Site_address1}
                  city={productTabledata.Site_city}
                  selectedOptionqoute={selectedOption}
                  

                  // quoteno={quoteno}
                />
              </CCol>
            </CRow>
          </CCol>
        </CRow>
      )}
      {/* <hr className="divider" /> */}

      <CRow className="slideIn">
        <CCol>
          <Qt_SelectedTable
            quoteno={quoteno}
            //quoteProduct={productTabledata.Quote_no}
            SupProductDetails={selectedSupProductDetailsArry}
            uniquekey={
              selectedSupProductDetailsArry
                ? selectedSupProductDetailsArry.Agreement_no
                : ""
            }
            QuoteNew={cleared}
            fetchQuote={fetchSelectedProducts}
            custCode={
              productTabledata.Cust_code
                ? productTabledata.Cust_code
                : CostomerFieldData.CustomerCode
            }
          />
        </CCol>
      </CRow>
      {/* {!alertVisible && (
        <AlertPopup
          message={alertmsg}
          type={alertType}
          onClose={() => setAlertVisible(false)}
        />
      )} */}
      {/* </CCardBody> */}
      {/* </CCard> */}
    </div>
  );
}
