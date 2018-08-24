import { store } from "react-easy-state";
import { profileGET } from "../api";

const userStore = store({

  currentUser: localStorage.getItem("user") ?
    JSON.parse(localStorage.getItem("user")) : {},

  async getUser() {
    userStore.currentUser = await profileGET();
    if (!userStore.currentUser.email) return undefined;
    
    localStorage.setItem("user", JSON.stringify(userStore.currentUser));
    return userStore.currentUser;
  },

  async logout() {
    userStore.currentUser = {};
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.reload();
    return userStore.currentUser;
  },

  async verifyLogin() {
    const user = {...userStore.currentUser};

    if (!user.email) {
      await userStore.logout();
      window.location.reload();
      return undefined;
    }

    return user;
  }

});

export default userStore;