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
    const { name = '', sx, withPortal, variant, disabled } = props;
    const {
      field,
      fieldState: { error },
    } = useController({ name, control });

    return (
      <DateTimePicker
        sx={sx}
        error={Boolean(error)}
        helperText={error?.message || ''}
        withPortal={withPortal}
        variant={variant}
        disabled={disabled}
        {...field}
      />
    );
  }
);

export default DateTimePickerForForm;
