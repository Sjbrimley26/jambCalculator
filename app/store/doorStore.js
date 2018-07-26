import { store } from 'react-easy-state';

const doorStore = store({
  name: "Spencer",
  currentTime: new Date(),
  currentDoor: {},
  currentOrder: [],

  updateTime() {
    doorStore.currentTime = new Date();
  },

  setDoorProperty(property) {
    return function(value) {
      doorStore.currentDoor[property] = value;
    };
  },

  resetCurrentDoor() {
    let tempDoor = {...doorStore.currentDoor};
    doorStore.currentDoor = {};
    return tempDoor;
  }
  
});

export default doorStore;