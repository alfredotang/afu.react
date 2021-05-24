import type { FC } from 'react';
import type { IFormBase } from '@src/features/form-practice';

import { useFormContext, Controller } from 'react-hook-form';
import Grid from '@material-ui/core/Grid';
import { DateTimePicker } from '@src/components';

const DateTimeDemo: FC = () => {
  const { control, watch } = useFormContext<IFormBase>();
  return (
    <Grid container mb="20px" alignItems="center">
      <Grid item xs={2}>
        StartDate
      </Grid>
      <Grid item xs={10}>
        <Controller
          control={control}
          name="startDate"
          render={({ field, fieldState: { error } }) => {
            return (
              <DateTimePicker
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

export default DateTimeDemo;
