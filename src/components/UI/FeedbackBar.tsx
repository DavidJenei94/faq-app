import styles from './FeedbackBar.module.scss';

interface FeedbackBarProps {
  children: React.ReactNode;
  className: string;
}

const FeedbackBar = ({ children, className }: FeedbackBarProps) => {
  return (
    <div className={`${styles.feedback} ${styles[className]}`}>{children}</div>
  );
};

export default FeedbackBar;
