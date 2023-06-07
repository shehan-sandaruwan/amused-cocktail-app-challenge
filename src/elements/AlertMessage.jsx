import React from "react";
import { Alert } from "react-bootstrap";

const AlertMessage = ({ message, variant }) => {
  const alertVariant = variant || "danger";
  return <Alert variant={alertVariant}>{message}</Alert>;
};

export default AlertMessage;
