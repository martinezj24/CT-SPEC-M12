import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
    exercises: [],
};

const exercisesSlice = createSlice({
    name: 'exercises',
    initialState,
    reducers: {
        addExercise: (state, action) => {
            state.exercises.push(action.payload);
        },
        updateExercise: (state, action) => {
            const { id, updatedExercises } = action.payload;
            const index = state.exercises.findIndex((exercise) => exercise.id === id);
            if (index !== -1) {
                state.exercises[index] = { ...state.exercises[index], ...updatedExercises };
            }
        },
    },
});

export const { addExercise, updateExercise } =exercisesSlice.actions;

//Selectors

const selectExercises = (state) => state.exercises.exercises;

export const selectTotalDuration = createSelector(
    [selectExercises],
    (exercises) => exercises.reduce((total, exercise) => total + exercise.calories, 0)
);

export const selectTotalCalories = createSelector(
    [selectExercises],
    (exercises) => exercises.reduce((total, exercise) => total + exercise.calories, 0)
);

export default exercisesSlice.reducer;