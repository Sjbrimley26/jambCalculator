import React, { Component } from "react";
import reset from "../../assets/images/icons8/reset.png";

const ResetButton = ({ handler }) => {

  return (
    <div 
      className="resetButton"
      style={{ backgroundImage: `url(${ reset })`}}
      onClick={ handler }
    >
    </div>
  );
};

export default ResetButton;