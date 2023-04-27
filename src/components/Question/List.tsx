import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { Question } from '../../models/Question.model';
import useDelayLoading from '../../hooks/useDelayLoading';
import { faqActions } from '../../store/faq-redux';

import QuestionCard from '../Question/QuestionCard';
import Button from '../UI/Button';

import styles from './List.module.scss';
import addIcon from '../../assets/icons/add-icon.png';

const List = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const questions: Question[] = useAppSelector((state) => state.questions);
  const initialized: boolean = useAppSelector((state) => state.initialized);
  const questionSearch: string = useAppSelector(
    (state) => state.questionSearch
  );

  const delayLoading = useDelayLoading();

  const [page, setPage] = useState<number>(0);

  const questionsPerPage: number = 12;
  const startIndex: number = page * questionsPerPage;
  const endIndex: number = startIndex + questionsPerPage;

  useEffect(() => {
    setPage(0);
  }, [questionSearch]);

  const handleSearchClear = () => {
    dispatch(faqActions.setQuestionSearch(''));
  };

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

  if (!delayLoading) {
    return null;
  }

  if (!initialized && delayLoading) {
    return <>Loading...</>;
  }

  const filteredQuestions = questions.filter((question) => {
    return (
      question.questionTitle
        .toUpperCase()
        .indexOf(questionSearch.toUpperCase()) !== -1
    );
  });

  return (
    <div className={styles.container}>
      <h1>Questions:</h1>
      {questionSearch && (
        <div className={styles.filter}>
          <p>Filtered: {questionSearch}</p>
          <Button onClick={handleSearchClear}>Clear</Button>
        </div>
      )}
      <div className={styles.list}>
        {filteredQuestions.slice(startIndex, endIndex).map((question) => (
          <QuestionCard question={question} key={question.id} />
        ))}
      </div>
      <div className={styles['list-navigation']}>
        <Button onClick={handlePrevPage} disabled={page === 0}>
          Previous
        </Button>
        {`${filteredQuestions.length === 0 ? '0' : startIndex + 1}-${
          endIndex >= filteredQuestions.length
            ? filteredQuestions.length
            : endIndex
        } / ${filteredQuestions.length}`}
        <Button
          onClick={handleNextPage}
          disabled={endIndex >= filteredQuestions.length}
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
