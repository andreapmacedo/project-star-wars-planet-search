import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import './Home.css';

function Home() {
  const { planetsList } = useContext(PlanetsContext);
  const [planets, setPlanets] = useState([]);

  const print = () => {
    console.log(planetsList);
    setPlanets(planetsList);
  };
  const printPlanet = () => {
    console.log(planets);
  };

  return (
    <section>
      <button onClick={ print } type="button">
        button
      </button>
      <button onClick={ printPlanet } type="button">
        from state
      </button>
      {/* <ul> */}
        {/* {planetsList.map((planet, index) => <li key={ index }>{planet}</li>)} */}
      {/* </ul> */}
    </section>
  );
}

export default Home;
