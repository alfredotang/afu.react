import type { FC } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import styled from '@emotion/styled';
import TextField from '@material-ui/core/TextField';
import isArray from 'lodash/isArray';
import isDate from 'lodash/isDate';
import DatePickerHeader from './datePickerHeader';

export type DateTimePickerVariant = 'date' | 'time' | 'default';
export type InputVariant = 'standard' | 'outlined' | 'filled';

export type DateTimePickerBaseProps = {
  variant?: DateTimePickerVariant;
  max?: Date;
  min?: Date;
  timeIntervals?: number;
  placeholder?: string;
  onBlur?: () => void;
  disabled?: boolean;
  onChange: (date: Date | [Date, Date]) => void;
  value: Date;
  selectsRange?: boolean;
  name?: string;
  error?: boolean;
  inputVariant?: InputVariant;
  selectsStart?: boolean;
  selectsEnd?: boolean;
  startDate?: Date;
  endDate?: Date;
  className?: string;
  withPortal?: boolean;
};

export function returnValue(
  selectsRange: boolean,
  value: Date | [Date, Date]
): { startDate: Date; endDate: Date; date: Date } {
  if (selectsRange && isArray(value)) {
    return {
      startDate: value[0],
      endDate: value[1],
      date: value[0],
    };
  }

  if (!selectsRange && isDate(value)) {
    return {
      startDate: null,
      endDate: null,
      date: value,
    };
  }

  return {
    startDate: null,
    endDate: null,
    date: null,
  };
}

export function returnFormat(variant: DateTimePickerVariant): string {
  switch (variant) {
    case 'date':
      return 'yyyy/MM/dd';
    case 'time': {
      return 'HH:mm';
    }
    default:
      return 'yyyy/MM/dd HH:mm';
  }
}

const StyleWrapper = styled.div`
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
      &:hover {
        background-color: ${(props) =>
          props.theme.palette.primary.main}!important;
        color: #fff !important;
        font-weight: 400 !important;
      }
    }

    &__triangle {
      display: none;
    }

    &__header {
      background-color: ${(props) => props.theme.palette.background.paper};
      &__dropdown {
        &--select {
          margin: ${(props) => props.theme.spacing(2)};
        }
      }
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

      &:hover {
        color: #fff !important;
        font-weight: 400 !important;
        background-color: ${(props) =>
          props.theme.palette.primary.light} !important;
      }

      &--today {
        position: relative;
        color: ${(props) => props.theme.palette.primary.main} !important;
      }
      &--disabled {
        color: rgba(0, 0, 0, 0.47);
        pointer-events: none;
        cursor: default;
      }

      &--keyboard-selected {
        color: rgba(0, 0, 0, 0.77);
        background-color: rgba(0, 0, 0, 0);
      }
      &--selected {
        background-color: ${(props) =>
          props.theme.palette.primary.main}!important;
        color: #fff !important;
        font-weight: 400;
      }

      &--in-range {
        background-color: ${(props) => props.theme.palette.primary.main};
        color: #fff;
        font-weight: 400;
      }

      &--in-selecting-range {
        background-color: ${(props) => props.theme.palette.primary.light};
        color: #fff;
        font-weight: 400;
      }
    }
  }
`;

const DatePickerBase: FC<DateTimePickerBaseProps> = (props) => {
  const {
    variant,
    onChange,
    onBlur,
    value,
    max,
    min,
    timeIntervals = 60,
    placeholder,
    selectsRange = false,
    disabled,
    name,
    error,
    inputVariant = 'outlined',
    selectsStart,
    selectsEnd,
    startDate,
    endDate,
    className,
    withPortal,
  } = props;
  return (
    <StyleWrapper>
      <ReactDatePicker
        className={className}
        selected={value}
        selectsStart={selectsStart}
        selectsEnd={selectsEnd}
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
        selectsRange={selectsRange}
        disabled={disabled}
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        name={name}
        startDate={startDate}
        endDate={endDate}
        withPortal={withPortal}
        customInput={<TextField error={error} variant={inputVariant} />}
        renderCustomHeader={(props) => <DatePickerHeader {...props} />}
      />
    </StyleWrapper>
  );
};

export default DatePickerBase;
