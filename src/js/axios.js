import axios from 'axios';

export async function request(method, url, data) {
  const response = await axios({
    withCredentials: true,
    validateStatus: function (status) {
      return status >= 200 && status <= 500;
    },
    method,
    url,
    data,
  });
  return response;
}
