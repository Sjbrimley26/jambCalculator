import { store } from 'react-easy-state';

const doorStore = store({
  goBack: false,
  currentDoor: {},
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
    doorStore.currentDoor = {};
    return tempDoor;
  }
  
});

export default doorStore;