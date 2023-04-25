import { Answer } from '../../models/Answer.model';
import styles from './SingleAnswer.module.scss';

interface SingleAnswerProp {
  answer: Answer;
}
const SingleAnswer = ({ answer }: SingleAnswerProp) => {
  return (
    <div key={answer.id} className={styles.answer}>
      <p>{answer.answer}</p>
      <p>{answer.upvotes}</p>
      <p>{answer.downvotes}</p>
    </div>
  );
};

export default SingleAnswer;
