import { store } from 'react-easy-state';

const doorStore = store({
  currentDoor: localStorage.getItem("storedDoor") ?
    JSON.parse(localStorage.getItem("storedDoor")) :
    {
      complete: false
    },
  currentOrder: [],

  checkIfDoorComplete() {
    const { location, build } = doorStore;

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
      "is_fire_rated",
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
          ...prehungProps,
          "pair_type"
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
        return false;
    }

    let doorIsComplete = requiredProps.every(prop => {
      return doorStore.currentDoor.hasOwnProperty(prop);
    });

    if ( doorIsComplete ) {
      doorStore.currentDoor.complete = true;
      return true;
    } else {
      return false;
    }
  },

  setDoorProperty(property) {
    return function(value) {
      doorStore.currentDoor[property] = value;
    };
  },

  resetDoorProperty(property) {
    delete doorStore.currentDoor[property];
  },

  resetCurrentDoor() {
    let tempDoor = {...doorStore.currentDoor};
    doorStore.propIndex = 0;
    doorStore.currentDoor = {
      complete: false
    };
    return tempDoor;
  },

  incrementPropIndex() {
    if ( doorStore.propIndex <= doorStore.propStates.length - 2 ) {
      doorStore.propIndex++;
    }
  },

  decrementPropIndex() {
    if ( doorStore.propIndex >= 1 ) {
      doorStore.propIndex--;
    }
  },

  propStates: [ // Needs to be ordered
    "build",
    "location",
    "material",
    "jamb_width",
    "height",
    "swing",
    "sidelites"
  ],
  
  propIndex: localStorage.getItem("propIndex") ?
    localStorage.getItem("propIndex") :
    0,
  
});

export default doorStore;