import React, { useState } from 'react';
import { TextField, Button, Box, Typography , Grid,Paper} from '@mui/material';

const Step1_Name = ({ nextStep, updateData, data }) => {
  const [firstName, setFirstName] = useState(data.first_name);
  const [lastName, setLastName] = useState(data.last_name);
  const [errorFirstName, setErrorFirstName] = useState('');
  const [errorLastName, setErrorLastName] = useState('');
  const [generalError, setGeneralError] = useState('');

  const handleNext = () => {
    let hasError = false;

    if (!firstName.trim()) {
      setErrorFirstName('First name is required');
      hasError = true;
    } else {
      setErrorFirstName('');
    }

    if (!lastName.trim()) {
      setErrorLastName('Last name is required');
      hasError = true;
    } else {
      setErrorLastName('');
    }

    if (hasError) {
      setGeneralError('❌ You can’t proceed unless you provide both first and last name.');
    } else {
      setGeneralError('');
      updateData({ first_name: firstName, last_name: lastName });
      nextStep();
    }
  };

  return (
    <Grid container justifyContent="center" mt={8}>
          <Grid item xs={11} sm={8} md={6} lg={4}>
            <Paper elevation={3} sx={{ padding: 4, borderRadius: 3 }}>
              <Box p={3}>
                <Typography variant="h6" mb={2}>What is your name?</Typography>

      <TextField
        label="First Name"
        fullWidth
        value={firstName}
        onChange={(e) => {setFirstName(e.target.value);setErrorFirstName('');setGeneralError('')}}
        helperText={errorFirstName}
        error={!!errorFirstName}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Last Name"
        fullWidth
        value={lastName}
        onChange={(e) => {setLastName(e.target.value);setErrorLastName('');setGeneralError('')}}
        helperText={errorLastName}
        error={!!errorLastName}
        sx={{ mb: 2 }}
      />

      {generalError && (
        <Typography color="error" sx={{ mb: 2 }}>
          {generalError}
        </Typography>
      )}

      <Button variant="contained" onClick={handleNext}>Next</Button>
    </Box>
     </Paper>
          </Grid>
        </Grid>
  );
};

export default Step1_Name;
