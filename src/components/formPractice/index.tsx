import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { Box, Grid, TextField, Button, Typography } from '@material-ui/core';
import { useScrollToError } from '@src/hooks';
import RadioForm from './radioForm';
import Result, { IResultData } from './result';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

/**
 * @description
 * TIP: 這裡型別定義什麼，defaultValues & element 上 都必須照個型別
 * 且 defaultValues 不要用 undefined or null
 * ex. type a = number -> const defaultValue = { a: 0 };
 * ex. <input name="a" type="number" />
 */
export interface IFormBase {
  native: string;
  a: string;
  b: string;
  c: string;
  d: string;
  e: string;
}

const schema = yup.object().shape({
  native: yup.string().required(),
  b: yup.number().required(),
  a: yup.string().required(),
  c: yup.string().required(),
  d: yup.boolean().required(),
  e: yup.string().required(),
});

type IFormResult = typeof schema;

const defaultValues: IFormBase = {
  native: '',
  a: '',
  b: '',
  c: '',
  d: 'true',
  e: '',
};

/**
 * @description pages form-practice 的內容
 * @returns react function component
 */
const FormPractice: FC = () => {
  const [formData, setFormData] = useState<{
    isSuccess: boolean;
    data: IResultData[];
  }>({ isSuccess: false, data: [] });

  /**
   * @description form config setting
   */
  const formMethod = useForm<IFormBase>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = formMethod;

  /**
   *
   * @param data
   */
  const onSubmit = (data: IFormResult) => {
    const visibleTable: IResultData[] = [];
    for (const val in data) {
      visibleTable.push({
        name: val,
        value: data[val],
        type: typeof data[val],
      });
    }
    setFormData({ isSuccess: true, data: visibleTable });
  };

  const handleClose = () => {
    setFormData({ isSuccess: false, data: [] });
  };

  useScrollToError<IFormBase>({ errors });

  useEffect(() => {
    console.log({ errors });
  }, [errors]);

  return (
    <>
      <FormProvider {...formMethod}>
        <Box p="1em">
          <Typography variant="h6" mb="10px">
            Form practice
          </Typography>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Box
              p="1em"
              mb="10px"
              sx={{
                height: '300px',
                overflowY: 'auto',
                backgroundColor: '#fff',
              }}
            >
              <Grid container mb="20px">
                <Grid item xs={1}>
                  poc
                </Grid>
                <Grid item xs={11}>
                  <input
                    type="text"
                    style={{
                      borderColor: errors.native ? 'red' : 'rgba(0,0,0,0.1)',
                      borderRadius: '10%',
                    }}
                    {...register('native', { required: true })}
                  />
                </Grid>
              </Grid>
              <Grid container mb="20px">
                <Grid item xs={1}>
                  A
                </Grid>
                <Grid item xs={11}>
                  <Controller
                    control={control}
                    name="a"
                    rules={{ required: true }}
                    render={({ field, fieldState: { error } }) => {
                      return (
                        <TextField
                          placeholder="填A 的啦"
                          error={Boolean(error)}
                          helperText={Boolean(error) ? '必填' : ''}
                          {...field}
                        />
                      );
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container mb="20px">
                <Grid item xs={1}>
                  B
                </Grid>
                <Grid item xs={11}>
                  <Controller
                    control={control}
                    name="b"
                    rules={{ required: true }}
                    render={({ field, fieldState: { error } }) => {
                      console.log({ b_error: error });
                      return (
                        <TextField
                          type="number"
                          placeholder="請填寫B"
                          error={Boolean(error)}
                          helperText={error ? '必填' : ''}
                          {...field}
                        />
                      );
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container mb="20px" alignItems="center">
                <Grid item xs={1}>
                  C
                </Grid>
                <Grid item xs={11}>
                  <Controller
                    control={control}
                    name="c"
                    rules={{ required: true }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        multiline
                        minRows={4}
                        placeholder="請填寫C"
                        error={Boolean(error)}
                        helperText={error ? '必填' : ''}
                        {...field}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <RadioForm />
            </Box>
            <Button type="submit">SUBMIT</Button>
          </form>
        </Box>
      </FormProvider>
      <Result
        open={formData.isSuccess}
        data={formData.data}
        onClose={handleClose}
      />
    </>
  );
};

export default FormPractice;
