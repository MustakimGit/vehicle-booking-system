import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Box,
  Typography,
  Button,
  FormHelperText,
  Paper,
  Grid,
} from '@mui/material';

const Step5_DateSubmit = ({ data, prevStep, resetForm }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async () => {
    if (!startDate || !endDate) {
      setError('Please select both start and end dates');
      return;
    }

    setError('');
    setSuccess('');
const formatLocalDate = (date) => {
  const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return offsetDate.toISOString().split('T')[0];
};
    const payload = {
      first_name: data.first_name,
      last_name: data.last_name,
      wheels: parseInt(data.wheels),
      vehicle_type_id: parseInt(data.vehicle_type_id),
      vehicle_id: parseInt(data.vehicle_id),
      start_date: formatLocalDate(startDate),
  end_date: formatLocalDate(endDate),
    };

    try {
      await axios.post('http://localhost:5000/book', payload);
      setSuccess('✅ Booking successful!');
      resetForm();
    } catch (err) {
      const msg = err?.response?.data?.error
      // || 'Something went wrong';
      setError(`❌ ${msg}`);
    }
  };

  return (
    <Grid container justifyContent="center" mt={8}>
      <Grid item xs={11} sm={8} md={6} lg={4}>
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 3 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Select Booking Date Range
          </Typography>

          <Box display="flex" flexDirection="column" gap={3} mt={2}>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              maxDate={endDate}
              placeholderText="Start Date"
              className="custom-datepicker"
            />

            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="End Date"
              className="custom-datepicker"
            />

            {error && (
              <FormHelperText error sx={{ mt: -1 }}>
                {error}
              </FormHelperText>
            )}
            {success && (
              <FormHelperText sx={{ color: 'green', mt: -1 }}>
                {success}
              </FormHelperText>
            )}

            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button onClick={prevStep} variant="outlined">
                Back
              </Button>
              <Button variant="contained" onClick={handleSubmit}>
                Submit Booking
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Step5_DateSubmit;
