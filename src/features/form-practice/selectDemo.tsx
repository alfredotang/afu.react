import type { FC } from 'react';

import Grid from '@material-ui/core/Grid';
import { SelectForForm } from '@src/components';

const selectSource: IKeyValuePair<string, string>[] = [
  {
    key: 'a',
    value: 'alfred',
  },
  {
    key: 't',
    value: 'tang',
  },
  {
    key: 'hi',
    value: 'hello',
  },
];

const SelectDemo: FC = () => {
  return (
    <>
      <Grid container mb="20px" alignItems="center">
        <Grid item xs={2}>
          i
        </Grid>
        <Grid item xs={10}>
          <SelectForForm
            name="i"
            placeholder="請選擇Hello"
            source={selectSource}
          />
        </Grid>
      </Grid>
      <Grid container mb="20px" alignItems="center">
        <Grid item xs={2}>
          multiple select
        </Grid>
        <Grid item xs={10}>
          <SelectForForm
            name="multipleSelect"
            placeholder="請選擇multipleSelect"
            source={selectSource}
            multiple
          />
        </Grid>
      </Grid>
    </>
  );
};

export default SelectDemo;
