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
import { Tooltip } from "@material-ui/core";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import saveIcon from "../../assets/icons/quotaionbtns/save.png";
import RemoveDocIcon from "../../assets/icons/quotaionbtns/RemoveDocIcon.png";

import GroupIcon from "../../assets/icons/quotaionbtns/GroupUserIcon.png";
import UserIcon from "../../assets/icons/quotaionbtns/userIcon.png";
import BinIcon from "../../assets/icons/quotaionbtns/BinIcon.png";
import EditIcon from "../../assets/icons/quotaionbtns/EditDetailsIcon.png";

import DeleteDollarIcon from "../../assets/icons/quotaionbtns/DollarDeleteIcon.png";
import QuarryTable_sup from "./SupplierMasterComponents/QuarryTable_sup";
import PriceListTable_sup from "./SupplierMasterComponents/PriceListTable_sup";
import ProductListTable_sup from "./SupplierMasterComponents/ProductListTable_sup";
import ContactTable_sup from "./SupplierMasterComponents/ContactTable_sup";
import AuditLogTable_sup from "./SupplierMasterComponents/AuditLogTable_sup";
import DocumentTable_sup from "./SupplierMasterComponents/DocumentTable_sup";
import SupplierLookup_sup from "./SupplierMasterComponents/SupplierLookup_sup";
import EFTDetauls_sup from "./SupplierMasterComponents/EFTDetauls_sup";
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
export default function QuotationSuplier() {
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
      <CCardHeader className="headerEQModal"> Quotation Suplier</CCardHeader>
      <CCardBody>
        {popupVisible && selectedComponent && (
          <div style={overlayStyle} onClick={() => closePopup()}>
            <div onClick={(e) => e.stopPropagation()}>
              {/* Render the selected component */}
              {selectedComponent === SupplierLookup_sup && (
                <SupplierLookup_sup onClose={closePopup} />
              )}
              {selectedComponent === EFTDetauls_sup && (
                <EFTDetauls_sup onClose={closePopup} />
              )}
            </div>
          </div>
        )}
        <CRow>
          <div
            className="menu-bar dividercards"
            style={{ width: "100%", marginLeft: "20px", marginBottom: "20px" }}
          >
            <Tooltip title="New">
              <button className="menu-button" style={{ width: "auto" }}>
                <img src={saveIcon} alt="Icon" className="menu-icon" />
              </button>
            </Tooltip>
            <Tooltip title="Erase">
              <button
                className="menu-button"
                style={{ width: "auto" }}
                //  onClick={() => handleButtonClick(QuotationPrint)}
              >
                <img src={""} alt="Icon" className="menu-icon" />
              </button>
            </Tooltip>
            <Tooltip title="Erase">
              <button className="menu-button" style={{ width: "auto" }}>
                <img src={RemoveDocIcon} alt="Icon" className="menu-icon" />
              </button>
            </Tooltip>
            <Tooltip title="Delete Store">
              <button
                className="menu-button"
                style={{ width: "auto" }}
                // onClick={() => handleButtonClick(QuotationCust)}
              >
                <img src={BinIcon} alt="Icon" className="menu-icon" />
              </button>
            </Tooltip>
            <Tooltip title="Change Code">
              <button className="menu-button" style={{ width: "auto" }}>
                <img src={UserIcon} alt="Icon" className="menu-icon" />
              </button>
            </Tooltip>
            <Tooltip title="Merge Code">
              <button
                className="menu-button"
                style={{ width: "auto" }}
                //  onClick={() => handleButtonClick(QuotationDistanceMaster)}
              >
                <img src={GroupIcon} alt="Icon" className="menu-icon" />
              </button>
            </Tooltip>
            <Tooltip title="Edit Details">
              <button
                className="menu-button"
                style={{ width: "auto" }}
                onClick={() => handleButtonClick(EFTDetauls_sup)}
              >
                <img src={EditIcon} alt="Icon" className="menu-icon" />
              </button>
            </Tooltip>
            <Tooltip title="Delete Price">
              <button
                className="menu-button"
                style={{ width: "auto" }}
                //  onClick={() => handleButtonClick(QuotationDistanceMaster)}
              >
                <img src={DeleteDollarIcon} alt="Icon" className="menu-icon" />
              </button>
            </Tooltip>

            {/* Add more buttons as needed */}
          </div>
        </CRow>
        {/* <hr className="divider" /> */}
        <CRow>
          <CCol md={5}>
            {" "}
            <div className="inputdiv marginL20">
              <CInputGroup>
                <CInputGroupText className="small-input-text">
                  Supplier Code:
                </CInputGroupText>
                <CInput type="text" size="sm" />
                <FindInPageIcon
                  className="lookupIconQuotation"
                  onClick={() => handleButtonClick(SupplierLookup_sup)}
                />
              </CInputGroup>
            </div>
          </CCol>
          <CCol md={5}>
            <CInputGroup>
              <CInputGroupText className="small-input-text">
                Fuel Levy Rate(%):
              </CInputGroupText>
              <CInput type="text" size="sm" />
            </CInputGroup>
          </CCol>
        </CRow>
        <CRow>
          <CCard
            style={{
              width: "140vh",
              height: "65vh",
              marginLeft: "2%",
              marginTop: "2%",
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
                    <CNavLink className="small-tab-link">Group</CNavLink>
                  </CNavItem>
                  <CNavItem className="small-tab-item">
                    <CNavLink className="small-tab-link">Pay</CNavLink>
                  </CNavItem>
                  <CNavItem className="small-tab-item">
                    <CNavLink className="small-tab-link">Quarry</CNavLink>
                  </CNavItem>
                  <CNavItem className="small-tab-item">
                    <CNavLink className="small-tab-link">Price List</CNavLink>
                  </CNavItem>
                  <CNavItem className="small-tab-item">
                    <CNavLink className="small-tab-link">Product List</CNavLink>
                  </CNavItem>
                  <CNavItem className="small-tab-item">
                    <CNavLink className="small-tab-link">Contacts</CNavLink>
                  </CNavItem>
                  <CNavItem className="small-tab-item">
                    <CNavLink className="small-tab-link">Documents </CNavLink>
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
                        <div className="inputdiv">
                          <CInputGroup>
                            <CInputGroupText className="small-input-text">
                              Supplier Status:
                            </CInputGroupText>
                            <label>
                              <input
                                className="productradiobtn"
                                // type="checkbox"
                                // id="selectAll"
                                style={{}}
                                type="checkbox"
                                /// checked={fuelLvy}
                                // onChange={() => setcheckfuelLvy(!fuelLvy)}
                                // id={`rowCheckbox${index}`}
                                // checked={selectedQuotes.includes(item.Quote_no)}
                                // onChange={() =>
                                //   handleRowCheckboxClick(item.Quote_no)
                                // }
                              />
                              Active
                            </label>
                          </CInputGroup>
                        </div>
                        <div className="inputdiv">
                          <CInputGroup>
                            <CInputGroupText className="small-input-text">
                              Name:
                            </CInputGroupText>
                            <CInput type="text" size="sm" />
                            <CInput type="text" size="sm" />
                          </CInputGroup>
                        </div>
                        {/* Sub-row 2 */}
                        <div className="sub-row-7">
                          <div className="inputdiv">
                            <CInputGroup>
                              <CInputGroupText className="small-input-text">
                                Short Name:
                              </CInputGroupText>
                              <CInput type="text" size="sm" />
                            </CInputGroup>
                          </div>

                          <div className="inputdiv">
                            <CInputGroup>
                              <CInputGroupText className="small-input-text">
                                Contact:
                              </CInputGroupText>
                              <CInput type="text" size="sm" />
                            </CInputGroup>
                          </div>
                        </div>

                        <div className="inputdiv">
                          <CInputGroup>
                            <CInputGroupText className="small-input-text">
                              Address:
                            </CInputGroupText>
                            <CInput type="text" size="sm" />
                            <CInput type="text" size="sm" />
                          </CInputGroup>
                        </div>
                        {/* Sub-row 3 */}
                        <div className="sub-row-4">
                          <div className="inputdiv">
                            <CInputGroup>
                              <CInputGroupText className="small-input-text">
                                City:
                              </CInputGroupText>
                              <CInput type="text" size="sm" />
                            </CInputGroup>
                          </div>
                          <div className="inputdiv">
                            <CInputGroup>
                              <CInputGroupText className="small-input-text">
                                State:
                              </CInputGroupText>
                              <CInput type="text" size="sm" />
                            </CInputGroup>
                          </div>
                          <div className="inputdiv">
                            <CInputGroup>
                              <CInputGroupText className="small-input-text">
                                Post Code:
                              </CInputGroupText>
                              <CInput type="text" size="sm" />
                            </CInputGroup>
                          </div>
                        </div>

                        {/* Sub-row 4 */}
                        <div className="sub-row-4">
                          <div className="inputdiv">
                            <CInputGroup>
                              <CInputGroupText className="small-input-text">
                                Map Reference:
                              </CInputGroupText>
                              <CInput type="text" size="sm" />
                              <FindInPageIcon />
                            </CInputGroup>
                          </div>
                          <div className="inputdiv">
                            <CInputGroup>
                              <CInputGroupText className="small-input-text">
                                Geofence Radius:
                              </CInputGroupText>
                              <CInput type="text" size="sm" />m
                            </CInputGroup>
                          </div>
                          <div className="inputdiv">
                            <CInputGroup>
                              <CInputGroupText className="small-input-text">
                                Coordinates:
                              </CInputGroupText>
                              <CInput type="text" size="sm" />-
                              <CInput type="text" size="sm" />
                            </CInputGroup>
                          </div>
                        </div>
                        <div className="sub-row-7">
                          <div className="inputdiv">
                            <CInputGroup>
                              <CInputGroupText className="small-input-text">
                                Region:
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
                                <option value="1"></option>
                              </CSelect>
                            </CInputGroup>
                          </div>
                          <div className="inputdiv">
                            <CInputGroup>
                              <CInputGroupText className="small-input-text">
                                Country:
                              </CInputGroupText>
                              <CInput type="text" size="sm" />
                            </CInputGroup>
                          </div>
                        </div>
                        {/* Sub-row 5 */}
                        <div className="sub-row-4">
                          <div className="inputdiv">
                            <CInputGroup>
                              <CInputGroupText className="small-input-text">
                                Phone:
                              </CInputGroupText>
                              <CInput type="text" size="sm" />
                            </CInputGroup>
                          </div>
                          <div className="inputdiv">
                            <CInputGroup>
                              <CInputGroupText className="small-input-text">
                                Fax:
                              </CInputGroupText>
                              <CInput type="text" size="sm" />
                            </CInputGroup>
                          </div>
                          <div className="inputdiv">
                            <CInputGroup>
                              <CInputGroupText className="small-input-text">
                                Mobile:
                              </CInputGroupText>
                              <CInput type="text" size="sm" />
                            </CInputGroup>
                          </div>
                        </div>
                        {/* Sub-row 6 */}
                        <div className="sub-row-7">
                          <div className="inputdiv">
                            <CInputGroup>
                              <CInputGroupText className="small-input-text">
                                Email:
                              </CInputGroupText>
                              <CInput type="text" size="sm" />
                            </CInputGroup>
                          </div>
                          {/* Sub-row 7 */}
                          <div className="inputdiv">
                            <CInputGroup>
                              <CInputGroupText className="small-input-text">
                                ABN Number:
                              </CInputGroupText>
                              <CInput type="text" size="sm" />
                            </CInputGroup>
                          </div>
                        </div>

                        {/* Sub-row 8 */}
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

                    {/* Add your content here */}
                  </CTabPane>
                  <CTabPane visible={activeTab === 1}>
                    {/* Content for Notes tab */}
                    <div className="inputdiv50">
                      <CInputGroup>
                        <CInputGroupText className="small-input-text">
                          Start Date:
                        </CInputGroupText>
                        <CInput type="text" size="sm" />
                      </CInputGroup>
                    </div>
                    <div className="inputdiv50">
                      <CInputGroup>
                        <CInputGroupText className="small-input-text">
                          Classification:
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
                          <option value="1"></option>
                        </CSelect>
                      </CInputGroup>
                    </div>
                    <div className="inputdiv50">
                      <CInputGroup>
                        <CInputGroupText className="small-input-text">
                          Category:
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
                          <option value="1"></option>
                        </CSelect>
                      </CInputGroup>
                    </div>
                    <div className="inputdiv50">
                      <CInputGroup>
                        <CInputGroupText className="small-input-text">
                          Sub Category:
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
                          <option value="1"></option>
                        </CSelect>
                      </CInputGroup>
                    </div>
                    <div className="inputdiv50">
                      <CInputGroup>
                        <CInputGroupText className="small-input-text">
                          Supplier Group:
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
                          <option value="1"></option>
                        </CSelect>
                      </CInputGroup>
                    </div>
                    <div className="inputdiv50">
                      <CInputGroup>
                        <CInputGroupText className="small-input-text">
                          Parent Supplier:
                        </CInputGroupText>
                        <CInput type="text" size="sm" />
                        <FindInPageIcon />
                      </CInputGroup>
                    </div>
                    <div className="inputdiv50">
                      <CInputGroup>
                        <CInputGroupText className="small-input-text">
                          Previous Code:
                        </CInputGroupText>
                        <CInput type="text" size="sm" />
                        <FindInPageIcon />
                      </CInputGroup>
                    </div>
                    <div className="inputdiv">
                      <label>
                        <input
                          className="productradiobtn"
                          // type="checkbox"
                          // id="selectAll"
                          style={{}}
                          type="checkbox"
                          /// checked={fuelLvy}
                          // onChange={() => setcheckfuelLvy(!fuelLvy)}
                          // id={`rowCheckbox${index}`}
                          // checked={selectedQuotes.includes(item.Quote_no)}
                          // onChange={() =>
                          //   handleRowCheckboxClick(item.Quote_no)
                          // }
                        />
                        Payrol Tax Assesable
                      </label>
                    </div>
                    <div className="inputdiv">
                      <label>
                        <input
                          className="productradiobtn"
                          // type="checkbox"
                          // id="selectAll"
                          style={{}}
                          type="checkbox"
                          /// checked={fuelLvy}
                          // onChange={() => setcheckfuelLvy(!fuelLvy)}
                          // id={`rowCheckbox${index}`}
                          // checked={selectedQuotes.includes(item.Quote_no)}
                          // onChange={() =>
                          //   handleRowCheckboxClick(item.Quote_no)
                          // }
                        />
                        Energy Reporting
                      </label>
                    </div>
                    <div className="inputdiv">
                      <label>
                        <input
                          className="productradiobtn"
                          // type="checkbox"
                          // id="selectAll"
                          style={{}}
                          type="checkbox"
                          /// checked={fuelLvy}
                          // onChange={() => setcheckfuelLvy(!fuelLvy)}
                          // id={`rowCheckbox${index}`}
                          // checked={selectedQuotes.includes(item.Quote_no)}
                          // onChange={() =>
                          //   handleRowCheckboxClick(item.Quote_no)
                          // }
                        />
                        Carbon Reporting
                      </label>
                    </div>
                    {/* Add your content here */}
                  </CTabPane>
                  <CTabPane visible={activeTab === 2}>
                    {/* Content for Details tab */}
                    <div className="sub-row-7">
                      <div className="inputdiv">
                        <CInputGroup>
                          <CInputGroupText className="small-input-text">
                            Pay By:
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
                            <option value="1"></option>
                          </CSelect>
                        </CInputGroup>
                      </div>

                      <div className="inputdiv">
                        <CInputGroup>
                          <CInputGroupText className="small-input-text">
                            Supplier Type:
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
                            <option value="1"></option>
                          </CSelect>
                        </CInputGroup>
                      </div>
                    </div>
                    <div className="sub-row-7">
                      <div className="inputdiv">
                        <CInputGroup>
                          <CInputGroupText className="small-input-text">
                            Max Payment:
                          </CInputGroupText>
                          <CInput type="text" size="sm" /> (= $0.00 if N/A)
                        </CInputGroup>
                      </div>

                      <div className="inputdiv">
                        <CInputGroup>
                          <CInputGroupText className="small-input-text">
                            EFT Reference:
                          </CInputGroupText>
                          <CInput type="text" size="sm" />
                        </CInputGroup>
                      </div>
                    </div>
                    <div className="sub-row-7">
                      <div className="inputdiv">
                        <CInputGroup>
                          <CInputGroupText className="small-input-text">
                            Discount %:
                          </CInputGroupText>
                          <CInput type="text" size="sm" />
                        </CInputGroup>
                      </div>

                      <div className="inputdiv">
                        <CInputGroup>
                          <CInputGroupText className="small-input-text">
                            Type:
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
                            <option value="1"></option>
                          </CSelect>
                        </CInputGroup>
                      </div>
                    </div>
                    <div className="sub-row-7">
                      <div className="inputdiv">
                        <CInputGroup>
                          <CInputGroupText className="small-input-text">
                            Days:
                          </CInputGroupText>
                          <CInput type="text" size="sm" />
                        </CInputGroup>
                      </div>

                      <div className="inputdiv">
                        <CInputGroup>
                          <CInputGroupText className="small-input-text">
                            From:
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
                            <option value="1"></option>
                          </CSelect>
                        </CInputGroup>
                      </div>
                    </div>
                    <div className="sub-row-7">
                      <div className="inputdiv">
                        <label className="small-input-text">
                          Price Usually
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
                            Include GST
                          </label>

                          <label className=" ">
                            <input
                              className="productradiobtn"
                              type="radio"
                              value="G"
                              //checked={selectedOptionMap === "G"}
                              // onChange={handleMapOptionChange}
                            />
                            Exclude GST
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="sub-row-7">
                      <div className="inputdiv">
                        <label className="small-input-text">
                          Tax invoice Supplied
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
                    <div className="sub-row-7">
                      <div className="inputdiv">
                        <label className="small-input-text">
                          Pay by Consignment
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
                    <div className="inputdiv50">
                      <CInputGroup>
                        <CInputGroupText className="small-input-text">
                          Remittance Method:
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
                          <option value="1"></option>
                        </CSelect>
                      </CInputGroup>
                    </div>
                    <div className="sub-row-7">
                      <div className="inputdiv">
                        <CInputGroup>
                          <CInputGroupText className="small-input-text">
                            Status:
                          </CInputGroupText>
                          <CInput type="text" size="sm" />
                        </CInputGroup>
                      </div>

                      <div className="inputdiv">
                        <CInputGroup>
                          <CInputGroupText className="small-input-text">
                            Creator:
                          </CInputGroupText>
                          <CInput type="text" size="sm" />
                        </CInputGroup>
                      </div>
                    </div>
                    <div className="inputdiv">
                      <CInputGroup>
                        <CInputGroupText className="small-input-text">
                          Comments:
                        </CInputGroupText>
                        <CInput type="text" size="sm" />
                      </CInputGroup>
                    </div>

                    {/* Add your content here */}
                  </CTabPane>
                  <CTabPane visible={activeTab === 3}>
                    {/* Content for Contractors tab */}
                    <CRow>
                      <CCol>
                        {/* Sub-row 1 */}
                        <div className="inputdiv50">
                          <CInputGroup>
                            <CInputGroupText className="small-input-text">
                              Quarry Status:
                            </CInputGroupText>
                            <label>
                              <input
                                className="productradiobtn"
                                // type="checkbox"
                                // id="selectAll"
                                style={{}}
                                type="checkbox"
                                /// checked={fuelLvy}
                                // onChange={() => setcheckfuelLvy(!fuelLvy)}
                                // id={`rowCheckbox${index}`}
                                // checked={selectedQuotes.includes(item.Quote_no)}
                                // onChange={() =>
                                //   handleRowCheckboxClick(item.Quote_no)
                                // }
                              />
                              Active
                            </label>
                          </CInputGroup>
                        </div>
                        <div className="inputdiv50">
                          <CInputGroup>
                            <CInputGroupText className="small-input-text">
                              Quarry Store:
                            </CInputGroupText>
                            <CInput type="text" size="sm" />
                            <FindInPageIcon />
                          </CInputGroup>
                        </div>

                        <div className="inputdiv50">
                          <CInputGroup>
                            <CInputGroupText className="small-input-text">
                              Name:
                            </CInputGroupText>
                            <CInput type="text" size="sm" />
                          </CInputGroup>
                        </div>
                        <div className="inputdiv50">
                          <CInputGroup>
                            <CInputGroupText className="small-input-text">
                              Address 1:
                            </CInputGroupText>
                            <CInput type="text" size="sm" />
                          </CInputGroup>
                        </div>
                        <div className="inputdiv50">
                          <CInputGroup>
                            <CInputGroupText className="small-input-text">
                              Address 2:
                            </CInputGroupText>
                            <CInput type="text" size="sm" />
                          </CInputGroup>
                        </div>
                        <div className="sub-row-4">
                          <div className="inputdiv">
                            <CInputGroup>
                              <CInputGroupText className="small-input-text">
                                City:
                              </CInputGroupText>
                              <CInput type="text" size="sm" />
                            </CInputGroup>
                          </div>
                          <div className="inputdiv">
                            <CInputGroup>
                              <CInputGroupText className="small-input-text">
                                State:
                              </CInputGroupText>
                              <CInput type="text" size="sm" />
                            </CInputGroup>
                          </div>
                          <div className="inputdiv">
                            <CInputGroup>
                              <CInputGroupText className="small-input-text">
                                Post Code:
                              </CInputGroupText>
                              <CInput type="text" size="sm" />
                            </CInputGroup>
                          </div>
                        </div>
                        <div className="sub-row-7">
                          <div className="inputdiv">
                            <CInputGroup>
                              <CInputGroupText className="small-input-text">
                                Country:
                              </CInputGroupText>
                              <CInput type="text" size="sm" />
                            </CInputGroup>
                          </div>
                          <div className="inputdiv">
                            <CInputGroup>
                              <CInputGroupText className="small-input-text">
                                Map reference:
                              </CInputGroupText>
                              <CInput type="text" size="sm" />
                              <FindInPageIcon />
                            </CInputGroup>
                          </div>
                        </div>
                        <div className="sub-row-4">
                          <div className="inputdiv">
                            <CInputGroup>
                              <CInputGroupText className="small-input-text">
                                Phone:
                              </CInputGroupText>
                              <CInput type="text" size="sm" />
                            </CInputGroup>
                          </div>
                          <div className="inputdiv">
                            <CInputGroup>
                              <CInputGroupText className="small-input-text">
                                Fax:
                              </CInputGroupText>
                              <CInput type="text" size="sm" />
                            </CInputGroup>
                          </div>
                          <div className="inputdiv">
                            <CInputGroup>
                              <CInputGroupText className="small-input-text">
                                Mobile:
                              </CInputGroupText>
                              <CInput type="text" size="sm" />
                            </CInputGroup>
                          </div>
                        </div>
                        <div className="inputdiv50">
                          <CInputGroup>
                            <CInputGroupText className="small-input-text">
                              Contact:
                            </CInputGroupText>
                            <CInput type="text" size="sm" />
                          </CInputGroup>
                        </div>
                        <div className="inputdiv50">
                          <CInputGroup>
                            <CInputGroupText className="small-input-text">
                              Email:
                            </CInputGroupText>
                            <CInput type="text" size="sm" />
                          </CInputGroup>
                        </div>
                        <div>
                          <button
                            className="inputdivbutton marginL5"
                            style={{ width: "auto" }}
                          >
                            Add Store
                          </button>
                          <button
                            className="inputdivbutton marginL5 "
                            style={{ width: "auto" }}
                          >
                            Save/Update Store
                          </button>
                        </div>
                        <QuarryTable_sup />
                      </CCol>
                    </CRow>

                    {/* Add your content here */}
                  </CTabPane>
                  <CTabPane visible={activeTab === 4}>
                    {/* Content for Contractors tab */}
                    <PriceListTable_sup />
                    {/* Add your content here */}
                  </CTabPane>
                  <CTabPane visible={activeTab === 5}>
                    {/* Content for Contractors tab */}
                    <ProductListTable_sup />
                    {/* Add your content here */}
                  </CTabPane>
                  <CTabPane visible={activeTab === 6}>
                    {/* Content for Contractors tab */}
                    <div>
                      <div className="inputdiv50">
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
                            <option value=""></option>
                            <option value="1"></option>
                          </CSelect>
                        </CInputGroup>
                      </div>
                      <div className="sub-row-7">
                        <div className="inputdiv">
                          <CInputGroup>
                            <CInputGroupText className="small-input-text">
                              First Name:
                            </CInputGroupText>
                            <CInput type="text" size="sm" />
                          </CInputGroup>
                        </div>

                        <div className="inputdiv">
                          <CInputGroup>
                            <CInputGroupText className="small-input-text">
                              Surname:
                            </CInputGroupText>
                            <CInput type="text" size="sm" />
                          </CInputGroup>
                        </div>
                      </div>
                      <div className="sub-row-4">
                        <div className="inputdiv">
                          <CInputGroup>
                            <CInputGroupText className="small-input-text">
                              Phone:
                            </CInputGroupText>
                            <CInput type="text" size="sm" />
                          </CInputGroup>
                        </div>
                        <div className="inputdiv">
                          <CInputGroup>
                            <CInputGroupText className="small-input-text">
                              Fax:
                            </CInputGroupText>
                            <CInput type="text" size="sm" />
                          </CInputGroup>
                        </div>
                        <div className="inputdiv">
                          <CInputGroup>
                            <CInputGroupText className="small-input-text">
                              Mobile:
                            </CInputGroupText>
                            <CInput type="text" size="sm" />
                          </CInputGroup>
                        </div>
                      </div>
                      <div className="inputdiv">
                        <CInputGroup>
                          <CInputGroupText className="small-input-text">
                            Address:
                          </CInputGroupText>
                          <CInput type="text" size="sm" />
                          <CInput type="text" size="sm" />
                        </CInputGroup>
                      </div>
                      <div className="sub-row-4">
                        <div className="inputdiv">
                          <CInputGroup>
                            <CInputGroupText className="small-input-text">
                              City:
                            </CInputGroupText>
                            <CInput type="text" size="sm" />
                          </CInputGroup>
                        </div>
                        <div className="inputdiv">
                          <CInputGroup>
                            <CInputGroupText className="small-input-text">
                              State:
                            </CInputGroupText>
                            <CInput type="text" size="sm" />
                          </CInputGroup>
                        </div>
                        <div className="inputdiv">
                          <CInputGroup>
                            <CInputGroupText className="small-input-text">
                              Post Code:
                            </CInputGroupText>
                            <CInput type="text" size="sm" />
                          </CInputGroup>
                        </div>
                      </div>
                      <div className="sub-row-7">
                        <div className="inputdiv">
                          <CInputGroup>
                            <CInputGroupText className="small-input-text">
                              Country:
                            </CInputGroupText>
                            <CInput type="text" size="sm" />
                          </CInputGroup>
                        </div>

                        <div className="inputdiv">
                          <CInputGroup>
                            <CInputGroupText className="small-input-text">
                              Email:
                            </CInputGroupText>
                            <CInput type="text" size="sm" />
                          </CInputGroup>
                        </div>
                      </div>
                      <div className="inputdiv">
                        <CInputGroup>
                          <CInputGroupText className="small-input-text">
                            Note:
                          </CInputGroupText>
                          <CInput type="text" size="sm" />
                        </CInputGroup>
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
                    </div>
                    <ContactTable_sup />
                    {/* Add your content here */}
                  </CTabPane>
                  <CTabPane visible={activeTab === 7}>
                    {/* Content for Contractors tab */}
                    <div>
                      <button
                        className="inputdivbutton marginL5"
                        style={{ width: "auto" }}
                      >
                        View Now
                      </button>
                      <button
                        className="inputdivbutton marginL5"
                        style={{ width: "auto" }}
                      >
                        Browse Files
                      </button>
                    </div>
                    <DocumentTable_sup />
                    {/* Add your content here */}
                  </CTabPane>
                  <CTabPane visible={activeTab === 8}>
                    {/* Content for Contractors tab */}
                    <AuditLogTable_sup />
                    {/* Add your content here */}
                  </CTabPane>
                </CTabContent>
              </CTabs>
            </CCardBody>{" "}
          </CCard>{" "}
        </CRow>
      </CCardBody>
    </CCard>
  );
}
