import axios, { AxiosResponse } from 'axios';

import {
  CreateLinkProps,
  CreateLinkResponse,
  GetLinkDetailResponse,
  GetLinkListResponse,
  UpdateLinkProps,
  UpdateLinkResponse,
} from '@/types/media.interface';
import { header } from '@/utils/validations/linkUtils';

export const BASE_URL: string = import.meta.env.VITE_BASE_URL as string;
export const LINK_URL = 'archive-links';

export async function updateLink(
  linkId: number,
  requestData: UpdateLinkProps,
  token: string
): Promise<UpdateLinkResponse> {
  const requestUrl = `${BASE_URL}/${LINK_URL}/${linkId}`;
  const response: AxiosResponse<UpdateLinkResponse> = await axios.put(
    requestUrl,
    requestData,
    { headers: header(token) }
  );
  return response.data;
}

export async function createLink(
  requestData: CreateLinkProps,
  token: string
): Promise<CreateLinkResponse> {
  const requestUrl = `${BASE_URL}/${LINK_URL}`;
  const response: AxiosResponse<CreateLinkResponse> = await axios.post(
    requestUrl,
    requestData,
    { headers: header(token) }
  );
  return response.data;
}

export async function getLinkList(token: string): Promise<GetLinkListResponse> {
  const requestUrl = `${BASE_URL}/${LINK_URL}`;
  const response: AxiosResponse<GetLinkListResponse> = await axios.get(
    requestUrl,
    { headers: header(token) }
  );
  return response.data;
}

export async function getLinkDetails(
  linkId: number,
  token: string
): Promise<GetLinkDetailResponse> {
  const requestUrl = `${BASE_URL}/${LINK_URL}/${linkId}`;
  const response: AxiosResponse<GetLinkDetailResponse> = await axios.get(
    requestUrl,
    { headers: header(token) }
  );
  return response.data;
}

export async function deleteLink(
  linkId: number,
  token: string
): Promise<GetLinkDetailResponse> {
  const requestUrl = `${BASE_URL}/${LINK_URL}/${linkId}`;
  const response: AxiosResponse<GetLinkDetailResponse> = await axios.delete(
    requestUrl,
    { headers: header(token) }
  );
  return response.data;
}
