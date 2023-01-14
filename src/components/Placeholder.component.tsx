import React from "react";
import NASA from "../NASA.svg";

export const Placeholder: React.FC = () => {
  return (
    <div className="placeholder">
      <p>
        <img src={NASA} alt="NASA" className="noSelect" />
        <span>Loading...</span>
      </p>
    </div>
  );
};
