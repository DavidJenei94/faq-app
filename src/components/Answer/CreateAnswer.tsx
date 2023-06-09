import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { faqActions } from '../../store/faq-redux';
import { defaultAnswer } from '../../models/Answer.model';
import { selectNewId } from '../../utils/general.utils';

import Button from '../UI/Button';
import Textarea from '../UI/Textarea';

import styles from './CreateAnswer.module.scss';

interface CreateAnswerProp {
  questionId: number;
}

const CreateAnswer = ({ questionId }: CreateAnswerProp) => {
  const dispatch = useAppDispatch();
  const answers = useAppSelector((state) => state.answers);

  const [answer, setAnswer] = useState<string>('');

  const handleAnswerChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (answer === '') {
      return;
    }

    const newAnswer = {
      ...defaultAnswer,
      id: selectNewId(answers),
      questionId,
      answer,
    };

    dispatch(faqActions.addAnswer(newAnswer));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label>New answer:</label>
      <br />
      <Textarea
        value={answer}
        onChange={handleAnswerChange}
        placeholder="Add new answer..."
        required
      />
      <br />
      <Button type="submit">Answer</Button>
    </form>
  );
};

export default CreateAnswer;
