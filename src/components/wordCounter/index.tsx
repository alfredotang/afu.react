import type { FC, ReactElement } from 'react';
import { cloneElement } from 'react';
import { memo } from 'react';
import { Grid } from '@material-ui/core';
import { theme } from '@src/providers';

interface IWordCounterProps {
  children: ReactElement;
}
const WordCounter: FC<IWordCounterProps> = ({ children }) => {
  const ChildElement = cloneElement(children);
  const value = ChildElement?.props?.value || '';
  const maxLength = ChildElement?.props?.maxLength || null;
  const error = ChildElement?.props?.error || false;
  const isError = value.length > maxLength || error;

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
          position: error ? 'relative' : 'static',
          top: '-20px',
        }}
      >
        ({value.length}/{maxLength})
      </Grid>
    </Grid>
  );
};

export default memo(WordCounter);
