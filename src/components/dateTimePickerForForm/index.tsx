import type { ForwardRefExoticComponent } from 'react';
import type { FieldError } from 'react-hook-form';
import { forwardRef } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import Box from '@material-ui/core/Box';

import DateTimePicker, {
  DateTimePickerProps,
} from '@src/components/dateTimePicker';

type DateTimeRangePickerForFormProps = Partial<DateTimePickerProps> & {
  name: string;
};

const DateTimePickerForForm: ForwardRefExoticComponent<DateTimeRangePickerForFormProps> = forwardRef(
  (props, ref) => {
    const { control } = useFormContext();
    const { name } = props;
    const {
      field,
      fieldState: { error },
    } = useController({ name, control });

    return (
      <DateTimePicker
        {...props}
        error={Boolean(error)}
        helperText={error?.message || ''}
        {...field}
      />
    );
  }
);

export default DateTimePickerForForm;
