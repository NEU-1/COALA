import axios from 'axios';

const baseUrl = 'http://i9d108.p.ssafy.io:9999/api/';

const headers = {
  'Content-Type': 'application/json;charset=UTF-8',
};

export const requestGet = async (url, params) => {
  try {
    const data = await axios.get(baseUrl + url, params);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const requestPost = async (url, body) => {
  try {
    const data = await axios.post(baseUrl + url, body, headers);
    return data;
  } catch (error) {
    console.log(error);
  }
};
