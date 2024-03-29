import { Box, Button, List, ListItem } from '@mui/material'
import Link from 'next/link'

const Sidebar = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        width: '25%',
        height: '100%',
        p: 1,
        borderRight: theme => `1px solid ${theme.palette.divider}`,
      }}
    >
      <List>
        <Link href="/">
          <ListItem button component="a">
            home
          </ListItem>
        </Link>
        <Link href="/form-practice">
          <ListItem button component="a">
            FormPractice
          </ListItem>
        </Link>
        <Link href="/lab">
          <ListItem button component="a">
            lab
          </ListItem>
        </Link>
      </List>
    </Box>
  )
}

export default Sidebar
