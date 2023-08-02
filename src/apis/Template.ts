import axios, { AxiosResponse } from 'axios';

import { CreateTemplateResponse } from '@/types/template.interface';
import { Template } from '@/types/template.interface';

const BASE_URL: string = import.meta.env.VITE_BASE_URL as string;
const TEMPLATE_URL = 'record-templates';

const requestUrl = `${BASE_URL}/${TEMPLATE_URL}`;

export async function createTemplate(
  loginToken: string,
  templateContent: Template | undefined
) {
  try {
    const response: AxiosResponse<CreateTemplateResponse> = await axios.post(
      requestUrl,
      templateContent,
      {
        headers: {
          Authorization: `Bearer ${loginToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
