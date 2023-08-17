import axios, { AxiosResponse } from 'axios';

import {
  CategoryListResponse,
  CategoryRequest,
  CategoryResponse,
} from '@/types/category.interface';

export const LINK_URL = 'archive-link-categories';

export async function deleteCategory(
  categoryId: number
): Promise<CategoryResponse> {
  const response: AxiosResponse<CategoryResponse> = await axios.delete(
    `${LINK_URL}/${categoryId}`
  );
  return response.data;
}

export async function updateCategory(
  categoryId: number,
  categoryData: CategoryRequest
): Promise<CategoryListResponse> {
  const requestUrl = `/${LINK_URL}/${categoryId}`;
  const response: AxiosResponse<CategoryListResponse> = await axios.put(
    requestUrl,
    categoryData
  );
  return response.data;
}

export async function getCategoryList(): Promise<CategoryListResponse> {
  const requestUrl = `/${LINK_URL}`;
  const response: AxiosResponse<CategoryListResponse> = await axios.get(
    requestUrl
  );

  return response.data;
}

export async function createCategory(
  categoryData: CategoryRequest
): Promise<CategoryResponse> {
  const response: AxiosResponse<CategoryResponse> = await axios.post(
    `/${LINK_URL}`,
    categoryData
  );
  return response.data;
}
