import { Question } from '../models/Question.model';
import { Answer } from '../models/Answer.model';

export const smallScreenWidth: number = 500;

export const selectNewId = (dataArray: Question[] | Answer[]): number => {
  return dataArray.length === 0
    ? 1
    : Math.max(dataArray[dataArray.length - 1].id + 1);
};
