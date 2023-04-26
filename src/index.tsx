import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';
import { FeedbackContextProvider } from './store/feedback-context';

import App from './App';

import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <FeedbackContextProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </FeedbackContextProvider>
);
