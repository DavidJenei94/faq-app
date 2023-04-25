import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux-hooks';
import CreateAnswer from '../Answer/CreateAnswer';
import AnswerList from '../Answer/AnswerList';
import { Question } from '../../models/Question.model';

import styles from './QuestionPage.module.scss';

const QuestionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const questions: Question[] = useAppSelector((state) => state.questions);

  const selectedQuestion: Question[] = questions.filter(
    (question) => question.id === Number(id)
  );

  if (selectedQuestion.length === 0) {
    navigate('/');
  }

  const question: Question = selectedQuestion[0];

  return (
    <div className={styles.container}>
      <h1>{question.questionTitle}</h1>
      <p>{question.questionDetails}</p>
      <CreateAnswer questionId={Number(id)} />
      <AnswerList questionId={question.id}/>
    </div>
  );
};

export default QuestionPage;
