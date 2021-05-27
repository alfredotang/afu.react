import type { FC, ChangeEvent } from 'react';
import { useState } from 'react';
import { dayjs } from '@src/providers';
import { Select, DateTimePicker, DateTimeRangePicker } from '@src/components';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

const source: IKeyValuePair<string, string>[] = [
  { key: '321134', value: 'A' },
  { key: 'b24343214', value: 'B' },
  { key: 'csadsac', value: 'C' },
  { key: 'das1232', value: 'D' },
];

const Lab: FC = () => {
  const [selectValue, setSelectValue] = useState<string[]>([]);
  const [dateTimeDefault, setDateTimeDefault] = useState<[Date, Date]>([
    null,
    null,
  ]);
  const [date, setDate] = useState<Date>(null);
  const [time, setTime] = useState<Date>(null);

  const [startDate, setStartDate] = useState<Date>(null);
  const [endDate, setEndDate] = useState<Date>(null);

  const handleChangeSelected = (event: ChangeEvent<{ value: unknown }>) => {
    setSelectValue(event.target.value as string[]);
  };

  const handleChangeDateTimeDefault = ([startDate, endDate]: [Date, Date]) => {
    setDateTimeDefault([startDate, endDate]);
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
        multiple
      />
      <pre>
        <code>{JSON.stringify(selectValue)}</code>
        <br />
        <code>{JSON.stringify(typeof selectValue)}</code>
      </pre>
      <DateTimePicker
        value={date}
        variant="date"
        placeholder="請選擇"
        onChange={handleChangeDate}
        min={new Date()}
      />
      <DateTimeRangePicker
        placeholder="請選擇"
        variant="default"
        startDate={startDate}
        endDate={endDate}
        onChangeStartDate={(date) => {
          setStartDate(date);
        }}
        onChangeEndDate={(date) => {
          setEndDate(date);
        }}
      />
      <pre>
        <code>{JSON.stringify(startDate)}</code>
        <code>{JSON.stringify(endDate)}</code>
        <br />
        <code>{JSON.stringify(typeof startDate)}</code>
        <code>{JSON.stringify(typeof endDate)}</code>
      </pre>
    </Box>
  );
};

export default Lab;
