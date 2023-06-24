import React, { useState, useEffect, useRef } from 'react';
import Height from './Height';
import Weight from './Weight';
import BodyFat from './BodyFat';
import BMI from './BMI';
import GenderInput from './GenderInput';
import BellCurveChartMen from './BellCurveChartMen';
import BellCurveChartWomen from './BellCurveChartWomen';
import BmiChart from './BmiChart';
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
  const [selectedGender, setSelectedGender] = useState('male');

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

   // Function to handle gender change
   const handleGenderChange = (value) => {
    setSelectedGender(value);
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
    <div className = "App">
      <div className = "logo">FFMI AND BMI CALCULATOR</div>
      <div className = "calculators">
        <div className = "ffmiSection">
          <div className = "logo1">FFMI</div>
          <Height onHeightChange = {handleHeightChange} onUnitChange = {handleHeightUnitChange} />
          <Weight onWeightChange = {handleWeightChange} onUnitChange = {handleWeightUnitChange} />
          <BodyFat onBodyFatChange= {handleBodyFatChange} />
          <GenderInput onGenderChange = {handleGenderChange}/>
          <div className = "calculateFFMIContainer">
            <button className = "calculateFFMI" onClick = {calculateFFMI}>Calculate FFMI</button>
          </div>
          <div className = "ffmi">FFMI: {ffmiResult.toFixed(2)}</div>
          <div className = "adjffmi">Adjusted FFMI: {adjffmiResult.toFixed(2)}</div>
        </div>

        <div className = "bmiSection">
          <div className = "logo2">BMI </div>
          <Height onHeightChange = {handleHeightChange} onUnitChange = {handleHeightUnitChange} />
          <Weight onWeightChange = {handleWeightChange} onUnitChange = {handleWeightUnitChange} />
          <GenderInput onGenderChange = {handleGenderChange}/>
          <div className = "calculateBMIContainer">
            <button className = "calculateBMI" onClick = {calculateBMI}>Calculate BMI</button>
          </div>
          <div className = "bmi">BMI: {bmi.toFixed(2)}</div>
        </div>
       </div> 

      <div className = "tables">
      <div className="ffmichart">
        <table>
          <thead>
            <tr>
              <th>FFMI</th>
              <th>Interpretation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>16 - 17</td>
              <td>Below average - low muscle mass relative to height</td>
            </tr>
            <tr>
              <td>18 - 19</td>
              <td>Average - typical muscle mass relative to height</td>
            </tr>
            <tr>
              <td>20 - 21</td>
              <td>Above average - higher muscle mass relative to height</td>
            </tr>
            <tr>
              <td>22</td>
              <td>Excellent - high muscle mass relative to height</td>
            </tr>
            <tr>
              <td>23 - 25</td>
              <td>Superior - very high muscle mass relative to height</td>
            </tr>
            <tr>
              <td>26 - 27</td>
              <td>Suspicion of performance enhancers - very high muscle mass indicative of muscle enhancements</td>
            </tr>
            <tr>
              <td>28+</td>
              <td>Performance enhancers highly likely - extreme amount of muscle mass indicative of drug enhancements</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bmichart">
        <table>
          <thead>
            <tr>
              <th>BMI</th>
              <th>Interpretation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Below 18.5</td>
              <td>Underweight</td>
            </tr>
            <tr>
              <td>18.5 - 24.9</td>
              <td>Normal Weight</td>
            </tr>
            <tr>
              <td>25.0 - 29.9</td>
              <td>Overweight</td>
            </tr>
            <tr>
              <td>30.0+ </td>
              <td>Obese</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div className = "bellCurvesContainer">
      <div className = "bellCurvesTitle">FFMI Distribution</div>
      <div className = "bellCurves">
        {selectedGender === 'male' && (
          <BellCurveChartMen adjustedFFMI = {adjffmiResult} />
        )}
        {selectedGender === 'female' && (
          <BellCurveChartWomen adjustedFFMI = {adjffmiResult} />
        )}
      </div>
    </div>
    
    <div className = "barChartContainer">
      <div className = "barChartTitle">BMI Distribution</div>
      <BmiChart bmiValue = {bmi} />
    </div>
  </div>
    
  );
}
export default App;


