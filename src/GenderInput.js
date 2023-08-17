import React from 'react';

const GenderInput = ({ value, onChange }) => {
  return (
    <div className = "genderInput">
      <label htmlFor = "gender"> Gender:</label>
      <select id = "gender" value={value} onChange={onChange}>
        <option value = "male">Male</option>
        <option value = "female">Female</option>
      </select>
    </div>
  );
};

export default GenderInput;
