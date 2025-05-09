import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Logo from '../assets/images/Logo-1.png';

const Footer = () => {
  return (
    <Box mt="80px" bgcolor="#fff3f4">
      <Stack 
        gap="40px" 
        alignItems="center" 
        px="40px" 
        pt="24px"
        pb="24px"
      >
        <img 
          src={Logo} 
          alt="logo" 
          style={{
            width: '200px',
            height: 'auto',
            objectFit: 'contain',
            marginBottom: '1rem'
          }}
        />
        <Typography 
          variant="h5" 
          pb="40px" 
          mt="20px"
          textAlign="center"
        >
          Made with ❤️ by Golds Gym
        </Typography>
      </Stack>
    </Box>
  );
};

export default Footer;