import type { ForwardRefExoticComponent } from 'react';
import type { SxProps } from '@material-ui/system';
import type { Theme } from '@material-ui/core/styles';
import { forwardRef } from 'react';
import Box from '@material-ui/core/Box';
import styled from '@emotion/styled';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ScheduleIcon from '@material-ui/icons/Schedule';

import DateTimePickerBase, {
  DateTimePickerBaseProps,
} from '@src/components/dateTimePickerBase';

const StyleWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  position: relative;
  min-width: 0;
  padding: 0;
  margin: 0;
  border: 0;
  vertical-align: top;
  width: 100%;

  .react-datepicker-wrapper {
    display: block;
  }
`;

type DateTimePickerProps = Omit<
  DateTimePickerBaseProps,
  | 'selectsRange'
  | 'onChange'
  | 'value'
  | 'selectsStart'
  | 'selectsEnd'
  | 'startDate'
  | 'endDate'
> & {
  onChange: (date: Date) => void;
  value: Date;
  sx?: SxProps<Theme>;
  helperText?: string;
};

/**
 * @name DateTimePicker
 * @description 時間日期模組
 * @param {DateTimePickerProps} props
 */
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
      timeIntervals,
      placeholder,
      disabled,
      name,
      withPortal,
    } = props;

    return (
      <Box
        display="flex"
        flexDirection="column"
        width="200px"
        sx={{ ...sx }}
        ref={ref}
      >
        <StyleWrapper>
          {/* 時間日期 核心功能 */}
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
            name={name}
            error={error}
            withPortal={withPortal}
          />

          {/* input 左側 icon 區塊 */}
          <Box
            sx={{
              position: 'absolute',
              top: '9px',
              right: '15px',
              backgroundColor: '#fff',
              display: 'flex',
              color: (theme) =>
                disabled
                  ? theme.palette.text.disabled
                  : theme.palette.text.primary,
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

        {/* error message */}
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
