import React, { Component } from "react";

const Description = ({ option }) => {
  let description;

  switch( option ) {
    case "location":
      description = "Please select the location of the door.";
      break;

    case "build":
      description = "Please select a build option for the door.";
      break;

    case "material":
      description = "Please select a jamb material.";
      break;
    
    case "jamb_width":
      description = "Please select a jamb width.";
      break;
    
    case "height":
      description = "Please select the height of the door.";
      break;
    
    case "swing":
      description = "Please select the desired door swing direction.";
      break;
    
    case "sidelites":
      description = "Please select the number of sidelites.";
      break;
  }

  return (
    <span className="description">
      { description }
    </span>
  );
};

export default Description;