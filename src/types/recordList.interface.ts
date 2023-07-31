export interface recordListResponseType {
  templates: [
    {
      id: number;
      category: string;
      title: string;
      description: string;
      createdAt: string;
      updatedAt: string;
    },
  ];
  message: 'string';
}
