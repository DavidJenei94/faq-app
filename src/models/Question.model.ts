export interface Question {
  id: number;
  question: string;
  creationDate: Date | null;
  upvotes: number;
  downvotes: number;
  comments: string[];
}

export const defaultQuestion = {
  id: 0,
  question: 'Ask a question',
  creationDate: null,
  upvotes: 0,
  downvotes: 0,
  comments: [],
};
