import type { ForwardRefExoticComponent, ReactNode, ChangeEvent } from 'react'
import type { SxProps } from '@material-ui/system'
import type { Theme } from '@mui/material/styles'
import type { RadioGroupProps, FormControlLabelProps } from '@mui/material'
import { forwardRef } from 'react'
import MuiRadio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'

export type IRadioSource = {
  value: string | boolean
  label: ReactNode
}

export type RadioProps = Omit<RadioGroupProps, 'onChange'> & {
  sx?: SxProps<Theme>
  error?: boolean
  helperText?: string
  source: IRadioSource[]
  onChange: (value: unknown) => void
  disabled?: boolean
}

export const Radio: ForwardRefExoticComponent<RadioProps> = forwardRef((props, ref) => {
  const { sx, error, helperText, row, onChange, value, source, name, disabled } = props

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value

    let mappingValue: string | boolean = newValue

    if (mappingValue === 'true' || mappingValue === 'false') {
      mappingValue = mappingValue === 'true' || false
    }

    onChange(mappingValue)
  }

  return (
    <FormControl sx={sx} disabled={disabled}>
      <RadioGroup row={row} onChange={handleChange} value={value} ref={ref} name={name}>
        {source.map((item, index) => {
          return (
            <FormControlLabel
              key={JSON.stringify(item.value) + index}
              value={item.value}
              control={<MuiRadio sx={{ color: theme => error && theme.palette.error.main }} />}
              label={item.label}
            />
          )
        })}
      </RadioGroup>
      {error && helperText && (
        <FormHelperText sx={{ marginLeft: 0, color: theme => theme.palette.error.main }}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  )
})

export default Radio
