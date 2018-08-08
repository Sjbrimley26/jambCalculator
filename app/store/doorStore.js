import { store } from 'react-easy-state';

const doorStore = store({
  goBack: false,
  currentDoor: localStorage.getItem("storedDoor") ?
    JSON.parse(localStorage.getItem("storedDoor")) :
    {},
  currentOrder: [],

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
    doorStore.currentDoor = {};
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