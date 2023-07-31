export interface Template {
  category: 'INTERVIEW' | 'TREATMENT';
  title: string;
  description?: string;
  question: {
    type:
      | 'TEXT'
      | 'MEDIA'
      | 'SELECT'
      | 'PAIN_HSTRY'
      | 'CONDITION'
      | 'PAIN_INTV';
    order: number;
    description?: string;
    required: boolean;
    paragraph?: boolean;
    options?: string[];
    allowMultiple?: boolean;
    addOtherOption?: boolean;
  };
}
