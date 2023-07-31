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

export class MediaAPIManager {
  private static BASE_URL: string = import.meta.env.VITE_BASE_URL as string;
  public static LINK_URL = 'archive-links';

  public static createLink = async (
    requestData: CreateLinkProps,
    token: string
  ): Promise<CreateLinkResponse> => {
    const requestUrl = `${MediaAPIManager.BASE_URL}/${MediaAPIManager.LINK_URL}`;
    const response: AxiosResponse<CreateLinkResponse> = await axios.post(
      requestUrl,
      requestData,
      { headers: header(token) }
    );
    return response.data;
  };

  public static getLinkList = async (token: string) => {
    const requestUrl = `${MediaAPIManager.BASE_URL}/${MediaAPIManager.LINK_URL}`;
    const response: AxiosResponse<GetLinkListResponse> = await axios.get(
      requestUrl,
      { headers: header(token) }
    );
    return response.data;
  };

  public static getLinkDetails = async (
    linkId: number,
    token: string
  ): Promise<GetLinkDetailResponse> => {
    const requestUrl = `${MediaAPIManager.BASE_URL}/${MediaAPIManager.LINK_URL}/${linkId}`;
    const response: AxiosResponse<GetLinkDetailResponse> = await axios.get(
      requestUrl,
      { headers: header(token) }
    );
    return response.data;
  };

  public static deleteLink = async (linkId: number, token: string) => {
    const requestUrl = `${MediaAPIManager.BASE_URL}/${MediaAPIManager.LINK_URL}/${linkId}`;
    const response: AxiosResponse<GetLinkDetailResponse> = await axios.delete(
      requestUrl,
      { headers: header(token) }
    );
    return response.data;
  };
}
