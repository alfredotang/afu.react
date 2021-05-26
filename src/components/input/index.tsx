import type { ForwardRefExoticComponent } from 'react';
import type { TextFieldProps as MuiTextFieldProps } from '@material-ui/core/TextField';
import { forwardRef } from 'react';
import MuiTextField from '@material-ui/core/TextField';

type InputProps = { maxLength?: number } & Omit<
  MuiTextFieldProps,
  'InputProps'
>;

const Input: ForwardRefExoticComponent<InputProps> = forwardRef(
  (props, ref) => {
    const {
      maxLength,
      sx,
      onChange,
      onBlur,
      type,
      inputProps,
      error,
      helperText,
      multiline,
      placeholder,
      maxRows,
      minRows,
      name,
      disabled,
    } = props;
    return (
      <MuiTextField
        inputProps={{ maxLength, ...inputProps }}
        sx={{ ...sx }}
        onChange={onChange}
        ref={ref}
        onBlur={onBlur}
        type={type}
        error={error}
        helperText={helperText}
        multiline={multiline}
        placeholder={placeholder}
        maxRows={maxRows}
        minRows={minRows}
        name={name}
        disabled={disabled}
      />
    );
  }
);

export default Input;
