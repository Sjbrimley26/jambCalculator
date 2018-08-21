import { store } from "react-easy-state";
import { profileGET } from "../router/axiosConfig";

const userStore = store({

  currentUser: localStorage.getItem("user") ?
    JSON.parse(localStorage.getItem("user")) : {},

  async getUser() {
    userStore.currentUser = await profileGET();
    localStorage.setItem("user", JSON.stringify(userStore.currentUser));
    return userStore.currentUser;
  },

  async logout() {
    userStore.currentUser = {};
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return userStore.currentUser;
  }

});

export default userStore;