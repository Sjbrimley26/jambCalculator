import { store } from 'react-easy-state';

const doorStore = store({
  name: "Spencer",
  currentTime: new Date(),

  updateTime() {
    doorStore.currentTime = new Date();
  }
});

export default doorStore;