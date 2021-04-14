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
  a: string;
  b: string;
  c: string;
  d: string;
  e: string;
  f: string;
}
const httpRex = new RegExp(
  '(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})'
);

const schema = yup.object().shape({
  a: yup.string().required('必填'),
  b: yup
    .number()
    .required('必填')
    .typeError('請輸入數字')
    .min(3, '至少3')
    .max(9, '最多9'),
  c: yup.string().required('必填'),
  d: yup.boolean().required('必填'),
  e: yup.string(),
  f: yup.string().matches(httpRex, '請輸入有效網址').required('必填'),
});

type IFormResult = typeof schema;

const defaultValues: IFormBase = {
  a: '',
  b: '',
  c: '',
  d: 'true',
  e: '',
  f: '',
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
                  A
                </Grid>
                <Grid item xs={11}>
                  <Controller
                    control={control}
                    name="a"
                    render={({ field, fieldState: { error } }) => {
                      return (
                        <TextField
                          placeholder="填A 的啦"
                          error={Boolean(error)}
                          helperText={Boolean(error) ? error.message : ''}
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
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        type="number"
                        placeholder="請填寫B"
                        error={Boolean(error)}
                        helperText={Boolean(error) ? error.message : ''}
                        {...field}
                      />
                    )}
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
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        multiline
                        minRows={4}
                        placeholder="請填寫C"
                        error={Boolean(error)}
                        helperText={Boolean(error) ? error.message : ''}
                        {...field}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <RadioForm />
              <Grid container mb="20px">
                <Grid item xs={1}>
                  F
                </Grid>
                <Grid item xs={11}>
                  <Controller
                    control={control}
                    name="f"
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        placeholder="請輸入網址"
                        error={Boolean(error)}
                        helperText={Boolean(error) ? error.message : ''}
                        {...field}
                      />
                    )}
                  />
                </Grid>
              </Grid>
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
