import axios from 'axios';

import { token } from '@/types/token.interface';
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

  const response = await axios.post<token>(`/admins/login`, '', {
    headers,
    withCredentials: true,
  });
  if (response.status === 200) {
    onLoginSuccess(response);
    window.localStorage.setItem('refreshToken', response.data.refreshToken);
  }
  return response;
}

export function onSlientRefresh() {
  refreshAxios.post<token>('/tokens').then(res => {
    onLoginSuccess(res);
    window.localStorage.setItem('refreshToken', res.data.refreshToken);
  });
}

export function onLoginSuccess(res: { data: token }) {
  const { accessToken, refreshToken } = res.data;

  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  refreshAxios.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${refreshToken}`;
  setTimeout(onSlientRefresh, JWT_EXPIRRY_TIME - 60000);
}
