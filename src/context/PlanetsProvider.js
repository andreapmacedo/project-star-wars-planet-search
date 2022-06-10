import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const [planetsList, setPlanetsList] = useState([]);
  const [filteredPlanetsList, setFilteredPlanetsList] = useState([]);
  const [planetsSearched, setPlanetSearched] = useState('');

  const [stateList, setStateList] = useState([]);

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

  function filterPlanetsByName(searched) {
    const filtered = planetsList.filter((planet) => planet.name.includes(searched));
    setFilteredPlanetsList(filtered);
    setPlanetSearched(searched);
  }

  function GenericFindBy(column, planetState) {
    if (column === 'unknown') return '';
    if (planetState.comparison === 'maior que') {
      return planetsList
        .find(() => Number(column) > Number(planetState.value));
    } if (planetState.comparison === 'menor que') {
      return planetsList
        .find(() => Number(column) < Number(planetState.value));
    } if (planetState.comparison === 'igual a') {
      return planetsList
        .find(() => Number(column) === Number(planetState.value));
    }
  }

  function clearFilter() {
    setFilteredPlanetsList(planetsList);
  }

  function deleteFilter(itemIndex) {
    setStateList(stateList.filter((item, index) => index !== itemIndex));
    // setFilteredPlanetsList(planetsList);
  }
  function deleteAllFilters() {
    // setStateList(stateList.filter((item, index) => index !== itemIndex));
    setStateList([]);
    // setFilteredPlanetsList(planetsList);
  }

  function findBy(planetState) {
    switch (planetState.column) {
    case 'population':
      return planetsList
        .filter((planet) => GenericFindBy(planet.population, planetState));
    case 'orbital_period':
      return planetsList
        .filter((planet) => GenericFindBy(planet.orbital_period, planetState));
    case 'diameter':
      return planetsList
        .filter((planet) => GenericFindBy(planet.diameter, planetState));
    case 'rotation_period':
      return planetsList
        .filter((planet) => GenericFindBy(planet.rotation_period, planetState));
    case 'surface_water':
      return planetsList
        .filter((planet) => GenericFindBy(planet.surface_water, planetState));
    default:
      break;
    }
  }

  function filterPlanetsByNumber(planetState) {
    const byOrder = findBy(planetState);
    setFilteredPlanetsList(byOrder);
    setStateList([...stateList, planetState]);
    //TODO: caso a lista do estate esteja vazia, a pesquisa é feita com planetList, do contrari, vai usar a lista já filtrada.
    // Verifica se a forma como está pensada a implementaçao acima contempla a filtragem da tabela apos a remocao de um item da lista apenas.
  }

  return (
    <PlanetsContext.Provider
      value={ { filteredPlanetsList,
        filterPlanetsByName,
        filterPlanetsByNumber,
        stateList,
        clearFilter,
        deleteFilter,
        deleteAllFilters,
        planetsSearched } }
    >
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
