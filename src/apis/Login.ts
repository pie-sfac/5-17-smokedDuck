import axios from 'axios';

import { tokenType } from '@/types/token.interface';
axios.defaults.baseURL = 'http://223.130.161.221/api/v1';
const refreshAxios = axios.create({
  baseURL: 'http://223.130.161.221/api/v1',
  headers: {
    common: {
      Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
    },
  },
  withCredentials: true,
});

const JWT_EXPIRRY_TIME = 1000 * 60 * 15;

export async function requestLogin(username: string, password: string) {
  const basicToken = btoa(`${username}:${password}`);
  const headers = {
    Authorization: `Basic ${basicToken}`,
  };

  await axios
    .post<tokenType>(`/admins/login`, '', {
      headers,
      withCredentials: true,
    })
    .then(res => {
      onLoginSuccess(res);
      window.localStorage.setItem('refreshToken', res.data.refreshToken);
    })
    .catch(error => {
      alert('아이디 또는 비밀번호가 틀렸습니다.');
      console.error(error);
    });
}

export function onSlientRefresh() {
  refreshAxios.post<tokenType>('/tokens').then(res => {
    onLoginSuccess(res);
    window.localStorage.setItem('refreshToken', res.data.refreshToken);
  });
}

export function onLoginSuccess(res: { data: tokenType }) {
  const { accessToken, refreshToken } = res.data;

  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  refreshAxios.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${refreshToken}`;
  setTimeout(onSlientRefresh, JWT_EXPIRRY_TIME - 60000);
}
