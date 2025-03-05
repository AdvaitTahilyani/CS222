import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import PeopleIcon from '@mui/icons-material/People';

const HomePage: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Hero Section */}
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: 'url(https://source.unsplash.com/random?concert)',
          p: 6,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.5)',
            borderRadius: 2,
          }}
        />
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                position: 'relative',
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
              }}
            >
              <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                Student Ticket Marketplace
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                Buy and sell tickets to campus events, concerts, sports games, and more.
              </Typography>
              <Button
                variant="contained"
                size="large"
                component={RouterLink}
                to="/tickets"
                sx={{ mt: 2 }}
              >
                Browse Tickets
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={RouterLink}
                to="/create-ticket"
                sx={{ mt: 2, ml: 2, borderColor: 'white', color: 'white' }}
              >
                Sell Tickets
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Features Section */}
      <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
        How It Works
      </Typography>
      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              textAlign: 'center',
            }}
          >
            <LocalActivityIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" component="h3" gutterBottom>
              List Your Tickets
            </Typography>
            <Typography>
              Have extra tickets? List them on our marketplace and set your own price.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              textAlign: 'center',
            }}
          >
            <PeopleIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" component="h3" gutterBottom>
              Connect with Students
            </Typography>
            <Typography>
              Our platform connects students who want to buy or sell tickets to campus events.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              textAlign: 'center',
            }}
          >
            <ConfirmationNumberIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" component="h3" gutterBottom>
              Secure Transactions
            </Typography>
            <Typography>
              Our platform ensures secure transactions between buyers and sellers.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage; 