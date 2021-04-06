import type { FC } from 'react';
import { Box, Link, Button, List, ListItem } from '@material-ui/core';

const Sidebar: FC = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        width: '25%',
        height: '100%',
        p: 1,
        borderRight: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <List>
        <ListItem button href="/" component="a">
          home
        </ListItem>
        <ListItem button href="/form-practice" component="a">
          FormPractice
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
