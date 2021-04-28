import axios from 'axios';

export async function getData(method, url) {
  const data = await axios({
    withCredentials: true,
    validateStatus: function (status) {
      return status >= 200 && status <= 500;
    },
    method: method,
    url: url,
  });
  return data;
}

export async function postReq(method, url, data) {
  const response = await axios({
    validateStatus: function (status) {
      return status >= 200 && status <= 500;
    },
    method,
    url,
    data,
  });
  return response;
}
