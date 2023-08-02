import { useContext } from 'react';
import useSWR from 'swr';

import { categoryListFetcher } from '@/apis/Category';
import { MainContext } from '@/store';
import { CategoryListResponseDTO } from '@/types/category.interface';

export default function useCategory() {
  const { loginToken } = useContext(MainContext);

  const {
    data: categoryList,
    mutate,
    error,
  } = useSWR<CategoryListResponseDTO, Error>(
    [loginToken.accessToken],
    categoryListFetcher
  );

  return {
    categoryListData: categoryList,
    isLoading: !categoryList && !error,
    error: error,
    mutate: mutate,
  };
}
