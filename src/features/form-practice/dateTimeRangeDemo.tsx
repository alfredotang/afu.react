import Grid from '@mui/material/Grid'
import { DateTimeRangePickerForForm } from '@src/components'

const DateTimeRangeDemo = () => {
  return (
    <Grid container mb="20px" alignItems="center">
      <Grid item xs={2}>
        dateRange
      </Grid>
      <Grid item xs={10}>
        <DateTimeRangePickerForForm
          startDateName="startDate"
          endDateName="endDate"
          placeholder="選"
        />
      </Grid>
    </Grid>
  )
}

export default DateTimeRangeDemo
