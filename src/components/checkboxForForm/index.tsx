import { useController, useFormContext } from 'react-hook-form'

import { Checkbox, CheckboxProps } from '@src/components/checkbox'

type CheckboxForFormForFormProps = Omit<
  CheckboxProps,
  'error' | 'helperText' | 'value' | 'onChange' | 'ref' | 'name'
> & {
  name: string
}

export const CheckboxForForm = (props: CheckboxForFormForFormProps) => {
  const { control } = useFormContext()
  const { name } = props
  const {
    field,
    fieldState: { error },
  } = useController({ name, control })

  return <Checkbox {...props} {...field} error={Boolean(error)} helperText={error?.message || ''} />
}

export default CheckboxForForm
