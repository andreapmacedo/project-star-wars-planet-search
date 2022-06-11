import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import './Menu.css';

function Menu() {
  const { filterPlanetsByName,
    planetsSearched,
    filterPlanetsByNumber,
    clearFilter,
    stateList,
    deleteFilter,
    deleteAllFilters,
  } = useContext(PlanetsContext);

  const [state, setState] = useState({ column: 'population',
    comparison: 'maior que',
    value: 0,
    columnFilteredList: [],
    columnFilterList: ['population',
      'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
    columnDefaultList: ['population',
      'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
    columnDefault: 'population',
  });

  function onClickHandler() {
    // console.log(state.column);
    if (state.columnFilterList.length === 0) return 0;
    const filtered = state.columnFilterList
      .filter((columnItem) => columnItem !== state.column);
    console.log(filtered);
    setState({ ...state, columnFilterList: filtered, column: filtered[0] });
    filterPlanetsByNumber(state);
  }

  function callDeleteAllFIlters() {
    setState({ ...state, columnFilterList: state.columnDefaultList });
    deleteAllFilters();
  }

  function callClear() {
    clearFilter();
  }

  const handleChange = ({ target }) => {
    if (target.name === 'serchByName') {
      filterPlanetsByName(target.value);
    } else if (target.name === 'columnFilter') {
      setState({ ...state, column: target.value });
    } else if (target.name === 'comparison') {
      setState({ ...state, comparison: target.value });
    } else if (target.name === 'value') {
      setState({ ...state, value: target.value });
    } else if (target.name === 'columnSort') {
      setState({ ...state, columnDefault: target.value });
    }
  };

  return (
    <section className="menu">
      <label htmlFor="orderBy">
        Ordenar por:
        <select
          data-testid="column-Sort"
          onChange={ handleChange }
          name="columnSort"
          value={ state.columnDefault }
        >
          {state.columnDefaultList.map((column, index) => (
            <option key={ index } value={ column }>{column}</option>
          ))}
        </select>
      </label>
      <div className="menu-a">
        <label htmlFor="serch">
          Pesquisar Planeta:
          <input
            data-testid="name-filter"
            value={ planetsSearched }
            onChange={ handleChange }
            name="serchByName"
            placeholder="Pesquisar Planeta"
            id="serch"
          />
        </label>
        <button
          onClick={ callClear }
          type="button"
          data-testid="button-clear"
        >
          Limpar
        </button>
        <label htmlFor="filterBy">
          Filtrar por:
          <select
            data-testid="column-filter"
            onChange={ handleChange }
            name="columnFilter"
            value={ state.column }
          >
            {state.columnFilterList.map((column, index) => (
              <option key={ index } value={ column }>{column}</option>
            ))}
            {/* <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option> */}
          </select>
        </label>
        <label htmlFor="comparisonBy">
          <select
            data-testid="comparison-filter"
            onChange={ handleChange }
            name="comparison"
            value={ state.comparison }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <input
          data-testid="value-filter"
          placeholder="value"
          type="number"
          name="value"
          onChange={ handleChange }
          value={ state.value }
        />
        <button
          onClick={ onClickHandler }
          type="button"
          data-testid="button-filter"
        >
          Filtrar
        </button>
      </div>
      <div className="state-list-container">
        {stateList.map((stateItem, index) => (
          <section
            data-testid="filter"
            key={ index }
            className="state-list"
          >
            <p>{`${stateItem.column} ${stateItem.comparison} ${stateItem.value}`}</p>
            <button
              type="button"
              onClick={ () => deleteFilter(index) }
            >
              deletar
            </button>
          </section>

        ))}
        <button
          data-testid="button-remove-filters"
          type="button"
          // onClick={ callDeleteAllFilters }
          onClick={ callDeleteAllFIlters }
        >
          Remover Todos
        </button>
        {/* {stateList &&
      stateList.map((stateItem, index) => (<p key={ index }>{stateItem}</p>))} */}
      </div>
    </section>
  );
}

export default Menu;
