import type { ForwardRefExoticComponent } from 'react';
import type { SxProps } from '@material-ui/system';
import type { Theme } from '@material-ui/core/styles';
import { forwardRef } from 'react';
import Box from '@material-ui/core/Box';
import styled from '@emotion/styled';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ScheduleIcon from '@material-ui/icons/Schedule';

import DateTimePickerBase, {
  DateTimePickerVariant,
  DateTimePickerBaseProps,
  returnValue,
  returnFormat,
} from '@src/components/dateTimePickerBase';

const StyleWrapper = styled(Box)<{ error: boolean }>`
  display: inline-flex;
  flex-direction: column;
  position: relative;
  min-width: 0;
  padding: 0;
  margin: 0;
  border: 0;
  vertical-align: top;
  width: 100%;
  background-color: #fff;

  .react-datepicker-wrapper {
    border-width: 1px;
    border-style: solid;
    border-color: ${(props) =>
      props.error ? props.theme.palette.error.main : 'rgba(0, 0, 0, 0.23)'};
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.4375em;
    letter-spacing: 0.00938em;
    color: rgba(0, 0, 0, 0.87);
    box-sizing: border-box;
    position: relative;
    cursor: text;
    display: inline-flex;
    align-items: center;
    position: relative;
    border-radius: 4px;
    width: 100%;
    &:hover {
      border-color: rgb(0, 0, 0);
    }
  }
`;

type DateTimePickerProps = Omit<
  DateTimePickerBaseProps,
  'selectsRange' | 'onChange' | 'value'
> & {
  error?: boolean;
  helperText?: string;
  onChange: (date: Date) => void;
  value: Date;
  sx?: SxProps<Theme>;
};

const DateTimePicker: ForwardRefExoticComponent<DateTimePickerProps> = forwardRef(
  (props, ref) => {
    const {
      sx = {},
      variant = 'default',
      onChange,
      onBlur,
      value,
      max,
      min,
      error,
      helperText,
      timeIntervals = 15,
      placeholder,
      disabled,
    } = props;

    return (
      <Box
        display="flex"
        flexDirection="column"
        width="200px"
        sx={{ ...sx }}
        ref={ref}
      >
        <StyleWrapper error={error}>
          <DateTimePickerBase
            value={value}
            min={min}
            max={max}
            onChange={onChange}
            timeIntervals={timeIntervals}
            placeholder={placeholder}
            onBlur={onBlur}
            disabled={disabled}
            variant={variant}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '9px',
              right: '15px',
              backgroundColor: '#fff',
              display: 'flex',
              color: 'rgb(0, 0, 0)',
              alignItems: 'center',
              pointerEvents: 'none',
            }}
          >
            {variant !== 'time' && (
              <CalendarTodayIcon sx={{ fontSize: '1.25rem' }} />
            )}
            {variant === 'time' && (
              <ScheduleIcon sx={{ fontSize: '1.25rem' }} />
            )}
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
export default DateTimePicker;
