import axios, { AxiosResponse } from 'axios';

import { CategoryListResponseDTO } from '@/types/category.interface';
import { header } from '@/utils/validations/linkUtils';

export const BASE_URL: string = import.meta.env.VITE_BASE_URL as string;
export const LINK_URL = 'archive-links';
export const CATEGORY_URL = 'archive-link-categories';

export const deleteCategory = async () => {};

export const updateCategory = async () => {};

export async function getCategoryList(
  token: string
): Promise<CategoryListResponseDTO> {
  const requestUrl = `${BASE_URL}/${LINK_URL}`;
  const response: AxiosResponse<CategoryListResponseDTO> = await axios.get(
    requestUrl,
    { headers: header(token) }
  );

  return response.data;
}

export async function categoryListFetcher([
  tokenData,
]: string[]): Promise<CategoryListResponseDTO> {
  const headers = {
    Authorization: `Bearer ${tokenData}`,
    'Content-Type': 'application/json',
  };
  const response = await axios.get<CategoryListResponseDTO>(
    `${BASE_URL}/${CATEGORY_URL}`,
    { headers }
  );
  return response.data;
}
