import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux-hooks';

import QuestionCard from '../Question/QuestionCard';
import Button from '../UI/Button';

import styles from './List.module.scss';
import addIcon from '../../assets/icons/add-icon.png';

const List = () => {
  const navigate = useNavigate();

  const questions = useAppSelector((state) => state.questions);

  const [page, setPage] = useState(0);
  const questionsPerPage = 2;
  const startIndex = page * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(questions.length / questionsPerPage) - 1)
    );
  };

  const handleCreateQuestion = () => {
    navigate('/question/create');
  };

  return (
    <div className={styles.container}>
      <h1>Questions:</h1>
      <div className={styles.list}>
        {questions.slice(startIndex, endIndex).map((question) => (
          <QuestionCard question={question} key={question.id} />
        ))}
      </div>
      <div className={styles['list-navigation']}>
        <Button onClick={handlePrevPage} disabled={page === 0}>
          Previous
        </Button>
        {`${questions.length === 0 ? '0' : startIndex + 1}-${
          endIndex >= questions.length ? questions.length : endIndex
        } / ${questions.length}`}
        <Button
          onClick={handleNextPage}
          disabled={endIndex >= questions.length}
        >
          Next
        </Button>
      </div>
      <div className={styles['create-question']}>
        <Button
          title="Create new question"
          onClick={handleCreateQuestion}
          className={styles['new-question-button']}
        >
          <img src={addIcon} alt="Create new question button" />
        </Button>
      </div>
    </div>
  );
};

export default List;
