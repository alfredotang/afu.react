import type { ForwardRefExoticComponent } from 'react'
import type { FieldError } from 'react-hook-form'
import { forwardRef } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import Box from '@mui/material/Box'

import DateTimeRangePicker, { DateTimeRangePickerProps } from '@src/components/dateTimeRangePicker'

type DateTimeRangePickerForFormProps = Omit<
  DateTimeRangePickerProps,
  | 'startDate'
  | 'endDate'
  | 'onChangeStartDate'
  | 'onChangeEndDate'
  | 'startDateName'
  | 'endDateName'
  | 'ref'
  | 'error'
  | 'helperText'
> & {
  startDateName: string
  endDateName: string
}

function mappingErrorMsg(startDateError?: FieldError, endDateError?: FieldError): string {
  return startDateError?.message || endDateError?.message || ''
}

const DateTimeRangePickerForForm: ForwardRefExoticComponent<DateTimeRangePickerForFormProps> = forwardRef(
  (props, ref) => {
    const { control } = useFormContext()
    const { sx, startDateName, endDateName } = props
    const {
      field: startDateField,
      fieldState: { error: startDateError },
    } = useController({ name: startDateName, control })

    const {
      field: endDateField,
      fieldState: { error: endDateError },
    } = useController({ name: endDateName, control })

    return (
      <Box sx={sx} ref={startDateField.ref}>
        <DateTimeRangePicker
          {...props}
          sx={{}}
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
    )
  }
)

export default DateTimeRangePickerForForm
