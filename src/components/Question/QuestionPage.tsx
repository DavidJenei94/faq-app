import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux-hooks';
import useDelayLoading from '../../hooks/useDelayLoading';
import { Question } from '../../models/Question.model';

import AnswerList from '../Answer/AnswerList';
import CreateAnswer from '../Answer/CreateAnswer';

import styles from './QuestionPage.module.scss';

const QuestionPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const questions: Question[] = useAppSelector((state) => state.questions);
  const initialized: boolean = useAppSelector((state) => state.initialized);

  const delayLoading = useDelayLoading();

  useEffect(() => {
    if (initialized && questions.length === 0) {
      navigate('/');
    }
  }, [initialized, questions, navigate])
  
  const selectedQuestion: Question[] = questions.filter(
    (question) => question.id === Number(id)
  );

  if (!delayLoading) {
    return null;
  }

  if (!initialized && delayLoading) {
    return <>Loading...</>;
  }

  const question: Question = selectedQuestion[0];

  return (
    <div className={styles.container}>
      <h1>{question.questionTitle}</h1>
      <p>{question.questionDetails}</p>
      <CreateAnswer questionId={Number(id)} />
      <AnswerList questionId={question.id} />
    </div>
  );
};

export default QuestionPage;
