import { useEffect, useState } from 'react';
import { isFunction } from 'lodash';

/**
 * Executes action after request was finished successfully
 *
 * @param {function} action
 * @param {boolean} isFetching
 * @param {string} error
 * @returns {setIsRequested: function}
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
