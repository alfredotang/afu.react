import Grid from '@mui/material/Grid'
import { DateTimePickerForForm } from '@src/components'

const DateTimeDemo = () => {
  return (
    <Grid container mb="20px" alignItems="center">
      <Grid item xs={2}>
        date
      </Grid>
      <Grid item xs={10}>
        <DateTimePickerForForm name="date" />
      </Grid>
    </Grid>
  )
}

export default DateTimeDemo
