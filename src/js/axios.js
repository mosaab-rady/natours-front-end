import axios from 'axios';

export async function getData(method, url) {
  const data = await axios({
    withCredentials: true,
    method: method,
    url: url,
  });
  return data;
}

export async function postReq(method, url, data) {
  const response = await axios({
    method,
    url,
    data,
  });
  return response;
}
