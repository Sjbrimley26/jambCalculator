import axios from "axios";

const ax = axios.create({
  baseURL: "https://ljzr3vjgff.execute-api.us-west-2.amazonaws.com/latest",
});

const onAxiosError = error => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
    localStorage.removeItem("token");
    document.location.reload(false);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
  console.log(error.config);
};

const profileGET = ()  => {
  const token = localStorage.getItem("token");
  
  axios({
    method: "GET",
    // url: "http://localhost:3000/profile"
    url: "https://ljzr3vjgff.execute-api.us-west-2.amazonaws.com/latest/profile",
    headers: {
      Authorization: "Bearer " + token,
      'Content-Type': 'text/plain'
    },
  }).then(res => console.log(res.data))
    .catch(onAxiosError);
};