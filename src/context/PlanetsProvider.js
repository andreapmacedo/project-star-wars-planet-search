import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const [planetsData, setPlanetsData] = useState([]);
  const [filteredPlanetsData, setFilteredPlanetsData] = useState(planetsData);
  // const [filteredPlanetByName, setFilteredPlanetByName] = useState(planetsData);
  // const [filteredPlanetByNumeric, setFilteredPlanetByNumeric] = useState(planetsData);
  // const [filteredPlanetsData, setFilteredPlanetsData] = useState([]);
  // const [filteredPlanetByName, setFilteredPlanetByName] = useState([]);
  // const [filteredPlanetByNumeric, setFilteredPlanetByNumeric] = useState([]);
  const [inputNameText, setInputNameText] = useState('');
  const [stateList, setStateList] = useState([]);
  const [numericFilterList, setNumericFilterList] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      const data = await fetch(endpoint);
      const { results } = await data.json();
      setPlanetsData(results);
      setFilteredPlanetsData(results);
      // setFilteredPlanetByNumeric(results);
      // const planets = await data.json();
      // setPlanetsData(planets.result);
    };
    getPlanets();
  }, []);

  function findByComparison(column, planetState) {
    // if (column === 'unknown') return '';
    if (column !== 'unknown') {
      if (planetState.comparison === 'maior que') {
        return filteredPlanetsData
          .find(() => Number(column) > Number(planetState.value));
      } if (planetState.comparison === 'menor que') {
        return filteredPlanetsData
          .find(() => Number(column) < Number(planetState.value));
      } if (planetState.comparison === 'igual a') {
        return filteredPlanetsData
          .find(() => Number(column) === Number(planetState.value));
      }
    }
  }

  function findByColum(filtered, resltPlanetFiltered) {
    switch (filtered.column) {
    case 'population':
      return resltPlanetFiltered
        .filter((planet) => findByComparison(planet.population, filtered));
    case 'orbital_period':
      return resltPlanetFiltered
        .filter((planet) => findByComparison(planet.orbital_period, filtered));
    case 'diameter':
      return resltPlanetFiltered
        .filter((planet) => findByComparison(planet.diameter, filtered));
    case 'rotation_period':
      return resltPlanetFiltered
        .filter((planet) => findByComparison(planet.rotation_period, filtered));
    case 'surface_water':
      return resltPlanetFiltered
        .filter((planet) => findByComparison(planet.surface_water, filtered));
    default:
      break;
    }
  }

  function filterByListFilters() {
    let temp = [];
    temp = planetsData.filter((planet) => planet.name.includes(inputNameText));
    let result = temp;
    numericFilterList.forEach((filterIten) => {
      console.log('filterIten', filterIten);
      result = findByColum(filterIten, result);
      console.log('result in', result);
    });

    console.log('result out', result);
    console.log('---------------');
    setFilteredPlanetsData(result);
  }

  function createFilter(newFilter) {
    setNumericFilterList([...numericFilterList, newFilter]);
    setStateList([...stateList, newFilter]);
  }

  useEffect(() => {
    filterByListFilters();
  }, [numericFilterList, inputNameText]);

  function filterPlanetsByName(searched) {
    setInputNameText(searched);
  }

  function clearFilter() {
    setInputNameText('');
  }

  function deleteFilter(itemIndex) {
    const filter = stateList.filter((item, index) => index !== itemIndex);
    setStateList(filter);
    setNumericFilterList(filter);
  }

  function deleteAllFilters() {
    setFilteredPlanetsData(planetsData);
    setStateList([]);
    setNumericFilterList([]);
  }

  return (
    <PlanetsContext.Provider
      value={ { filteredPlanetsData,
        filterPlanetsByName,
        stateList,
        clearFilter,
        deleteFilter,
        deleteAllFilters,
        numericFilterList,
        createFilter,
        inputNameText } }
    >
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
