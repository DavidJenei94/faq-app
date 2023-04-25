import { Link } from 'react-router-dom';

import { Question } from '../../models/Question.model';

import styles from './QuestionCard.module.scss';
import upvoteIcon from '../../assets/icons/upvote-icon.png';
import downvoteIcon from '../../assets/icons/downvote-icon.png';

interface QuestionCardProps {
  question: Question;
}

const QuestionCard = ({ question }: QuestionCardProps) => {
  return (
    <div className={styles.card}>
      <Link to={`question/${question.id}`}>{question.questionTitle}</Link>
      <p>Comments: {question.comments.length}</p>
      <img src={upvoteIcon} alt="upvote icon" />
      <p className={styles.upvote}>{question.upvotes}</p>
      <img src={downvoteIcon} alt="downvote icon" />
      <p className={styles.downvote}>{question.downvotes}</p>
    </div>
  );
};

export default QuestionCard;
