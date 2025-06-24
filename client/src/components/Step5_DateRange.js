import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Box, Typography, Button, FormHelperText } from '@mui/material';

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

    const payload = {
      first_name: data.first_name,
      last_name: data.last_name,
      wheels: parseInt(data.wheels),
      vehicle_type_id: parseInt(data.vehicle_type_id),
      vehicle_id: parseInt(data.vehicle_id),
      start_date: startDate,
      end_date: endDate,
    };

    try {
      await axios.post('http://localhost:5000/bookings', payload);
      setSuccess('✅ Booking successful!');
      resetForm();
    } catch (err) {
      const msg = err?.response?.data?.message || 'Something went wrong';
      setError(`❌ ${msg}`);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h6" mb={2}>Select Booking Date Range</Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start Date"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="End Date"
        />
      </Box>

      {error && <FormHelperText error sx={{ mt: 2 }}>{error}</FormHelperText>}
      {success && <FormHelperText sx={{ mt: 2 }} style={{ color: 'green' }}>{success}</FormHelperText>}

      <Box mt={3}>
        <Button onClick={prevStep} sx={{ mr: 2 }}>Back</Button>
        <Button variant="contained" onClick={handleSubmit}>Submit Booking</Button>
      </Box>
    </Box>
  );
};

export default Step5_DateSubmit;
