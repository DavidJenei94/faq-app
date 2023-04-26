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
    addAnswer: (state: FaqState, action: PayloadAction<Answer>) => {
      state.answers = [...state.answers, action.payload];

      localStorage.setItem('answers', JSON.stringify(state.answers));
    },
  },
});

export const faqActions = faqSlice.actions;

export default faqSlice.reducer;
