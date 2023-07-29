import axios, { AxiosResponse } from 'axios';

import { header } from '@/utils/validations/linkUtils';

export interface CreateLinkProps {
  categoryId: number;
  url: string;
  title: string;
  description: string;
}

export interface CreateLinkResponse {
  id: number;
  message: string;
}

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

export const createLink = async (
  requestData: CreateLinkProps
): Promise<CreateLinkResponse> => {
  const requestUrl = 'http://223.130.161.221/api/v1/archive-links';
  const response: AxiosResponse<CreateLinkResponse> = await axios.post(
    requestUrl,
    requestData,
    { headers: header() }
  );
  return response.data;
};

export const getLinkList = async (): Promise<GetLinkListResponse> => {
  const requestUrl = 'http://223.130.161.221/api/v1/archive-links';
  const response: AxiosResponse<GetLinkListResponse> = await axios.get(
    requestUrl,
    { headers: header() }
  );
  return response.data;
};

export const getLinkDetails = async (
  archiveLinkId: number
): Promise<GetLinkDetailResponse> => {
  const requestUrl = `http://223.130.161.221/api/v1/archive-links/${archiveLinkId}`;
  const response: AxiosResponse<GetLinkDetailResponse> = await axios.get(
    requestUrl,
    { headers: header() }
  );
  return response.data;
};
