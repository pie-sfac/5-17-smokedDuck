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
    recordQuestions: recordDetailData?.questions.sort(
      (a, b) => a.order - b.order
    ),
    mutate: mutate,
    isLoading: !error && !recordDetailData,
  };
}
