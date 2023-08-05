import axios, { AxiosResponse } from 'axios';

import {
  CategoryListResponseDTO,
  CategoryRequestDTO,
  CategoryResponseDTO,
} from '@/types/category.interface';

export const BASE_URL: string = import.meta.env.VITE_BASE_URL as string;
export const LINK_URL = 'archive-link-categories';

export async function deleteCategory(
  categoryId: number
): Promise<CategoryResponseDTO> {
  const response: AxiosResponse<CategoryResponseDTO> = await axios.delete(
    `${LINK_URL}/${categoryId}`
  );
  return response.data;
}

export async function updateCategory(
  categoryId: number,
  categoryData: CategoryRequestDTO
): Promise<CategoryListResponseDTO> {
  const requestUrl = `/${LINK_URL}/${categoryId}`;
  const response: AxiosResponse<CategoryListResponseDTO> = await axios.put(
    requestUrl,
    categoryData
  );
  return response.data;
}

export async function getCategoryList(): Promise<CategoryListResponseDTO> {
  const requestUrl = `/${LINK_URL}`;
  const response: AxiosResponse<CategoryListResponseDTO> = await axios.get(
    requestUrl
  );

  return response.data;
}

export async function createCategory(
  categoryData: CategoryRequestDTO
): Promise<CategoryResponseDTO> {
  const response: AxiosResponse<CategoryResponseDTO> = await axios.post(
    `/${LINK_URL}`,
    categoryData
  );
  return response.data;
}
