import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useAppDispatch } from './hooks/redux-hooks';
import { faqActions } from './store/faq-redux';
import { useEffect } from 'react';

import Main from './components/Layout/Main';
import Navbar from './components/Layout/Navbar';
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
  ]);

  // const questionss = [
  //   defaultQuestion,
  //   {
  //     id: 1,
  //     questionTitle: 'New question',
  //     questionDetails: 'Details of question',
  //     creationDate: null,
  //     upvotes: 2,
  //     downvotes: 2,
  //     comments: ['asd'],
  //   },
  //   {
  //     id: 2,
  //     questionTitle: 'Random question',
  //     questionDetails: 'Details of question',
  //     creationDate: null,
  //     upvotes: 3,
  //     downvotes: 3,
  //     comments: ['asd', 'few'],
  //   },
  //   {
  //     id: 3,
  //     questionTitle: 'New question',
  //     questionDetails: 'Details of question',
  //     creationDate: null,
  //     upvotes: 2,
  //     downvotes: 2,
  //     comments: ['asd'],
  //   },
  //   {
  //     id: 4,
  //     questionTitle: 'Random question',
  //     questionDetails: 'Details of question',
  //     creationDate: null,
  //     upvotes: 3,
  //     downvotes: 3,
  //     comments: ['asd', 'few'],
  //   },
  //   {
  //     id: 5,
  //     questionTitle: 'Random question',
  //     questionDetails: 'Details of question',
  //     creationDate: null,
  //     upvotes: 3,
  //     downvotes: 3,
  //     comments: ['asd', 'few'],
  //   },
  //   {
  //     id: 6,
  //     questionTitle: 'New question',
  //     questionDetails: 'Details of question',
  //     creationDate: null,
  //     upvotes: 2,
  //     downvotes: 2,
  //     comments: ['asd'],
  //   },
  //   {
  //     id: 7,
  //     questionTitle: 'Random question',
  //     questionDetails: 'Details of question',
  //     creationDate: null,
  //     upvotes: 3,
  //     downvotes: 3,
  //     comments: ['asd', 'few'],
  //   },
  // ];
  // // localStorage.setItem("questions", JSON.stringify(questionss));
  // dispatch(faqActions.setQuestions(questionss))
  // console.log("questions set");

  return (
    <>
      <div className={styles.app}>
        <Navbar />
        <Main>
          <RouterProvider router={router} />
        </Main>
      </div>
    </>
  );
}

export default App;
