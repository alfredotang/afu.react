import { useState } from 'react'
import { useForm, Controller, FormProvider } from 'react-hook-form'
import * as yup from 'yup'
import { Box, Grid, Button, Typography } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { yupResolver } from '@hookform/resolvers/yup'
import { TextFieldForForm, TextField } from '@src/components'
import dayjs from '@src/providers/day'
import { useScrollToError } from '@src/hooks'

import RadioDemo from './radioDemo'
import WordCounterDemo from './wordCounterDemo'
import SelectDemo from './selectDemo'
import DateTimeDemo from './dateTimeDemo'
import DateTimeRangeDemo from './dateTimeRangeDemo'
import CheckboxDemo from './checkBoxDemo'

import Result, { IResultData } from './result'

/**
 * GET or POST (for or to Server) data entity
 */
export interface FormFieldType {
  a: string
  b: number
  c: string
  d: boolean
  e: string
  f: string
  g: string
  h: string
  i: string
  startDate: Date
  endDate: Date
  date: Date
  multipleSelect: string[]
  show: boolean
}

/**
 * dynamic schema setting
 */
const schema = yup.object({
  a: yup.string().required('必填'),
  b: yup
    .number()
    .required('必填')
    .typeError('請輸入數字')
    .when('d', {
      is: true,
      then: schema => schema.min(50, '至少50').max(100, '最多100'),
      otherwise: schema => schema.min(3, '至少3').max(9, '最多9'),
    }),
  c: yup.string().required('必填'),
  d: yup.boolean().required('必填').typeError('請選擇'),
  e: yup.string().when('d', {
    is: true,
    then: schema => schema.required('必填'),
    otherwise: schema => schema,
  }),
  f: yup.string().url('請輸入有效網址').required('必填'),
  g: yup.string().required('必填').max(10, '最多 10'),
  h: yup.string().required('必填').max(150, '最多150'),
  i: yup.string().required('必選'),
  date: yup
    .date()
    .required('必填')
    .min(dayjs().add(-1, 'day'), `至少要 ${dayjs().format('YYYY/MM/DD')}`)
    .max(dayjs().add(7, 'days'), `不得超過 ${dayjs().add(7, 'days').format('YYYY/MM/DD')}`)
    .typeError('請輸入開始時間'),

  startDate: yup
    .date()
    .required('必填')
    .min(dayjs().startOf('days'), `至少要 ${dayjs().format('YYYY/MM/DD')}`)
    .max(yup.ref('endDate'), `不得超過結束時間`)
    .typeError('請輸入開始時間')
    .test('date-diff', '開始時間和結束時間相差不得大於 3 天', (value, context) => {
      const { endDate } = context.parent
      const isInvalid = dayjs(endDate).diff(value, 'days') > 3
      return !isInvalid
    }),
  endDate: yup
    .date()
    .required('必填')
    .min(yup.ref('startDate'), `不得小於結束時間`)
    .max(dayjs().add(7, 'days'), `不得超過 ${dayjs().add(7, 'days').format('YYYY/MM/DD')}`)
    .typeError('請輸入開始時間')
    .test('date-diff', '開始時間和結束時間相差不得大於 3 天', (value, context) => {
      const { startDate } = context.parent
      const isInvalid = dayjs(value).diff(startDate, 'days') > 3
      return !isInvalid
    }),
  multipleSelect: yup.array().of(yup.string()).min(1, '請選擇'),
  show: yup.boolean().required('必填').equals([true], '必須要勾喔').typeError('請選擇'),
})

/**
 * @description pages form-practice 的內容
 * @returns react function component
 */
const FormPractice = () => {
  const [formData, setFormData] = useState<{
    isSuccess: boolean
    data: IResultData[]
  }>({ isSuccess: false, data: [] })

  /**
   * @description form config setting
   */
  const methods = useForm<FormFieldType>({
    defaultValues: {
      a: '',
      b: undefined,
      c: '',
      d: false,
      e: '',
      f: '',
      g: '',
      h: '',
      i: '',
      startDate: undefined,
      endDate: undefined,
      date: undefined,
      multipleSelect: [],
      show: false,
    },
    resolver: yupResolver(schema),
    shouldFocusError: true,
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods

  useScrollToError(errors)

  /**
   * @description 送出表單前 Mapping Data
   * @param {FormFieldType} data
   */
  const mappingSubmitData = (data: FormFieldType) => {
    // d 為 false 時，
    // 要清空 e
    if (!data.d) {
      data.e = ''
    }
  }

  /**
   * @param {FormFieldType} data
   */
  const onSubmit = (data: FormFieldType) => {
    mappingSubmitData(data)
    const visibleTable: IResultData[] = []
    for (const val in data) {
      const value = (data as any)[val]
      visibleTable.push({
        name: val,
        value: JSON.stringify(value),
        type: typeof value,
      })
    }
    setFormData({ isSuccess: true, data: visibleTable })
  }

  const handleClose = () => {
    setFormData({ isSuccess: false, data: [] })
  }

  return (
    <>
      <FormProvider {...methods}>
        <Box p="1em">
          <form
            noValidate
            onSubmit={handleSubmit(data => {
              onSubmit(data)
            })}
          >
            <AppBar
              position="fixed"
              color="default"
              sx={{
                zIndex: theme => theme.zIndex.drawer + 1,
                boxShadow: 'none',
              }}
            >
              <Toolbar>
                <Typography
                  variant="h6"
                  sx={{
                    flexGrow: 1,
                    color: theme => theme.palette.secondary.main,
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
                <Grid item xs={2} className="required">
                  A
                </Grid>
                <Grid item xs={10}>
                  <TextFieldForForm name="a" minRows={4} multiline placeholder="填A 的啦" />
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
                      <TextField
                        type="number"
                        placeholder="請填寫B"
                        error={Boolean(error)}
                        helperText={error?.message || ''}
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
                      <TextField
                        multiline
                        minRows={4}
                        placeholder="請填寫C"
                        error={Boolean(error)}
                        helperText={error?.message || ''}
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
                      <TextField
                        placeholder="請輸入網址"
                        error={Boolean(error)}
                        helperText={error?.message || ''}
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
              <CheckboxDemo />
            </Box>
          </form>
        </Box>
      </FormProvider>
      <Result open={formData.isSuccess} data={formData.data} onClose={handleClose} />
    </>
  )
}

export default FormPractice
