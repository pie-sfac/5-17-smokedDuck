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

export type RecordList = {
  id: number;
  category: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}[];
