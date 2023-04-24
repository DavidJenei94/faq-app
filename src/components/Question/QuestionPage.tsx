import { useParams } from 'react-router-dom';

import styles from './QuestionPage.module.scss';

const QuestionPage = () => {
  let { id } = useParams();

  return <div>{id}</div>;
};

export default QuestionPage;
