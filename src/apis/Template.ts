import axios, { AxiosResponse } from 'axios';

import { Questions } from '@/types/question.interface';
import { CreateTemplateResponse } from '@/types/template.interface';

type NewTemplateContent = {
  questions: Questions[];
  category?: '' | 'INTERVIEW' | 'TREATMENT' | undefined;
  title?: string | undefined;
  description?: string | undefined;
};

const BASE_URL: string = import.meta.env.VITE_BASE_URL as string;
const TEMPLATE_URL = 'record-templates';

export const requestUrl = `${BASE_URL}/${TEMPLATE_URL}`;

export async function createTemplate(
  loginToken: string,
  templateContent: NewTemplateContent
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
