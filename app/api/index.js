import {
  onAxiosError
} from "./axiosConfig";

import {
  profileGET,
  newAccountPOST,
  changePasswordPOST
} from "./requests";

module.exports = {
  onAxiosError,
  profileGET,
  newAccountPOST,
  changePasswordPOST
};