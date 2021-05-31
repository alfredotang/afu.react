import type { ForwardRefExoticComponent, ChangeEvent } from 'react';
import type { TextFieldProps as MuiTextFieldProps } from '@material-ui/core/TextField';
import { forwardRef } from 'react';
import MuiTextField from '@material-ui/core/TextField';
import { WordCounter } from '@src/components';

export type TextFieldBaseProps = Omit<
  MuiTextFieldProps,
  'onChange' | 'InputProps' | 'type'
> & {
  maxLength?: number;
  onChange: (value: unknown) => void;
  type?: 'text' | 'number';
};

export const TextFieldBase: ForwardRefExoticComponent<TextFieldBaseProps> = forwardRef(
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
      onFocus,
      variant,
      value,
    } = props;

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = event.target.value;

      let mappingValue: unknown = null;
      if (!multiline && type === 'number' && Number(newValue)) {
        mappingValue = Number(newValue);
      } else {
        mappingValue = `${newValue}`;
      }

      onChange(mappingValue);
    };

    return (
      <MuiTextField
        inputProps={{ maxLength, ...inputProps }}
        sx={{ ...sx }}
        onChange={handleChange}
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
        onFocus={onFocus}
        variant={variant}
        value={value}
      />
    );
  }
);
export default TextFieldBase;
