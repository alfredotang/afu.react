import { useController, useFormContext } from 'react-hook-form'

import Select, { SelectProps } from '@src/components/select'

type SelectForFormProps = Omit<
  SelectProps,
  'error' | 'helperText' | 'value' | 'onChange' | 'ref' | 'name'
> & {
  name: string
}

const SelectForForm = (props: SelectForFormProps) => {
  const { control } = useFormContext()
  const { name } = props
  const {
    field,
    fieldState: { error },
  } = useController({ name, control })

  return <Select {...props} {...field} error={Boolean(error)} helperText={error?.message || ''} />
}

export default SelectForForm
