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

export interface UpdateTemplateType {
  title: string;
  description: string | undefined;
  updateQuestions: recordQuestionsType[] | [];
  addQuestions: Questions[];
}

export interface UpdateTemplateResponse {
  message: string;
}
