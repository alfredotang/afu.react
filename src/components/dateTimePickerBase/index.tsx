import type { FC } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import styled from '@emotion/styled';
import isArray from 'lodash/isArray';
import isDate from 'lodash/isDate';

export type DateTimePickerVariant = 'date' | 'time' | 'default';

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
    &__input-container {
      width: 100%;
      position: relative;
      display: flex;
      input {
        font: inherit;
        padding: 8px 14px;
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
        line-height: 1.75rem;

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

      &:hover {
        color: #fff !important;
        font-weight: 400 !important;
        background-color: ${(props) =>
          props.theme.palette.primary.main} !important;
      }

      &--today {
        color: rgba(0, 0, 0, 0.77);
        position: relative;

        &:hover {
          &::after {
            display: none;
          }
        }

        &::after {
          position: absolute;
          border-radius: 100%;
          top: 8px;
          width: 8px;
          height: 8px;
          content: '';
          color: ${(props) => props.theme.palette.primary.main};
          background-color: ${(props) => props.theme.palette.primary.main};
        }
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
        background-color: ${(props) => props.theme.palette.primary.main};
        color: #fff;
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
    timeIntervals = 15,
    placeholder,
    selectsRange = false,
    disabled,
  } = props;
  return (
    <StyleWrapper>
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
        selectsRange={selectsRange}
        disabled={disabled}
      />
    </StyleWrapper>
  );
};

export default DatePickerBase;
