import useSWR from 'swr';

import { recordDetailFetcher, recordListFetcher } from '@/apis/record';
import { RecordDetail } from '@/types/recordDetail.interface';
import { RecordList } from '@/types/recordList.interface';

export function useRecord(category?: string) {
  const {
    data: recordList,
    mutate,
    error,
  } = useSWR<RecordList, Error>('record-templates', recordListFetcher, {
    onErrorRetry: (_error, _key, _config, revalidate, { retryCount }) => {
      if (retryCount >= 10) return;
      setTimeout(() => {
        revalidate({ retryCount });
      }, 500);
    },
  });

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

export function useRecordDetail(id: number) {
  const {
    data: recordDetailData,
    mutate,
    error,
  } = useSWR<RecordDetail, Error>(
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
