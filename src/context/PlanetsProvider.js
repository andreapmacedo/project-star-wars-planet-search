import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const [planetsList, setPlanetsList] = useState([]);
  const [filteredPlanetsList, setFilteredPlanetsList] = useState([]);
  const [planetsSearched, setPlanetSearched] = useState('');

  useEffect(() => {
    const getPlanets = async () => {
      const data = await fetch(endpoint);
      const { results } = await data.json();
      setPlanetsList(results);
      setFilteredPlanetsList(results);
      // const planets = await data.json();
      // setPlanetsList(planets.result);
    };
    getPlanets();
  }, []);

  function filterPlanets(searched) {
    const filtered = planetsList.filter((planet) => planet.name.includes(searched));
    // console.log(filtered);
    setFilteredPlanetsList(filtered);
  }

  function serarchPlanet(searched) {
    setPlanetSearched(searched);
    filterPlanets(searched);
  }

  return (
    <PlanetsContext.Provider
      value={ { filteredPlanetsList, serarchPlanet, planetsSearched } }
    >
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
