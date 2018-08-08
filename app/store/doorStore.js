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

    let requiredProps;

    switch(true) {
      case location === "Interior" && build === "Pre-Hung Single":
        requiredProps = [
          ...globalRequiredProps,
          
        ]
        break;
      
      case location === "Interior" && build === "Pre-Hung Double":
        break;
      
      case location === "Exterior" && build === "Pre-Hung Single":
        break;

      case location === "Exterior" && build === "Pre-Hung Double":
        break;
      
      case build === "Bore and Dap":
        break;
      
      default:
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