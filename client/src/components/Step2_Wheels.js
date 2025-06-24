import React, { useState } from 'react';
import { Radio, RadioGroup, FormControlLabel, Button, Box, Typography, FormHelperText,Grid,Paper } from '@mui/material';

const Step2_Wheels = ({ nextStep, prevStep, updateData, data }) => {
  const [wheels, setWheels] = useState(data.wheels || '');
  const [error, setError] = useState(false);

  const handleNext = () => {
    if (wheels) {
      updateData({ wheels });
      nextStep();
    } else {
      setError(true);
    }
  };

  return (
    <Grid container justifyContent="center" mt={8}>
          <Grid item xs={11} sm={8} md={6} lg={4}>
            <Paper elevation={3} sx={{ padding: 4, borderRadius: 3 }}>
    <Box p={3}>
      <Typography variant="h6" mb={2}>Number of wheels</Typography>
      <RadioGroup
        value={wheels}
        onChange={(e) => {
          setWheels(e.target.value);
          setError(false);
        }}
      >
        <FormControlLabel value="2" control={<Radio />} label="2 Wheeler" />
        <FormControlLabel value="4" control={<Radio />} label="4 Wheeler" />
      </RadioGroup>
      {error && <FormHelperText error>Please select an option to proceed.</FormHelperText>}

      <Box mt={3}>
        <Button onClick={prevStep} sx={{ mr: 2 }}>Back</Button>
        <Button variant="contained" onClick={handleNext}>Next</Button>
      </Box>
    </Box>
    </Paper>
          </Grid>
        </Grid>
  );
};

export default Step2_Wheels;
