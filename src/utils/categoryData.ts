import useSWR from 'swr';

import { getCategoryList } from '@/apis/Category';
import { CategoryListResponse } from '@/types/category.interface';

export default function useCategory() {
  const {
    data: categoryList,
    mutate,
    error,
  } = useSWR<CategoryListResponse, Error>('/getCategory', getCategoryList);

  return {
    categoryListData: categoryList,
    isLoading: !categoryList && !error,
    error: error,
    mutate: mutate,
  };
}
