import Main from './components/Layout/Main';
import Navbar from './components/Layout/Navbar';

import styles from './App.module.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import QuestionPage from './components/Question/QuestionPage';
import List from './components/Question/List';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <List />,
    },
    {
      path: 'question/:id',
      element: <QuestionPage />,
    },
  ]);

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
