import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { ticketService } from '../services/api';
import { Ticket } from '../types';

const TicketListPage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await ticketService.getTickets();
        setTickets(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching tickets:', err);
        setError('Failed to load tickets. Please try again later.');
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Available Tickets
      </Typography>
      
      {tickets.length === 0 ? (
        <Alert severity="info">
          No tickets available at the moment. Check back later or{' '}
          <RouterLink to="/create-ticket">sell your own tickets</RouterLink>.
        </Alert>
      ) : (
        <Grid container spacing={4}>
          {tickets.map((ticket) => (
            <Grid item key={ticket.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={`https://source.unsplash.com/random?event&sig=${ticket.id}`}
                  alt={ticket.event_name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {ticket.event_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {ticket.description.length > 100
                      ? `${ticket.description.substring(0, 100)}...`
                      : ticket.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body1" color="text.primary" fontWeight="bold">
                      ${ticket.price.toFixed(2)}
                    </Typography>
                    <Chip
                      label={`${ticket.quantity} available`}
                      color={ticket.quantity > 5 ? 'success' : 'warning'}
                      size="small"
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {ticket.date ? new Date(ticket.date).toLocaleDateString() : 'Date TBD'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {ticket.location}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    component={RouterLink}
                    to={`/tickets/${ticket.id}`}
                    sx={{ ml: 'auto' }}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default TicketListPage; 