import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RadioGroup, Radio, FormControlLabel, Typography, Button, Box, FormHelperText,Grid,Paper } from '@mui/material';

const Step4_Model = ({ nextStep, prevStep, updateData, data }) => {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(data.vehicle_id || '');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (data.vehicle_type_id) {
      axios.get(`http://localhost:5000/vehicles/${data.vehicle_type_id}`)
        .then((res) => setModels(res.data))
        .catch((err) => console.error(err));
    }
  }, [data.vehicle_type_id]);

  const handleNext = () => {

    debugger
    if (selectedModel) {
      updateData({ vehicle_id: selectedModel });
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
      <Typography variant="h6" mb={2}>Select Specific Vehicle Model</Typography>
      <RadioGroup
        value={selectedModel}
        onChange={(e) => {
          setSelectedModel(e.target.value);
          setError(false);
        }}
      >
        {models.map((model) => (
          <FormControlLabel
            key={model.vehiclesid}
            value={model.vehiclesid.toString()}
            control={<Radio />}
            label={model.name}
          />
        ))}
      </RadioGroup>
      {error && <FormHelperText error>Please select a vehicle model.</FormHelperText>}

      <Box mt={3}>
        <Button onClick={prevStep} sx={{ mr: 2 }}>Back</Button>
        <Button variant="contained" onClick={handleNext}>Next</Button>
      </Box>
    </Box></Paper>
      </Grid>
    </Grid>
  );
};

export default Step4_Model;
