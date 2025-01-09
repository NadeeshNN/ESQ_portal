import React from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import printIcon from "./../../../assets/icons/quotaionbtns/print.png";
import saveIcon from "./../../../assets/icons/quotaionbtns/save.png";
import newDocIcon from "./../../../assets/icons/quotaionbtns/new.png";
import customerIcon from "./../../../assets/icons/quotaionbtns/customer.png";

export default function QuotationPrint() {
  return (
    <CCard
      className="routehistoryGlass"
      style={{
        width: "50vh",
        height: "25vh",
        color: "white",
        padding: "0px",
        borderRadius: "10px",
      }}
    >
      <CCardHeader
        className="headerEQModal"
        style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
      >
        {" "}
        Print Quotation
      </CCardHeader>
      <CCardBody>
        <div
          className="printIcon"
          style={{
            display: "flex",
            // overflowX: "auto",
            flexWrap: "wrap",
            marginTop: "20px",
            justifyContent: "center", // Center horizontally
            alignItems: "center",
          }}
        >
          <button className="printIcon-button">
            <img src={newDocIcon} alt="Icon" className="printIcon-icon" />
          </button>
          <button className="printIcon-button">
            <img src={printIcon} alt="Icon" className="printIcon-icon" />
          </button>
          <button className="printIcon-button">
            <img src={saveIcon} alt="Icon" className="printIcon-icon" />
          </button>
          <button className="printIcon-button">
            <img src={saveIcon} alt="Icon" className="printIcon-icon" />
          </button>
        </div>
      </CCardBody>{" "}
    </CCard>
  );
}
