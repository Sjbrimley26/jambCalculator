const _ = require("lodash");

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

// Currently only contains the FJ Pine prices
const allBuildsAndOptions = new Map([
  // Pre hung FJ Singles
  // 68
  [
    { // Details
      location: "Interior",
      build: "Pre-Hung Single",
      jamb_width: "4-5/8\"",
      height: "6\'8\"",
      material: "FJ Pine"
    },
    26.19 // Price
  ],
  [
    {
      location: "Interior",
      build: "Pre-Hung Single",
      jamb_width: "5-3/8\"",
      height: "6\'8\"",
      material: "FJ Pine"
    },
    34.2
  ],
  [
    {
      location: "Interior",
      build: "Pre-Hung Single",
      jamb_width: "6-5/8\"",
      height: "6\'8\"",
      material: "FJ Pine"
    },
    41.29
  ],
  [
    {
      location: "Interior",
      build: "Pre-Hung Single",
      jamb_width: "7-1/2\"",
      height: "6\'8\"",
      material: "FJ Pine"
    },
    46.02
  ],
  // 80
  [
    {
      location: "Interior",
      build: "Pre-Hung Single",
      jamb_width: "4-5/8\"",
      height: "8\'0\"",
      material: "FJ Pine"
    },
    31.98
  ],
  [
    {
      location: "Interior",
      build: "Pre-Hung Single",
      jamb_width: "5-3/8\"",
      height: "8\'0\"",
      material: "FJ Pine"
    },
    41.25
  ],
  [
    {
      location: "Interior",
      build: "Pre-Hung Single",
      jamb_width: "6-5/8\"",
      height: "8\'0\"",
      material: "FJ Pine"
    },
    48.60
  ],
  [
    {
      location: "Interior",
      build: "Pre-Hung Single",
      jamb_width: "7-1/2\"",
      height: "8\'0\"",
      material: "FJ Pine"
    },
    55.43
  ],
  // Pre-Hung FJ French Pairs
  // 68
  [
    {
      location: "Interior",
      build: "Pre-Hung Double",
      jamb_width: "4-5/8\"",
      height: "6\'8\"",
      material: "FJ Pine"
    },
    59.27
  ],
  [
    {
      location: "Interior",
      build: "Pre-Hung Double",
      jamb_width: "5-3/8\"",
      height: "6\'8\"",
      material: "FJ Pine"
    },
    68.89
  ],
  [
    {
      location: "Interior",
      build: "Pre-Hung Double",
      jamb_width: "6-5/8\"",
      height: "6\'8\"",
      material: "FJ Pine"
    },
    77.39
  ],
  [
    {
      location: "Interior",
      build: "Pre-Hung Double",
      jamb_width: "7-1/2\"",
      height: "6\'8\"",
      material: "FJ Pine"
    },
    83.06
  ],
  // 80
  [
    {
      location: "Interior",
      build: "Pre-Hung Double",
      jamb_width: "4-5/8\"",
      height: "8\'0\"",
      material: "FJ Pine"
    },
    69.33
  ],
  [
    {
      location: "Interior",
      build: "Pre-Hung Double",
      jamb_width: "5-3/8\"",
      height: "8\'0\"",
      material: "FJ Pine"
    },
    80.46
  ],
  [
    {
      location: "Interior",
      build: "Pre-Hung Double",
      jamb_width: "6-5/8\"",
      height: "8\'0\"",
      material: "FJ Pine"
    },
    89.28
  ],
  [
    {
      location: "Interior",
      build: "Pre-Hung Double",
      jamb_width: "7-1/2\"",
      height: "8\'0\"",
      material: "FJ Pine"
    },
    97.47
  ],
  [
    {
      build: "Bore and Dap",
      height: "6\'8\""
    },
    25
  ],
  [
    {
      build: "Bore and Dap",
      height: "8\'0\""
    },
    30
  ],
  [
    {
      location: "Exterior",
      build: "Pre-Hung Single",
      jamb_width: "5-3/8\"",
      height: "6\'8\"",
      material: "FJ Pine"
    },
    80.47
  ],
  [
    {
      location: "Exterior",
      build: "Pre-Hung Single",
      jamb_width: "7-1/2\"",
      height: "6\'8\"",
      material: "FJ Pine"
    },
    96.57
  ],
  [
    {
      location: "Exterior",
      build: "Pre-Hung Single",
      jamb_width: "5-3/8\"",
      height: "8\'0\"",
      material: "FJ Pine"
    },
    95.71
  ],
  [
    {
      location: "Exterior",
      build: "Pre-Hung Single",
      jamb_width: "7-1/2\"",
      height: "8\'0\"",
      material: "FJ Pine"
    },
    118.62
  ],
  [
    {
      location: "Exterior",
      build: "Pre-Hung Double",
      jamb_width: "5-3/8\"",
      height: "6\'8\"",
      material: "FJ Pine"
    },
    197.40
  ],
  [
    {
      location: "Exterior",
      build: "Pre-Hung Double",
      jamb_width: "7-1/2\"",
      height: "6\'8\"",
      material: "FJ Pine"
    },
    216.72
  ],
  [
    {
      location: "Exterior",
      build: "Pre-Hung Double",
      jamb_width: "5-3/8\"",
      height: "8\'0\"",
      material: "FJ Pine"
    },
    229.48
  ],
  [
    {
      location: "Exterior",
      build: "Pre-Hung Double",
      jamb_width: "7-1/2\"",
      height: "8\'0\"",
      material: "FJ Pine"
    },
    254.50
  ],
]);

const getPricingDetails = doorOptions => {

  // I think the hinge finishes and threshold finishes shouldn't affect the price,
  // but there is no consistency with my boss.

  if ( doorOptions.build === "Bore and Dap" ) {
    let {
      handing,
      location, // should be irrelevant
      hinge_locations,
      bore_locations,
      hinge_radius,
      hinge_size, // I think these are the same price ???
      ...details
    } = doorOptions;

    if ( details.hinge_radius === "5/8\"" ) {
      details.hinge_radius = "1/4\""; // So we don't have to duplicate entries
    }

    return details;
  }
  
  if ( doorOptions.location === "Interior" ) {
    let {
      hinge_finish, // So all properties that don't affect price are taken away
      handing,
      pair_type,
      ...details
    } = doorOptions;

    return details;
  } 
  
  else { // Exterior
    let {
      hinge_finish,
      handing,
      threshold_finish,
      swing,
      sidelites,
      is_self_closing,
      ...details
    } = doorOptions;

    return details;
  }

};

const getPrice = doorOptions => {
  try {

    // So 70's are charged the 68 B&D price and the 80 Pre-Hung price
    if ( doorOptions.build === "Bore and Dap" && doorOptions.height === "70" ) {
      doorOptions.height = "6\'8\"";
    }

    if ( doorOptions.build.indexOf("Pre-Hung") >= 0 && doorOptions.height === "70" ) {
      doorOptions.height = "8\'0\""; 
    }

    // So Exterior Doors are grouped into [ 4-5/8, 5-3/8 ] and [ 6-5/8, 7-1/2 ] for pricing
    if ( doorOptions.location === "Exterior" ) {
      if ( _.get(doorOptions, "jamb_width") === "4-5/8\"" ) {
        doorOptions.jamb_width = "5-3/8\"";
      }
      if ( _.get(doorOptions, "jamb_width") === "6-5/8\"" ) {
        doorOptions.jamb_width = "7-1/2\"";
      }
    }

    // console.log("Pre-Price Search", doorOptions);

    let price = [...allBuildsAndOptions].filter(build => {
      let [ details, price ] = build;
      return _.isEqual( details, getPricingDetails(doorOptions) );
    })[0][1];

    // Multiplicatively add price for sidelites. This method should work...
    if ( _.get(doorOptions, "sidelites") > 0 ) {
      let factor;
      if ( doorOptions.build.indexOf("Single") >= 0 ) {
        factor = doorOptions.sidelites === 1 ? 2 : 3;
      } else {
        factor = doorOptions.sidelites === 1 ? 1.5 : 2;
      }
      price *= factor;
    }

    // Ball-Catch pairs are just a bit cheaper than the french pairs
    if ( _.get(doorOptions, "pair_type") === "Ball-Catch Pair" ) {
      price -= 3.33;
    }

    // Same with Outswinging doors, but a bit more expensive
    if ( _.get(doorOptions, "swing") === "Out of Building" ) {
      let factor = 1.77;
      if ( doorOptions.build.indexOf("Double") >= 0 ) factor *= 2;
      price += factor;
    }

    // Self-closing hinges are quite a bit more expensive
    if ( _.get(doorOptions, "is_self_closing") === "Yes" ) {
      let factor = doorOptions.height === "6\'8\"" ? 29.58 : 39.44;
      if ( doorOptions.build.indexOf("Double") >= 0 ) factor *= 2;
      price += factor;
    }

    return price;

  } catch (err) {
    console.log(err);
    return "Price not found!";
  }
};

module.exports = {
  getPrice
};

