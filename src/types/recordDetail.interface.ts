export interface recordQuestionsType {
  id: number;
  type: string;
  order: number;
  required: boolean;
  title: string;
  description: string;
  paragraph: boolean;
  options: string[];
  allowMultiple: boolean;
  addOtherOption: boolean;
}

export interface recordDetailType {
  id: number;
  category: string;
  title: string;
  description: 'string';
  questions: recordQuestionsType[];
  createdAt: string;
  updatedAt: string;
  message: string;
}
