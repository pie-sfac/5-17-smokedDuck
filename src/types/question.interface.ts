export interface Questions {
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
