import axios from "axios";

const ax = ( options ) => {
  const { url, ...details } = options;
  
  return axios({
    "url": "https://ljzr3vjgff.execute-api.us-west-2.amazonaws.com/latest" + url,
    // baseURL : "http://localhost:3000",
    ...details
  });
}; // Returns a promise that should contain the response

const axWithToken = ( options ) => {
  const token = localStorage.getItem("token");
  console.log(token, options);

  const { headers, url, ...details } = options;

  return axios({
    baseURL: "https://ljzr3vjgff.execute-api.us-west-2.amazonaws.com/latest" + url,
    // baseURL : "http://localhost:3000",
    "headers": {
      Authorization: `Bearer ${token}`,
      ...headers
    },
    ...details
  });
};

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

const profileGET = () => {
  let response;

  axWithToken({
    method: "GET",
    url: "/profile",
    headers: {
      'Content-Type': 'text/plain'
    },
  }).then(res => response = res)
  .catch(err => response = err)

  return response;

};


module.exports = {
  profileGET,
  onAxiosError
};

