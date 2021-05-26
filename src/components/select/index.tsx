import type { ForwardRefExoticComponent } from 'react';
import type { SelectProps as MuiSelectProps } from '@material-ui/core/Select';
import type { MenuProps } from '@material-ui/core/Menu';
import { forwardRef } from 'react';
import MuiSelect from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

type SelectProps = {
  helperText?: string;
  source: IKeyValuePair<string, string | number>[];
} & MuiSelectProps;

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

const Select: ForwardRefExoticComponent<SelectProps> = forwardRef(
  (props, ref) => {
    const {
      source,
      sx,
      helperText,
      error,
      placeholder,
      multiline,
      name,
      value,
      onChange,
      onBlur,
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
          multiline={multiline}
          MenuProps={menuProps}
          placeholder={placeholder}
          onChange={onChange}
          ref={ref}
          name={name}
          onBlur={onBlur}
          value={value}
          IconComponent={ExpandMoreIcon}
        >
          <MenuItem disabled value="">
            {placeholder}
          </MenuItem>
          {source?.map(({ key, value }) => (
            <MenuItem key={key} value={value}>
              {value}
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
