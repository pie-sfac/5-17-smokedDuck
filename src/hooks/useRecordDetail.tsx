import { useContext } from 'react';
import useSWR from 'swr';

import { recordDetailFetcher } from '@/apis/record';
import { MainContext } from '@/store';

export default function useRecordDetail(id: number) {
  const { loginToken } = useContext(MainContext);

  const {
    data: recordDetailData,
    mutate,
    isLoading,
  } = useSWR(
    [`record-templates/${id}`, loginToken.accessToken],
    recordDetailFetcher
  );

  return {
    recordDetailData: recordDetailData,
    mutate: mutate,
    isLoading: isLoading,
  };
}
