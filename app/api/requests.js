import {
  axWithToken,
  ax
} from "./axiosConfig";

const profileGET = async () => {
  let response;

  await axWithToken({
      method: "GET",
      url: "/profile",
      headers: {
        'Content-Type': 'text/plain'
      },
    })
    .then(res => response = res.data)
    .catch(err => response = err)

  return response

};

const newAccountPOST = async ({
  email,
  password,
  name,
  type,
  priceRange
}) => {
  let response;

  await axWithToken({
    method: "POST",
    url: "/newAccount",
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({
      email,
      password,
      name,
      type,
      priceRange
    })
  })
  .then(res => response = res.data)
  .catch(err => response = err)

  return response
};

const changePasswordPOST = async ({
  email,
  existingPassword,
  newPassword
}) => {
  let response;

  await axWithToken({
      method: "POST",
      url: "/changePassword",
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        email,
        existingPassword,
        newPassword
      })
    })
    .then(res => {
      if (res.data.message == "Password changed!") {
        response = res.data.message;
      } else {
        alert("Invalid existing password!");
      }
    })
    .catch(err => response = err)

  return response
}

module.exports = {
  profileGET,
  newAccountPOST,
  changePasswordPOST
};