import { useContext, useEffect, useState } from 'react';
import { Answer } from '../../models/Answer.model';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { faqActions } from '../../store/faq-redux';
import FeedbackContext from '../../store/feedback-context';

import Button from '../UI/Button';
import Textarea from '../UI/Textarea';
import Actions from '../Actions/Actions';

import styles from './SingleAnswer.module.scss';

interface SingleAnswerProp {
  answer: Answer;
}
const SingleAnswer = ({ answer }: SingleAnswerProp) => {
  const dispatch = useAppDispatch();

  const feedbackCtx = useContext(FeedbackContext);

  const [editMode, setEditMode] = useState<boolean>(false);
  const [answerText, setAnswerText] = useState<string>('');

  useEffect(() => {
    setAnswerText(answer.answer);
  }, [answer]);

  const handleEditClick = () => {
    setEditMode((prevState) => !prevState);
  };

  const handleAnswerTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAnswerText(event.target.value);
  };

  const handleEditSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const editedAnswer = { ...answer, answer: answerText };

    dispatch(faqActions.editAnswer(editedAnswer));

    feedbackCtx.showMessage('Answer edited', 5000);

    setEditMode(false);
  };

  const handleDelete = () => {
    dispatch(faqActions.deleteAnswer(answer.id));

    feedbackCtx.showMessage('Answer deleted', 5000);
  };

  const handleUpvote = () => {
    dispatch(faqActions.voteAnswer({ id: answer.id, vote: 1 }));
  };

  const handleDownvote = () => {
    dispatch(faqActions.voteAnswer({ id: answer.id, vote: -1 }));
  };

  return (
    <div key={answer.id} className={styles.answer}>
      {!editMode && <p className={styles['answer-text']}>{answer.answer}</p>}
      {editMode && (
        <form onSubmit={handleEditSubmit} className={styles['edit-form']}>
          <Textarea value={answerText} onChange={handleAnswerTextChange} />
          <Button type="submit">Ok</Button>
        </form>
      )}
      <Actions
        handleUpvote={handleUpvote}
        handleDownvote={handleDownvote}
        upvotes={answer.upvotes}
        downvotes={answer.downvotes}
        handleDelete={handleDelete}
        handleEdit={handleEditClick}
      />
    </div>
  );
};

export default SingleAnswer;
