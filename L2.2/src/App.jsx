import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import UpdateExercise from './UpdateExercise';
import Summary from './Summary';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>Fitness Tracker</h1>
        <UpdateExercise />
        <Summary />
      </div>
    </Provider>
  );
};

export default App;
