import axios, { AxiosResponse } from 'axios';

import {
  CreateLinkProps,
  CreateLinkResponse,
  GetLinkDetailResponse,
  GetLinkListResponse,
} from '@/types/media.interface';
import { header } from '@/utils/validations/linkUtils';

export const BASE_URL: string = import.meta.env.VITE_BASE_URL as string;
export const LINK_URL = 'archive-links';

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

// export class MediaAPIManager {
//   private static BASE_URL: string = import.meta.env.VITE_BASE_URL as string;
//   public static LINK_URL = 'archive-links';

//   public static createLink = async (
//     requestData: CreateLinkProps,
//     token: string
//   ): Promise<CreateLinkResponse> => {
//     const requestUrl = `${MediaAPIManager.BASE_URL}/${MediaAPIManager.LINK_URL}`;
//     const response: AxiosResponse<CreateLinkResponse> = await axios.post(
//       requestUrl,
//       requestData,
//       { headers: header(token) }
//     );
//     return response.data;
//   };

//   public static getLinkList = async (token: string) => {
//     const requestUrl = `${MediaAPIManager.BASE_URL}/${MediaAPIManager.LINK_URL}`;
//     const response: AxiosResponse<GetLinkListResponse> = await axios.get(
//       requestUrl,
//       { headers: header(token) }
//     );
//     return response.data;
//   };

//   public static getLinkDetails = async (
//     linkId: number,
//     token: string
//   ): Promise<GetLinkDetailResponse> => {
//     const requestUrl = `${MediaAPIManager.BASE_URL}/${MediaAPIManager.LINK_URL}/${linkId}`;
//     const response: AxiosResponse<GetLinkDetailResponse> = await axios.get(
//       requestUrl,
//       { headers: header(token) }
//     );
//     return response.data;
//   };

//   public static deleteLink = async (linkId: number, token: string) => {
//     const requestUrl = `${MediaAPIManager.BASE_URL}/${MediaAPIManager.LINK_URL}/${linkId}`;
//     const response: AxiosResponse<GetLinkDetailResponse> = await axios.delete(
//       requestUrl,
//       { headers: header(token) }
//     );
//     return response.data;
//   };
// }
