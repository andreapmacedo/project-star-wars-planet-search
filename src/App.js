import React from 'react';
import './App.css';
import Home from './Pages/Home';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <Home />
    </PlanetsProvider>
  );
}

export default App;
