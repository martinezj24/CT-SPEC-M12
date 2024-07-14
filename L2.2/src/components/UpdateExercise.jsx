import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateExercise } from './exercisesSlice';

const UpdateExercise = () => {
  const dispatch = useDispatch();
  const exercises = useSelector((state) => state.exercises.exercises);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [updatedDetails, setUpdatedDetails] = useState({});

  const handleSelectChange = (e) => {
    const exerciseId = e.target.value;
    const exercise = exercises.find((ex) => ex.id === exerciseId);
    setSelectedExercise(exercise);
    setUpdatedDetails(exercise);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedExercise) {
      dispatch(updateExercise({ id: selectedExercise.id, updatedExercise: updatedDetails }));
    }
  };

  return (
    <div>
      <h2>Update Exercise</h2>
      <select onChange={handleSelectChange} value={selectedExercise ? selectedExercise.id : ''}>
        <option value="" disabled>Select exercise</option>
        {exercises.map((exercise) => (
          <option key={exercise.id} value={exercise.id}>
            {exercise.name}
          </option>
        ))}
      </select>
      {selectedExercise && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={updatedDetails.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Duration:</label>
            <input
              type="number"
              name="duration"
              value={updatedDetails.duration}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Calories:</label>
            <input
              type="number"
              name="calories"
              value={updatedDetails.calories}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Update Exercise</button>
        </form>
      )}
    </div>
  );
};

export default UpdateExercise;
