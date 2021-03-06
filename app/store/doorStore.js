import { store } from 'react-easy-state';

const doorStore = store({

  currentDoor: localStorage.getItem("storedDoor") ?
    JSON.parse(localStorage.getItem("storedDoor")) :
    {},

  currentOrder: [],

  requiredProps: localStorage.getItem("requiredProps") ?
    JSON.parse(localStorage.getItem("requiredProps")) :
    [
      "build",
      "location"
    ],
  
  propIndex: localStorage.getItem("propIndex") ?
    localStorage.getItem("propIndex") :
    0,

  // When "building" a door, the Builder component steps through
  // the required props to get all the required user inputs.

  setRequiredProps() {
    const { location, build } = doorStore.currentDoor;

    const globalRequiredProps = [
      "build",
      "location",
      "height",
      "handing"
    ];

    const prehungProps = [
      "material",
      "jamb_width",
      "hinge_finish"
    ];

    const exteriorProps = [
      "swing",
      "is_self_closing",
      "sidelites",
      "threshold_finish"
    ];

    const bdProps = [
      "hinge_radius",
      "hinge_size",
      "hinge_locations",
      "bore_locations"
    ];

    let requiredProps;

    switch(true) {
      case location === "Interior" && build === "Pre-Hung Single":
        requiredProps = [ 
          ...globalRequiredProps,
          ...prehungProps
        ];
        break;
      
      case location === "Interior" && build === "Pre-Hung Double":
        requiredProps = [
          ...globalRequiredProps,
          "pair_type",
          ...prehungProps
        ];
        break;
      
      case location === "Exterior" && build.indexOf("Pre-Hung") >= 0:
        requiredProps = [
          ...globalRequiredProps,
          ...prehungProps,
          ...exteriorProps
        ];
        break;
      
      case build === "Bore and Dap":
        requiredProps = [
          ...globalRequiredProps,
          ...bdProps
        ];
        break;
      
      default:
        requiredProps = [
          "build",
          "location"
        ];
        break;
    }

    doorStore.requiredProps = requiredProps;
  },

  setDoorProperty(property) {
    return function(value) {
      doorStore.currentDoor[property] = value;
      if ( ["build", "location"].includes(property) ) {
        doorStore.setRequiredProps();
      }
    };
  },

  resetDoorProperty(property) {
    delete doorStore.currentDoor[property];
  },

  resetCurrentDoor() {
    let tempDoor = {...doorStore.currentDoor};
    doorStore.propIndex = 0;
    doorStore.currentDoor = {};
    doorStore.requiredProps = [
      "build",
      "location"
    ];
    return tempDoor;
  },

  incrementPropIndex() {
    if ( doorStore.propIndex <= doorStore.requiredProps.length - 2 ) {
      doorStore.propIndex++;
      return true;
    }
    return false;
  },

  decrementPropIndex() {
    if ( doorStore.propIndex >= 1 ) {
      doorStore.propIndex--;
    }
  },
  
});

export default doorStore;