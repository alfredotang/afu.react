import type { FC } from 'react';
import type { DeepMap, FieldError } from 'react-hook-form';
import { useEffect } from 'react';

type FormScrollToErrorWrapperProps = {
  errors: DeepMap<any, FieldError>;
};

const ScrollToErrorWrapper: FC<FormScrollToErrorWrapperProps> = ({
  errors,
  children,
}) => {
  useEffect(() => {
    // console.log({ ALL_ERROR: errors });
    const keys = Object.keys(errors);
    if (keys.length > 0) {
      errors[keys[0]]?.ref?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [errors]);

  return <>{children}</>;
};

export default ScrollToErrorWrapper;
