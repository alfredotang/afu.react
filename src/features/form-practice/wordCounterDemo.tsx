import type { FC } from 'react';
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
import { WordCounter, Input, InputForForm } from '@src/components';

/**
 * @name InputWithCounter
 * @description demo input with counter & maxLength
 */
const WordCounterDemo: FC = () => {
  const { control } = useFormContext<IFormBase>();

  return (
    <>
      <Grid container mb="20px">
        <Grid item xs={2}>
          G
        </Grid>
        <Grid item xs={10}>
          <InputForForm
            name="g"
            placeholder="填G 的啦"
            maxLength={10}
            enabledWordCounter
          />
        </Grid>
      </Grid>
      <Grid container mb="20px">
        <Grid item xs={2}>
          H
        </Grid>
        <Grid item xs={10}>
          <InputForForm
            name="h"
            placeholder="填h 的啦"
            multiline
            minRows={4}
            maxLength={10}
            enabledWordCounter
          />
        </Grid>
      </Grid>
    </>
  );
};

export default WordCounterDemo;
