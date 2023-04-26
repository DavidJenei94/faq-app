import Background from './Background';
import styles from './Main.module.scss';

interface MainProps {
  children: React.ReactNode;
}

const Main = ({ children }: MainProps) => {
  return (
    <div className={styles.main}>
      <Background />
      {children}
    </div>
  );
};

export default Main;
