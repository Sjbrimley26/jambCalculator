import { store } from 'react-easy-state';

const doorStore = {
  name: "Spencer",
  currentTime: new Date(),

  updateTime() {
    this.currentTime = new Date();
    console.log("Update Time!", this.currentTime);
  }
};

export default store(doorStore);