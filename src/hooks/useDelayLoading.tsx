import { useEffect, useState } from 'react';

// On updating components with fetching
// To give a little delay before the Loading... is displayed
// Preventing these shorts flashes grants greater user experience
const useDelayLoading = () => {
  const [loadDelay, setLoadDelay] = useState<boolean>(false);

  useEffect(() => {
    setLoadDelay(false);
    let loadingDelay: NodeJS.Timeout;

    loadingDelay = setTimeout(() => {
      setLoadDelay(true);
    }, 100);

    return () => {
      clearTimeout(loadingDelay);
    };
  }, []);

  return loadDelay;
};

export default useDelayLoading;
