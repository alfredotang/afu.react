import type { FC } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Radio,
  FormControl,
  RadioGroup,
  FormControlLabel,
} from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';
import type { IFormBase } from '@src/features/form-practice';
import { CounterInput } from '@src/components';

/**
 * @name InputWithCounter
 * @description demo input with counter & maxLength
 */
const InputWithCounter: FC = () => {
  const { control } = useFormContext<IFormBase>();

  return (
    <>
      <Grid container mb="20px">
        <Grid item xs={1}>
          G
        </Grid>
        <Grid item xs={11}>
          <Controller
            control={control}
            name="g"
            render={({ field, fieldState: { error } }) => {
              return (
                <CounterInput
                  name={field.name}
                  maxLength={10}
                  error={Boolean(error)}
                  hasErrorMessageOnBottom
                >
                  <TextField
                    placeholder="填G 的啦"
                    error={Boolean(error)}
                    helperText={Boolean(error) ? error.message : ''}
                    {...field}
                  />
                </CounterInput>
              );
            }}
          />
        </Grid>
      </Grid>
      <Grid container mb="20px">
        <Grid item xs={1}>
          H
        </Grid>
        <Grid item xs={11}>
          <Controller
            control={control}
            name="h"
            render={({ field, fieldState: { error } }) => {
              return (
                <CounterInput
                  name={field.name}
                  maxLength={150}
                  error={Boolean(error)}
                  hasErrorMessageOnBottom
                >
                  <TextField
                    placeholder="填h 的啦"
                    multiline
                    minRows={4}
                    error={Boolean(error)}
                    helperText={Boolean(error) ? error.message : ''}
                    {...field}
                  />
                </CounterInput>
              );
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default InputWithCounter;
