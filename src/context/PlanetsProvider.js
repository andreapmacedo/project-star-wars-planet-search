import React, { useEffect, useState } from 'react';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const [planetsList, setPlanetsList] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      const data = await fetch(endpoint);
      const { results } = await data.json();
      setPlanetsList(results);
      // const planets = await data.json();
      // setPlanetsList(planets);
      // console.log(planets);
    };
    getPlanets();
  }, []);

  return (
    <PlanetsContext.Provider
      value={ { planetsList } }
    >
      {children}
    </PlanetsContext.Provider>
  );
}

export default PlanetsProvider;
