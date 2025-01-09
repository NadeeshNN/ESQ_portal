import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
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
import FindInPageIcon from "@mui/icons-material/FindInPage";
import saveIcon from "../../assets/icons/quotaionbtns/save.png";
import newDocIcon from "../../assets/icons/quotaionbtns/new.png";

import InstructionIcon from "../../assets/icons/quotaionbtns/InstructionIcon.png";
import ListIcon from "../../assets/icons/quotaionbtns/ListIcon.png";
import SiteIcon from "../../assets/icons/quotaionbtns/SiteIcon.png";

import interestIcon from "../../assets/icons/quotaionbtns/interestIcon.png";
import { InputAdornment, Tooltip } from "@material-ui/core";

import AuditLog_cust from "./CustomerMasterComponents/AuditLog_cust";
import CreditStatus_cust from "./CustomerMasterComponents/CreditStatus_cust";
import ViewDocument_cust from "./CustomerMasterComponents/ViewDocument_cust";
import Qt_sites from "../Quotation/QuotationPopups/Qt_sites";
import ContactTable_cust from "./CustomerMasterComponents/ContactTable_cust";
import SpecialInstruction_cust from "./CustomerMasterComponents/SpecialInstruction_cust";
import Qt_CustCode from "../Quotation/QuotationPopups/Qt_CustCode";
import { API_URL } from "src/components/util/config";
import Nexgen_Alert from "../ReusableComponents_ESQ/Nexgen_Alert";
import SalesPerson from "../JobOrder/JobOderpopups/SalesPerson";

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
export default function QuotationCust() {
  const [activeTab, setActiveTab] = useState(0);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [customerDetails, setCustomerDetails] = useState([]);
  const [permissonDetails, setPermissonDetails] = useState([]);
  const [readAuth, setReadAuth] = useState(false);
  const [creditDetails, setCreditDetails] = useState([]);
  const [custDetails, setCustDetails] = useState([]);
  const [DepartmentDetails, setDepartmentDetails] = useState([]);
  const [ContactDetails, setContactDetails] = useState([]);
  const [rowContactDetails, setRowContactDetails] = useState([]);
  const [BankingDetails, setBankingDetails] = useState([]);
  const [AuditLogDetails, setAuditLogDetails] = useState([]);
  const [repsDetails, setRepsDetails] = useState([]);
  const [salesDetails, setSalesDetails] = useState([]);
  const [custsubGroup, setcustsubGroupDetails] = useState([]);
  const [customerCode, setCustomerCode] = useState("");
  const [gstValue, setGstValue] = useState("1");
  const [pricingValue, setPricingValue] = useState("1");
  const [fromValue, setFromValue] = useState("0");
  const [titileList, setTitle] = useState([]);
  const [priceGroupValue, setcustPriceGroup] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [alertTitle, setAlertTitle] = useState("");

  //const [BrowseAvailable, setBrowseAvailable] = useState("");

  const toggleTab = (index) => {
    if (activeTab !== index) {
      setActiveTab(index);
    }
  };
  const handleButtonClick = (component) => {
    setSelectedComponent(() => component); // Set the selected component
    setPopupVisible(true);
    // Show the popup
  };
  const closePopup = () => {
    // triger when  lookup closed default
    setSelectedComponent(""); // Clear the selected component
    setPopupVisible(false); // Close the popup
  };
  const closePopupCustNo = () => {
    const custCode = sessionStorage.getItem("selectedCustCode");
    console.log(custCode);
    GetCustomerData(custCode);
    // setCustCode(custCode);
    // triger when Qt_custNo lookup closed
    setSelectedComponent(""); // Clear the selected
    setPopupVisible(false); // Close the popup
    //GetCustomerCodeData(custCode); // Close the popup

    // console.log("productTabledata", productTabledata);
  };

  useEffect(() => {
    Getpermisson();
    setCustomerCode("");
    setCustomerDetails([]);
    setCustDetails([]);
    setDepartmentDetails([]);
    setAuditLogDetails([]);
    setContactDetails([]);
    setBankingDetails([]);
    setCreditDetails([]); // check permisson when loading the component
  }, []);

  const Getpermisson = () => {
    setLoading(true);
    // Fetch data from the API
    fetch(
      `${API_URL}utilitie/getpermission?originatorId=833&frameId=5&frameCode=fm_cust_update_cs&frameType=r`
    )
      .then((response) => response.json())
      .then((data) => {
        const ResultSet = data.ResultSet;
        const readAuth = ResultSet[0].ReadAuth;
        console.log(readAuth);

        setPermissonDetails(ResultSet);
        setReadAuth(readAuth);
        GetCustomerData("");
        // Assuming data is an array of objects like you provided
        // setCustomerDetails(contacts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data from the API:", error);
        setLoading(false);
      });
  };
  const GetCustomerData = (custCode) => {
    setLoading(true);
    const Token = localStorage.getItem("AccessToken");
    // Fetch data from the API
    fetch(
      `${API_URL}customer/getcustomermasterbyid?custcode=${custCode}&originator=peercore&frameCode=fm_cust_update_cs`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${Token}`,
        },
      }
    )
      .then((response) => {
        if (response.status === 401) {
          localStorage.removeItem("AccessToken");
          window.location.reload(true);

          throw new Error("Unauthorized access - 401");
        }
        return response.json();
      })
      .then((data) => {
        const Details = data.ResultSet[0];
        const Custcode = Details.CustCode;
        if (Custcode === null) {
          setCustomerCode("");
          setCustomerDetails([]);
          setCustDetails([]);
          setDepartmentDetails([]);
          setAuditLogDetails([]);
          setContactDetails([]);
          setBankingDetails([]);
          setCreditDetails([]);
          setCustDetails({
            ...custDetails,
            BrowseAvailable: "Y",
            Isinternalcust: "0",
          });
          // add alert here
          return;
        }
        const auditLog = Details.Loginfo;
        const Contact = Details.Personal;
        const department = Details.Department;
        const banking = Details.Banking;
        const credit = Details.Credit;
        const custDetails = Details.AddSub;
        const custCode = Details.CustCode;
        const reps = Details.Reps; // for save
        const sales = Details.Sales; // for save
        const custsubGroup = Details.CustsubGroup;
        // for lookup
        const titileData = Details.Title;
        const priceGroup = Details.CustPriceGroupOpt;
        const companyData = Details.CompanyOpt;

        setCustomerCode(custCode);
        setCustomerDetails(Details);
        setCustDetails(custDetails);
        setDepartmentDetails(department);
        setAuditLogDetails(auditLog);
        setRowContactDetails(Contact);
        // setContactDetails(Contact);
        setBankingDetails(banking);
        setCreditDetails(credit);
        setRepsDetails(reps);
        setSalesDetails(sales);
        setcustsubGroupDetails(custsubGroup);

        // set lookup data
        setTitle(titileData);
        setcustPriceGroup(priceGroup);

        // default loadings

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data from the API:", error);
        setLoading(false);
      });
  };

  const handleFieldChangeDetails = (fieldName, value, fontType) => {
    if (fontType) {
      setCustDetails({
        ...custDetails,
        [fieldName]: value,
      });
    } else {
      const newvalue = value.toUpperCase();
      setCustDetails({
        ...custDetails,
        [fieldName]: newvalue,
      });
    }
  };
  const handleFieldChangeCredit = (fieldName, value, fontType) => {
    const newvalue = value.toUpperCase();
    setCreditDetails({
      ...creditDetails,
      [fieldName]: newvalue,
    });
  };
  const handleFieldChangeDepartments = (fieldName, value, fontType) => {
    const newvalue = value.toUpperCase();
    setDepartmentDetails({
      ...DepartmentDetails,
      [fieldName]: newvalue,
    });
  };
  const handleFieldChangeBanking = (fieldName, value, fontType) => {
    const newvalue = value.toUpperCase();
    setBankingDetails({
      ...BankingDetails,
      [fieldName]: newvalue,
    });
  };
  const handleKeyPressCust = (e, value) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setCustomerDetails([]);
      setCustDetails([]);
      setDepartmentDetails([]);
      setAuditLogDetails([]);
      setContactDetails([]);
      setBankingDetails([]);
      setCreditDetails([]);
      GetCustomerData(value);
      // GetproductTableData(value);
      // GetCustomerCodeData(value);
    }
  };
  const handleFieldChangeContact = (fieldName, value, fontType) => {
    const newvalue = value.toUpperCase();
    setContactDetails({
      ...ContactDetails,
      [fieldName]: newvalue,
    });
  };

  const handlerowclickContact = () => {
    setContactDetails(rowContactDetails[0]);
    setTitle(rowContactDetails[0].Title);
    console.log("rowContactDetails", ContactDetails);
  };
  const saveCustomer = () => {
    setLoading(true);
    const saveCustBody = {
      CustCode: customerDetails?.CustCode,
      Name: customerDetails?.Name,
      TipplingEnabaled: customerDetails?.TipplingEnabaled,
      Dept: customerDetails?.Dept,
      CustomerPosition: customerDetails?.CustomerPosition,
      TotalCustomer: customerDetails?.TotalCustomer,
      KeyAccount: customerDetails?.KeyAccount,
      Status: customerDetails?.Status,
      EanCode: customerDetails?.EanCode,
      Reps: repsDetails,
      CustsubGroup: custsubGroup,
      AddSub: custDetails,
      Banking: BankingDetails,
      Personal: rowContactDetails,
      Credit: creditDetails,
      Department: DepartmentDetails,
      Sales: salesDetails,
    };

    const Token = localStorage.getItem("AccessToken");

    fetch(`${API_URL}customer/savecustomermaster`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
      body: JSON.stringify(saveCustBody),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setAlertType("success");
        setAlertMessage("successfully saved");
        setShowAlert(true);
        //window.alert("successfully saved");

        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        console.error("Error during saveQuotation:", err);
        // Assuming setLoading is defined somewhere in your code
        setLoading(false);
      });
  };

  return (
    <CCard
      //className="routehistoryGlass"
      style={{ width: "auto", height: "auto" }}
      className="slideInBottom"
    >
      {showAlert && (
        <Nexgen_Alert
          AlertTitle={alertTitle}
          severity={alertType}
          AlertMessage={alertMessage}
          onClose={() => setShowAlert(false)}
        />
      )}
      <CCardHeader className="headerEQModal"> Customer Master</CCardHeader>
      {readAuth && (
        <CCardBody>
          {popupVisible && selectedComponent && (
            <div style={overlayStyle} onClick={() => closePopup()}>
              <div onClick={(e) => e.stopPropagation()}>
                {/* Render the selected component */}
                {selectedComponent === AuditLog_cust && (
                  <AuditLog_cust onClose={closePopup} />
                )}
                {selectedComponent === CreditStatus_cust && (
                  <CreditStatus_cust onClose={closePopup} />
                )}
                {selectedComponent === ViewDocument_cust && (
                  <ViewDocument_cust onClose={closePopup} />
                )}
                {selectedComponent === Qt_sites && (
                  <Qt_sites onClose={closePopup} />
                )}
                {selectedComponent === SpecialInstruction_cust && (
                  <SpecialInstruction_cust onClose={closePopup} />
                )}
                {selectedComponent === Qt_CustCode && (
                  <Qt_CustCode onClose={closePopupCustNo} />
                )}
                {selectedComponent === SalesPerson && (
                  <SalesPerson onClose={closePopup} />
                )}
              </div>
            </div>
          )}

          <CRow>
            <div
              className="menu-bar"
              style={{ width: "100%", marginLeft: "2%", marginBottom: "20px" }}
            >
              <Tooltip title="Save">
                <button className="menu-button" onClick={saveCustomer}>
                  <img src={saveIcon} alt="Icon" className="menu-icon" />
                </button>
              </Tooltip>
              <Tooltip title="newdoc">
                <button
                  className="menu-button"
                  onClick={() => handleButtonClick(ViewDocument_cust)}
                >
                  <img src={newDocIcon} alt="Icon" className="menu-icon" />
                </button>
              </Tooltip>
              <Tooltip title="site">
                <button
                  className="menu-button"
                  style={{ width: "auto" }}
                  onClick={() => handleButtonClick(Qt_sites)}
                >
                  <img src={SiteIcon} alt="Icon" className="menu-icon" />
                  Site
                </button>
              </Tooltip>
              <Tooltip title="Save">
                <button
                  className="menu-button"
                  style={{ width: "auto" }}
                  onClick={() => handleButtonClick(CreditStatus_cust)}
                >
                  <img src={ListIcon} alt="Icon" className="menu-icon" />
                  CR status
                </button>
              </Tooltip>
              <Tooltip title="Save">
                <button
                  className="menu-button"
                  style={{ width: "auto" }}
                  onClick={() => handleButtonClick(SpecialInstruction_cust)}
                >
                  <img src={InstructionIcon} alt="Icon" className="menu-icon" />
                  Special Ist
                </button>
              </Tooltip>
              <Tooltip title="Save">
                <button
                  className="menu-button"
                  style={{ width: "auto" }}
                  //  onClick={() => handleButtonClick(QuotationDistanceMaster)}
                >
                  <img src={interestIcon} alt="Icon" className="menu-icon" />
                  Interest
                </button>
              </Tooltip>
              {/* Add more buttons as needed */}
            </div>
          </CRow>

          {/* <hr className="divider" /> */}
          <CRow>
            <CCol md={4}>
              {" "}
              <div className="inputdiv marginL20">
                <CInputGroup>
                  <CInputGroupText className="small-input-text">
                    Customer Code
                  </CInputGroupText>
                  <CInput
                    type="text"
                    size="sm"
                    className=" inputtextdark"
                    value={customerCode}
                    onChange={(e) =>
                      setCustomerCode(e.target.value.toUpperCase())
                    }
                    onKeyDown={(e) => handleKeyPressCust(e, e.target.value)}
                  />
                  <FindInPageIcon
                    className="lookupIconQuotation"
                    onClick={() => handleButtonClick(Qt_CustCode)}
                  />
                </CInputGroup>
              </div>
              {/*
               <TextField
              style={{ marginRight: "5px" }}
              variant="outlined"
              size="small"
              className="inputQuote inputtextdark"
              label="Customer Code:"
              // value={soderNo}
              // onChange={(e) => setSorderNo(e.target.value)}
              //  onKeyDown={(e) => handleKeyPressJobOrder(e, e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                    //onClick={() => handleButtonClick(JobOrderBrowse)}
                    >
                      <FindInPageIcon className="lookupIconQuotation" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            /> 
            */}
            </CCol>
            <CCol md={5}>
              <CInput
                type="text"
                size="sm"
                className=" inputtextdark"
                value={customerDetails ? customerDetails.Name : ""}
              />
            </CCol>
            <CCol md={3}>
              <CInputGroup style={{ marginBottom: "2%" }}>
                <CInputGroupText className="small-input-text">
                  Key Account:
                </CInputGroupText>
                <CSelect size="sm">
                  {/* Options for the dropdown */}
                  <option value="option1"> 1</option>
                  <option value="option2"> 2</option>
                  <option value="option3"> 3</option>
                </CSelect>
              </CInputGroup>
            </CCol>
          </CRow>
          {/* <hr className="divider" /> */}
          <CRow style={{ width: "100%", marginLeft: "1%", marginTop: "2%" }}>
            <CCard
              style={{
                width: "130vh",
                height: "55vh",
              }}
            >
              <CCardBody>
                <CTabs
                  activeTab={activeTab}
                  onActiveTabChange={toggleTab}
                  style={{ width: "100%" }}
                >
                  <CNav variant="tabs" className="small-tabs">
                    <CNavItem className="small-tab-item">
                      <CNavLink className="small-tab-link">Details</CNavLink>
                    </CNavItem>
                    <CNavItem className="small-tab-item">
                      <CNavLink className="small-tab-link">Credit</CNavLink>
                    </CNavItem>
                    <CNavItem className="small-tab-item">
                      <CNavLink className="small-tab-link">Contacts</CNavLink>
                    </CNavItem>
                    <CNavItem className="small-tab-item">
                      <CNavLink className="small-tab-link">
                        Departments
                      </CNavLink>
                    </CNavItem>
                    <CNavItem className="small-tab-item">
                      <CNavLink className="small-tab-link">Banking</CNavLink>
                    </CNavItem>
                    <CNavItem className="small-tab-item">
                      <CNavLink className="small-tab-link">Audit Log</CNavLink>
                    </CNavItem>
                  </CNav>

                  <CTabContent style={{ marginTop: "3%", width: "100%" }}>
                    <CTabPane visible={activeTab === 0}>
                      {/* Content for Site Details tab */}
                      <CRow>
                        <CCol>
                          {/* Sub-row 1 */}
                          <div className="sub-row-7">
                            <div className="inputdiv">
                              <CInputGroup>
                                <CInputGroupText className="small-input-text">
                                  Contact:
                                </CInputGroupText>
                                <CInput
                                  type="text"
                                  size="sm"
                                  className=" inputtextdark"
                                  value={custDetails ? custDetails.Contact : ""}
                                  onChange={(e) =>
                                    handleFieldChangeDetails(
                                      "Contact",
                                      e.target.value
                                    )
                                  }
                                />
                              </CInputGroup>
                            </div>
                            {/* Sub-row 2 */}
                            <div className="inputdiv">
                              <CInputGroup>
                                <CInputGroupText className="small-input-text">
                                  Short Name:
                                </CInputGroupText>
                                <CInput
                                  type="text"
                                  size="sm"
                                  className=" inputtextdark"
                                  value={
                                    custDetails ? custDetails.ShortName : ""
                                  }
                                  onChange={(e) =>
                                    handleFieldChangeDetails(
                                      "ShortName",
                                      e.target.value
                                    )
                                  }
                                />
                              </CInputGroup>
                            </div>
                          </div>
                          {/* Sub-row 3 */}
                          <div className="sub-row-7">
                            <div className="inputdiv">
                              <CInputGroup>
                                <CInputGroupText className="small-input-text">
                                  ACN:
                                </CInputGroupText>
                                <CInput
                                  type="text"
                                  size="sm"
                                  className=" inputtextdark"
                                  value={custDetails ? custDetails.Acn : ""}
                                  onChange={(e) =>
                                    handleFieldChangeDetails(
                                      "Acn",
                                      e.target.value
                                    )
                                  }
                                />
                              </CInputGroup>
                            </div>
                            {/* Sub-row 4 */}

                            <div className="inputdiv">
                              <CInputGroup>
                                <CInputGroupText className="small-input-text">
                                  ABN:
                                </CInputGroupText>
                                <CInput
                                  type="text"
                                  size="sm"
                                  className=" inputtextdark"
                                  value={custDetails ? custDetails.Abn : ""}
                                  onChange={(e) =>
                                    handleFieldChangeDetails(
                                      "Abn",
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
                                  Business:
                                </CInputGroupText>
                                <CInput
                                  type="text"
                                  size="sm"
                                  className=" inputtextdark"
                                  value={
                                    custDetails ? custDetails.Business : ""
                                  }
                                  onChange={(e) =>
                                    handleFieldChangeDetails(
                                      "Business",
                                      e.target.value
                                    )
                                  }
                                />
                              </CInputGroup>
                            </div>
                            <div className="inputdiv">
                              <CInputGroup>
                                <CInputGroupText className="small-input-text">
                                  GST Control:
                                </CInputGroupText>
                                <CSelect
                                  type="text"
                                  className=" inputtextdark"
                                  size="sm"
                                  onChange={(e) => setGstValue(e.target.value)}
                                  value={gstValue}
                                  // value={
                                  //   productTabledata.SorderHead
                                  //     ? productTabledata.SorderHead.Order_date.split("T")[0]
                                  //     : jobOrderDate
                                  // }
                                >
                                  <option value="1">
                                    Get gst from Product
                                  </option>
                                  <option value="0">No gst to Apply</option>
                                </CSelect>
                              </CInputGroup>
                            </div>
                          </div>

                          {/* Sub-row 5 */}

                          {/* <div className="inputdiv">
                              <CInputGroup>
                                <FindInPageIcon className="lookupIconQuotation" />
                              </CInputGroup>
                            </div> */}

                          <div className="inputdiv50">
                            <CInputGroup>
                              <CInputGroupText className="small-input-text">
                                Postal Address:
                              </CInputGroupText>
                              <CInput
                                type="text"
                                size="sm"
                                className=" inputtextdark"
                                value={custDetails ? custDetails.Address1 : ""}
                                onChange={(e) =>
                                  handleFieldChangeDetails(
                                    "Address1",
                                    e.target.value
                                  )
                                }
                              />
                            </CInputGroup>
                          </div>
                          <div className="inputdiv50">
                            <CInput
                              type="text"
                              size="sm"
                              className=" inputtextdark"
                              value={custDetails ? custDetails.Address2 : ""}
                              onChange={(e) =>
                                handleFieldChangeDetails(
                                  "Address2",
                                  e.target.value
                                )
                              }
                            />
                          </div>

                          <div className="sub-row-4">
                            <div className="inputdiv">
                              <CInputGroup>
                                <CInputGroupText className="small-input-text">
                                  City:
                                </CInputGroupText>
                                <CInput
                                  type="text"
                                  size="sm"
                                  className=" inputtextdark"
                                  value={custDetails ? custDetails.City : ""}
                                  onChange={(e) =>
                                    handleFieldChangeDetails(
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
                                  value={custDetails ? custDetails.State : ""}
                                  onChange={(e) =>
                                    handleFieldChangeDetails(
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
                                  value={
                                    custDetails ? custDetails.Postcode : ""
                                  }
                                  onChange={(e) =>
                                    handleFieldChangeDetails(
                                      "Postcode",
                                      e.target.value
                                    )
                                  }
                                />
                              </CInputGroup>
                            </div>
                          </div>

                          {/* Sub-row 7 */}
                          <div className="sub-row-4">
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
                                    custDetails ? custDetails.Telephone : ""
                                  }
                                  onChange={(e) =>
                                    handleFieldChangeDetails(
                                      "Telephone",
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
                                  value={custDetails ? custDetails.Mobile : ""}
                                  onChange={(e) =>
                                    handleFieldChangeDetails(
                                      "Mobile",
                                      e.target.value
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
                                  value={custDetails ? custDetails.Fax : ""}
                                  onChange={(e) =>
                                    handleFieldChangeDetails(
                                      "Fax",
                                      e.target.value
                                    )
                                  }
                                />
                              </CInputGroup>
                            </div>
                          </div>
                          {/* Sub-row 8 */}
                          <div className="sub-row-7">
                            <div className="inputdiv">
                              <CInputGroup>
                                <CInputGroupText className="small-input-text">
                                  Email Address:
                                </CInputGroupText>
                                <CInput
                                  type="text"
                                  size="sm"
                                  className="inputtextdark"
                                  value={
                                    custDetails ? custDetails.DocketEmail : ""
                                  }
                                  onChange={(e) =>
                                    handleFieldChangeDetails(
                                      "DocketEmail",
                                      e.target.value
                                    )
                                  }
                                />
                              </CInputGroup>
                            </div>
                            <div className="inputdiv">
                              <CInputGroup>
                                <CInputGroupText className="small-input-text">
                                  Docket Email:
                                </CInputGroupText>
                                <CInput
                                  type="text"
                                  size="sm"
                                  className="inputtextdark"
                                  value={
                                    custDetails ? custDetails.DocketEmail : ""
                                  }
                                  onChange={(e) =>
                                    handleFieldChangeDetails(
                                      "DocketEmail",
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
                                  Start Date:
                                </CInputGroupText>
                                <CInput
                                  type="text"
                                  size="sm"
                                  className="inputtextdark"
                                  value={
                                    custDetails && custDetails.StartDate
                                      ? custDetails.StartDate.split(" ")[0]
                                      : ""
                                  }
                                  onChange={(e) =>
                                    handleFieldChangeDetails(
                                      "StartDate",
                                      e.target.value
                                    )
                                  }
                                />
                              </CInputGroup>
                            </div>
                            <div className="inputdiv">
                              <CInputGroup>
                                <CInputGroupText className="small-input-text">
                                  Company:
                                </CInputGroupText>
                                <CInput
                                  type="text"
                                  size="sm"
                                  className=" inputtextdark"
                                  value={
                                    custDetails ? custDetails.CompanyCode : ""
                                  }
                                  onChange={(e) =>
                                    handleFieldChangeDetails(
                                      "CompanyCode",
                                      e.target.value
                                    )
                                  }
                                />
                              </CInputGroup>
                            </div>
                          </div>
                          <div className="sub-row-7">
                            <div className="inputdiv">
                              <label className="small-input-text">
                                Browse Availble
                              </label>
                              <div
                                style={{
                                  display: "flex",
                                  marginLeft: "20px",
                                  width: "400px",
                                }}
                              >
                                <label className=" ">
                                  <input
                                    className="productradiobtn"
                                    type="radio"
                                    // value={
                                    //   custDetails
                                    //     ? custDetails.BrowseAvailable
                                    //     : ""
                                    // }
                                    value="Y"
                                    checked={
                                      custDetails
                                        ? custDetails.BrowseAvailable === "Y"
                                        : ""
                                    }
                                    onChange={(e) =>
                                      handleFieldChangeDetails(
                                        "BrowseAvailable",
                                        e.target.value
                                      )
                                    }
                                  />
                                  Yes
                                </label>

                                <label className=" ">
                                  <input
                                    className="productradiobtn"
                                    type="radio"
                                    // value={
                                    //   custDetails
                                    //     ? custDetails.BrowseAvailable
                                    //     : ""
                                    // }
                                    value="N"
                                    checked={
                                      custDetails
                                        ? custDetails.BrowseAvailable === "N"
                                        : ""
                                    }
                                    onChange={(e) =>
                                      handleFieldChangeDetails(
                                        "BrowseAvailable",
                                        e.target.value
                                      )
                                    }
                                  />
                                  No
                                </label>
                              </div>
                            </div>
                            <div className="inputdiv">
                              <label className=" ">Is Internal Customer</label>
                              <div
                                style={{
                                  display: "flex",
                                  marginLeft: "20px",
                                  width: "400px",
                                }}
                              >
                                <label className=" ">
                                  <input
                                    className="productradiobtn"
                                    type="radio"
                                    // value={
                                    //   custDetails
                                    //     ? custDetails.Isinternalcust
                                    //     : ""
                                    // }
                                    value="1"
                                    checked={
                                      custDetails && custDetails.Isinternalcust
                                        ? custDetails.Isinternalcust === "1"
                                        : false
                                    }
                                    onChange={(e) =>
                                      handleFieldChangeDetails(
                                        "Isinternalcust",
                                        e.target.value,
                                        "int"
                                      )
                                    }
                                  />
                                  Yes
                                </label>

                                <label className=" ">
                                  <input
                                    className="productradiobtn"
                                    type="radio"
                                    // value={
                                    //   custDetails
                                    //     ? custDetails.Isinternalcust
                                    //     : ""
                                    // }
                                    value="0"
                                    checked={
                                      custDetails && custDetails.Isinternalcust
                                        ? custDetails.Isinternalcust === "0"
                                        : false
                                    }
                                    onChange={(e) =>
                                      handleFieldChangeDetails(
                                        "Isinternalcust",
                                        e.target.value,
                                        "int"
                                      )
                                    }
                                  />
                                  No
                                </label>
                              </div>
                            </div>
                          </div>
                        </CCol>
                      </CRow>
                      {/* Add your content here */}
                    </CTabPane>
                    <CTabPane visible={activeTab === 1}>
                      {/* Content for Notes tab */}

                      <CRow>
                        <CCol>
                          <div>
                            {/* Sub-row 1 */}
                            <div className="sub-row-7">
                              <div className="inputdiv">
                                <CInputGroup>
                                  <CInputGroupText className="small-input-text">
                                    Tax Cert:
                                  </CInputGroupText>
                                  <CInput
                                    type="text"
                                    size="sm"
                                    className=" inputtextdark"
                                    value={
                                      custDetails ? creditDetails.TaxCert : ""
                                    }
                                    onChange={(e) =>
                                      handleFieldChangeCredit(
                                        "TaxCert",
                                        e.target.value
                                      )
                                    }
                                  />
                                </CInputGroup>
                              </div>
                              <div className="inputdiv">
                                <CInputGroup>
                                  <CInputGroupText className="small-input-text">
                                    Ledger:
                                  </CInputGroupText>
                                  <CInput
                                    type="text"
                                    className=" inputtextdark"
                                    size="sm"
                                    value={
                                      custDetails ? creditDetails.RunCode : ""
                                    }
                                    onChange={(e) =>
                                      handleFieldChangeCredit(
                                        "RunCode",
                                        e.target.value
                                      )
                                    }
                                  />
                                  7 DAY/ INT/ MISC/ MON/ SUNDAY
                                </CInputGroup>
                              </div>
                            </div>
                            {/* Sub-row 2 */}
                            <div className="sub-row-7">
                              <div className="inputdiv">
                                <CInputGroup>
                                  <CInputGroupText className="small-input-text">
                                    Payee No:
                                  </CInputGroupText>
                                  <CInput
                                    type="text"
                                    size="sm"
                                    className=" inputtextdark"
                                    value={
                                      custDetails ? creditDetails.PayeeNo : ""
                                    }
                                    onChange={(e) =>
                                      handleFieldChangeCredit(
                                        "PayeeNo",
                                        e.target.value
                                      )
                                    }
                                  />
                                </CInputGroup>
                              </div>
                              <div className="inputdiv">
                                <CInputGroup>
                                  <CInputGroupText className="small-input-text">
                                    Credit Limit:
                                  </CInputGroupText>
                                  <CInput
                                    type="text"
                                    size="sm"
                                    className=" inputtextdark"
                                    value={
                                      custDetails
                                        ? creditDetails.CreditLimit
                                        : ""
                                    }
                                    // onChange={(e) =>
                                    //   handleFieldChangeCredit(
                                    //     "PayeeNo",
                                    //     e.target.value
                                    //   )
                                    // }
                                  />
                                </CInputGroup>
                              </div>
                            </div>
                            {/* Sub-row 3 */}
                            {/* Sub-row 4 */}
                            <div className="sub-row-4">
                              <div className="inputdiv">
                                <CInputGroup>
                                  <CInputGroupText className="small-input-text">
                                    Cr Status:
                                  </CInputGroupText>
                                  <CInput
                                    type="text"
                                    size="sm"
                                    className=" inputtextdark"
                                    // value={
                                    //   custDetails ? creditDetails.PayeeNo : ""
                                    // }
                                    onChange={(e) =>
                                      handleFieldChangeCredit(
                                        "PayeeNo",
                                        e.target.value
                                      )
                                    }
                                  />
                                </CInputGroup>
                              </div>
                              <div className="inputdiv">
                                <CInputGroup>
                                  <CInputGroupText className="small-input-text">
                                    Price Group:
                                  </CInputGroupText>
                                  <CSelect
                                    type="text"
                                    size="sm"
                                    className=" inputtextdark"
                                    //onChange={(e) => setRegion(e.target.value)}
                                    // value={region}
                                    // value={
                                    //   productTabledata.SorderHead
                                    //     ? productTabledata.SorderHead.Order_date.split("T")[0]
                                    //     : jobOrderDate
                                    // }
                                  >
                                    {/* <option value=""></option>
                                    <option value="1">
                                      Get gst from Product
                                    </option> */}
                                    {priceGroupValue.map((option) => (
                                      <option
                                        value={option.Code}
                                        key={option.Description}
                                      >
                                        {option.Description}
                                      </option>
                                    ))}
                                  </CSelect>
                                </CInputGroup>
                              </div>
                              <div className="inputdiv">
                                <CInputGroup>
                                  <CInputGroupText className="small-input-text">
                                    Pricing :
                                  </CInputGroupText>
                                  <CSelect
                                    type="text"
                                    size="sm"
                                    className=" inputtextdark"
                                    onChange={(e) =>
                                      setPricingValue(e.target.value)
                                    }
                                    value={pricingValue}
                                  >
                                    <option value="1">Price List Only</option>
                                    <option value="2">Open</option>
                                  </CSelect>
                                </CInputGroup>
                              </div>
                            </div>
                            {/* Sub-row 5 */}
                            <div className="sub-row-7">
                              <div className="inputdiv">
                                <CInputGroup>
                                  <CInputGroupText className="small-input-text">
                                    Inv Frequency:
                                  </CInputGroupText>
                                  <CInput
                                    type="text"
                                    size="sm"
                                    className="inputtextdark"
                                    value={
                                      custDetails ? creditDetails.IvceFreq : ""
                                    }
                                    onChange={(e) =>
                                      handleFieldChangeCredit(
                                        "IvceFreq",
                                        e.target.value
                                      )
                                    }
                                  />
                                </CInputGroup>
                              </div>
                              <div className="inputdiv">
                                <button className="jobinputdivbutton">
                                  Save as Default
                                </button>
                                D- DAILY/ W-WEEKLY/ F-FORNIGHT / M- MONTHLY
                              </div>
                            </div>
                            {/* Sub-row 6 */}
                            <div className="sub-row-7">
                              <div className="inputdiv">
                                <CInputGroup>
                                  <CInputGroupText className="small-input-text">
                                    Last Inv.Date:
                                  </CInputGroupText>
                                  <CInput
                                    type="text"
                                    className=" inputtextdark"
                                    size="sm"
                                    value={
                                      custDetails
                                        ? creditDetails.LastIvceDate
                                        : ""
                                    }
                                    onChange={(e) =>
                                      handleFieldChangeCredit(
                                        "LastIvceDate",
                                        e.target.value
                                      )
                                    }
                                  />
                                </CInputGroup>
                              </div>
                              {/* Sub-row 7 */}

                              <div className="inputdiv">
                                <CInputGroup>
                                  <CInputGroupText className="small-input-text">
                                    Payment Days :
                                  </CInputGroupText>
                                  <CInput
                                    type="text"
                                    size="sm"
                                    className=" inputtextdark"
                                    value={
                                      custDetails ? creditDetails.PayDays : ""
                                    }
                                    onChange={(e) =>
                                      handleFieldChangeCredit(
                                        "PayDays",
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
                                    From :
                                  </CInputGroupText>
                                  <CSelect
                                    type="text"
                                    size="sm"
                                    className=" inputtextdark"
                                    onChange={(e) =>
                                      setFromValue(e.target.value)
                                    }
                                    value={fromValue}
                                  >
                                    <option value="0">End of month</option>
                                    <option value="1">Invoice Date</option>
                                  </CSelect>
                                </CInputGroup>
                              </div>
                              <div className="inputdiv">
                                <CInputGroup>
                                  <CInputGroupText className="small-input-text">
                                    Rep Code :
                                  </CInputGroupText>
                                  <CInput
                                    type="text"
                                    size="sm"
                                    className=" inputtextdark"
                                    value={
                                      custDetails ? creditDetails.RepCode : ""
                                    }
                                    onChange={(e) =>
                                      handleFieldChangeCredit(
                                        "RepCode",
                                        e.target.value
                                      )
                                    }
                                  />
                                  <FindInPageIcon
                                    className="lookupIconQuotation"
                                    onClick={() =>
                                      handleButtonClick(SalesPerson)
                                    }
                                  />
                                  <button className="jobinputdivbutton">
                                    Save as Default
                                  </button>
                                </CInputGroup>
                              </div>
                            </div>
                            {/* Sub-row 8 */}

                            <div className="sub-row-7">
                              <div className="inputdiv">
                                <CInputGroup>
                                  <CInputGroupText className="small-input-text">
                                    Deleted :
                                  </CInputGroupText>

                                  <div
                                    style={{
                                      display: "flex",
                                      marginLeft: "20px",
                                      width: "400px",
                                    }}
                                  >
                                    <label className=" ">
                                      <input
                                        className="productradiobtn"
                                        type="radio"
                                        value="S"
                                        checked={
                                          creditDetails
                                            ? creditDetails.DelFlag === "Y"
                                            : ""
                                        }
                                        // onChange={handleMapOptionChange}
                                      />
                                      Yes
                                    </label>

                                    <label className=" ">
                                      <input
                                        className="productradiobtn"
                                        type="radio"
                                        value="G"
                                        checked={
                                          creditDetails
                                            ? creditDetails.DelFlag === "N"
                                            : ""
                                        }
                                        // onChange={handleMapOptionChange}
                                      />
                                      No
                                    </label>
                                  </div>
                                </CInputGroup>
                              </div>

                              <div className="inputdiv">
                                <CInputGroup>
                                  <CInputGroupText className="small-input-text">
                                    GL State Pre fix:
                                  </CInputGroupText>
                                  <CInput
                                    type="text"
                                    size="sm"
                                    className=" inputtextdark"
                                    value={
                                      custDetails ? creditDetails.PayDays : ""
                                    }
                                  />
                                  <FindInPageIcon className="lookupIconQuotation" />
                                </CInputGroup>
                              </div>
                            </div>
                            <div className="sub-row-7">
                              <div className="inputdiv">
                                <CInputGroup>
                                  <CInputGroupText className="small-input-text">
                                    Last Inv.Transfer Day :
                                  </CInputGroupText>
                                  <CInput
                                    type="text"
                                    size="sm"
                                    className=" inputtextdark"
                                    value={
                                      custDetails
                                        ? creditDetails.LastIvceDate
                                        : ""
                                    }
                                  />
                                </CInputGroup>
                              </div>
                              <div className="inputdiv">
                                <CInputGroup>
                                  <CInputGroupText className="small-input-text">
                                    Correspondence :
                                  </CInputGroupText>
                                  <CSelect
                                    type="text"
                                    size="sm"
                                    className=" inputtextdark"
                                    value={
                                      custDetails
                                        ? creditDetails.Correspondance
                                        : ""
                                    }
                                    //onChange={(e) => setRegion(e.target.value)}
                                  >
                                    <option value=""></option>
                                    <option value="1">post</option>
                                    <option value="1">post</option>
                                    <option value="1">post</option>
                                  </CSelect>
                                </CInputGroup>
                              </div>
                            </div>
                            <div className="sub-row-7">
                              <div
                                // className="width400"
                                style={{
                                  display: "flex",
                                }}
                              >
                                <div className="inputdiv ">
                                  <label className="small-input-text width200">
                                    Auto Credit Status Update ?
                                  </label>
                                  <div
                                    style={{
                                      display: "flex",
                                      marginLeft: "20px",
                                      width: "200px",
                                    }}
                                  >
                                    <label className=" ">
                                      <input
                                        className="productradiobtn"
                                        type="radio"
                                        value="Y"
                                        checked={
                                          creditDetails
                                            ? creditDetails.CustData === "Y"
                                            : ""
                                        }
                                        // onChange={handleMapOptionChange}
                                      />
                                      Yes
                                    </label>

                                    <label className=" ">
                                      <input
                                        className="productradiobtn"
                                        type="radio"
                                        value="N"
                                        checked={
                                          creditDetails
                                            ? creditDetails.CustData === "N"
                                            : ""
                                        }
                                        //checked={selectedOptionMap === "G"}
                                        // onChange={handleMapOptionChange}
                                      />
                                      No
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* <div className="sub-row-7">
                            <div className="inputdiv">
                              <CInputGroup>
                                <CInputGroupText className="small-input-text">
                                  :
                                </CInputGroupText>
                                <CInput type="text" size="sm" />
                              </CInputGroup>
                            </div>
                          </div> */}
                          </div>
                        </CCol>
                      </CRow>
                      {/* Add your content here */}
                    </CTabPane>
                    <CTabPane visible={activeTab === 2}>
                      <CRow>
                        <CCol>
                          <div>
                            <div className="sub-row-4">
                              <div className="inputdiv">
                                <CInputGroup>
                                  <CInputGroupText className="small-input-text">
                                    Title:
                                  </CInputGroupText>
                                  <CSelect
                                    type="text"
                                    size="sm"
                                    className=" inputtextdark"
                                    //onChange={(e) => setRegion(e.target.value)}
                                    // value={region}
                                    // value={
                                    //   productTabledata.SorderHead
                                    //     ? productTabledata.SorderHead.Order_date.split("T")[0]
                                    //     : jobOrderDate
                                    // }
                                  >
                                    {titileList.map((option) => (
                                      <option
                                        value={option.Code}
                                        key={option.Description}
                                      >
                                        {option.Description}
                                      </option>
                                    ))}
                                  </CSelect>
                                </CInputGroup>
                              </div>

                              <div className="inputdiv">
                                <CInputGroup>
                                  <CInputGroupText className="small-input-text">
                                    Position:
                                  </CInputGroupText>
                                  <CInput
                                    type="text"
                                    className=" inputtextdark"
                                    size="sm"
                                    value={
                                      ContactDetails
                                        ? ContactDetails.Position
                                        : ""
                                    }
                                    onChange={(e) =>
                                      handleFieldChangeContact(
                                        "Position",
                                        e.target.value
                                      )
                                    }
                                  />
                                </CInputGroup>
                              </div>
                              <div className="inputdiv">
                                <CInputGroup>
                                  <CInputGroupText className="small-input-text">
                                    Initials:
                                  </CInputGroupText>
                                  <CInput
                                    type="text"
                                    size="sm"
                                    className=" inputtextdark"
                                    value={
                                      ContactDetails
                                        ? ContactDetails.Initials
                                        : ""
                                    }
                                    onChange={(e) =>
                                      handleFieldChangeContact(
                                        "Initials",
                                        e.target.value
                                      )
                                    }
                                  />
                                </CInputGroup>
                              </div>
                            </div>
                            <div className="sub-row-7"></div>

                            <div className="sub-row-7">
                              <div className="inputdiv">
                                <CInputGroup>
                                  <CInputGroupText className="small-input-text">
                                    First Name:
                                  </CInputGroupText>
                                  <CInput
                                    type="text"
                                    size="sm"
                                    className=" inputtextdark"
                                    // value={
                                    //   ContactDetails
                                    //     ? ContactDetails.Position
                                    //     : ""
                                    // }
                                    onChange={(e) =>
                                      handleFieldChangeContact(
                                        "Position",
                                        e.target.value
                                      )
                                    }
                                  />
                                </CInputGroup>
                              </div>
                              <div className="inputdiv">
                                <CInputGroup>
                                  <CInputGroupText className="small-input-text">
                                    Surname:
                                  </CInputGroupText>
                                  <CInput
                                    type="text"
                                    size="sm"
                                    className=" inputtextdark"
                                    value={
                                      ContactDetails
                                        ? ContactDetails.Surname
                                        : ""
                                    }
                                    onChange={(e) =>
                                      handleFieldChangeContact(
                                        "Surname",
                                        e.target.value
                                      )
                                    }
                                  />
                                </CInputGroup>
                              </div>
                            </div>

                            <div className="sub-row-4">
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
                                      ContactDetails
                                        ? ContactDetails.Telephone
                                        : ""
                                    }
                                    onChange={(e) =>
                                      handleFieldChangeContact(
                                        "Telephone",
                                        e.target.value
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
                                      ContactDetails ? ContactDetails.Fax : ""
                                    }
                                    onChange={(e) =>
                                      handleFieldChangeContact(
                                        "Fax",
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
                                    value={
                                      ContactDetails
                                        ? ContactDetails.Mobile
                                        : ""
                                    }
                                    onChange={(e) =>
                                      handleFieldChangeContact(
                                        "Mobile",
                                        e.target.value
                                      )
                                    }
                                  />
                                </CInputGroup>
                              </div>
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
                                    ContactDetails
                                      ? ContactDetails.Address_1
                                      : ""
                                  }
                                  onChange={(e) =>
                                    handleFieldChangeContact(
                                      "Address_1",
                                      e.target.value
                                    )
                                  }
                                />
                                <CInput
                                  type="text"
                                  size="sm"
                                  className=" inputtextdark"
                                  value={
                                    ContactDetails
                                      ? ContactDetails.Address_2
                                      : ""
                                  }
                                  onChange={(e) =>
                                    handleFieldChangeContact(
                                      "Address_2",
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
                                    City:
                                  </CInputGroupText>
                                  <CInput
                                    type="text"
                                    size="sm"
                                    className=" inputtextdark"
                                    value={
                                      ContactDetails ? ContactDetails.City : ""
                                    }
                                    onChange={(e) =>
                                      handleFieldChangeContact(
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
                                    value={
                                      ContactDetails ? ContactDetails.State : ""
                                    }
                                    onChange={(e) =>
                                      handleFieldChangeContact(
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
                                    value={
                                      ContactDetails
                                        ? ContactDetails.Post_code
                                        : ""
                                    }
                                    onChange={(e) =>
                                      handleFieldChangeContact(
                                        "Post_code",
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
                                    Country:
                                  </CInputGroupText>
                                  <CInput
                                    type="text"
                                    size="sm"
                                    className=" inputtextdark"
                                    value={
                                      ContactDetails
                                        ? ContactDetails.Country
                                        : ""
                                    }
                                    onChange={(e) =>
                                      handleFieldChangeContact(
                                        "Country",
                                        e.target.value
                                      )
                                    }
                                  />
                                </CInputGroup>
                              </div>
                              <div className="inputdiv">
                                <CInputGroup>
                                  <CInputGroupText className="small-input-text">
                                    Enternet:
                                  </CInputGroupText>
                                  <CInput
                                    type="text"
                                    size="sm"
                                    className=" inputtextdark"
                                    value={
                                      ContactDetails
                                        ? ContactDetails.InternetAdd
                                        : ""
                                    }
                                    onChange={(e) =>
                                      handleFieldChangeContact(
                                        "InternetAdd",
                                        e.target.value
                                      )
                                    }
                                  />
                                </CInputGroup>
                              </div>
                            </div>
                            <div className="inputdiv">
                              <CInputGroup>
                                <textarea
                                  className="form-control"
                                  rows="3"
                                  placeholder="Note"
                                  style={{ resize: "none" }}
                                  value={
                                    ContactDetails ? ContactDetails.Note : ""
                                  }
                                  onChange={(e) =>
                                    handleFieldChangeContact(
                                      "Note",
                                      e.target.value
                                    )
                                  }
                                ></textarea>
                              </CInputGroup>
                            </div>
                          </div>
                          <div>
                            <button
                              className="inputdivbutton marginL5"
                              style={{ width: "auto" }}
                            >
                              Clear
                            </button>
                            <button
                              className="inputdivbutton marginL5"
                              style={{ width: "auto" }}
                            >
                              Add/Edit Contact
                            </button>
                            <button
                              className="inputdivbutton marginL5 "
                              style={{ width: "auto" }}
                            >
                              Remove Contact
                            </button>
                          </div>
                          <ContactTable_cust
                            ContactDetails={rowContactDetails}
                            handlerowclickContact={handlerowclickContact}
                          />
                        </CCol>
                      </CRow>
                    </CTabPane>
                    <CTabPane visible={activeTab === 3}>
                      <CRow>
                        <CCol>
                          <div>
                            {/* Sub-row 1 */}
                            <div className="inputdiv50">
                              <CInputGroup>
                                <CInputGroupText className="small-input-text">
                                  Contact:
                                </CInputGroupText>
                                <CInput
                                  type="text"
                                  size="sm"
                                  className=" inputtextdark"
                                  value={
                                    DepartmentDetails
                                      ? DepartmentDetails.Contact
                                      : ""
                                  }
                                  onChange={(e) =>
                                    handleFieldChangeDepartments(
                                      "Contact",
                                      e.target.value
                                    )
                                  }
                                />
                              </CInputGroup>
                            </div>
                            {/* Sub-row 2 */}

                            <div className="inputdiv50">
                              <CInputGroup>
                                <CInputGroupText className="small-input-text">
                                  Telephone:
                                </CInputGroupText>
                                <CInput
                                  type="text"
                                  size="sm"
                                  className=" inputtextdark"
                                  value={
                                    DepartmentDetails
                                      ? DepartmentDetails.Telephone
                                      : ""
                                  }
                                  onChange={(e) =>
                                    handleFieldChangeDepartments(
                                      "Telephone",
                                      e.target.value
                                    )
                                  }
                                />
                              </CInputGroup>
                            </div>
                            {/* Sub-row 3 */}
                            {/* <div className="inputdiv">
                              <CInputGroup>
                                <CInputGroupText className="small-input-text">
                                  Fax :
                                </CInputGroupText>
                                <CInput type="text" size="sm" />
                              </CInputGroup>
                            </div> */}
                            {/* Sub-row 4 */}
                            <div className="inputdiv50">
                              <CInputGroup>
                                <CInputGroupText className="small-input-text">
                                  Email:
                                </CInputGroupText>
                                <CInput
                                  type="text"
                                  size="sm"
                                  className=" inputtextdark"
                                  value={
                                    DepartmentDetails
                                      ? DepartmentDetails.InternetAdd
                                      : ""
                                  }
                                  onChange={(e) =>
                                    handleFieldChangeDepartments(
                                      "InternetAdd",
                                      e.target.value
                                    )
                                  }
                                />
                              </CInputGroup>
                            </div>

                            <div className="inputdiv50">
                              <CInputGroup>
                                <CInputGroupText className="small-input-text">
                                  Mobile:
                                </CInputGroupText>
                                <CInput
                                  type="text"
                                  className=" inputtextdark"
                                  size="sm"
                                  value={
                                    DepartmentDetails
                                      ? DepartmentDetails.Mobile
                                      : ""
                                  }
                                  onChange={(e) =>
                                    handleFieldChangeDepartments(
                                      "Mobile",
                                      e.target.value
                                    )
                                  }
                                />
                              </CInputGroup>
                            </div>

                            <div className="inputdiv50">
                              <CInputGroup>
                                <textarea
                                  className="form-control inputtextdark"
                                  rows="9"
                                  placeholder="Note"
                                  style={{ resize: "none" }}
                                  value={
                                    DepartmentDetails
                                      ? DepartmentDetails.Note
                                      : ""
                                  }
                                  onChange={(e) =>
                                    handleFieldChangeDepartments(
                                      "Note",
                                      e.target.value
                                    )
                                  }
                                ></textarea>
                              </CInputGroup>
                            </div>

                            {/* Sub-row 8 */}
                          </div>
                        </CCol>
                      </CRow>
                      {/* Add your content here */}
                    </CTabPane>
                    <CTabPane visible={activeTab === 4}>
                      {/* Content for Contractors tab */}

                      {/* Add your content here */}
                      <CRow>
                        <CCol>
                          <div>
                            {/* Sub-row 1 */}

                            <div className="inputdiv50">
                              <CInputGroup>
                                <CInputGroupText className="small-input-text">
                                  Payer:
                                </CInputGroupText>

                                <CInput
                                  type="text"
                                  className=" inputtextdark"
                                  size="sm"
                                  value={
                                    BankingDetails ? BankingDetails.Payer : ""
                                  }
                                  onChange={(e) =>
                                    handleFieldChangeBanking(
                                      "Payer",
                                      e.target.value
                                    )
                                  }
                                />
                              </CInputGroup>
                            </div>
                            {/* Sub-row 2 */}
                            <div className="inputdiv50">
                              <CInputGroup>
                                <CInputGroupText className="small-input-text">
                                  Bank Name:
                                </CInputGroupText>
                                <CInput
                                  type="text"
                                  className=" inputtextdark"
                                  size="sm"
                                  value={
                                    BankingDetails
                                      ? BankingDetails.BankName
                                      : ""
                                  }
                                  onChange={(e) =>
                                    handleFieldChangeBanking(
                                      "BankName",
                                      e.target.value
                                    )
                                  }
                                />
                              </CInputGroup>
                            </div>

                            {/* Sub-row 3 */}

                            <div className="inputdiv50">
                              <CInputGroup>
                                <CInputGroupText className="small-input-text">
                                  Branch :
                                </CInputGroupText>

                                <CInput
                                  type="text"
                                  size="sm"
                                  className="inputtextdark"
                                  value={
                                    BankingDetails ? BankingDetails.Branch : ""
                                  }
                                  onChange={(e) =>
                                    handleFieldChangeBanking(
                                      "Branch",
                                      e.target.value
                                    )
                                  }
                                />
                              </CInputGroup>
                            </div>
                            {/* Sub-row 4 */}

                            <div className="inputdiv50">
                              <CInputGroup>
                                <CInputGroupText className="small-input-text">
                                  BSB No:
                                </CInputGroupText>
                                <CInput
                                  type="text"
                                  size="sm"
                                  className=" inputtextdark"
                                  value={
                                    BankingDetails ? BankingDetails.BsbNo : ""
                                  }
                                  onChange={(e) =>
                                    handleFieldChangeBanking(
                                      "BsbNo",
                                      e.target.value
                                    )
                                  }
                                />
                              </CInputGroup>
                            </div>
                            <div className="inputdiv50">
                              <CInputGroup>
                                <CInputGroupText className="small-input-text">
                                  Account No:
                                </CInputGroupText>
                                <CInput
                                  type="text"
                                  size="sm"
                                  className=" inputtextdark"
                                  value={
                                    BankingDetails
                                      ? BankingDetails.AccountNo
                                      : ""
                                  }
                                  onChange={(e) =>
                                    handleFieldChangeBanking(
                                      "AccountNo",
                                      e.target.value
                                    )
                                  }
                                />
                              </CInputGroup>
                            </div>
                          </div>
                        </CCol>
                      </CRow>
                    </CTabPane>
                    <CTabPane visible={activeTab === 5}>
                      <CRow>
                        <CCol>
                          <AuditLog_cust AuditlogData={AuditLogDetails} />
                        </CCol>
                      </CRow>
                      {/* Add your content here */}
                    </CTabPane>
                  </CTabContent>
                </CTabs>
              </CCardBody>{" "}
            </CCard>
          </CRow>
        </CCardBody>
      )}
    </CCard>
  );
}
