import type { FC } from 'react';
import type { IFormBase } from '@src/features/form-practice';

import { useFormContext, Controller } from 'react-hook-form';
import Grid from '@material-ui/core/Grid';
import { Select } from '@src/components';

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
  const { control, watch } = useFormContext<IFormBase>();
  return (
    <Grid container mb="20px" alignItems="center">
      <Grid item xs={1}>
        i
      </Grid>
      <Grid item xs={11}>
        <Controller
          control={control}
          name="i"
          render={({ field, fieldState: { error } }) => {
            return (
              <Select
                placeholder="請選擇Hello"
                error={Boolean(error)}
                source={selectSource}
                helperText={Boolean(error) ? error.message : ''}
                {...field}
              />
            );
          }}
        />
      </Grid>
    </Grid>
  );
};

export default SelectDemo;
