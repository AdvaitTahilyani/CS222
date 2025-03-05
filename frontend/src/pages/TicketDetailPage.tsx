import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import { ticketService } from '../services/api';
import { Ticket } from '../types';

const TicketDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [purchaseLoading, setPurchaseLoading] = useState<boolean>(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState<boolean>(false);
  const [purchaseError, setPurchaseError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        if (!id) return;
        const data = await ticketService.getTicket(parseInt(id));
        setTicket(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching ticket:', err);
        setError('Failed to load ticket details. Please try again later.');
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0 && ticket && value <= ticket.quantity) {
      setQuantity(value);
    }
  };

  const handlePurchase = async () => {
    if (!id || !ticket) return;
    
    setPurchaseLoading(true);
    setPurchaseError(null);
    
    try {
      await ticketService.purchaseTicket(parseInt(id), quantity);
      setPurchaseSuccess(true);
      setPurchaseLoading(false);
      
      // Refresh ticket data after purchase
      const updatedTicket = await ticketService.getTicket(parseInt(id));
      setTicket(updatedTicket);
    } catch (err) {
      console.error('Error purchasing ticket:', err);
      setPurchaseError('Failed to purchase ticket. Please try again later.');
      setPurchaseLoading(false);
    }
  };

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

  if (!ticket) {
    return <Alert severity="error">Ticket not found</Alert>;
  }

  return (
    <Box>
      <Button
        variant="outlined"
        onClick={() => navigate('/tickets')}
        sx={{ mb: 3 }}
      >
        Back to Tickets
      </Button>
      
      {purchaseSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Ticket purchased successfully!
        </Alert>
      )}
      
      {purchaseError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {purchaseError}
        </Alert>
      )}
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image={`https://source.unsplash.com/random?event&sig=${ticket.id}`}
              alt={ticket.event_name}
            />
            <CardContent>
              <Typography variant="h4" component="h1" gutterBottom>
                {ticket.event_name}
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
                <Chip
                  icon={<EventIcon />}
                  label={ticket.date ? new Date(ticket.date).toLocaleDateString() : 'Date TBD'}
                  variant="outlined"
                />
                <Chip
                  icon={<LocationOnIcon />}
                  label={ticket.location}
                  variant="outlined"
                />
                {ticket.seller && (
                  <Chip
                    icon={<PersonIcon />}
                    label={`Seller: ${ticket.seller}`}
                    variant="outlined"
                  />
                )}
              </Box>
              
              <Typography variant="body1" paragraph>
                {ticket.description}
              </Typography>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="h6" gutterBottom>
                Event Details
              </Typography>
              
              <Typography variant="body1" paragraph>
                Join us for this amazing event! Don't miss out on this opportunity to experience
                an unforgettable time with fellow students.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Purchase Tickets
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body1">Price per ticket:</Typography>
              <Typography variant="body1" fontWeight="bold">
                ${ticket.price.toFixed(2)}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="body1">Available:</Typography>
              <Typography variant="body1">
                {ticket.quantity} tickets
              </Typography>
            </Box>
            
            <TextField
              label="Quantity"
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              inputProps={{ min: 1, max: ticket.quantity }}
              fullWidth
              sx={{ mb: 3 }}
              disabled={ticket.quantity === 0 || purchaseLoading}
            />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="body1">Total:</Typography>
              <Typography variant="h6" fontWeight="bold">
                ${(ticket.price * quantity).toFixed(2)}
              </Typography>
            </Box>
            
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handlePurchase}
              disabled={ticket.quantity === 0 || purchaseLoading}
            >
              {purchaseLoading ? <CircularProgress size={24} /> : 'Purchase Now'}
            </Button>
            
            {ticket.quantity === 0 && (
              <Alert severity="warning" sx={{ mt: 2 }}>
                Sold out! No tickets available.
              </Alert>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TicketDetailPage; 