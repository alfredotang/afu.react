import type { FC } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Header: FC = () => {
  return (
    <>
      <AppBar
        position="fixed"
        color="default"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Link href="/">
            <Typography variant="overline">AFU React Practice</Typography>
          </Link>
        </Toolbar>
      </AppBar>

      {/* 因為 AppBar position fixed */}
      {/* 故放一個 Toolbar 來撐高度 */}
      <Toolbar />
    </>
  );
};

export default Header;
