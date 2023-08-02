import { Questions } from './question.interface';

export interface Template {
  category: '' | 'INTERVIEW' | 'TREATMENT';
  title: string;
  description?: string;
  questions: Questions[];
}

export interface CreateTemplateResponse {
  id: number;
  message: string;
}
