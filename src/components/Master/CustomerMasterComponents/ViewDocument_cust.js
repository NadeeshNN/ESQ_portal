import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";

export default function ViewDocument_cust() {
  return (
    <CCard
      //className="routehistoryGlass"
      style={{ width: "80vh", height: "60vh" }}
    >
      <CCardHeader className="headerEQModal">
        {" "}
        View Customer Documents
      </CCardHeader>
      <CCardBody>
        <CRow>
          <CCol md={4}>
            {" "}
            <div className="inputdiv">
              <CInputGroup>
                <CInputGroupText className="small-input-text">
                  Client Code
                </CInputGroupText>
                <CInput type="text" size="sm" />
              </CInputGroup>
            </div>
          </CCol>
          <CCol md={4}>text here</CCol>
          <CCol md={4}>
            {" "}
            <div
              style={{
                display: "flex",
                marginLeft: "20px",
                width: "400px",
              }}
            >
              <label className=" ">
                <input className="productradiobtn" type="radio" value="S" />
                Open
              </label>

              <label className=" ">
                <input className="productradiobtn" type="radio" value="G" />
                Edit
              </label>
            </div>{" "}
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
                  <th style={{ width: "200px" }}></th>
                  <th style={{ width: "350px" }}></th>
                  <th style={{ width: "350px" }}></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="3"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CCardBody>{" "}
    </CCard>
  );
}
