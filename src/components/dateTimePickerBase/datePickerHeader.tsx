import type { FC, MouseEvent } from 'react'
import { useState, useEffect } from 'react'
import range from 'lodash/range'
import find from 'lodash/find'
import dayJs from '@src/providers/day'
import IconButton from '@mui/material/IconButton'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import TextFiled from '@mui/material/TextField'

type DatePickerHeaderProps = {
  date: Date
  changeYear(year: number): void
  changeMonth(month: number): void
  customHeaderCount: number
  decreaseMonth(): void
  increaseMonth(): void
  prevMonthButtonDisabled: boolean
  nextMonthButtonDisabled: boolean
  decreaseYear(): void
  increaseYear(): void
  prevYearButtonDisabled: boolean
  nextYearButtonDisabled: boolean
}

// 1990 years ~ (today + 100 ) years
// ex. today is 2021/5/31
// range: 1990 ~ 2120
const yearsList = range(1990, dayJs().get('year') + 100, 1)

// mapping [1990, 1991, ....., 2xxx]
// To key value pairs object
const yearsSource: IKeyValuePair<string, number>[] = yearsList.map(item => {
  return { key: `${item}`, value: item }
})

const monthsSources: IKeyValuePair<number, string>[] = [
  { key: 0, value: 'January' },
  { key: 1, value: 'February' },
  { key: 2, value: 'March' },
  { key: 3, value: 'April' },
  { key: 4, value: 'May' },
  { key: 5, value: 'June' },
  { key: 6, value: 'July' },
  { key: 7, value: 'August' },
  { key: 8, value: 'September' },
  { key: 9, value: 'October' },
  { key: 10, value: 'November' },
  { key: 11, value: 'December' },
]

/**
 * @name DatePickerHeader
 * @description custom dateTimePicker header
 * @param {DatePickerHeaderProps} props
 */
const DatePickerHeader = ({
  date,
  changeYear,
  changeMonth,
  customHeaderCount,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
  decreaseYear,
  increaseYear,
  prevYearButtonDisabled,
  nextYearButtonDisabled,
}: DatePickerHeaderProps) => {
  const currentYearValue = dayJs(date).get('year')
  const currentMonthKey = dayJs(date).get('month')
  const currentMonthValue = find(monthsSources, ['key', currentMonthKey])?.value || ''

  const [openYears, setOpenYears] = useState(false)
  const [openMonths, setOpenMonths] = useState(false)

  const handleCloseAllList = (event: globalThis.MouseEvent) => {
    setOpenYears(false)
    setOpenMonths(false)
  }

  /**
   * @name handleClickYears
   * @param event DOM event
   * @description 點擊 years
   */
  const handleClickYears = (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    event.stopPropagation()
    setOpenMonths(false)
    setOpenYears(true)
  }

  /**
   * @name handleClickMonths
   * @param event DOM event
   * @description 點擊 months
   */
  const handleClickMonths = (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    event.stopPropagation()
    setOpenYears(false)
    setOpenMonths(true)
  }

  useEffect(() => {
    // close years & months list
    // when click calendar other place
    addEventListener('click', handleCloseAllList)

    return () => {
      removeEventListener('click', handleCloseAllList)
    }
  }, [])

  return (
    <>
      <Box
        sx={{
          margin: theme => theme.spacing(2),
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* years input */}
        <TextFiled
          value={currentYearValue}
          onClick={handleClickYears}
          sx={{ marginRight: theme => theme.spacing(2), width: '100px' }}
        />

        {/* months input */}
        <TextFiled
          value={currentMonthValue}
          onClick={handleClickMonths}
          sx={{ marginRight: theme => theme.spacing(2), width: '150px' }}
        />

        {/* go previous month icon button */}
        <IconButton
          onClick={decreaseMonth}
          disableRipple={false}
          disableTouchRipple={false}
          disabled={prevMonthButtonDisabled}
        >
          <ArrowBackIosNewIcon sx={{ fontSize: '1.275rem' }} />
        </IconButton>

        {/* go next month icon button */}
        <IconButton
          disableRipple={false}
          disableTouchRipple={false}
          onClick={increaseMonth}
          disabled={nextMonthButtonDisabled}
        >
          <ArrowForwardIosIcon sx={{ fontSize: '1.275rem' }} />
        </IconButton>
      </Box>

      {/* years list items */}
      {openYears && (
        <List
          sx={{
            maxHeight: '300px',
            overflow: 'auto',
            position: 'absolute',
            backgroundColor: theme => theme.palette.background.paper,
            boxShadow: theme => theme.shadows[2],
            left: '20px',
            top: '70px',
            zIndex: 2,
          }}
        >
          {yearsSource.map(item => (
            <ListItem
              button
              key={item.key}
              onClick={() => {
                changeYear(item.value)
                setOpenYears(false)
              }}
              selected={currentYearValue === item.value}
              autoFocus={currentYearValue === item.value}
            >
              {item.value}
            </ListItem>
          ))}
        </List>
      )}

      {/* months list items */}
      {openMonths && (
        <List
          sx={{
            maxHeight: '300px',
            overflow: 'auto',
            position: 'absolute',
            backgroundColor: theme => theme.palette.background.paper,
            boxShadow: theme => theme.shadows[2],
            left: '133px',
            top: '70px',
            zIndex: 2,
          }}
        >
          {monthsSources.map(item => (
            <ListItem
              key={item.key}
              onClick={() => {
                changeMonth(item.key)
                setOpenMonths(false)
              }}
              selected={currentMonthKey === item.key}
              autoFocus={currentMonthKey === item.key}
            >
              {item.value}
            </ListItem>
          ))}
        </List>
      )}
    </>
  )
}

export default DatePickerHeader
