import React from "react";
import { CCol, CRow } from "@coreui/react";
export default function ContactTable_cust(props) {
  const { ContactDetails } = props;

  const handlerowclick = () => {
    props.handlerowclickContact();
  };
  return (
    <div>
      <CRow>
        <CCol md={8}>
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
                  <th style={{ width: "100px" }}>Cont Code</th>
                  <th style={{ width: "350px" }}>Title</th>
                  <th style={{ width: "350px" }}>First Name</th>
                  <th style={{ width: "350px" }}>Surname</th>
                </tr>
              </thead>
              <tbody>
                {ContactDetails?.length > 0 ? (
                  ContactDetails.map((item, index) => {
                    return (
                      <tr
                        key={index}
                        className="siteThover-effect"
                        style={{
                          fontSize: "9px",
                          height: "5px",
                          marginBottom: "0px",
                          padding: "0px",
                          marginTop: "0px",
                        }}
                        onDoubleClick={() => handlerowclick()}
                      >
                        <td style={{}}>{item.ContactNo}</td>
                        <td style={{}}>{item.Title}</td>
                        <td style={{}}>{item.Contact}</td>
                        <td style={{}}>{item.Surname}</td>

                        {/* <td>{item.Total_price}</td> */}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="19">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CCol>
        <CCol md={4}>
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
                  <th style={{ width: "100px" }}>Interest</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="19"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </CCol>
      </CRow>
    </div>
  );
}
