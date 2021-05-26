import type { FC } from 'react';
import { useState, useEffect, createElement } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { Box, Grid, Button, Typography, Radio } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { yupResolver } from '@hookform/resolvers/yup';
import { useScrollToError } from '@src/hooks';
import { regExpHelper } from '@src/helpers';
import { Input } from '@src/components';
import dayjs from '@src/providers/day';

import RadioDemo from './radioDemo';
import WordCounterDemo from './wordCounterDemo';
import SelectDemo from './selectDemo';
import DateTimeDemo from './dateTimeDemo';
import DateTimeRangeDemo from './dateTimeRangeDemo';

import Result, { IResultData } from './result';

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
  d: StringBooleanOrEmpty;
  e: string;
  f: string;
  g: string;
  h: string;
  i: string;
  startDate: Date;
  dateRange: [Date, Date];
}

/**
 * GET or POST (for or to Server) data entity
 */
export interface IForAPIEntity {
  a: string;
  b: number;
  c: string;
  d: boolean;
  e: string;
  f: string;
  g: string;
  h: string;
  i: string;
  startDate: Date;
  dateRange: [Date, Date];
}

/**
 * dynamic schema setting
 */
const schema = yup.lazy((value: IFormBase) => {
  return yup.object().shape({
    a: yup.string().required('必填'),
    b: yup
      .number()
      .required('必填')
      .typeError('請輸入數字')
      .min(3, '至少3')
      .max(9, '最多9'),
    c: yup.string().required('必填'),
    d: yup.boolean().required('必填'),
    e: value.d === 'true' ? yup.string().required('必填') : yup.string(),
    f: yup
      .string()
      .matches(regExpHelper.httpRegEx, '請輸入有效網址')
      .required('必填'),
    g: yup.string().required('必填').max(10, '最多 10'),
    h: yup.string().required('必填').max(150, '最多150'),
    i: yup.string().required('必選'),
    startDate: yup
      .date()
      .required('必填')
      .min(dayjs().add(-1, 'day'), `至少要 ${dayjs().format('YYYY/MM/DD')}`)
      .max(
        dayjs().add(7, 'days'),
        `不得超過 ${dayjs().add(7, 'days').format('YYYY/MM/DD')}`
      )
      .typeError('請輸入開始時間'),
    dateRange: yup
      .array()
      .of(yup.date())
      .required('必填')
      .typeError('請輸入日期區間'),
  });
});

// startDate: yup
// .date()
// .required('必填')
// .typeError('請輸入開始時間')
// .max(yup.ref('dateRange.endDate'), `開始時間不得大於結束時間`),
// endDate: yup
// .date()
// .required('必填')
// .typeError('請輸入結束時間')
// .min(yup.ref('dateRange.startDate'), `結束時間不得小於開始時間`),

const defaultValues: IFormBase = {
  a: '',
  b: '',
  c: '',
  d: 'true',
  e: '',
  f: '',
  g: '',
  h: '',
  i: '',
  startDate: new Date(),
  dateRange: [new Date(), new Date()],
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
    register,
    control,
    formState: { errors },
  } = formMethod;

  /**
   * @description 送出表單前 Mapping Data
   * @param {IForAPIEntity} data
   */
  const mappingSubmitData = (data: IForAPIEntity) => {
    // d 為 false 時，
    // 要清空 e
    if (!data.d) {
      data.e = '';
    }
  };

  /**
   * @param {IForAPIEntity} data
   */
  const onSubmit = (data: IForAPIEntity) => {
    mappingSubmitData(data);
    const visibleTable: IResultData[] = [];
    for (const val in data) {
      visibleTable.push({
        name: val,
        value: JSON.stringify(data[val]),
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
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <AppBar
              position="fixed"
              color="default"
              sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                boxShadow: 'none',
              }}
            >
              <Toolbar>
                <Typography
                  variant="h6"
                  sx={{
                    flexGrow: 1,
                    color: (theme) => theme.palette.secondary.main,
                  }}
                >
                  Form Practice
                </Typography>
                <Button type="submit" variant="contained">
                  SUBMIT
                </Button>
              </Toolbar>
            </AppBar>

            <Box
              p="1em"
              mb="10px"
              sx={{
                backgroundColor: '#fff',
              }}
            >
              <Grid container mb="20px">
                <Grid item xs={2}>
                  A
                </Grid>
                <Grid item xs={10}>
                  <Controller
                    control={control}
                    name="a"
                    render={({ field, fieldState: { error } }) => {
                      return (
                        <Input
                          minRows={4}
                          multiline
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
                <Grid item xs={2}>
                  B
                </Grid>
                <Grid item xs={10}>
                  <Controller
                    control={control}
                    name="b"
                    render={({ field, fieldState: { error } }) => (
                      <Input
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
                <Grid item xs={2}>
                  C
                </Grid>
                <Grid item xs={10}>
                  <Controller
                    control={control}
                    name="c"
                    render={({ field, fieldState: { error } }) => (
                      <Input
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
              <RadioDemo />
              <Grid container mb="20px">
                <Grid item xs={2}>
                  F
                </Grid>
                <Grid item xs={10}>
                  <Controller
                    control={control}
                    name="f"
                    render={({ field, fieldState: { error } }) => (
                      <Input
                        placeholder="請輸入網址"
                        error={Boolean(error)}
                        helperText={Boolean(error) ? error.message : ''}
                        {...field}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <WordCounterDemo />
              <SelectDemo />
              <DateTimeDemo />
              <DateTimeRangeDemo />
            </Box>
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
