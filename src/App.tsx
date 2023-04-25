import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useAppDispatch } from './hooks/redux-hooks';
import { faqActions } from './store/faq-redux';
import { useEffect } from 'react';

import MainWrapper from './components/Layout/MainWrapper';
import QuestionPage from './components/Question/QuestionPage';
import List from './components/Question/List';
import CreateQuestion from './components/Question/CreateQuestion';

import styles from './App.module.scss';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const questionsStored = localStorage.getItem('questions');
    if (questionsStored) {
      dispatch(faqActions.setQuestions(JSON.parse(questionsStored)));
    }

    const answersStored = localStorage.getItem('answers');
    if (answersStored) {
      dispatch(faqActions.setAnswers(JSON.parse(answersStored)));
    }
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
      ],
    },
  ]);

  return (
    <>
      <div className={styles.app}>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
