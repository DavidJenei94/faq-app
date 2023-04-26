import { createContext, useEffect, useState } from 'react';

let hideFeedbackTimer: NodeJS.Timeout;
let slideDownTimer: NodeJS.Timeout;

const FeedbackContext = createContext({
  message: '',
  isMessageShown: false,
  isSlidingDown: false,
  showMessage: (message: string, ms: number) => {},
  clearMessage: () => {},
});

export const FeedbackContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isMessageShown, setIsMessageShown] = useState<boolean>(false);
  const [isSlidingDown, setIsSlidingDown] = useState<boolean>(false);
  const [showTime, setShowTime] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (isMessageShown) {
      hideFeedbackTimer = setTimeout(() => {
        setIsMessageShown(false);
        setMessage('');
        setIsSlidingDown(false);
      }, showTime);

      slideDownTimer = setTimeout(() => {
        setIsSlidingDown(true);
      }, showTime - 500);
    }

    return () => {
      hideFeedbackTimer && clearTimeout(hideFeedbackTimer);
      slideDownTimer && clearTimeout(slideDownTimer);
    };
  }, [isMessageShown, showTime]);

  const showMessageHandler = (message: string, ms: number) => {
    setMessage(message);
    setShowTime(ms);
    setIsMessageShown(true);
  };

  const clearMessageHandler = () => {
    setIsMessageShown(false);
  };

  return (
    <FeedbackContext.Provider
      value={{
        message,
        isMessageShown,
        isSlidingDown,
        showMessage: showMessageHandler,
        clearMessage: clearMessageHandler,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
