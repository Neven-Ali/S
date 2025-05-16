import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton,
  Box,
  Container
} from '@mui/material';
import { School, ShoppingCart } from '@mui/icons-material';

const Header = () => {
  return (
    <AppBar position="static" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <School />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            LearnHub
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button color="inherit">Home</Button>
            <Button color="inherit">Courses</Button>
            <Button color="inherit">About</Button>
            <Button color="inherit">Contact</Button>
          </Box>
          <IconButton color="inherit">
            <ShoppingCart />
          </IconButton>
          <Button color="inherit" variant="outlined" sx={{ ml: 2 }}>Login</Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;