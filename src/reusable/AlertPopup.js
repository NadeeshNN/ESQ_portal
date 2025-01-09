import React from "react";

const AlertPopup = (props) => {
  const { message, onClose, type, onConfirm, onCancel } = props;

  const alertClass = type === "confirm" ? "confirm-alert" : "error-alert";

  return (
    <div className={`alert-popup ${alertClass}`}>
      <div className="alert-content">
        <p>{message}</p>
        {type === "confirm" && (
          <div>
            <button onClick={onConfirm}>OK</button>
            <button onClick={onCancel}>Cancel</button>
          </div>
        )}
        {type !== "confirm" && <button onClick={onClose}>OK</button>}
      </div>
    </div>
  );
};

export default AlertPopup;
