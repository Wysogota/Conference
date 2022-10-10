import { useEffect, useState } from 'react';
import { isFunction } from 'lodash';

/**
 * Executes after every authorization action
 * @param {Array<string>} redirectPaths
 * @param {Function} action
 * @returns setIsRequested - is request starts
 */
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
