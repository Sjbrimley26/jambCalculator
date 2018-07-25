import { store } from 'react-easy-state';

const doorStore = store({
  name: "Spencer",
  currentTime: new Date(),
  currentDoor: {},
  currentOrder: [],

  updateTime() {
    doorStore.currentTime = new Date();
  }
});

export default doorStore;