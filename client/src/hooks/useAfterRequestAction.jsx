import { useEffect, useState } from 'react';
import { isFunction } from 'lodash';

const useAfterRequestAction = (action, isFetching, error) => {
  const [isRequested, setIsRequested] = useState(false);

  useEffect(() => {
    if (isRequested && !error && !isFetching) {
      setIsRequested(false);
      if (isFunction(action)) {
        action();
      }
    }
  }, [isFetching]);

  return { setIsRequested };
};

export default useAfterRequestAction;
