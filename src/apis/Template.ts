import axios, { AxiosResponse } from 'axios';

import { Questions } from '@/types/question.interface';
import { CreateTemplateResponse } from '@/types/template.interface';

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
