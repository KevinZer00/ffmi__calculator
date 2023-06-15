import React, { useState } from 'react';

function Height({ onHeightChange, onUnitChange }) {
  const [height, setHeight] = useState('');
  const [unit, setUnit] = useState('cm');

  const handleHeightChange = (e) => {
    setHeight(e.target.value);
    onHeightChange(e.target.value);
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
    onUnitChange(e.target.value);
  };

  return (
    <div className="heightContainer">
      <input
        type="number"
        value={height}
        onChange={handleHeightChange}
        placeholder={`Enter height (${unit})`}
      />
      <select value={unit} onChange={handleUnitChange}>
        <option value="cm">cm</option>
        <option value="in">in</option>
      </select>
    </div>
  );
}

export default Height;

