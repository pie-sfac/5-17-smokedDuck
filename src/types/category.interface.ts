export type CategoryList = {
  id: number;
  title: string;
};

export interface CategoryRequest {
  title: string;
  description: string;
}

export interface CategoryResponse extends CategoryRequest {
  id: number;
  totalCount: number;
}

export interface CategoryListResponse {
  categories: CategoryResponse[];
  message: string;
}
