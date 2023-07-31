export interface tokenType {
  accessToken: string;
  refreshToken: string;
  message: string;
}

export interface listFetcherResponseType {
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
