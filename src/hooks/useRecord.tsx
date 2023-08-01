import { useContext } from 'react';
import useSWR from 'swr';

import { recordListFetcher } from '@/apis/record';
import { MainContext } from '@/store';

export default function useRecord(category?: string) {
  const { loginToken } = useContext(MainContext);

  const { data: recordList, mutate } = useSWR(
    ['record-templates', loginToken.accessToken],
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
    isLoading: !recordList,
    mutate: mutate,
    count: {
      interviewCount: interviewCount ? interviewCount : 0,
      treatmentCount: treatmentCount ? treatmentCount : 0,
    },
  };
}
