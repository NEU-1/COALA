import axios from 'axios';

const baseUrl = 'http://i9d108.p.ssafy.io:9999/api/';

const headers = {
  'Content-Type': 'application/json;charset=UTF-8',
};

export const ACCESS_TOKEN_EXPIRE_TIME = 30 * 60 * 1000;

export const getAccessToken = async () => {
  console.log('새로 토큰을 얻어오자!');
  const accessToken = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');
  const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    access_token: accessToken,
    refresh_token: refreshToken,
  };

  await axios.get(baseUrl + `member/info`, headers).then((res) => {
    if (res.data.statusCode === 200) {
      localStorage.setItem('access_token', res.headers['access_token']);
      setTimeout(getAccessToken, ACCESS_TOKEN_EXPIRE_TIME);
    }
  });
};

// export const setToken = () => {
//   const access_token = localStorage.getItem('access_token');
//   const refresh_token = localStorage.getItem('refresh_token');
//   axios.defaults.headers.common['access_token'] = access_token;
//   axios.defaults.headers.common['refresh_token'] = refresh_token;
// };

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
    throw error;
  }
};

export const requestPut = async (url, body) => {
  try {
    const data = await axios.put(baseUrl + url, body, headers);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
