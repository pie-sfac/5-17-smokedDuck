import axios, { AxiosResponse } from 'axios';

import {
  CategoryListResponseDTO,
  CategoryRequestDTO,
  CategoryResponseDTO,
} from '@/types/category.interface';
import { header } from '@/utils/validations/linkUtils';

export const BASE_URL: string = import.meta.env.VITE_BASE_URL as string;
export const LINK_URL = 'archive-link-categories';

export async function deleteCategory(
  categoryId: number,
  tokenData: string
): Promise<CategoryResponseDTO> {
  const headers = {
    Authorization: `Bearer ${tokenData}`,
  };
  const response: AxiosResponse<CategoryResponseDTO> = await axios.delete(
    `${BASE_URL}/${LINK_URL}/${categoryId}`,
    { headers }
  );
  return response.data;
}

export async function updateCategory(
  categoryId: number,
  categoryData: CategoryRequestDTO,
  tokenData: string
): Promise<CategoryListResponseDTO> {
  const headers = {
    Authorization: `Bearer ${tokenData}`,
    'Content-Type': 'application/json',
  };
  const requestUrl = `${BASE_URL}/${LINK_URL}/${categoryId}`;
  const response: AxiosResponse<CategoryListResponseDTO> = await axios.put(
    requestUrl,
    categoryData,
    { headers }
  );
  return response.data;
}

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

export async function createCategory(
  tokenData: string,
  categoryData: CategoryRequestDTO
): Promise<CategoryResponseDTO> {
  const headers = {
    Authorization: `Bearer ${tokenData}`,
    'Content-Type': 'application/json',
  };
  const response: AxiosResponse<CategoryResponseDTO> = await axios.post(
    `${BASE_URL}/${LINK_URL}`,
    categoryData,
    { headers }
  );
  return response.data;
}
