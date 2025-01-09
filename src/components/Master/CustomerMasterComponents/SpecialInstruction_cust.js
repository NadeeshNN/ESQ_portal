import React from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CInput,
  CInputGroup,
  CInputGroupText,
} from "@coreui/react";

export default function SpecialInstruction_cust() {
  return (
    <CCard style={{ width: "70vh", height: "50vh" }}>
      <CCardHeader className="headerEQModal">
        {" "}
        Customer Special Instruction Update |Costomer code : adam
      </CCardHeader>
      <CCardBody>
        <div className="inputdiv">
          <CInputGroup>
            <CInputGroupText className="small-input-text">
              Special Instructions
            </CInputGroupText>
            <CInput type="text" size="sm" />
          </CInputGroup>
        </div>
      </CCardBody>{" "}
    </CCard>
  );
}
