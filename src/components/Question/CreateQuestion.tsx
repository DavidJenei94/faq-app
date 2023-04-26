import { useState } from 'react';
import { faqActions } from '../../store/faq-redux';
import { Question, defaultQuestion } from '../../models/Question.model';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { useNavigate } from 'react-router-dom';
import { selectNewId } from '../../utils/general.utils';

import Input from '../UI/Input';
import Textarea from '../UI/Textarea';
import Button from '../UI/Button';

import styles from './CreateQuestion.module.scss';

const CreateQuestion = () => {
  const dispatch = useAppDispatch();
  const questions = useAppSelector((state) => state.questions);

  const navigate = useNavigate();

  const [questionTitle, setQuestionTitle] = useState<string>('');
  const [questionDetails, setQuestionDetails] = useState<string>('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionTitle(event.target.value);
  };

  const handleDetailsChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setQuestionDetails(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (questionTitle === '' || questionDetails === '') {
      console.log('empty text');
      return null;
    }

    if (questionTitle.length > 100) {
      console.log('long text');

      return null;
    }

    const newQuestion: Question = {
      ...defaultQuestion,
      id: selectNewId(questions),
      questionTitle,
      questionDetails,
    };

    dispatch(faqActions.addQuestion(newQuestion));

    navigate('/');
  };

  return (
    <div className={styles.add}>
      <h1>Ask Question</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          type="text"
          value={questionTitle}
          placeholder="Question..."
          onChange={handleTitleChange}
          maxLength={100}
          required
        />
        <br />
        <Textarea
          value={questionDetails}
          placeholder="Question details..."
          onChange={handleDetailsChange}
          required
        />
        <br />
        <Button type="submit">Ask question</Button>
      </form>
    </div>
  );
};

export default CreateQuestion;
