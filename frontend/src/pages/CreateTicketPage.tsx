import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { ticketService } from '../services/api';

interface TicketFormData {
  event_name: string;
  description: string;
  price: string;
  date: string;
  location: string;
  quantity: string;
}

const CreateTicketPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<TicketFormData>({
    event_name: '',
    description: '',
    price: '',
    date: '',
    location: '',
    quantity: '1',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate form data
      if (!formData.event_name || !formData.description || !formData.price || !formData.location) {
        throw new Error('Please fill in all required fields');
      }

      // Convert price and quantity to numbers
      const price = parseFloat(formData.price);
      const quantity = parseInt(formData.quantity);

      if (isNaN(price) || price <= 0) {
        throw new Error('Price must be a positive number');
      }

      if (isNaN(quantity) || quantity <= 0) {
        throw new Error('Quantity must be a positive number');
      }

      // Submit the ticket
      await ticketService.createTicket({
        event_name: formData.event_name,
        description: formData.description,
        price,
        date: formData.date || null,
        location: formData.location,
        quantity,
      });

      setSuccess(true);
      setLoading(false);

      // Redirect to tickets page after a short delay
      setTimeout(() => {
        navigate('/tickets');
      }, 2000);
    } catch (err) {
      console.error('Error creating ticket:', err);
      setError(err instanceof Error ? err.message : 'Failed to create ticket. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Sell Your Tickets
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Ticket created successfully! Redirecting to tickets page...
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                name="event_name"
                label="Event Name"
                value={formData.event_name}
                onChange={handleChange}
                fullWidth
                required
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                required
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="price"
                label="Price ($)"
                type="number"
                value={formData.price}
                onChange={handleChange}
                fullWidth
                required
                inputProps={{ min: 0, step: 0.01 }}
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="quantity"
                label="Quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                fullWidth
                required
                inputProps={{ min: 1 }}
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="date"
                label="Event Date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="location"
                label="Location"
                value={formData.location}
                onChange={handleChange}
                fullWidth
                required
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/tickets')}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Create Ticket'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default CreateTicketPage; 