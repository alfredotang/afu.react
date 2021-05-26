import type { FC } from 'react';
import { useState, useEffect } from 'react';
import range from 'lodash/range';
import dayJs from '@src/providers/day';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosNewIcon from '@material-ui/icons/ArrowBackIosNew';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextFiled from '@material-ui/core/TextField';

type DatePickerHeaderProps = {
  date: Date;
  changeYear(year: number): void;
  changeMonth(month: number): void;
  customHeaderCount: number;
  decreaseMonth(): void;
  increaseMonth(): void;
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
  decreaseYear(): void;
  increaseYear(): void;
  prevYearButtonDisabled: boolean;
  nextYearButtonDisabled: boolean;
};

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const monthsSources: IKeyValuePair<string, string>[] = [
  { key: 'January', value: 'January' },
  { key: 'February', value: 'February' },
  { key: 'March', value: 'March' },
  { key: 'April', value: 'April' },
  { key: 'May', value: 'May' },
  { key: 'June', value: 'June' },
  { key: 'July', value: 'July' },
  { key: 'August', value: 'August' },
  { key: 'September', value: 'September' },
  { key: 'October', value: 'October' },
  { key: 'November', value: 'November' },
  { key: 'December', value: 'December' },
];

const DatePickerHeader: FC<DatePickerHeaderProps> = ({
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
}) => {
  useEffect(() => {
    addEventListener('click', () => {});
  });

  const years = range(1990, dayJs().get('year') + 100, 1);
  const yearsSource: IKeyValuePair<string, number>[] = years.map((item) => {
    return { key: `${item}`, value: item };
  });
  const [openYears, setOpenYears] = useState(false);
  const [openMonths, setOpenMonths] = useState(false);

  useEffect(() => {
    const handleCloseAllList = (event) => {
      setOpenYears(false);
      setOpenMonths(false);
    };

    addEventListener('click', handleCloseAllList);

    return () => {
      removeEventListener('click', handleCloseAllList);
    };
  }, []);

  return (
    <>
      <Box
        sx={{
          margin: (theme) => theme.spacing(2),
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextFiled
          value={dayJs(date).get('year')}
          onClick={(event) => {
            event.stopPropagation();
            setOpenMonths(false);
            setOpenYears(true);
          }}
          sx={{ marginRight: (theme) => theme.spacing(2), width: '100px' }}
        />

        <TextFiled
          value={months[dayJs(date).get('month')]}
          onClick={(event) => {
            event.stopPropagation();
            setOpenYears(false);
            setOpenMonths(true);
          }}
          sx={{ marginRight: (theme) => theme.spacing(2), width: '150px' }}
        />

        <IconButton
          onClick={decreaseMonth}
          disableRipple={false}
          disableTouchRipple={false}
          disabled={prevMonthButtonDisabled}
        >
          <ArrowBackIosNewIcon sx={{ fontSize: '1.275rem' }} />
        </IconButton>
        <IconButton
          disableRipple={false}
          disableTouchRipple={false}
          onClick={increaseMonth}
          disabled={nextMonthButtonDisabled}
        >
          <ArrowForwardIosIcon sx={{ fontSize: '1.275rem' }} />
        </IconButton>
      </Box>
      {openYears && (
        <List
          sx={{
            maxHeight: '300px',
            overflow: 'auto',
            position: 'absolute',
            backgroundColor: (theme) => theme.palette.background.paper,
            boxShadow: (theme) => theme.shadows[2],
            left: '20px',
            top: '70px',
            zIndex: 2,
          }}
        >
          {yearsSource.map((item) => (
            <ListItem
              button
              key={item.key}
              onClick={() => {
                changeYear(item.value);
                setOpenYears(false);
              }}
              selected={dayJs(date).get('year') === item.value}
              autoFocus={dayJs(date).get('year') === item.value}
            >
              {item.value}
            </ListItem>
          ))}
        </List>
      )}
      {openMonths && (
        <List
          sx={{
            maxHeight: '300px',
            overflow: 'auto',
            position: 'absolute',
            backgroundColor: (theme) => theme.palette.background.paper,
            boxShadow: (theme) => theme.shadows[2],
            left: '133px',
            top: '70px',
            zIndex: 2,
          }}
        >
          {monthsSources.map((item) => (
            <ListItem
              button
              key={item.key}
              onClick={() => {
                changeMonth(months.indexOf(item.value));
                setOpenMonths(false);
              }}
              selected={months[dayJs(date).get('month')] === item.value}
              autoFocus={months[dayJs(date).get('month')] === item.value}
            >
              {item.value}
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};

export default DatePickerHeader;
