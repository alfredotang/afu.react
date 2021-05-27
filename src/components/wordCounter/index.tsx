import type { FC, ReactElement } from 'react';
import type { Theme } from '@material-ui/core/styles';
import { cloneElement } from 'react';
import { memo } from 'react';
import { Grid } from '@material-ui/core';
import { LocalConvenienceStoreOutlined } from '@material-ui/icons';

function returnColor(theme: Theme, isDisabled: boolean, isError: boolean) {
  if (isDisabled) {
    return theme.palette.text.disabled;
  }

  if (isError) {
    return theme.palette.error.main;
  }

  return theme.palette.text.primary;
}

interface WordCounterProps {
  children: ReactElement;
}

/**
 * @name WordCounter
 * @description 字數計算 wrapper
 * @param {WordCounterProps} props
 * @note 使用方式
 * <WordCounter>
 *  <Input maxLength={20} value={inputValue} type="text"/>
 * </WordCounter>
 */
const WordCounter: FC<WordCounterProps> = ({ children }) => {
  const ChildElement = cloneElement(children);
  const value = ChildElement?.props?.value || '';
  const maxLength = ChildElement?.props?.maxLength || null;
  const error = ChildElement?.props?.error || false;
  const isError = value.length > maxLength || error;
  const hasHelperText = ChildElement?.props?.helperText || '';
  const isDisabled = ChildElement?.props?.disabled || false;

  console.log(children.props);

  return (
    <Grid container>
      <Grid item xs={12}>
        {ChildElement}
      </Grid>
      <Grid
        item
        xs={12}
        alignItems="flex-end"
        justifyContent="flex-end"
        display="flex"
        sx={{
          color: (theme) => returnColor(theme, isDisabled, isError),
          position: error && hasHelperText ? 'relative' : 'static',
          top: '-20px',
        }}
      >
        ({value.length}/{maxLength})
      </Grid>
    </Grid>
  );
};

export default memo(WordCounter);
