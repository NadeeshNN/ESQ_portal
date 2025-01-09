import React from "react";

export default function DocumentTable_sup() {
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
              <th style={{ width: "250px" }}>Label</th>
              <th style={{ width: "250px" }}>Document Path</th>
              <th style={{ width: "380px" }}>Description</th>
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
  );
}
