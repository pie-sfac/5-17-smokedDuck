import axios, { AxiosResponse } from 'axios';

import { Questions } from '@/types/question.interface';
import {
  CreateTemplateResponse,
  UpdateTemplate,
  UpdateTemplateResponse,
} from '@/types/template.interface';

type NewTemplateContent = {
  questions: Questions[];
  category?: '' | 'INTERVIEW' | 'TREATMENT' | undefined;
  title?: string | undefined;
  description?: string | undefined;
};

const TEMPLATE_URL = 'record-templates';

export const requestUrl = `/${TEMPLATE_URL}`;

export async function createTemplate(templateContent: NewTemplateContent) {
  try {
    const response: AxiosResponse<CreateTemplateResponse> = await axios.post(
      requestUrl,
      templateContent
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateTemplate(
  loginToken: string,
  id: number,
  editedTemplateContent: UpdateTemplate
) {
  try {
    const response: AxiosResponse<UpdateTemplateResponse> = await axios.put(
      `${requestUrl}/${id}`,
      editedTemplateContent,
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

export async function updateTemplate(
  loginToken: string,
  id: number,
  editedTemplateContent: UpdateTemplate
) {
  try {
    const response: AxiosResponse<UpdateTemplateResponse> = await axios.put(
      `${requestUrl}/${id}`,
      editedTemplateContent,
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
