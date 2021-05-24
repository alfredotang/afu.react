import type { FC, ChangeEvent } from 'react';
import { useState } from 'react';
import { dayjs } from '@src/providers';
import { Select, DateTimePicker } from '@src/components';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

const source: IKeyValuePair<string, string>[] = [
  { key: 'a', value: 'A' },
  { key: 'b', value: 'B' },
];

const Lab: FC = () => {
  const [selectValue, setSelectValue] = useState<string>('');
  const [dateTimeDefault, setDateTimeDefault] = useState<Date>(null);
  const [date, setDate] = useState<Date>(null);
  const [time, setTime] = useState<Date>(null);

  const handleChangeSelected = (event: ChangeEvent<{ value: unknown }>) => {
    setSelectValue(event.target.value as string);
  };

  const handleChangeDateTimeDefault = (date: Date) => {
    console.log({ date });
    setDateTimeDefault(date);
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
        value={dateTimeDefault}
        placeholder="請選擇"
        onChange={handleChangeDateTimeDefault}
        min={new Date()}
      />
      <pre>
        <code>{JSON.stringify(dateTimeDefault)}</code>
        <br />
        <code>{JSON.stringify(typeof dateTimeDefault)}</code>
      </pre>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <DateTimePicker
          variant="date"
          placeholder="請選擇"
          value={date}
          onChange={handleChangeDate}
          min={new Date()}
        />
        <Divider orientation="vertical" />
        <DateTimePicker
          variant="date"
          placeholder="請選擇"
          value={date}
          onChange={handleChangeDate}
          min={new Date()}
        />
      </div>
      <pre>
        <code>{JSON.stringify(date)}</code>
        <br />
        <code>{JSON.stringify(typeof date)}</code>
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
