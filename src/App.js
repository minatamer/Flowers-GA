import React, { useState } from 'react';
import FlowerComponent from './components/FlowerComponent';
import { initializePopulation, evolvePopulation } from './utils/population';

function App() {
  const [population, setPopulation] = useState(initializePopulation()); 
  const [fitness, setFitness] = useState(new Array(8).fill(0)); 
  const [generation, setGeneration] = useState(0);
  const handleHoverEnd = (index, hoverTime) => {
    const newFitness = [...fitness];
    newFitness[index] += 1; 
    setFitness(newFitness);
  };

  const handleNextGeneration = () => {
    const newPopulation = evolvePopulation(population, fitness); 
    setPopulation(newPopulation); 
    setFitness(new Array(8).fill(0));
    setGeneration(prevGeneration => prevGeneration + 1);
  };

  return (
    <div className="App">
      <h1 style={{ marginBottom: '100px' }}>Flower Evolution</h1>
      <div className="flower-container">
        {population.map((flower, index) => (
          <FlowerComponent
            key={index}
            flower={flower}
            fitness={fitness[index]}
            onHoverEnd={(hoverTime) => handleHoverEnd(index, hoverTime)} 
          />
        ))}
      </div>
      <button onClick={handleNextGeneration}>Evolve to Next Generation</button>
      <h5>Generation: { generation}</h5>
    </div>
  );
}

export default App;
