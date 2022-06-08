import React, { useEffect, useState } from 'react';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const [planetsList, setPlanetsList] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      const data = await fetch(endpoint);
      const { results } = await data.json();
      setPlanetsList(results);
      // console.log(results);
      // const planets = await data.json();
      // setPlanetsList(planets);
      // console.log(planets);
    };
    getPlanets();
  }, []);

  // function createQuestion(newQuestion) {
  //   setQuestions([...questions, newQuestion]);
  // }

  // function incrementClaps(questionId) {
  //   const newArray = [...questions];

  //   const index = questions.findIndex((question) => question.id === questionId);
  //   newArray[index].claps = questions[index].claps + 1;

  //   setQuestions(newArray);
  // }

  return (
    <PlanetsContext.Provider
      value={ { planetsList } }
    >
      {children}
    </PlanetsContext.Provider>
  );
}

export default PlanetsProvider;
