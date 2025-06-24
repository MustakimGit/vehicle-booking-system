import React, { useState } from 'react';
import Step1_Name from './components/Step1_Name';
import Step2_Wheels from './components/Step2_Wheels';
import Step3_VehicleType from './components/Step3_VehicleType';
import Step4_Model from './components/Step4_Model';
import Step5_DateRange from './components/Step5_DateRange';
import axios from 'axios';
import { useEffect } from 'react';

const App = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    wheels: '',
    vehicle_type_id: '',
    vehicle_id: '',
    start_date: '',
    end_date: '',
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const updateData = (input) => {
    setFormData(prev => ({ ...prev, ...input }));
  };
useEffect(()=>{
  console.log("data",formData)
},[formData])
  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/book', formData);
      alert("Booking successful!");
    } catch (err) {
      alert("Error: " + err.response?.data?.error || "Server Error");
    }
  };

  switch (step) {
    case 1: return <Step1_Name nextStep={nextStep} updateData={updateData} data={formData} />;
    case 2: return <Step2_Wheels nextStep={nextStep} prevStep={prevStep} updateData={updateData} data={formData} />;
    case 3: return <Step3_VehicleType nextStep={nextStep} prevStep={prevStep} updateData={updateData} data={formData} />;
    case 4: return <Step4_Model nextStep={nextStep} prevStep={prevStep} updateData={updateData} data={formData} />;
    case 5: return <Step5_DateRange prevStep={prevStep} updateData={updateData} data={formData} handleSubmit={handleSubmit} />;
    default: return <div>Form Complete</div>;
  }
};

export default App;
