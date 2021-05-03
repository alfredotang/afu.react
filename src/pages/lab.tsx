import type { FC } from 'react';
import { useState } from 'react';
import { ChipInput } from '@src/components';
import { v4 as uuid } from 'uuid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import dayjs from 'dayjs';

const Lab: FC = () => {
  const [counter, setCount] = useState<string[]>([]);
  const handleAdd = () => {
    setCount((pre) => {
      return [...pre, dayjs().format('YYYY/MM/DD HH:mm:ss')];
    });
  };

  const handleOnAdd = (chip: string) => {
    console.log('add');
    setCount((pre) => {
      pre.push(chip);
      return [...pre];
    });
  };

  const handleOnDelete = (chip: string) => {
    setCount((pre) => {
      const newState = pre.filter((item) => item !== chip);
      return newState;
    });
  };

  return (
    <div>
      <div>{counter.length}</div>
      <Box display="flex" gap="10px" mb="10px">
        <Button variant="contained" onClick={handleAdd}>
          +
        </Button>
      </Box>
      <ChipInput
        placeholder={`請輸入項目，如S,M,L，鍵入"enter"隔開`}
        value={counter}
        onAdd={handleOnAdd}
        onDelete={handleOnDelete}
      />
      <Box display="flex" flexWrap="wrap" sx={{ wordBreak: 'break-word' }}>
        <pre>
          <code>{JSON.stringify(counter)}</code>
        </pre>
      </Box>
    </div>
  );
};

export default Lab;
