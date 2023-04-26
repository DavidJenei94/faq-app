import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import useDelayLoading from '../../hooks/useDelayLoading';
import { Question, defaultQuestion } from '../../models/Question.model';
import { faqActions } from '../../store/faq-redux';
import FeedbackContext from '../../store/feedback-context';

import AnswerList from '../Answer/AnswerList';
import CreateAnswer from '../Answer/CreateAnswer';
import Actions from '../Actions/Actions';
import Textarea from '../UI/Textarea';
import Button from '../UI/Button';
import Input from '../UI/Input';

import styles from './QuestionPage.module.scss';

const QuestionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const feedbackCtx = useContext(FeedbackContext);

  const questions: Question[] = useAppSelector((state) => state.questions);
  const initialized: boolean = useAppSelector((state) => state.initialized);

  const [editMode, setEditMode] = useState<boolean>(false);
  const [question, setQuestion] = useState<Question>(defaultQuestion);

  const delayLoading = useDelayLoading();

  useEffect(() => {
    if (initialized && questions.length === 0) {
      navigate('/');
    }

    if (initialized && questions.length >= 0) {
      const selectedQuestion: Question[] = questions.filter(
        (question) => question.id === Number(id)
      );

      if (selectedQuestion.length === 0) {
        navigate('/');
      }

      setQuestion(selectedQuestion[0]);
    }
  }, [initialized, questions, navigate, id]);

  const handleEditClick = () => {
    setEditMode((prevState) => !prevState);
  };

  const handleQuestionTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuestion((prevState) => {
      return { ...prevState, questionTitle: event.target.value };
    });
  };

  const handleQuestionDetailsChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setQuestion((prevState) => {
      return { ...prevState, questionDetails: event.target.value };
    });
  };

  const handleEditSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (question.questionTitle === '' || question.questionDetails === '') {
      return null;
    }

    if (question.questionTitle.length >= 100) {
      return null;
    }

    dispatch(faqActions.editQuestion(question));

    feedbackCtx.showMessage('Question edited', 5000);

    setEditMode(false);
  };

  const handleDelete = () => {
    dispatch(faqActions.deleteQuestion(question.id));

    feedbackCtx.showMessage('Question deleted', 5000);

    navigate('/');
  };

  const handleUpvote = () => {
    dispatch(faqActions.voteQuestion({ id: question.id, vote: 1 }));
  };

  const handleDownvote = () => {
    dispatch(faqActions.voteQuestion({ id: question.id, vote: -1 }));
  };

  if (!delayLoading) {
    return null;
  }

  if (!initialized && delayLoading) {
    return <>Loading...</>;
  }

  return (
    <div className={styles.container}>
      {!editMode && (
        <div className={styles.question}>
          <h1>{question.questionTitle}</h1>
          <p>{question.questionDetails}</p>
        </div>
      )}
      {editMode && (
        <form onSubmit={handleEditSubmit} className={styles['edit-form']}>
          <Input
            value={question.questionTitle}
            onChange={handleQuestionTitleChange}
            placeholder="Question?"
            maxLength={100}
            required
          />
          <Textarea
            value={question.questionDetails}
            onChange={handleQuestionDetailsChange}
            placeholder="Question details..."
            required
          />
          <Button type="submit">Ok</Button>
        </form>
      )}

      <div className={styles.actions}>
        <Actions
          handleUpvote={handleUpvote}
          handleDownvote={handleDownvote}
          upvotes={question.upvotes}
          downvotes={question.downvotes}
          handleDelete={handleDelete}
          handleEdit={handleEditClick}
        />
      </div>
      <CreateAnswer questionId={Number(id)} />
      <AnswerList questionId={question.id} />
    </div>
  );
};

export default QuestionPage;
