import React from "react";
import {
  CCard,
  CCardBody,
} from "@coreui/react";

import JobTruckEnq from "src/components/centralcontrol/JobTruckEnq.js";


const Dashboard = () => {
  return (
    <>
      <CCard>
        <CCardBody>
          <JobTruckEnq />
        </CCardBody>
      </CCard>
    </>
  );
};

export default Dashboard;
