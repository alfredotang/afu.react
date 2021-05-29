import type { FC } from 'react';
import type { IFormBase } from '@src/features/form-practice';

import { useFormContext, Controller } from 'react-hook-form';
import Grid from '@material-ui/core/Grid';
import { DateTimeRangePickerForForm } from '@src/components';

const DateTimeRangeDemo: FC = () => {
  return (
    <Grid container mb="20px" alignItems="center">
      <Grid item xs={2}>
        dateRange
      </Grid>
      <Grid item xs={10}>
        <DateTimeRangePickerForForm
          startDateName="startDate"
          endDateName="endDate"
          placeholder="選"
        />
      </Grid>
    </Grid>
  );
};

export default DateTimeRangeDemo;
