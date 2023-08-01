export interface recordListResponseType {
  templates: {
    id: number;
    category: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  }[];
  message: 'string';
}

export type recordListType = {
  id: number;
  category: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}[];
