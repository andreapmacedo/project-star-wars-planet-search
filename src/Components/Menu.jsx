import React, { useContext, useState, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import './Menu.css';

function Menu() {
  const defaultColumnList = ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  const { filterPlanetsByName,
    clearFilter,
    stateList,
    deleteFilter,
    deleteAllFilters,
    createFilter,
  } = useContext(PlanetsContext);

  const [planetName, setPlanetName] = useState('');

  const [state, setState] = useState({ column: 'population',
    comparison: 'maior que',
    value: 0,
    columnFilteredList: [],
    columnFilterList: defaultColumnList,
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (state.columnFilterList.length === 0) return 0;
    const newFilter = {
      column: state.column,
      comparison: state.comparison,
      value: state.value,
    };
    createFilter(newFilter);

    const filterList = state.columnFilterList
      .filter((columnItem) => columnItem !== state.column);
    setState((prevState) => ({ ...prevState,
      columnFilterList: filterList,
      column: filterList[0],
      columnFilteredList: prevState.columnFilteredList.concat(state.column),
    }));
  }

  function callDeleteAllFilters() {
    setState({ ...state,
      columnFilterList: defaultColumnList,
      column: 'population',
      columnFilteredList: [],
    });
    deleteAllFilters();
  }

  function callDeleteFilter(index) {
    const filteredList = stateList
      .filter((columnItem, indexList) => indexList !== index);

    const filteredMap = filteredList
      .map(({ column }) => column);

    const filterList = defaultColumnList
      .filter((columnItem) => !filteredMap.includes(columnItem));

    setState((prevState) => ({ ...prevState,
      columnFilterList: filterList,
      column: filterList[0],
      columnFilteredList: filteredList,
    }));
    deleteFilter(index);
  }

  function callClear() {
    clearFilter();
  }

  useEffect(() => {
    filterPlanetsByName(planetName);
  }, [planetName]);

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
          {defaultColumnList.map((column, index) => (
            <option key={ index } value={ column }>{column}</option>
          ))}
        </select>
      </label>
      {/* <div className="menu-a"> */}
      <label htmlFor="serch">
        Pesquisar Planeta:
        <input
          data-testid="name-filter"
          value={ planetName }
          onChange={ (e) => setPlanetName(e.target.value) }
          name="planetName"
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
      <form onSubmit={ handleSubmit }>
        <label htmlFor="filterBy">
          Filtrar por:
          <select
            data-testid="column-filter"
            onChange={ handleChange }
            name="columnFilter"
            value={ state.column }
            // value={ state.columnFilterList[0] }
          >
            {state.columnFilterList.map((column, index) => (
              <option key={ index } value={ column }>{column}</option>
            ))}
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
          // onClick={ callOnClickHandler }
          type="submit"
          data-testid="button-filter"
        >
          Filtrar
        </button>
      </form>
      {/* </div> */}
      <div className="state-list-container">
        {stateList.map((stateItem, index) => (
        // {filterList.map((stateItem, index) => (
          <section
            data-testid="filter"
            key={ index }
            className="state-list"
          >
            <p>{`${stateItem.column} ${stateItem.comparison} ${stateItem.value}`}</p>
            <button
              type="button"
              onClick={ () => callDeleteFilter(index) }
            >
              deletar
            </button>
          </section>

        ))}
        <button
          data-testid="button-remove-filters"
          type="button"
          onClick={ callDeleteAllFilters }
        >
          Remover Todos
        </button>
      </div>
    </section>
  );
}

export default Menu;
