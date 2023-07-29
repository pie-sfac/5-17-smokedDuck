import axios, { AxiosResponse } from 'axios';

import { header } from '@/utils/validations/linkUtils';

export interface CategoryRequestDTO {
  title: string;
  description: string;
}

export interface CategoryResponseDTO extends CategoryRequestDTO {
  id: number;
  totalCount: number;
}

export interface CategoryListResponseDTO {
  categories: CategoryResponseDTO[];
  message: string;
}

export const deleteCategory = async () => {};

export const updateCategory = async () => {};

export const createCategory = async () => {};

export const getCategory = async () => {};

export const getCategoryList = async (): Promise<CategoryListResponseDTO> => {
  const requestPath: string =
    'http://223.130.161.221/api/v1/archive-link-categories';
  const response: AxiosResponse<CategoryListResponseDTO> = await axios.get(
    requestPath,
    { headers: header() }
  );

  return response.data;
};
