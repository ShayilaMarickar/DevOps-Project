import React from 'react';
import { Link } from 'react-router-dom';
import { Stack, AppBar, Toolbar, Typography } from '@mui/material';

import Logo from '../assets/images/Logo.png';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ background: '#fff', boxShadow: 'none', borderBottom: 'none' }}>
      <Toolbar>
        <Stack 
          direction="row"
          justifyContent="space-around" sx={{ gap: {
            sm: '122px',
            xs: '40px'
          }, mt: { sm: '32px', xs: '20px' }, justifyContent: 'none' }}
          sx={{ gap: { sm: '122px', xs: '40px' }, mt: { sm: '32px', xs: '20px' }, 
          justifyContent: 'none' }}
          px="20px"
        >
          <Link to="/">
            <img src={Logo} alt="Logo" style={{ width: '48px', height: '48px' }} />
          </Link>
          <Stack
            direction="row"
            gap="40px"
            fontSize="24px"
            alignItems="flex-end"
          >
            <Link to="/" style={{ textDecoration: 'none', color: '#3A1212' }}>
              <Typography variant="h6" component="span">Home</Typography>
            </Link>
            <a href="#exercises" style={{ textDecoration: 'none', color: '#3A1212' }}>
              <Typography variant="h6" component="span">Exercises</Typography>
            </a>
            <Link to="/exercise" style={{ textDecoration: 'none', color: '#3A1212' }}>
            </Link>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;