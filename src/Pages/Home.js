import React from 'react';
// import React, { useContext, useState } from 'react';
// import PlanetsContext from '../context/PlanetsContext';
import './Home.css';
import Table from '../Components/Table';
import Menu from '../Components/Menu';

function Home() {
  // const { planetsList } = useContext(PlanetsContext);
  // const [planets, setPlanets] = useState([]);

  // const print = () => {
  //   console.log(planetsList);
  //   setPlanets(planetsList);
  // };
  // const printPlanet = () => {
  //   console.log(planets);
  // };

  return (
    <section>
      <Menu />
      <Table />
    </section>
  );
}

export default Home;
