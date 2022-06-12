import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const [planetsList, setPlanetsList] = useState([]);
  const [filteredPlanetsList, setFilteredPlanetsList] = useState([]);
  const [planetsSearched, setPlanetSearched] = useState('');
  const [planetsSearchedLength, setPlanetSearchedLength] = useState(0);
  const [stateList, setStateList] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [filteredListByName, setFilteredListByName] = useState(planetsList);

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

  // function filterPlanetsByName(searched) {
  //   // console.log(searched.length);
  //   if (searched.length > planetsSearchedLength) {
  //     const filtered = filteredPlanetsList
  //       .filter((planet) => planet.name.includes(searched));
  //     setFilteredPlanetsList(filtered);
  //     setPlanetSearched(searched);
  //     // console.log(searched.length + 1);
  //   } else {
  //     // console.log('test');
  //   }
  // }

  function findByComparison(column, planetState) {
    if (column === 'unknown') return '';
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

  function deleteFilter(itemIndex) {
    const filter = stateList.filter((item, index) => index !== itemIndex);
    setStateList(filter);
    setFilterList(filter);
    // filterPlanetsByName(planetsSearched);
  }

  function deleteAllFilters() {
    setStateList([]);
    setFilterList([]);
    // filterPlanetsByName(planetsSearched);
  }

  let result = planetsList;
  function filterByListFilters() {
    filterList.forEach((filterIten) => {
      result = findByColum(filterIten, result);
    });
    setFilteredPlanetsList(result);
    // console.log(result);
  }

  function createFilter(newFilter) {
    setFilterList([...filterList, newFilter]);
    setStateList([...stateList, newFilter]);
  }

  useEffect(() => {
    filterByListFilters();
  }, [filterList]);

  function clearFilter() {
    filterByListFilters();
    setPlanetSearched('');
  }

  function filterPlanetsByName(searched) {
    console.log(searched);
    const filtered = planetsList
      .filter((planet) => planet.name.includes(searched));

    filterByListFilters();

    setFilteredPlanetsList(filtered);
  }

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
