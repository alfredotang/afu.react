import type { ForwardRefExoticComponent } from 'react';
import type { TextFieldBaseProps } from '@src/components/textFieldBase';
import { TextFieldBase } from '@src/components/textFieldBase';
import { forwardRef } from 'react';
import { WordCounter } from '@src/components';

export type TextFieldProps = Pick<
  TextFieldBaseProps,
  | 'value'
  | 'maxLength'
  | 'inputProps'
  | 'sx'
  | 'onChange'
  | 'ref'
  | 'onBlur'
  | 'type'
  | 'error'
  | 'multiline'
  | 'placeholder'
  | 'maxRows'
  | 'minRows'
  | 'name'
  | 'disabled'
  | 'onFocus'
  | 'variant'
> & {
  enabledWordCounter?: boolean;
  helperText?: string;
};

/**
 * @name TextField
 * @description Input 、 textarea
 * @param {TextFieldProps} props
 *
 * @note 若要使用 textarea 模式
 * 用 minRows 控制高度
 * multiline must be true
 *
 * @note 若要使用 自動長高功能
 * multiline must be true
 * 切記！ input type 為 "number" 盡量不要使用
 */
export const TextField: ForwardRefExoticComponent<TextFieldProps> = forwardRef(
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
      enabledWordCounter,
      value,
      variant,
    } = props;

    if (enabledWordCounter) {
      return (
        <WordCounter
          value={value}
          maxLength={maxLength}
          error={error}
          helperText={helperText}
        >
          <TextFieldBase
            maxLength={maxLength}
            inputProps={inputProps}
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
            onFocus={onFocus}
            value={value}
            variant={variant}
          />
        </WordCounter>
      );
    }

    return (
      <TextFieldBase
        maxLength={maxLength}
        inputProps={inputProps}
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
        onFocus={onFocus}
        value={value}
        variant={variant}
      />
    );
  }
);

export default TextField;
