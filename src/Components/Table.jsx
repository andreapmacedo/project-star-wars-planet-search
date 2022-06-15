import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import './Table.css';

function Table() {
  const { filteredPlanetsData } = useContext(PlanetsContext);

  function geRows() {
    return filteredPlanetsData.map((planet, i) => (
      <tr key={ i } className={ i % 2 === 0 ? 'Even' : 'Odd' }>
        <td>{planet.name}</td>
        <td>{planet.rotation_period}</td>
        <td>{planet.orbital_period}</td>
        <td>{planet.diameter}</td>
        <td>{planet.climate}</td>
        <td>{planet.gravity}</td>
        <td>{planet.terrain}</td>
        <td>{planet.surface_water}</td>
        <td>{planet.population}</td>
        <td>{planet.films}</td>
        <td>{planet.created}</td>
        <td>{planet.edited}</td>
        <td>{planet.url}</td>
      </tr>
    ));
  }

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {geRows()}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
