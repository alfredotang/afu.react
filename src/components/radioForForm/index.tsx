import type { FC } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { Radio, RadioProps } from '@src/components/radio';

type RadioForFormForFormProps = Omit<
  RadioProps,
  'error' | 'helperText' | 'value' | 'onChange' | 'ref' | 'name'
> & {
  name: string;
};

const RadioForForm: FC<RadioForFormForFormProps> = (props) => {
  const { control } = useFormContext();
  const { name } = props;
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <Radio
      {...props}
      {...field}
      error={Boolean(error)}
      helperText={error?.message || ''}
    />
  );
};

export default RadioForForm;
