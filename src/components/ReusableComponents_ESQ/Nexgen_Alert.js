import React, { useEffect, useState } from "react";
import { Alert, AlertTitle, Stack } from "@mui/material";
const StyledAlerts = {
  position: "fixed",
  top: 10,
  right: "30%",
  left: "30%",
  //   background: "rgba(0, 0, 0, 0.7)",
  //   backdropFilter: "blur(2px)", // Adjust the blur radius as needed
  //   WebkitBackdropFilter: "blur(5px)", // For Safari
  zIndex: 9999999,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  //transform: "translateX(-50%)",
};
export default function Nexgen_Alert(props) {
  const [showAlert, setShowAlert] = useState(false);
  setTimeout(() => {
    props.onClose(); // Set loading to false once the task is completed
  }, 6000);
  return (
    <div>
      <Alert
        style={StyledAlerts}
        variant="filled"
        severity={props.severity}
        onClose={props.onClose}
      >
        <AlertTitle>{props.AlertTitle}</AlertTitle>
        {props.AlertMessage}
      </Alert>
    </div>
  );
}
