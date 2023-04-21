import { useState } from 'react';
import { Question, defaultQuestion } from '../../models/Question.model';

import QuestionCard from '../Question/QuestionCard';
import Button from '../UI/Button';

import styles from './Main.module.scss';
import addIcon from '../../assets/icons/add-icon.png';

const Main = () => {
  // const [questions, setQuestions] = useState<Question[]>([]);

  const questions = [defaultQuestion, defaultQuestion];

  return (
    <div className={styles.main}>
      <h1>Questions:</h1>
      <div className={styles.list}>
        {questions.length > 0 &&
          questions.map((question) => <QuestionCard question={question} />)}
      </div>
      <Button title='Create new question'>
        <img src={addIcon} alt="Create new question button" />
      </Button>
    </div>
  );
};

export default Main;
