import { Questions } from '@/types/question.interface';

export interface recordQuestionsType {
  id: number;
  type:
    | ''
    | 'TEXT'
    | 'MEDIA'
    | 'SELECT'
    | 'PAIN_HSTRY'
    | 'CONDITION'
    | 'PAIN_INTV';
  order: number;
  title: string;
  description?: string;
  required: boolean;
  paragraph?: boolean;
  options?: string[];
  allowMultiple?: boolean;
  addOtherOption?: boolean;
}

export interface recordDetailType {
  id: number;
  category: string;
  title: string;
  description?: string;
  questions: Questions[];
  createdAt: string;
  updatedAt: string;
  message?: string;
}
