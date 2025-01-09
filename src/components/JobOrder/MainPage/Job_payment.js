import {
  CInput,
  CInputGroup,
  CInputGroupText,
  CSelect,
} from "@coreui/react";

import React, { useEffect, useState } from "react";
const moment = require("moment");
export default function Job_payment(props) {
  const [JobCostDetails, setJobCostDetails] = useState([]);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedyear, setSelectedyear] = useState("");

  const { PaymentDetails } = props;
  const { SupProductDetails } = props;
  const { QuoteNew } = props;
  const { deleted } = props;

  // console.log("PaymentDetails",PaymentDetails);
  useEffect(() => {
    setJobCostDetails(PaymentDetails);
    console.log("PaymentDetails", PaymentDetails);
  }, [PaymentDetails]);

  useEffect(() => {
    sessionStorage.setItem("JobCostDetails", []);
    setJobCostDetails("");
    console.log("PaymentDetails", PaymentDetails, QuoteNew);
  }, [QuoteNew]);

  useEffect(() => {
    // Check if either SupProductDetails or deleted has changed
    if (SupProductDetails || deleted) {
      try {
        const data = JSON.parse(sessionStorage.getItem("JobCostDetails"));
        console.log("job", data);
        setJobCostDetails(data);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  }, [SupProductDetails, deleted]);

  const currentYear = moment().year();
  const yearsOptions = [
    <option key="emptyYear" value=""></option>,
    ...Array.from({ length: 20 }, (_, index) => currentYear + index).map(
      (year) => (
        <option key={year} value={year}>
          {year}
        </option>
      )
    ),
  ];
  // Generate options for days (1-31) with an empty option
  const daysOptions = [
    <option key="emptyDay" value=""></option>,
    ...Array.from({ length: 20 }, (_, index) => index + 1).map((day) => (
      <option key={day} value={day}>
        {day}
      </option>
    )),
  ];

  // Generate options for months (1-12) with an empty option
  const monthsOptions = [
    <option key="emptyMonth" value=""></option>,
    ...Array.from({ length: 12 }, (_, index) => index + 1).map((month) => (
      <option key={month} value={month}>
        {month}
      </option>
    )),
  ];

  // useEffect to set initial values
  useEffect(() => {
    setSelectedDay("");
    setSelectedMonth("");
  }, []);

  return (
    <div className="dividercards paymentcard">
      <div>
        {/* Sub-row 1 */}
        <div className="inputdiv">
          <CInputGroup>
            <CInputGroupText className="small-input-text">
              Card Number:
            </CInputGroupText>
            <CInput type="text" size="sm" className=" inputtextdark" />
          </CInputGroup>
        </div>
        <div className="inputdiv">
          <CInputGroup>
            <CInputGroupText className="small-input-text">
              Card Holder's Name:
            </CInputGroupText>
            <CInput type="text" size="sm" className=" inputtextdark" />
          </CInputGroup>
        </div>

        <div className="inputdiv">
          <CInputGroup>
            <CInputGroupText className="small-input-text">
              Exp Date:
            </CInputGroupText>
            <CSelect
              size="sm"
              className="inputtextdark"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {monthsOptions}
            </CSelect>
            /
            <CSelect
              size="sm"
              className="inputtextdark"
              value={selectedyear}
              onChange={(e) => setSelectedyear(e.target.value)}
            >
              {yearsOptions}
            </CSelect>
          </CInputGroup>
        </div>
        <div className="inputdiv">
          <CInputGroup>
            <CInputGroupText className="small-input-text">CVV:</CInputGroupText>
            <CInput type="text" size="sm" className=" inputtextdark" />
          </CInputGroup>
        </div>
      </div>
      <div
        style={{
          border: "2px solid black",
          borderRadius: "10px",
          margin: "10px",
          padding: "20px",
        }}
      >
        <div
          style={{
            //marginRight: "160px",
            //left: 30,
            // top: 85,
            fontStyle: "bold",
            fontWeight: "600",
            // position: "absolute",
            fontSize: "13px",
            width: "140px",
          }}
        >
          <label>Job Cost Details</label>
        </div>
        <div className="inputdiv">
          <CInputGroup>
            <CInputGroupText className="small-input-text">
              Total Qty:
            </CInputGroupText>
            <CInput
              type="text"
              size="sm"
              style={{ textAlign: "right" }}
              className=" inputtextdark"
              value={
                JobCostDetails && JobCostDetails.Total_qty
                  ? JobCostDetails.Total_qty
                  : 0
              }
            />
          </CInputGroup>
        </div>
        <div className="inputdiv">
          <CInputGroup>
            <CInputGroupText className="small-input-text">
              Total Material Charge:
            </CInputGroupText>
            <CInput
              type="text"
              style={{ textAlign: "right" }}
              size="sm"
              className=" inputtextdark"
              value={
                JobCostDetails && JobCostDetails.Total_material_charge
                  ? "$ " + JobCostDetails.Total_material_charge.toFixed(2)
                  : 0.0
              }
            />
          </CInputGroup>
        </div>
        <div className="inputdiv">
          <CInputGroup>
            <CInputGroupText className="small-input-text">
              GST Charges:
            </CInputGroupText>
            <CInput
              type="text"
              size="sm"
              style={{ textAlign: "right" }}
              className=" inputtextdark"
              value={
                JobCostDetails && JobCostDetails.Gst
                  ? "$ " + JobCostDetails.Gst.toFixed(2)
                  : 0.0
              }
            />
          </CInputGroup>
        </div>
        <div className="inputdiv">
          <CInputGroup>
            <CInputGroupText className="small-input-text">
              Total Job Cost:
            </CInputGroupText>
            <CInput
              type="text"
              size="sm"
              style={{ textAlign: "right" }}
              className=" inputtextdark"
              value={
                JobCostDetails && JobCostDetails.Order_total
                  ? "$ " + JobCostDetails.Order_total.toFixed(2)
                  : 0.0
              }
            />
          </CInputGroup>
        </div>
      </div>
    </div>
  );
}
