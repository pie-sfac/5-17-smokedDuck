import { useContext } from 'react';
import useSWR from 'swr';

import { recordListFetcher } from '@/apis/record';
import { MainContext } from '@/store';

export default function useRecord() {
  const { loginToken } = useContext(MainContext);

  const { data, mutate } = useSWR(
    ['record-templates', loginToken.accessToken],
    recordListFetcher
  );

  return {
    recordListData: data,
    isLoading: !data,
    mutate: mutate,
  };
}
