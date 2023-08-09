export interface Questions {
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
  tagName: string;
  description?: string;
  required: boolean;
  paragraph?: boolean;
  options?: string[];
  allowMultiple?: boolean;
  addOtherOption?: boolean;
}

export interface AddedFile {
  _id: number;
  path: string | ArrayBuffer | null;
  filename: string;
}

export type StringQuestionTypes =
  | ''
  | 'TEXT'
  | 'MEDIA'
  | 'SELECT'
  | 'PAIN_HSTRY'
  | 'CONDITION'
  | 'PAIN_INTV';

export type CheckedSpecialQuestions = {
  isPAIN_HSTRY: boolean;
  isCONDITION: boolean;
  isPAIN_INTV: boolean;
};
