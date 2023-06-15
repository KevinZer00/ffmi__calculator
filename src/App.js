import React, { useState } from 'react';
import Height from './Height';
import Weight from './Weight';
import BodyFat from './BodyFat';
import BMI from './BMI';
import './App.css';

function App() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bodyFat, setBodyFat] = useState('');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [ffmiResult, setFFMIResult] = useState(0);
  const [adjffmiResult, setAdjFFMIResult] = useState(0);
  const [bmi, setBMI] = useState(0);

  // Function to handle height change
  const handleHeightChange = (value) => {
    setHeight(value);
  };

  // Function to handle weight change
  const handleWeightChange = (value) => {
    setWeight(value);
  };

  // Function to handle body fat change
  const handleBodyFatChange = (value) => {
    setBodyFat(value);
  };

  // Function to handle height unit change
  const handleHeightUnitChange = (value) => {
    setHeightUnit(value);
  };

  // Function to handle weight unit change
  const handleWeightUnitChange = (value) => {
    setWeightUnit(value);
  };

  // Function to calculate FFMI
  const calculateFFMI = () => {
    let heightInMeters = height;
    if (heightUnit === 'in') 
    {
      heightInMeters = height * 0.0254; // Convert inches to meters
    } else if (heightUnit === 'cm') 
    {
      heightInMeters = height / 100; // Convert centimeters to meters
    }

    let weightInKg = weight;
    if (weightUnit === 'lbs') 
    {
      weightInKg = weight * 0.453592; // Convert pounds to kilograms
    }

    // Calculate the Lean Body Mass (LBM)
    const leanBodyMass = weightInKg * (1 - bodyFat / 100);

    // Calculate the FFMI
    const ffmi = leanBodyMass / (heightInMeters * heightInMeters);

    setFFMIResult(ffmi);

    let adjFFMI = ffmi;
    if (heightUnit === 'cm') 
    {
      adjFFMI = adjFFMI + (6.3 * (1.8 - (height * 0.393701) * 0.0254));
      console.log(adjFFMI);
    }
    else if (heightUnit === 'in') 
    {
      adjFFMI = adjFFMI + (6.3 * (1.8 - (height) * 0.0254));
      console.log(adjFFMI);
    }

    setAdjFFMIResult(adjFFMI);
  };

// Function to calculate BMI
const calculateBMI = () => {
  let heightInMeters = height;
  if (heightUnit === 'in') {
    heightInMeters = (height * 0.0254); // Convert inches to meters
  } else if (heightUnit === 'cm') {
    heightInMeters = (height / 100); // Convert centimeters to meters
  }

  let weightInKg = weight;
  if (weightUnit === 'lbs') 
  {
    weightInKg = weight * 0.453592; // Convert pounds to kilograms
  }

  const bmi = weightInKg / (heightInMeters * heightInMeters);
  setBMI(bmi);
};

  return (
    <div className="App">
      <div className = "logo">FFMI AND BMI CALCULATOR</div>
      <div className = "calculators">
        <div className = "ffmiSection">
          <div className = "logo1">FFMI</div>
          <Height onHeightChange = {handleHeightChange} onUnitChange = {handleHeightUnitChange} />
          <Weight onWeightChange = {handleWeightChange} onUnitChange = {handleWeightUnitChange} />
          <BodyFat onBodyFatChange= {handleBodyFatChange} />
          <div className = "calculateFFMIContainer">
            <button className = "calculateFFMI" onClick = {calculateFFMI}>Calculate FFMI</button>
          </div>
          <div className = "ffmi">FFMI: {ffmiResult}</div>
          <div className = "adjffmi">Adjusted FFMI: {adjffmiResult}</div>
        </div>

        <div className = "bmiSection">
          <div className = "logo2">BMI </div>
          <Height onHeightChange = {handleHeightChange} onUnitChange = {handleHeightUnitChange} />
          <Weight onWeightChange = {handleWeightChange} onUnitChange = {handleWeightUnitChange} />
          <div className = "calculateBMIContainer">
            <button className = "calculateBMI" onClick = {calculateBMI}>Calculate BMI</button>
          </div>
          <div className = "bmi">BMI: {bmi}</div>
        </div>
      </div>
    </div>
  );
}

export default App;


