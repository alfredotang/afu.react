import { useEffect } from 'react';
import type { DeepMap, FieldError } from 'react-hook-form';

type UseScrollToErrorProps<T> = {
  errors: DeepMap<T, FieldError>;
};

// FIXME: not work XD
function useScrollToError<T>({ errors }: UseScrollToErrorProps<T>): void {
  useEffect(() => {
    // console.log({ ALL_ERROR: errors });
    const keys = Object.keys(errors);
    if (keys.length > 0) {
      errors[keys[0]].ref.scrollIntoView({ behavior: 'smooth' });
    }
  }, [errors]);
}

export default useScrollToError;
