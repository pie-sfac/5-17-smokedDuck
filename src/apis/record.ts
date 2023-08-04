import axios from 'axios';

import { recordDetailType } from '@/types/recordDetail.interface';
import { recordListResponseType } from '@/types/recordList.interface';

const baseUrl = import.meta.env.VITE_BASE_URL as string;

export async function recordListFetcher(url: string) {
  const res = await axios.get<recordListResponseType>(`${baseUrl}/${url}`);
  return res.data.templates;
}

export function recordDetailFetcher(url: string) {
  return axios.get<recordDetailType>(`${url}`).then(res => res.data);
}
