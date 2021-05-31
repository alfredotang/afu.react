import type { FC } from 'react';
import { useEffect } from 'react';
import {
  Box,
  Grid,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

import { useFormContext, Controller } from 'react-hook-form';
import type { IFormBase } from '@src/features/form-practice';
import { TextField, RadioForForm, IRadioSource } from '@src/components';

/**
 * @name RadioForm
 * @description demo radio & useFormContext & dynamic required (field E)
 */
const RadioForm: FC = () => {
  const { control, watch } = useFormContext<IFormBase>();
  const d = watch('d');
  return (
    <>
      <Grid container mb="20px" alignItems="center">
        <Grid item xs={2}>
          D
        </Grid>
        <Grid item xs={10}>
          <RadioForForm
            name="d"
            source={[
              {
                label: `顯示`,
                value: true,
              },
              {
                label: `隱藏`,
                value: false,
              },
            ]}
          />
        </Grid>
      </Grid>
      {d && (
        <Grid container mb="20px" alignItems="center">
          <Grid item xs={2}>
            E
          </Grid>
          <Grid item xs={10}>
            <Controller
              control={control}
              name="e"
              render={({ field, fieldState: { error } }) => {
                return (
                  <TextField
                    placeholder="填E 的啦"
                    error={Boolean(error)}
                    helperText={Boolean(error) ? error.message : ''}
                    {...field}
                  />
                );
              }}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default RadioForm;
