import React from "react";

const Spinner = () => {
  return (
    <div className="Spinner">
      <div className="spinner-border " role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
