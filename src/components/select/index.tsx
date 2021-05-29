import type { ForwardRefExoticComponent } from 'react';
import type { SelectProps as MuiSelectProps } from '@material-ui/core/Select';
import type { MenuProps } from '@material-ui/core/Menu';
import { forwardRef } from 'react';
import MuiSelect from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';

export type SelectProps = Pick<
  MuiSelectProps,
  | 'sx'
  | 'error'
  | 'placeholder'
  | 'multiple'
  | 'name'
  | 'value'
  | 'onChange'
  | 'onBlur'
  | 'onFocus'
  | 'disabled'
> & {
  helperText?: string;
  source: IKeyValuePair<string | number, string | number>[];
  // select value default 回傳 source 的 key
  // 若希望回傳的是 source 的 value
  // 可以設 打開此設定
  usingSourceValueForSelectValue?: boolean;
};

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
};

/**
 * @name Select
 * @description 下拉選單元件
 * @param {SelectProps} props
 */
const Select: ForwardRefExoticComponent<SelectProps> = forwardRef(
  (props, ref) => {
    const {
      source,
      sx,
      helperText,
      error,
      placeholder,
      multiple,
      name,
      value,
      onChange,
      onBlur,
      onFocus,
      usingSourceValueForSelectValue = false,
      disabled,
    } = props;

    return (
      <FormControl error={error}>
        <MuiSelect
          sx={{
            width: '200px',
            height: '50px',
            backgroundColor: (theme) => theme.palette.background.paper,
            ...sx,
          }}
          displayEmpty
          multiple={multiple}
          MenuProps={menuProps}
          placeholder={placeholder}
          onChange={onChange}
          ref={ref}
          name={name}
          onBlur={onBlur}
          value={value}
          IconComponent={ExpandMoreIcon}
          onFocus={onFocus}
          disabled={disabled}
          renderValue={
            multiple
              ? (selected) => {
                  const displayValueList = (selected as any[])?.map((item) => {
                    const resultSourceIndex = source.findIndex((val) => {
                      if (usingSourceValueForSelectValue) {
                        return val.value === item;
                      }
                      return val.key === item;
                    });

                    return source[resultSourceIndex].value;
                  });
                  return displayValueList.join(', ');
                }
              : null
          }
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
                    checked={(value as any[])?.indexOf(sourceKey) > -1}
                  />
                  <ListItemText primary={sourceValue} />
                </>
              ) : (
                sourceValue
              )}
            </MenuItem>
          ))}
        </MuiSelect>
        {error && helperText && (
          <FormHelperText sx={{ marginLeft: 0 }}>{helperText}</FormHelperText>
        )}
      </FormControl>
    );
  }
);
export default Select;
