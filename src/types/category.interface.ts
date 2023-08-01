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
