import { useEffect, useContext } from 'react';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { useAppDispatch } from './hooks/redux-hooks';
import { faqActions } from './store/faq-redux';
import { Question } from './models/Question.model';
import { Answer } from './models/Answer.model';
import FeedbackContext from './store/feedback-context';

import MainWrapper from './components/Layout/MainWrapper';
import QuestionPage from './components/Question/QuestionPage';
import List from './components/Question/List';
import CreateQuestion from './components/Question/CreateQuestion';
import FeedbackBar from './components/UI/FeedbackBar';

import styles from './App.module.scss';

function App() {
  const dispatch = useAppDispatch();

  const ctx = useContext(FeedbackContext);

  useEffect(() => {
    const questionsStored = localStorage.getItem('questions');
    const answersStored = localStorage.getItem('answers');

    let questions: Question[] = questionsStored
      ? JSON.parse(questionsStored)
      : [];
    let answers: Answer[] = answersStored ? JSON.parse(answersStored) : [];

    dispatch(faqActions.initialize({ questions, answers }));
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainWrapper />,
      children: [
        {
          path: '/',
          element: <List />,
        },
        {
          path: 'question/create',
          element: <CreateQuestion />,
        },
        {
          path: 'question/:id',
          element: <QuestionPage />,
        },
        {
          path: '*',
          element: <Navigate to="/" replace />,
        },
      ],
    },
  ]);

  return (
    <>
      <div className={styles.app}>
        {ctx.isMessageShown && (
          <FeedbackBar className={ctx.isSlidingDown ? 'slide-down' : ''}>
            {ctx.message}
          </FeedbackBar>
        )}
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
