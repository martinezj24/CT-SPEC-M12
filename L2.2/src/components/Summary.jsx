import React from 'react';
import { useSelector } from 'react-redux';
import { selectTotalDuration, selectTotalCalories } from './exercisesSlice';

const Summary = () => {
  const totalDuration = useSelector(selectTotalDuration);
  const totalCalories = useSelector(selectTotalCalories);

  return (
    <div>
      <h2>Exercise Summary</h2>
      <p>Total Duration: {totalDuration} minutes</p>
      <p>Total Calories Burned: {totalCalories} calories</p>
    </div>
  );
};

export default Summary;
