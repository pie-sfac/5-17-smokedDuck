import { useContext } from 'react';
import useSWR from 'swr';

import { recordListFetcher } from '@/apis/record';
import { MainContext } from '@/store';
import { recordListType } from '@/types/recordList.interface';

export default function useRecord(category?: string) {
  const { loginToken } = useContext(MainContext);

  const {
    data: recordList,
    mutate,
    error,
  } = useSWR<recordListType, Error>(
    ['record-templates', loginToken],
    recordListFetcher
  );

  const interviewCount = recordList?.filter(
    item => item.category === 'INTERVIEW'
  ).length;

  const treatmentCount = recordList?.filter(
    item => item.category === 'TREATMENT'
  ).length;

  return {
    recordListData: recordList?.filter(item => item.category === category),
    isLoading: !recordList && !error,
    error: error,
    mutate: mutate,
    count: {
      interviewCount: interviewCount ? interviewCount : 0,
      treatmentCount: treatmentCount ? treatmentCount : 0,
    },
  };
}
