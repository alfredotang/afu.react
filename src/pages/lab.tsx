import type { FC, ChangeEvent } from 'react';
import { useState } from 'react';
import {
  ChipInput,
} from '@src/components';
import Box from '@material-ui/core/Box';

const Lab: FC = () => {
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
    </>
  );
};

export default Lab;
