import type { ForwardRefExoticComponent } from 'react'
import type { Theme, SxProps } from '@mui/material/styles'
import { forwardRef } from 'react'
import Box from '@mui/material/Box'

import styled from '@emotion/styled'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import dayjs from '@src/providers/day'

import DateTimePickerBase, {
  DateTimePickerBaseProps,
  DateTimePickerVariant,
  InputVariant,
} from '@src/components/dateTimePickerBase'

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
    border-color: ${props =>
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
`

export type DateTimeRangePickerProps = Omit<
  DateTimePickerBaseProps,
  | 'selectsRange'
  | 'onChange'
  | 'value'
  | 'min'
  | 'max'
  | 'name'
  | 'inputVariant'
  | 'disabled'
  | 'value'
  | 'name'
> & {
  sx?: SxProps<Theme>
  startDateMin?: Date
  startDateMax?: Date
  endDateMin?: Date
  endDateMax?: Date
  helperText?: string
  startDateDisabled?: boolean
  endDateDisabled?: boolean
  startDate: Date
  endDate: Date
  onChangeStartDate: (date: Date | null) => void
  onChangeEndDate: (date: Date | null) => void
  startDateName?: string
  endDateName?: string
}

/**
 * @name returnWidth
 * @description 根據 '日期 + 時間' | '時間' | '日期'，return 對應寬度
 * @param {DateTimePickerVariant} variant 時間日期模組 模式
 */
function returnWidth(variant: DateTimePickerVariant): string {
  switch (variant) {
    case 'date':
      return '260px'
    case 'time':
      return '198px'
    default:
      return '350px'
  }
}

/**
 * @name DateTimeRangePicker
 * @description 時間日期模組 with 區間
 * @param {DateTimePickerRangeProps} props
 */
const DateTimeRangePicker: ForwardRefExoticComponent<DateTimeRangePickerProps> = forwardRef(
  (props, ref) => {
    const {
      sx = {},
      variant = 'default',
      onBlur,
      startDateMin,
      startDateMax = props.endDate || null,
      endDateMin = props.startDate || null,
      endDateMax,
      error = false,
      helperText,
      timeIntervals,
      placeholder,
      startDateDisabled,
      endDateDisabled,
      endDate,
      startDate,
      withPortal,
      onChangeEndDate,
      onChangeStartDate,
      startDateName,
      endDateName,
    } = props

    const inputVariant: InputVariant = 'standard'

    const handleChangeStartDate = (startDateValue: Date) => {
      // startDate 超過 endDate 時
      // startDate  要變成 null
      if (dayjs(startDateValue).isAfter(endDate)) {
        onChangeStartDate(null)
      } else {
        onChangeStartDate(startDateValue)
      }
    }
    const handleChangeEndDate = (endDateValue: Date) => {
      // endDate 小於 startDate 時
      // endDate  要變成 null
      if (dayjs(endDateValue).isBefore(startDate)) {
        onChangeEndDate(null)
      } else {
        onChangeEndDate(endDateValue)
      }
    }

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
            onChange={date => {
              handleChangeStartDate(date as Date)
            }}
            timeIntervals={timeIntervals}
            placeholder={!startDate && !endDate ? placeholder : ''}
            onBlur={onBlur}
            disabled={startDateDisabled}
            inputVariant={inputVariant}
            error={error}
            withPortal={withPortal}
            name={startDateName}
          />

          <Box
            sx={{
              fontSize: '1.25rem',
              display: startDate || endDate ? 'flex' : 'none',
              position: 'absolute',
              top: '5px',
              right: '50%',
              transform: 'translateX(-50%)',
              color: theme =>
                startDateDisabled && endDateDisabled
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
            onChange={date => {
              handleChangeEndDate(date as Date)
            }}
            timeIntervals={timeIntervals}
            onBlur={onBlur}
            disabled={endDateDisabled}
            inputVariant={inputVariant}
            error={error}
            withPortal={withPortal}
            name={endDateName}
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
              color: theme => theme.palette.error.main,
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
    )
  }
)
export default DateTimeRangePicker
