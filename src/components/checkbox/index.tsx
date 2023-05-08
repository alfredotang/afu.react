import type { ForwardRefExoticComponent, ReactNode, ChangeEvent } from 'react'
import type { Theme, SxProps } from '@mui/material/styles'
import type { CheckboxProps as MuiCheckboxProps, FormControlLabelProps } from '@mui/material'
import { forwardRef } from 'react'

import MuiCheckbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'

export type CheckboxProps = Omit<MuiCheckboxProps, 'onChange' | 'checked'> & {
  sx?: SxProps<Theme>
  error?: boolean
  helperText?: string
  label: ReactNode
  onChange: (checked: boolean) => void
  value: boolean
}

export const Checkbox: ForwardRefExoticComponent<CheckboxProps> = forwardRef((props, ref) => {
  const { sx, error, helperText, value, name, label, onChange, disabled } = props

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked)
  }

  return (
    <FormControl sx={sx} disabled={disabled}>
      <FormControlLabel
        control={
          <MuiCheckbox
            sx={{ color: theme => (error ? theme.palette.error.main : '') }}
            checked={value}
            onChange={handleChange}
            name={name}
            ref={ref}
          />
        }
        label={label}
      />
      {error && helperText && (
        <FormHelperText sx={{ marginLeft: 0, color: theme => theme.palette.error.main }}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  )
})

export default Checkbox
