export interface Question {
  _id: number;
  questionTitle: string;
  tagName: string;
}

export interface AddedFile {
  _id: number;
  path: string | ArrayBuffer | null;
  filename: string;
}
