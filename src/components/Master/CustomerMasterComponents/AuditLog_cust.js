import React, { useState } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
export default function AuditLog_cust(props) {
  const [loading, setLoading] = useState(false);
  const { AuditlogData } = props;

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
              <th style={{ width: "250px" }}>Originator</th>
              <th style={{ width: "250px" }}>Date</th>
              <th style={{ width: "280px" }}>Field</th>
              <th style={{ width: "450px" }}>Modification</th>
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
              (AuditlogData?.length > 0 ? (
                AuditlogData.map((item, index) => {
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
                    >
                      <td style={{}}>{item.Originator}</td>
                      <td style={{}}>{item.ModifiedDate}</td>
                      <td style={{}}>{item.ModifiedData}</td>
                      <td style={{}}>{item.LogMessage}</td>
                    </tr>
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
  );
}
