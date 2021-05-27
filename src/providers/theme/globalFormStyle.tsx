import { theme } from '@src/providers/theme';
import { Global, css } from '@emotion/react';

export const GlobalFormStyle = () => {
  return (
    <Global
      styles={css`
        .required {
          &::before {
            content: '*';
            color: ${theme.palette.error.main};
            margin-right: ${theme.spacing(0.5)};
          }
        }
      `}
    />
  );
};
