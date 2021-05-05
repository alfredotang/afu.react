import type { FC, ChangeEvent } from 'react';
import { useState } from 'react';
import { Select } from '@src/components';
import Box from '@material-ui/core/Box';

const source: IKeyValuePair<string, string>[] = [
  { key: 'a', value: 'A' },
  { key: 'b', value: 'B' },
];

const Lab: FC = () => {
  const [selectValue, setSelectValue] = useState<string>('');

  const handleChangeSelected = (event: ChangeEvent<{ value: unknown }>) => {
    setSelectValue(event.target.value as string);
  };

  return (
    <Box display="flex" gap="20px" flexDirection="column">
      <Select
        source={source}
        placeholder="請選擇"
        value={selectValue}
        onChange={handleChangeSelected}
      />
    </Box>
  );
};

export default Lab;
