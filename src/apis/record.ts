import axios from 'axios';

import {
  recordListResponseType,
  recordListType,
} from '@/types/recordList.interface';

const baseUrl = import.meta.env.VITE_BASE_URL as string;

export function recordListFetcher([url, tokenData]: string[]) {
  const headers = {
    Authorization: `Bearer ${tokenData}`,
    'Content-Type': 'application/json',
  };
  return axios
    .get<recordListResponseType>(`${baseUrl}/${url}`, {
      headers,
    })
    .then(res => res.data.templates);
}

export function deleteRecordTemplate(
  prevRecordList: recordListType,
  headers: { Authorization: string; 'Content-Type': string },
  id: number
) {
  const newRecordList: recordListType = prevRecordList.filter(
    item => item.id !== id
  );
  axios.delete(`${baseUrl}/record-templates/${id}`, { headers });

  return newRecordList;
}
