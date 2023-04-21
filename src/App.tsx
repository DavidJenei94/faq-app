import Main from './components/Layout/Main';
import Navbar from './components/Layout/Navbar';

import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <Navbar />
      <Main />
    </div>
  );
}

export default App;
