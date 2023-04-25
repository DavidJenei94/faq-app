import { Answer } from '../../models/Answer.model';
import { useAppSelector } from '../../hooks/redux-hooks';

import SingleAnswer from './SingleAnswer';

import styles from './AnswerList.module.scss';

interface AnswerListProp {
  questionId: number
}

const AnswerList = ({questionId}:AnswerListProp) => {
  const answers: Answer[] = useAppSelector((state) => state.answers);
  
  const questionAnswers: Answer[] = answers.filter(
    (answer) => answer.questionId === questionId
  );
  
  return (
    <div className={styles.answers}>
      {questionAnswers.map((answer) => (
        <SingleAnswer key={answer.id} answer={answer}/>
      ))}
    </div>
  );
};

export default AnswerList;
