import type { FC } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import Select, { SelectProps } from '@src/components/select';

type InputForFormProps = SelectProps & {
  name: string;
};

const SelectForForm: FC<InputForFormProps> = (props) => {
  const { control } = useFormContext();
  const { name } = props;
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <Select
      {...props}
      {...field}
      error={Boolean(error)}
      helperText={error?.message || ''}
    />
  );
};

export default SelectForForm;
