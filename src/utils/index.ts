import axios from 'axios';

import { listFetcherResponseType } from '@/types';

const baseUrl = import.meta.env.VITE_BASE_URL as string;

export function listFetcher([url, tokenData]: string[]) {
  const headers = {
    Authorization: `Bearer ${tokenData}`,
    'Content-Type': 'application/json',
  };
  return axios
    .get<listFetcherResponseType>(`${baseUrl}/${url}`, {
      headers,
    })
    .then(res => res.data.templates);
}
