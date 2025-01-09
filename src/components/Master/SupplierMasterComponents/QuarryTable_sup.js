import React from "react";

export default function QuarryTable_sup() {
  return (
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
              <th style={{ width: "250px" }}>Quarry Store</th>
              <th style={{ width: "250px" }}>Address 1</th>
              <th style={{ width: "280px" }}>Address 2</th>
              <th style={{ width: "450px" }}>Melway Ref</th>
            </tr>
          </thead>
          <tbody>
            {/* {loading && ( */}
            <tr>
              <td colSpan="19">
                {/* <LinearProgress style={{ width: "100%" }} /> */}
              </td>
            </tr>
            {/* )} */}
            {/* {!loading &&
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
                
                      <td>{item.Total_price}</td> 
                        </tr>
                      
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="19">No data available</td>
                    </tr>
                  ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
