const _ = require("lodash");

/*
  TODO:
    Add all variants of:

    height: 68, 80
    build: PH-S, PH-D, PH-BC, B&D
    material: FJ, Solid Pine, KA, Composite
    jamb_width: 3 or less, 4-5/8, 5-3/8, 6-5/8, 7-1/2, 12, 16

    swing: in, out
    sidelites: 0, 1, 2
    

*/

const createBuildSet = (location, build, heightOrHeights, material, priceArr) => {

  const createBuild = (location, build, height, material, jamb_width, price) => {
    return [{
        location,
        build,
        jamb_width,
        height,
        material
      },
      price
    ];
  };

  const sizes = location == "Interior" ?
    [
      "4-5/8\"",
      "5-3/8\"",
      "6-5/8\"",
      "7-1/2\""
    ] :
    [
      "5-3/8\"",
      "7-1/2\""
    ];

  if ( Array.isArray(heightOrHeights) ) {
    const arr1 = sizes.map((size, i) => {
      return createBuild(location, build, heightOrHeights[0], material, size, priceArr[i]);
    });

    const arr2 = sizes.map((size, i) => {
      return createBuild(location, build, heightOrHeights[1], material, size, priceArr[i]);
    });

    return [ ...arr1, ...arr2 ];

  } 
  
  else {
    return sizes.map((size, i) => {
      return createBuild(location, build, heightOrHeights, material, size, priceArr[i]);
    });
  }
};

// Currently only contains the FJ Pine prices
const allBuildsAndOptions = new Map([

    // FJ PINE
  ...createBuildSet(
    "Interior", // Details
    "Pre-Hung Single",
    "6\'8\"",
    "FJ Pine",
    [
      26.19, // Prices for each standard jamb width
      34.2,
      41.29,
      46.02
    ]
  ),
  
  ...createBuildSet(
    "Interior",
    "Pre-Hung Single",
    "8\'0\"",
    "FJ Pine",
    [
      31.98,
      41.25,
      48.60,
      55.43
    ]
  ),
  
  ...createBuildSet(
    "Interior",
    "Pre-Hung Double",
    "6\'8\"",
    "FJ Pine", 
    [
      59.27,
      68.89,
      77.39,
      83.06
    ]
  ),

  ...createBuildSet(
    "Interior",
    "Pre-Hung Double",
    "8\'0\"",
    "FJ Pine", 
    [
      69.33,
      80.46,
      89.28,
      97.47
    ]
  ),

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

  ...createBuildSet(
    "Exterior",
    "Pre-Hung Single",
    "6\'8\"",
    "FJ Pine",
    [
      80.47,
      96.57
    ]
  ),

  ...createBuildSet(
    "Exterior",
    "Pre-Hung Single",
    "8\'0\"",
    "FJ Pine",
    [
      95.71,
      118.62
    ]
  ),

  ...createBuildSet(
    "Exterior",
    "Pre-Hung Double",
    "6\'8\"",
    "FJ Pine",
    [
      197.40,
      216.72
    ]
  ),

  ...createBuildSet(
    "Exterior",
    "Pre-Hung Double",
    "8\'0\"",
    "FJ Pine",
    [
      229.48,
      254.50
    ]
  ),

  // KNOTTY ALDER

  ...createBuildSet(
    "Interior",
    "Pre-Hung Single",
    ["6\'8\"", "8\'0\""],
    "Knotty Alder",
    [
      81.53,
      92.25,
      130.48,
      130.48
    ]
  ),

  ...createBuildSet(
    "Interior",
    "Pre-Hung Double",
    ["6\'8\"", "8\'0\""],
    "Knotty Alder",
    [
      125.68,
      138.55,
      184.42,
      184.42
    ]
  ),

  ...createBuildSet(
    "Exterior",
    "Pre-Hung Single",
    ["6\'8\"", "8\'0\""],
    "Knotty Alder",
    [
      162.75,
      236.40
    ]
  ),

  ...createBuildSet(
    "Exterior",
    "Pre-Hung Double",
    ["6\'8\"", "8\'0\""],
    "Knotty Alder",
    [
      308.65,
      392.26
    ]
  ),

  // SOLID PINE

  ...createBuildSet(
    "Interior",
    "Pre-Hung Single",
    "6\'8\"",
    "Solid Pine",
    [
      51.33,
      60.67,
      63.18,
      83.47
    ]
  ),

  ...createBuildSet(
    "Interior",
    "Pre-Hung Double",
    "6\'8\"",
    "Solid Pine",
    [
      89.44,
      100.64,
      103.66,
      128.33
    ]
  ),

  ...createBuildSet(
    "Interior",
    "Pre-Hung Single",
    "8\'0\"",
    "Solid Pine",
    [
      61.67,
      99.55,
      99.55,
      99.55
    ]
  ),

  ...createBuildSet(
    "Interior",
    "Pre-Hung Double",
    "8\'0\"",
    "Solid Pine",
    [
      104.95,
      150.42,
      150.42,
      150.42
    ]
  ),

  ...createBuildSet(
    "Exterior",
    "Pre-Hung Single",
    ["6\'8\"", "8\'0\""],
    "Solid Pine",
    [
      150.23,
      192.01
    ]
  ),

  ...createBuildSet(
    "Exterior",
    "Pre-Hung Double",
    ["6\'8\"", "8\'0\""],
    "Solid Pine",
    [
      292.43,
      342.56
    ]
  ),

  // SOLID ALDER

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

    const tempDoor = {...doorOptions};

    // So 70's are charged the 68 B&D price and the 80 Pre-Hung price
    if ( doorOptions.build === "Bore and Dap" && doorOptions.height === "7\'0\"" ) {
      tempDoor.height = "6\'8\"";
    }

    if ( doorOptions.build.indexOf("Pre-Hung") >= 0 && doorOptions.height === "7\'0\"" ) {
      tempDoor.height = "8\'0\""; 
    }

    // So Exterior Doors are grouped into [ 4-5/8, 5-3/8 ] and [ 6-5/8, 7-1/2 ] for pricing
    if ( doorOptions.location === "Exterior" ) {
      if ( _.get(doorOptions, "jamb_width") === "4-5/8\"" ) {
        tempDoor.jamb_width = "5-3/8\"";
      }
      if ( _.get(doorOptions, "jamb_width") === "6-5/8\"" ) {
        tempDoor.jamb_width = "7-1/2\"";
      }
    }

    let price = [...allBuildsAndOptions].filter(build => {
      let [ details, price ] = build;
      return _.isEqual( details, getPricingDetails(tempDoor) );
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
      let factor = 16;
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

