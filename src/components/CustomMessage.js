import React from "react";

const CustomMessage = ({ onTryAgain }) => {
  return (
    <div className="custom-message">
      Something Went Wrong!
      <br /> No Questions Available
      <br /> Please try again later!
      <div className="try-again-footer">
        <button className="next-btn" onClick={onTryAgain}>
          Try Again
        </button>
      </div>
    </div>
  );
};

export default CustomMessage;
