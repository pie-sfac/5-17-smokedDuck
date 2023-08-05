import axios from 'axios';

import { recordDetailType } from '@/types/recordDetail.interface';
import { recordListResponseType } from '@/types/recordList.interface';

export async function recordListFetcher(url: string) {
  const res = await axios.get<recordListResponseType>(`/${url}`);
  return res.data.templates;
}

export async function recordDetailFetcher([url, tokenData]: string[]) {
  const headers = {
    Authorization: `Bearer ${tokenData}`,
    'Content-Type': 'application/json',
  };
  const res = await axios.get<recordDetailType>(`${baseUrl}/${url}`, {
    headers,
  });
  return res.data;
}
