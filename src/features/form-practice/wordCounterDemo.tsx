import {
  Box,
  Grid,
  Button,
  Typography,
  Radio,
  FormControl,
  RadioGroup,
  FormControlLabel,
} from '@mui/material'
import { useFormContext, Controller } from 'react-hook-form'
import type { FormFieldType } from '@src/features/form-practice'
import { TextFieldForForm } from '@src/components'

/**
 * @name InputWithCounter
 * @description demo input with counter & maxLength
 */
const WordCounterDemo = () => {
  const { control } = useFormContext<FormFieldType>()

  return (
    <>
      <Grid container mb="20px">
        <Grid item xs={2}>
          G
        </Grid>
        <Grid item xs={10}>
          <TextFieldForForm name="g" placeholder="填G 的啦" maxLength={10} enabledWordCounter />
        </Grid>
      </Grid>
      <Grid container mb="20px">
        <Grid item xs={2}>
          H
        </Grid>
        <Grid item xs={10}>
          <TextFieldForForm
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
  )
}

export default WordCounterDemo
