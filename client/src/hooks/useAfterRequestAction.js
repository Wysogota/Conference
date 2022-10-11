import { useEffect, useState } from 'react';
import { isFunction } from 'lodash';

const useAfterRequestAction = (action, error) => {
  const [isRequested, setIsRequested] = useState(false);

  useEffect(() => {
    if (isRequested && !error) {
      setIsRequested(false);
      if (isFunction(action)) {
        action();
      }
    }
  }, [isRequested]);

  return { setIsRequested };
};

export default useAfterRequestAction;
