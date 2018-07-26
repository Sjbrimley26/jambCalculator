const _ = require("lodash");

const sampleEXTDoor = {
  location: "EXTERIOR",
  build: "PH-D",
  sidelites: 0,
  hinge_finish: "SN",
  // hinge_radius: "1/4",
  swing: "IN",
  jamb_width: "7-1/2",
  handing: "LH",
  threshold_finish: "MILL",
  height: "80",
  material: "FJ"
};

// Different Idea

const sampleDoor = {
  location: "INTERIOR",
  build: "PH-S",
  hinge_finish: "SN",
  jamb_width: "4-5/8",
  handing: "LH",
  height: "68",
  material: "FJ"
};

const sampleBD = {
  location: "INTERIOR",
  height: "68",
  handing: "LH",
  hinge_measurements: ["7", "36", "65"],
  bore_measurements: ["44"],
  hinge_radius: "1/4",
  build: "B&D",
  hinge_size: "3-1/2"
};

/*
  TODO:
    Add all variants of:

    height: 68, 70, 80 (although 80 and 70 will be the same)
    build: PH-S, PH-D, PH-BC, B&D
    material: FJ, Solid Pine, KA, Composite
    jamb_width: 3 or less, 4-5/8, 5-3/8, 6-5/8, 7-1/2, 12, 16

    swing: in, out
    sidelites: 0, 1, 2
    

*/

const allBuildsAndOptions = new Map([
  [
    { // Details
      location: "INTERIOR",
      build: "PH-S",
      jamb_width: "4-5/8",
      height: "68",
      material: "FJ"
    },
    25 // Price
  ],
  [
    {
      location: "INTERIOR",
      build: "PH-S",
      jamb_width: "5-3/8",
      height: "68",
      material: "FJ"
    },
    28 // Double Check
  ],
  [
    {
      height: "68",
      hinge_radius: "1/4",
      build: "B&D"
    },
    25
  ],
]);

const getPricingDetails = doorOptions => {

  if ( doorOptions.build === "B&D" ) {
    let {
      handing,
      location, // should be irrelevant
      hinge_measurements,
      bore_measurements,
      hinge_size, // I think these are the same price ???
      ...details
    } = doorOptions;

    if ( details.hinge_radius === "5/8" ) {
      details.hinge_radius = "1/4"; // So we don't have to duplicate entries
    }

    return details;
  }
  
  if ( doorOptions.location === "INTERIOR" ) {
    let {
      hinge_finish, // So all properties that don't affect price are taken away
      handing,
      ...details
    } = doorOptions;

    return details;
  } 
  
  else {
    let {
      hinge_finish,
      handing,
      threshold_finish,
      ...details
    } = doorOptions;

    return details;
  }

};

const getPrice = doorOptions => {
  return [...allBuildsAndOptions].filter(build => {
    let [ details, price ] = build;
    return _.isEqual( details, getPricingDetails(doorOptions) );
  })[0][1];
};

console.log(sampleBD, `Price: ${getPrice(sampleBD)}`);

