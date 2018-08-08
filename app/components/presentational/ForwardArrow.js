import React from "react";
import forward from "../../assets/images/icons8/forward.png";

const ForwardArrow = ({
  handler
}) => {

  return (
    <div 
      className="forwardArrow"
      style={{ backgroundImage: `url(${forward})` }}
      onClick={ handler }
    >
    </div>
  )
};

export default ForwardArrow;