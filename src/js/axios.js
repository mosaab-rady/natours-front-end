import axios from 'axios';

export async function getData(method, url) {
  const data = await axios({
    method: method,
    url: url,
  });
  return data;
}
