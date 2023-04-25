export interface Answer {
  id: number;
  questionId: number;
  answer: string;
  upvotes: number;
  downvotes: number;
}

export const defaultAnswer = {
  id: 0,
  questionId: 0,
  answer: '',
  upvotes: 0,
  downvotes: 0,
};
