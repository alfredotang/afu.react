import type { FC } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { WordCounter } from '@src/components';
import Input, { InputProps } from '@src/components/input';

type InputForFormProps = InputProps & {
  name: string;
  enabledWordCounter?: boolean;
};

const InputForForm: FC<InputForFormProps> = (props) => {
  const { control } = useFormContext();
  const { name, enabledWordCounter } = props;
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  if (enabledWordCounter) {
    return (
      <WordCounter>
        <Input
          {...props}
          {...field}
          error={Boolean(error)}
          helperText={error?.message || ''}
        />
      </WordCounter>
    );
  }
  return (
    <Input
      {...props}
      {...field}
      error={Boolean(error)}
      helperText={error?.message || ''}
    />
  );
};

export default InputForForm;
