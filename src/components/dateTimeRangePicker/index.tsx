import type { ForwardRefExoticComponent } from 'react';
import type { SxProps } from '@material-ui/system';
import type { Theme } from '@material-ui/core/styles';
import { forwardRef } from 'react';
import Box from '@material-ui/core/Box';

import styled from '@emotion/styled';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import dayjs from '@src/providers/day';

import DateTimePickerBase, {
  DateTimePickerBaseProps,
  DateTimePickerVariant,
  InputVariant,
} from '@src/components/dateTimePickerBase';

const StyleWrapper = styled.div<{ error: boolean }>`
  position: relative;
  display: inline-flex;
  min-width: 0;
  padding: 0;
  margin: 0;
  vertical-align: top;
  width: 100%;
  box-sizing: border-box;

  .MuiInput-root {
    border-color: ${(props) =>
      props.error ? props.theme.palette.error.main : 'rgba(0, 0, 0, 0.23)'};
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    &.Mui-error {
      &::after {
        border-width: 0px;
      }
    }

    &::before {
      border-bottom: 0;
    }
    &:hover {
      &:not(.Mui-disabled) {
        &::before {
          border-bottom-width: 1px;
        }
      }
    }
  }

  .start-date-wrapper {
    .MuiInput-root {
      border-right-width: 0;
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
    }
  }

  .end-date-wrapper {
    .MuiInput-root {
      border-left-width: 0;
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
    }
  }
`;

type DateTimePickerRangeProps = Omit<
  DateTimePickerBaseProps,
  | 'selectsRange'
  | 'onChange'
  | 'value'
  | 'min'
  | 'max'
  | 'name'
  | 'inputVariant'
  | 'disabled'
> & {
  onChange: (date: [Date, Date]) => void;
  sx?: SxProps<Theme>;
  startDateMin?: Date;
  startDateMax?: Date;
  endDateMin?: Date;
  endDateMax?: Date;
  value: [Date, Date];
  helperText?: string;
  disabled?: [boolean, boolean];
};

/**
 * @name returnWidth
 * @description 根據 '日期 + 時間' | '時間' | '日期'，return 對應寬度
 * @param {DateTimePickerVariant} variant 時間日期模組 模式
 */
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

/**
 * @name DateTimeRangePicker
 * @description 時間日期模組 with 區間
 * @param {DateTimePickerRangeProps} props
 * @note 為了配合 React-hook-form
 * 會 return date of array [startDate, endDate] 結構
 * 若 api startDate, endDate 是2個欄位
 * 在 form defaultValue 要寫
 * defaultValue: {
 *  range: [startDate, endDate]
 * }
 * 在 form 變成同一個 欄位
 *
 * @note 若還是希望維持
 * defaultValue: {
 *  starDate,
 *  endDate,
 * }
 * 可以使用 DateTimePicker
 */
const DateTimeRangePicker: ForwardRefExoticComponent<DateTimePickerRangeProps> = forwardRef(
  (props, ref) => {
    const {
      sx = {},
      variant = 'default',
      onChange,
      onBlur,
      startDateMin,
      startDateMax,
      endDateMin,
      endDateMax,
      error,
      helperText,
      timeIntervals,
      placeholder,
      disabled,
      value,
      withPortal,
    } = props;

    const [startDate, endDate] = value;

    const inputVariant: InputVariant = 'standard';

    const handleChangeStartDate = (startDateValue: Date) => {
      // startDate 超過 endDate 時
      // startDate  要變成 null
      if (dayjs(startDateValue).isAfter(endDate)) {
        onChange([null, endDate]);
      } else {
        onChange([startDateValue, endDate]);
      }
    };
    const handleChangeEndDate = (endDateValue: Date) => {
      // endDate 小於 startDate 時
      // endDate  要變成 null
      if (dayjs(endDateValue).isBefore(startDate)) {
        onChange([startDate, null]);
      } else {
        onChange([startDate, endDateValue]);
      }
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
          {/* start date  */}
          <DateTimePickerBase
            className="start-date-wrapper"
            variant={variant}
            value={startDate}
            min={startDateMin}
            max={startDateMax}
            onChange={(date) => {
              handleChangeStartDate(date as Date);
            }}
            timeIntervals={timeIntervals}
            placeholder={!value || (!value[0] && !value[1]) ? placeholder : ''}
            onBlur={onBlur}
            disabled={disabled[0]}
            inputVariant={inputVariant}
            error={error}
            withPortal={withPortal}
          />

          <Box
            sx={{
              fontSize: '1.25rem',
              display: value[0] || value[1] ? 'flex' : 'none',
              position: 'absolute',
              top: '5px',
              right: '50%',
              transform: 'translateX(-50%)',
              color: (theme) =>
                disabled.every((item) => item)
                  ? theme.palette.text.disabled
                  : theme.palette.text.primary,
            }}
          >
            -
          </Box>

          {/* end date  */}
          <DateTimePickerBase
            className="end-date-wrapper"
            variant={variant}
            value={endDate}
            min={endDateMin}
            max={endDateMax}
            onChange={(date) => {
              handleChangeEndDate(date as Date);
            }}
            timeIntervals={timeIntervals}
            onBlur={onBlur}
            disabled={disabled[1]}
            inputVariant={inputVariant}
            error={error}
            withPortal={withPortal}
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
            <ExpandMoreIcon sx={{ fontSize: '1.25rem' }} />
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
export default DateTimeRangePicker;
