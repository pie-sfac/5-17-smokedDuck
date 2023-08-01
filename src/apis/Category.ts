import axios, { AxiosResponse } from 'axios';

import {
  CategoryListResponseDTO,
  CategoryRequestDTO,
  CategoryResponseDTO,
} from '@/types/category.interface';
import { header } from '@/utils/validations/linkUtils';

export const BASE_URL: string = import.meta.env.VITE_BASE_URL as string;
export const LINK_URL = 'archive-links';

export const deleteCategory = async () => {};

export const updateCategory = async () => {};

export const createCategory = async () => {};

export const getCategory = async () => {};

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
