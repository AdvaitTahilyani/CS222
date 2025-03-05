import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <ConfirmationNumberIcon sx={{ mr: 2 }} />
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          Student Ticket Marketplace
        </Typography>
        <Box>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            sx={{ mr: 2 }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/tickets"
            sx={{ mr: 2 }}
          >
            Browse Tickets
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/create-ticket"
            variant="outlined"
            sx={{ borderColor: 'white' }}
          >
            Sell Tickets
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 