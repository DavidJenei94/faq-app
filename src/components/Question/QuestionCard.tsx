import { Question } from '../../models/Question.model';
import styles from './QuestionCard.module.scss';

interface QuestionCardProps {
  question: Question;
}

const QuestionCard = ({ question }: QuestionCardProps) => {
  return (
    <div className={styles.card}>
      <h2>{question.question}</h2>
      <p>Comments: {question.comments.length}</p>
      <p>Upvotes {question.upvotes}</p>
      <p>Downvotes: {question.downvotes}</p>
    </div>
  );
};

export default QuestionCard;
