import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Menu() {
  const { serarchPlanet, planetsSearched } = useContext(PlanetsContext);

  function printList() {
    console.log(planetsSearched);
  }

  const handleChange = (e) => {
    serarchPlanet(e.target.value);
  };

  return (
    <section className="menu">
      <button onClick={ printList } type="button">
        print
      </button>
      <div>
        teste menu
        <label htmlFor="serch">
          Pesquisar Planeta:
          <input
            data-testid="name-filter"
            value={ planetsSearched }
            onChange={ handleChange }
            name="serch"
            placeholder="Pesquisar Planeta"
            id="serch"
          />
        </label>
      </div>
    </section>
  );
}

export default Menu;
