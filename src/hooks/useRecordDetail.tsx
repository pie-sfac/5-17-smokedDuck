import useSWR from 'swr';

import { recordDetailFetcher } from '@/apis/record';
import { recordDetailType } from '@/types/recordDetail.interface';

export default function useRecordDetail(id: number) {
  const {
    data: recordDetailData,
    mutate,
    error,
  } = useSWR<recordDetailType, Error>(
    `record-templates/${id}`,
    recordDetailFetcher
  );

  return {
    recordDetailData: recordDetailData,
    mutate: mutate,
    isLoading: !error && !recordDetailData,
  };
}
