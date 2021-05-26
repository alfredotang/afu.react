import type { FC } from 'react';
import type { IFormBase } from '@src/features/form-practice';

import { useFormContext, Controller } from 'react-hook-form';
import Grid from '@material-ui/core/Grid';
import { DateTimeRangePicker } from '@src/components';

const DateTimeRangeDemo: FC = () => {
  const { control, watch } = useFormContext<IFormBase>();
  return (
    <Grid container mb="20px" alignItems="center">
      <Grid item xs={2}>
        dateRange
      </Grid>
      <Grid item xs={10}>
        <Controller
          control={control}
          name="dateRange"
          render={({ field, fieldState: { error } }) => {
            console.log({ field });
            return (
              <DateTimeRangePicker
                error={Boolean(error)}
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

export default DateTimeRangeDemo;
