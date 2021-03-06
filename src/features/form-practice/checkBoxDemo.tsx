import type { FC } from 'react';
import type { IFormBase } from '@src/features/form-practice';

import Grid from '@material-ui/core/Grid';
import { CheckboxForForm } from '@src/components';

import { useFormContext } from 'react-hook-form';

const CheckboxDemo: FC = () => {
  const { register } = useFormContext<IFormBase>();
  return (
    <>
      <Grid container mb="20px" alignItems="center">
        <Grid item xs={2} className="required">
          show
        </Grid>
        <Grid item xs={10}>
          <CheckboxForForm name="show" label="Show" />
        </Grid>
      </Grid>
    </>
  );
};

export default CheckboxDemo;
