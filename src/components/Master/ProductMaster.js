import React, { useState } from "react";
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
import AuditLog_cust from "./CustomerMasterComponents/AuditLog_cust";
import SupplierLookup_sup from "./SupplierMasterComponents/SupplierLookup_sup";
import { Label } from "@material-ui/icons";
export default function ProductMaster() {
  const [activeTab, setActiveTab] = useState(0);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);

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
  return (
    <CCard
      //className="routehistoryGlass"
      style={{ width: "auto", height: "auto" }}
       className="slideInBottom"
    >
      <CCardHeader className="headerEQModal"> Product Master</CCardHeader>
      <CCardBody>
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
                    <CNavLink className="small-tab-link">GL Codes</CNavLink>
                  </CNavItem>
                  <CNavItem className="small-tab-item">
                    <CNavLink className="small-tab-link">
                      Analysis Codes
                    </CNavLink>
                  </CNavItem>
                  <CNavItem className="small-tab-item">
                    <CNavLink className="small-tab-link">
                      Pref Suppliers
                    </CNavLink>
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
                        <div>
                          {/* Sub-row 1 */}

                          <div className="inputdiv50">
                            <CInputGroup>
                              <CInputGroupText className="small-input-text">
                                Product Group:
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
                                <option value=""></option>
                                <option value="1">1</option>
                              </CSelect>
                            </CInputGroup>
                          </div>
                          {/* Sub-row 2 */}
                          <div className="inputdiv50">
                            <CInputGroup>
                              <CInputGroupText className="small-input-text">
                                Product Code:
                              </CInputGroupText>
                              <CInput type="text" size="sm" />
                              <FindInPageIcon />
                            </CInputGroup>
                          </div>

                          {/* Sub-row 3 */}

                          <div className="inputdiv50">
                            <CInputGroup>
                              <CInputGroupText className="small-input-text">
                                Concrete Qty :
                              </CInputGroupText>

                              <CInput type="text" size="sm" />
                            </CInputGroup>
                          </div>
                          {/* Sub-row 4 */}

                          <div className="inputdiv50">
                            <CInputGroup>
                              <CInputGroupText className="small-input-text">
                                Description:
                              </CInputGroupText>
                              <CInput type="text" size="sm" />
                            </CInputGroup>
                          </div>
                          <div className="inputdiv50">
                            <CInputGroup>
                              <CInputGroupText className="small-input-text">
                                UOM:
                              </CInputGroupText>
                              <CInput type="text" size="sm" />
                              <FindInPageIcon />
                            </CInputGroup>
                          </div>

                          {/* Sub-row 5 */}
                          <div className="inputdiv50">
                            <CInputGroup>
                              <CInputGroupText className="small-input-text">
                                GST Status:
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
                                <option value=""></option>
                                <option value="1">1</option>
                              </CSelect>
                            </CInputGroup>
                          </div>
                          <div className="inputdiv50">
                            <CInputGroup>
                              <CInputGroupText className="small-input-text">
                                GST Rate:
                              </CInputGroupText>
                              <CInput type="text" size="sm" />
                            </CInputGroup>
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
                        <div className="sub-row-7">
                          {" "}
                          <div className="ProductMborderCard ">
                            <h6> Radio Adjustment GL Code</h6>

                            <div className="inputdiv">
                              <CInputGroup>
                                <CInputGroupText className="small-input-text">
                                  Account:
                                </CInputGroupText>
                                <CInput type="text" size="sm" />
                                <FindInPageIcon />
                              </CInputGroup>
                            </div>
                            <div className="inputdiv">
                              <CInputGroup>
                                <CInputGroupText className="small-input-text">
                                  Narration:
                                </CInputGroupText>
                                <CInput type="text" size="sm" />
                              </CInputGroup>
                            </div>
                          </div>
                          <div className="ProductMborderCard">
                            <h6> Purchase GL Code</h6>
                            <div className="inputdiv">
                              <CInputGroup>
                                <CInputGroupText className="small-input-text">
                                  Account:
                                </CInputGroupText>
                                <CInput type="text" size="sm" />
                                <FindInPageIcon />
                              </CInputGroup>
                            </div>
                            <div className="inputdiv">
                              <CInputGroup>
                                <CInputGroupText className="small-input-text">
                                  Narration:
                                </CInputGroupText>
                                <CInput type="text" size="sm" />
                              </CInputGroup>
                            </div>
                          </div>
                        </div>

                        <div className="sub-row-7">
                          {" "}
                          <div className="ProductMborderCard">
                            <h6> Sales GL Code</h6>
                            <div className="inputdiv">
                              <CInputGroup>
                                <CInputGroupText className="small-input-text">
                                  Account:
                                </CInputGroupText>
                                <CInput type="text" size="sm" />
                                <FindInPageIcon />
                              </CInputGroup>
                            </div>
                            <div className="inputdiv">
                              <CInputGroup>
                                <CInputGroupText className="small-input-text">
                                  Narration:
                                </CInputGroupText>
                                <CInput type="text" size="sm" />
                              </CInputGroup>
                            </div>
                          </div>
                          <div className="ProductMborderCard">
                            <h6> Subcontract Cartage GL Code</h6>
                            <div className="inputdiv">
                              <CInputGroup>
                                <CInputGroupText className="small-input-text">
                                  Account:
                                </CInputGroupText>
                                <CInput type="text" size="sm" />
                                <FindInPageIcon />
                              </CInputGroup>
                            </div>
                            <div className="inputdiv">
                              <CInputGroup>
                                <CInputGroupText className="small-input-text">
                                  Narration:
                                </CInputGroupText>
                                <CInput type="text" size="sm" />
                              </CInputGroup>
                            </div>
                          </div>
                        </div>
                      </CCol>
                    </CRow>
                    {/* Add your content here */}
                  </CTabPane>
                  <CTabPane visible={activeTab === 2}>
                    {/* Content for Details tab */}

                    <CRow>
                      <CCol>
                        <div>
                          <div className="inputdiv50">
                            <CInputGroup>
                              <CInputGroupText className="small-input-text">
                                Catalog Group:
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
                                <option value=""></option>
                                <option value="1">1</option>
                              </CSelect>
                              <button className="jobinputdivbutton">
                                Save as Default
                              </button>
                            </CInputGroup>
                          </div>
                          <div className="inputdiv50">
                            <CInputGroup>
                              <CInputGroupText className="small-input-text">
                                Catalog Type:
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
                                <option value=""></option>
                                <option value="1">1</option>
                              </CSelect>
                            </CInputGroup>
                          </div>
                          <div className="inputdiv50">
                            <CInputGroup>
                              <CInputGroupText className="small-input-text">
                                Catalog Class:
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
                                <option value=""></option>
                                <option value="1">1</option>
                              </CSelect>
                            </CInputGroup>
                          </div>
                          <div className="inputdiv50">
                            <CInputGroup>
                              <CInputGroupText className="small-input-text">
                                Costing Type:
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
                                <option value=""></option>
                                <option value="1">1</option>
                              </CSelect>
                            </CInputGroup>
                          </div>
                          <div className="inputdiv50">
                            <label className="small-input-text width200">
                              Update Inventory
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
                                  value="S"
                                  // checked={selectedOptionMap === "S"}
                                  // onChange={handleMapOptionChange}
                                />
                                Yes
                              </label>

                              <label className=" ">
                                <input
                                  className="productradiobtn"
                                  type="radio"
                                  value="G"
                                  //checked={selectedOptionMap === "G"}
                                  // onChange={handleMapOptionChange}
                                />
                                No
                              </label>
                            </div>
                          </div>
                          <div className="inputdiv50">
                            <label className="small-input-text  width200">
                              Serial Number
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
                                  value="S"
                                  // checked={selectedOptionMap === "S"}
                                  // onChange={handleMapOptionChange}
                                />
                                Yes
                              </label>

                              <label className=" ">
                                <input
                                  className="productradiobtn"
                                  type="radio"
                                  value="G"
                                  //checked={selectedOptionMap === "G"}
                                  // onChange={handleMapOptionChange}
                                />
                                No
                              </label>
                            </div>
                          </div>
                          <div className="inputdiv50">
                            <label className="small-input-text width200">
                              Lot Number
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
                                  value="S"
                                  // checked={selectedOptionMap === "S"}
                                  // onChange={handleMapOptionChange}
                                />
                                Yes
                              </label>

                              <label className=" ">
                                <input
                                  className="productradiobtn"
                                  type="radio"
                                  value="G"
                                  //checked={selectedOptionMap === "G"}
                                  // onChange={handleMapOptionChange}
                                />
                                No
                              </label>
                            </div>
                          </div>
                          <div className="inputdiv50">
                            <label className="small-input-text width200">
                              Browse Available
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
                                  value="S"
                                  // checked={selectedOptionMap === "S"}
                                  // onChange={handleMapOptionChange}
                                />
                                Yes
                              </label>

                              <label className=" ">
                                <input
                                  className="productradiobtn"
                                  type="radio"
                                  value="G"
                                  //checked={selectedOptionMap === "G"}
                                  // onChange={handleMapOptionChange}
                                />
                                No
                              </label>
                            </div>
                          </div>
                        </div>
                      </CCol>
                    </CRow>
                  </CTabPane>
                  <CTabPane visible={activeTab === 3}>
                    <CRow>
                      <CCol>{/* <SupplierLookup_sup /> */}</CCol>
                    </CRow>
                    {/* Add your content here */}
                  </CTabPane>
                  <CTabPane visible={activeTab === 4}>
                    {/* Content for Contractors tab */}

                    {/* Add your content here */}
                    <CRow>
                      <CCol>
                        <AuditLog_cust />
                      </CCol>
                    </CRow>
                  </CTabPane>
                </CTabContent>
              </CTabs>
            </CCardBody>{" "}
          </CCard>
        </CRow>
      </CCardBody>{" "}
    </CCard>
  );
}
