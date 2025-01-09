// import React from 'react'

// export default function Qt_contacts() {
//   return (
//     <div>Qt_contacts</div>
//   )
// }
import React, { useEffect } from "react";
import { useState } from "react";
import { API_URL } from "src/components/util/config";
import LinearProgress from "@material-ui/core/LinearProgress";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";

export default function Qt_contacts(props) {
  const [loading, setLoading] = useState(false);
  //const [siteContact, setSiteContact] = useState([]);

  const { siteContact } = props;

  const handleRowClick = (contact, telephone) => {
    // Store the selected "Quote No" in session storage
    sessionStorage.setItem("selectedContact", contact);
    sessionStorage.setItem("selectedTelephone", telephone);

    if (props.onClose) {
      props.onClose();
    }
  };

  return (
    <CCard
      className="routehistoryGlass"
      style={{ width: "30vh", height: "40vh", color: "white" }}
    >
      <CCardHeader className="headerEQModal"> Secondary Contact</CCardHeader>
      <CCardBody>
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
                  <th style={{ width: "80px" }}>Contact</th>
                  <th style={{ width: "150px" }}>Mobile</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan="19">
                      <LinearProgress style={{ width: "100%" }} />
                    </td>
                  </tr>
                )}
                {!loading &&
                  (siteContact?.length > 0 ? (
                    siteContact.map((item, index) => {
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
                          onDoubleClick={() =>
                            handleRowClick(item.Contact, item.Telephone)
                          }
                        >
                          <td style={{}}>{item.Contact}</td>
                          <td style={{}}>{item.Telephone}</td>

                          {/* 
                         
                          <td>{item.Total_price}</td> */}
                        </tr>
                        //if item.ColorBoldCol == ture then i need to make that row Total_cost,Total_price,Price need to color in oragne bold
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="19">No data available</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </CCardBody>{" "}
    </CCard>
  );
}
