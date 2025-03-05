import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[200],
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          {'© '}
          {new Date().getFullYear()}
          {' Student Ticket Marketplace. All rights reserved. '}
          <Link color="inherit" href="#">
            Terms of Service
          </Link>{' | '}
          <Link color="inherit" href="#">
            Privacy Policy
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 