import { useEffect } from 'react';
import type { DeepMap, FieldError } from 'react-hook-form';

type UseScrollToErrorProps<T> = {
  errors: DeepMap<T, FieldError>;
};

/**
 * @description auto scroll to error
 * @param errors react-hook-form -> const { formState: { errors }} = (useForm | useFormContext)
 */
function useScrollToError<T>({ errors }: UseScrollToErrorProps<T>): void {
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
}

export default useScrollToError;
