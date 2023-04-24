import { useState } from 'react';
import { Question, defaultQuestion } from '../../models/Question.model';

import QuestionCard from '../Question/QuestionCard';
import Button from '../UI/Button';

import styles from './List.module.scss';
import addIcon from '../../assets/icons/add-icon.png';

const List = () => {
  // const [questions, setQuestions] = useState<Question[]>([]);

  const questions = [
    defaultQuestion,
    {
      id: 1,
      question: 'New question',
      creationDate: null,
      upvotes: 2,
      downvotes: 2,
      comments: ['asd'],
    },
    {
      id: 2,
      question: 'Random question',
      creationDate: null,
      upvotes: 3,
      downvotes: 3,
      comments: ['asd', 'few'],
    },
    {
      id: 3,
      question: 'New question',
      creationDate: null,
      upvotes: 2,
      downvotes: 2,
      comments: ['asd'],
    },
    {
      id: 4,
      question: 'Random question',
      creationDate: null,
      upvotes: 3,
      downvotes: 3,
      comments: ['asd', 'few'],
    },
    {
      id: 5,
      question: 'Random question',
      creationDate: null,
      upvotes: 3,
      downvotes: 3,
      comments: ['asd', 'few'],
    },
    {
      id: 6,
      question: 'New question',
      creationDate: null,
      upvotes: 2,
      downvotes: 2,
      comments: ['asd'],
    },
    {
      id: 7,
      question: 'Random question',
      creationDate: null,
      upvotes: 3,
      downvotes: 3,
      comments: ['asd', 'few'],
    },
  ];

  const [page, setPage] = useState(0);
  const questionsPerPage = 5;
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
        {`${startIndex + 1}-${
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
        <Button title="Create new question">
          <img src={addIcon} alt="Create new question button" />
        </Button>
      </div>
    </div>
  );
};

export default List;
