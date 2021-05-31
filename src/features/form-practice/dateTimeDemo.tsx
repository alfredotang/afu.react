import type { FC } from 'react';
import type { IFormBase } from '@src/features/form-practice';
import dayjs from 'dayjs';
import Grid from '@material-ui/core/Grid';
import { DateTimePickerForForm } from '@src/components';

const DateTimeDemo: FC = () => {
  return (
    <Grid container mb="20px" alignItems="center">
      <Grid item xs={2}>
        date
      </Grid>
      <Grid item xs={10}>
        <DateTimePickerForForm name="date" />
      </Grid>
    </Grid>
  );
};

export default DateTimeDemo;
