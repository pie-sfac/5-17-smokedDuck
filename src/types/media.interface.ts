export interface CreateLinkProps {
  categoryId: number;
  url: string;
  title: string;
  description: string;
}

export interface UpdateLinkProps extends CreateLinkProps {}

export interface CreateLinkResponse {
  id: number;
  message: string;
}

export interface UpdateLinkResponse extends CreateLinkResponse {}

export interface GetLinkList {
  id: number;
  centerId: number;
  category: {
    id: number;
    title: string;
    description: string;
  };
  site: unknown;
  url: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetLinkListResponse {
  archiveLinks: GetLinkList[];
  message: string;
}

export interface GetLinkDetailResponse {
  id: number;
  centerId: number;
  category: {
    id: number;
    title: string;
    description: string;
  };
  site: unknown;
  url: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FormData {
  category: number;
  linkUrl: string;
  title: string;
  description: string;
  thumbnailUrl: string;
}
