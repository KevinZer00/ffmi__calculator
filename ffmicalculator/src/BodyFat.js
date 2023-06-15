import React, { useState } from 'react';

function BodyFat({ onBodyFatChange }) {
  const [bodyFat, setBodyFat] = useState('');

  const handleBodyFatChange = (e) => {
    setBodyFat(e.target.value);
    onBodyFatChange(e.target.value);
  };

  return (
    <div className = "bodyfatContainer">
      <input
        type="number"
        value={bodyFat}
        onChange={handleBodyFatChange}
        placeholder="Enter body fat (%)"
      />
    </div>
  );
}

export default BodyFat;
