import { store } from 'react-easy-state';

const doorStore = store({
  goBack: false,
  currentDoor: localStorage.getItem("storedDoor") ?
    JSON.parse(localStorage.getItem("storedDoor")) :
    {},
  currentOrder: [],
  currentProps: [],

  setDoorProperty(property) {
    return function(value) {
      doorStore.currentDoor[property] = value;
      doorStore.currentProps.push(property);
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