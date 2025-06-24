import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RadioGroup, Radio, FormControlLabel, Typography, Button, Box, FormHelperText,Grid,Paper} from '@mui/material';

const Step3_VehicleType = ({ nextStep, prevStep, updateData, data }) => {
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(data.vehicle_type_id || '');
  const [error, setError] = useState(false);

  useEffect(() => {
  if (data.wheels) {
    const fetchVehicleTypes = async () => {
      try {
        debugger
        var wheelValue= parseInt(data.wheels);
      
        const response = await axios.get(`http://localhost:5000/vehicle-types?wheels=${wheelValue}`);
        const vehicleTypes = response.data; 
        setTypes(vehicleTypes); 
      } catch (err) {
        console.error("Error fetching vehicle types:", err);
      }
    };

    fetchVehicleTypes();
  }
}, [data.wheels]);

  const handleNext = () => {
    if (selectedType) {
      updateData({ vehicle_type_id: selectedType });
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
      <Typography variant="h6" mb={2}>Select Vehicle Type</Typography>
      <RadioGroup
        value={selectedType}
        onChange={(e) => {
          setSelectedType(e.target.value);
          setError(false);
        }}
      >
        {types.map((type) => (
          <FormControlLabel
            key={type.id}
            value={type.id.toString()}
            control={<Radio />}
            label={type.name}
          />
        ))}
      </RadioGroup>
      {error && <FormHelperText error>Please select a vehicle type.</FormHelperText>}

      <Box mt={3}>
        <Button onClick={prevStep} sx={{ mr: 2 }}>Back</Button>
        <Button variant="contained" onClick={handleNext}>Next</Button>
      </Box>
    </Box></Paper>
     </Grid>
        </Grid>
  );
};

export default Step3_VehicleType;
