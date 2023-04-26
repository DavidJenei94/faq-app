import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Question } from '../models/Question.model';
import { Answer } from '../models/Answer.model';

export interface FaqState {
  initialized: boolean;
  questions: Question[];
  answers: Answer[];
}

const initialFaqState: FaqState = {
  initialized: false,
  questions: [],
  answers: [],
};

const faqSlice = createSlice({
  name: 'faq',
  initialState: initialFaqState,
  reducers: {
    initialize: (
      state: FaqState,
      action: PayloadAction<{
        questions: Question[] | null;
        answers: Answer[] | null;
      }>
    ) => {
      if (action.payload.questions) {
        state.questions = action.payload.questions;
      }
      if (action.payload.answers) {
        state.answers = action.payload.answers;
      }
      state.initialized = true;
    },
    setQuestions: (state: FaqState, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
    },
    setAnswers: (state: FaqState, action: PayloadAction<Answer[]>) => {
      state.answers = action.payload;
    },
    addQuestion: (state: FaqState, action: PayloadAction<Question>) => {
      state.questions = [...state.questions, action.payload];

      localStorage.setItem('questions', JSON.stringify(state.questions));
    },
    editQuestion: (state: FaqState, action: PayloadAction<Question>) => {
      const questionId = state.questions.findIndex(
        (question) => question.id === action.payload.id
      );
      state.questions[questionId] = action.payload;

      localStorage.setItem('questions', JSON.stringify(state.questions));
    },
    deleteQuestion: (state: FaqState, action: PayloadAction<number>) => {
      const questionId = state.questions.findIndex(
        (question) => question.id === action.payload
      );
      state.questions.splice(questionId, 1);

      localStorage.setItem('questions', JSON.stringify(state.questions));
    },
    voteQuestion: (
      state: FaqState,
      action: PayloadAction<{ id: number; vote: number }>
    ) => {
      const questionId = state.questions.findIndex(
        (question) => question.id === action.payload.id
      );
      if (action.payload.vote >= 1) {
        state.questions[questionId].upvotes += action.payload.vote;
      }
      if (action.payload.vote <= -1) {
        state.questions[questionId].downvotes -= action.payload.vote;
      }

      localStorage.setItem('questions', JSON.stringify(state.questions));
    },
    addAnswer: (state: FaqState, action: PayloadAction<Answer>) => {
      state.answers = [...state.answers, action.payload];

      localStorage.setItem('answers', JSON.stringify(state.answers));
    },
    editAnswer: (state: FaqState, action: PayloadAction<Answer>) => {
      const answerId = state.answers.findIndex(
        (answer) => answer.id === action.payload.id
      );
      state.answers[answerId] = action.payload;

      localStorage.setItem('answers', JSON.stringify(state.answers));
    },
    deleteAnswer: (state: FaqState, action: PayloadAction<number>) => {
      const answerId = state.answers.findIndex(
        (answer) => answer.id === action.payload
      );
      state.answers.splice(answerId, 1);

      localStorage.setItem('answers', JSON.stringify(state.answers));
    },
    voteAnswer: (
      state: FaqState,
      action: PayloadAction<{ id: number; vote: number }>
    ) => {
      const answerId = state.answers.findIndex(
        (answer) => answer.id === action.payload.id
      );
      if (action.payload.vote >= 1) {
        state.answers[answerId].upvotes += action.payload.vote;
      }
      if (action.payload.vote <= -1) {
        state.answers[answerId].downvotes -= action.payload.vote;
      }

      localStorage.setItem('answers', JSON.stringify(state.answers));
    },
  },
});

export const faqActions = faqSlice.actions;

export default faqSlice.reducer;
