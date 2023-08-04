import axios from 'axios';

import { tokenType } from '@/types/token.interface';

// const refreshAxios = axios.create({
//   baseURL: 'http://223.130.161.221/api/v1',
//   headers: { Authorization: `Bearer ${localStorage.getItem('refreshToken')}` },
// });

const JWT_EXPIRRY_TIME = 1000 * 60 * 15;

export function onSlientRefresh() {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
    'Content-Type': 'application/json',
  };
  axios.post('/tokens', '', {
    headers,
  });
}

export function onLoginSuccess(res: { data: tokenType }) {
  const { accessToken } = res.data;

  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  setTimeout(onSlientRefresh, JWT_EXPIRRY_TIME - 60000);
}
