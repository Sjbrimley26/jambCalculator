import axios from "axios";

const ax = ( options ) => {
  const { url, ...details } = options;
  
  return axios({
    "url": "https://ljzr3vjgff.execute-api.us-west-2.amazonaws.com/latest" + url,
    // baseURL : "http://localhost:3000" + url,
    ...details
  });
}; // Returns a promise that should contain the response


const axWithToken = ( options ) => {
  const token = localStorage.getItem("token");

  const { headers, url, ...details } = options;

  return axios({
    baseURL: "https://ljzr3vjgff.execute-api.us-west-2.amazonaws.com/latest" + url,
    // baseURL : "http://localhost:3000" + url,
    "headers": {
      Authorization: `Bearer ${token}`,
      ...headers
    },
    ...details
  });
};


const onAxiosError = error => {
  if (error.response) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    console.log(error.request);
    localStorage.removeItem("token");
    document.location.reload(false);
  } else {
    console.log('Error', error.message);
  }
  console.log(error.config);
};


module.exports = {
  onAxiosError,
  ax,
  axWithToken
};

