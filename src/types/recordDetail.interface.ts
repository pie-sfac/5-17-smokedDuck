export interface recordDetailType {
  id: number;
  category: string;
  title: string;
  description: 'string';
  questions: {
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
  }[];
  createdAt: string;
  updatedAt: string;
  message: string;
}
