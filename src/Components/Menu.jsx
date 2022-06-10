import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Menu() {
  const { filterPlanetsByName,
    planetsSearched,
    filterPlanetsByNumber,
    clearFilter,
  } = useContext(PlanetsContext);

  const [state, setState] = useState({ column: 'population',
    comparison: 'maior que',
    value: 0 });

  function callFilter() {
    filterPlanetsByNumber(state);
  }

  function callClearFilter() {
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
    }
  };

  return (
    <section className="menu">
      <button
        onClick={ callFilter }
        type="button"
        data-testid="button-filter"
      >
        Filtrar
      </button>
      <button
        onClick={ callClearFilter }
        type="button"
        data-testid="button-clear"
      >
        Limpar
      </button>
      <select
        data-testid="column-Sort"
        onChange={ handleChange }
        name="columnSort"
        value={ state.comparison }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <div>
        teste menu
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
        <select
          data-testid="column-filter"
          onChange={ handleChange }
          name="columnFilter"
          value={ state.column }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
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
        <input
          data-testid="value-filter"
          placeholder="value"
          type="number"
          name="value"
          onChange={ handleChange }
          value={ state.value }
        />
      </div>
    </section>
  );
}

export default Menu;
