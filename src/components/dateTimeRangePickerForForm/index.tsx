import type { ForwardRefExoticComponent } from 'react';
import type { FieldError } from 'react-hook-form';
import { forwardRef } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import Box from '@material-ui/core/Box';

import DateTimeRangePicker, {
  DateTimeRangePickerProps,
} from '@src/components/dateTimeRangePicker';

type DateTimeRangePickerForFormProps = Partial<DateTimeRangePickerProps> & {
  name: [string, string];
};

function mappingErrorMsg(
  startDateError: FieldError,
  endDateError: FieldError
): string {
  if (Boolean(startDateError)) {
    return startDateError?.message || '';
  }

  if (Boolean(endDateError)) {
    return endDateError?.message;
  }

  return '';
}

const DateTimeRangePickerForForm: ForwardRefExoticComponent<DateTimeRangePickerForFormProps> = forwardRef(
  (props, ref) => {
    const { control } = useFormContext();
    const {
      name = ['', ''],
      sx,
      startDateMin,
      startDateMax,
      endDateMax,
      endDateMin,
      disabled,
      withPortal,
    } = props;
    const {
      field: startDateField,
      fieldState: { error: startDateError },
    } = useController({ name: name[0], control });

    const {
      field: endDateField,
      fieldState: { error: endDateError },
    } = useController({ name: name[1], control });

    return (
      <Box sx={sx} ref={startDateField.ref}>
        <DateTimeRangePicker
          startDateMin={startDateMin}
          startDateMax={startDateMax}
          endDateMax={endDateMax}
          endDateMin={endDateMin}
          disabled={disabled}
          withPortal={withPortal}
          ref={endDateField.ref}
          onChangeStartDate={startDateField.onChange}
          onChangeEndDate={endDateField.onChange}
          startDateName={startDateField.name}
          endDateName={endDateField.name}
          error={Boolean(startDateError) || Boolean(endDateError)}
          helperText={mappingErrorMsg(startDateError, endDateError)}
          startDate={startDateField.value}
          endDate={endDateField.value}
        />
      </Box>
    );
  }
);

export default DateTimeRangePickerForForm;
