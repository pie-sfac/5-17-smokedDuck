import { Questions } from './question.interface';
import { recordQuestionsType } from './recordDetail.interface';

export interface Template {
  category: '' | 'INTERVIEW' | 'TREATMENT';
  title: string;
  description?: string;
  questions: Questions[];
}

export interface CreateTemplateResponse {
  id: number;
  message: string;
  question: Questions[];
}

export interface UpdateTemplate {
  title: string;
  description: string | undefined;
  updateQuestions: recordQuestionsType[] | [];
  addQuestions: Questions[];
  deleteIds: number[];
}

export interface UpdateTemplateResponse {
  message: string;
}
