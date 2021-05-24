import type { FC, ReactElement } from 'react';
import { cloneElement } from 'react';
import { memo } from 'react';
import { Grid } from '@material-ui/core';
import { theme } from '@src/providers';

interface WordCounterProps {
  children: ReactElement;
}
const WordCounter: FC<WordCounterProps> = ({ children }) => {
  const ChildElement = cloneElement(children);
  const value = ChildElement?.props?.value || '';
  const maxLength = ChildElement?.props?.maxLength || null;
  const error = ChildElement?.props?.error || false;
  const isError = value.length > maxLength || error;
  const hasHelperText = ChildElement?.props?.helperText || '';

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
          color: isError ? `${theme.palette.error.main}` : '',
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
