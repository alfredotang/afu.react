import type { FC, ReactElement } from 'react';
import { cloneElement } from 'react';
import { memo } from 'react';
import { Grid } from '@material-ui/core';
import { useFormContext } from 'react-hook-form';
import { theme } from '@src/providers';

interface IWordCounterProps {
  children: ReactElement;
  maxLength: number;
  name: string;
  error: boolean;
  hasErrorMessageOnBottom?: boolean;
}
const WordCounter: FC<IWordCounterProps> = ({
  children,
  maxLength,
  name,
  error,
  hasErrorMessageOnBottom = false,
}) => {
  const { watch, setValue } = useFormContext();
  const value = watch(name);

  const ChildElement = cloneElement(children, { inputProps: { maxLength } });

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
          color:
            value.length > maxLength || error
              ? `${theme.palette.error.main}`
              : '',
          position: hasErrorMessageOnBottom && error ? 'relative' : 'static',
          top: '-20px',
        }}
      >
        ({value.length}/{maxLength})
      </Grid>
    </Grid>
  );
};

export default memo(WordCounter);
