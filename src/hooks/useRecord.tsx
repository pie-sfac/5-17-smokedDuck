import useSWR from 'swr';

import { recordListFetcher } from '@/apis/record';
import { recordListType } from '@/types/recordList.interface';

export default function useRecord(category?: string) {
  const {
    data: recordList,
    mutate,
    error,
  } = useSWR<recordListType, Error>('record-templates', recordListFetcher);

  const interviewCount = recordList?.filter(
    item => item.category === 'INTERVIEW'
  ).length;

  const treatmentCount = recordList?.filter(
    item => item.category === 'TREATMENT'
  ).length;

  return {
    recordListData: category
      ? recordList?.filter(item => item.category === category)
      : recordList,
    isLoading: !recordList && !error,
    error: error,
    mutate: mutate,
    count: {
      interviewCount: interviewCount ? interviewCount : 0,
      treatmentCount: treatmentCount ? treatmentCount : 0,
    },
  };
}
