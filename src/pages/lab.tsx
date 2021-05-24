import type { FC, ChangeEvent } from 'react';
import { useState } from 'react';
import { dayjs } from '@src/providers';
import { Select, DateTimePicker, DateTimeRangePicker } from '@src/components';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

const source: IKeyValuePair<string, string>[] = [
  { key: 'a', value: 'A' },
  { key: 'b', value: 'B' },
];

const Lab: FC = () => {
  const [selectValue, setSelectValue] = useState<string>('');
  const [dateTimeDefault, setDateTimeDefault] = useState<{
    startDate: Date;
    endDate: Date;
  }>({ startDate: null, endDate: null });
  const [date, setDate] = useState<Date>(null);
  const [time, setTime] = useState<Date>(null);

  const handleChangeSelected = (event: ChangeEvent<{ value: unknown }>) => {
    setSelectValue(event.target.value as string);
  };

  const handleChangeDateTimeDefault = (startDate: Date, endDate: Date) => {
    setDateTimeDefault({ startDate, endDate });
  };
  const handleChangeDate = (date: Date) => {
    setDate(date);
  };
  const handleChangeTime = (date: Date) => {
    setTime(date);
  };

  return (
    <Box display="flex" gap="20px" flexDirection="column">
      <Select
        source={source}
        placeholder="請選擇"
        value={selectValue}
        onChange={handleChangeSelected}
      />
      <DateTimePicker
        value={date}
        variant="default"
        placeholder="請選擇"
        onChange={handleChangeDate}
        min={new Date()}
      />
      <DateTimeRangePicker
        startDate={dateTimeDefault.startDate}
        endDate={dateTimeDefault.endDate}
        variant="default"
        placeholder="請選擇"
        onChange={handleChangeDateTimeDefault}
        startDateMax={dateTimeDefault.endDate}
        endDateMin={dateTimeDefault.startDate}
      />
      <pre>
        <code>{JSON.stringify(dateTimeDefault.startDate)}</code>
        <code>{JSON.stringify(dateTimeDefault.endDate)}</code>
        <br />
        <code>{JSON.stringify(typeof dateTimeDefault.startDate)}</code>
        <code>{JSON.stringify(typeof dateTimeDefault.endDate)}</code>
      </pre>
      <DateTimePicker
        placeholder="請選擇"
        variant="time"
        value={time}
        onChange={handleChangeTime}
        min={new Date()}
      />
      <pre>
        <code>{JSON.stringify(time)}</code>
        <br />
        <code>{JSON.stringify(typeof time)}</code>
      </pre>
    </Box>
  );
};

export default Lab;
