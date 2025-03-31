import './alert.scss';
import React from "react";

const Alert = ({ type = "info", message = '', visible = false, close }) => {
  
  if (!visible) return null;

  return (
    <div className={`alert alert-${type}`}>
      <span className="alert-message">{message}</span>
      <button onClick={() => close()} className="alert-close">✕</button>
    </div >
  );
};

export default Alert;
