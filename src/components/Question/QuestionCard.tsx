import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux-hooks';

import { Question } from '../../models/Question.model';

import styles from './QuestionCard.module.scss';
import upvoteIcon from '../../assets/icons/upvote-icon.png';
import downvoteIcon from '../../assets/icons/downvote-icon.png';

interface QuestionCardProps {
  question: Question;
}

const QuestionCard = ({ question }: QuestionCardProps) => {
  const navigate = useNavigate();
  const answers = useAppSelector((state) => state.answers);

  const answerNo = answers.filter(
    (answer) => answer.questionId === question.id
  ).length;

  const handleClick = () => {
    navigate(`question/${question.id}`);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <h2>{question.questionTitle}</h2>
      <p>Comments: {answerNo}</p>
      <img src={upvoteIcon} alt="upvote icon" />
      <p className={styles.upvote}>{question.upvotes}</p>
      <img src={downvoteIcon} alt="downvote icon" />
      <p className={styles.downvote}>{question.downvotes}</p>
    </div>
  );
};

export default QuestionCard;
