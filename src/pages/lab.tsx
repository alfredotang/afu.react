import type { FC, ChangeEvent } from 'react';
import { useState } from 'react';
import { dayjs } from '@src/providers';
import {
  Select,
  DateTimePicker,
  DateTimeRangePicker,
  ChipInput,
} from '@src/components';
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
  const [value, setValue] = useState<string[]>([]);

  const handleAdd = (chip: string[]) => {
    setValue((pre) => {
      const newState = pre.concat(chip);
      return newState;
    });
  };

  const handleDelete = (item: string, idx: number) => {
    setValue((pre) => {
      const newState = pre.filter((val, index) => index !== idx);
      return newState;
    });
  };

  return (
    <>
      <Box display="flex" gap="20px" flexDirection="column">
        <ChipInput value={value} onAdd={handleAdd} onDelete={handleDelete} />
      </Box>
      <pre>
        <code>{JSON.stringify(value)}</code>
      </pre>
      <Select
        source={source}
        placeholder="請選擇"
        value={selectValue}
        onChange={(event) => setSelectValue(event.target.value as string[])}
        multiple
      />
      <pre>
        <code>{JSON.stringify(selectValue)}</code>
        <br />
        <code>{JSON.stringify(typeof selectValue)}</code>
      </pre>
    </>
  );
};

export default Lab;
