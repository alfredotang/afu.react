import type { ForwardRefExoticComponent, SyntheticEvent } from 'react';
import type { SxProps } from '@material-ui/system';
import type { Theme } from '@material-ui/core/styles';
import { forwardRef, useState } from 'react';
import Box from '@material-ui/core/Box';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import styled from '@emotion/styled';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ScheduleIcon from '@material-ui/icons/Schedule';

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

  .icon-wrapper {
    position: absolute;
    top: 10px;
    right: 8px;
    background-color: #fff;
    display: flex;
    color: rgb(0, 0, 0);
    align-items: center;
    pointer-events: none;
    &__icon {
      font-size: 1.25rem;
    }

    &:hover {
      .react-datepicker-wrapper {
        border-color: rgb(0, 0, 0);
      }
    }
  }

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
    &:hover {
      border-color: rgb(0, 0, 0);
    }
  }
  .react-datepicker {
    box-shadow: ${(props) => props.theme.shadows[10]};
    border: none;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    display: flex;
    &__time-list-item {
      line-height: 30px;
      &--selected {
        background-color: ${(props) =>
          props.theme.palette.primary.main} !important;
        color: #fff !important;
        font-weight: 400 !important;
      }
    }
    &__input-container {
      width: 100%;
      position: relative;
      display: flex;
      input {
        font: inherit;
        padding: 8px 35px 8px 14px;
        letter-spacing: inherit;
        color: currentColor;
        border: 0;
        box-sizing: content-box;
        background: none;
        height: 1.4375em;
        margin: 0;
        -webkit-tap-highlight-color: transparent;
        display: block;
        min-width: 0;
        width: 100%;
        max-width: 100%;
        animation-name: mui-auto-fill-cancel;
        animation-duration: 10ms;
        outline: 0px;
        &::placeholder {
          color: #666;
          font-size: 14px;
        }
      }
    }

    &__triangle {
      display: none;
    }

    &__header {
      background-color: ${(props) => props.theme.palette.background.paper};
    }

    &__day-name {
      width: 36px;
      height: 36px;
      color: rgba(0, 0, 0, 0.87);
      margin-top: 8px;
    }

    &__day {
      width: 36px;
      height: 36px;
      border-radius: 100%;
      font-weight: 400;
      padding: 0;
      line-height: 36px;
      color: rgba(0, 0, 0, 0.77);
      &--today {
        color: rgba(0, 0, 0, 1);
        font-weight: 700;
      }
      &--disabled {
        color: rgba(0, 0, 0, 0.47);
      }

      &--keyboard-selected {
        background-color: ${(props) => props.theme.palette.primary.main};
        color: #fff;
        font-weight: 400;
      }
      &--selected {
        background-color: ${(props) => props.theme.palette.primary.main};
        color: #fff;
        font-weight: 400;
      }
    }
  }
`;

type DateTimePickerVariant = 'date' | 'time' | 'default';

type DateTimePickerProps = {
  sx?: SxProps<Theme>;
  variant?: DateTimePickerVariant;
  max?: Date;
  min?: Date;
  error?: boolean;
  helperText?: string;
  timeIntervals?: number;
  selectsRange?: boolean;
  placeholder?: string;
  onChange: (date: Date) => void;
  onBlur?: () => void;
  value: Date;
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
      selectsRange = false,
    } = props;

    const returnFormat = (variant: DateTimePickerVariant): string => {
      switch (variant) {
        case 'date':
          return 'yyyy/MM/dd';
        case 'time': {
          return 'HH:mm';
        }
        default:
          return 'yyyy/MM/dd HH:mm';
      }
    };

    return (
      <Box
        display="flex"
        flexDirection="column"
        width="200px"
        sx={{ ...sx }}
        ref={ref}
      >
        <StyleWrapper error={error}>
          <ReactDatePicker
            selected={value}
            minDate={min}
            maxDate={max}
            onChange={onChange}
            dateFormat={returnFormat(variant)}
            timeFormat="HH:mm"
            showTimeSelect={variant !== 'date'}
            showTimeSelectOnly={variant === 'time'}
            timeIntervals={timeIntervals}
            placeholderText={placeholder}
            onBlur={onBlur}
            selectsRange={false}
          />
          <Box className="icon-wrapper">
            {variant !== 'time' && (
              <CalendarTodayIcon className="icon-wrapper__icon" />
            )}
            {variant === 'time' && (
              <ScheduleIcon className="icon-wrapper__icon" />
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
