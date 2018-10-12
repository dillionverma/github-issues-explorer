import React from "react";

import "./LoadingSpinner.css";

const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="loading-spinner__bounce" />
    <div className="loading-spinner__bounce loading-spinner__bounce--two" />
  </div>
);

export default LoadingSpinner;
