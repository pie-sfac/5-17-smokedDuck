import axios from 'axios';

import { RecordDetail } from '@/types/recordDetail.interface';
import { recordListResponseType } from '@/types/recordList.interface';

export async function recordListFetcher(url: string) {
  const res = await axios.get<recordListResponseType>(`/${url}`);
  return res.data.templates;
}

export async function recordDetailFetcher(url: string) {
  const res = await axios.get<RecordDetail>(`/${url}`);
  return res.data;
}
