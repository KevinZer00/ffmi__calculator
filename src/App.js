import React, { useState} from 'react';
import Height from './Height';
import Weight from './Weight';
import BodyFat from './BodyFat';
// import BMI from './BMI';
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
              <td>Performance enhancers highly likely - extreme amount of muscle mass indicative of muscle enhancements</td>
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

    <div className = "infoContainer">
      <div className = "infoTitle1">Difference Between FFMI and BMI</div>
      <div className = "infoSection1">
        The Fat Free Mass Index (FFMI) is a tool used to measure the body's amount of muscle mass relative to the height and weight. To do this, the calculator requires an approximation
        of the user's body fat percentage. The Body Mass Index (BMI) is a tool used to measure the body's height to weight ratio. It only requires the user's height and weight. The key 
        difference between the two is that the FFMI factors in body composition, whereas the BMI only deals with the ratio. In other words, BMI does not factor in how much muscle mass 
        a person may have on their frame. Athletes or bodybuilders who carry more muscle mass may fall within higher ranges on the BMI scale, although in a medical context they would 
        not be considered to be at an unhealthy weight. However, the FFMI is most accurate amongst users that have a low enough body fat percentage to be accurately reported. This value
        usually extends up to 20%. Users that have a substantial amount of body fat percentage may have difficulty approximating their body fat percentage and thus provide inaccurate
        values. 
      </div>
      <div className = "infoTitle2">What the Charts Say</div>
      <div className = "infoSection2">
        The graphs displayed help the user visualize their current FFMI/BMI score in comparison to the general adult population in the United States. In the FFMI bell curve, the majority of 
        the population scores within the range of 18 to 20, indicating average muscle mass. In the BMI bar chart, 7.2% of the population scores a BMI below 18.5, 35% of the population sores 
        a BMI between 18.5 and 24.9, 33% of the population scores a BMI between 25 and 29.9, and 24.8% of the population scores a BMI above 30.  
      </div>
    </div>
  </div>
    
  );
}
export default App;


