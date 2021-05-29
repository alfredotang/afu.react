import type { FC } from 'react';
import type { TextFieldProps } from '@src/components/textField';
import { useController, useFormContext } from 'react-hook-form';

import { TextField } from '@src/components/textField';

type InputForFormProps = Omit<
  TextFieldProps,
  'name' | 'ref' | 'onChange' | 'error' | 'helperText' | 'value'
> & {
  name: string;
};

export const TextFieldForForm: FC<InputForFormProps> = (props) => {
  const { control } = useFormContext();
  const { name } = props;
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <TextField
      {...props}
      {...field}
      error={Boolean(error)}
      helperText={error?.message || ''}
    />
  );
};

export default TextFieldForForm;
