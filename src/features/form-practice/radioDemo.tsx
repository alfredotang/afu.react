import type { FC } from 'react';
import { useEffect } from 'react';
import {
  Box,
  Grid,
  Button,
  Typography,
  Radio,
  FormControl,
  RadioGroup,
  FormControlLabel,
} from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';
import type { IFormBase } from '@src/features/form-practice';
import { Input } from '@src/components';

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
        <Grid item xs={1}>
          D
        </Grid>
        <Grid item xs={11}>
          <Controller
            control={control}
            name="d"
            render={({ field, fieldState: { error } }) => (
              <RadioGroup row {...field}>
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="顯示"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="隱藏"
                />
              </RadioGroup>
            )}
          />
        </Grid>
      </Grid>
      {d === 'true' && (
        <Grid container mb="20px" alignItems="center">
          <Grid item xs={1}>
            E
          </Grid>
          <Grid item xs={11}>
            <Controller
              control={control}
              name="e"
              render={({ field, fieldState: { error } }) => {
                return (
                  <Input
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
