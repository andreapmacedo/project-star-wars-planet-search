import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const [planetsList, setPlanetsList] = useState([]);
  const [filteredPlanetsList, setFilteredPlanetsList] = useState(planetsList);
  const [planetSearched, setPlanetSearched] = useState('');
  const [stateList, setStateList] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [filteredListByName, setFilteredListByName] = useState(planetsList);
  let currentFilteredbyFilter = planetsList;

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

  function findByComparison(column, planetState) {
    // if (column === 'unknown') return '';
    if (column !== 'unknown') {
      if (planetState.comparison === 'maior que') {
        return filteredPlanetsList
          .find(() => Number(column) > Number(planetState.value));
      } if (planetState.comparison === 'menor que') {
        return filteredPlanetsList
          .find(() => Number(column) < Number(planetState.value));
      } if (planetState.comparison === 'igual a') {
        return filteredPlanetsList
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
    console.log('currentFilteredbyFilter', currentFilteredbyFilter);
    const temp = currentFilteredbyFilter;
    filterList.forEach((filterIten) => {
      console.log('filterIten', filterIten);
      currentFilteredbyFilter = findByColum(filterIten, currentFilteredbyFilter);
    });
    console.log('filterByListFilters', currentFilteredbyFilter);

    const filteredByNameMap = filteredListByName.map(({ name }) => name);
    console.log('filteredByNameMap', filteredByNameMap);

    let result = temp;
    if (currentFilteredbyFilter.length > 0) {
      result = currentFilteredbyFilter;
    } else {
      currentFilteredbyFilter = temp;
    }

    if (filteredByNameMap.length > 0) {
      result = currentFilteredbyFilter
        .filter(({ name }) => filteredByNameMap.includes(name));
    }

    console.log('result', result);
    console.log('---------------');

    setFilteredPlanetsList(result);
  }

  function createFilter(newFilter) {
    setFilterList([...filterList, newFilter]);
    setStateList([...stateList, newFilter]);
  }

  useEffect(() => {
    filterByListFilters();
  }, [filterList]);

  function clearFilter() {
    setPlanetSearched('');
  }

  function deleteFilter(itemIndex) {
    const filter = stateList.filter((item, index) => index !== itemIndex);
    setStateList(filter);
    setFilterList(filter);
  }

  function deleteAllFilters() {
    currentFilteredbyFilter = planetsList;
    setStateList([]);
    setFilterList([]);
  }

  function updateFilterByName() {
    filterByListFilters();
  }

  function filterPlanetsByName(searched) {
    setPlanetSearched(searched);
    const filtered = currentFilteredbyFilter
      .filter((planet) => planet.name.includes(searched));
    setFilteredListByName(filtered);
  }

  useEffect(() => {
    updateFilterByName();
  }, [filteredListByName]);

  return (
    <PlanetsContext.Provider
      value={ { filteredPlanetsList,
        filterPlanetsByName,
        stateList,
        clearFilter,
        deleteFilter,
        deleteAllFilters,
        filterList,
        createFilter,
        planetSearched } }
    >
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
