import type { ForwardRefExoticComponent } from 'react';
import type { SxProps } from '@material-ui/system';
import type { Theme } from '@material-ui/core/styles';
import { forwardRef } from 'react';
import Box from '@material-ui/core/Box';

import styled from '@emotion/styled';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import DateTimePickerBase, {
  DateTimePickerBaseProps,
  DateTimePickerVariant,
} from '@src/components/dateTimePickerBase';

const StyleWrapper = styled.div<{ error: boolean }>`
  position: relative;
  display: inline-flex;
  min-width: 0;
  padding: 0;
  margin: 0;
  vertical-align: top;
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) =>
    props.error ? props.theme.palette.error.main : 'rgba(0, 0, 0, 0.23)'};

  &:hover {
    border-color: rgb(0, 0, 0);
  }

  &:focus {
    outline-color: ${(props) => props.theme.palette.error.main};
    outline-width: 1px;
    outline-style: solid;
  }

  .react-datepicker-wrapper {
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.4375em;
    letter-spacing: 0.00938em;
    color: rgba(0, 0, 0, 0.87);
    box-sizing: border-box;
    border-radius: 4px;
    position: relative;
    cursor: text;
    display: inline-flex;
    align-items: center;
    position: relative;
    width: 100%;
    &:hover {
      border-color: rgb(0, 0, 0);
    }
  }
`;

type DateTimePickerRangeProps = Omit<
  DateTimePickerBaseProps,
  'selectsRange' | 'onChange' | 'value' | 'min' | 'max'
> & {
  error?: boolean;
  helperText?: string;
  onChange: (startDate: Date, endDate: Date) => void;
  startDate: Date;
  endDate: Date;
  sx?: SxProps<Theme>;
  startDateMin?: Date;
  startDateMax?: Date;
  endDateMin?: Date;
  endDateMax?: Date;
};

function returnWidth(variant: DateTimePickerVariant): string {
  switch (variant) {
    case 'date':
      return '260px';
    case 'time':
      return '198px';
    default:
      return '350px';
  }
}

const DateTimeRangePicker: ForwardRefExoticComponent<DateTimePickerRangeProps> = forwardRef(
  (props, ref) => {
    const {
      sx = {},
      variant = 'default',
      onChange,
      onBlur,
      startDate,
      endDate,
      startDateMin,
      startDateMax,
      endDateMin,
      endDateMax,
      error,
      helperText,
      timeIntervals = 15,
      placeholder,
      disabled,
    } = props;

    const handleChange = (startDateValue: Date, endDateValue: Date) => {
      onChange(startDateValue, endDateValue);
    };

    return (
      <Box
        display="flex"
        flexDirection="column"
        sx={{
          width: returnWidth(variant),
          ...sx,
        }}
        ref={ref}
      >
        <StyleWrapper error={error}>
          <DateTimePickerBase
            variant={variant}
            value={startDate}
            min={startDateMin}
            max={startDateMax}
            onChange={(date) => {
              handleChange(date as Date, endDate);
            }}
            timeIntervals={timeIntervals}
            placeholder={startDate || endDate ? '' : placeholder}
            onBlur={onBlur}
            disabled={disabled}
          />

          <Box
            sx={{
              fontSize: '1.25rem',
              display: startDate || endDate ? 'flex' : 'none',
              position: 'absolute',
              top: '5px',
              right: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            -
          </Box>

          <DateTimePickerBase
            variant={variant}
            value={endDate}
            min={endDateMin}
            max={endDateMax}
            onChange={(date) => {
              handleChange(startDate, date as Date);
            }}
            timeIntervals={timeIntervals}
            onBlur={onBlur}
            disabled={disabled}
          />

          <Box
            sx={{
              position: 'absolute',
              top: '10px',
              right: '8px',
              backgroundColor: '#fff',
              display: 'flex',
              color: 'rgba(0, 0, 0, 0.57)',
              alignItems: 'center',
              pointerEvents: 'none',
            }}
          >
            <ArrowDropDownIcon sx={{ fontSize: '1.25rem' }} />
          </Box>
        </StyleWrapper>
        {error && helperText && (
          <Box
            sx={{
              color: (theme) => theme.palette.error.main,
              fontWeight: '400',
              fontSize: '0.75rem',
              lineHeight: '1.66',
              letterSpacing: '0.03333em',
              textAlign: 'left',
              marginTop: '3px',
              marginRight: '14px',
              marginBottom: '0',
            }}
          >
            {helperText}
          </Box>
        )}
      </Box>
    );
  }
);
export default DateTimeRangePicker;
