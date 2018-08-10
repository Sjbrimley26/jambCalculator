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
    
    case "hinge_size":
      description = "Please select the height of the hinges.";
      break;
    
    case "hinge_radius":
      description = "Please select the radius of the hinges.";
      break;
    
    case "pair_type":
      description = "Please select the type of pair.";
      break;
    
    case "is_self_closing":
      description = 
        "Please choose whether the door will have self-closing hinges. " +
        "(If the door goes to an enclosed garage, these are required by regulation)";
      break;
    
    case "hinge_finish":
      description = "Please select a hinge finish.";
      break;
    
    case "threshold_finish":
      description = "Please select a threshold finish.";
      break;
    
    case "hinge_locations":
      description = "Please enter the distance in inches from the top of the door to the top of each hinge.";
      break;
    
    case "bore_locations":
      description = "Please enter the distance in inches from the top of the door to the center of each bore.";
      break;
    
    case "handing":
      description = 
        "Please enter the side of the door the hinges are on when the door is closed and the hinges are visible. " +
        "If the door is a pair, this will be the active door.";
      break;

  }

  return (
    <span className="description">
      { description }
    </span>
  );
};

export default Description;