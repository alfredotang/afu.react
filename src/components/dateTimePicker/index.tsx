import type { ForwardRefExoticComponent } from 'react';
import { forwardRef } from 'react';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import dayjs from 'dayjs';

const DateTimePicker: ForwardRefExoticComponent<any> = forwardRef(
  (props, ref) => {
    return (
      <Grid container>
        <Grid item xs={8} paddingRight="10px">
          <TextField type="date" />
        </Grid>
        <Grid item xs={4}>
          <TextField type="time" />
        </Grid>
      </Grid>
    );
  }
);
export default DateTimePicker;
