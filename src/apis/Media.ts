import axios, { AxiosResponse } from 'axios';

import {
  CreateLinkProps,
  CreateLinkResponse,
  GetLinkDetailResponse,
  GetLinkListResponse,
  UpdateLinkProps,
  UpdateLinkResponse,
} from '@/types/media.interface';

export const LINK_URL = 'archive-links';

export async function updateLink(
  linkId: number,
  requestData: UpdateLinkProps
): Promise<UpdateLinkResponse> {
  const requestUrl = `${LINK_URL}/${linkId}`;
  const response: AxiosResponse<UpdateLinkResponse> = await axios.put(
    requestUrl,
    requestData
  );
  return response.data;
}

export async function createLink(
  requestData: CreateLinkProps
): Promise<CreateLinkResponse> {
  const requestUrl = `/${LINK_URL}`;
  const response: AxiosResponse<CreateLinkResponse> = await axios.post(
    requestUrl,
    requestData
  );
  return response.data;
}

export async function getLinkList(): Promise<GetLinkListResponse> {
  const requestUrl = `/${LINK_URL}`;
  const response: AxiosResponse<GetLinkListResponse> = await axios.get(
    requestUrl
  );
  return response.data;
}

export async function getLinkDetails(
  linkId: number
): Promise<GetLinkDetailResponse> {
  const requestUrl = `/${LINK_URL}/${linkId}`;
  const response: AxiosResponse<GetLinkDetailResponse> = await axios.get(
    requestUrl
  );
  return response.data;
}

export async function deleteLink(
  linkId: number
): Promise<GetLinkDetailResponse> {
  const requestUrl = `/${LINK_URL}/${linkId}`;
  const response: AxiosResponse<GetLinkDetailResponse> = await axios.delete(
    requestUrl
  );
  return response.data;
}
