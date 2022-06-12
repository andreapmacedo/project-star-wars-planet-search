import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  // const defaultColumnList = ['population',
  //   'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const [planetsList, setPlanetsList] = useState([]);
  const [filteredPlanetsList, setFilteredPlanetsList] = useState([]);
  const [planetsSearched, setPlanetSearched] = useState('');
  // const [planetsSearchedLength, setPlanetSearchedLenth] = useState(0);
  const [stateList, setStateList] = useState([]);
  // const [filteredColumnList, setFilteredColumnList] = useState([]);
  // const [filterColumnList, setFilterColumnList] = useState(defaultColumnList);

  const [filterList, setFilterList] = useState([
    // {
    //   id: 1,
    //   column: 'population',
    //   comparison: 'maior que',
    //   value: 0,
    // },
  ]);

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
    // console.log(searched);
    // console.log(filteredPlanetsList);
    // let array = [];
    // if (searched > planetsSearchedLength) {
    //   array = filteredPlanetsList;
    // } else {
    //   array = planetsList;
    // }
    console.log(filteredPlanetsList);

    // setPlanetSearchedLenth(searched.length);

    const filtered = filteredPlanetsList
      .filter((planet) => planet.name.includes(searched));
    setFilteredPlanetsList(filtered);
    setPlanetSearched(searched);
  }

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

  function clearFilter() {
    setFilteredPlanetsList(planetsList);
    setPlanetSearched('');
  }

  function deleteFilter(itemIndex) {
    setStateList(stateList.filter((item, index) => index !== itemIndex));
    filterPlanetsByName(planetsSearched);
  }
  function deleteAllFilters() {
    setStateList([]);
    filterPlanetsByName(planetsSearched);
  }

  function findByColum(planetState, column) {
    switch (column) {
    case 'population':
      console.log('aqui');
      return filteredPlanetsList
        .filter((planet) => findByComparison(planet.population, planetState));
    case 'orbital_period':
      return filteredPlanetsList
        .filter((planet) => findByComparison(planet.orbital_period, planetState));
    case 'diameter':
      return filteredPlanetsList
        .filter((planet) => findByComparison(planet.diameter, planetState));
    case 'rotation_period':
      return filteredPlanetsList
        .filter((planet) => findByComparison(planet.rotation_period, planetState));
    case 'surface_water':
      return filteredPlanetsList
        .filter((planet) => findByComparison(planet.surface_water, planetState));
    default:
      break;
    }
  }

  // function findByColum(planetState) {
  //   switch (planetState.column) {
  //   case 'population':
  //     return planetsList
  //       .filter((planet) => findByComparison(planet.population, planetState));
  //   case 'orbital_period':
  //     return planetsList
  //       .filter((planet) => findByComparison(planet.orbital_period, planetState));
  //   case 'diameter':
  //     return planetsList
  //       .filter((planet) => findByComparison(planet.diameter, planetState));
  //   case 'rotation_period':
  //     return planetsList
  //       .filter((planet) => findByComparison(planet.rotation_period, planetState));
  //   case 'surface_water':
  //     return planetsList
  //       .filter((planet) => findByComparison(planet.surface_water, planetState));
  //   default:
  //     break;
  //   }
  // }

  function OnClickHandler(state, columns) {
    console.log(state);
    console.log(columns);
    const filtered = columns.map((column) => findByColum(state, column));
    console.log(filtered);
    // setFilteredPlanetsList(filtered);
    setStateList([...stateList, state]);
  }

  // function filterPlanetsByNumber(planetState) {
  //   const filtered = findByColum(planetState);
  //   setFilteredPlanetsList(filtered);
  //   setStateList([...stateList, planetState]);
  // }

  function filterByListFilters() {
    console.log(filterList);
  }

  function createFilter(newFilter) {
    setFilterList([...filterList, newFilter]);
  }

  useEffect(() => {
    filterByListFilters();
  }, [filterList]);

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
