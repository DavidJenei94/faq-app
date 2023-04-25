import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Question } from '../models/Question.model';
import { Answer } from '../models/Answer.model';

export interface FaqState {
  questions: Question[];
  answers: Answer[];
}

const initialFaqState: FaqState = {
  questions: [],
  answers: [],
};

const faqSlice = createSlice({
  name: 'faq',
  initialState: initialFaqState,
  reducers: {
    setQuestions: (state: FaqState, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
    },
    setAnswers: (state: FaqState, action: PayloadAction<Answer[]>) => {
      state.answers = action.payload;
    },
    addQuestion: (state: FaqState, action: PayloadAction<Question>) => {
      state.questions = [...state.questions, action.payload];

      console.log(state.questions);
      
      localStorage.setItem('questions', JSON.stringify(state.questions));
    },
    addAnswer: (state: FaqState, action: PayloadAction<Answer>) => {
      state.answers = [...state.answers, action.payload];
    },
  },
});

export const faqActions = faqSlice.actions;

export default faqSlice.reducer;
