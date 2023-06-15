import React, { useState } from 'react';

function Weight({ onWeightChange, onUnitChange }) {
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('kg');

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
    onWeightChange(e.target.value);
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
    onUnitChange(e.target.value);
  };

  return (
    <div className = "weightContainer">
      <input
        type="number"
        value={weight}
        onChange={handleWeightChange}
        placeholder={`Enter weight (${unit})`}
      />
      <select value={unit} onChange={handleUnitChange}>
        <option value="kg">kg</option>
        <option value="lbs">lbs</option>
      </select>
    </div>
  );
}

export default Weight;
