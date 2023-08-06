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

const TEMPLATE_URL = '/record-templates';

export async function createTemplate(templateContent: NewTemplateContent) {
  try {
    const response: AxiosResponse<CreateTemplateResponse> = await axios.post(
      TEMPLATE_URL,
      templateContent
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateTemplate(
  id: number,
  editedTemplateContent: UpdateTemplate
) {
  try {
    const response: AxiosResponse<UpdateTemplateResponse> = await axios.put(
      `${TEMPLATE_URL}/${id}`,
      editedTemplateContent
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
