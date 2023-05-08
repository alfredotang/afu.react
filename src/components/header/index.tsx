import Link from 'next/link'
import styled from '@emotion/styled'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

const Header = () => {
  return (
    <>
      <AppBar position="fixed" color="default" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
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
  )
}

export default Header
