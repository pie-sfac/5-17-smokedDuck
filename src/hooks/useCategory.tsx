import { useContext } from 'react';
import useSWR from 'swr';

import { getCategoryList } from '@/apis/Category';
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
    getCategoryList
  );

  return {
    categoryListData: categoryList,
    isLoading: !categoryList && !error,
    error: error,
    mutate: mutate,
  };
}
