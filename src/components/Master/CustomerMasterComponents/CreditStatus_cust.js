import React from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSelect,
} from "@coreui/react";

export default function CreditStatus_cust() {
  return (
    <CCard
      //className="routehistoryGlass"
      style={{ width: "60vh", height: "60vh" }}
    >
      <CCardHeader className="headerEQModal">
        Customer Credit Status Update
      </CCardHeader>
      <CCardBody>
        <CRow>
          <CCol md={4}>Cust code:</CCol>
          <CCol md={4}>
            <div className="inputdiv">
              <CInputGroup>
                <CInputGroupText className="small-input-text">
                  Cr Status:
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
                  <option value="1">02</option>
                </CSelect>
              </CInputGroup>
            </div>
          </CCol>
          <CCol md={4}>
            <div className="inputdiv">
              <CInputGroup>
                <CInputGroupText className="small-input-text">
                  Pin Number
                </CInputGroupText>
                <CInput type="text" size="sm" />
                {/* <FindInPageIcon className="lookupIconQuotation" /> */}
              </CInputGroup>
            </div>
          </CCol>
        </CRow>
        <div>
          <div className="Qt-ContactTable">
            <table class="tableQt-SiteTable" style={{ marginTop: "10px" }}>
              <thead
                class="tableQt-SiteTable-grey-header"
                style={{
                  height: "3px",
                  position: "sticky",
                  top: "0",
                  fontSize: "11px",
                }}
              >
                <tr>
                  <th style={{ width: "100px" }}>Cr Status</th>
                  <th style={{ width: "350px" }}>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="19"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CCardBody>{" "}
    </CCard>
  );
}
