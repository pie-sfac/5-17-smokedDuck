import { useContext } from 'react';
import useSWR from 'swr';

import { recordDetailFetcher } from '@/apis/record';
import { MainContext } from '@/store';
import { recordDetailType } from '@/types/recordDetail.interface';

export default function useRecordDetail(id: number) {
  const { loginToken } = useContext(MainContext);

  const {
    data: recordDetailData,
    mutate,
    error,
  } = useSWR<recordDetailType, Error>(
    [`record-templates/${id}`, loginToken.accessToken],
    recordDetailFetcher
  );

  return {
    recordDetailData: recordDetailData,
    mutate: mutate,
    isLoading: !error && !recordDetailData,
  };
}
