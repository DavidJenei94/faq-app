export interface Question {
  id: number;
  questionTitle: string;
  questionDetails: string;
  upvotes: number;
  downvotes: number;
}

export const defaultQuestion = {
  id: 0,
  questionTitle: 'Ask a question?',
  questionDetails: 'Details about question',
  upvotes: 0,
  downvotes: 0,
};
