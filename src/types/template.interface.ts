import { Questions } from './question.interface';

export interface Template {
  category: '' | 'INTERVIEW' | 'TREATMENT';
  title: string;
  description?: string;
  question: Questions[];
}
