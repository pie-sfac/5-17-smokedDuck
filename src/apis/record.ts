import axios from 'axios';

import { recordDetailType } from '@/types/recordDetail.interface';
import { recordListResponseType } from '@/types/recordList.interface';

const baseUrl = import.meta.env.VITE_BASE_URL as string;

export async function recordListFetcher([url, tokenData]: string[]) {
  const headers = {
    Authorization: `Bearer ${tokenData}`,
    'Content-Type': 'application/json',
  };
  const res = await axios.get<recordListResponseType>(`${baseUrl}/${url}`, {
    headers,
  });
  return res.data.templates;
}

export function recordDetailFetcher([url, tokenData]: string[]) {
  const headers = {
    Authorization: `Bearer ${tokenData}`,
    'Content-Type': 'application/json',
  };
  return axios
    .get<recordDetailType>(`${baseUrl}/${url}`, {
      headers,
    })
    .then(res => res.data);
}

export function recordDetailFetcher([url, tokenData]: string[]) {
  const headers = {
    Authorization: `Bearer ${tokenData}`,
    'Content-Type': 'application/json',
  };
  return axios
    .get<recordDetailType>(`${baseUrl}/${url}`, {
      headers,
    })
    .then(res => res.data);
}

export function recordDetailFetcher([url, tokenData]: string[]) {
  const headers = {
    Authorization: `Bearer ${tokenData}`,
    'Content-Type': 'application/json',
  };
  return axios
    .get<recordDetailType>(`${baseUrl}/${url}`, {
      headers,
    })
    .then(res => res.data);
}
