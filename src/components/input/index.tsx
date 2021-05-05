import type { ForwardRefExoticComponent } from 'react';
import type { TextFieldProps as MuiTextFieldProps } from '@material-ui/core/TextField';
import type { ControllerRenderProps } from 'react-hook-form';
import { forwardRef } from 'react';
import MuiTextField from '@material-ui/core/TextField';

type InputProps = { maxLength?: number } & Omit<
  MuiTextFieldProps,
  'InputProps'
> &
  Partial<ControllerRenderProps>;

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
      />
    );
  }
);

export default Input;
