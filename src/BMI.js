import React, { useState } from 'react';
import Height from './Height';
import Weight from './Weight';

function BMI({ onCalculate }) {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const handleClick = () => {
    onCalculate(height, weight);
  };

  return (
    <div className="bmiContainer">
      <Height onHeightChange={setHeight} />
      <Weight onWeightChange={setWeight} />
      <button onClick={handleClick}>Calculate BMI</button>
    </div>
  );
}

export default BMI;
