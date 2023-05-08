import type { ForwardRefExoticComponent, ChangeEvent, ReactNode, SyntheticEvent } from 'react'
import type { SelectProps as MuiSelectProps } from '@mui/material/Select'
import type { MenuProps } from '@mui/material/Menu'
import { forwardRef } from 'react'
import MuiSelect from '@mui/material/Select'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Checkbox from '@mui/material/Checkbox'
import ListItemText from '@mui/material/ListItemText'

export type SelectProps = Pick<
  MuiSelectProps,
  'sx' | 'error' | 'placeholder' | 'multiple' | 'name' | 'value' | 'onBlur' | 'onFocus' | 'disabled'
> & {
  helperText?: string
  source: IKeyValuePair<string | number, string | number>[]
  // select value default 回傳 source 的 key
  // 若希望回傳的是 source 的 value
  // 可以設 打開此設定
  usingSourceValueForSelectValue?: boolean
  onChange: (value: unknown) => void
}

const menuProps: Partial<MenuProps> = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left',
  },
  PaperProps: {
    style: {
      maxHeight: '300px',
    },
  },
}

/**
 * @name Select
 * @description 下拉選單元件
 * @param {SelectProps} props
 */
const Select: ForwardRefExoticComponent<SelectProps> = forwardRef((props, ref) => {
  const {
    source,
    sx,
    helperText,
    error,
    placeholder,
    multiple,
    name,
    value = '',
    onChange,
    onBlur,
    onFocus,
    usingSourceValueForSelectValue = false,
    disabled,
  } = props

  const handleChange: MuiSelectProps['onChange'] = (event, child: ReactNode) => {
    onChange(event.target.value)
  }

  return (
    <FormControl error={error}>
      <MuiSelect
        sx={{
          width: '200px',
          height: '50px',
          backgroundColor: theme => theme.palette.background.paper,
          ...sx,
        }}
        displayEmpty
        multiple={multiple}
        MenuProps={menuProps}
        placeholder={placeholder}
        onChange={handleChange}
        ref={ref}
        name={name}
        onBlur={onBlur}
        value={value}
        IconComponent={ExpandMoreIcon}
        onFocus={onFocus}
        disabled={disabled}
        renderValue={selected => {
          if (!multiple) return selected as ReactNode
          const displayValueList = (selected as string[])?.map(item => {
            const resultSourceIndex = source.findIndex(val => {
              if (usingSourceValueForSelectValue) {
                return val.value === item
              }
              return val.key === item
            })

            return source[resultSourceIndex].value
          })
          return displayValueList.join(', ')
        }}
      >
        <MenuItem disabled value="">
          {placeholder}
        </MenuItem>
        {source?.map(({ key: sourceKey, value: sourceValue }) => (
          <MenuItem
            key={sourceKey}
            value={usingSourceValueForSelectValue ? sourceValue : sourceKey}
          >
            {multiple ? (
              <>
                <Checkbox
                  checked={
                    (value as any[])?.indexOf(
                      usingSourceValueForSelectValue ? sourceValue : sourceKey
                    ) > -1
                  }
                />
                <ListItemText primary={sourceValue} />
              </>
            ) : (
              sourceValue
            )}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && helperText && <FormHelperText sx={{ marginLeft: 0 }}>{helperText}</FormHelperText>}
    </FormControl>
  )
})
export default Select
